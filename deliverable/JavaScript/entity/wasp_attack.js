/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
/**
 * * 野蜂 - 侦查者
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标
 */
export function Detection(self, target) {
    /**
     * * 实体查询选项
     */
    const options = {
        location: self.location,
        families: ['wasp'],
        maxDistance: 32
    };
    /**
     * * 获取实体列表
     */
    const entitys = self.dimension.getEntities(options);
    /**
     * * 计算目标位置
     */
    const targetLocation = opal.Vector.add(target.location, opal.Vector.CONSTANT_UP);
    // 提供增幅
    entitys.forEach(entity => opal.AlterProperty(entity, { raise_erupt_odds: 10 }));
    // 创建 路径
    opal.PathExecute.Create('野蜂侦查者-炮击轨迹', 1, {
        locations: [self.getHeadLocation(), targetLocation],
        particles: ['constant:track_' + opal.GetProperty(self).self_rune],
        dimension: self.dimension,
        on_done: CreateWaspPowerExplode(self, target),
        cooldown: 1,
        speed: 1,
    });
}
;
/**
 * * 野蜂 - 维系者
 *
 * @param {server.Entity} self - 自身
 */
export function Support(self) {
    /**
     * * 实体查询选项
     */
    const options = {
        location: self.location,
        families: ['wasp'],
        maxDistance: 64
    };
    /**
     * * 获取实体列表
     */
    const entitys = self.dimension.getEntities(options);
    // 判断实体是否存在
    if (entitys.length == 0)
        return;
    // 野蜂机群恢复生命值
    entitys.forEach(entity => {
        /**
         * * 当前生命值
         */
        const health = entity.getComponent('health');
        health?.setCurrentValue(health.currentValue + opal.RandomFloor(10, 50));
    });
}
;
/**
 * 君临者野蜂的特殊攻击行为
 * 该函数定义了君临者野蜂的攻击方式, 包括增加属性增幅, 创建攻击路径, 并管理充能值
 *
 * @param {server.Entity} self - 代表君临者野蜂自身的实体对象
 *
 * @param {server.Entity} target - 代表被攻击目标的实体对象
 */
export function Emperor(self, target) {
    /**
     * 获取君临者野蜂的当前充能值
     * 如果没有设置充能值, 则默认为0
     */
    const energy = self.getDynamicProperty('wasp_emperor:energy') ?? 0;
    /**
     * * 计算目标位置
     */
    const targetLocation = opal.Vector.add(target.location, opal.Vector.CONSTANT_UP);
    // 增加属性增幅, 提高暴击率和暴击伤害
    opal.AlterProperty(self, { raise_erupt_odds: 50, raise_erupt_hurt: 150 });
    // 创建攻击路径, 包括轨迹效果和粒子展示
    opal.PathExecute.Create('野蜂君临者-炮击轨迹', 1, {
        locations: [self.getHeadLocation(), targetLocation], // 起始和目标位置
        particles: ['constant:track_rune_red'], // 轨迹粒子效果
        dimension: self.dimension, // 攻击发生的维度
        on_done: CreateWaspPowerExplode(self, target), // 轨迹完成后的回调函数
        cooldown: 1, // 冷却时间
        speed: 1, // 轨迹速度
    });
    // 更新君临者野蜂的充能值
    self.setDynamicProperty('wasp_emperor:energy', energy + 1);
}
;
/**
 * * 野蜂 - 领航者
 *
 * @param {server.Entity} self - 自身
 */
export function Guide(self) {
    /**
     * * 过滤器参数
     */
    const options = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb", self.typeId],
        excludeFamilies: ['abyss'],
        location: self.location,
        maxDistance: 64
    };
    /**
     * * 获取实体列表
     */
    const entitys = self.dimension.getEntities(options);
    /**
     * * 获取 当前生命值
     */
    const health = self.getComponent('health')?.currentValue ?? 10;
    /**
     * * 获取 状态数据
     */
    const state = opal.MergeProperty(opal.GetProperty(self), { raise_basic_attack: health });
    // 创建 元素伤害
    entitys.forEach(entity => {
        /**
         * * 是否暴击
         */
        const erupt = opal.IsErupt(self);
        opal.ElementalAttack(self, entity, erupt, state);
        opal.TrySpawnParticle(self.dimension, 'constant:erupt_rune_red', self.location);
    });
    // 创建 粒子效果
    opal.TrySpawnParticle(self.dimension, 'constant:fireworks_fireball_rune_red', self.getHeadLocation());
    opal.TrySpawnParticle(self.dimension, 'constant:fireworks_paper_rune_red', self.getHeadLocation());
    self.dimension.playSound('random.explode', self.location);
    server.system.runTimeout(() => self?.remove(), 5);
}
;
/**
 * 创建野蜂力量爆炸效果的函数
 * 该函数会在野蜂攻击命中目标时触发, 造成范围内的元素伤害, 并显示粒子效果
 *
 * @param {server.Entity} self - 野蜂实体自身
 *
 * @param {server.Entity} target - 野蜂攻击的目标实体
 *
 * @returns {(data: type.ROUTE_ANNEX_ARGS) => void} 返回一个处理爆炸事件的函数, 该函数接受一个ROUTE_ANNEX_ARGS参数
 */
function CreateWaspPowerExplode(self, target) {
    // 野蜂攻击命中的爆炸事件处理函数
    return (args) => {
        // 检查实体self和target是否有效, 如果无效则直接返回
        if (!self || !target || !self.isValid || !target.isValid)
            return;
        /**
         * 定义实体查询的过滤器参数
         */
        const options = {
            // 排除特定类型的实体, 如掉落物, 经验球和自身类型
            excludeTypes: ["minecraft:item", "minecraft:xp_orb", self.typeId],
            // 排除来自深渊家族的实体
            excludeFamilies: ['abyss'],
            // 设置查询位置
            location: args.location,
            // 设置最大查询距离
            maxDistance: 4,
            // 设置最多查询到的实体数量
            closest: 4
        };
        /**
         * 根据过滤器参数获取周围的实体列表
         */
        const entitys = args.dimension.getEntities(options);
        // 遍历实体列表, 对每个实体造成元素伤害
        entitys.forEach(entity => {
            /**
             * 判断本次攻击是否触发暴击
             */
            const erupt = opal.IsErupt(self);
            // 根据暴击情况创建符文力量攻击效果
            opal.ElementalAttack(self, entity, erupt);
        });
        // 在攻击命中的位置创建红色符文烟雾粒子效果
        opal.TrySpawnParticle(args.dimension, 'constant:smoke_rune_red', args.location);
    };
}
;
