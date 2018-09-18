```
import $ from 'jquery';
import _ from 'lodash';

export default {
  input: 'src/main.js',         //包的入口点 (例如：你的 main.js 或者 app.js 或者 index.js)
  output: {
    file: './dist/bundle.js',   //输出文件(file -o/--output.file)
    format: 'umd',              //设置打包的模式，比如 umd,cjs,iife 等
    name: 'MyBundle',           //生成包名称(name -n/--name)
    sourcemap: true,
    paths: {},
    globals: {
      jquery: '$'
    }
  },
  plugins: [],                  //插件配置
  external: ['lodash'],         //指出应将哪些模块视为外部模块
  watch: {
    exclude: 'node_modules/**'  // 防止文件被监控
  }
};
```

```
rollup --help

rollup src/main.js --o bundle.js --f iife
```

格式(format -f/--output.format)

amd - AMD – 异步模块定义，用于像 RequireJS 这样的模块加载器
cjs - CommonJS - 适用于 Node 和 Browserify/Webpack
es - ES6 modules - 将软件包保存为 ES 模块文件
iife – 一个自动执行的功能，适合作为\<script>标签。
umd - UMD - 通用模块定义，以 amd，cjs 和 iife 为一体
system - SystemJS loader

```
npm i -D rollup-plugin-babel          // 换成 ES2015
npm i -D rollup-plugin-commonjs       // 用来将 CommonJS 转换成 ES2015 模块
npm i -D rollup-plugin-node-resolve   // 可以告诉 Rollup 如何查找外部模块
npm i -D rollup-plugin-json           // Rollup 从 JSON 文件中读取数据
npm i -D rollup-plugin-uglify         // 压缩js
```

- 请注意，rollup-plugin-commonjs 应该用在其他插件转换你的模块之前 - 这是为了防止其他插件的改变破坏 CommonJS 的检测。
