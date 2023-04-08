# node-module-template

This is a template for creating a node module.

## Build

Rollup is used to build the module. The configuration is in `rollup.config.js`.

```bash
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';

import packageJson from './package.json' assert { type: 'json' };

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
  plugins: [
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
```

1. @rollup/plugin-babel: Babel 플러그인을 사용하여 최신 JavaScript 문법을 이전 버전의 호환 가능한 코드로 변환합니다.
2. @rollup/plugin-commonjs: CommonJS 모듈을 ES6 모듈로 변환합니다. 이를 통해 npm 패키지와 호환성을 보장합니다.
3. @rollup/plugin-node-resolve: Node.js 모듈 해석 알고리즘을 사용하여 모듈 의존성을 해결합니다.
4. rollup-plugin-typescript2: TypeScript 코드를 JavaScript로 변환합니다.
5. rollup-plugin-peer-deps-external: 외부 peerDependencies를 번들에서 자동으로 제외합니다.
6. rollup-plugin-postcss: CSS 및 SCSS와 같은 스타일시트를 처리하고 모듈로 번들링합니다.

extensions 배열은 Rollup이 처리해야 하는 파일 확장자를 나열합니다.

export default는 Rollup에 대한 기본 설정을 내보냅니다. input은 번들의 시작점을 지정하고, output은 번들의 결과물을 저장할 경로와 포맷을 설정합니다. 이 설정에서는 CommonJS 및 ES 모듈 포맷을 사용하여 두 개의 번들을 생성합니다.

plugins 배열은 위에서 설명한 플러그인들을 포함합니다. 이 플러그인들은 번들링 과정에서 코드를 변환하고 최적화하는 데 사용됩니다.

이 설정은 라이브러리의 소스 코드를 효율적으로 번들링하고, 최신 JavaScript 및 TypeScript 문법을 지원하며, 스타일시트와 모듈 처리를 포함하는 등 다양한 요구 사항을 충족합니다.
