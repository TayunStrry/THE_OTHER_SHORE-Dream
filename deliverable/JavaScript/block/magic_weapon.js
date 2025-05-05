/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
/**
 * * 脉冲尖峰炮
 *
 * @param object - 发起事件的方块对象
 */
export function pulsePeakCannon(object) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(object, -1))
        return;
    /**
     * * 设置 范围查询 的 过滤条条件
     */
    const options = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
        excludeFamilies: ['player', 'starry'],
        location: object.location,
        maxDistance: 32,
        closest: 8
    };
    /**
     * * 获取 目标列表
     */
    const targets = object.dimension.getEntities(options).filter(entity => {
        const family = entity.getComponent('type_family');
        if (entity.target?.typeId === "minecraft:player")
            return true;
        if (entity.target?.hasTag('is_Contract'))
            return true;
        if (family?.hasTypeFamily('monster'))
            return true;
    });
    if (targets.length === 0 || !opal.ExpendEnergy(object, -150))
        return;
    /**
     * * 暴击概率
     */
    const erupt = opal.IsEnable(15);
    /**
     * * 获取 炮击范围顶点
     */
    const anchor_0 = object.offset({ x: opal.Random({ min: -2, max: 2 }), y: 8, z: opal.Random({ min: -2, max: 2 }) }) ?? object.center();
    /**
     * * 获取 炮击范围顶点
     */
    const anchor_1 = object.offset({ x: opal.Random({ min: -4, max: 4 }), y: 4, z: opal.Random({ min: -4, max: 4 }) }) ?? object.center();
    /**
     * * 获取 随机炮击顶点
     */
    const focus = opal.Vector.rangeRandom(anchor_0, anchor_1);
    /**
     * * 炮弹爆炸事件
     *
     * @param args - 附加参数
     */
    const powerExplode = (args) => {
        // 验证 实体状态 是否正确
        if (!object || !object.isValid)
            return;
        /**
         * * 过滤器参数
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
            excludeFamilies: ['player', 'starry'],
            location: args.location,
            maxDistance: 4,
            closest: 4
        };
        /**
         * * 获取实体列表
         */
        const entitys = args.dimension.getEntities(options).filter(entity => {
            const family = entity.getComponent('type_family');
            if (entity.target?.typeId === "minecraft:player")
                return true;
            if (entity.target?.hasTag('is_Contract'))
                return true;
            if (family?.hasTypeFamily('monster'))
                return true;
        });
        /**
         * * 创建 炮弹面板
         */
        const bombData = opal.CreateEmptyProperty({
            basic_attack: 15,
            erupt_odds: 45,
            erupt_hurt: 480,
            self_rune: 'rune_purple'
        });
        /**
         * * 获取 玩家
         */
        const player = server.world.getPlayers()[0];
        // 创建 元素伤害
        entitys.forEach(entity => opal.ElementalAttack(player, entity, erupt, bombData));
        opal.TrySpawnParticle(args.dimension, 'constant:fireworks_fireball_rune_purple', args.location);
    };
    // 创建 路径包
    opal.PathExecute.Create('脉冲尖峰炮-炮击轨迹', 1, {
        locations: [object.center(), focus, targets[0].getHeadLocation()],
        particles: ['constant:track_rune_purple'],
        dimension: object.dimension,
        on_done: powerExplode,
        cooldown: 1,
        speed: 1
    });
}
;
