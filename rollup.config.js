import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/main.js',
  output: {
    file: './dist/bundle.js',
    format: 'umd',
    sourcemap: true
  },
  plugins: [
    json(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ],
  watch: {
    exclude: 'node_modules/**' // 防止文件被监控
  }
};