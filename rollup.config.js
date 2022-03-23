// rollup.config.js
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'rollup';
import styles from 'rollup-plugin-styles';
import typescript from '@rollup/plugin-typescript';

const options = defineConfig({
  input: 'src/index.ts',
  output: {
    sourcemap: 'hidden',
    dir: 'dist',
    format: 'esm',
    assetFileNames: '[name].css',
  },
  plugins: [
    styles({ mode: ['extract'], minimize: true }),
    typescript({
      removeComments: true,
      exclude: [
        '**/__tests__',
        '**/*.spec.ts',
        '**/*.util.ts',
        '**/*.stories.tsx',
      ],
    }),
    babel({ babelHelpers: 'bundled' }),
  ],
});

export default options;
