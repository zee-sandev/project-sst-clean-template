// vite.config.ts
import { defineConfig, configDefaults } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: './vitest.setup.ts', // optional: if you have setup files
    exclude: [...configDefaults.exclude, './src/web/src/tests/e2e/**/*']
  },
  plugins: [tsconfigPaths()]
})
