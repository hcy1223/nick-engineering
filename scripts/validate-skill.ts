import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Structural validation only: no network requests or workflow approval decisions.
const args = process.argv.slice(2);
if (args.length === 1 && args[0] === '--help') {
  console.log('Usage: node validate-skill.ts [skill-directory]\nChecks name/description, supporting directories, and local Markdown links/heading anchors.');
} else if (args.length > 1 || args.some(arg => arg.startsWith('--'))) {
  console.error('Usage: node validate-skill.ts [skill-directory]');
  process.exitCode = 2;
} else {
  const root = resolve(args[0] ?? join(dirname(fileURLToPath(import.meta.url)), '..'));
  const errors: string[] = [];
  const report = (file: string, message: string) => errors.push(`${relative(root, file) || 'SKILL.md'}: ${message}`);
  try {
    const entry = join(root, 'SKILL.md');
    const source = readFileSync(entry, 'utf8').replace(/^\uFEFF/, '');
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!frontmatter) {
      report(entry, 'missing YAML frontmatter');
    } else {
      // Read required top-level text fields; metadata and other YAML remain untouched.
      const field = (key: string): string => {
        const match = frontmatter[1].match(new RegExp(`^${key}:[ \\t]*(.*)$`, 'm'));
        if (!match) return '';
        const value = match[1].trim();
        if (/^[|>][+-]?$/.test(value)) {
          const remainder = frontmatter[1].slice((match.index ?? 0) + match[0].length);
          return (remainder.match(/^(?:\r?\n[ \t]+[^\r\n]*)+/)?.[0] ?? '').trim();
        }
        if (value.startsWith('"')) {
          try { const parsed = JSON.parse(value); return typeof parsed === 'string' ? parsed : ''; } catch { return ''; }
        }
        if (value.startsWith("'")) return /^'(?:[^']|'')*'$/.test(value) ? value.slice(1, -1).replace(/''/g, "'") : '';
        const plain = value.replace(/\s+#.*$/, '').trim();
        return /^(?:null|true|false|~|\d+|\[.*|\{.*)$/i.test(plain) ? '' : plain;
      };
      const name = field('name');
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || name.length > 64) report(entry, 'name must be lowercase letters/digits separated by hyphens, at most 64 characters');
      if (!field('description')) report(entry, 'description must be nonempty text');
    }

    const files = [entry];
    const walk = (directory: string) => {
      for (const item of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, item.name);
        if (item.isDirectory()) walk(path);
        else if (item.isFile() && extname(path) === '.md') files.push(path);
      }
    };
    for (const directory of ['references', 'assets']) {
      const path = join(root, directory);
      try {
        if (!statSync(path).isDirectory()) report(path, 'expected a directory');
        else walk(path);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
        // Supporting directories are optional unless a Markdown link requires them.
      }
    }
    const readme = join(root, 'README.md');
    try { if (statSync(readme).isFile()) files.push(readme); } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    }
    const withoutCode = (text: string) => {
      let fence = '';
      return text.split(/\r?\n/).map(line => {
        const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/);
        if (!fence && marker) { fence = marker[1]; return ''; }
        if (fence) {
          if (new RegExp(`^\\s{0,3}${fence[0]}{${fence.length},}\\s*$`).test(line)) fence = '';
          return '';
        }
        return line;
      }).join('\n');
    };
    const anchors = (text: string): Set<string> => {
      const found = new Set<string>();
      const counts = new Map<string, number>();
      for (const match of withoutCode(text).matchAll(/^ {0,3}#{1,6}\s+(.+?)\s*#*\s*$/gm)) {
        const slug = match[1].toLowerCase().replace(/<[^>]*>/g, '').replace(/[^\p{L}\p{N}\p{M}_\-\s]/gu, '').replace(/\s/g, '-');
        const count = counts.get(slug) ?? 0;
        counts.set(slug, count + 1);
        found.add(count ? `${slug}-${count}` : slug);
      }
      for (const match of text.matchAll(/\b(?:id|name)=["']([^"']+)["']/g)) found.add(match[1]);
      return found;
    };
    for (const file of files) {
      const text = withoutCode(readFileSync(file, 'utf8')).replace(/`[^`\n]+`/g, '');
      const links = [
        ...text.matchAll(/!?\[[^\]\n]*\]\(\s*(<[^>]+>|[^\s)]+)(?:\s+["'][^\n]*?["'])?\s*\)/g),
        ...text.matchAll(/^ {0,3}\[[^\]]+\]:\s*(<[^>]+>|\S+)/gm),
      ];
      for (const link of links) {
        const destination = link[1].replace(/^<|>$/g, '');
        if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(destination)) continue;
        try {
          const [pathAndQuery, fragment] = destination.split('#', 2);
          const path = decodeURIComponent(pathAndQuery.split('?')[0]);
          const target = path ? resolve(dirname(file), path) : file;
          const info = statSync(target);
          if (fragment && info.isFile() && extname(target) === '.md' && !anchors(readFileSync(target, 'utf8')).has(decodeURIComponent(fragment))) {
            report(file, `missing heading anchor: ${destination}`);
          }
        } catch (error) {
          report(file, `invalid local link ${destination}: ${(error as Error).message}`);
        }
      }
    }
    if (errors.length) {
      console.error(errors.join('\n'));
      process.exitCode = 1;
    } else {
      console.log(`Skill structure valid: ${root} (${files.length} Markdown files checked)`);
    }
  } catch (error) {
    console.error(`Cannot validate skill: ${(error as Error).message}`);
    process.exitCode = 2;
  }
}
