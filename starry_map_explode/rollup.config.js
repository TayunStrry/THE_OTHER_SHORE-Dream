import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';

export default [
	{
		external: [
			'@minecraft/server',
			'@minecraft/server-ui',
			// 添加其他不需要打包的第三方依赖
		],
		input: '../JS_cache/starryMapChain/THE_OTHER_SHORE.js',
		output: {
			file: '../development_behavior_packs/律令禁止_服务端/scripts/THE_OTHER_SHORE.js',
			format: 'es',
			sourcemap: false,
			plugins: [terser({
				compress: {
					unused: true,  // 删除未使用的变量/函数
					dead_code: true,  // 删除不可达代码
					join_vars: false  // 关闭变量合并（保持变量独立性）
				}
			})],
			// 增强 tree-shaking 配置
			treeshake: {
				annotations: true,     // 遵循代码注释中的纯函数标记
				moduleSideEffects: (id) => {
					// 通过文件路径判断是否包含副作用
					if (/@minecraft/.test(id)) return false;  // 排除 Minecraft 相关模块
					return false;  // 假设所有本地模块都没有副作用
				},
				propertyReadSideEffects: false,
				tryCatchDeoptimization: false,  // 关闭 try-catch 的保守处理
				unknownGlobalSideEffects: false
			}
		},
		plugins: [
			nodeResolve({
				moduleDirectories: ['node_modules'],
				// 强制 Rollup 使用 ES modules 版本
				mainFields: ['module', 'jsnext:main', 'main']
			}),
			// 添加可视化分析插件（调试时使用）
			require('rollup-plugin-visualizer').visualizer()
		]
	}
];