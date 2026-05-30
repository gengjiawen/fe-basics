import { fileURLToPath } from 'node:url'
import preact from '@preact/preset-vite'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

const preactSource = (path: string) =>
  fileURLToPath(new URL(`./node_modules/preact/${path}`, import.meta.url))

const sourceOnlyDeps = [
  '@tanstack/react-virtual',
  'preact',
  'preact/compat',
  'preact/debug',
  'preact/devtools',
  'preact/hooks',
  'preact/jsx-dev-runtime',
  'preact/jsx-runtime',
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-dev-runtime',
  'react/jsx-runtime',
]

type OptimizerTarget = {
  optimizeDeps: {
    include?: string[]
  }
}

const keepSourceDepsOutOfOptimizer = (): Plugin => {
  const sourceOnlyDepSet = new Set(sourceOnlyDeps)
  const removeSourceDeps = (target: OptimizerTarget) => {
    target.optimizeDeps.include = target.optimizeDeps.include?.filter(
      (dependency) => !sourceOnlyDepSet.has(dependency),
    )
  }

  return {
    name: 'keep-source-deps-out-of-optimizer',
    enforce: 'post',
    configResolved(config) {
      removeSourceDeps(config)
      removeSourceDeps(config.environments.client)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    minify: false,
    rolldownOptions: {
      output: {
        codeSplitting: false,
      },
    },
  },
  optimizeDeps: {
    exclude: sourceOnlyDeps,
  },
  plugins: [
    preact({ reactAliasesEnabled: false }),
    keepSourceDepsOutOfOptimizer(),
    viteSingleFile(),
  ],
  resolve: {
    alias: [
      {
        find: /^react$/,
        replacement: preactSource('compat/src/index.js'),
      },
      {
        find: /^react-dom$/,
        replacement: preactSource('compat/src/index.js'),
      },
      {
        find: /^react-dom\/client$/,
        replacement: preactSource('compat/client.mjs'),
      },
      {
        find: /^react\/jsx-dev-runtime$/,
        replacement: preactSource('compat/jsx-dev-runtime.mjs'),
      },
      {
        find: /^react\/jsx-runtime$/,
        replacement: preactSource('compat/jsx-runtime.mjs'),
      },
      {
        find: /^preact\/debug$/,
        replacement: preactSource('debug/src/index.js'),
      },
      {
        find: /^preact\/devtools$/,
        replacement: preactSource('devtools/src/index.js'),
      },
      {
        find: /^preact\/hooks$/,
        replacement: preactSource('hooks/src/index.js'),
      },
      {
        find: /^preact\/jsx-dev-runtime$/,
        replacement: preactSource('jsx-runtime/src/index.js'),
      },
      {
        find: /^preact\/jsx-runtime$/,
        replacement: preactSource('jsx-runtime/src/index.js'),
      },
      {
        find: /^preact\/compat$/,
        replacement: preactSource('compat/src/index.js'),
      },
      { find: /^preact$/, replacement: preactSource('src/index.js') },
    ],
  },
})
