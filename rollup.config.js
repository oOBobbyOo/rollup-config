import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const now = new Date(
  process.env.SOURCE_DATE_EPOCH ? process.env.SOURCE_DATE_EPOCH * 1000 : new Date().getTime()
).toUTCString();

const banner = `/*
  @license
    Rollup.js v${pkg.version}
    ${now}
    https://github.com/rollup/rollup
    Released under the MIT License.
*/`;

export default {
  input: 'src/main.js',
  output: {
    file: './dist/bundle.js',
    format: 'umd',
    sourcemap: true,
    banner
  },
  plugins: [
    json(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    postcss({
      modules: true,
      plugins: [autoprefixer, cssnano],
      extract: 'dist/css/bundle.css' // 输出路径
    }),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    serve({
      open: true,
      contentBase: './src',
      host: 'localhost',
      port: 10001,
    }),
    livereload(),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ],
  watch: {
    exclude: 'node_modules/**' // 防止文件被监控
  }
};