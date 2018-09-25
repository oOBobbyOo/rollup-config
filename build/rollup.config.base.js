import alias from 'rollup-plugin-alias';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import {
  eslint
} from 'rollup-plugin-eslint';

export default {
  input: 'src/main.js',
  output: {
    file: './dist/js/bundle.js',
    format: 'umd',
    name: 'base',
    sourcemap: true,
  },
  plugins: [
    alias({
      resolve: ['.js']
    }),
    json(),
    eslint(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    resolve({
      include: ['src/**/*.js']
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    })
  ]
};