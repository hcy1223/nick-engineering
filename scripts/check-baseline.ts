import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

// Exit codes: 0 = clean, 1 = dirty, 2 = usage or Git error.
const args = process.argv.slice(2);
if (args.length === 1 && args[0] === '--help') {
  console.log('Usage: node check-baseline.ts [repository-directory]\nChecks the entire worktree, including all untracked files. Never modifies it.');
} else if (args.length > 1 || args.some(arg => arg.startsWith('--'))) {
  console.error('Usage: node check-baseline.ts [repository-directory]');
  process.exitCode = 2;
} else {
  const directory = resolve(args[0] ?? process.cwd());
  // Disable optional index writes and ignore ambient Git target overrides.
  const env = { ...process.env, GIT_OPTIONAL_LOCKS: '0' };
  for (const key of Object.keys(env)) {
    if (key.startsWith('GIT_') && key !== 'GIT_OPTIONAL_LOCKS') delete env[key];
  }
  const runGit = (gitArgs: string[]) => spawnSync('git', ['-C', directory, ...gitArgs], {
    encoding: 'utf8', env, maxBuffer: 16 * 1024 * 1024,
  });
  const inside = runGit(['rev-parse', '--is-inside-work-tree']);
  if (inside.error || inside.status !== 0 || inside.stdout.trim() !== 'true') {
    console.error(`Cannot check baseline at ${directory}: ${inside.error?.message ?? (inside.stderr.trim() || 'not a Git worktree')}`);
    process.exitCode = 2;
  } else {
    const status = runGit(['status', '--porcelain=v1', '--untracked-files=all', '--ignore-submodules=none']);
    if (status.error || status.status !== 0) {
      console.error(`Git status failed: ${status.error?.message ?? status.stderr.trim()}`);
      process.exitCode = 2;
    } else if (status.stdout.length > 0) {
      console.error('Baseline is not clean. Stop before the first implementation edit.');
      process.stderr.write(status.stdout);
      process.exitCode = 1;
    } else {
      console.log(`Clean baseline: ${directory}`);
    }
  }
}
