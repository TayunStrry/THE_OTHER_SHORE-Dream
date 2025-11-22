/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 物品特例组件
 */
import sword_component from "./sword_component";
/*
 * 计划执行模块
 */
import { Control } from '../system/plan';
/*
 * < 物品自定义组件 > 初始化前 事件
 */
// @ts-expect-error
server.world.beforeEvents.worldInitialize.subscribe(
	data => {
		/**
		 * * 物品自定义组件
		 */
		const custom_component = new Map<string, server.ItemCustomComponent>(
			[
				...sword_component
			]
		);
		/**
		 * * 获取 自定义组件实现
		 */
		const customs = [...custom_component.values()];
		/**
		 * * 获取 自定义组件名称
		 */
		const names = [...custom_component.keys()];
		// 注册 自定义组件
		for (let index = 0; index < customs.length; index++) data.itemComponentRegistry.registerCustomComponent(names[index], customs[index]);
	}
);
// 运行 计划表
server.system.runInterval(() => Control.execute());