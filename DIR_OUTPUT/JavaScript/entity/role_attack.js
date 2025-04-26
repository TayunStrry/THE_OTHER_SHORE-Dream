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
 * * 领航者 默认攻击 事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
export function DefaultAttack(self, target, erupt, property) {
    /**
     * * 当前生命值
     */
    const health = self.getComponent('health');
    /**
     * * 合并属性
     */
    const mergeData = opal.MergeProperty(property, { basic_attack: property.basic_attack * 1.5 });
    // 判断实体是否存活
    if (!health)
        return;
    // 判断生命值是否低于 50%
    switch (opal.HealthBelow(health, 0.5)) {
        //* 当前生命值低于 50%
        case true:
            AttackAfter(self, target, erupt, mergeData);
            break;
        //* 当前生命值高于 50%
        default:
            AttackAfter(self, target, erupt, property);
            break;
    }
    ;
}
;
/**
 * * 绯红 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
export function Crimson(self, target, erupt, property) {
    /**
     * * 当前生命值
     */
    const selfHealth = self.getComponent('health');
    /**
     * * 合并属性
     */
    const mergeData = opal.MergeProperty(property, { basic_attack: property.basic_attack * 0.5 });
    // 判断实体是否存活
    if (!selfHealth)
        return;
    // 暴击率增加 20%
    mergeData.raise_erupt_odds += 20;
    // 为 队友 添加 治疗效果
    opal.GetPartner(self, entity => {
        /**
         * * 基础治疗量
         */
        const value = Math.floor(property.erupt_odds * 0.5);
        /**
         * * 当前生命值
         */
        const health = entity.getComponent('health');
        // 恢复生命值
        health?.setCurrentValue(health.currentValue + value);
        // 赋予 伤害吸收 效果
        if (opal.HealthBelow(selfHealth, 0.32))
            entity.addEffect('minecraft:absorption', 640, { amplifier: 9, showParticles: false });
    });
    // 执行 攻击事件 后处理
    AttackAfter(self, target, erupt, mergeData);
}
;
/**
 * * 森涅 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
export function SenNie(self, target, erupt, property) {
    /**
     * * 技能能量值
     */
    const energy = self.getDynamicProperty('power_energy:SenNie') ?? 0;
    /**
     * * 伤害提升值
     */
    const advance = self.getDynamicProperty('power_advance:SenNie') ?? 0;
    /**
     * * 合并属性
     */
    const mergeData = opal.MergeProperty(property, { basic_attack: property.erupt_hurt * 0.35, double_damage: property.erupt_odds / 10 });
    /**
     * * 充能值
     */
    const charge = energy + opal.RandomFloor(1, 5);
    // 显示充能等级
    opal.NumberParticleDisplay(self, charge, opal.Vector.CONSTANT_UP);
    // 获得 攻击提升效果
    property.damage_increase += advance;
    // 普通攻击
    if (energy < 15) {
        self.setDynamicProperty('power_energy:SenNie', charge);
        AttackAfter(self, target, erupt, property);
    }
    // 强化攻击
    else {
        self.setDynamicProperty('power_advance:SenNie', ((property.erupt_hurt * 0.35) * (property.erupt_odds / 10)) * 0.2);
        opal.TrySpawnParticle(self.dimension, 'constant:pulse_rune_green', self.getHeadLocation());
        self.setDynamicProperty('power_energy:SenNie', 0);
        AttackAfter(self, target, erupt, mergeData);
    }
    ;
}
;
/**
 * * 星砂 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
export function StarSand(self, target, erupt, property) {
    /**
     * * 技能能量值
     */
    const energy = self.getDynamicProperty('power_energy:StarSand') ?? 0;
    /**
     * * 合并属性
     */
    const mergeData = opal.MergeProperty(property, { basic_attack: property.basic_attack * 0.5 });
    // 判断是否触发 暴击攻击
    if (erupt) {
        /**
         * * 合并属性 - 暴击后 额外提升
         */
        const mergeDataErupt = opal.MergeProperty(mergeData, { raise_basic_attack: property.erupt_hurt * 0.5, raise_erupt_hurt: energy * 200 });
        // 执行 攻击事件 后处理
        opal.TrySpawnParticle(self.dimension, 'constant:pulse_rune_red', self.getHeadLocation());
        self.setDynamicProperty('power_energy:StarSand', 0);
        AttackAfter(self, target, erupt, mergeDataErupt);
    }
    else {
        if (energy < 5)
            self.setDynamicProperty('power_energy:StarSand', energy + 1);
        target.addEffect('minecraft:slowness', 80, { amplifier: 32, showParticles: false });
        AttackAfter(self, target, erupt, mergeData);
    }
    ;
    // 显示充能等级
    opal.NumberParticleDisplay(self, energy, opal.Vector.CONSTANT_UP);
}
;
/**
 * * 月华 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
export function MoonLight(self, target, erupt, property) {
    /**
     * * 生命值组件
     */
    const health = self.getComponent('health');
    /**
     * * 定义 粒子参数
     */
    const molang = new server.MolangVariableMap();
    // 判断月华是否存活
    if (!health)
        return;
    // 触发 低血量时 的 增幅效果
    if (opal.HealthBelow(health, 0.1))
        opal.AlterProperty(self, { raise_basic_attack: property.erupt_hurt * 0.6 });
    // 触发 提升效果
    opal.AlterProperty(self, { raise_basic_attack: property.erupt_odds * 2 });
    /**
     * * 合并属性
     */
    const mergeData = opal.MergeProperty(opal.GetProperty(self), { basic_attack: property.basic_attack * 0.5 });
    // 创建 元素攻击
    opal.ElementalAttack(self, target, erupt, mergeData);
    // 生命值低于 10% 时 增加 生命值 否则 减少 生命值
    if (opal.HealthBelow(health, 0.1))
        health?.setCurrentValue(health.currentValue + 50);
    else
        health?.setCurrentValue(Math.floor(health.currentValue * 0.85));
    // 创建战斗奖励
    CreateReward(self, target);
    // 设置 粒子参数
    molang.setColorRGB('variable.color', table.getRuneColor(mergeData.self_rune));
    molang.setVector3('variable.direction', opal.Vector.CONSTANT_DOWN);
    molang.setFloat('variable.range', 5);
    molang.setFloat('variable.type', 0);
    // 播放 粒子效果
    opal.TrySpawnParticle(self.dimension, 'scripts:path_spurt', opal.Vector.add(target.location, { x: 0, y: 4, z: 0 }), molang);
    // 获取并治疗队友
    if (opal.IsEnable(10))
        getAndTreatPartner(self, property);
}
;
/**
 * * 琉璃 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
export function Crystal(self, target, erupt, property) {
    /**
     * * 生命值组件
     */
    const health = self.getComponent('health');
    /**
     * * 技能能量值
     */
    const energy = self.getDynamicProperty('power_energy:Crystal') ?? 0;
    /**
     * * 定义 坐标基准点
     */
    const vertex0 = opal.Vector.add(self.location, { x: 8, y: 8, z: 8 });
    /**
     * * 定义 坐标基准点
     */
    const vertex1 = opal.Vector.add(self.location, { x: -8, y: 0, z: -8 });
    if (!health)
        return;
    // 普通攻击
    if (energy < 8) {
        // 暴击时 获得 额外充能
        if (erupt) {
            /**
             * * 充能值
             */
            const charge = energy + opal.Random({ min: 1, max: 8 }, true);
            self.setDynamicProperty('power_energy:Crystal', charge);
            // 显示充能等级
            opal.NumberParticleDisplay(self, charge, opal.Vector.CONSTANT_UP);
        }
        else {
            /**
             * * 充能值
             */
            const charge = energy + 1;
            self.setDynamicProperty('power_energy:Crystal', charge);
            // 显示充能等级
            opal.NumberParticleDisplay(self, charge, opal.Vector.CONSTANT_UP);
        }
        ;
        // 执行 攻击事件 后处理
        AttackAfter(self, target, erupt, property);
    }
    // 强化攻击
    else {
        /**
         * * 强化攻击次数
         */
        const amount = Math.floor(health.currentValue / 10);
        /**
         * * 实体查询选项
         */
        const options = {
            families: ['monster'],
            location: target.location,
            maxDistance: 4,
            closest: 8,
        };
        /**
         * * 契约者标识符
         */
        const contract = self.getDynamicProperty('entity:contract_user');
        /**
         * * 获取实体列表
         */
        const entitys = self.dimension.getEntities(options);
        /**
         * * 合并属性
         */
        const mergeData = opal.MergeProperty(property, { basic_attack: property.erupt_odds * amount * 0.5 });
        /**
         * * 创建 粒子效果
         */
        const animation = () => {
            /**
             * * 随机坐标
             */
            const current = opal.Vector.rangeRandom(vertex0, vertex1);
            /**
             * * 定义 粒子参数
             */
            const molang = new server.MolangVariableMap();
            /**
             * * 获取 坐标差值
             */
            const difference = opal.Vector.difference(current, target.getHeadLocation());
            // 设置 粒子参数
            molang.setColorRGB('variable.color', table.getRuneColor(property.self_rune));
            molang.setVector3('variable.direction', difference);
            molang.setFloat('variable.range', 15);
            molang.setFloat('variable.type', 0);
            // 显示 粒子效果
            opal.TrySpawnParticle(self.dimension, 'constant:the_cracks_of_the_misty_sea', current);
            opal.TrySpawnParticle(self.dimension, 'scripts:path_spurt', current, molang);
        };
        // 执行粒子效果
        for (let index = 0; index < amount; index++)
            animation();
        // 过滤 契约者 与 锁定的目标 并 结算范围伤害
        entitys
            .filter(point => point.id !== contract)
            .filter(point => point.id !== target.id)
            .forEach(entity => opal.ElementalAttack(self, entity, erupt, property), 20);
        // 对目标单独结算一次伤害
        server.system.runTimeout(() => opal.ElementalAttack(self, target, erupt, mergeData), 20);
        // 清空 充能值
        self.setDynamicProperty('power_energy:Crystal', 0);
        // 创建战斗奖励
        CreateReward(self, target);
    }
    ;
}
;
/**
 * * 蔷薇 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
export function Rambler(self, property) {
    /**
     * * 生命值组件
     */
    const health = self.getComponent('health');
    // 判断 自我烧血是否到达极限值
    if (health && opal.HealthHigher(health, 0.2))
        health?.setCurrentValue(Math.floor(health.currentValue * 0.5));
    // 修改属性
    opal.GetPartner(self, entity => {
        /**
         * * 获取属性
         */
        const getData = opal.GetProperty(entity);
        if (getData.double_damage >= 7.5)
            return;
        // 通用增益效果
        opal.AlterProperty(entity, { double_damage: property.erupt_hurt * 0.015, damage_increase: property.basic_attack });
        opal.TrySpawnParticle(entity.dimension, 'constant:smoke_rune_purple', entity.getHeadLocation());
    });
    // 提升战斗经验
    ExperienceSpecialImprove(self);
    // 创建战斗奖励
    CreateReward(self, self.target ?? self);
}
;
/**
 * * 海灵 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
export function HaiLing(self, target, erupt, property) {
    /**
     * * 技能能量值
     */
    const energy = target.getDynamicProperty('power_energy:Ocean') ?? 0;
    // 提供 生命恢复 伤害吸收 效果
    opal.GetPartner(self, entity => {
        /**
         * * 当前生命值
         */
        const health = entity.getComponent('health');
        // 恢复生命值
        health?.setCurrentValue(health.currentValue + Math.floor(property.erupt_odds * 0.5));
        entity.addEffect('minecraft:absorption', 320, { amplifier: energy, showParticles: false });
    });
    // 叠加印记等级
    if (energy < 5)
        target.setDynamicProperty('power_energy:Ocean', energy + 1);
    AttackAfter(self, target, erupt, property);
}
;
/**
 * * 海娜 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
export function HaiNa(self, target, erupt, property) {
    /**
     * * 技能能量值
     */
    const energy = target.getDynamicProperty('power_energy:Ocean') ?? 0;
    /**
     * * 阶段一能量值
     */
    const stage = opal.Clamp({ max: 9, min: 1 }, energy);
    /**
     * * 生命值组件
     */
    const health = self.getComponent('health');
    if (!health)
        return;
    /**
     * * 损伤的血量
     */
    const trauma = (health?.currentValue * 0.1) * stage;
    // 修改当生命值
    health.setCurrentValue(health.currentValue - trauma);
    // 攻击面板增加
    property.raise_erupt_odds += stage * 75;
    property.raise_basic_attack += trauma;
    // 叠加印记等级
    if (energy < 15)
        target.setDynamicProperty('power_energy:Ocean', energy + 1);
    AttackAfter(self, target, erupt, property);
}
;
/**
 * * 幽蓝 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
export function Dullblue(self, target, erupt, property) {
    /**
     * * 过滤器参数
     */
    const options = {
        families: ['monster'],
        location: target.location,
        maxDistance: 8,
        closest: 4
    };
    /**
     * * 契约者标识符
     */
    const contract = self.getDynamicProperty('entity:contract_user');
    /**
     * * 获取实体列表
     */
    const entitys = target.dimension.getEntities(options);
    /**
     * * -1 ~ 1的随机数
     */
    const random = () => opal.Random({ min: -1, max: 1 }, true);
    // 造成的伤害 降低 50%
    property.double_damage *= 0.5;
    // 为队友提供暴击增益
    opal.GetPartner(self, entity => opal.AlterProperty(entity, { raise_erupt_odds: entitys.length * 15 }));
    // 过滤 契约者 与 锁定的目标 并 结算范围伤害
    entitys
        .filter(point => point.id !== contract)
        .filter(point => point.id !== target.id)
        .forEach(entity => {
        try {
            entity.applyKnockback({ x: random(), z: random() }, Math.abs(random() * entitys.length));
        }
        catch {
            opal.TrySpawnParticle(entity.dimension, 'constant:pulse_rune_green', entity.location);
        }
        ;
        opal.ElementalAttack(self, entity, erupt, property);
    });
    // 对目标单独结算一次伤害
    opal.ElementalAttack(self, target, erupt, property);
    // 创建 粒子效果
    opal.TrySpawnParticle(target.dimension, 'constant:impact_rune_green', target.location);
    opal.TrySpawnParticle(target.dimension, 'constant:excite_rune_green', target.location);
    opal.TrySpawnParticle(target.dimension, 'constant:erupt_rune_green', target.location);
    // 创建战斗奖励
    CreateReward(self, target);
}
;
/**
 * * 九九 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
export function NineNine(self, target, erupt, property) {
    /**
     * * 计算随机值
     */
    const random = opal.Random({ max: 2, min: 0 }, true);
    /**
     * * 获取实体头部位置
     */
    const location = self.getHeadLocation();
    /**
     * * 获取实体朝向向量
     */
    const point = self.getViewDirection();
    /**
     * * 锚点偏移坐标组
     */
    const anchors = [
        { above: 1, front: 0, right: 0 },
        { above: 0, front: 0, right: 1 },
        { above: 0, front: 0, right: -1 }
    ];
    /**
     * * 炮击坐标生成函数
     *
     * @param {number} amount - 炮击数量
     *
     * @returns {server.Vector3[]} - 炮击坐标数组
     */
    const PhaseCannon = (amount) => {
        /**
         * * 输出坐标数组
         */
        const output = [];
        // 循环生成炮击坐标
        for (let index = 0; index < amount; index++) {
            // 获取随机属性值
            switch (random) {
                case 0:
                    property.self_rune = "rune_red";
                    output.push(opal.Vector.relativeOffset(location, point, anchors[0]));
                    break;
                case 1:
                    property.self_rune = "rune_blue";
                    output.push(opal.Vector.relativeOffset(location, point, anchors[1]));
                    break;
                default:
                    property.self_rune = "rune_green";
                    output.push(opal.Vector.relativeOffset(location, point, anchors[2]));
                    break;
            }
        }
        return output;
    };
    // 创建 指定次数 的 炮击伤害
    PhaseCannon(erupt ? 3 : 1).forEach((anchor, index) => {
        /**
         * * 计算目标位置
         */
        const targetLocation = opal.Vector.add(target.location, opal.Vector.CONSTANT_UP);
        /**
         * * 容器参数
         */
        const args = {
            locations: [anchor, targetLocation],
            particles: ['constant:smoke_' + property.self_rune],
            on_done: AttackBomb(self, erupt, property),
            dimension: self.dimension,
            cooldown: 1,
            speed: 1
        };
        // 创建 路径容器
        server.system.runTimeout(() => opal.PathExecute.Create('神恩领航者-九九-炮击轨迹', 1, args), (1 + index) * 10);
    });
    // 创建战斗奖励
    CreateReward(self, target);
}
;
/**
 * * 雪隐 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
export function SnowHidden(self, target, erupt, property) {
    /**
     * * 获取目标生命值组件
     */
    const targetHealth = target.getComponent('health');
    if (!targetHealth)
        return;
    /**
     * * 技能阈值
     */
    const threshold = property.erupt_hurt * 2;
    /**
     * * 原始充能值
     */
    const proto = property.erupt_hurt - targetHealth.currentValue;
    /**
     * * 充能钳位值
     */
    const clamp = Math.floor(opal.Clamp({ max: threshold, min: 1 }, proto));
    /**
     * * 技能能量值
     */
    const energy = self.getDynamicProperty('power_energy:SnowHidden') ?? clamp;
    // 释放法术攻击
    AttackAfter(self, target, erupt, property);
    // 检测是否释放充能技能
    if (energy >= threshold) {
        /**
         * * 当前生命值
         */
        const roleHealth = self.getComponent('health');
        // 判断自身是否存活 并 遍历队友队列
        if (roleHealth)
            opal.GetPartner(self, entity => {
                // 赋予 状态效果
                entity.addEffect('minecraft:absorption', (energy - roleHealth?.currentValue) * 20, { amplifier: property.basic_attack * 0.5, showParticles: false });
                entity.addEffect('minecraft:health_boost', (roleHealth?.currentValue) * 20, { amplifier: property.basic_attack * 0.5, showParticles: false });
                // 播放 技能音效
                self.dimension.playSound('conduit.attack', entity.location);
            });
        self.setDynamicProperty('power_energy:SnowHidden', 1);
        return;
    }
    else
        self.setDynamicProperty('power_energy:SnowHidden', opal.Clamp({ max: threshold, min: 1 }, energy + clamp));
    // 显示充能值
    opal.NumberParticleDisplay(self, energy, opal.Vector.CONSTANT_UP);
}
;
/**
 * * 珍珠 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 */
export function Pearl(self, target) {
    /**
     * * 全部动态属性标识符
     */
    const propertyID = self.getDynamicPropertyIds();
    // 判断是否可以生成水母实体
    if (opal.TriggerControl('珍珠:水母治疗', self, 600)) {
        /**
         * * 水母实体
         */
        const jellyfish = opal.TrySpawnEntity(self.dimension, 'starry_map:elves.jellyfish_of_pearl', self.getHeadLocation());
        // 复制动态属性
        if (jellyfish instanceof Error)
            return;
        propertyID.forEach(id => jellyfish.setDynamicProperty(id, self.getDynamicProperty(id)));
        jellyfish.setDynamicProperty('entity:unlock', true);
    }
    else {
        /**
         * * 游鱼实体
         */
        const fish = opal.TrySpawnEntity(self.dimension, 'starry_map:elves.fish_of_pearl', self.getHeadLocation());
        // 检测是否生成游鱼实体
        if (fish instanceof Error)
            return;
        // 复制动态属性
        propertyID.forEach(id => fish.setDynamicProperty(id, self.getDynamicProperty(id)));
        fish.setDynamicProperty('entity:unlock', true);
    }
    ;
    // 重置 自身属性
    opal.SetProperty(self, table.reset_battle_data);
    // 提升战斗经验
    ExperienceSpecialImprove(self);
    // 创建战斗奖励
    CreateReward(self, target);
}
;
/**
 * * 珍珠游鱼 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {boolean} erupt - 是否暴击
 */
export function fishInPearl(self, target, erupt) {
    // 创建 元素攻击
    opal.ElementalAttack(self, target, erupt);
    /**
     * * 获取当前同类计划的数量
     */
    const tickDelay = opal.Control.inventory.filter(item => item.className === self.typeId).length;
    // 在一段时间后移除实体
    server.system.runTimeout(() => { if (self && self.isValid)
        self?.remove(); }, tickDelay);
    // 添加 隐身效果
    self.addEffect('minecraft:invisibility', 200, { showParticles: false });
    // 播放 音效
    server.world.playMusic('mob.slime.small');
}
;
/**
 * * 珍珠水母 攻击事件
 *
 * @param {server.Entity} self - 自身
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
export function jellyfishInPearl(self, target, property) {
    // 释放 法术攻击
    DefaultAttack(self, target, true, property);
    // 获取并治疗 队友
    getAndTreatPartner(self, property);
}
;
/**
 * * 获取并治疗 队友
 *
 * @param {server.Entity} self - 自身
 *
 * @param {type.GET_PROPERTY_PANEL} property - 属性对象
 */
function getAndTreatPartner(self, property) {
    opal.GetPartner(self, entity => {
        /**
         * * 当前生命值
         */
        const health = entity.getComponent('health');
        // 恢复生命值
        health?.setCurrentValue(health.currentValue + Math.floor(property.basic_attack * 0.5));
        // 添加 状态效果
        entity.addEffect('minecraft:health_boost', 320, { amplifier: 9, showParticles: false });
    });
}
;
/**
 * * 攻击事件 后处理
 *
 * @param {server.Entity} self - 自身
 *
 * @param {server.Entity} target - 目标实体对象
 *
 * @param {type.GET_PROPERTY_PANEL} property - 实体属性对象
 */
function AttackAfter(self, target, erupt, property, query) {
    /**
     * * 计算目标位置
     */
    const targetLocation = opal.Vector.add(target.location, opal.Vector.CONSTANT_UP);
    // 创建路径
    opal.PathExecute.Create('神恩领航者-通用攻击射线', 1, {
        locations: [self.getHeadLocation(), targetLocation],
        on_done: AttackBomb(self, erupt, property, query),
        particles: ['constant:track_' + property.self_rune],
        dimension: self.dimension,
        cooldown: 1,
        speed: 1
    });
    // 创建战斗奖励
    CreateReward(self, target);
}
;
/**
 * * 法术攻击 命中后 的 爆炸逻辑
 *
 * @param {server.Entity} self - 发动法术攻击的攻击者
 *
 * @param {erupt} erupt - 本次攻击是否暴击
 *
 * @param {type.GET_PROPERTY_PANEL} property - 攻击时使用的属性面板
 *
 * @param {server.EntityQueryOptions} query - 进行调整的实体查询参数
 *
 */
function AttackBomb(self, erupt, property, query) {
    // 创建 元素攻击
    return (args) => {
        // 验证 实体状态 是否正确
        if (!self || !self.isValid)
            return;
        /**
         * * 过滤器参数
         */
        const options = {
            families: ['monster'],
            location: args.location,
            maxDistance: 4,
            closest: 4,
            ...query ?? {}
        };
        /**
         * * 契约者标识符
         */
        const contract = self.getDynamicProperty('entity:contract_user');
        /**
         * * 领航者瞄准的目标
         */
        const target = self.target;
        /**
         * * 获取实体列表
         */
        let entitys = args.dimension.getEntities(options);
        // 判断 目标 是否存在`
        if (!target || !target.isValid)
            return;
        // 过滤 契约者 与 锁定的目标 并 结算范围伤害
        entitys
            .filter(point => point.id !== contract)
            .filter(point => point.id !== target.id)
            .forEach(entity => opal.ElementalAttack(self, entity, erupt, property));
        // 创建 粒子效果
        opal.TrySpawnParticle(args.dimension, 'constant:excite_' + property.self_rune, args.location);
        // 对目标单独结算一次伤害
        opal.ElementalAttack(self, target, erupt, property);
    };
}
;
/**
 * * 创建 战斗奖励
 *
 * @param {server.Entity} self - 实体对象
 *
 * @param {server.Entity} target - 目标实体对象
 */
function CreateReward(self, target) {
    /**
     * * 获取 战斗经验值
     */
    const experience = self.getDynamicProperty('entity:experience') ?? 0;
    /**
     * * 获取 战术等级
     */
    const improve = self.getDynamicProperty('entity:improve') ?? 1;
    /**
     * * 创建 物品对象
     */
    const item = new server.ItemStack('starry_map:enlightenment');
    // 判断 是否发放 参悟之石
    if (experience / table.experience_improve < improve)
        return;
    if (improve > table.max_experience)
        return;
    // 修改 等级记录
    self.setDynamicProperty('entity:improve', improve + 1);
    opal.TrySpawnItem(self.dimension, item, target.location);
}
;
/**
 * * 特殊经验提升
 *
 * 为指定实体增加战斗经验值
 *
 * @param {server.Entity} self - 要提升经验的实体对象
 */
function ExperienceSpecialImprove(self) {
    /**
     * * 获取 战斗经验值
     */
    const experience = self.getDynamicProperty('entity:experience') ?? 0;
    // 提升战斗经验值
    self.setDynamicProperty('entity:experience', experience + 0.2);
}
;
