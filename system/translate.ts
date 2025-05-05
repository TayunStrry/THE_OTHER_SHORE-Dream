/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 导出模块
 */
export { translate }
/**
 * 将游戏对象转换为本地化消息对象
 */
type TRANSLATION_TYPE = "entity" | "block" | "item";
/**
 * 将游戏对象或标识符转换为本地化消息对象
 *
 * @param {server.Entity | server.Player | server.Block | server.ItemStack | string} target - 需要转换的游戏对象或标识符。支持玩家、实体、方块、物品堆或字符串标识符
 *
 * @param {TRANSLATION_TYPE} type - 当`target`为字符串时**必须指定**, 用于确定本地化键的类型（实体/方块/物品）
 *
 * @returns {server.RawMessage} - 符合格式的`RawMessage`对象, 优先使用自定义名称标签, 否则根据类型生成本地化键
 */
function translate(target: string, type: TRANSLATION_TYPE): server.RawMessage;
function translate(target: server.Entity | server.Player | server.Block | server.ItemStack): server.RawMessage;
function translate(target: server.Entity | server.Player | server.Block | server.ItemStack | string, type?: TRANSLATION_TYPE): server.RawMessage {
	// 如果目标为玩家或带有有效 nameTag 的实体, 返回 {text: target.nameTag}
	if (target instanceof server.Player || (target instanceof server.Entity && target.nameTag.length >= 1)) return { text: target.nameTag };
	// 如果目标为字符串, 则根据 type 参数进行本地化处理
	else if (typeof target == 'string') {
		/**
		 * * 获取识别标识
		 */
		const split = target.split(':');
		// 根据type参数进行本地化处理
		switch (type) {
			case 'entity': return { translate: `entity.${(split[0] == 'minecraft') ? split[1] : target}.name` };

			case 'block': return { translate: `tile.${(split[0] == 'minecraft') ? split[1] : target}.name` };

			case 'item': return { translate: `item.${(split[0] == 'minecraft') ? split[1] : target}${(split[0] == 'minecraft') ? '.name' : ''}` }

			default: return { text: '未知的 -> ' + target }
		}
	}
	// 否则返回 {translate: target.localizationKey} 进行本地化处理
	else return { translate: target.localizationKey };
};