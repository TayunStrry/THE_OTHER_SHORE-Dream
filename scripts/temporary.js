/*
 * NodeJS => 临时性脚本文件
 */
let json = {};
[
	["minecraft:coal_ore", { max: 20480, min: 16 }],
	["minecraft:lapis_ore", { max: 20480, min: 16 }],
	["minecraft:quartz_ore", { max: 20480, min: 16 }],
	["minecraft:copper_ore", { max: 20480, min: 16 }],
	["minecraft:redstone_ore", { max: 20480, min: 16 }],

	["minecraft:gold_ore", { max: 5120, min: 16 }],
	["minecraft:iron_ore", { max: 5120, min: 16 }],

	["minecraft:diamond_ore", { max: 1280, min: 16 }],
	["minecraft:emerald_ore", { max: 1280, min: 16 }],

	["minecraft:ancient_debris", { max: 32, min: 1 }],
	["minecraft:amethyst_cluster", { max: 1280, min: 16 }],
	["starry_map:mine.gold_carbonate", { max: 40960, min: 8 }],
	["starry_map:mine.ferric_chloride", { max: 40960, min: 8 }],
	["starry_map:mine.ferric_phosphate", { max: 40960, min: 8 }],
	["starry_map:mine.zirconium_carbide", { max: 40960, min: 8 }],
	["starry_map:mine.lithium_carbonate", { max: 40960, min: 8 }],
	["starry_map:mine.aluminum_magnesium", { max: 40960, min: 8 }],
	["starry_map:mine.copper_tin_brazing", { max: 40960, min: 8 }],
	["starry_map:mine.oxygen_enriched_gold", { max: 40960, min: 8 }],
	["starry_map:mine.tungsten_nickel_titanium", { max: 40960, min: 8 }]
].forEach(([id, { max }]) => {
	// 使用max值和随机性来计算weight，确保其是0到10之间的整数
	const randomWeight = Math.floor(Math.random() * 11); // 随机数范围从0到10
	const adjustedWeight = Math.min(max / 4096, 10) + 1 | 1; // 将max值除以一个因子，然后向下取整至最接近的整数

	// 结合两种方法来得到最终的weight值
	const weight = randomWeight === 10 ? adjustedWeight : randomWeight;

	json[id] = { weight: weight > 10 ? 10 : weight, dimension: "minecraft:overworld" };
});
console.log(JSON.stringify(json, null, '\t'))