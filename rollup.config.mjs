import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

import fs from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const configPath = join(
  dirname(fileURLToPath(import.meta.url)),
  './package.json',
);
const packageJson = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const extensions = ['js', 'jsx', 'ts', 'tsx', 'mjs'];

export default {
  input: './src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: [
    'react',
    'react-dom',
    /^react$/,
    /^react-dom$/,
    /^@types\/react$/,
    /^@types\/react-dom$/,
  ],
  plugins: [
    eslint({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    }),
    peerDepsExternal(),
    nodeResolve({ extensions }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions,
      include: ['src/**/*'],
    }),
    postcss({
      extract: false,
      modules: true,
      sourceMap: false,
      use: ['sass'],
    }),
  ],
};
