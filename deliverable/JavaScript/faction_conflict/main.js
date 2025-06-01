import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
import { TrySpawnEntity } from "../system/create";
import { translate } from "../system/translate";
import { TriggerControl } from "../system/control";
import { Vector } from "../system/maths";
;
/**
 * 判断战争是否应该结束
 */
let shouldTheWarBeTerminated = 0;
/**
 *  公开的实体生成数量
 */
let publicEntityGenerationQuantity = 0;
/**
 * 公开的实体生成序列号
 */
let publicEntitySequenceNumber = 0;
/**
 * 公开的实体阵营序列号
 */
let publicEntityFactionNumber = 0;
/**
 *  公开的实体生成名称
 */
let publicEntityGeneratedName = "士兵";
/**
 *  实体生成计划表
 */
let planTable = [];
/**
 * 等待在下一周期中新增的计划表
 */
let pendingPlanTable = [];
/**
 *  蓝色军团成员目录
 */
let blueLegionMemberDirectory = [];
/**
 *  红色军团成员目录
 */
let redLegionMemberDirectory = [];
// TODO : 确保军团基地生成点的唯一性
server.world.afterEvents.entitySpawn.subscribe(data => {
    /**
     * 获取诞生的实体
     */
    const { entity } = data;
    // 验证实体是否有效
    if (!entity || !entity.isValid())
        return;
    /**
     * 获取维度,坐标与命名空间标识符
     */
    const { dimension, location, typeId } = entity;
    /**
     * 定义军团基地类型及其对应的家族标签
     */
    const legionBaseConfig = {
        'red_legion:legion_base': 'redLegionBase',
        'blue_legion:legion_base': 'blueLegionBase'
    };
    // 检查是否是军团基地类型
    if (legionBaseConfig.hasOwnProperty(typeId)) {
        /**
         * 获取军团基地对应的家族标签
         */
        const familyTag = legionBaseConfig[typeId];
        // 获取军团基地的实体数组 并剔除已经存在的其他军团基地
        dimension.getEntities({ families: [familyTag], location, maxDistance: 256 }).filter(newEntity => newEntity.id !== entity.id).forEach(entity => entity.remove());
    }
});
// TODO : 当世界初始化时注册与刷新军团成员目录并构建周期性执行
server.world.afterEvents.worldInitialize.subscribe(async (data) => {
    // 输出等待初始化的信息
    server.world.sendMessage('[世界初始化] : 正在初始化军团成员目录...');
    // 延迟 100 tick 执行后续初始化流程
    await server.system.waitTicks(100);
    // TODO : 初始化军团成员列表
    /**
     * 获取所有实体类型的赋予命名空间标识符
     */
    const entityTypes = server.EntityTypes.getAll().map(type => type.id).filter(id => id !== 'red_legion:legion_base' && id !== 'blue_legion:legion_base');
    // 遍历所有实体类型 并添加至对应的成员目录中
    entityTypes.forEach(type => {
        /**
         *  获取命名空间标识符
         */
        const namespace = type.split(':')[0];
        //  添加至对应的成员目录中
        switch (namespace) {
            case 'blue_legion':
                blueLegionMemberDirectory.push(type);
                break;
            case 'red_legion':
                redLegionMemberDirectory.push(type);
                break;
            default: break;
        }
    });
    // TODO : 周期性遍历并执行计划表
    server.system.runInterval(tickEvent, 10);
    // 输出初始化完毕的提示信息
    server.world.sendMessage('[世界初始化] : 初始化已完成, 点击< 木质按钮 >即可开启设置面板');
});
// TODO : 监听木质按钮的点击事件
server.world.afterEvents.buttonPush.subscribe(event => {
    // 获取玩家对象
    const { source: player } = event;
    // 判断点击按钮的是否是玩家
    if (player instanceof server.Player)
        selectLegionInServerUI(player);
});
// TODO : 监听实体触发器事件
server.world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
    const { entity, eventId } = event;
    switch (eventId) {
        case 'entity_event:legion_base_under_attack':
            legionBaseUnderAttack(entity);
            break;
        default: break;
    }
});
/**
 * 在遍历计划表时执行的函数
 */
function tickEvent() {
    /**
     * 获取当前世界中的第一个玩家
     */
    const targetPlayer = server.world.getPlayers()[0];
    // ! 如果未找到玩家，则退出函数
    if (!targetPlayer)
        return console.error("未找到玩家");
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
    if (!redLegionBase || !blueLegionBase)
        return console.error("未找到完整的军团基地 -> " + blueLegionBase?.isValid() + " -> " + redLegionBase?.isValid());
    // ! 判断是否应该终止战争
    if (shouldTheWarBeTerminated == 1)
        return legionBaseUnderAttack(blueLegionBase);
    /**
     * 在遍历计划表时执行
     *
     * @param {memberPlanTable} plan - 计划表实例
     */
    const planEvent = (plan) => {
        // TODO : 如果是从外部传入的计划表, 则立刻存入下个周期的计划表数组
        if (publicEntityFactionNumber < 0) {
            // 导入新的实体生成计划表
            pendingPlanTable.push({
                entityGenerationQuantity: Math.max(publicEntityGenerationQuantity, 1),
                entitySequenceNumber: publicEntitySequenceNumber,
                entityFactionNumber: Math.abs(publicEntityFactionNumber),
                entityGeneratedName: publicEntityGeneratedName
            });
        }
        // TODO : 公示即将执行的计划表数据
        publicEntityGenerationQuantity = plan.entityGenerationQuantity;
        publicEntitySequenceNumber = plan.entitySequenceNumber;
        publicEntityFactionNumber = plan.entityFactionNumber;
        publicEntityGeneratedName = plan.entityGeneratedName;
        server.world.getAllPlayers().forEach(player => player.onScreenDisplay.setActionBar({
            rawtext: [
                { text: ' 生成数量: ' + publicEntityGenerationQuantity },
                { text: ' 生成序列: ' + publicEntitySequenceNumber },
                { text: ' 阵营序列: ' + publicEntityFactionNumber },
                { text: ' 生成名称: ' + publicEntityGeneratedName },
            ]
        }));
        // TODO : 执行当前计划表中内容
        try {
            /**
             * 基于阵营与序列码映射出实体命名空间标识符
             */
            const mappingEntityTypeID = publicEntityFactionNumber == 1 ? blueLegionMemberDirectory[publicEntitySequenceNumber] : redLegionMemberDirectory[publicEntitySequenceNumber];
            /**
             * 尝试生成军团成员实体
             */
            const targetEntity = TrySpawnEntity(dimension, mappingEntityTypeID, publicEntityFactionNumber == 1 ? blueLegionBase.location : redLegionBase.location);
            // 判断实体是否生成错误
            if (targetEntity instanceof Error)
                return console.error(targetEntity.message);
            // 为生成的实体赋予名称
            targetEntity.nameTag = `${publicEntityFactionNumber == 1 ? '§9蓝' : '§m红'}军团成员: ` + plan.entityGeneratedName;
            // 消耗可用生成数量
            plan.entityGenerationQuantity--;
            // 如果生成数量耗尽则不再加入下个周期的生成计划内
            if (plan.entityGenerationQuantity == 0)
                return;
            // 如果一切正常则将当前计划表延续到下一个周期
            pendingPlanTable.push(plan);
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
    pendingPlanTable = [];
    // 遍历计划表
    planTable.forEach(planEvent);
    // 重新赋值计划表
    planTable = pendingPlanTable;
}
;
/**
 * 使用服务器表单选择阵营
 *
 * @param {server.Player} player - 玩家
 */
function selectLegionInServerUI(player) {
    /**
     * 新建一个 Action 表单窗口
     */
    const window = new serverUI.ActionFormData()
        .title("§9§l<§u 军团阵营 §9>§r§3选择界面§r")
        .button("<§s§o§l 蓝方军团基地 §r>", "textures/blue_legion_base")
        .button("<§4§o§l 红方军团基地 §r>", "textures/red_legion_base")
        .button("<[§c§o§l 终止战斗模拟 §r]>");
    // 显示表单窗口
    window.show(player).then(response => {
        // 如果玩家取消了窗口界面, 则不执行后续代码
        if (response.canceled || response.selection == undefined)
            return;
        //  获取玩家选择的按钮索引 并判断是否为终止战斗模拟按钮
        if (response.selection == 2)
            return shouldTheWarBeTerminated = 1;
        /**
         * 获取玩家选择的阵营索引
         */
        const legionIndexValue = response.selection + 1;
        // 跳转至显示选择阵营内实体的界面
        selectEntityInServerUI(player, legionIndexValue);
    });
}
;
/**
 * 使用服务器表单显示当前阵容内实体
 *
 * @param {server.Player} player - 玩家
 *
 * @param {number} legionIndexValue - 阵营索引值
 */
function selectEntityInServerUI(player, legionIndexValue) {
    /**
     * 新建一个 Action 表单窗口
     */
    const window = new serverUI.ActionFormData();
    // 根据阵营索引注入实体类型选项
    if (legionIndexValue == 1)
        blueLegionMemberDirectory.forEach(type => window.button(translate(type, 'entity'), 'textures/blue_legion_base_config'));
    if (legionIndexValue == 2)
        redLegionMemberDirectory.forEach(type => window.button(translate(type, 'entity'), 'textures/red_legion_base_config'));
    // 显示表单窗口
    window.show(player).then(response => {
        // 如果玩家取消了窗口界面, 则不执行后续代码
        if (response.canceled || response.selection == undefined)
            return;
        /**
         * 获取玩家选择的实体索引
         */
        const entityIndexValue = response.selection;
        // 跳转至显示实体详细信息的界面
        writeEntityNameInServerUI(player, legionIndexValue, entityIndexValue);
    });
}
;
/**
 * 使用服务器表单设置实体名称
 *
 * @param {server.Player} player - 玩家
 *
 * @param {number} legionIndexValue - 阵营索引值
 *
 * @param {number} entityIndexValue - 实体索引值
 */
function writeEntityNameInServerUI(player, legionIndexValue, entityIndexValue) {
    /**
     * 新建一个 Modal 表单窗口
     */
    const window = new serverUI.ModalFormData()
        .slider('可用的实体生成数量', 1, 64, 1, 8)
        .textField('请输入实体名称', '请输入你所期望显示的实体名称');
    // 显示表单窗口
    window.show(player).then(response => {
        // 验证表单关闭状态 或 窗口界面数据是否为空
        if (response.canceled || response.formValues === undefined)
            return;
        /**
         * 获取实体生成数量
         */
        const entityAmountValue = response.formValues[0];
        /**
         * 获取实体名称
         */
        const entityNameValue = response.formValues[1];
        // 创建 实体 生成计划
        pendingPlanTable.push({
            'entityFactionNumber': legionIndexValue,
            'entityGeneratedName': entityNameValue,
            'entityGenerationQuantity': entityAmountValue,
            'entitySequenceNumber': entityIndexValue
        });
    });
}
;
/**
 * 根据阵营ID查找对应的基地实体
 *
 * @param {server.Entity[]} entities 所有实体列表
 *
 * @param {string} legionType 阵营类型（red_legion/blue_legion）
 *
 * @returns {server.Entity | undefined} 基地实体或undefined
 */
function getLegionBase(entities, legionType) {
    return entities.find(entity => entity.typeId.startsWith(`${legionType}:`) && entity.typeId === `${legionType}:legion_base`);
}
;
/**
 * 当军团基地被攻击时触发的处理函数
 *
 * @param {server.Entity} entity - 被攻击的实体对象
 */
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
    // 遍历当前维度中的全部实体
    dimension.getEntities().forEach(target => {
        // 判断实体是否正确加载
        if (!target || !target.isValid())
            return;
        // 移除掉落物
        if (target.typeId == 'minecraft:item')
            return target.remove();
        /**
         * 获取实体的家族组件
         */
        const familyComponent = target.getComponent('minecraft:type_family');
        // 判断实体是否存在家族组件
        if (!familyComponent)
            return;
        // 销毁现存的红色军团成员
        if (familyComponent.hasTypeFamily('redCamp') && !familyComponent.hasTypeFamily('redLegionBase'))
            return target.remove();
        // 销毁现存的蓝色军团成员
        if (familyComponent.hasTypeFamily('blueCamp') && !familyComponent.hasTypeFamily('blueLegionBase'))
            return target.remove();
        // 销毁现存的怪物
        if (familyComponent.hasTypeFamily('monster'))
            return target.remove();
        /**
         * 获取实体血量组件
         */
        const healthComponent = target.getComponent('health');
        // 重置红色军团血量
        if (familyComponent.hasTypeFamily('redLegionBase') && healthComponent)
            return healthComponent.setCurrentValue(healthComponent.defaultValue);
        // 重置蓝色军团血量
        if (familyComponent.hasTypeFamily('blueLegionBase') && healthComponent)
            return healthComponent.setCurrentValue(healthComponent.defaultValue);
    });
    // 基于被摧毁的军团类型播放提示
    switch (entity.typeId) {
        case 'red_legion:legion_base':
            dimension.getPlayers().forEach(player => player.onScreenDisplay.setTitle('<§1§o§l 蓝方军团基地 §r> 获胜!!!'));
            break;
        case 'blue_legion:legion_base':
            dimension.getPlayers().forEach(player => player.onScreenDisplay.setTitle('<§4§o§l 红方军团基地 §r> 获胜!!!'));
            break;
    }
    ;
    // 播放音效
    dimension.getPlayers().forEach(player => player.playSound('respawn_anchor.deplete'));
    // 播放粒子
    dimension.spawnParticle('constant:fireworks_fireball_rune_blue', above);
    dimension.spawnParticle('constant:erupt_rune_blue', above);
    dimension.spawnParticle('constant:fireworks_fireball_rune_red', above);
    dimension.spawnParticle('constant:erupt_rune_red', above);
    // 复位标识符
    shouldTheWarBeTerminated = 0;
}
;
