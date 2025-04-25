/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 方块组件
 */
import * as magic_cable from "./magic_cable";
import * as servo_drive from "./servo_drive";
import * as machine_gate from "./machine_gate";
import * as magic_weapon from "./magic_weapon";
import * as storage_manage from "./storage_manage";
import * as mineral_project from "./mineral_project";
import * as obsidian_smelting from "./obsidian_smelting";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import * as table from "../data/table";
import * as type from "../data/type";
/**
 * * 进行检测的默认标签
 */
const defaultState = 'STATE:rune_type';
/**
 ** 时间积分
 */
const tickScore = new Map<string, [string, number]>();
/**
 ** 常规类型 物品网络 申请
 */
let routineLogisticsRequest = new Map<string, server.Vector3>();
/**
 ** 跨越维度 物品网络 申请
 */
let surpassDimensionRequest = new Map<string, [server.Dimension, server.Vector3]>();
/**
 * * 组件前缀代词
 */
const componentPrefix = 'opal:tick.';
/**
 * * 方块自定义组件列表
 */
const components = new Map<string, server.BlockCustomComponent>();
/**
 * * 方块组件参数 的 解构
 */
interface TICK_COMPONENT {
	/**
	 ** 默认的方块状态的值
	 */
	condition: string | number | boolean;
	/**
	 ** 方块状态
	 */
	state: server.BlockPermutation;
	/**
	 ** 方块对象
	 */
	block: server.Block;
	/**
	 * * 方块维度
	 */
	dimension: server.Dimension;
};
/**
 ** 方块计时器
 *
 * 此方法为方块对象设置一个单调递增的计时器,
 * 当计时器的值达到或超过指定的时间节点时,
 * 执行一个回调函数,
 * 计时器用于跟踪每个方块的位置和积分,
 * 以便在特定条件下触发事件
 *
 * @param {server.Block} block - 预约时钟事件的方块对象
 *
 * @param {number} bounds - 触发事件的时间节点
 *
 * @param {(block: server.Block) => void} after - 当计时器的值达到或超过界限时执行的事件回调函数
 *
 * @returns {Error | void} - 错误对象或空值
 */
function blockTimer(block: server.Block, bounds: number, after: (block: server.Block) => void): Error | void {
	/**
	 ** 方块位置
	 */
	const position = opal.Vector.toString(block.location);
	/**
	 ** 时间积分
	 */
	const onTick = tickScore.get(position);
	// 创建时间积分
	if (!onTick || onTick[0] != block.typeId) tickScore.set(position, [block.typeId, 1]);
	// 判断与赋值事件积分
	else if (onTick && onTick[1] <= bounds) tickScore.set(position, [block.typeId, onTick[1] + 1]);
	// 执行事件
	else {
		// 移除当前方块位置的时间积分
		tickScore.delete(opal.Vector.toString(block.location));
		// 尝试执行回调函数
		try {
			return after(block);
		}
		catch (error) { return error as Error; }
	}
};
/**
 * * 方块时钟组件
 *
 * @param source - 方块组件参数
 */
function TickComponentTrigger(source: server.BlockComponentTickEvent): TICK_COMPONENT {
	/**
	 * * 方块对象
	 */
	const block = source.block;
	/**
	 * * 方块状态
	 */
	const state = source.block.permutation;
	/**
	 * * 方块维度
	 */
	const dimension = source.dimension;
	/**
	 * * 默认的方块状态的值
	 */
	const condition = state.getState(defaultState) ?? 0;
	// 返回 方块组件 的 解构
	return { block, state, condition, dimension };
};
/*
 * 虚无方块
 */
components.set(componentPrefix + 'unreal_space',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 修饰方块状态
			if (analysis.state.getState('STATE:stage') == 0) opal.TrySetPermutation(analysis.block, 'STATE:stage', 2);
			// 预约时钟事件
			blockTimer(analysis.block, 20, block => block.setPermutation(server.BlockPermutation.resolve('minecraft:air')));
		}
	}
);
/*
 * 虚空方块
 */
components.set(componentPrefix + 'nihility_space',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 播放音效
			analysis.dimension.playSound('use.stone', analysis.block.location);
			// 修改 方块属性
			switch (analysis.state.getState('STATE:value')) {
				case 0: opal.TrySetPermutation(analysis.block, 'STATE:value', 1); break;

				case 1: opal.TrySetPermutation(analysis.block, 'STATE:value', 2); break;

				case 2: opal.TrySetPermutation(analysis.block, 'STATE:value', 3); break;

				case 3: opal.TrySetPermutation(analysis.block, 'STATE:value', 4); break;

				case 4: opal.TrySetPermutation(analysis.block, 'STATE:value', 5); break;

				case 5: opal.TrySetPermutation(analysis.block, 'STATE:value', 6); break;

				case 6: opal.TrySetPermutation(analysis.block, 'STATE:value', 7); break;

				case 7: opal.TrySetPermutation(analysis.block, 'STATE:value', 8); break;

				case 8: opal.TrySetPermutation(analysis.block, 'STATE:value', 9); break;

				default:
					analysis.dimension.playSound('beacon.activate', analysis.block.location);
					analysis.block.setPermutation(server.BlockPermutation.resolve('minecraft:air'));
					break;
			}
		}
	}
);
/*
 * 基础总线
 */
components.set(componentPrefix + 'basic_pipeline',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 判断方块的元素类型状态
			if (analysis.condition != 0 && analysis.condition != 9) magic_cable.defaultEvent(analysis.block, 'Xx-Yy-Zz', analysis.state);
			// 重置方块元素类型
			else if (analysis.condition == 9) {
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
				opal.TrySetPermutation(analysis.block, 'STATE:direction_positive.X', analysis.block.offset(opal.Vector.CONSTANT_EAST)?.hasTag('tags:magic_cable.port_negative.X') ?? false);
				opal.TrySetPermutation(analysis.block, 'STATE:direction_negative.X', analysis.block.offset(opal.Vector.CONSTANT_WEST)?.hasTag('tags:magic_cable.port_positive.X') ?? false);
				opal.TrySetPermutation(analysis.block, 'STATE:direction_positive.Y', analysis.block.offset(opal.Vector.CONSTANT_UP)?.hasTag('tags:magic_cable.port_negative.Y') ?? false);
				opal.TrySetPermutation(analysis.block, 'STATE:direction_negative.Y', analysis.block.offset(opal.Vector.CONSTANT_DOWN)?.hasTag('tags:magic_cable.port_positive.Y') ?? false);
				opal.TrySetPermutation(analysis.block, 'STATE:direction_negative.Z', analysis.block.offset(opal.Vector.CONSTANT_NORTH)?.hasTag('tags:magic_cable.port_positive.Z') ?? false);
				opal.TrySetPermutation(analysis.block, 'STATE:direction_positive.Z', analysis.block.offset(opal.Vector.CONSTANT_SOUTH)?.hasTag('tags:magic_cable.port_negative.Z') ?? false);
			};
		}
	}
);
/*
 * 脉冲锁存
 */
components.set(componentPrefix + 'pulse_latch',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * * 方块前处理事件
			 */
			function beforeEvent() {
				// 尝试根据分析结果设置权限, 以确保正确的条件被满足
				opal.TrySetPermutation(analysis.block, 'STATE:rune_note', analysis.condition);
				// 强制重置类型, 确保不受之前状态的影响
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
				// 触发魔法电缆的更新事件锁定, 以即时反映当前的状态改变
				magic_cable.LatchUpdateEvent(analysis.block);
			};
			/**
			 * * 方块后处理事件
			 */
			function afterEvent() {
				opal.TrySetPermutation(analysis.block, 'STATE:rune_note', 0);
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
			};
			// 判断方块的元素类型, 如果条件满足且尚未设置, 则执行前处理事件
			if (analysis.condition != 0 && analysis.state.getState('STATE:rune_note') == 0) beforeEvent();
			// 如果条件满足且已设置, 则执行后处理事件
			else if (analysis.condition != 0 && analysis.state.getState('STATE:rune_note') != 0) afterEvent();
			// 设置方块在X, Y, Z轴的朝向属性
			opal.TrySetPermutation(analysis.block, 'STATE:direction_positive.X', (analysis.block.offset(opal.Vector.CONSTANT_EAST)?.hasTag('tags:magic_cable.port_negative.X') || analysis.block.offset(opal.Vector.CONSTANT_EAST)?.hasTag('tags:magic_cable.logic_negative.X')) ?? false);
			opal.TrySetPermutation(analysis.block, 'STATE:direction_negative.X', (analysis.block.offset(opal.Vector.CONSTANT_WEST)?.hasTag('tags:magic_cable.port_positive.X') || analysis.block.offset(opal.Vector.CONSTANT_WEST)?.hasTag('tags:magic_cable.logic_positive.X')) ?? false);
			opal.TrySetPermutation(analysis.block, 'STATE:direction_positive.Y', (analysis.block.offset(opal.Vector.CONSTANT_UP)?.hasTag('tags:magic_cable.port_negative.Y') || analysis.block.offset(opal.Vector.CONSTANT_UP)?.hasTag('tags:magic_cable.logic_negative.Y')) ?? false);
			opal.TrySetPermutation(analysis.block, 'STATE:direction_negative.Y', (analysis.block.offset(opal.Vector.CONSTANT_DOWN)?.hasTag('tags:magic_cable.port_positive.Y') || analysis.block.offset(opal.Vector.CONSTANT_DOWN)?.hasTag('tags:magic_cable.logic_positive.Y')) ?? false);
			opal.TrySetPermutation(analysis.block, 'STATE:direction_positive.Z', (analysis.block.offset(opal.Vector.CONSTANT_SOUTH)?.hasTag('tags:magic_cable.port_negative.Z') || analysis.block.offset(opal.Vector.CONSTANT_SOUTH)?.hasTag('tags:magic_cable.logic_negative.Z')) ?? false);
			opal.TrySetPermutation(analysis.block, 'STATE:direction_negative.Z', (analysis.block.offset(opal.Vector.CONSTANT_NORTH)?.hasTag('tags:magic_cable.port_positive.Z') || analysis.block.offset(opal.Vector.CONSTANT_NORTH)?.hasTag('tags:magic_cable.logic_positive.Z')) ?? false);
		}
	}
);
/*
 * 超导枢纽
 */
components.set(componentPrefix + 'super_omphalos',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 判断方块的元素类型状态
			if (analysis.condition != 0 && analysis.condition != 9) magic_cable.superOmphalos(analysis.block, analysis.state);
			// 重置方块元素类型
			else if (analysis.condition == 9) opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
		}
	}
);
/*
 * 超导髓鞘
 */
components.set(componentPrefix + 'super_pulse',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const { condition, block, dimension, state } = TickComponentTrigger(source);
			// 判断方块的元素类型状态
			if (condition != 0 && condition != 9) {
				/**
				 * * 修改 目标方块状态 并 返回 射线动画 的 终点
				 */
				const done = magic_cable.superPulse(block, state.getState('minecraft:block_face') as string);
				// 创建自由指针
				if (done && done?.isValid) opal.SetFreePointer({ location: block.bottomCenter(), dimension }, done.bottomCenter(), 0.5);
			}
			// 重置方块元素类型
			else if (condition == 9) opal.TrySetPermutation(block, 'STATE:rune_type', 0);
		}
	}
);
/*
 * 传播许可
 */
components.set(componentPrefix + 'enable_control',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 判断方块的元素类型状态
			if (analysis.condition != 0 && analysis.condition != 9) {
				/**
				 ** 上方方块
				 */
				const above = analysis.block.above();
				/**
				 ** 下方方块
				 */
				const below = analysis.block.below();
				/**
				 ** 方块标签
				 */
				const tag = 'tags:magic_cable.open';
				// 检测 脉冲锁存 是否开启
				if (above?.hasTag(tag) || below?.hasTag(tag)) {
					magic_cable.defaultEvent(analysis.block, 'Xx-0-Zz', analysis.state);
					opal.TrySetPermutation(analysis.block, 'STATE:stage', 1)
				}
				else if (!above?.hasTag(tag) && !below?.hasTag(tag)) {
					opal.TrySetPermutation(analysis.block, 'STATE:stage', 0)
					opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0)
				}
			}
			// 重置方块元素类型
			else if (analysis.condition == 9) opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
		}
	}
);
/*
 * 红石侦测
 */
components.set(componentPrefix + 'redstone_detection',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 判断方块的红石能量强度
			magic_cable.redstoneDetection(analysis.block, 'Xx-0-Zz');
		}
	}
);
/*
 * 计数模块
 */
components.set(componentPrefix + 'counting_module',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * * 方块前处理事件
			 */
			function beforeEvent() {
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
				opal.TrySetPermutation(analysis.block, 'STATE:count', 0);
				magic_cable.logicComponents(analysis.block, 'Xx-Yy-Zz');
			};
			/**
			 * * 方块后处理事件
			 */
			function afterEvent() {
				const count = analysis.state.getState('STATE:count') as number;
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
				opal.TrySetPermutation(analysis.block, 'STATE:count', count + 1);
			};
			if (analysis.state.getState('STATE:input') == analysis.state.getState('STATE:count')) beforeEvent();
			else if ((analysis.state.getState('STATE:input') != analysis.state.getState('STATE:count')) && analysis.state.getState('STATE:count') != 10) afterEvent();
		}
	}
);
/*
 * 交互终端
 */
components.set(componentPrefix + 'control_panel',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * * 方块前处理事件
			 */
			function beforeEvent() {
				switch (analysis.state.getState('minecraft:block_face')) {
					case 'down':
						magic_cable.interactiveTerminal(analysis.block, 'Xx-Y-Zz', analysis.state);
						break;

					case 'up':
						magic_cable.interactiveTerminal(analysis.block, 'Xx-y-Zz', analysis.state);
						break;

					case 'north':
						magic_cable.interactiveTerminal(analysis.block, 'Xx-Yy-Z', analysis.state);
						break;

					case 'south':
						magic_cable.interactiveTerminal(analysis.block, 'Xx-Yy-z', analysis.state);
						break;

					case 'west':
						magic_cable.interactiveTerminal(analysis.block, 'X-Yy-Zz', analysis.state);
						break;

					case 'east':
						magic_cable.interactiveTerminal(analysis.block, 'x-Yy-Zz', analysis.state);
						break;

					default: break;
				};
				opal.TrySetPermutation(analysis.block, 'STATE:stage', 2);
			};
			/**
			 * * 方块后处理事件
			 */
			function afterEvent() {
				opal.TrySetPermutation(analysis.block, 'STATE:stage', 0);
			};
			if (analysis.state.getState('STATE:stage') == 1) beforeEvent();
			else if (analysis.state.getState('STATE:stage') == 2) afterEvent();
		}
	}
);
/*
 * 逻辑非门
 */
components.set(componentPrefix + 'logic_inverter',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 方块状态值
			 */
			const face = analysis.state.getState('minecraft:block_face') as string;
			/**
			 ** 方块标签
			 */
			const tag = 'tags:magic_cable.open';
			// 判断设备朝向
			switch (face) {
				case 'up':
					if (!analysis.block.offset(opal.Vector.CONSTANT_UP)?.hasTag(tag)) magic_cable.logicComponents(analysis.block, '0-y-0');
					break;

				case 'down':
					if (!analysis.block.offset(opal.Vector.CONSTANT_DOWN)?.hasTag(tag)) magic_cable.logicComponents(analysis.block, '0-Y-0');
					break;

				case 'north':
					if (!analysis.block.offset(opal.Vector.CONSTANT_NORTH)?.hasTag(tag)) magic_cable.logicComponents(analysis.block, '0-0-Z');
					break;

				case 'south':
					if (!analysis.block.offset(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag)) magic_cable.logicComponents(analysis.block, '0-0-z');
					break;

				case 'east':
					if (!analysis.block.offset(opal.Vector.CONSTANT_EAST)?.hasTag(tag)) magic_cable.logicComponents(analysis.block, 'x-0-0');
					break;

				case 'west':
					if (!analysis.block.offset(opal.Vector.CONSTANT_WEST)?.hasTag(tag)) magic_cable.logicComponents(analysis.block, 'X-0-0');
					break;

				default: break;
			}
		}
	}
);
/*
 * 逻辑异或
 */
components.set(componentPrefix + 'logic_exclusive_or',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * 获取目标方块
			 *
			 * @param input - 方块偏移
			 *
			 * @returns {server.Block | undefined} - 返回方块对象
			 */
			const target = (input: server.Vector3): server.Block | undefined => analysis.block.offset(input);
			/**
			 ** 方块状态值
			 */
			const face = analysis.state.getState('minecraft:block_face') as string;
			/**
			 ** 方块标签
			 */
			const tag = 'tags:magic_cable.open';
			// 判断设备朝向
			switch (face) {
				case 'up':
					if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) || target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
						if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) != target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
							magic_cable.logicComponents(analysis.block, '0-y-0');
					break;

				case 'down':
					if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) || target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
						if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) != target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
							magic_cable.logicComponents(analysis.block, '0-Y-0');
					break;

				case 'north':
					if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) || target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
						if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) != target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
							magic_cable.logicComponents(analysis.block, '0-0-Z');
					break;

				case 'south':
					if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) || target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
						if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) != target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
							magic_cable.logicComponents(analysis.block, '0-0-z');
					break;

				case 'east':
					if (target(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag) || target(opal.Vector.CONSTANT_NORTH)?.hasTag(tag))
						if (target(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag) != target(opal.Vector.CONSTANT_NORTH)?.hasTag(tag))
							magic_cable.logicComponents(analysis.block, 'x-0-0');
					break;

				case 'west':
					if (target(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag) || target(opal.Vector.CONSTANT_NORTH)?.hasTag(tag))
						if (target(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag) != target(opal.Vector.CONSTANT_NORTH)?.hasTag(tag))
							magic_cable.logicComponents(analysis.block, 'X-0-0');
					break;

				default: break;
			};
			// 状态重置
			opal.TrySetPermutation(analysis.block, 'STATE:stage', 0);
		}
	}
);
/*
 * 逻辑与门
 */
components.set(componentPrefix + 'logic_and_gate',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * 获取目标方块
			 *
			 * @param input - 方块偏移
			 *
			 * @returns {server.Block | undefined} - 返回方块对象
			 */
			const target = (input: server.Vector3): server.Block | undefined => analysis.block.offset(input);
			/**
			 ** 方块状态值
			 */
			const face = analysis.state.getState('minecraft:block_face') as string;
			/**
			 ** 方块标签
			 */
			const tag = 'tags:magic_cable.open';
			// 判断方块状态
			switch (face) {
				case 'up':
					if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) && target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
						magic_cable.logicComponents(analysis.block, '0-y-0');
					break;

				case 'down':
					if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) && target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
						magic_cable.logicComponents(analysis.block, '0-Y-0');
					break;

				case 'north':
					if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) && target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
						magic_cable.logicComponents(analysis.block, '0-0-Z');
					break;

				case 'south':
					if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) && target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
						magic_cable.logicComponents(analysis.block, '0-0-z');
					break;

				case 'east':
					if (target(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag) && target(opal.Vector.CONSTANT_NORTH)?.hasTag(tag))
						magic_cable.logicComponents(analysis.block, 'x-0-0');
					break;

				case 'west':
					if (target(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag) && target(opal.Vector.CONSTANT_NORTH)?.hasTag(tag))
						magic_cable.logicComponents(analysis.block, 'X-0-0');
					break;

				default: break;
			};
			// 状态重置
			opal.TrySetPermutation(analysis.block, 'STATE:stage', 0);
		}
	}
);
/*
 * 校准型-逻辑非门
 */
components.set(componentPrefix + 'correct_logic_not', correctLogicNot());
function correctLogicNot(): server.BlockCustomComponent {
	/**
	 * 控制 魔导总线-脉冲锁存 的状态
	 *
	 * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
	 *
	 * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
	 *
	 * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
	 *
	 * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
	 */
	function controlState(block: server.Block, offset: server.Vector3, state: number) {
		/**
		 * 创建 Molang 变量映射对象
		 */
		const molang = new server.MolangVariableMap();
		/**
		 * 获取当前方块的锁存控制位状态
		 */
		const control = block.offset(offset)?.hasTag('tags:magic_cable.open') ?? false;
		// 遍历 1 到 15 之间的所有可能的指标位置
		for (let index = 1; index < 16; index++) {
			/**
			 * 根据当前指标计算目标位置
			 */
			const indicator = opal.Vector.multiply(offset, -index);
			/**
			 * 获取相对位置的方块对象
			 */
			const target = block.offset(indicator);
			// 跳过无效位置
			if (!target) continue;
			// 尝试设置粒子参数
			molang.setColorRGB('variable.color', [...table.rune_color][state - 1][1]);
			// 尝试生成粒子
			opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
			// 如果目标位置不是脉冲锁存器, 则跳过当前循环
			if (!target.hasTag('tags:magic_cable.latch')) continue;
			// 尝试设置目标位置的方块状态值
			opal.TrySetPermutation(target, 'STATE:rune_note', !control ? state : 0);
			// 判断锁存器激活事件是否完成冷却
			if (!opal.TriggerControl('锁存器激活事件', target, 10)) return;
			// 更新锁存器事件
			magic_cable.LatchUpdateEvent(target);
			// 设置完成后, 跳出循环
			break;
		}
	};
	return {
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * * 方块状态值
			 */
			const face = analysis.state.getState('minecraft:block_face') as string;
			/**
			 * * 方块的色彩状态值
			 */
			const color = analysis.state.getState('STATE:color') as number;
			// 判断设备朝向
			switch (face) {
				case 'up':
					controlState(analysis.block, opal.Vector.CONSTANT_UP, color);
					break;

				case 'down':
					controlState(analysis.block, opal.Vector.CONSTANT_DOWN, color);
					break;

				case 'north':
					controlState(analysis.block, opal.Vector.CONSTANT_NORTH, color);
					break;

				case 'south':
					controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, color);
					break;

				case 'east':
					controlState(analysis.block, opal.Vector.CONSTANT_EAST, color);
					break;

				case 'west':
					controlState(analysis.block, opal.Vector.CONSTANT_WEST, color);
					break;

				default: break;
			}
		}
	}
};
/*
 * 校准型-逻辑与门
 */
components.set(componentPrefix + 'correct_logic_and', correctLogicAnd());
function correctLogicAnd(): server.BlockCustomComponent {
	/**
	 * 控制 魔导总线-脉冲锁存 的状态
	 *
	 * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
	 *
	 * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
	 *
	 * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
	 *
	 * @param {[server.Vector3, server.Vector3]} port - 端口向量, 用于判断目标方块的激活状态
	 *
	 * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
	 */
	function controlState(block: server.Block, offset: server.Vector3, port: [server.Vector3, server.Vector3], state: number) {
		/**
		 * 创建 Molang 变量映射对象
		 */
		const molang = new server.MolangVariableMap();
		/**
		 * 判断目标方块的激活状态
		 *
		 * @param input - 方块偏移
		 *
		 * @returns {boolean} - 目标方块的激活状态
		 */
		const checkTarget = (input: server.Vector3): boolean => block.offset(input)?.hasTag('tags:magic_cable.open') ?? false;
		// 遍历 1 到 15 之间的所有可能的指标位置
		for (let index = 1; index < 16; index++) {
			/**
			 * 根据当前指标计算目标位置
			 */
			const indicator = opal.Vector.multiply(offset, index);
			/**
			 * 获取相对位置的方块对象
			 */
			const target = block.offset(indicator);
			// 跳过无效位置
			if (!target) continue;
			// 尝试设置粒子参数
			molang.setColorRGB('variable.color', [...table.rune_color][state - 1][1]);
			// 尝试生成粒子
			opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
			// 如果目标位置不是脉冲锁存器, 则跳过当前循环
			if (!target.hasTag('tags:magic_cable.latch')) continue;
			// 尝试设置目标位置的方块状态值
			opal.TrySetPermutation(target, 'STATE:rune_note', checkTarget(port[0]) == checkTarget(port[1]) && checkTarget(port[0]) ? state : 0);
			// 判断锁存器激活事件是否完成冷却
			if (!opal.TriggerControl('锁存器激活事件', target, 10)) return;
			// 更新锁存器事件
			magic_cable.LatchUpdateEvent(target);
			// 设置完成后, 跳出循环
			break;
		}
	};
	return {
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 方块状态值
			 */
			const face = analysis.state.getState('minecraft:block_face') as string;
			/**
			 * * 方块的色彩状态值
			 */
			const color = analysis.state.getState('STATE:color') as number;
			// 判断设备朝向
			switch (face) {
				case 'up':
					controlState(analysis.block, opal.Vector.CONSTANT_DOWN, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'down':
					controlState(analysis.block, opal.Vector.CONSTANT_UP, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'north':
					controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'south':
					controlState(analysis.block, opal.Vector.CONSTANT_NORTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'east':
					controlState(analysis.block, opal.Vector.CONSTANT_WEST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
					break;

				case 'west':
					controlState(analysis.block, opal.Vector.CONSTANT_EAST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
					break;

				default: break;
			};
		}
	}
};
/*
 * 校准型-逻辑与非
 */
components.set(componentPrefix + 'correct_logic_nand', correctLogicNand());
function correctLogicNand(): server.BlockCustomComponent {
	/**
	 * 控制 魔导总线-脉冲锁存 的状态
	 *
	 * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
	 *
	 * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
	 *
	 * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
	 *
	 * @param {[server.Vector3, server.Vector3]} port - 端口向量, 用于判断目标方块的激活状态
	 *
	 * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
	 */
	function controlState(block: server.Block, offset: server.Vector3, port: [server.Vector3, server.Vector3], state: number) {
		/**
		 * 创建 Molang 变量映射对象
		 */
		const molang = new server.MolangVariableMap();
		/**
		 * 判断目标方块的激活状态
		 *
		 * @param input - 方块偏移
		 *
		 * @returns {boolean} - 目标方块的激活状态
		 */
		const checkTarget = (input: server.Vector3): boolean => block.offset(input)?.hasTag('tags:magic_cable.open') ?? false;
		// 遍历 1 到 15 之间的所有可能的指标位置
		for (let index = 1; index < 16; index++) {
			/**
			 * 根据当前指标计算目标位置
			 */
			const indicator = opal.Vector.multiply(offset, index);
			/**
			 * 获取相对位置的方块对象
			 */
			const target = block.offset(indicator);
			// 跳过无效位置
			if (!target) continue;
			// 尝试设置粒子参数
			molang.setColorRGB('variable.color', [...table.rune_color][state - 1][1]);
			// 尝试生成粒子
			opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
			// 如果目标位置不是脉冲锁存器, 则跳过当前循环
			if (!target.hasTag('tags:magic_cable.latch')) continue;
			// 尝试设置目标位置的方块状态值
			opal.TrySetPermutation(target, 'STATE:rune_note', checkTarget(port[0]) == checkTarget(port[1]) && checkTarget(port[0]) ? 0 : state);
			// 判断锁存器激活事件是否完成冷却
			if (!opal.TriggerControl('锁存器激活事件', target, 10)) return;
			// 更新锁存器事件
			magic_cable.LatchUpdateEvent(target);
			// 设置完成后, 跳出循环
			break;
		}
	};
	return {
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 方块状态值
			 */
			const face = analysis.state.getState('minecraft:block_face') as string;
			/**
			 * * 方块的色彩状态值
			 */
			const color = analysis.state.getState('STATE:color') as number;
			// 判断设备朝向
			switch (face) {
				case 'up':
					controlState(analysis.block, opal.Vector.CONSTANT_DOWN, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'down':
					controlState(analysis.block, opal.Vector.CONSTANT_UP, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'north':
					controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'south':
					controlState(analysis.block, opal.Vector.CONSTANT_NORTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'east':
					controlState(analysis.block, opal.Vector.CONSTANT_WEST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
					break;

				case 'west':
					controlState(analysis.block, opal.Vector.CONSTANT_EAST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
					break;

				default: break;
			};
		}
	}
};
/*
 * 校准型-逻辑异或
 */
components.set(componentPrefix + 'correct_logic_xor', correctLogicXor());
function correctLogicXor(): server.BlockCustomComponent {
	/**
	 * 控制 魔导总线-脉冲锁存 的状态
	 *
	 * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
	 *
	 * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
	 *
	 * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
	 *
	 * @param {[server.Vector3, server.Vector3]} port - 端口向量, 用于判断目标方块的激活状态
	 *
	 * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
	 */
	function controlState(block: server.Block, offset: server.Vector3, port: [server.Vector3, server.Vector3], state: number) {
		/**
		 * 创建 Molang 变量映射对象
		 */
		const molang = new server.MolangVariableMap();
		/**
		 * 判断目标方块的激活状态
		 *
		 * @param input - 方块偏移
		 *
		 * @returns {boolean} - 目标方块的激活状态
		 */
		const checkTarget = (input: server.Vector3): boolean => block.offset(input)?.hasTag('tags:magic_cable.open') ?? false;
		// 遍历 1 到 15 之间的所有可能的指标位置
		for (let index = 1; index < 16; index++) {
			/**
			 * 根据当前指标计算目标位置
			 */
			const indicator = opal.Vector.multiply(offset, index);
			/**
			 * 获取相对位置的方块对象
			 */
			const target = block.offset(indicator);
			// 跳过无效位置
			if (!target) continue;
			// 尝试设置粒子参数
			molang.setColorRGB('variable.color', [...table.rune_color][state - 1][1]);
			// 尝试生成粒子
			opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
			// 如果目标位置不是脉冲锁存器, 则跳过当前循环
			if (!target.hasTag('tags:magic_cable.latch')) continue;
			// 尝试设置目标位置的方块状态值
			opal.TrySetPermutation(target, 'STATE:rune_note', checkTarget(port[0]) != checkTarget(port[1]) ? state : 0);
			// 判断锁存器激活事件是否完成冷却
			if (!opal.TriggerControl('锁存器激活事件', target, 10)) return;
			// 更新锁存器事件
			magic_cable.LatchUpdateEvent(target);
			// 设置完成后, 跳出循环
			break;
		}
	};
	return {
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 方块状态值
			 */
			const face = analysis.state.getState('minecraft:block_face') as string;
			/**
			 * * 方块的色彩状态值
			 */
			const color = analysis.state.getState('STATE:color') as number;
			// 判断设备朝向
			switch (face) {
				case 'up':
					controlState(analysis.block, opal.Vector.CONSTANT_DOWN, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'down':
					controlState(analysis.block, opal.Vector.CONSTANT_UP, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'north':
					controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'south':
					controlState(analysis.block, opal.Vector.CONSTANT_NORTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'east':
					controlState(analysis.block, opal.Vector.CONSTANT_WEST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
					break;

				case 'west':
					controlState(analysis.block, opal.Vector.CONSTANT_EAST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
					break;

				default: break;
			};
		}
	}
};
/*
 * 校准型-逻辑或非
 */
components.set(componentPrefix + 'correct_logic_nor', correctLogicNor());
function correctLogicNor(): server.BlockCustomComponent {
	/**
	 * 控制 魔导总线-脉冲锁存 的状态
	 *
	 * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
	 *
	 * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
	 *
	 * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
	 *
	 * @param {[server.Vector3, server.Vector3]} port - 端口向量, 用于判断目标方块的激活状态
	 *
	 * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
	 */
	function controlState(block: server.Block, offset: server.Vector3, port: [server.Vector3, server.Vector3], state: number) {
		/**
		 * 创建 Molang 变量映射对象
		 */
		const molang = new server.MolangVariableMap();
		/**
		 * 判断目标方块的激活状态
		 *
		 * @param input - 方块偏移
		 *
		 * @returns {boolean} - 目标方块的激活状态
		 */
		const checkTarget = (input: server.Vector3): boolean => block.offset(input)?.hasTag('tags:magic_cable.open') ?? false;
		// 遍历 1 到 15 之间的所有可能的指标位置
		for (let index = 1; index < 16; index++) {
			/**
			 * 根据当前指标计算目标位置
			 */
			const indicator = opal.Vector.multiply(offset, index);
			/**
			 * 获取相对位置的方块对象
			 */
			const target = block.offset(indicator);
			// 跳过无效位置
			if (!target) continue;
			// 尝试设置粒子参数
			molang.setColorRGB('variable.color', [...table.rune_color][state - 1][1]);
			// 尝试生成粒子
			opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
			// 如果目标位置不是脉冲锁存器, 则跳过当前循环
			if (!target.hasTag('tags:magic_cable.latch')) continue;
			// 尝试设置目标位置的方块状态值
			opal.TrySetPermutation(target, 'STATE:rune_note', checkTarget(port[0]) || checkTarget(port[1]) ? 0 : state);
			// 判断锁存器激活事件是否完成冷却
			if (!opal.TriggerControl('锁存器激活事件', target, 10)) return;
			// 更新锁存器事件
			magic_cable.LatchUpdateEvent(target);
			// 设置完成后, 跳出循环
			break;
		}
	};
	return {
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 方块状态值
			 */
			const face = analysis.state.getState('minecraft:block_face') as string;
			/**
			 * * 方块的色彩状态值
			 */
			const color = analysis.state.getState('STATE:color') as number;
			// 判断设备朝向
			switch (face) {
				case 'up':
					controlState(analysis.block, opal.Vector.CONSTANT_DOWN, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'down':
					controlState(analysis.block, opal.Vector.CONSTANT_UP, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'north':
					controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'south':
					controlState(analysis.block, opal.Vector.CONSTANT_NORTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
					break;

				case 'east':
					controlState(analysis.block, opal.Vector.CONSTANT_WEST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
					break;

				case 'west':
					controlState(analysis.block, opal.Vector.CONSTANT_EAST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
					break;

				default: break;
			};
		}
	}
};
/*
 * 校准型-偏转棱镜
 */
components.set(componentPrefix + 'correct_deflection_prism', correctDeflectionPrism());
function correctDeflectionPrism(): server.BlockCustomComponent {
	/**
	 * 控制 魔导总线-脉冲锁存 的状态
	 *
	 * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
	 *
	 * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
	 *
	 * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
	 *
	 * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
	 */
	function controlState(block: server.Block, offset: server.Vector3, state: number) {
		/**
		 * 创建 Molang 变量映射对象
		 */
		const molang = new server.MolangVariableMap();
		/**
		 * 获取当前方块的锁存控制位状态
		 */
		const control = block.hasTag('tags:magic_cable.open') ?? false;
		// 遍历 1 到 15 之间的所有可能的指标位置
		for (let index = 1; index < 16; index++) {
			/**
			 * 根据当前指标计算目标位置
			 */
			const indicator = opal.Vector.multiply(offset, -index);
			/**
			 * 获取相对位置的方块对象
			 */
			const target = block.offset(indicator);
			// 跳过无效位置
			if (!target) continue;
			// 尝试设置粒子参数
			molang.setColorRGB('variable.color', [...table.rune_color][state - 1][1]);
			// 尝试生成粒子
			opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
			// 如果目标位置不是脉冲锁存器, 则跳过当前循环
			if (!target.hasTag('tags:magic_cable.latch')) continue;
			// 尝试设置目标位置的方块状态值
			opal.TrySetPermutation(target, 'STATE:rune_note', control ? state : 0);
			// 判断锁存器激活事件是否完成冷却
			if (!opal.TriggerControl('锁存器激活事件', target, 10)) return;
			// 更新锁存器事件
			magic_cable.LatchUpdateEvent(target);
			// 设置完成后, 跳出循环
			break;
		}
	};
	return {
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 方块状态值
			 */
			const face = analysis.state.getState('minecraft:block_face') as string;
			/**
			 * * 方块的色彩状态值
			 */
			const color = analysis.state.getState('STATE:color') as number;
			// 判断设备朝向
			switch (face) {
				case 'up':
					controlState(analysis.block, opal.Vector.CONSTANT_UP, color);
					break;

				case 'down':
					controlState(analysis.block, opal.Vector.CONSTANT_DOWN, color);
					break;

				case 'north':
					controlState(analysis.block, opal.Vector.CONSTANT_NORTH, color);
					break;

				case 'south':
					controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, color);
					break;

				case 'east':
					controlState(analysis.block, opal.Vector.CONSTANT_EAST, color);
					break;

				case 'west':
					controlState(analysis.block, opal.Vector.CONSTANT_WEST, color);
					break;

				default: break;
			}
		}
	}
};
/*
 * 校准型-分光棱镜
 */
components.set(componentPrefix + 'correct_spectral_prism', correctSpectralPrism());
function correctSpectralPrism(): server.BlockCustomComponent {
	/**
	 * 控制 魔导总线-脉冲锁存 的状态
	 *
	 * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
	 *
	 * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
	 *
	 * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
	 *
	 * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
	 */
	function controlState(block: server.Block, offset: server.Vector3, state: number) {
		/**
		 * 创建 Molang 变量映射对象
		 */
		const molang = new server.MolangVariableMap();
		/**
		 * 获取当前方块的锁存控制位状态
		 */
		const control = block.hasTag('tags:magic_cable.open') ?? false;
		// 遍历 1 到 15 之间的所有可能的指标位置
		for (let index = 1; index < 16; index++) {
			/**
			 * 根据当前指标计算目标位置
			 */
			const indicator = opal.Vector.multiply(offset, -index);
			/**
			 * 获取相对位置的方块对象
			 */
			const target = block.offset(indicator);
			// 跳过无效位置
			if (!target) continue;
			// 尝试设置粒子参数
			molang.setColorRGB('variable.color', [...table.rune_color][state - 1][1]);
			// 尝试生成粒子
			opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
			// 如果目标位置不是脉冲锁存器, 则跳过当前循环
			if (!target.hasTag('tags:magic_cable.latch')) continue;
			// 尝试设置目标位置的方块状态值
			opal.TrySetPermutation(target, 'STATE:rune_note', control ? state : 0);
			// 判断锁存器激活事件是否完成冷却
			if (!opal.TriggerControl('锁存器激活事件', target, 10)) break;
			// 更新锁存器事件
			magic_cable.LatchUpdateEvent(target);
			// 设置完成后, 跳出循环
			break;
		};
		for (let index = 1; index < 16; index++) {
			/**
			 * 根据当前指标计算目标位置
			 */
			const indicator = opal.Vector.multiply(offset, index);
			/**
			 * 获取相对位置的方块对象
			 */
			const target = block.offset(indicator);
			// 跳过无效位置
			if (!target) continue;
			// 尝试设置粒子参数
			molang.setColorRGB('variable.color', [...table.rune_color][state - 1][1]);
			// 尝试生成粒子
			opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
			// 如果目标位置不是脉冲锁存器, 则跳过当前循环
			if (!target.hasTag('tags:magic_cable.latch')) continue;
			// 尝试设置目标位置的方块状态值
			opal.TrySetPermutation(target, 'STATE:rune_note', control ? state : 0);
			// 判断锁存器激活事件是否完成冷却
			if (!opal.TriggerControl('锁存器激活事件', target, 10)) break;
			// 更新锁存器事件
			magic_cable.LatchUpdateEvent(target);
			// 设置完成后, 跳出循环
			break;
		}
	};
	return {
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 方块状态值
			 */
			const face = analysis.state.getState('minecraft:block_face') as string;
			/**
			 * * 方块的色彩状态值
			 */
			const color = analysis.state.getState('STATE:color') as number;
			// 判断设备朝向
			switch (face) {
				case 'up':
					controlState(analysis.block, opal.Vector.CONSTANT_UP, color);
					break;

				case 'down':
					controlState(analysis.block, opal.Vector.CONSTANT_DOWN, color);
					break;

				case 'north':
					controlState(analysis.block, opal.Vector.CONSTANT_NORTH, color);
					break;

				case 'south':
					controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, color);
					break;

				case 'east':
					controlState(analysis.block, opal.Vector.CONSTANT_EAST, color);
					break;

				case 'west':
					controlState(analysis.block, opal.Vector.CONSTANT_WEST, color);
					break;

				default: break;
			}
		}
	}
};
/*
 * 信号编译
 */
components.set(componentPrefix + 'signal_compilation',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * * 方块前处理事件
			 */
			function beforeEvent() {
				magic_cable.signalCompilation(analysis.block, 'Xx-0-Zz', analysis.state)
			};
			/**
			 * * 方块后处理事件
			 */
			function afterEvent() {
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
				opal.TrySetPermutation(analysis.block, 'STATE:stage', 0);
				opal.TrySetPermutation(analysis.block, 'STATE:index', 0);
			};
			if (analysis.state.getState('STATE:stage') == 0 && analysis.state.getState('STATE:rune_type') != 0) {
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
				opal.TrySetPermutation(analysis.block, 'STATE:stage', 1);
			}
			else if (analysis.state.getState('STATE:stage') == 1) beforeEvent();
			else if (analysis.state.getState('STATE:stage') == 2) afterEvent();
		}
	}
);
/*
 * 信号过滤
 */
components.set(componentPrefix + 'signal_filtering',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * * 方块前处理事件
			 */
			function beforeEvent() {
				magic_cable.signalProcessing(analysis.block, 'Xx-Yy-Zz', analysis.state)
			};
			/**
			 * * 方块后处理事件
			 */
			function afterEvent() {
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
			};
			if (analysis.condition != 0 && analysis.condition != 9 && analysis.condition == analysis.state.getState('STATE:rune_note')) beforeEvent();
			if (analysis.condition != 0 && analysis.condition != 9 && analysis.condition != analysis.state.getState('STATE:rune_note')) afterEvent();
			else if (analysis.condition == 9) afterEvent();
		}
	}
);
/*
 * 信号转化
 */
components.set(componentPrefix + 'signal_conversion',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 判断方块的元素类型状态
			if (analysis.condition != 0 && analysis.condition != 9) magic_cable.signalProcessing(analysis.block, 'Xx-Yy-Zz', analysis.state);
			// 重置方块元素类型
			else if (analysis.condition == 9) opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
		}
	}
);
/*
 * 总线端口
 */
components.set(componentPrefix + 'bus_port',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 判断方块的元素类型状态
			if (analysis.condition != 0 && analysis.condition != 9) {
				/**
				 ** 方块状态值
				 */
				const face = analysis.state.getState('minecraft:block_face') as string;
				switch (face) {
					case 'up':
						magic_cable.defaultEvent(analysis.block, '0-Yy-0', analysis.state);
						break;

					case 'down':
						magic_cable.defaultEvent(analysis.block, '0-Yy-0', analysis.state);
						break;

					case 'north':
						magic_cable.defaultEvent(analysis.block, '0-0-Zz', analysis.state);
						break;

					case 'south':
						magic_cable.defaultEvent(analysis.block, '0-0-Zz', analysis.state);
						break;

					case 'east':
						magic_cable.defaultEvent(analysis.block, 'Xx-0-0', analysis.state);
						break;

					case 'west':
						magic_cable.defaultEvent(analysis.block, 'Xx-0-0', analysis.state);
						break;

					default: break;
				}
			}
			// 重置方块元素类型
			else if (analysis.condition == 9) opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
		}
	}
);
/*
 * 打包投送
 */
components.set(componentPrefix + 'package_delivery',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 方块状态值
			 */
			const face = analysis.state.getState('minecraft:block_face') as string;
			// 执行功能
			storage_manage.Transmission(analysis.block, face);
			// 播放音效 与 粒子效果
			analysis.dimension?.playSound('beacon.deactivate', analysis.block.location);
			// 状态重置
			opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
		}
	}
);
/*
 * 方块放置
 */
components.set(componentPrefix + 'block_placement',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 执行功能
			storage_manage.Placement(analysis.block);
			// 播放音效 与 粒子效果
			analysis.dimension?.playSound('beacon.deactivate', analysis.block.location);
			// 状态重置
			opal.TrySetPermutation(analysis.block, 'STATE:energy', opal.Random({ min: 0, max: 6 }, true));
			opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
		}
	}
);
/*
 * 物资收集
 */
components.set(componentPrefix + 'material_collection',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 执行功能
			storage_manage.Collection(analysis.block, analysis.state);
			// 播放音效 与 粒子效果
			analysis.dimension?.playSound('beacon.deactivate', analysis.block.location);
			// 状态重置
			opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
		}
	}
);
/*
 * 伺服基座
 */
components.set(componentPrefix + 'servo_drive',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * * 方块前处理事件
			 */
			function beforeEvent() {
				/**
				 ** 查询方块标签
				 */
				const hasTag = (offset: server.Vector3, tag: string) => analysis.block.offset(offset)?.getTags().includes(tag) ?? false;
				// 使能 模块运行
				switch (analysis.condition) {
					case 1:
						if (hasTag({ x: 1, y: -1, z: 0 }, 'tags:magic_cable.series'))
							if (!hasTag(opal.Vector.CONSTANT_EAST, 'tags:magic_cable.series'))
								servo_drive.Susceptor(analysis.block, 'X+');
						break;

					case 2:
						if (hasTag({ x: -1, y: -1, z: 0 }, 'tags:magic_cable.series'))
							if (!hasTag(opal.Vector.CONSTANT_WEST, 'tags:magic_cable.series'))
								servo_drive.Susceptor(analysis.block, 'X-');
						break;

					case 3:
						if (hasTag({ x: 0, y: -1, z: 1 }, 'tags:magic_cable.series'))
							if (!hasTag(opal.Vector.CONSTANT_SOUTH, 'tags:magic_cable.series'))
								servo_drive.Susceptor(analysis.block, 'Z+');
						break;

					case 4:
						if (hasTag({ x: -0, y: -1, z: -1 }, 'tags:magic_cable.series'))
							if (!hasTag(opal.Vector.CONSTANT_NORTH, 'tags:magic_cable.series'))
								servo_drive.Susceptor(analysis.block, 'Z-');
						break;

					default: break;
				};
				// 同步状态
				for (let index = 0; index <= 5; index++) {
					/**
					 ** 方块标签
					 */
					const tag = 'tags:servo_machine.value.' + index;
					// 赋值 方块状态
					if (hasTag(opal.Vector.CONSTANT_EAST, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
					if (hasTag(opal.Vector.CONSTANT_WEST, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
					if (hasTag(opal.Vector.CONSTANT_SOUTH, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
					if (hasTag(opal.Vector.CONSTANT_NORTH, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
				};
				// 复位状态
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
			};
			/**
			 * * 方块后处理事件
			 */
			function afterEvent() {
				/**
				 ** 方块状态值
				 */
				const direction = analysis.state.getState('STATE:direction') as number;
				// 复位状态
				opal.TrySetPermutation(analysis.block, 'STATE:direction', 0);
				// 执行 功能
				switch (direction) {
					case 1:
						for (let index = 0; index <= 5; index++) {
							// 校验 状态
							if (index != analysis.state.getState('STATE:value')) continue;
							// 获取 锚点坐标
							const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
							const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_EAST) as server.Vector3, { delimiter: ' ' });
							const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: 1, y: index, z: 0 }) as server.Vector3, { delimiter: ' ' });
							const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: index, z: 0 }) as server.Vector3, { delimiter: ' ' });
							// 执行 方块命令
							analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
							analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_1} replace move`);
							analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
						};
						break;

					case 2:
						for (let index = 0; index <= 5; index++) {
							// 校验 状态
							if (index != analysis.state.getState('STATE:value')) continue;
							// 获取 锚点坐标
							const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
							const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_WEST) as server.Vector3, { delimiter: ' ' });
							const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: -1, y: index, z: 0 }) as server.Vector3, { delimiter: ' ' });
							const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: index, z: 0 }) as server.Vector3, { delimiter: ' ' });
							// 执行 方块命令
							analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
							analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_1} replace move`);
							analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
						};
						break;

					case 3:
						for (let index = 0; index <= 5; index++) {
							// 校验 状态
							if (index != analysis.state.getState('STATE:value')) continue;
							// 获取 锚点坐标
							const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
							const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_SOUTH) as server.Vector3, { delimiter: ' ' });
							const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: 0, y: index, z: 1 }) as server.Vector3, { delimiter: ' ' });
							const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: index, z: 0 }) as server.Vector3, { delimiter: ' ' });
							// 执行 方块命令
							analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
							analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_1} replace move`);
							analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
						};
						break;

					case 4:
						for (let index = 0; index <= 5; index++) {
							// 校验 状态
							if (index != analysis.state.getState('STATE:value')) continue;
							// 获取 锚点坐标
							const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
							const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_NORTH) as server.Vector3, { delimiter: ' ' });
							const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: 0, y: index, z: -1 }) as server.Vector3, { delimiter: ' ' });
							const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: index, z: 0 }) as server.Vector3, { delimiter: ' ' });
							// 执行 方块命令
							analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
							analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_1} replace move`);
							analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
						};
						break;

					default: break;
				};
			};
			if (analysis.condition != 0) beforeEvent();
			else if (analysis.state.getState('STATE:direction') != 0) afterEvent();
		}
	}
);
/*
 * 伺服牵引
 */
components.set(componentPrefix + 'servo_traction',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * * 方块前处理事件
			 */
			function beforeEvent() {
				/**
				 ** 查询方块标签
				 */
				const hasTag = (offset: server.Vector3, tag: string) => analysis.block.offset(offset)?.getTags().includes(tag) ?? false;
				// 使能 模块运行
				switch (analysis.condition) {
					case 1:
						if (hasTag({ x: 1, y: 1, z: 0 }, 'tags:magic_cable.series'))
							if (!hasTag(opal.Vector.CONSTANT_EAST, 'tags:magic_cable.series'))
								servo_drive.Susceptor(analysis.block, 'X+');
						break;

					case 2:
						if (hasTag({ x: -1, y: 1, z: 0 }, 'tags:magic_cable.series'))
							if (!hasTag(opal.Vector.CONSTANT_WEST, 'tags:magic_cable.series'))
								servo_drive.Susceptor(analysis.block, 'X-');
						break;

					case 3:
						if (hasTag({ x: 0, y: 1, z: 1 }, 'tags:magic_cable.series'))
							if (!hasTag(opal.Vector.CONSTANT_SOUTH, 'tags:magic_cable.series'))
								servo_drive.Susceptor(analysis.block, 'Z+');
						break;

					case 4:
						if (hasTag({ x: -0, y: 1, z: -1 }, 'tags:magic_cable.series'))
							if (!hasTag(opal.Vector.CONSTANT_NORTH, 'tags:magic_cable.series'))
								servo_drive.Susceptor(analysis.block, 'Z-');
						break;

					default: break;
				};
				// 同步状态
				for (let index = 0; index <= 5; index++) {
					/**
					 ** 方块标签
					 */
					const tag = 'tags:servo_machine.value.' + index;
					// 赋值 方块状态
					if (hasTag(opal.Vector.CONSTANT_EAST, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
					if (hasTag(opal.Vector.CONSTANT_WEST, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
					if (hasTag(opal.Vector.CONSTANT_SOUTH, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
					if (hasTag(opal.Vector.CONSTANT_NORTH, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
				};
				// 复位状态
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
			};
			/**
			 * * 方块后处理事件
			 */
			function afterEvent() {
				/**
				 ** 方块状态值
				 */
				const direction = analysis.state.getState('STATE:direction') as number;
				// 复位状态
				opal.TrySetPermutation(analysis.block, 'STATE:direction', 0);
				// 执行 功能
				switch (direction) {
					case 1:
						for (let index = 0; index <= 5; index++) {
							// 校验 状态
							if (index != analysis.state.getState('STATE:value')) continue;
							// 获取 锚点坐标
							const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
							const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_EAST) as server.Vector3, { delimiter: ' ' });
							const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: 1, y: -index, z: 0 }) as server.Vector3, { delimiter: ' ' });
							const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 0 }) as server.Vector3, { delimiter: ' ' });
							// 执行 方块命令
							analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
							analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_2} replace move`);
							analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
						};
						break;

					case 2:
						for (let index = 0; index <= 5; index++) {
							// 校验 状态
							if (index != analysis.state.getState('STATE:value')) continue;
							// 获取 锚点坐标
							const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
							const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_WEST) as server.Vector3, { delimiter: ' ' });
							const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: -1, y: -index, z: 0 }) as server.Vector3, { delimiter: ' ' });
							const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 0 }) as server.Vector3, { delimiter: ' ' });
							// 执行 方块命令
							analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
							analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_2} replace move`);
							analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
						};
						break;

					case 3:
						for (let index = 0; index <= 5; index++) {
							// 校验 状态
							if (index != analysis.state.getState('STATE:value')) continue;
							// 获取 锚点坐标
							const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
							const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_SOUTH) as server.Vector3, { delimiter: ' ' });
							const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 1 }) as server.Vector3, { delimiter: ' ' });
							const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 0 }) as server.Vector3, { delimiter: ' ' });
							// 执行 方块命令
							analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
							analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_2} replace move`);
							analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
						};
						break;

					case 4:
						for (let index = 0; index <= 5; index++) {
							// 校验 状态
							if (index != analysis.state.getState('STATE:value')) continue;
							// 获取 锚点坐标
							const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
							const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_NORTH) as server.Vector3, { delimiter: ' ' });
							const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: 0, y: -index, z: -1 }) as server.Vector3, { delimiter: ' ' });
							const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 0 }) as server.Vector3, { delimiter: ' ' });
							// 执行 方块命令
							analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
							analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_2} replace move`);
							analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
						};
						break;

					default: break;
				};
			};
			if (analysis.condition != 0) beforeEvent();
			else if (analysis.state.getState('STATE:direction') != 0) afterEvent();
		}
	}
);
/*
 * 驱动核心
 */
components.set(componentPrefix + 'servo_omphalos',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 播放音效 与 粒子效果
			analysis.dimension?.playSound('beacon.deactivate', analysis.block.location);
			// 状态重置
			opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
			// 执行功能
			switch (analysis.condition) {
				case 1: servo_drive.servoOmphalos(analysis.block, 'X+'); break;
				case 2: servo_drive.servoOmphalos(analysis.block, 'X-'); break;

				case 3: servo_drive.servoOmphalos(analysis.block, 'Z+'); break;
				case 4: servo_drive.servoOmphalos(analysis.block, 'Z-'); break;

				case 5: servo_drive.servoOmphalos(analysis.block, 'Y+'); break;
				case 6: servo_drive.servoOmphalos(analysis.block, 'Y-'); break;

				default: break;
			}
		}
	}
);
/*
 * 水平机关门
 */
components.set(componentPrefix + 'horizontal_gate',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 播放音效 与 粒子效果
			analysis.dimension?.playSound('close.iron_door', analysis.block.location);
			// 状态更改
			opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
			// 执行功能
			machine_gate.horizontalGate(analysis.block);
		}
	}
);
/*
 * 垂直机关门
 */
components.set(componentPrefix + 'vertical_gate',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 播放音效 与 粒子效果
			analysis.dimension?.playSound('close.iron_door', analysis.block.location);
			// 状态更改
			opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
			// 执行功能
			machine_gate.verticalGate(analysis.block);
		}
	}
);
/*
 * 魔晶上传
 */
components.set(componentPrefix + 'magic_crystal_upload',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * * 方块前处理事件
			 */
			function beforeEvent() {
				opal.TrySpawnParticle(analysis.dimension, 'constant:prompt_transport_above', analysis.block.bottomCenter());
				analysis.dimension?.playSound('conduit.activate', analysis.block.location);
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
				machine_gate.AboveTeleport(analysis.block);
			};
			/**
			 * * 方块后处理事件
			 */
			function afterEvent() {
				analysis.dimension?.playSound('place.amethyst_block', analysis.block.location);
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
			};
			if (analysis.condition != 0 && analysis.condition != 9) beforeEvent();
			else if (analysis.condition == 9) afterEvent();
		}
	}
);
/*
 * 魔晶下传
 */
components.set(componentPrefix + 'magic_crystal_download',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * * 方块前处理事件
			 */
			function beforeEvent() {
				opal.TrySpawnParticle(analysis.dimension, 'constant:prompt_transport_below', analysis.block.center());
				analysis.dimension?.playSound('conduit.activate', analysis.block.location);
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
				machine_gate.BelowTeleport(analysis.block);
			};
			/**
			 * * 方块后处理事件
			 */
			function afterEvent() {
				analysis.dimension?.playSound('place.amethyst_block', analysis.block.location);
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
			};
			if (analysis.condition != 0 && analysis.condition != 9) beforeEvent();
			else if (analysis.condition == 9) afterEvent();
		}
	}
);
/*
 * 造石单元
 */
components.set(componentPrefix + 'stone_machine',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * * 方块前处理事件
			 */
			function beforeEvent() {
				/**
				 ** 方块状态值
				 */
				const value = analysis.state.getState('STATE:value') as number;
				// 复位状态
				opal.TrySetPermutation(analysis.block, 'STATE:value', value - 1);
			};
			/**
			 ** 方块中继事件
			 */
			function middleEvent() {
				// 播放音效 与 粒子效果
				analysis.dimension?.playSound('random.fizz', analysis.block.location);
				// 复位状态
				opal.TrySetPermutation(analysis.block, 'STATE:value', 5);
			};
			/**
			 * * 方块后处理事件
			 */
			function afterEvent() {
				// 播放音效 与 粒子效果
				analysis.dimension?.playSound('bucket.empty_lava', analysis.block.location);
				// 执行功能
				mineral_project.Solidify(analysis.block);
				// 复位状态
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
				opal.TrySetPermutation(analysis.block, 'STATE:value', 0);
			};
			/**
			 ** 方块状态值
			 */
			const value = analysis.state.getState('STATE:value') as number;
			if (value != 0 && value != 1) beforeEvent();
			else if (value == 0) middleEvent();
			else if (value == 1) afterEvent();
		}
	}
);
/*
 * 金属锻压
 */
components.set(componentPrefix + 'metal_forming_press',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * * 方块前处理事件
			 */
			function beforeEvent() {
				/**
				 ** 方块状态值
				 */
				const value = analysis.state.getState('STATE:value') as number;
				// 播放音效 与 粒子效果
				analysis.dimension?.playSound('block.stonecutter.use', analysis.block.location);
				// 复位状态
				opal.TrySetPermutation(analysis.block, 'STATE:value', value + 1);
			};
			/**
			 * * 方块后处理事件
			 */
			function afterEvent() {
				// 播放音效 与 粒子效果
				analysis.dimension?.playSound('random.anvil_land', analysis.block.location);
				// 执行功能
				mineral_project.Forming(analysis.block);
				// 复位状态
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
				opal.TrySetPermutation(analysis.block, 'STATE:value', 0);
			};
			/**
			 ** 方块状态值
			 */
			const value = analysis.state.getState('STATE:value') as number;
			if (value != 7) beforeEvent();
			else if (value == 7) afterEvent();
		}
	}
);
/*
 * 破坏核心
 */
components.set(componentPrefix + 'destroy_the_core',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			// 执行功能
			mineral_project.Destroy(analysis.block, analysis.state.getState('minecraft:block_face') as string);
			// 复位状态
			opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
		}
	}
);
interface BASE_MINERAL_MACHINE {
	/**
	 * 需要修改的方块状态
	 */
	revise?: string;
	/**
	 * 每次执行时的能耗
	 */
	consumption?: number;
	/**
	 * 产出矿石的概率(0%-100%)
	 */
	probability?: number;
	/**
	 * 加倍产出矿石的概率(0%-100%)
	 */
	doubling_probability?: number;
	/**
	 * 矿脉区块产出矿石的最大数量
	 */
	limit?: number;
	/**
	 * 矿脉区块大小
	 */
	chunk_size?: number;
};
type MINERAL_MACHINE = BASE_MINERAL_MACHINE & {
	[dimension: string]: { [mineral: string]: number | undefined; } | undefined;
};
/*
 * 矿井单元
 */
components.set(componentPrefix + 'mineral_machine',
	{
		onTick(source: server.BlockComponentTickEvent, data: { params: MINERAL_MACHINE }) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const { block, dimension, state } = TickComponentTrigger(source);
			/**
			 * 方块组件属性值解析
			 */
			const { revise, consumption, probability, doubling_probability: doubling, limit, chunk_size: chunkSize } = data.params;
			/**
			 * 矿脉权重表
			 */
			const weightTable: Map<string, number> = new Map();
			// 获取当前维度的参数对象
			const proto = data.params[dimension.id];
			// 如果当前维度没有参数对象，则返回
			if (proto == undefined) return;
			// 使用解构赋值直接从Object.entries获取键值对
			for (const [mineral, weight] of Object.entries(proto)) if (mineral !== undefined && weight !== undefined) weightTable.set(mineral, weight)
			if (!revise || !consumption || !probability || !doubling || !limit || !chunkSize) return;
			// 判断能量值 是否足够
			if (!opal.ExpendEnergy(block, -consumption)) return;
			// 判断方块自身是否因处于产出矿石的状态
			if (state.getState(revise) as number != 8) {
				// 播放音效
				dimension?.playSound('block.stonecutter.use', block.location);
				// 复位状态
				opal.TrySetPermutation(block, revise, state.getState(revise) as number + 1);
				/**
				 * 计算区块坐标
				 */
				const chunkLocation = opal.Vector.chunkLocation(block.location, true, chunkSize);
			}
			else {
				// 播放音效
				dimension?.playSound('random.anvil_land', block.location);
				// 复位状态
				opal.TrySetPermutation(block, 'STATE:rune_type', 0);
				opal.TrySetPermutation(block, revise, 0);
			}
		}
	}
);
/*
components.set(componentPrefix + 'mineral_machine',
	{
		onTick(source: server.BlockComponentTickEvent, data: { params: MINERAL_MACHINE }) {
			const analysis = TickComponentTrigger(source);
			function beforeEvent() {
				analysis.dimension?.playSound('block.stonecutter.use', analysis.block.location);
				// 复位状态
				opal.TrySetPermutation(analysis.block, 'STATE:value', analysis.state.getState('STATE:value') as number + 1);
			};
			function afterEvent() {
				analysis.dimension?.playSound('random.anvil_land', analysis.block.location);
				// 执行功能
				mineral_project.Mine(analysis.block);
				// 复位状态
				opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
				opal.TrySetPermutation(analysis.block, 'STATE:value', 0);
			};
			if (analysis.state.getState('STATE:value') as number != 8) beforeEvent();
			else if (analysis.state.getState('STATE:value') as number == 8) afterEvent();
		}
	}
);
*/
/*
 * 能量节点
 */
components.set(componentPrefix + 'energy_node',
	{
		onTick(source: server.BlockComponentTickEvent, data: { params: ENERGY_EXPEND }) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const { block, state } = TickComponentTrigger(source);
			/**
			 * * 方块的能量值属性
			 */
			const value = data.params.modify || 10;
			/**
			 * * 补充 星尘能 消耗
			 */
			const energy = opal.AlterEnergy(block, value, true);
			// 显示 魔晶网络 - 星尘值
			opal.AlterMessageNotify('<§l§b 能量节点 §r>§s 星尘力产出§r', block, { text: '<§l§d 星尘力 §r> : §l§u' + energy[1] + '§q↑§r' });
			// 复位状态
			opal.TrySetPermutation(block, 'STATE:stage', 0);
		}
	}
);
/**
 * * 查询与激活 动能分配
 *
 * @param {server.Block} block - 发出侦测的能量源方块
 *
 * @param {server.Vector3} offset - 方向向量
 */
function energyAllocation(block: server.Block, offset: server.Vector3) {
	// 遍历 动能分配模块
	for (let index = 1; index < 6; index++) {
		/**
		 * * 获取 目标方块
		 */
		const target = block.offset(opal.Vector.multiply(offset, index));
		// 判断 方块 是否 是 动能分配模块
		if (!target || !target.hasTag('tags:energy_module.allocation')) continue;
		/**
		 * * 获取 方块状态
		 */
		const states = target.permutation;
		// 如果该方块已经被充能就跳过该方块
		if (states.getState('STATE:output') == 1) continue;
		// 改变方块状态
		target.setPermutation(states.withState('STATE:output', 1));
	}
};
/**
 * * 检测周围是否有能量分配
 *
 * @param {server.Block} block - 发出侦测的能量源方块
 *
 * @returns {boolean} - 是否有 动能分配模块
 */
function checkAllocation(block: server.Block): boolean {
	/**
	 * * 获取 附近的方块
	 */
	const entry = [block.east(), block.west(), block.north(), block.south()];
	// 遍历 方块 并测试 方块是否是动能分配模块
	for (let index = 0; index < entry.length; index++) {
		if (entry[index]?.hasTag('tags:energy_module.allocation')) return true;
	};
	// 返回结果
	return false;
};
/*
 * 风力动能
 */
components.set(componentPrefix + 'wind_power',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const { block, state } = TickComponentTrigger(source);
			/**
			 ** 方块状态值
			 */
			const rotate = state.getState('STATE:rotate') as number;
			/**
			 ** 方块状态值
			 */
			const type = state.getState('STATE:stage') as number;
			// 赋值方块状态
			opal.TrySetPermutation(block, 'STATE:rotate', rotate != 2 ? rotate + 1 : 0);
			opal.TrySetPermutation(block, 'STATE:stage', type != 9 ? type + 1 : 0);
			/**
			 * * 获取 自身 的 方块状态
			 */
			const permutation = block.permutation;
			/**
			 * * 获取 当前运行阶段
			 */
			const current = permutation.getState('STATE:stage') as number;
			// 判断 方块 是否 有 动能分配模块
			if (!checkAllocation(block)) return;
			// 判断方块是否在 高度阈值内
			if (block.y > 200 || block.y < 64) return;
			/**
			 * * 计算 阈值
			 */
			const threshold = Math.floor(9 - ((block.y - 64) / 15));
			// 判断阈值 是否 等于 当前运行阶段
			if (current < threshold) return;
			// 播放 风力叶片粒子效果
			if (opal.TriggerControl(block.typeId, block, 60)) {
				/**
				 * * 定义 粒子参数
				 */
				const molang = new server.MolangVariableMap();
				// 定义 粒子参数
				molang.setFloat('variable.direction', 2);
				molang.setFloat('variable.size', 16);
				// 播放 粒子效果
				opal.TrySpawnParticle(block.dimension, 'scripts:path_round', opal.Vector.add(block.location, opal.Vector.CONSTANT_HALF), molang);
				opal.TrySpawnParticle(block.dimension, 'scripts:path_label', opal.Vector.add(block.location, opal.Vector.CONSTANT_HALF), molang);
			};
			// 基于 方块朝向 遍历 动能分配模块
			switch (permutation.getState('minecraft:cardinal_direction')) {
				case 'south': energyAllocation(block, opal.Vector.CONSTANT_SOUTH); break;

				case 'north': energyAllocation(block, opal.Vector.CONSTANT_NORTH); break;

				case 'east': energyAllocation(block, opal.Vector.CONSTANT_EAST); break;

				case 'west': energyAllocation(block, opal.Vector.CONSTANT_WEST); break;

				default: break;
			};
			// 切换运行阶段
			opal.TrySetPermutation(block, 'STATE:stage', 9);
		}
	}
);
/*
 * 魔晶储罐
 */
components.set(componentPrefix + 'crystal_tank',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const { block, state, dimension } = TickComponentTrigger(source);
			/**
			 * * 获取 目标方块
			 */
			const target = block.above();
			/**
			 ** 检测目标块是否为能量节点
			 */
			const onTag = target?.getTags()?.includes('tags:energy_module.node') as boolean;
			/**
			 ** 获取方块状态
			 */
			const caching = state.getState('STATE:caching') as number | undefined;
			// 播放音效 与 粒子效果
			if (!onTag && state.getState('STATE:output') as number == 1) dimension?.playSound('block.grindstone.use', block.location);
			// 如果检测到能量节点
			if (onTag) {
				/**
				 ** 粒子效果索引值
				 */
				const index = opal.Random({ max: 4, min: 0 }, true);
				// 播放粒子效果
				switch (index) {
					case 0:
						opal.TrySpawnParticle(dimension, 'constant:excite_rune_red', target?.bottomCenter() as server.Vector3);
						break;

					case 1:
						opal.TrySpawnParticle(dimension, 'constant:excite_rune_blue', target?.bottomCenter() as server.Vector3);
						break;

					case 2:
						opal.TrySpawnParticle(dimension, 'constant:excite_rune_green', target?.bottomCenter() as server.Vector3);
						break;

					case 3:
						opal.TrySpawnParticle(dimension, 'constant:excite_rune_orange', target?.bottomCenter() as server.Vector3);
						break;

					case 4:
						opal.TrySpawnParticle(dimension, 'constant:excite_rune_purple', target?.bottomCenter() as server.Vector3);
						break;

					default: break;
				};
				// 赋值方块状态
				opal.TrySetPermutation(block, 'STATE:caching', (caching || 0) + Math.floor(Math.random() * 2));
				// 替换储罐方块
				if (caching == 8) block.setPermutation(server.BlockPermutation.resolve('starry_map:empty_tank'));
				// 判断 方块 是否 存在
				if (target && target.isValid) opal.TrySetPermutation(target, 'STATE:stage', 1);
			};
			// 赋值方块状态
			opal.TrySetPermutation(block, 'STATE:output', onTag ? 1 : 0);
		}
	}
);
/*
 * 变换储罐
 */
components.set(componentPrefix + 'transform_tank',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 辉光-魔晶储罐
			 */
			const constant = server.BlockPermutation.resolve('starry_map:release_tank');
			// 播放粒子效果
			switch (opal.Random({ max: 4, min: 0 }, true)) {
				case 0:
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_red', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 1:
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_blue', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 2:
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_green', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 3:
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_orange', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 4:
					opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_purple', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				default: break;
			};
			switch (opal.Random({ max: 4, min: 0 }, true)) {
				case 0:
					opal.TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_red', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 1:
					opal.TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_blue', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 2:
					opal.TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_green', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 3:
					opal.TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_orange', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 4:
					opal.TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_purple', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				default: break;
			};
			switch (opal.Random({ max: 4, min: 0 }, true)) {
				case 0:
					opal.TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_red', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 1:
					opal.TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_blue', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 2:
					opal.TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_green', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 3:
					opal.TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_orange', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				case 4:
					opal.TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_purple', analysis.block.above()?.bottomCenter() as server.Vector3);
					break;

				default: break;
			};
			analysis.dimension.playSound('cauldron.explode', analysis.block.location);
			analysis.block.setPermutation(constant);
		}
	}
);
/*
 * 动能分配
 */
components.set(componentPrefix + 'allocation_power',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const { block } = TickComponentTrigger(source);
			/**
			 * * 获取 目标方块
			 */
			const target = block.above();
			/**
			 ** 检测目标块是否为能量节点
			 */
			const onTag = target?.getTags()?.includes('tags:energy_module.node') as boolean;
			// 判断 方块 是否 为 能量节点
			if (!onTag) return;
			// 赋值方块状态
			opal.TrySetPermutation(block, 'STATE:output', 0);
			// 判断 方块 是否 存在
			if (target && target.isValid) opal.TrySetPermutation(target, 'STATE:stage', 1);
		}
	}
);
/*
 * 熔岩质能
 */
components.set(componentPrefix + 'magma_power',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const { block, state, dimension } = TickComponentTrigger(source);
			/**
			 ** 获取计数值
			 */
			const count = state.getState('STATE:count') as number;
			/**
			 ** 获取熔岩量
			 */
			const magma = state.getState('STATE:magma') as number;
			// 播放音效
			dimension?.playSound('fire.fire', block.location);
			// 执行功能
			if (checkAllocation(block)) {
				// 遍历 动能分配模块
				energyAllocation(block, opal.Vector.CONSTANT_SOUTH);
				energyAllocation(block, opal.Vector.CONSTANT_NORTH);
				energyAllocation(block, opal.Vector.CONSTANT_EAST);
				energyAllocation(block, opal.Vector.CONSTANT_WEST);
			};
			// 执行一定次数后修改方块状态
			blockTimer(block, 2,
				() => {
					if (count == 0) {
						opal.TrySetPermutation(block, 'STATE:count', 15);
						opal.TrySetPermutation(block, 'STATE:magma', magma - 1);
					}
					else {
						opal.TrySetPermutation(block, 'STATE:count', count - 1);
					};
				}
			)
		}
	}
);
/*
 * 水素质能
 */
components.set(componentPrefix + 'water_power',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const { block, state, dimension } = TickComponentTrigger(source);
			/**
			 * * 前处理事件
			 */
			function beforeEvent() {
				/**
				 ** 空气方块
				 */
				const air = server.BlockPermutation.resolve('minecraft:air');
				/**
				 ** 水源方块
				 */
				const water = server.BlockPermutation.resolve('minecraft:water');
				/**
				 ** 锚点_a
				 */
				const anchor_a = opal.Vector.add(block.location, opal.Vector.CONSTANT_ONE);
				/**
				 ** 锚点_b
				 */
				const anchor_b = opal.Vector.add(block.location, opal.Vector.CONSTANT_LOSS_ONE);
				/**
				 ** 获取计数值
				 */
				const isWater = block.below()?.isLiquid as boolean;
				/**
				 ** 获取方块状态
				 */
				const current = state.getState('STATE:stage') as number;
				// 赋值 方块状态
				if (isWater) opal.TrySetPermutation(block, 'STATE:stage', current + 1);
				// 将 水源 置换为 空气
				opal.TryFillBlocks(dimension, anchor_a, anchor_b, air, { blockFilter: { includePermutations: [water] } });
			};
			/**
			 * * 后处理事件
			 */
			function afterEvent() {
				/**
				 * * 获取 自身 的 方块状态
				 */
				const permutation = block.permutation;
				// 判断 方块 是否 有 动能分配模块
				if (!checkAllocation(block)) return;
				// 切换运行阶段
				opal.TrySetPermutation(block, 'STATE:stage', 0);
				// 基于 方块朝向 遍历 动能分配模块
				switch (permutation.getState('minecraft:cardinal_direction')) {
					case 'south': energyAllocation(block, opal.Vector.CONSTANT_SOUTH); break;

					case 'north': energyAllocation(block, opal.Vector.CONSTANT_NORTH); break;

					case 'east': energyAllocation(block, opal.Vector.CONSTANT_EAST); break;

					case 'west': energyAllocation(block, opal.Vector.CONSTANT_WEST); break;

					default: break;
				};
				// 播放 水花 粒子效果
				opal.SprayParticleTrigger(block.dimension, block.center());
			};
			if (state.getState('STATE:stage') as number !== 9) beforeEvent();
			else afterEvent();
		}
	}
);
/*
 * 植树造木
 */
components.set(componentPrefix + 'planting_and_logging',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const { block, state, dimension } = TickComponentTrigger(source);
			/**
			 * * 前处理事件
			 */
			function beforeEvent() {
				/**
				 ** 获取计数值
				 */
				const stage = state.getState('STATE:stage') as number;
				dimension.playSound('block.composter.fill_success', block.location);
				opal.TrySetPermutation(block, 'STATE:stage', stage + 1);
			};
			/**
			 * * 后处理事件
			 */
			function afterEvent() {
				opal.TrySetPermutation(block, 'STATE:rune_type', 0);
				opal.TrySetPermutation(block, 'STATE:stage', 0);
				// 判断能量值 是否足够
				if (!opal.ExpendEnergy(block, -50)) return;
				/**
				 * * 获取 方块
				 */
				const target = block.south();
				// 检测 方块是否存在
				if (!target || !target.isValid) return;
				/**
				 * * 测试 方块类型
				 */
				const test = table.is_wood.has(target.typeId);
				/**
				 * 深色橡木锚点-0
				 */
				const anchor_0 = opal.Vector.add(block.location, { x: 1, y: 0, z: 2 });
				/**
				 * 深色橡木锚点-1
				 */
				const anchor_1 = opal.Vector.add(block.location, opal.Vector.CONSTANT_SOUTH);
				if (!test) return;
				switch (target?.typeId) {
					// 黑橡木
					case 'minecraft:dark_oak_log': opal.TryFillBlocks(block.dimension, anchor_0, anchor_1, 'minecraft:dark_oak_sapling'); break;
					// 橡木
					case 'minecraft:oak_log': target.setPermutation(server.BlockPermutation.resolve('minecraft:oak_sapling')); break;
					// 云杉
					case 'minecraft:spruce_log': target.setPermutation(server.BlockPermutation.resolve('minecraft:spruce_sapling')); break;
					// 白桦
					case 'minecraft:birch_log': target.setPermutation(server.BlockPermutation.resolve('minecraft:birch_sapling')); break;
					// 丛林
					case 'minecraft:jungle_log': target.setPermutation(server.BlockPermutation.resolve('minecraft:jungle_sapling')); break;
					// 金合欢
					case 'minecraft:acacia_log': target.setPermutation(server.BlockPermutation.resolve('acacia_sapling')); break;
					// 樱花树
					case 'minecraft:cherry_log': target.setPermutation(server.BlockPermutation.resolve('minecraft:cherry_sapling')); break;
					// 绯红菌柄
					case 'minecraft:crimson_stem': target.setPermutation(server.BlockPermutation.resolve('minecraft:crimson_fungus')); break;
					// 诡异菌柄
					case 'minecraft:warped_stem': target.setPermutation(server.BlockPermutation.resolve('minecraft:warped_fungus')); break;

					default: break;
				};
				/**
				 * * 定义 起始点
				 */
				const start = opal.Vector.add(block, { x: -7, y: -1, z: -6 });
				/**
				 * * 定义 结束点
				 */
				const done = opal.Vector.add(block, { x: 7, y: 19, z: 8 });
				/**
				 * * 在 绘制路径 时 执行 的 程序
				 */
				const moveEvent = (args: type.ROUTE_ANNEX_ARGS) => {
					/**
					 * * 检测方块是否需要被挖掘
					 */
					const TestSort = () => {
						/**
						 * * 获取 方块对象
						 */
						const getBlock = args.dimension.getBlock(args.location);
						// 检测 方块类型
						if (getBlock) return table.is_trees.has(getBlock.typeId);
						else return false
					}
					//执行路径事件的功能
					if (TestSort()) args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`)
					// 继续循环
					return true
				};
				// 创建 路径执行计划
				opal.PathExecute.CreateForCube(
					'植树造木-范围扫描',
					{
						particles: ['constant:track_rune_green'],
						dimension: block.dimension,
						locations: [],
						cooldown: 1,
						speed: 1,
						offset: opal.Vector.CONSTANT_HALF,
						on_move: moveEvent
					},
					start, done, 0.5
				);
			};
			if (state.getState('STATE:stage') as number !== 5) beforeEvent();
			else afterEvent();
		}
	}
);
/*
 * 作物侦测
 */
components.set(componentPrefix + 'crop_detection',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const { block, dimension } = TickComponentTrigger(source);
			/**
			 ** 检测方块是否处于开启状态
			 */
			const onTag = block.above()?.getTags()?.includes('tags:magic_cable.open') as boolean;
			// 如果开启状态
			if (onTag) return;
			// 播放音效
			dimension.playSound('block.composter.ready', block.location);
			// 判断能量值 是否足够
			if (!opal.ExpendEnergy(block, -5)) return;
			/**
			 * * 定义 路径事件
			 */
			const TickEvent = (args: type.ROUTE_ANNEX_ARGS) => {
				/**
				 * * 获取 方块
				 */
				const block = args.dimension.getBlock(args.location);
				// 检测 方块是否存在
				if (!block || !block.isValid) return false;
				/**
				 * * 获取 方块类型
				 */
				const protoResult = table.is_crops.get(block.typeId);
				/**
				 * * 获取 方块状态
				 */
				const getPermutation = block.permutation;
				// 如果 可以收割
				if (protoResult === true || getPermutation.getState('growth') == 7) return false;
				else if (block.typeId == 'minecraft:sweet_berry_bush' && getPermutation.getState('growth') == 3) return false;
				else if (block.typeId == 'minecraft:cocoa' && getPermutation.getState('age') == 2) return false;
				else if (block.typeId == 'nether_wart' && getPermutation.getState('age') == 3) return false;
				// 继续循环
				else return true;
			};
			/**
			 * * 定义 停止事件
			 */
			const StopEvent = (args: type.ROUTE_ANNEX_ARGS) => {
				if (args.tick > 15) return;
				/**
				 * * 获取 方块
				 */
				const target = block.north();
				// 检测 方块是否存在
				if (!target || !target.isValid) return;
				// 设置方块状态
				opal.TrySetPermutation(target, 'STATE:rune_type', opal.RandomFloor(1, 7));
			};
			// 创建 路径事件
			opal.PathExecute.Create('作物侦测-检测射线', 1,
				{
					locations: [block, opal.Vector.add(block, { x: 0, y: 0, z: 15 })],
					particles: ['constant:track_rune_green'],
					offset: { x: 0.5, y: 0.5, z: 0.5 },
					dimension: block.dimension,
					on_move: TickEvent,
					on_done: StopEvent,
					cooldown: 1,
					speed: 1
				}
			);
		}
	}
);
/*
 * 魔晶明灯
 */
components.set(componentPrefix + 'magic_crystal_lamp',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 获取方块状态
			 */
			const light = analysis.state.getState('STATE:light') as number;
			if (analysis.condition as number <= 3 && light != 15) opal.TrySetPermutation(analysis.block, 'STATE:light', light + 1);
			if (analysis.condition as number >= 4 && light != 0) opal.TrySetPermutation(analysis.block, 'STATE:light', light - 1);
			if (analysis.condition as number == 6) opal.TrySetPermutation(analysis.block, 'STATE:light', 15);
			if (analysis.condition as number == 7) opal.TrySetPermutation(analysis.block, 'STATE:light', 0);
			opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
		}
	}
);
type VIRTUAL_WEATHER = {
	/**
	 * TODO: 要播放的粒子效果
	 */
	particle: string;
}
/*
 * 水域天降
 */
components.set(componentPrefix + 'virtual_weather',
	{
		onTick(source: server.BlockComponentTickEvent, data: { params: VIRTUAL_WEATHER }) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 获取计数值
			 */
			const stage = analysis.state.getState('STATE:stage') as number;
			/**
			 ** 检测方块是否处于开启状态
			 */
			const onTag = analysis.block.below()?.getTags()?.includes('tags:magic_cable.open') as boolean;
			// 检测是否处于开启状态
			if (!onTag) return;
			// 播放基础粒子效果
			if (stage == 0) opal.TrySpawnParticle(analysis.dimension, 'constant:impact_rune_white', analysis.block.location);
			// 播放自定义粒子效果
			if (stage == 0 && data.params.particle) opal.TrySpawnParticle(analysis.dimension, data.params.particle, analysis.block.location);
			// 设置方块状态值
			opal.TrySetPermutation(analysis.block, 'STATE:stage', stage != 3 ? stage + 1 : 0);
		}
	}
);
/*
 * 脉冲尖峰
 */
components.set(componentPrefix + 'PulsePeakCannon',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 检测方块是否处于开启状态
			 */
			const onTag = analysis.block.below()?.getTags()?.includes('tags:magic_cable.open') as boolean;
			if (onTag) magic_weapon.pulsePeakCannon(analysis.block);
		}
	}
);
/*
 * 曜石熔炉
 */
components.set(componentPrefix + 'obsidian_furnace',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * * 前处理事件
			 */
			function beforeEvent() {
				/**
				 * * 获取剩余石材数量
				 */
				const material = analysis.state.getState('STATE:material') as number;
				/**
				 * * 获取方块运行阶段
				 */
				const stage = analysis.state.getState('STATE:stage') as number;
				/**
				 * * 获取熔岩库存量
				 */
				const magma = analysis.state.getState('STATE:magma') as number;
				// 检测是否为 熔岩生成 阶段
				if (stage == 1 && material != 0) {
					opal.TrySetPermutation(analysis.block, 'STATE:material', material - 1);
					opal.TrySetPermutation(analysis.block, 'STATE:magma', magma + 1);
					opal.TrySetPermutation(analysis.block, 'STATE:direction_0', 0);
					opal.TrySetPermutation(analysis.block, 'STATE:direction_1', 0);
					opal.TrySetPermutation(analysis.block, 'STATE:direction_2', 0);
					opal.TrySetPermutation(analysis.block, 'STATE:direction_3', 0);
					opal.TrySetPermutation(analysis.block, 'STATE:stage', 0);
				}
				else if (stage == 0) obsidian_smelting.Attrition(analysis.block);
			};
			/**
			 * * 后处理事件
			 */
			function afterEvent() {
				const direction_0 = analysis.block.offset({ x: 0, y: -1, z: -1 })?.getTags()?.includes('tags:obsidian_smelting.storage_tank')
				const direction_1 = analysis.block.offset({ x: -1, y: -1, z: 0 })?.getTags()?.includes('tags:obsidian_smelting.storage_tank')
				const direction_2 = analysis.block.offset({ x: 0, y: -1, z: 1 })?.getTags()?.includes('tags:obsidian_smelting.storage_tank')
				const direction_3 = analysis.block.offset({ x: 1, y: -1, z: 0 })?.getTags()?.includes('tags:obsidian_smelting.storage_tank')
				opal.TrySetPermutation(analysis.block, 'STATE:direction_0', direction_0 ? 1 : 0);
				opal.TrySetPermutation(analysis.block, 'STATE:direction_1', direction_1 ? 1 : 0);
				opal.TrySetPermutation(analysis.block, 'STATE:direction_2', direction_2 ? 1 : 0);
				opal.TrySetPermutation(analysis.block, 'STATE:direction_3', direction_3 ? 1 : 0);
				obsidian_smelting.Pouring(analysis.block);
			}
			const magma = analysis.state.getState('STATE:magma') as number;
			if (magma != 8) beforeEvent();
			if (magma == 8) afterEvent();
		}
	}
);
type ENERGY_EXPEND = {
	/**
	 * 星尘力的变动值
	 */
	modify?: number;
	/**
	 * 需要修改的方块状态
	 */
	revise?: string;
}
/*
 * 消耗星尘力
 */
components.set(componentPrefix + 'energy_expend',
	{
		onTick(source: server.BlockComponentTickEvent, data: { params: ENERGY_EXPEND }) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const { block } = TickComponentTrigger(source);
			/**
			 * * 方块组件参数 的 解构
			 */
			const { modify, revise } = data.params;
			/**
			 ** 查询剩余能量
			 */
			const energy = opal.ExpendEnergy(block, modify || -1);
			// 检测能量是否变动成功
			if (energy) opal.TrySetPermutation(block, revise || 'default', 2);
			else opal.TrySetPermutation(block, revise || 'default', 0);
		}
	}
);
/*
 * 常规 物流网络 接收端
 */
components.set(componentPrefix + 'routine_logistics_receiver',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 获取 关于方块旋转 的 方块状态
			 */
			const direction = analysis.state.getState('minecraft:cardinal_direction');
			/**
			 ** 侦测 方块容器 并 提交 物品网络申请
			 *
			 * @param {server.Block | undefined} target - 目标容器方块
			 */
			function Detecting(target?: server.Block) {
				/**
				 ** 上方 的 物品展示框 的 物品信息
				 */
				const frame = analysis.block.above()?.getItemStack(1);
				/**
				 ** 指定的 方块 的 物品容器
				 */
				const container = target?.getComponent('inventory')?.container;
				// 检测 容器 展示框 剩余空间 是否满足要求
				if (!target || !frame || !container || container.emptySlotsCount == 0) return;
				/**
				 ** 物品网络频道
				 */
				const channel = frame.typeId;
				/**
				 ** 网络筛选类型
				 */
				const filter = container.getItem(0)?.typeId ?? frame.typeId;
				// 提交 物品网络申请
				routineLogisticsRequest.set(analysis.dimension.id + '•' + channel + '•' + filter, target.location);
			};
			// 基于 方块状态 旋转 容器读取方向
			switch (direction) {
				case 'south': Detecting(analysis.block.south()); break;

				case 'north': Detecting(analysis.block.north()); break;

				case 'east': Detecting(analysis.block.east()); break;

				case 'west': Detecting(analysis.block.west()); break;

				default: break;
			}
		}
	}
);
/*
 * 跨界 物流网络 接收端
 */
components.set(componentPrefix + 'surpass_logistics_receiver',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 获取 关于方块旋转 的 方块状态
			 */
			const direction = analysis.state.getState('minecraft:cardinal_direction');
			/**
			 ** 侦测 方块容器 并 提交 物品网络申请
			 *
			 * @param {server.Block | undefined} target - 目标容器方块
			 */
			function Detecting(target?: server.Block) {
				/**
				 ** 上方 的 物品展示框 的 物品信息
				 */
				const frame = analysis.block.above()?.getItemStack(1);
				/**
				 ** 指定的 方块 的 物品容器
				 */
				const container = target?.getComponent('inventory')?.container;
				// 检测 容器 展示框 剩余空间 是否满足要求
				if (!target || !frame || !container || container.emptySlotsCount == 0) return;
				/**
				 ** 物品网络频道
				 */
				const channel = frame.typeId;
				/**
				 ** 网络筛选类型
				 */
				const filter = container.getItem(0)?.typeId ?? frame.typeId;
				// 提交 物品网络申请
				surpassDimensionRequest.set(channel + '•' + filter, [target.dimension, target.location]);
			};
			// 基于 方块状态 旋转 容器读取方向
			switch (direction) {
				case 'south': Detecting(analysis.block.south()); break;

				case 'north': Detecting(analysis.block.north()); break;

				case 'east': Detecting(analysis.block.east()); break;

				case 'west': Detecting(analysis.block.west()); break;

				default: break;
			}
		}
	}
);
/*
 * 常规 物流网络 发送端
 */
components.set(componentPrefix + 'routine_logistics_sender',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 上方 的 物品展示框 的 物品信息
			 */
			const frame = analysis.block.above()?.getItemStack(1);
			// 检测 展示框 能量 请求数量 是否满足要求
			if (!frame || !opal.ExpendEnergy(analysis.block, -20) || routineLogisticsRequest.size < 1) return;
			/**
			 ** 物品网络频道
			 */
			const channel = [...routineLogisticsRequest].filter(
				info => {
					const split = info[0].split('•');
					return split[0] == analysis.dimension.id && split[1] == frame.typeId
				}
			);
			/**
			 ** 附近的方块容器
			 */
			const containers = [
				analysis.block.west()?.getComponent('inventory')?.container,
				analysis.block.east()?.getComponent('inventory')?.container,
				analysis.block.north()?.getComponent('inventory')?.container,
				analysis.block.south()?.getComponent('inventory')?.container,
			];
			/**
			 ** 重构 物品请求信息
			 */
			const judge = new Map<string, server.Vector3>(channel.map(info => [info[0].split('•')[2], info[1]]));
			// 遍历容器
			containers.forEach(
				container => {
					// 检测容器是否存在
					if (!container) return;
					// 遍历容器中的物品
					for (let index = 0; index < container.size; index++) {
						/**
						 ** 获取容器中的物品
						 */
						const item = container.getItem(index); if (!item) continue;
						/**
						 ** 检测物品是否在请求列表上
						 */
						const result = judge.get(item.typeId); if (!result) continue;
						/**
						 ** 获取发出请求的方块
						 */
						const block = analysis.dimension.getBlock(result); if (!block) continue;
						/**
						 ** 获取接收物品的方块容器
						 */
						const inventory = block.getComponent('inventory')?.container; if (!inventory) continue;
						// 迁移物品
						inventory.addItem(item);
						container.setItem(index);
						return;
					}
				}
			);
			// 清除 物品网络申请
			routineLogisticsRequest = new Map<string, server.Vector3>(
				[...routineLogisticsRequest].filter(
					info => {
						/**
						 ** 拆分 维度 频道 类型
						 */
						const split = info[0].split('•');
						// 检测 维度 频道 类型 是否符合
						return split[0] != analysis.dimension.id || split[1] != frame.typeId
					}
				)
			);
		}
	}
);
/*
 * 跨界 物流网络 发送端
 */
components.set(componentPrefix + 'surpass_logistics_sender',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 ** 上方 的 物品展示框 的 物品信息
			 */
			const frame = analysis.block.above()?.getItemStack(1);
			// 检测 展示框 能量 请求数量 是否满足要求
			if (!frame || !opal.ExpendEnergy(analysis.block, -30) || surpassDimensionRequest.size < 1) return;
			/**
			 ** 物品网络频道
			 */
			const channel = [...surpassDimensionRequest].filter(info => info[0].split('•')[0] == frame.typeId);
			/**
			 ** 附近的方块容器
			 */
			const containers = [
				analysis.block.west()?.getComponent('inventory')?.container,
				analysis.block.east()?.getComponent('inventory')?.container,
				analysis.block.north()?.getComponent('inventory')?.container,
				analysis.block.south()?.getComponent('inventory')?.container,
			];
			/**
			 ** 重构 物品请求信息
			 */
			const judge = new Map<string, [server.Dimension, server.Vector3]>(channel.map(info => [info[0].split('•')[1], info[1]]));
			// 遍历容器
			containers.forEach(
				container => {
					// 检测容器是否存在
					if (!container) return;
					// 遍历容器中的物品
					for (let index = 0; index < container.size; index++) {
						/**
						 ** 获取容器中的物品
						 */
						const item = container.getItem(index); if (!item) continue;
						/**
						 ** 检测物品是否在请求列表上
						 */
						const result = judge.get(item.typeId); if (!result) continue;
						/**
						 ** 获取发出请求的方块
						 */
						const block = result[0].getBlock(result[1]); if (!block) continue;
						/**
						 ** 获取接收物品的方块容器
						 */
						const inventory = block.getComponent('inventory')?.container; if (!inventory) continue;
						// 迁移物品
						inventory.addItem(item);
						container.setItem(index);
						return;
					}
				}
			);
			// 清除请求信息
			surpassDimensionRequest = new Map<string, [server.Dimension, server.Vector3]>(
				[...surpassDimensionRequest].filter(info => info[0].split('•')[0] != frame.typeId)
			);
		}
	}
);
/*
 * 容器整理
 */
components.set(componentPrefix + 'container_arrange',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = TickComponentTrigger(source);
			/**
			 * 获取方块上下位置的容器组件
			 */
			const containers = [
				analysis.block.above()?.getComponent('inventory')?.container,
				analysis.block.below()?.getComponent('inventory')?.container,
			];
			// 判断是否成功获取到能量
			if (!opal.ExpendEnergy(analysis.block, -20)) return;
			// 遍历容器列表, 对每个容器执行操作
			containers.forEach(
				container => {
					// 如果容器不存在, 或者方块无法消耗能量, 则跳过当前循环
					if (!container || !opal.ExpendEnergy(analysis.block, -5)) return;
					/**
					 * 获取容器中的所有物品
					 */
					const items: server.ItemStack[] = [];
					// 遍历容器中的所有物品槽位
					for (let index = 0; index < container.size; index++) {
						/**
						 * 获取当前槽位的物品
						 */
						const item = container.getItem(index);
						// 如果当前槽位为空, 则跳过当前循环
						if (!item) continue;
						// 将物品从容器中移除
						container.setItem(index);
						// 将物品添加到物品列表中
						items.push(item);
					};
					// 将物品列表中的物品添加到容器中
					opal.OrganizeItemStacks(items).forEach(item => container.addItem(item));
				}
			)
		}
	}
);
type RESIDUAL_EXTRACTION = {
	/**
	 * 被消耗的物品
	 */
	expense?: string[];
	/**
	 * 容器位置
	 */
	container?: server.Vector3;
	/**
	 * 开始执行时消耗的能量
	 */
	consumption?: number;
	/**
	 * 执行成功后修改的属性
	 */
	revise?: string;
};
/**
 * 从容器中提取符合要求的怪物掉落物
 *
 * @param {server.Container} container - 要处理的容器对象
 *
 * @param {string[]} expense - 预定义的怪物掉落物类型集合
 *
 * @returns {boolean} 是否成功提取了有效怪物掉落物
 *
 * @description 遍历容器物品, 当找到预定义的怪物掉落物时消耗 1 个并返回true
 */
function extractResidues(container: server.Container, expense: string[]): boolean {
	/**
	 * 有效的怪物掉落物类型集合
	 */
	const itemTable = new Set<string>(expense);
	// 遍历容器所有槽位
	for (let index = 0; index < container.size; index++) {
		/**
		 * 当前槽位的物品对象
		 *
		 * @type {server.ItemStack | undefined}
		 */
		const item: server.ItemStack | undefined = container.getItem(index);
		// 跳过空槽位和非目标物品
		if (!item || !itemTable.has(item.typeId)) continue;
		// 消耗1个目标物品
		opal.ConsumeItemStack(container, index, item, 1);
		return true;
	}
	return false;
};
/*
 * 遗物萃取
 */
components.set(componentPrefix + 'residual_extraction',
	{
		/**
		 * 方块组件 tick 事件处理器, 用于处理怪物掉落物提取逻辑
		 *
		 * @param {server.BlockComponentTickEvent} source - 方块组件tick事件对象
		 */
		onTick(source: server.BlockComponentTickEvent, data: { params: RESIDUAL_EXTRACTION }) {
			/**
			 * 解析方块组件触发事件
			 */
			const { block, dimension } = TickComponentTrigger(source);
			/**
			 * 解析方块组件参数
			 */
			const { expense, container, consumption, revise } = data.params;
			// 检测参数是否存在
			if (!expense || !container || !consumption || !revise) return;
			/**
			 * 获取偏移位置的容器组件
			 */
			const targetContainer = block.offset(container)?.getComponent('inventory')?.container;
			// 检测容器是否存在, 是否有空位, 是否消耗能量
			if (!targetContainer || targetContainer.emptySlotsCount == 0 || !opal.ExpendEnergy(block, -consumption)) return;
			/**
			 * 当前方块的状态值
			 */
			const state = block.permutation.getState(revise) as number;
			/**
			 * 是否成功提取怪物掉落物
			 */
			const conclusion = extractResidues(targetContainer, expense);
			// 能量管理逻辑
			if (conclusion && state < 12) {
				// 增加能量值
				opal.TrySetPermutation(block, revise, state + 1);
				// 播放运行音效
				dimension.playSound('step.amethyst_cluster', block);
			}
			else if (conclusion) {
				// 重置能量值
				opal.TrySetPermutation(block, revise, 0);
				// 生成经验瓶
				targetContainer.addItem(new server.ItemStack('experience_bottle', 1));
				// 播放运行音效
				dimension.playSound('step.amethyst_cluster', block);
			};
		}
	}
);
/*
 * 容器枢纽
 */
components.set(componentPrefix + 'container_hub',
	{
		async onTick(source: server.BlockComponentTickEvent) {
			/**
			 * 解析方块组件触发事件
			 */
			const { block, dimension } = TickComponentTrigger(source);
			/**
			 * 获取上方方块对象
			 */
			const above = block.above();
			/**
			 * 获取上方容器组件
			 */
			const container = above?.getComponent('inventory')?.container;
			/**
			 * 创建用于设置粒子效果参数的 Molang 变量映射
			 *
			 * @param {server.MolangVariableMap} molang - Molang变量映射对象
			 */
			const molang = new server.MolangVariableMap();
			/**
			 * 判断是否执行成功
			 */
			let success = false;
			// 判断是否成功获取到能量
			if (!opal.ExpendEnergy(block, -50)) return;
			// 判断事件返回的对象是否完整可用
			if (!above || !container) return;
			// 遍历上方容器中的物品槽位
			for (let index = 0; index < container.size; index++) {
				/**
				 * 获取当前槽位的物品
				 */
				const item = container.getItem(index);
				// 如果当前槽位为空, 则跳过当前循环
				if (!item) continue;
				/**
				 * 获取容器查询结果
				 */
				let searchResults = opal.SearchContainers(block, item, 8);
				// 移除重复的容器对象
				searchResults = searchResults.filter(value => !opal.Vector.equals(value[1].location, above.location));
				// 如果没有找到容器, 放宽条件重新搜索
				if (searchResults.length === 0) searchResults = opal.SearchContainers(block);
				// 如果没有找到容器, 则终止本次事件的继续执行
				if (searchResults.length === 0) return dimension.playSound('respawn_anchor.deplete', block);
				/**
				 * * 获取目标容器和目标方块
				 */
				const [targetContainer] = searchResults[0];
				// 将物品添加到目标方块容器中
				targetContainer.addItem(item);
				// 从上方容器中移除物品
				container?.setItem(index);
				// 标记物品已经成功转移
				success = true;
				// 中断循环执行
				await server.system.waitTicks(1);
			};
			// 设置粒子效果参数
			molang.setFloat('variable.size', 18);
			// 播放音效 表示运行结束
			if (success) dimension.playSound('respawn_anchor.charge', block);
			// 生成表示运行结束的粒子效果
			for (let index = 0; index < 3; index++) {
				molang.setFloat('variable.direction', index);
				opal.TrySpawnParticle(dimension, 'scripts:path_round', block.center(), molang);
			}
		}
	}
)
export default components;