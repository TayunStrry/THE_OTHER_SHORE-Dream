/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import * as table from "../data/table";
/**
 * * 装备事件触发器
 */
export default class EquipmentEventTrigger extends opal.Template {
    /**
     * * 物品被动事件触发器
     *
     * @param {server.Player} player 执行物品被动事件的玩家
     */
    Trigger(player) {
        /**
         * * 装备容器
         */
        const equippable = player.getComponent('minecraft:equippable');
        /**
         * * 物品槽位
         */
        const itemSlot = Object.values(server.EquipmentSlot);
        // 遍历物品槽位 并 基于物品类型执行对应事件
        itemSlot.map(slot => equippable?.getEquipment(slot)).forEach((item, index) => {
            switch (item?.typeId) {
                case 'starry_map:purple_gold_soul_jade':
                    purpleGoldSoulJade(player, item, itemSlot[index], equippable);
                    break;
                case 'starry_map:scarlet_flame_heart':
                    scarletFlameHeart(player, item, itemSlot[index], equippable);
                    break;
                case 'starry_map:starry_night_bead':
                    starryNightBead(player, item, itemSlot[index], equippable);
                    break;
                case 'starry_map:ice_essence_gem':
                    iceEssenceGem(player, item, itemSlot[index], equippable);
                    break;
                case 'starry_map:azure_sea_tide':
                    azureSeaTide(player, item, itemSlot[index], equippable);
                    break;
                case 'starry_map:magic_crystal_shield':
                    magicCrystalShield(player);
                    break;
                case 'starry_map:ocean_blessed_scarf':
                    seasInRing(player);
                    break;
                default: break;
            }
        });
    }
    ;
    afterPlanEvent() {
        /**
         * * 获取 全体玩家
         */
        const players = server.world.getAllPlayers();
        // 遍历玩家队列
        players.forEach(player => this.Trigger(player));
    }
    ;
    /**
     * * 简短的容器构造器
     *
     * @param nameTag - 容器名称
     */
    static BriefCreate(nameTag) {
        return this.Create(nameTag, 100, {});
    }
    ;
}
;
/**
 * * 诸海之环 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function seasInRing(player) {
    /**
     * * 实体过滤选项
     */
    const options = {
        excludeFamilies: ['monster'],
        location: player.location,
        maxDistance: 8,
        closest: 8
    };
    /**
     * * 实体排序
     */
    const onSort = (entity0, entity1) => {
        const distance0 = opal.Vector.distance(player.location, entity0.location);
        const distance1 = opal.Vector.distance(player.location, entity1.location);
        return distance0 - distance1;
    };
    /**
     * * 实体筛选
     */
    const onFilter = (target) => {
        return target.id === player.id || target.getDynamicProperty('entity:contract_user') == player.id;
    };
    /**
     * * 实体队列
     */
    const entitys = opal.EntitysSort(player.dimension, options, onSort, onFilter);
    // 造成 范围 瞬间治疗 效果
    entitys.forEach(entity => entity.addEffect('minecraft:instant_health', 1, { amplifier: 2, showParticles: false }));
    // 判断玩家是否在液体内
    if (!player.isInWater)
        return;
    // 赋予玩家 额外的 状态效果
    player.addEffect('minecraft:conduit_power', 300, { showParticles: false });
    /**
     * * 生成 珍珠游鱼 实体
     */
    const fish = opal.TrySpawnEntity(player.dimension, 'starry_map:elves.fish_of_pearl', player.location);
    if (fish instanceof Error)
        return;
    // 赋予动态属性
    player.getDynamicPropertyIds().forEach(id => fish.setDynamicProperty(id, player.getDynamicProperty(id)));
    // 校准 珍珠游鱼 的属性
    fish.setDynamicProperty('entity:improve', table.max_experience);
    fish.setDynamicProperty('entity:contract_user', player.id);
    fish.setDynamicProperty('entity:unlock', true);
}
;
/**
 * * 魔晶盾牌 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function magicCrystalShield(player) {
    // 为玩家附着状态效果
    player.addEffect('minecraft:absorption', 300, { amplifier: 8, showParticles: false });
    player.addEffect('minecraft:resistance', 300, { amplifier: 2, showParticles: false });
}
;
/**
 * * 星夜凝华 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function starryNightBead(player, item, slot, equippable) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, opal.AlterDurability(item, 1));
    // 为玩家附着状态效果
    player.addEffect('minecraft:night_vision', 600, { showParticles: false });
    player.addEffect('minecraft:haste', 300, { amplifier: 2, showParticles: false });
}
;
/**
 * * 紫晶魂玉 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function purpleGoldSoulJade(player, item, slot, equippable) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, opal.AlterDurability(item, 1));
    // 为玩家附着状态效果
    player.addEffect('minecraft:village_hero', 300, { showParticles: false });
    player.addEffect('minecraft:trial_omen', 300, { showParticles: false });
}
;
/**
 * * 寒冰灵韵 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function iceEssenceGem(player, item, slot, equippable) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, opal.AlterDurability(item, 1));
    /**
     * * 实体过滤选项
     */
    const options = {
        families: ['monster'],
        location: player.location,
        maxDistance: 24,
        closest: 8
    };
    /**
     * * 实体筛选
     */
    const entitys = player.dimension.getEntities(options);
    // 为玩家附着状态效果
    player.addEffect('minecraft:speed', 300, { amplifier: 2, showParticles: false });
    // 为怪物附加状态效果
    entitys.forEach(entity => entity.addEffect('minecraft:slowness', 300, { amplifier: 4 }));
}
;
/**
 * * 碧海潮生 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function azureSeaTide(player, item, slot, equippable) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, opal.AlterDurability(item, 1));
    // 为玩家附着状态效果
    player.addEffect('minecraft:conduit_power', 600, { showParticles: false });
    player.addEffect('minecraft:weaving', 300, { showParticles: false });
}
;
/**
 * * 赤焰灵心 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function scarletFlameHeart(player, item, slot, equippable) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, opal.AlterDurability(item, 1));
    // 为玩家附着状态效果
    player.addEffect('minecraft:fire_resistance', 300, { showParticles: false });
    player.addEffect('minecraft:strength', 300, { amplifier: 2, showParticles: false });
}
;
