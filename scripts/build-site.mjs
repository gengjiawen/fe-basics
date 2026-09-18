// Aggregates the workspace builds into one static site so the whole repository
// can be previewed from a single deployment: every buildable package is copied
// to dist/<package-dir>/ and a generated index page links to them.
// Run `pnpm build` first, or use `pnpm build:site` which does both.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE_TITLE = 'Back to FE Basics'
const SITE_TAGLINE = 'Small frontend examples. Each directory focuses on one topic.'

const root = fileURLToPath(new URL('..', import.meta.url))
const outDir = resolve(root, 'dist')

const readManifest = (packageDir) =>
  JSON.parse(readFileSync(resolve(packageDir, 'package.json'), 'utf8'))

// Every workspace package that produces a build, as listed by pnpm itself so
// that adding a package to pnpm-workspace.yaml is enough to publish it here.
const listExamples = () => {
  const workspace = JSON.parse(
    execFileSync('pnpm', ['ls', '--recursive', '--depth', '-1', '--json'], {
      cwd: root,
      encoding: 'utf8',
    }),
  )

  return workspace
    .filter((pkg) => resolve(pkg.path) !== resolve(root))
    .map((pkg) => ({ dir: relative(root, pkg.path), manifest: readManifest(pkg.path) }))
    .filter((pkg) => pkg.manifest.scripts?.build)
    .map((pkg) => ({ dir: pkg.dir, description: pkg.manifest.description ?? '' }))
    .sort((a, b) => a.dir.localeCompare(b.dir))
}

const htmlEntities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
const escapeHtml = (value) => value.replace(/[&<>"]/g, (char) => htmlEntities[char])

const renderIndex = (examples) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(SITE_TITLE)}</title>
    <style>
      :root {
        color-scheme: light dark;
        --bg: #ffffff;
        --fg: #18181b;
        --muted: #71717a;
        --border: #e4e4e7;
        --card: #fafafa;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --bg: #0b0b0e;
          --fg: #f4f4f5;
          --muted: #a1a1aa;
          --border: #27272a;
          --card: #141418;
        }
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 4rem 1.5rem;
        background: var(--bg);
        color: var(--fg);
        font: 16px/1.6 ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
      }
      main {
        max-width: 42rem;
        margin-inline: auto;
      }
      h1 {
        margin: 0 0 0.5rem;
        font-size: 1.875rem;
        letter-spacing: -0.02em;
      }
      .tagline {
        margin: 0 0 2.5rem;
        color: var(--muted);
      }
      ul {
        display: grid;
        gap: 0.75rem;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      a {
        display: block;
        padding: 1.25rem;
        border: 1px solid var(--border);
        border-radius: 0.75rem;
        background: var(--card);
        color: inherit;
        text-decoration: none;
        transition: border-color 0.15s ease, transform 0.15s ease;
      }
      a:hover {
        border-color: var(--muted);
        transform: translateY(-1px);
      }
      .name {
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-weight: 600;
      }
      .description {
        margin: 0.375rem 0 0;
        color: var(--muted);
        font-size: 0.9375rem;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeHtml(SITE_TITLE)}</h1>
      <p class="tagline">${escapeHtml(SITE_TAGLINE)}</p>
      <ul>
${examples
  .map(
    (example) => `        <li>
          <a href="./${escapeHtml(example.dir)}/">
            <span class="name">${escapeHtml(example.dir)}</span>
            <p class="description">${escapeHtml(example.description)}</p>
          </a>
        </li>`,
  )
  .join('\n')}
      </ul>
    </main>
  </body>
</html>
`

const examples = listExamples()

await rm(outDir, { recursive: true, force: true })
await mkdir(outDir, { recursive: true })

for (const example of examples) {
  const packageDist = resolve(root, example.dir, 'dist')

  if (!existsSync(packageDist)) {
    throw new Error(`${example.dir}/dist is missing. Run "pnpm build" before aggregating.`)
  }

  await cp(packageDist, resolve(outDir, example.dir), { recursive: true })
}

await writeFile(resolve(outDir, 'index.html'), renderIndex(examples))

console.log(`Aggregated ${examples.length} examples into dist/`)
