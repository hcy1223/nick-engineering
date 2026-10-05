import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const scripts = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const run = (name: string, directory: string, env = process.env) => spawnSync(process.execPath, [join(scripts, name), directory], { encoding: 'utf8', env });
const fixture = (callback: (directory: string) => void) => {
  const directory = mkdtempSync(join(tmpdir(), 'nick-scripts-'));
  try { callback(directory); } finally { rmSync(directory, { recursive: true, force: true }); }
};
const skill = (directory: string, body = '') => writeFileSync(join(directory, 'SKILL.md'), `---\nname: fixture-skill\ndescription: A test skill\n---\n${body}`);
const git = (directory: string, ...args: string[]) => {
  const result = spawnSync('git', ['-C', directory, ...args], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
};

test('validates the actual skill from any working directory', () => {
  const result = spawnSync(process.execPath, [join(scripts, 'validate-skill.ts')], { cwd: tmpdir(), encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
});

test('accepts optional directories, quoted/block metadata, Unicode and duplicate anchors', () => fixture(directory => {
  mkdirSync(join(directory, 'references'));
  writeFileSync(join(directory, 'references', 'guide.md'), '# 使用方法\n# Same\n# Same\n');
  skill(directory, '[guide](references/guide.md#使用方法)\n[second][ref]\n[ref]: references/guide.md#same-1\n[web](https://example.invalid)\n```md\n[example](missing.md)\n```\n');
  let result = run('validate-skill.ts', directory);
  assert.equal(result.status, 0, result.stderr);
  writeFileSync(join(directory, 'SKILL.md'), '---\nname: "fixture-skill"\ndescription: >\n  A multiline description\n---\n');
  result = run('validate-skill.ts', directory);
  assert.equal(result.status, 0, result.stderr);
}));

test('reports missing assets and anchors without modifying files', () => fixture(directory => {
  skill(directory, '# Existing\n[asset](assets/missing.md)\n[anchor](#absent)\n');
  const before = readFileSync(join(directory, 'SKILL.md'), 'utf8');
  const result = run('validate-skill.ts', directory);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /assets\/missing.md/);
  assert.match(result.stderr, /missing heading anchor/);
  assert.equal(readFileSync(join(directory, 'SKILL.md'), 'utf8'), before);
}));

test('rejects missing or invalid required metadata', () => fixture(directory => {
  for (const source of ['# No manifest', '---\nname: Invalid_Name\ndescription: ""\n---\n', '---\nname: fixture\ndescription: false\n---\n']) {
    writeFileSync(join(directory, 'SKILL.md'), source);
    assert.equal(run('validate-skill.ts', directory).status, 1);
  }
}));

test('fails with an operational error when skill directory is missing', () => fixture(directory => {
  assert.equal(run('validate-skill.ts', join(directory, 'absent')).status, 2);
}));

test('baseline checks all repository changes even when invoked in a subdirectory', () => fixture(directory => {
  git(directory, 'init', '-q');
  writeFileSync(join(directory, 'tracked.txt'), 'original');
  git(directory, 'add', 'tracked.txt');
  git(directory, '-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-qm', 'fixture');
  mkdirSync(join(directory, 'nested'));
  assert.equal(run('check-baseline.ts', join(directory, 'nested')).status, 0);
  writeFileSync(join(directory, 'tracked.txt'), 'modified');
  let before = git(directory, 'status', '--porcelain');
  let result = run('check-baseline.ts', join(directory, 'nested'));
  assert.equal(result.status, 1);
  assert.match(result.stderr, / M tracked.txt/);
  assert.equal(git(directory, 'status', '--porcelain'), before);
  git(directory, 'add', 'tracked.txt');
  writeFileSync(join(directory, 'untracked file.txt'), 'untracked');
  before = git(directory, 'status', '--porcelain');
  result = run('check-baseline.ts', directory);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /M  tracked.txt/);
  assert.match(result.stderr, /\?\? "untracked file.txt"/);
  assert.equal(git(directory, 'status', '--porcelain'), before);
}));

test('untracked files cannot be hidden by Git config or ambient target overrides', () => fixture(directory => {
  git(directory, 'init', '-q');
  git(directory, 'config', 'status.showUntrackedFiles', 'no');
  writeFileSync(join(directory, 'new.txt'), 'new');
  const result = run('check-baseline.ts', directory, { ...process.env, GIT_DIR: '/nonexistent/git' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /\?\? new.txt/);
}));

test('nonrepositories and bare repositories fail closed', () => fixture(directory => {
  assert.equal(run('check-baseline.ts', directory).status, 2);
  git(directory, 'init', '--bare', '-q');
  assert.equal(run('check-baseline.ts', directory).status, 2);
}));
