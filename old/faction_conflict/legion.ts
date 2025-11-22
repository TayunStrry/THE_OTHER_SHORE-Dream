import * as server from "@minecraft/server";
import { globalState , CombatAttribute} from "./state";
import { Vector, RandomFloor } from "../system/maths";
import { TriggerControl } from "../system/control";
import { parameterDisplay, readGlobalVariables } from "./util"
import { TrySpawnEntity } from "../system/create";
import { memberPlanTable } from "./types";

/**
 * 根据阵营 ID 查找对应的基地实体
 *
 * @param {server.Entity[]} entities 所有实体列表
 *
 * @param {string} legionType 阵营类型（red_legion/blue_legion）
 *
 * @returns {server.Entity | undefined} 基地实体或undefined
 */
export function getLegionBase(entities: server.Entity[], legionType: string): server.Entity | undefined {
    return entities.find(entity => entity.typeId === `${legionType}:legion_base`);
};

/**
 * 当军团基地被攻击时触发的处理函数
 *
 * @param {server.Entity} entity - 被攻击的实体对象
 */
export function legionBaseUnderAttack(entity: server.Entity): void {
    // 触发器控制
    if (!TriggerControl('军团基地被攻击', entity as any, 40)) return;
    /**
     * 获取维度与坐标
     */
    const { dimension, location } = entity;
    /**
     * 获取上方位置
     */
    const above = Vector.copy(location).above(1);
    // 遍历当前维度中的全部实体
    dimension.getEntities().forEach(
        target => {
            // 判断实体是否正确加载
            if (!target || !target.isValid()) return;
            // 移除掉落物
            if (target.typeId == 'minecraft:item') return target.remove();
            /**
             * 获取实体的家族组件
             */
            const familyComponent = target.getComponent('minecraft:type_family');
            // 判断实体是否存在家族组件
            if (!familyComponent) return;
            // 销毁现存的军团成员
            if (target.typeId.split(':')[1] !== 'player' && target.typeId.split(':')[1] !== 'legion_base') return target.remove();
            // 销毁现存的怪物
            if (familyComponent.hasTypeFamily('monster')) return target.remove();
            /**
             * 获取实体血量组件
             */
            const healthComponent = target.getComponent('health');
            // 重置红色军团血量
            if (familyComponent.hasTypeFamily('redLegionBase') && healthComponent) return healthComponent.setCurrentValue(healthComponent.defaultValue);
            // 重置蓝色军团血量
            if (familyComponent.hasTypeFamily('blueLegionBase') && healthComponent) return healthComponent.setCurrentValue(healthComponent.defaultValue);
        }
    );
    // 基于被摧毁的军团类型播放提示
    switch (entity.typeId) {
        case 'red_legion:legion_base':
            dimension.getPlayers().forEach(player => player.onScreenDisplay.setTitle('<§1§o§l 蓝方军团基地 §r> 获胜!!!'));
            break;

        case 'blue_legion:legion_base':
            dimension.getPlayers().forEach(player => player.onScreenDisplay.setTitle('<§4§o§l 红方军团基地 §r> 获胜!!!'));
            break;
    };
    // 播放音效
    dimension.getPlayers().forEach(player => player.playSound('respawn_anchor.deplete'));
    // 播放粒子
    dimension.spawnParticle('constant:fireworks_fireball_rune_blue', above);
    dimension.spawnParticle('constant:erupt_rune_blue', above);
    dimension.spawnParticle('constant:fireworks_fireball_rune_red', above);
    dimension.spawnParticle('constant:erupt_rune_red', above);
    // 复位标识符
    CombatAttribute.shouldTheWarBeTerminated = 0;
};

/**
 * 在遍历计划表时执行的函数
 */
export function tickEvent(): void {
    /**
     * 获取当前世界中的第一个玩家
     */
    let targetPlayer = globalState.players[0];
    // 如果未找到玩家，尝试刷新玩家列表并再次检查
    if (!targetPlayer) {
        // 刷新玩家列表
        globalState.players = server.world.getPlayers();
        // 如果仍然没有玩家，静默退出而不报错
        if (globalState.players.length === 0) return;
        // 使用刷新后的第一个玩家
        targetPlayer = globalState.players[0];
    }
    /**
     * 获取玩家所在维度
     */
    const dimension = targetPlayer.dimension;
    /**
     * 获取维度内所有实体
     */
    const entities = dimension.getEntities();
    /**
     * 获取蓝色军团的基地
     */
    const blueLegionBase = getLegionBase(entities, "blue_legion");
    /**
     * 获取红色军团的基地
     */
    const redLegionBase = getLegionBase(entities, "red_legion");
    // ! 检测军团的基地是否全部存在
    if (!redLegionBase || !blueLegionBase) return console.error("未找到完整的军团基地 -> " + blueLegionBase?.isValid() + " & " + redLegionBase?.isValid());
    // ! 判断是否应该终止战争
    if (CombatAttribute.shouldTheWarBeTerminated == 1) return legionBaseUnderAttack(blueLegionBase);
    /**
     * 读取全局变量
     */
    const results = readGlobalVariables();
    // 显示全局参数
    parameterDisplay(results);
    /**
     * 在遍历计划表时执行
     *
     * @param {memberPlanTable} plan - 计划表实例
     */
    const planEvent = (plan: memberPlanTable) => {
        try {
            /**
             * 基于阵营与序列码映射出实体命名空间标识符
             */
            const mappingEntityTypeID = globalState.memberDirectory[plan.entityIndexValue];
            // 显示实体生成
            //console.log("正在生成 " + mappingEntityTypeID + " 成员");
            const spawnLocation = plan.legionIndexValue == 1 ? blueLegionBase.getHeadLocation() : redLegionBase.getHeadLocation();
            const adjustSpawnLocation = Vector.copy(spawnLocation).random(4);
            adjustSpawnLocation.y = spawnLocation.y - 1;
            /**
             * 尝试生成军团成员实体
             */
            const targetEntity = TrySpawnEntity(dimension as any, mappingEntityTypeID, adjustSpawnLocation);
            // 判断实体是否生成错误
            if (targetEntity instanceof Error) return console.error(targetEntity.message, targetEntity.stack);
            // 为生成的实体赋予名称
            targetEntity.nameTag = `${plan.legionIndexValue == 1 ? '§9' : '§m'}` + plan.entityNameValue;
            // 触发事件
            targetEntity.triggerEvent(plan.legionIndexValue == 1 ? '加载蓝色阵营' : '加载红色阵营');
            // 消耗可用生成数量
            plan.entityAmountValue--
            // 如果生成数量耗尽则不再加入下个周期的生成计划内
            if (plan.entityAmountValue == 0) return;
            // 如果一切正常则将当前计划表延续到下一个周期
            globalState.pendingPlanTable.push(plan);
        }
        catch (error) {
            /**
             * 获取 错误信息
             */
            const info = error instanceof Error ? error : new Error(String(error));
            // 打印错误信息
            console.error(info.message, info.stack);
        }
    };
    // 清空上一周期的缓存
    globalState.pendingPlanTable = [];
    // 遍历计划表
    globalState.planTable.forEach(planEvent);
    // 重新赋值计划表
    globalState.planTable = globalState.pendingPlanTable;
};

/**
 * 更新士兵行为的函数
 */
export async function updateSoldiersBehavior(): Promise<void> {
    /**
     * 获取当前世界中的第一个玩家
     */
    let targetPlayer = globalState.players[0];
    // 如果未找到玩家，尝试刷新玩家列表
    if (!targetPlayer) {
        // 刷新玩家列表
        globalState.players = server.world.getPlayers();
        // 如果仍然没有玩家，静默退出
        if (globalState.players.length === 0) return;
        // 使用刷新后的第一个玩家
        targetPlayer = globalState.players[0];
    }
    // 获取目标玩家所在维度的所有实体
    const soldiers = targetPlayer.dimension.getEntities();
    // 随机打乱数组
    const shuffledSoldiers = soldiers.sort(() => Math.random() - 0.5);
    // 取前40个实体
    const selectedSoldiers = shuffledSoldiers.slice(0, RandomFloor(20, 80));
    // 对选中的实体执行攻击事件
    selectedSoldiers.forEach(attackEvent)
};

/**
 * 实体攻击事件处理函数
 * @param self 执行攻击的实体
 */
export function attackEvent(self: server.Entity): void {
    // 检查实体是否有效
    if (!self || !self.isValid()) return;
    // 获取实体的类型家族组件
    const families = self.getComponent('type_family')?.getTypeFamilies();
    if (!families) return;
    if (families.some(family => family.includes('灰色阵营'))) return;
    if (families.some(family => family.includes('LegionBase'))) return;
    // 获取阵营标签并添加空值检查
    const campTags = families.filter(family => family.includes('阵营')) || [];
    // 添加类型安全检查和默认值
    const attackDamage = Number(self.getProperty('战斗属性:攻击伤害')) || 5;
    const attackDistance = Number(self.getProperty('战斗属性:攻击距离')) || 3;
    const attackInterval = Number(self.getProperty('战斗属性:攻击间隔')) || 40;
    const movementSpeed = Number(self.getProperty('战斗属性:移动速度')) || 15;

    const lastAttackTick = Number(self.getDynamicProperty('legion_soldier:last_attack_tick')) || 0;

    if (campTags.length === 0) return;

    // 排除同阵营和灰色阵营的目标
    const target = self.dimension.getEntities({ excludeFamilies: [...campTags, '灰色阵营'], excludeTypes: ['minecraft:player'], closest: 1, location: self.location })[0];

    if (!target || !target.isValid()) return;

    // 计算方向向量并检查是否为零向量
    const direction = Vector.difference(self.location, target.location);

    const distance = Vector.distance(target.location, self.location);

    if (distance > attackDistance) {
        const rotation = Vector.Vector3ToAngle(direction);
        self.applyImpulse(direction.multiply(movementSpeed / 100));
        self.setRotation(rotation);
    }
    else if (server.system.currentTick - lastAttackTick <= attackInterval) {
        const rotation = Vector.Vector3ToAngle(direction);
        self.applyImpulse(direction.multiply(-movementSpeed / 200).random(0.1));
        self.setRotation(rotation);
        // 可以添加准备攻击的动画或效果
    }
    else {
        // 发动攻击
        self.setDynamicProperty('legion_soldier:last_attack_tick', server.system.currentTick);
        target.applyDamage(attackDamage, { 'damagingEntity': self, 'cause': server.EntityDamageCause.entityAttack });
        // 可以添加攻击动画或效果
    }
}