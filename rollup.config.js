import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';

import { uglify } from 'rollup-plugin-uglify';

import packageJSON from './package.json';

export default [
  {
    input: './src/index.js',
    output: {
      file: packageJSON.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      external(),
      resolve(),
      commonjs(),
      uglify(),
    ],
  },
];
