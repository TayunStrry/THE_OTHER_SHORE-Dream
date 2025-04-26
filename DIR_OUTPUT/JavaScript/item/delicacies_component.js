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
 * * 组件前缀代词
 */
const componentPrefix = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components = new Map();
/*
 * 使用后获得状态效果
 */
components.set(componentPrefix + 'use_effect', {
    onConsume(source, data) {
        /**
         * 获取当前使用者
         */
        const { source: entity } = source;
        /**
         * 从数据中获取状态效果参数
         */
        const { effects, min_duration, max_duration, amplifier, health_changes } = data.params;
        /**
         * 获取生物的健康组件
         */
        const health = entity.getComponent('minecraft:health');
        // 遍历状态效果列表
        effects?.forEach(type => entity.addEffect(type, opal.RandomFloor(min_duration || 20, max_duration || 600), { amplifier }));
        // 更新生物的生命值
        health?.setCurrentValue(health.currentValue + (health_changes || 0));
    }
});
/*
 * 蜂火佳肴
 */
components.set(componentPrefix + 'bee_fire_cuisine', {
    onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试从生物中获取健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 如果健康组件不存在则默认为 0
         */
        const healthValue = healthComponent?.currentValue ?? 0;
        /**
         * 获取生物的 伤害提升 属性值
         */
        const damageIncrease = opal.GetProperty(creature).damage_increase;
        /**
         * 从视锥内获取排除特定家族的实体列表
         */
        const targets = creature.getEntitiesFromViewDirection({ 'excludeFamilies': ['player', 'starry'] });
        /**
         * 尝试获取第一个目标实体
         */
        const target = targets[0]?.entity;
        /**
         * 创建 Molang变量映射, 用于定义粒子效果参数
         */
        const molang = new server.MolangVariableMap();
        // 如果 伤害提升 小于等于血量的10倍, 则将伤害加倍, 并设置玩家为烛火元素
        if (damageIncrease <= healthValue * 10)
            opal.AlterProperty(creature, { 'damage_increase': healthValue * 2, 'self_rune': 'rune_red' });
        // 根据符文颜色设置粒子颜色
        molang.setColorRGB('variable.color', table.getRuneColor(opal.GetProperty(creature).self_rune));
        // 将粒子方向设置为垂直向下
        molang.setVector3('variable.direction', opal.Vector.CONSTANT_DOWN);
        // 设置粒子的影响范围
        molang.setFloat('variable.range', 5);
        // 设置粒子类型
        molang.setFloat('variable.type', 0);
        // 为生物赋予防火效果, 持续一定时间
        creature.addEffect('fire_resistance', opal.RandomFloor(20, 600));
        // 将生物设置为着火状态, 持续一定时间
        creature.setOnFire(opal.RandomFloor(20, 600));
        // 更新当前血量
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5); // 如果血量大于5, 则减少到 80%, 否则设为 5
        // 检查目标是否存在且有效
        if (!target || !target.isValid)
            return;
        // 在目标的特定位置播放粒子效果
        opal.TrySpawnParticle(creature.dimension, 'scripts:path_spurt', opal.Vector.add(target.location, { x: 0, y: 4, z: 0 }), molang);
        // 对目标进行元素攻击, 根据生物是否暴击使用不同的攻击方法
        opal.ElementalAttack(creature, target, opal.IsErupt(creature));
    }
});
/*
 * 通用食物效果 - 野蜂
 */
components.set(componentPrefix + 'general_food_effects_wild_bee', {
    onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试获取生物的健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 若无健康组件则默认为 5
         */
        const healthValue = healthComponent?.currentValue || 5;
        /**
         * 基于视线方向获取方块位置偏移
         */
        const blockDeviation = creature.getBlockFromViewDirection()?.block.location;
        /**
         * 目标位置基于生物自身方向计算偏移
         */
        const selfDeviation = opal.Vector.multiply(creature.getViewDirection(), 16).add(creature.location);
        /**
         * 目标位置为最高可站立方块或计算点本身
         */
        const targetLocation = creature.dimension.getTopmostBlock(blockDeviation || selfDeviation)?.center() || selfDeviation;
        // 更新血量：若当前血量大于 5, 则减少至 80%, 否则设为 5
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5);
        // 将生物传送到目标位置
        creature.teleport(targetLocation);
        // 将生物赋予防火效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('fire_resistance', opal.RandomFloor(20, 600));
        // 将生物设置为着火状态, 持续时间为随机值（20-600 秒）
        creature.setOnFire(opal.RandomFloor(20, 600));
        // 在目标位置播放声音效果
        creature.dimension.playSound('respawn_anchor.set_spawn', targetLocation);
    }
});
/*
 * 通用食物效果 - 渊鲸
 */
components.set(componentPrefix + 'general_food_effects_abyssal_whale', {
    async onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试获取生物的健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 若无健康组件则默认为 5
         */
        const healthValue = healthComponent?.currentValue || 5;
        /**
         * 拷贝当前坐标
         */
        const location = opal.Vector.copy(creature.location);
        // 更新血量：若当前血量大于 5, 则减少至 80%, 否则设为 5
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5);
        // 将生物赋予潮涌能量效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('conduit_power', opal.RandomFloor(20, 600));
        // 将生物赋予生命提升效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('health_boost', opal.RandomFloor(20, 600), { 'amplifier': 4 });
        // 熄灭实体身上的火焰
        creature.extinguishFire();
        // 在当前位置范围内寻找空气并替换为水
        opal.TryProcessBlocksInVolume(creature.dimension, location, 4, { 'includeTypes': ['minecraft:air'] }, (block) => block.setType('minecraft:flowing_water'));
        // 等待60个游戏刻
        await server.system.waitTicks(60);
        // 在当前位置范围内寻找水并替换为空气
        opal.TryProcessBlocksInVolume(creature.dimension, location, 8, { 'includeTypes': ['minecraft:flowing_water', 'minecraft:water'] }, (block) => block.setType('minecraft:air'));
    }
});
/*
 * 通用食物效果 - 灵蜥
 */
components.set(componentPrefix + 'general_food_effects_spirit_lizard', {
    async onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试获取生物的健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 若无健康组件则默认为 5
         */
        const healthValue = healthComponent?.currentValue || 5;
        // 更新血量：若当前血量大于 5, 则减少至 80%, 否则设为 5
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5);
        // 将生物赋予跳跃提升效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('jump_boost', opal.RandomFloor(20, 600), { 'amplifier': 4 });
        // 将生物赋予迅捷效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('speed', opal.RandomFloor(20, 600), { 'amplifier': 4 });
        // 等待60个游戏刻
        await server.system.waitTicks(60);
        // 将生物赋予黑暗效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('darkness', opal.RandomFloor(20, 600));
    }
});
/*
 * 通用食物效果 - 蝰蛇
 */
components.set(componentPrefix + 'general_food_effects_viper', {
    async onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试获取生物的健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 若无健康组件则默认为 5
         */
        const healthValue = healthComponent?.currentValue || 5;
        // 更新血量：若当前血量大于 5, 则减少至 80%, 否则设为 5
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5);
        // 将生物赋予抗性提升效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('resistance', opal.RandomFloor(20, 600), { 'amplifier': 4 });
        // 将生物赋予虚弱效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('weakness', opal.RandomFloor(20, 600), { 'amplifier': 4 });
        // 等待60个游戏刻
        await server.system.waitTicks(60);
        // 将生物赋予隐身效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('invisibility', opal.RandomFloor(20, 600));
        // 将生物赋予力量效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('strength', opal.RandomFloor(20, 600));
    }
});
export default components;
