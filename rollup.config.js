// 导入 terser 插件, 用于压缩输出的JavaScript代码
import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
// 配置 Rollup 的输出选项
export default [
	{
		// 定义外部依赖, 这些不会被rollup打包到最终的bundle中
		external: ['@minecraft/server', '@minecraft/server-ui'],
		// 指定输入文件路径
		input: './DIR_OUTPUT/JavaScript/THE_OTHER_SHORE.js',
		// 配置输出选项
		output: [
			{
				// 指定输出文件路径
				file: '../development_behavior_packs/幻梦-Dream_BP/scripts/THE_OTHER_SHORE.js',
				/*
				 * 指定输出文件类型
				 * rollup支持的格式有:
				 * 'amd' - 异步模块定义, 用于像RequireJS这样的模块加载器
				 * 'cjs' - CommonJS, 适用于 Node 和 Browserify/Webpack
				 * 'es' - 将软件包保存为 ES 模块文件, 在现代浏览器中可以通过 <script type=module> 标签引入 </script>
				 * 'iife' - 一个自动执行的功能, 适合作为<script>标签, 将脚本保存为文件
				 * 'umd' - 通用模块定义, 以对 CommonJS, AMD 和浏览器全局变量的工作进行兼容
				 */
				format: 'es',
				// 启用源码映射
				sourcemap: false,
				/*
				 * 在输出阶段应用的插件列表
				 * 使用 terser 插件用于压缩代码
				 */
				plugins: [
					terser(
						{
							compress: {
								// 启用压缩和混淆
								drop_console: true, // 删除 console.log
								dead_code: true, // 删除未使用的代码
							},
							mangle: {
								// 启用变量名混淆
								properties: {
									regex: /^__/ // 可以选择混淆特定的属性名
								}
							},
							output: {
								comments: false // 删除注释
							}
						}
					)
				],
				treeshake: {
					moduleSideEffects: false, // 假定模块没有副作用, 移除未使用的模块
					propertyReadSideEffects: false, // 假定读取对象属性没有副作用, 移除未使用的属性
				}
			}
		]
	}
];