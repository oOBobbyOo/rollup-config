import filesize from 'rollup-plugin-filesize';
import {
  uglify
} from 'rollup-plugin-uglify';
import {
  minify
} from 'uglify-es';

import baseConfig from './rollup.config.base';
import {
  name,
  version,
  author
} from '../package.json';

// banner
const banner =
  `${'/*!\n' + ' * '}${name}.js v${version}\n` +
  ` * (c) ${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */';

export default [
  // .js, .cjs.js, .esm.js
  {
    ...baseConfig,
    output: [
      // umd development version with sourcemap
      {
        file: `dist/js/${name}.js`,
        format: 'umd',
        name,
        banner,
        sourcemap: true
      },
      // iife version
      {
        file: `dist/js/${name}.iife.js`,
        format: 'iife',
        banner
      },
      // amd version
      {
        file: `dist/js/${name}.amd.js`,
        format: 'amd',
        banner
      },
      // cjs version
      {
        file: `dist/js/${name}.cjs.js`,
        format: 'cjs',
        banner
      },
      //  esm version
      {
        file: `dist/js/${name}.esm.js`,
        format: 'es',
        banner
      }
    ],
    plugins: [...baseConfig.plugins, filesize()]
  },
  // .min.js
  {
    ...baseConfig,
    output: [
      // umd with compress version
      {
        file: `dist/js/${name}.min.js`,
        format: 'umd',
        name,
        banner
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      uglify({
        compress: {
          drop_console: true
        }
      },
      minify),
      filesize()
    ]
  }
];