# Rollup config

```js
import $ from 'jquery';
import _ from 'lodash';

export default {
	input: 'src/main.js', //包的入口点 (例如：你的 main.js 或者 app.js 或者 index.js)
	output: {
		file: './dist/bundle.js', //输出文件(file -o/--output.file)
		format: 'umd', //设置打包的模式，比如 umd,cjs,iife 等
		name: 'MyBundle', //生成包名称(name -n/--name)
		sourcemap: true,
		paths: {},
		globals: {
			jquery: '$'
		}
	},
	plugins: [], //插件配置
	external: ['lodash'], //指出应将哪些模块视为外部模块
	watch: {
		exclude: 'node_modules/**' // 防止文件被监控
	}
};
```

```js
npm install --global rollup  //全局安装

rollup --help

-i, --input                 要打包的文件（必须）
-o, --output.file           输出的文件 (如果没有这个参数，则直接输出到控制台)
-f, --output.format [es]    输出的文件类型 (amd, cjs, es, iife, umd)
-e, --external              将模块ID的逗号分隔列表排除
-g, --globals               以`module ID:Global` 键值对的形式，用逗号分隔开
                              任何定义在这里模块ID定义添加到外部依赖
-n, --name                  生成UMD模块的名字
-m, --sourcemap             生成 sourcemap (`-m inline` for inline map)
--amd.id                    AMD模块的ID，默认是个匿名函数
--amd.define                使用Function来代替`define`
--no-strict                 在生成的包中省略`"use strict";`
--no-conflict               对于UMD模块来说，给全局变量生成一个无冲突的方法
--intro                     在打包好的文件的块的内部(wrapper内部)的最顶部插入一段内容
--outro                     在打包好的文件的块的内部(wrapper内部)的最底部插入一段内容
--banner                    在打包好的文件的块的外部(wrapper外部)的最顶部插入一段内容
--footer                    在打包好的文件的块的外部(wrapper外部)的最底部插入一段内容
--interop                   包含公共的模块（这个选项是默认添加的）


rollup src/main.js --o bundle.js --f iife
```

指定与默认 rollup.config.js 文件不同的配置文件:

```js
rollup --config rollup.config.dev.js
rollup --config rollup.config.prod.js
```

格式(format -f/--output.format):

```js
amd - AMD – 异步模块定义，用于像 RequireJS 这样的模块加载器
cjs - CommonJS - 适用于 Node 和 Browserify/Webpack
es - ES6 modules - 将软件包保存为 ES 模块文件
iife – 一个自动执行的功能，适合作为\<script>标签。
umd - UMD - 通用模块定义，以 amd，cjs 和 iife 为一体
system - SystemJS loader
```

插件(plugins):

```js
npm i -D rollup-plugin-babel          // 转换成 ES2015
npm i -D rollup-plugin-commonjs       // 用来将 CommonJS 转换成 ES2015 模块
npm i -D rollup-plugin-node-resolve   // 可以告诉 Rollup 如何查找外部模块
npm i -D rollup-plugin-json           // Rollup 从 JSON 文件中读取数据
npm i -D rollup-plugin-uglify         // 压缩js
```

- 请注意，rollup-plugin-commonjs 应该用在其他插件转换你的模块之前 - 这是为了防止其他插件的改变破坏 CommonJS 的检测。
