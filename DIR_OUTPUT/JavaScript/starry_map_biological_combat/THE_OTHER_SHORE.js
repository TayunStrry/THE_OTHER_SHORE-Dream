/*
 * 原版接口
 */
import * as server from "@minecraft/server";
import * as serverUI from "@minecraft/server-ui";
/*
 * 数学拓展模块
 */
import { Vector, RandomFloor } from '../system/maths';
/*
 * 触发控制模块
 */
import { TriggerControl } from '../system/control';
/*
 * 实例创建模块
 */
import { TrySpawnEntity } from '../system/create';
import { redCampRecruitmentList, blueCampRecruitmentList } from './data';
/**
 * 组件前缀代
 */
const componentPrefix = 'opal:';
/**
 * 方块自定义组件列表
 */
const blockComponents = new Map();
/**
 * 物品自定义组件列表
 */
const itemComponents = new Map();
// 红色军团修改器
itemComponents.set(componentPrefix + 'red_legion_base_config', {
    'onUse'(arg0) {
        // 如果玩家处于潜行状态，则修改健康值
        if (arg0.source.isSneaking)
            return setRedLegionBaseHealth(arg0.source);
        /**
         * 表单窗口
         */
        const display = new serverUI.ModalFormData().title('军团对战 - 修改器(红色军团)');
        /**
         * 实体类型列表
         */
        const keys = [...redCampRecruitmentList.keys()];
        /**
         * 实体最大数量列表
         */
        const amount = [...redCampRecruitmentList.values()].map(value => value.maxAmount);
        // 添加滑动条
        // @ts-expect-error
        keys.forEach((key, index) => display.slider(key, 1, 100, 1, amount[index]));
        // 显示窗体
        display.show(arg0.source).then(option => {
            // 验证表单是否为关闭状态
            if (option.canceled || option.formValues == undefined)
                return;
            // 遍历表单数据
            option.formValues.forEach((value, index) => {
                /**
                 * 实体招募信息的原始数据
                 */
                const protoState = redCampRecruitmentList.get(keys[index]);
                // 如果数据不存在或数据类型错误，则返回
                if (protoState == undefined || typeof value !== 'number')
                    return;
                // 更新数据
                redCampRecruitmentList.set(keys[index], { ...protoState, maxAmount: value });
            });
        });
    }
});
function setRedLegionBaseHealth(player) {
    /**
     * 获取军团基地的实体数组
     */
    const legionBases = player.dimension.getEntities({ type: 'red_legion:legion_base' });
    // 如果不存在则返回
    if (legionBases.length === 0)
        return;
    /**
     * 表单窗口
     */
    const form = new serverUI.ModalFormData().title('军团对战 - 修改器(红色军团)');
    /**
     * 军团基地的健康值组件数组
     */
    const healthComponents = [];
    /**
     * 军团基地的实体数组
     */
    const baseEntities = [];
    // 遍历军团基地
    legionBases.forEach((entity, index) => {
        /**
         * 获取军团基地的健康值组件
         */
        const healthComponent = entity.getComponent('minecraft:health');
        // 如果不存在则返回
        if (!healthComponent)
            return;
        // 添加滑动条
        // @ts-expect-error
        form.slider(`${index}# 基地生命值 : ${index}`, 0, healthComponent?.defaultValue, 1, healthComponent?.currentValue);
        // 添加健康值组件
        healthComponents.push(healthComponent);
        // 添加军团基地
        baseEntities.push(entity);
    });
    // 显示窗体
    form.show(player).then(option => {
        // 验证表单是否为关闭状态
        if (option.canceled || !option.formValues)
            return;
        // 遍历表单数据
        option.formValues.forEach(async (value, index) => {
            // 如果数据不存在或数据类型错误，则返回
            if (typeof value !== 'number')
                return;
            // 设置健康值组件的值
            if (value !== 0) {
                healthComponents[index].setCurrentValue(value);
            }
            else
                for (let index = 0; index < healthComponents[index].currentValue; index++) {
                    // 造成伤害
                    baseEntities[index].applyDamage(1, { 'damagingEntity': player, 'cause': server.EntityDamageCause.entityAttack });
                    // 等待
                    await server.system.waitTicks(5);
                }
            ;
        });
    });
}
// 蓝色军团修改器
itemComponents.set(componentPrefix + 'blue_legion_base_config', {
    'onUse'(arg0) {
        // 如果玩家处于潜行状态，则修改健康值
        if (arg0.source.isSneaking)
            return setBlueLegionBaseHealth(arg0.source);
        /**
         * 表单窗口
         */
        const display = new serverUI.ModalFormData().title('军团对战 - 修改器(蓝色军团)');
        /**
         * 实体类型列表
         */
        const keys = [...blueCampRecruitmentList.keys()];
        /**
         * 实体最大数量列表
         */
        const amount = [...blueCampRecruitmentList.values()].map(value => value.maxAmount);
        // 添加滑动条
        // @ts-expect-error
        keys.forEach((key, index) => display.slider(key, 1, 100, 1, amount[index]));
        // 显示窗体
        display.show(arg0.source).then(option => {
            // 验证表单是否为关闭状态
            if (option.canceled || option.formValues == undefined)
                return;
            // 遍历表单数据
            option.formValues.forEach((value, index) => {
                /**
                 * 实体招募信息的原始数据
                 */
                const protoState = blueCampRecruitmentList.get(keys[index]);
                // 如果数据不存在或数据类型错误，则返回
                if (protoState == undefined || typeof value !== 'number')
                    return;
                // 更新数据
                blueCampRecruitmentList.set(keys[index], { ...protoState, maxAmount: value });
            });
        });
    }
});
/**
 * 设置蓝色军团基地健康值
 */
function setBlueLegionBaseHealth(player) {
    /**
     * 获取军团基地的实体数组
     */
    const legionBases = player.dimension.getEntities({ type: 'blue_legion:legion_base' });
    // 如果不存在则返回
    if (legionBases.length === 0)
        return;
    /**
     * 表单窗口
     */
    const form = new serverUI.ModalFormData().title('军团对战 - 修改器(蓝色军团)');
    /**
     * 军团基地的健康值组件数组
     */
    const healthComponents = [];
    /**
     * 军团基地的实体数组
     */
    const baseEntities = [];
    // 遍历军团基地
    legionBases.forEach((entity, index) => {
        /**
         * 获取军团基地的健康值组件
         */
        const healthComponent = entity.getComponent('minecraft:health');
        // 如果不存在则返回
        if (!healthComponent)
            return;
        // 添加滑动条
        // @ts-expect-error
        form.slider(`${index}# 基地生命值 : ${index}`, 0, healthComponent.defaultValue, 1, healthComponent.currentValue);
        // 添加健康值组件
        healthComponents.push(healthComponent);
        // 添加军团基地
        baseEntities.push(entity);
    });
    // 显示窗体
    form.show(player).then(option => {
        // 验证表单是否为关闭状态
        if (option.canceled || !option.formValues)
            return;
        // 遍历表单数据
        option.formValues.forEach(async (value, index) => {
            // 如果数据不存在或数据类型错误，则返回
            if (typeof value !== 'number')
                return;
            // 设置健康值组件的值
            if (value !== 0) {
                healthComponents[index].setCurrentValue(value);
            }
            else {
                // 设置健康值组件的值为 1
                healthComponents[index].setCurrentValue(1);
                // 等待
                await server.system.waitTicks(5);
                // 造成伤害
                baseEntities[index].applyDamage(1, { 'damagingEntity': player, 'cause': server.EntityDamageCause.entityAttack });
            }
            ;
        });
    });
}
/*
 * < 世界 > 初始化前 事件
 */
// @ts-expect-error
server.world.beforeEvents.worldInitialize.subscribe(data => {
    /**
     * 方块自定义组件实例数组
     */
    const blockCustoms = [...blockComponents.values()];
    /**
     * 方块自定义组件名称数组
     */
    const blockNames = [...blockComponents.keys()];
    /**
     * 物品自定义组件实例数组
     */
    const itemCustoms = [...itemComponents.values()];
    /**
     * 物品自定义组件名称数组
     */
    const itemNames = [...itemComponents.keys()];
    // === 方块自定义组件注册 ===
    for (let blockIndex = 0; blockIndex < blockCustoms.length; blockIndex++)
        data.blockComponentRegistry.registerCustomComponent(blockNames[blockIndex], blockCustoms[blockIndex]);
    // === 物品自定义组件注册 ===
    for (let itemIndex = 0; itemIndex < itemCustoms.length; itemIndex++)
        data.itemComponentRegistry.registerCustomComponent(itemNames[itemIndex], itemCustoms[itemIndex]);
});
// 实体事件: 用于控制生成点招募队员的行为
server.world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
    const { entity, eventId } = event;
    switch (eventId) {
        case 'entity_event:red_legion_recruits_members':
            redLegionRecruitsMembers(entity);
            break;
        case 'entity_event:blue_legion_recruits_members':
            blueLegionRecruitsMembers(entity);
            break;
        case 'entity_event:legion_base_under_attack':
            legionBaseUnderAttack(entity);
            break;
        default: break;
    }
});
function redLegionRecruitsMembers(entity) {
    /**
     * 获取维度与坐标
     */
    const { dimension, location } = entity;
    /**
     * 获取上方位置
     */
    const above = Vector.copy(location).above(1).random(1);
    /**
     * 过滤掉无效的招募信息
     */
    const listFiltering = [...redCampRecruitmentList].filter(info => info[1].maxAmount >= 0);
    /**
     * 获取随机的招募信息键值对
     */
    const [key, state] = listFiltering[RandomFloor(0, listFiltering.length - 1)];
    /**
     * 获取实体数量
     */
    const amount = dimension.getEntities({ type: state.type }).length;
    // 判断数量 如果小于最大值 则生成实体
    if (amount < state.maxAmount) {
        // 修改招募信息
        redCampRecruitmentList.set(key, { ...state, maxAmount: state.maxAmount - 1 });
        /**
         * 尝试生成实体
         */
        const target = TrySpawnEntity(dimension, state.type, above);
        // 设置实体名称
        if (target instanceof server.Entity)
            target.nameTag = "§4§o§l<| 红色军团 |>§r";
    }
}
;
function blueLegionRecruitsMembers(entity) {
    /**
     * 获取维度与坐标
     */
    const { dimension, location } = entity;
    /**
     * 获取上方位置
     */
    const above = Vector.copy(location).above(1).random(1);
    /**
     * 过滤掉无效的招募信息
     */
    const listFiltering = [...blueCampRecruitmentList].filter(info => info[1].maxAmount >= 0);
    /**
     * 获取随机的招募信息键值对
     */
    const [key, state] = listFiltering[RandomFloor(0, listFiltering.length - 1)];
    /**
     * 获取实体数量
     */
    const amount = dimension.getEntities({ type: state.type }).length;
    // 判断数量 如果小于最大值 则生成实体
    if (amount < state.maxAmount) {
        // 修改招募信息
        blueCampRecruitmentList.set(key, { ...state, maxAmount: state.maxAmount - 1 });
        /**
         * 尝试生成实体
         */
        const target = TrySpawnEntity(dimension, state.type, above);
        // 设置实体名称
        if (target instanceof server.Entity)
            target.nameTag = "§9§o§l<| 蓝色军团 |>§r";
    }
}
;
function legionBaseUnderAttack(entity) {
    // 触发器控制
    if (!TriggerControl('军团基地被攻击', entity, 40))
        return;
    /**
     * 获取维度与坐标
     */
    const { dimension, location } = entity;
    /**
     * 获取上方位置
     */
    const above = Vector.copy(location).above(1);
    // 根据类型显示不同的信息
    switch (entity.typeId) {
        case 'red_legion:legion_base':
            dimension.getPlayers().forEach(player => player.onScreenDisplay.setActionBar('<§4§o§l 红方军团基地 §r> 正在被攻击!!'));
            // 播放音效
            dimension.spawnParticle('constant:fireworks_fireball_rune_red', above);
            dimension.spawnParticle('constant:erupt_rune_red', above);
            // 播放音效
            dimension.getPlayers().forEach(player => player.playSound('mob.zombie.wood'));
            break;
        case 'blue_legion:legion_base':
            dimension.getPlayers().forEach(player => player.onScreenDisplay.setActionBar('<§1§o§l 蓝方军团基地 §r> 正在被攻击!!'));
            // 播放音效
            dimension.spawnParticle('constant:fireworks_fireball_rune_blue', above);
            dimension.spawnParticle('constant:erupt_rune_blue', above);
            // 播放音效
            dimension.getPlayers().forEach(player => player.playSound('mob.zombie.wood'));
            break;
        default: break;
    }
}
;
// 实体死亡: 用于控制生成点被破坏时的行为
server.world.afterEvents.entityDie.subscribe(data => {
    /**
     * 获取死亡的实体
     */
    const { deadEntity, damageSource } = data;
    /**
     * 本次事件有效的实体类型
     */
    const validName = new Set(['red_legion:legion_base', 'blue_legion:legion_base']);
    /**
     * 本次事件有效的军团类型
     */
    const validLegion = new Set(['blue_legion', 'red_legion']);
    /**
     * 获取维度
     */
    const dimension = damageSource.damagingEntity?.dimension;
    /**
     * 获取上方位置
     */
    const above = Vector.copy(damageSource.damagingEntity?.location || Vector.CONSTANT_ONE).above(1);
    // 验证实体是否有效
    if (!validName.has(deadEntity.typeId) || !dimension)
        return;
    // 消耗现存的军团
    dimension.getEntities().filter(entity => validLegion.has(entity.typeId.split(':')[0]) || entity.typeId == 'minecraft:item').forEach(entity => entity.remove());
    // 基于被摧毁的军团类型播放提示
    switch (deadEntity.typeId) {
        case 'red_legion:legion_base':
            dimension.getPlayers().forEach(player => player.onScreenDisplay.setTitle('<§4§o§l 红方军团基地 §r> 被摧毁!! 对战模拟结束!!'));
            break;
        case 'blue_legion:legion_base':
            dimension.getPlayers().forEach(player => player.onScreenDisplay.setTitle('<§1§o§l 蓝方军团基地 §r> 被摧毁!! 对战模拟结束!!'));
            break;
    }
    ;
    // 播放音效
    dimension.getPlayers().forEach(player => player.playSound('mob.zombie.woodbreak'));
    // 播放粒子
    dimension.spawnParticle('constant:fireworks_fireball_rune_blue', above);
    dimension.spawnParticle('constant:erupt_rune_blue', above);
    dimension.spawnParticle('constant:fireworks_fireball_rune_red', above);
    dimension.spawnParticle('constant:erupt_rune_red', above);
});
