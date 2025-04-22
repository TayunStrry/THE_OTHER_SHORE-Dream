/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统数据
 */
import * as type from "./type";
/**
 * * 重置 - 海灵 - 交易列表
 *
 * @param {server.Player} player - 玩家对象
 */
function hailingReset(player: server.Player) {
	/**
	 * * 带有 权重信息 的 原始数据
	 */
	const tradeTags = new Map<string, number>(
		[
			["trophy:trade.void", 16],
			["trophy:trade.machine_rune", 2],
			["trophy:trade.fishery_bucket", 8],
			["trophy:trade.mineral_products", 4],
			["trophy:trade.heart_of_the_sea", 2],
		]
	);
	/**
	 * * 解构化 原始数据
	 */
	const proto = [...tradeTags];
	/**
	 * * 获取 原始数据 的 总权重
	 */
	const scale = proto.reduce((acc, cur) => acc + cur[1], -1);
	/**
	 * * 解析后的目标数组
	 */
	const source: string[] = [];
	/**
	 * * 随机索引
	 */
	const index = Math.floor(Math.random() * scale);
	// 遍历 原始数据
	proto.forEach(info => { for (let index = 0; index < info[1]; index++) source.push(info[0]) });
	// 清除随机标签
	player.removeTag(source[index]);
};
/**
 * * 海灵商店
 */
const hailing = new Map<string, type.SCHEDULE_NOTE>(
	[
		[
			'购置 海洋之心',
			{
				texture: 'textures/items/heartofthesea_closed',
				refer: [
					{ text: '§r32 x <§l§u 干海带 §r> | 16 x <§l§u 鹦鹉螺壳 §r>' }
				],
				reward: [
					{ type: "minecraft:heart_of_the_sea", amount: 1 }
				],
				attrition: [
					{ type: "minecraft:nautilus_shell", amount: 16 },
					{ type: "minecraft:dried_kelp", amount: 32 },
				],
				onDone: [
					'trophy:trade.heart_of_the_sea'
				],
				after: hailingReset
			}
		],
		[
			'购置 渊鲸符文',
			{
				texture: 'textures/物品贴图/模板单元/渊鲸符文',
				refer: [
					{ text: '§r32 x <§l§u 干海带 §r> | 8 x <§l§u 空灵单元 §r>' }
				],
				reward: [
					{ type: "starry_map:whale_rune", amount: 1 }
				],
				attrition: [
					{ type: "starry_map:blank_template", amount: 8 },
					{ type: "minecraft:dried_kelp", amount: 32 }
				],
				onDone: [
					'trophy:trade.machine_rune'
				],
				after: hailingReset
			}
		],
		[
			'购置 美西螈桶',
			{
				texture: 'textures/items/bucket_axolotl',
				refer: [
					{ text: '§r32 x <§l§u 干海带 §r> | 32 x <§l§u 热带鱼 §r>' }
				],
				reward: [
					{ type: "minecraft:axolotl_bucket", amount: 1 }
				],
				attrition: [
					{ type: "minecraft:tropical_fish", amount: 32 },
					{ type: "minecraft:dried_kelp", amount: 32 }
				],
				onDone: [
					'trophy:trade.fishery_bucket'
				],
				after: hailingReset
			}
		],
		[
			'购置 鳕鱼桶',
			{
				texture: 'textures/items/bucket_cod',
				refer: [
					{ text: '§r32 x <§l§u 干海带 §r> | 8 x <§l§u 鳕鱼 §r>' }
				],
				reward: [
					{ type: "minecraft:cod_bucket", amount: 1 }
				],
				attrition: [
					{ type: "minecraft:cod", amount: 8 },
					{ type: "minecraft:dried_kelp", amount: 32 }
				],
				onDone: [
					'trophy:trade.fishery_bucket'
				],
				after: hailingReset
			}
		],
		[
			'购置 河豚鱼桶',
			{
				texture: 'textures/items/bucket_pufferfish',
				refer: [
					{ text: '§r32 x <§l§u 干海带 §r> | 8 x <§l§u 河豚鱼 §r>' }
				],
				reward: [
					{ type: "minecraft:pufferfish_bucket", amount: 1 }
				],
				attrition: [
					{ type: "minecraft:pufferfish", amount: 8 },
					{ type: "minecraft:dried_kelp", amount: 32 }
				],
				onDone: [
					'trophy:trade.fishery_bucket'
				],
				after: hailingReset
			}
		],
		[
			'购置 鲑鱼桶',
			{
				texture: 'textures/items/bucket_salmon',
				refer: [
					{ text: '§r32 x <§l§u 干海带 §r> | 8 x <§l§u 鲑鱼 §r>' }
				],
				reward: [
					{ type: "minecraft:salmon_bucket", amount: 1 }
				],
				attrition: [
					{ type: "minecraft:salmon", amount: 8 },
					{ type: "minecraft:dried_kelp", amount: 32 }
				],
				onDone: [
					'trophy:trade.fishery_bucket'
				],
				after: hailingReset
			}
		],
		[
			'购置 蝌蚪桶',
			{
				texture: 'textures/items/bucket_tadpole',
				refer: [
					{ text: '§r32 x <§l§u 干海带 §r> | 8 x <§l§u 小型垂滴叶 §r>' }
				],
				reward: [
					{ type: "minecraft:tadpole_bucket", amount: 1 }
				],
				attrition: [
					{ type: "minecraft:small_dripleaf_block", amount: 8 },
					{ type: "minecraft:dried_kelp", amount: 32 }
				],
				onDone: [
					'trophy:trade.fishery_bucket'
				],
				after: hailingReset
			}
		],
		[
			'购置 热带鱼桶',
			{
				texture: 'textures/items/bucket_tropical',
				refer: [
					{ text: '§r32 x <§l§u 干海带 §r> | 8 x <§l§u 热带鱼 §r>' }
				],
				reward: [
					{ type: "minecraft:tropical_fish_bucket", amount: 1 }
				],
				attrition: [
					{ type: "minecraft:tropical_fish", amount: 8 },
					{ type: "minecraft:dried_kelp", amount: 32 }
				],
				onDone: [
					'trophy:trade.fishery_bucket'
				],
				after: hailingReset
			}
		],
		[
			'购置 海晶碎片',
			{
				texture: 'textures/items/prismarine_shard',
				refer: [
					{ text: '§r32 x <§l§u 干海带 §r> | 16 x <§l§u 砂砾 §r>' }
				],
				reward: [
					{ type: "minecraft:prismarine_shard", amount: 16 }
				],
				attrition: [
					{ type: "minecraft:gravel", amount: 16 },
					{ type: "minecraft:dried_kelp", amount: 32 }
				],
				onDone: [
					'trophy:trade.mineral_products'
				],
				after: hailingReset
			}
		],
		[
			'购置 海晶砂砾',
			{
				texture: 'textures/items/prismarine_crystals',
				refer: [
					{ text: '§r32 x <§l§u 干海带 §r> | 16 x <§l§u 砂砾 §r>' }
				],
				reward: [
					{ type: "minecraft:prismarine_crystals", amount: 16 }
				],
				attrition: [
					{ type: "minecraft:gravel", amount: 16 },
					{ type: "minecraft:dried_kelp", amount: 32 }
				],
				onDone: [
					'trophy:trade.mineral_products'
				],
				after: hailingReset
			}
		],
		[
			'代加工 熟鳕鱼',
			{
				texture: 'textures/items/fish_raw',
				refer: [
					{ text: '§r8 x <§l§u 干海带 §r> | §r8 x <§l§u 生鳕鱼 §r>' }
				],
				reward: [
					{ type: "minecraft:cooked_cod", amount: 8 }
				],
				attrition: [
					{ type: "minecraft:cod", amount: 8 },
					{ type: "minecraft:dried_kelp", amount: 8 }
				],
				after: hailingReset
			}
		],
		[
			'代加工 熟鲑鱼',
			{
				texture: 'textures/items/fish_salmon_cooked',
				refer: [
					{ text: '§r8 x <§l§u 干海带 §r> | §r8 x <§l§u 生鲑鱼 §r>' }
				],
				reward: [
					{ type: "minecraft:cooked_salmon", amount: 8 }
				],
				attrition: [
					{ type: "minecraft:salmon", amount: 8 },
					{ type: "minecraft:dried_kelp", amount: 8 }
				],
				after: hailingReset
			}
		],
	]
);
export default hailing;