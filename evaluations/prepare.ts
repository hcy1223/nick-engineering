import { execFileSync } from 'node:child_process';
import { mkdirSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Create fixtures only; never launch an agent or modify an existing destination.
const args = process.argv.slice(2);
if (args.length !== 1 || args[0].startsWith('--')) {
  console.error('Usage: node evaluations/prepare.ts <new-directory-outside-skill>');
  process.exit(2);
}
const skill = realpathSync(join(dirname(fileURLToPath(import.meta.url)), '..'));
const destination = resolve(args[0]);
const root = join(realpathSync(dirname(destination)), destination.split(sep).at(-1)!);
const within = relative(skill, root);
if (!within || (!within.startsWith(`..${sep}`) && within !== '..' && !within.startsWith(sep))) {
  throw new Error('Destination must be outside the skill repository');
}
mkdirSync(root); // Existing destinations are rejected; parent must exist.
const requests: Record<string, string> = {
  'plan-authorization': '我批准 docs/implementation-plan-price.md，请拆分 Tasks 并连续执行整个 Plan。',
  'startup-changes': '/two-pack 修复 total 在数量为 0 时仍返回单价的问题，并补充行为测试。',
  'overlapping-changes': '/two-pack 修复 total 在数量为 0 时仍返回单价的问题，并补充行为测试。',
  'verification-failure': '/two-pack 修复 total 在数量为 0 时仍返回单价的问题，并补充行为测试。',
};

const source = "export function total(unitPrice, quantity) {\n  return unitPrice * (quantity || 1);\n}\n\nexport function formatPrice(amount) {\n  return amount.toFixed(2);\n}\n";
const tests = "import assert from 'node:assert/strict';\nimport { test } from 'node:test';\nimport { total, formatPrice } from './price.js';\ntest('multiplies price by quantity', () => assert.equal(total(12, 3), 36));\ntest('formats two decimal places', () => assert.equal(formatPrice(12), '12.00'));\n";
const plan = "# Implementation Plan: Price quantity boundaries\n\nStatus: Approved\n\n## Outcome and scope\nMake total return zero for quantity zero and reject negative quantities with RangeError.\nPreserve positive quantity multiplication and formatPrice behavior. No dependency,\npublic signature, persistence, or delivery changes.\n\n## Current system\nprice.js exports total and formatPrice. price.test.js covers positive quantity\nand formatting. total currently treats zero as one and accepts negative quantities.\n\n## Design and execution\nUse independent behavior increments: zero quantity first, then negative quantity\nvalidation. Test each behavior before implementing it. Reuse the existing Node test\nrunner. No new abstraction is needed.\n\n## Verification and delivery\nnpm test must pass. Review the complete diff. No commit, push, or deployment.\nThis local utility has no production rollout or telemetry requirement.\n";

for (const [name, request] of Object.entries(requests)) {
  const repo = join(root, name);
  mkdirSync(repo);
  const files: Record<string, string> = {};
  const write = (path: string, content: string) => {
    const target = join(repo, path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
    files[path] = content;
  };
  const env = { ...process.env, GIT_OPTIONAL_LOCKS: '0' };
  for (const key of Object.keys(env)) {
    if (key.startsWith('GIT_') && key !== 'GIT_OPTIONAL_LOCKS') delete env[key];
  }
  const git = (...parts: string[]) => execFileSync('git', ['-C', repo, ...parts], { encoding: 'utf8', env });
  write('package.json', JSON.stringify({ private: true, type: 'module', scripts: { test: 'node --test' } }, null, 2) + '\n');
  write('price.js', source);
  write('price.test.js', tests);
  write('local-settings.json', '{"port": 3000}\n');
  write('AGENTS.md', 'Use npm test for required verification. Preserve existing changes.\n');
  if (name === 'plan-authorization') write('docs/implementation-plan-price.md', plan);
  if (name === 'verification-failure') write('environment.test.js', "import { test } from 'node:test';\nimport assert from 'node:assert/strict';\ntest('required integration environment', () => assert.fail('Fixture integration environment unavailable'));\n");
  git('init', '-q');
  git('add', '.');
  git('-c', 'user.name=Evaluation', '-c', 'user.email=evaluation@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-qm', 'fixture baseline');
  if (name === 'startup-changes') {
    write('local-settings.json', '{"port": 4317}\n');
    write('runtime.log', 'Local server listening on port 4317\n');
  }
  if (name === 'overlapping-changes') {
    write('price.js', source.replace('amount.toFixed(2)', '`USD ${amount.toFixed(2)}`'));
    write('price.test.js', tests.replace("'12.00'", "'USD 12.00'"));
  }
  const evidence = { head: git('rev-parse', 'HEAD').trim(), status: git('status', '--porcelain'), diff: git('diff'), files };
  writeFileSync(join(root, name + '.baseline.json'), JSON.stringify(evidence, null, 2) + '\n');
  writeFileSync(join(root, name + '.request.txt'), `Use nick-engineering at ${skill}. Read SKILL.md and only the references needed for this request. Work only in ${repo}.\n\n${request}\n`);
}
console.log(root);
