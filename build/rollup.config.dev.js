import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import baseConfig from './rollup.config.base';

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    serve({
      open: true,
      contentBase: './src',
      host: 'localhost',
      port: 1234
    }),
    livereload({
      watch: 'dist',
      verbose: false,
      https: true
    })
  ]
};