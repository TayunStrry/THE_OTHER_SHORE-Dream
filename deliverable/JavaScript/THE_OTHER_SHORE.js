/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统数据
 */
import help from "./data/help";
/*
 * 系统组件
 */
import * as opal from "./system/opal";
import * as table from "./data/table";
/*
 * 方块组件
 */
import blockComponents from "./block/custom_component";
import updateComponent from "./block/update_component";
/*
 * 物品组件
 */
import itemComponents from "./item/custom_component";
/*
 * 物品特例组件
 */
import { containerSorting, magicHandbook, obtainBlock, magicCrystalHammer, magicCrystalKey, EquipmentEventTrigger } from "./item/custom_function";
/*
 * 实体组件
 */
import * as entitySubject from "./entity/subject";
/*
 * 自定义命令组件
 */
import customCommands from "./command/custom_command";
import customEnums from "./command/custom_enum";
/*
 * < 世界 > 初始化前 事件
 */
server.system.beforeEvents.startup.subscribe(data => {
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
    /**
     * 自定义指令的映射集合
     */
    const commandsInfos = [...customCommands.keys()];
    /**
     * 自定义指令回调函数数组
     */
    const commandCallbacks = [...customCommands.values()];
    /**
     * 自定义指令的枚举映射集合
     */
    const enumName = [...customEnums.keys()];
    /**
     * 自定义指令枚举值数组
     */
    const enumValues = [...customEnums.values()];
    // === 方块自定义组件注册 ===
    for (let blockIndex = 0; blockIndex < blockCustoms.length; blockIndex++)
        data.blockComponentRegistry.registerCustomComponent(blockNames[blockIndex], blockCustoms[blockIndex]);
    // === 物品自定义组件注册 ===
    for (let itemIndex = 0; itemIndex < itemCustoms.length; itemIndex++)
        data.itemComponentRegistry.registerCustomComponent(itemNames[itemIndex], itemCustoms[itemIndex]);
    // === 自定义指令枚举值注册 ===
    for (let enumIndex = 0; enumIndex < enumName.length; enumIndex++)
        data.customCommandRegistry.registerEnum(enumName[enumIndex], enumValues[enumIndex]);
    // === 自定义指令注册 ===
    for (let cmdIndex = 0; cmdIndex < commandCallbacks.length; cmdIndex++)
        data.customCommandRegistry.registerCommand(commandsInfos[cmdIndex], commandCallbacks[cmdIndex]);
});
/*
 * < 世界 > 初始化后 事件
 */
server.world.afterEvents.worldLoad.subscribe(async () => {
    /*
     * 注册 基础程序容器
     */
    EquipmentEventTrigger.BriefCreate('世界初始化容器');
    // 在月华百科中导入知识库
    opal.material.push(...help);
});
/*
 * < 世界 > 聊天发送后 事件
 */
server.world.afterEvents.chatSend.subscribe(data => opal.manageChatResponses(data.sender, data.message));
/*
 * < 实体 > 生成后 事件
 */
server.world.afterEvents.entitySpawn.subscribe(data => {
    /**
     * * 获取 发起事件 的 实体
     */
    const entity = data.entity;
    // 验证实体是否有效
    if (entity && !entity.isValid)
        return;
    /**
     * * 生命值组件
     */
    const health = entity.getComponent('health');
    // 验证实体血量是否达标
    if (!health || health.currentValue <= 5)
        return;
    // 验证实体是否已经初始化
    if (entity.getDynamicProperty('entity:is_initial'))
        return;
    // 添加数据
    opal.CreateProperty(entity, table.battle_property.get(entity.typeId));
    // 记录实体生成位置
    entity.setDynamicProperty('entity:create_place', entity.location);
    // 标记实体已初始化
    entity.setDynamicProperty('entity:is_initial', true);
});
/*
 * < 玩家 > 生成后 事件
 */
server.world.afterEvents.playerSpawn.subscribe(data => {
    /**
     * * 获取 当前玩家 是否 初次生成
     */
    const initial = data.initialSpawn;
    /**
     * * 获取 玩家对象
     */
    const player = data.player;
    // 验证玩家是否有初始化 并 尝试刷新 超级野蜂袭击
    if (!initial || player.getDynamicProperty('entity:is_initial'))
        return;
    /**
     * * 玩家出生点
     */
    const anchor = {
        location: opal.Vector.floor(player.location),
        dimension: player.dimension.id
    };
    /**
     * * 获取主世界维度
     */
    const overworldDimension = server.world.getDimension('minecraft:overworld');
    // 记录 出生点 并 赋予属性
    player.setDynamicProperty('road_sign:出生点', JSON.stringify(anchor));
    opal.CreateProperty(player, { self_rune: 'rune_void' });
    player.setDynamicProperty('entity:is_initial', true);
    // 播放启动音效
    server.system.runTimeout(() => player.playSound('ambient.weather.thunder'), 480);
    // 尝试创建附加结构
    server.system.runTimeout(() => entitySubject.EnterVacantSpaceWaspTower(player), 500);
    // 播放终止音效
    server.system.runTimeout(() => player.playSound('ambient.weather.thunder'), 560);
    // 重新设置世界规则
    entitySubject.ReviseWorldRules(overworldDimension);
});
/*
 * < 实体 > 生命值变化后 事件
 */
server.world.afterEvents.entityHealthChanged.subscribe(data => {
    /**
     * * 获取 实体
     */
    const entity = data.entity;
    /**
     * * 伤害 的 数值
     */
    const value = data.oldValue - data.newValue;
    // 显示生命值变化
    entitySubject.HealthAlterDisplay(entity, Math.ceil(value));
});
/*
 * < 实体 > 遭遇攻击后 事件
 */
server.world.afterEvents.entityHurt.subscribe(data => {
    /**
     * * 被攻击 的 实体
     */
    const target = data.hurtEntity;
    /**
     * * 伤害 的 来源
     */
    const source = data.damageSource;
    /**
     * * 获取 袭击者
     */
    const entity = source.damagingEntity;
    // 验证实体是否有效
    if (!entity || !target || !entity.isValid || !target.isValid)
        return;
    // 执行 玩家发动攻击后 事件
    entitySubject.PlayersLaunchAttacks(target, source, entity);
    // 执行 实体遭受攻击后 事件
    entitySubject.EntityUnderAttack(target, source, entity, data.damage);
    // 执行 玩家遭受攻击后 事件
    entitySubject.PlayersUnderAttack(target, entity);
});
/*
 * < 实体 > 死亡后 事件
 */
server.world.afterEvents.entityDie.subscribe(data => {
    /**
     * * 获取 死亡的 实体
     */
    const self = data.deadEntity;
    /**
     * * 获取 伤害 的 来源
     */
    const source = data.damageSource;
    /**
     * * 获取 击杀者
     */
    const target = source.damagingEntity;
    // 验证实体是否有效
    if (!target || !target.isValid || !self || !self.isValid || !self.hasComponent('minecraft:health'))
        return;
    // 死亡后发放奖励
    entitySubject.createRewardsAfterDeath(self, target);
    // 执行 死亡机制
    entitySubject.FunctionsPerformedAfterDeath(self, target);
});
/*
 * < 玩家 > 攻击方块后 事件
 */
server.world.afterEvents.entityHitBlock.subscribe(data => {
    /**
     * * 获取 玩家对象
     */
    const player = data.damagingEntity;
    // 验证实体是否有效
    if (!(player instanceof server.Player))
        return;
    /**
     * * 获取 物品对象
     */
    const item = player.getComponent('inventory')?.container?.getItem(player.selectedSlotIndex);
    /**
     * * 获取 方块对象
     */
    const block = data.hitBlock;
    /**
     * * 获取 玩家 的 背包
     */
    const container = player.getComponent('minecraft:inventory')?.container;
    /**
     * * 获取 控制事件触发器
     */
    const token = opal.TriggerControl;
    // 物品类型
    if (container)
        switch (item?.typeId) {
            case 'starry_map:material_sorting':
                if (token('物资整理', player, 20))
                    containerSorting(player, block);
                break;
            case 'starry_map:obtain_block':
                if (token('获取方块', player, 5))
                    obtainBlock(player, container, block);
                break;
            case 'starry_map:magic_crystal_hammer':
                if (token('魔晶锤子', player, 20))
                    magicCrystalHammer(player, item, container, block);
                break;
            case 'starry_map:magic_crystal_key':
                if (token('魔晶钥匙', player, 20))
                    magicCrystalKey(player, item, container, block);
                break;
            case 'starry_map:magic_handbook':
                if (token('魔导手册', player, 20))
                    magicHandbook(player, item, block);
                break;
            default: break;
        }
    ;
});
/*
 * < 世界 > 天气变化后 事件
 */
server.world.afterEvents.weatherChange.subscribe(() => {
    /**
     * 获取当前游戏日
     */
    const currentDay = server.world.getDay();
    // 敌袭间隔为30天, 如果当前游戏日小于等于20, 则不触发敌袭
    if (currentDay <= 20)
        return;
    /**
     * 上次触发敌袭的时间（游戏日）
     */
    let lastRaidDay = server.world.getDynamicProperty('time_integration');
    /**
     * 敌袭间隔计数器
     */
    let raidIntervalCount = server.world.getDynamicProperty('timekeeper') || 0;
    // 如果上次敌袭时间为undefined, 则初始化
    if (lastRaidDay === undefined) {
        // 初始化上次敌袭时间为当前日
        server.world.setDynamicProperty('time_integration', currentDay);
        lastRaidDay = currentDay;
    }
    /**
     * 如果设置了“敌袭倒计时”功能, 则显示剩余天数
     */
    if (opal.TriggerControl('敌袭倒计时', new opal.Vector(0, 0, 0), 100)) {
        const daysUntilNextRaid = 30 - (currentDay - lastRaidDay) % 30;
        if (daysUntilNextRaid > 0) {
            server.world.sendMessage(`敌袭可能将在 ${daysUntilNextRaid} 天后到来`);
        }
    }
    /**
     * 若未达到触发周期, 提前返回
     */
    if ((currentDay - lastRaidDay) / 30 < raidIntervalCount)
        return;
    /**
     * 定义敌袭实体及其出现权重
     */
    const raidMobWeights = new Map([
        ['starry_map:wild_bee.guide', 15],
        ['starry_map:guide.jasmine', 10],
        ['starry_map:guide.windnews', 5]
    ]);
    /**
     * 根据权重选择一个敌袭实体类型
     */
    const selectedRaidMobId = opal.AnalysisWeight(raidMobWeights).output;
    /**
     * 获取所有在线玩家
     */
    const allPlayers = server.world.getPlayers();
    /**
     * 若没有玩家在线, 提前返回
     */
    if (allPlayers.length === 0)
        return;
    /**
     * 随机选择一名玩家作为触发者
     */
    const targetPlayer = allPlayers[opal.RandomFloor(0, allPlayers.length - 1)];
    // 验证玩家对象是否有效
    if (!targetPlayer)
        return;
    /**
     * 随机偏移坐标
     */
    const randomOffsetLocation = opal.Vector.copy(targetPlayer.location).random(32);
    /**
     * 获取目标位置上方两格的有效坐标作为生成锚点
     */
    const spawnAnchorLocation = targetPlayer.dimension.getTopmostBlock(randomOffsetLocation)?.above(2) ?? targetPlayer.location;
    /**
     * 玩家头部坐标, 用于设置自由指针
     */
    const playerHeadLocation = targetPlayer.getHeadLocation();
    /**
     * 玩家所在维度
     */
    const playerDimension = targetPlayer.dimension;
    /**
     * 延迟播放音效和生成敌袭实体
     */
    server.system.runTimeout(() => targetPlayer.playSound('portal.trigger'), 20);
    server.system.runTimeout(() => targetPlayer.onScreenDisplay.setTitle([opal.translate(selectedRaidMobId, 'entity'), { text: '出现了' }]), 40);
    server.system.runTimeout(() => opal.TrySpawnEntity(playerDimension, selectedRaidMobId, spawnAnchorLocation), 60);
    /**
     * 设置自由指针（可能用于后续追踪或引导）
     */
    opal.SetFreePointer({ location: playerHeadLocation, dimension: playerDimension }, spawnAnchorLocation, 10);
    /**
     * 更新敌袭相关状态
     */
    server.world.setDynamicProperty('time_integration', currentDay);
    server.world.setDynamicProperty('timekeeper', raidIntervalCount + 1);
});
/*
 * < 方块 > 更新后 事件
 */
server.world.afterEvents.playerBreakBlock.subscribe(data => updateComponent(data.block));
server.world.afterEvents.playerPlaceBlock.subscribe(data => updateComponent(data.block));
