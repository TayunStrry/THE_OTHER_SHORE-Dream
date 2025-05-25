/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
/*
 * 系统数据
 */
import * as dataSpeak from "../data/speak";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import * as table from "../data/table";
/*
 * 实体组件
 */
import * as whale_attack from "../entity/whale_attack";
import * as viper_attack from "../entity/viper_attack";
import * as wasp_attack from "../entity/wasp_attack";
import * as role_attack from "../entity/role_attack";
/**
 * 处理交换表选择
 *
 * 根据玩家的选择处理交换表的获取逻辑, 包括条件判断, 物品交换和特效展示
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {serverUI.ActionFormResponse} option - 玩家的选择结果
 *
 * @param {[string, type.SCHEDULE_NOTE][]} entry - 可获取的交换表列表
 */
function analysisExchangeForm(player, option, entry) {
    // 检测玩家是否未做出选择
    if (option.selection == undefined)
        return;
    /**
     * 获取 玩家背包
     */
    const container = player.getComponent('inventory')?.container;
    /**
     * 玩家选中的交换表
     */
    const select = entry[option.selection][1];
    // 判断背包是否存在
    if (!container)
        return;
    // 判断是否满足前处理函数的条件
    if (select.before && !select.before(player))
        return player.onScreenDisplay.setTitle([
            { text: `§4§l条件不满足\n无法完成任务\n§6< §u` },
            { text: entry[option.selection][0] },
            { text: '§6 >§r' }
        ]);
    // 判断是否满足删除特定物品的条件
    if (select.attrition && !opal.CheckItemStack(container, select.attrition.map(intel => opal.CreateItemFromStackData(intel))))
        return player.onScreenDisplay.setTitle([
            { text: `§4§l物品数量不足\n无法完成任务\n§p< §u` },
            { text: entry[option.selection][0] },
            { text: '§6 >§r' }
        ]);
    // 删除特定物品
    select.attrition?.forEach(intel => opal.DeleteItemStack(container, opal.CreateItemFromStackData(intel)));
    // 给与任务完成奖励
    if (select.reward)
        select.reward.forEach(intel => opal.TrySpawnItem(player.dimension, opal.CreateItemFromStackData(intel), player.location));
    // 添加 任务标签
    if (select.onDone)
        select.onDone.forEach(info => player.addTag(info));
    // 播放 引导提示
    if (select.prompt)
        opal.PlayPrompt(player, select.prompt);
    // 执行后处理函数
    if (select.after)
        select.after(player);
    // 任务完成后的特效提示
    player.onScreenDisplay.setTitle([
        { text: `§6§l恭喜你完成任务\n§d< §9` },
        { text: entry[option.selection][0] },
        { text: '§d >§r' }
    ]);
    opal.TrySpawnParticle(player.dimension, 'constant:fireworks_fireball_rune_orange', player.getHeadLocation());
    opal.TrySpawnParticle(player.dimension, 'constant:fireworks_paper_rune_orange', player.getHeadLocation());
    player.playSound('firework.twinkle');
}
;
/**
 * 交换表功能
 *
 * 为玩家展示可获取的交换表, 并处理玩家的选择
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {server.RawMessage} title - 界面标题
 *
 * @param {Map<string, type.SCHEDULE_NOTE>} data - 可获取的交换表数据
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
export async function exchangeForm(player, title, data) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 创建一个触发控制器, 用于管理玩家操作
     */
    const control = opal.TriggerControl('exchangeForm', player, 200);
    // 设置事件触发限速器
    if (!opal.TriggerControl('触发交换表', player, 40))
        return;
    // 检测玩家是否正在执行其他任务
    if (!control) {
        /**
         * 获取控制器剩余时间
         */
        const wait = opal.ObtainWaitTime('exchangeForm', player);
        /**
         * 将剩余时间换算成秒
         */
        const conversion = (wait / 20).toFixed(1);
        // 创建音效
        player.playSound('chime.amethyst_block');
        // 显示剩余时间
        player.onScreenDisplay.setActionBar('§4§l建议等待 ' + conversion + ' 秒...');
    }
    ;
    /**
     * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData().title(title);
    /**
     * 获取 玩家拥有的标签
     */
    const tags = new Set(player.getTags());
    /**
     * 过滤出玩家符合条件且未完成的计划
     */
    const entry = [...data]
        .filter(info => info[1]?.rely?.every(tag => tags.has(tag)) ?? true)
        .filter(info => !info[1]?.onDone?.every(tag => tags.has(tag)));
    // 检测是否有满足条件的计划
    if (entry.length == 0)
        return player.onScreenDisplay.setTitle(opal.ReplyMessages.cannot_select);
    // 添加 计划按钮
    entry.forEach(info => display.button(info[0], info[1].texture));
    // 显示 窗口界面
    display.show(player).then(option => {
        // 检测玩家是否未做出选择
        if (option.selection == undefined)
            return;
        /**
         * 玩家选中的交换表
         */
        const select = entry[option.selection];
        /**
         * 创建 详情页表单对象
         */
        const action = new serverUI.ActionFormData().title(select[0]).body({ rawtext: select[1].refer });
        // 添加按钮
        action.button('§9§l领取§r').button('§u§l返回§r');
        // 显示详情页表单并处理玩家选择
        action.show(player).then(info => {
            /**
             * 如果玩家取消操作或选择无效, 则直接返回
             */
            if (info.canceled || info.selection == undefined)
                return;
            /**
             * 解析表单内容并尝试领取奖励
             */
            info.selection == 0 ? analysisExchangeForm(player, option, entry) : exchangeForm(player, title, data);
            /**
             * 播放翻书音效, 提示玩家操作成功
             */
            player.playSound('item.book.page_turn');
        });
    });
}
;
/**
 * 获取实体周围最近的蛋糕方块
 *
 * 该函数遍历实体周围的方块, 寻找最近的蛋糕方块
 *
 * @param {server.Entity} entity - 服务器实体对象
 *
 * @returns {server.Block | undefined} - 返回最近的蛋糕方块, 如果找不到则返回undefined
 */
function getClosestCakeToEntity(entity) {
    /**
     * 获取实体所在位置的基准方块
     */
    const sourceBlock = entity.dimension.getBlock(entity.location);
    // 如果基准方块不存在, 直接返回undefined
    if (!sourceBlock)
        return;
    // 遍历基准方块周围的方块, 搜索范围为 -3 到 3 的立方体区域内
    for (let axleX = -3; axleX <= 3; axleX++)
        for (let axleY = -3; axleY <= 3; axleY++)
            for (let axleZ = -3; axleZ <= 3; axleZ++) {
                /**
                 * 获取相对于基准方块的偏移位置的方块
                 */
                const query = sourceBlock.offset({ x: axleX, y: axleY, z: axleZ });
                // 如果找到蛋糕方块, 则返回该方块
                if (query && query.typeId == 'minecraft:cake')
                    return query;
            }
    ;
    // 如果遍历完所有方块后没有找到蛋糕方块, 返回undefined
    return undefined;
}
;
/**
 * 定位最近的蛋糕方块并模拟实体食用蛋糕
 *
 * 该函数首先寻找最近的蛋糕方块, 然后模拟实体食用蛋糕的过程,
 *
 * 包括播放动画, 修改蛋糕方块的食用计数, 播放音效等
 *
 * @param {server.Entity} entity - 服务器实体或玩家对象
 */
function locateCakeAndEatCake(entity) {
    /**
     * 获取实体周围最近的蛋糕方块
     */
    const cakeBlcok = getClosestCakeToEntity(entity);
    // 如果没有找到蛋糕方块, 则终止函数执行
    if (!cakeBlcok)
        return;
    /**
     * 获取蛋糕方块的当前食用计数
     */
    const bite_counter = cakeBlcok.permutation.getState('bite_counter');
    // 播放实体食用蛋糕的动画
    entity.playAnimation('animation.entity.role_sitting.tasting_food', { stopExpression: '!q.is_sitting && !q.is_riding' });
    // 修正实体的位置, 使其面向蛋糕方块
    entity.teleport(entity.location, { facingLocation: cakeBlcok.bottomCenter() });
    // 设置延时任务, 10个tick后执行蛋糕食用逻辑
    server.system.runTimeout(() => {
        // 将蛋糕放入实体的主手
        entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 minecraft:cake');
        // 增加蛋糕方块的食用计数
        opal.TrySetPermutation(cakeBlcok, 'bite_counter', bite_counter + 1);
        // 播放食用蛋糕的音效
        entity.dimension.playSound('cake.add_candle', cakeBlcok.location);
    }, 10);
    // 设置延时任务, 一段时间后播放音效
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 10);
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 15);
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 20);
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 25);
    // 设置延时任务, 50个tick后清除实体的主手物品
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air'), 50);
}
;
/**
 * 播放实体展示手持物品的动画, 并在一段时间后将指定物品放入实体的主手
 *
 * 然后播放音效, 最后清除主手物品
 *
 * @param {server.Entity | server.Player} entity - 服务器实体或玩家对象
 *
 * @param {string} type - 要展示的物品类型
 */
function displayItem(entity, type) {
    // 播放 实体 展示手持物品 的 动画
    entity.playAnimation('animation.entity.role_sitting.display_items', { stopExpression: '!q.is_sitting && !q.is_riding' });
    // 设置延时任务, 一段时间后将物品放入实体的主手
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 ' + type), 10);
    // 设置延时任务, 一段时间后播放音效
    server.system.runTimeout(() => entity.dimension.playSound('armor.equip_generic', entity.location), 25);
    // 设置延时任务, 一段时间后清除实体的主手物品
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air'), 78);
}
;
/**
 * 播放实体展示装备的动画, 并在一段时间后将指定装备放入实体的主手
 *
 * 然后播放音效, 最后清除主手装备
 *
 * @param {server.Entity | server.Player} entity - 服务器实体或玩家对象
 *
 * @param {string} type - 要展示的装备类型
 */
function displayEquipment(entity, type) {
    // 播放 实体 展示手持物品 的 动画
    entity.playAnimation('animation.entity.role_sitting.display_equipment', { stopExpression: '!q.is_sitting && !q.is_riding' });
    // 设置延时任务, 一段时间后将装备放入实体的主手
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 ' + type), 10);
    // 设置延时任务, 一段时间后播放音效
    server.system.runTimeout(() => entity.dimension.playSound('armor.equip_generic', entity.location), 15);
    // 设置延时任务, 一段时间后清除实体的主手物品
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air'), 120);
}
;
/**
 * 播放实体吃掉手持食物的动画, 并在一段时间后将指定食物放入实体的主手
 *
 * 然后播放吃食物的音效, 最后清除主手食物
 *
 * @param {server.Entity | server.Player} entity - 服务器实体或玩家对象
 *
 * @param {string} type - 要品尝的食物类型
 */
function tastingFood(entity, type) {
    // 播放 实体 吃掉手持物品 的 动画
    entity.playAnimation('animation.entity.role_sitting.tasting_food', { stopExpression: '!q.is_sitting && !q.is_riding' });
    // 设置延时任务, 一段时间后将食物放入实体的主手
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 ' + type), 10);
    // 设置延时任务, 一段时间后播放音效
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 10);
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 15);
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 20);
    server.system.runTimeout(() => entity.dimension.playSound('random.eat', entity.location), 25);
    // 设置延时任务, 一段时间后清除实体的主手物品
    server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air'), 50);
}
;
/**
 * 在实体空闲状态下执行特定行为
 *
 * 根据实体的状态类型, 执行不同的行为, 如播放语音, 寻找并食用蛋糕等
 *
 * @param {server.Entity | server.Player} entity - 要执行行为的实体或玩家对象
 *
 * @param {string} type - 实体的状态类型, 例如 'is_sitting'
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
export async function performActionInIdleState(entity, type) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 待机动画行为权重列表
     */
    const weightedActions = [
        // 播放常规语音
        { weight: 1, action: speechAndVoiceManager, input: '空闲' },
        // 展示 锻造模板
        { weight: 3, action: displayItem, input: 'minecraft:silence_armor_trim_smithing_template' },
        // 展示 附魔金苹果
        { weight: 3, action: displayItem, input: 'minecraft:enchanted_golden_apple' },
        // 展示 海洋之心
        { weight: 3, action: displayItem, input: 'minecraft:heart_of_the_sea' },
        // 展示 不死图腾
        { weight: 3, action: displayItem, input: 'minecraft:totem_of_undying' },
        // 展示 龙息
        { weight: 3, action: displayItem, input: 'minecraft:dragon_breath' },
        // 展示 下界之星
        { weight: 3, action: displayItem, input: 'minecraft:nether_star' },
        // 展示 钻石
        { weight: 3, action: displayItem, input: 'minecraft:diamond' },
        // 展示 逻辑与非
        { weight: 3, action: displayItem, input: 'starry_map:correct_logic_nand' },
        // 展示 逻辑非
        { weight: 3, action: displayItem, input: 'starry_map:correct_logic_not' },
        // 展示 逻辑或非
        { weight: 3, action: displayItem, input: 'starry_map:correct_logic_nor' },
        // 展示 逻辑与
        { weight: 3, action: displayItem, input: 'starry_map:correct_logic_and' },
        // 展示 分光棱镜
        { weight: 3, action: displayItem, input: 'starry_map:correct_spectral_prism' },
        // 展示 偏光棱镜
        { weight: 3, action: displayItem, input: 'starry_map:correct_deflection_prism' },
        // 展示 林业指南
        { weight: 7, action: displayEquipment, input: 'starry_map:forestry_guidelines' },
        // 展示 矿物辞典
        { weight: 7, action: displayEquipment, input: 'starry_map:mineral_dictionary' },
        // 展示 空间宝典
        { weight: 7, action: displayEquipment, input: 'starry_map:space_transition' },
        // 展示 精灵治愈
        { weight: 7, action: displayEquipment, input: 'starry_map:faerie_healing' },
        // 展示 魔导手册
        { weight: 7, action: displayEquipment, input: 'starry_map:magic_handbook' },
        // 展示 源能秘典
        { weight: 7, action: displayEquipment, input: 'starry_map:source_energy' },
        // 展示 哨兵模块
        { weight: 7, action: displayEquipment, input: 'starry_map:call_python_sentinel' },
        // 展示 钻探模块
        { weight: 7, action: displayEquipment, input: 'starry_map:call_tunnel_dragon_guide' },
        // 展示 魔晶扳手
        { weight: 7, action: displayEquipment, input: 'starry_map:magic_crystal_wrench' },
        // 展示 匣里乾坤
        { weight: 7, action: displayEquipment, input: 'starry_map:world_of_box' },
        // 展示 容器枢纽
        { weight: 7, action: displayEquipment, input: 'starry_map:container_hub' },
        // 展示 驱动核心
        { weight: 7, action: displayEquipment, input: 'starry_map:servo_omphalos' },
        // 展示 容器整理
        { weight: 7, action: displayEquipment, input: 'starry_map:container_arrange' },
        // 展示 金属锻压
        { weight: 7, action: displayEquipment, input: 'starry_map:netherite.metal_forming_press' },
        // 吃 附魔金苹果
        { weight: 15, action: tastingFood, input: 'minecraft:enchanted_golden_apple' },
        // 吃 南瓜派
        { weight: 15, action: tastingFood, input: 'minecraft:pumpkin_pie' },
        // 吃 曲奇饼干
        { weight: 15, action: tastingFood, input: 'minecraft:cookie' },
        // 吃 苹果
        { weight: 15, action: tastingFood, input: 'minecraft:apple' },
        // 寻找蛋糕并吃蛋糕
        { weight: 30, action: locateCakeAndEatCake, input: null }
    ];
    /**
     * 根据权重计算累积权重数组
     */
    const cumulativeWeights = weightedActions.reduce((acc, action) => {
        /**
         * 获取上一个累积权重, 如果没有上一个, 则默认为 0
         */
        const lastWeight = acc.length > 0 ? acc[acc.length - 1] : 0;
        // 将当前累积权重加上当前动作的权重
        acc.push(lastWeight + action.weight);
        // 返回累积权重数组
        return acc;
    }, []);
    // 如果实体是坐着的动作, 则根据权重随机执行一个待机动画
    if (type === 'is_sitting') {
        /**
         * 生成一个随机数, 范围在 0 到 累积总权重 之间
         */
        const randomWeight = opal.RandomFloor(0, cumulativeWeights[cumulativeWeights.length - 1]);
        /**
         * 找到对应的行为
         */
        const selectedAction = weightedActions.find((action, index) => {
            return index === 0 ? randomWeight < action.weight : randomWeight < cumulativeWeights[index] && randomWeight >= cumulativeWeights[index - 1];
        });
        // 如果没有找到对应的行为, 则返回
        if (!selectedAction)
            return;
        // 如果有参数, 则执行带有参数的函数
        if (selectedAction.input !== null)
            selectedAction.action(entity, selectedAction.input);
        // 如果没有参数, 直接执行函数
        else
            selectedAction.action(entity);
    }
    // 如果不是坐着的动作, 则播放常规语音
    else
        speechAndVoiceManager(entity, '空闲');
}
;
/**
 * < 神恩领航者 >台词播放管理器
 *
 * @param {server.Entity | server.Player} self - 目标实体或玩家对象
 *
 * @param {string} tag - 语音类型标识符
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
export async function speechAndVoiceManager(self, tag) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    // 检查播报权限控制
    if (!opal.TriggerControl('台词 => ' + self.typeId + tag, new opal.Vector(0, 0, 0), 600))
        return;
    /**
     * 提取角色类型标签
     */
    const roleType = self.typeId.split(/:/)[1];
    /**
     * 设置广播范围参数
     */
    const broadcastOptions = {
        location: self.location,
        maxDistance: 8
    };
    /**
     * 获取附近玩家列表
     */
    const nearbyPlayers = self.dimension.getPlayers(broadcastOptions);
    /**
     * 获取对应的角色台词库
     */
    const dialogueContent = dataSpeak.dialogue.get(roleType);
    // 检查是否有有效玩家或台词内容
    if (nearbyPlayers.length === 0 || !dialogueContent)
        return;
    // 遍历附近的玩家
    nearbyPlayers.forEach(player => {
        /**
         * 定义标签列表, 用于匹配台词
         */
        const matchingTags = [tag, player.nameTag];
        /**
         * 定义台词权重映射
         */
        const speechWeightMap = new Map();
        /**
         * 定义台词范围数组, 用于存储匹配的台词信息
         */
        const matchingSpeeches = [];
        // 遍历台词库, 筛选符合条件的台词并填充权重映射
        dialogueContent.forEach(speech => {
            if (speech.tags.every(item => matchingTags.includes(item))) {
                matchingSpeeches.push(speech);
                speechWeightMap.set(speech.message, speech.weight);
            }
        });
        if (matchingSpeeches.length !== 0) {
            /**
             * 分析台词权重并获取随机台词
             */
            const weightResult = opal.AnalysisWeight(speechWeightMap);
            /**
             * 生成消息内容
             */
            const messageParts = [opal.translate(self), { text: ' : ' }, weightResult.output];
            // 发送台词到玩家
            player.sendMessage(messageParts);
            // 播放对应的语音
            player.playSound(matchingSpeeches[weightResult.index].sound ?? 'random.lever_click');
            /**
             * 检查是否有联动台词
             */
            const linkage = matchingSpeeches[weightResult.index].linkage;
            /**
             * 检查是否有事件
             */
            const event = matchingSpeeches[weightResult.index].event;
            // 如果存在事件, 则调用该事件的执行
            if (event)
                event(self);
            // 如果没有联动台词, 直接返回
            if (!linkage)
                return;
            /**
             * 获取进行台词联动的实体
             */
            const target = opal.EntitysSort(self.dimension, broadcastOptions, undefined, (entity) => entity.typeId === linkage.id)[0];
            // 如果没有找到目标实体, 直接返回
            if (!target || !target.isValid)
                return;
            // 延迟执行联动对话
            server.system.runTimeout(() => speechAndVoiceManager(target, linkage.tag), linkage.wait);
        }
        else {
            /**
             * 使用默认台词
             */
            const defaultSpeech = dataSpeak.defaultSpeak;
            /**
             * 生成消息内容
             */
            const messageParts = [opal.translate(self), { text: ' : ' }, defaultSpeech[opal.RandomFloor(0, defaultSpeech.length - 1)]];
            // 发送默认台词到玩家
            player.sendMessage(messageParts);
        }
    });
}
;
/**
 * 神恩领航者 - 元素攻击
 *
 * @param {server.Entity} self - 领航者实体对象
 *
 * @param {string} type - 领航者技能类型
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
export async function divineFavorGirlAttack(self, type) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    // 判断 是否 完成初始化
    if (!self || !self.isValid || !self.getDynamicProperty('entity:is_initial'))
        return;
    /**
     * 能量返还
     */
    const returnEnergy = self.getDynamicProperty('entity:return_energy') ?? 0;
    /**
     * 天赋解锁
     */
    const unlock = self.getDynamicProperty('entity:unlock') ?? false;
    /**
     * 战术等级
     */
    const improve = self.getDynamicProperty('entity:improve') ?? 1;
    /**
     * 获取 实体属性面板
     */
    const getData = opal.GetProperty(self);
    /**
     * 是否暴击
     */
    const erupt = opal.IsErupt(self);
    /**
     * 攻击目标
     */
    const target = self.target;
    /**
     * 获取 契约玩家 的 唯一标识符
     */
    const user = self.getDynamicProperty('entity:contract_user');
    // 设置实体速度
    self.addEffect('slowness', 80, { 'amplifier': 255, 'showParticles': false });
    // 判断 目标是否存在 且 是否应该终止攻击执行
    if (!target || divineFavorGirlBattleInterrupted(self, target))
        return;
    // 修正实体朝向
    self.setRotation(opal.Vector.difference(self.location, target.location));
    // 判断 领航者 是否并未完成 角色契约 或 升级等级小于 5 级
    if (!user || improve <= 5)
        switch (type) {
            //* 风信
            case 'windnews':
                role_attack.MoonLight(self, target, erupt, getData);
                break;
            //* 默认
            default:
                role_attack.DefaultAttack(self, target, erupt, getData);
                break;
        }
    // 判断 领航者 是否完成 角色契约 且 升级等级大于 5 级
    else
        switch (type) {
            //* 珍珠水母
            case 'jellyfish_of_pearl':
                role_attack.jellyfishInPearl(self, target, getData);
                break;
            //* 珍珠游鱼
            case 'fish_of_pearl':
                role_attack.fishInPearl(self, target, erupt);
                break;
            //* 珍珠
            case 'pearl':
                role_attack.Pearl(self, target);
                break;
            //* 琉璃
            case 'crystal':
                role_attack.Crystal(self, target, erupt, getData);
                break;
            //* 蔷薇
            case 'rambler':
                role_attack.Rambler(self, getData);
                break;
            //* 森涅
            case 'sennie':
                role_attack.SenNie(self, target, erupt, getData);
                break;
            //* 绯红
            case 'crimson':
                role_attack.Crimson(self, target, erupt, getData);
                break;
            //* 星砂
            case 'starsand':
                role_attack.StarSand(self, target, erupt, getData);
                break;
            //* 月华
            case 'moonlight':
                role_attack.MoonLight(self, target, erupt, getData);
                break;
            //* 海灵
            case 'hailing':
                role_attack.HaiLing(self, target, erupt, getData);
                break;
            //* 海娜
            case 'haina':
                role_attack.HaiNa(self, target, erupt, getData);
                break;
            //* 幽蓝
            case 'dullblue':
                role_attack.Dullblue(self, target, erupt, getData);
                break;
            //* 九九
            case 'ninenine':
                role_attack.NineNine(self, target, erupt, getData);
                break;
            //* 雪隐
            case 'snowhidden':
                role_attack.SnowHidden(self, target, erupt, getData);
                break;
            //* 默认
            default:
                role_attack.DefaultAttack(self, target, erupt, getData);
                break;
        }
    ;
    // 判断 升级等级是否大于 5 级
    if (improve > 5 && !unlock) {
        // 向玩家播放通知
        server.world.getPlayers().filter(player => player.id === user).forEach(player => {
            /**
             * 玩家屏幕标题对象
             */
            const display = player.onScreenDisplay;
            /**
             * 角色位置
             */
            const roleLocation = opal.Vector.copy(self.getHeadLocation());
            /**
             * 玩家位置
             */
            const playerLocation = opal.Vector.copy(player.getHeadLocation());
            /**
             * 定义 粒子参数
             */
            const molang = new server.MolangVariableMap();
            /**
             ** 粒子射流方向
             */
            const direction = opal.Vector.difference(roleLocation, playerLocation);
            // 设定 玩家屏幕标题
            display.setTitle(opal.translate(self));
            // 设置副标题
            display.updateSubtitle({ text: '解锁< 雾海巡游 >机制' });
            // 播放 音效
            player.playSound('block.enchanting_table.use');
            // 设置 粒子参数
            molang.setFloat('variable.type', 0);
            molang.setVector3('variable.direction', direction);
            // 播放射流粒子
            opal.TrySpawnParticle(self.dimension, 'scripts:path_ray', self.location, molang);
        });
        // 修改实体动态属性
        self.setDynamicProperty('entity:unlock', true);
    }
    ;
    // 判断 能量返还值 是否大于 0
    if (returnEnergy === 0)
        return;
    /**
     * 获取 领航者所在方块
     */
    const block = self.dimension.getBlock(opal.Vector.add(self.location, opal.Vector.CONSTANT_DOWN));
    // 判断 领航者所在方块 是否存在 且 是否为 实体方块
    if (!block || !block.isValid || !block.isSolid)
        return;
    // 设置 星尘能量值
    opal.ExpendEnergy(block, returnEnergy, false, true);
}
;
/**
 * 神恩领航者 攻击中断系统
 *
 * 根据目标实体类型和状态判断是否触发神圣契约保护机制, 阻止领航者对特定目标的攻击行为
 *
 * 中断条件优先级:
 * 1. 目标为玩家且非敌对种族
 * 2. 目标属于受保护阵营（村民/星空）
 * 3. 目标已被驯服
 * 4. 目标实体无效
 *
 * @param {server.Entity} self - 攻击发起者（领航者实体）
 *   - 必须包含 type_family 组件
 *   - 若具有「契约豁免」特性可绕过保护机制
 *
 * @param {server.Entity} target - 被攻击的目标实体
 *   - 需检测 type_family / is_tamed 组件状态
 *   - 无效实体自动触发保护
 *
 * @returns {boolean} 攻击中断判定结果
 *   - true: 触发神圣契约, 终止攻击
 *   - false: 允许继续攻击
 */
function divineFavorGirlBattleInterrupted(self, target) {
    // todo 组件状态预检
    /**
     * 目标的种族阵营组件
     * - 检测 type_family 组件是否存在
     * - 用于识别玩家 / 怪物 / 村民 / 星空等阵营类型
     */
    const targetFamily = target?.getComponent('type_family');
    /**
     * 攻击发起者的种族阵营组件
     * - 检测 type_family 组件是否存在
     * - 用于识别自身是否有契约豁免
     */
    const selfFamily = self?.getComponent('type_family');
    /**
     * 目标的驯服状态组件
     * - 检测 is_tamed 组件是否存在
     * - 用于判断是否属于可被保护的友好单位
     */
    const targetTamed = target?.getComponent('is_tamed');
    // todo 保护机制触发事件
    /**
     * 执行< 律令: >协议
     *
     * 触发效果:
     * 1. 向 15 格范围内玩家发送实时警告
     * 2. 触发攻击终止事件
     *
     * @returns {boolean} 固定返回 true 作为攻击中断信号
     */
    const triggerProtectionProtocol = () => {
        // 发送三维空间紧急警告（红色行动栏提示）
        self.runCommand('title @a[r=15] actionbar §4§l<§c 律令:禁武 §4>§r : < @s >无权发动本次攻击');
        // 激活实体攻击终止事件钩子
        self.triggerEvent('entity_event:attack_done');
        return true;
    };
    // todo 攻击中断条件判断流
    /* 契约豁免检测（优先级最高） */
    if (selfFamily?.hasTypeFamily('contract_immunity'))
        return false; // 拥有契约豁免权, 无视保护机制
    /* 玩家保护条款:目标为玩家且不属于怪物阵营时 */
    if (targetFamily?.hasTypeFamily('player') && !targetFamily?.hasTypeFamily('monster'))
        return triggerProtectionProtocol();
    /* 村民阵营保护 */
    if (targetFamily?.hasTypeFamily('villager'))
        return triggerProtectionProtocol();
    /* 星空阵营保护 */
    if (targetFamily?.hasTypeFamily('starry'))
        return triggerProtectionProtocol();
    /* 驯服单位保护 */
    if (targetTamed)
        return triggerProtectionProtocol();
    /* 无效目标保护 */
    if (!target || !target.isValid)
        return triggerProtectionProtocol();
    // 所有保护条件未触发, 允许继续攻击
    return false;
}
;
/**
 * 烛火野蜂群 - 元素攻击
 *
 * @param {server.Entity} self - 实体对象
 *
 * @param {string} type - 类型
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
export async function machineWaspAttack(self, type) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    // 判断 是否 完成初始化
    if (!self || !self.isValid || !self.getDynamicProperty('entity:is_initial'))
        return;
    // 判断触发控制器是否冷却完成
    if (!opal.TriggerControl('攻击冷却', self, 40))
        return;
    /**
     * 攻击目标
     */
    const target = self.target;
    // 检测 攻击目标
    if (!target || !target.isValid)
        return;
    // 执行细分事件
    switch (type) {
        //* 野蜂 - 侦查者
        case 'detection':
            wasp_attack.Detection(self, target);
            break;
        //* 野蜂 - 君临者
        case 'emperor':
            wasp_attack.Emperor(self, target);
            break;
        //* 野蜂 - 维系者
        case 'support':
            wasp_attack.Support(self);
            break;
        //* 野蜂 - 维系者
        case 'guide':
            wasp_attack.Guide(self);
            break;
        default: break;
    }
    ;
}
;
/**
 * 诸海渊鲸艇 - 元素攻击
 *
 * @param {server.Entity} self - 实体对象
 *
 * @param {string} type - 类型
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
export async function machineWhaleAttack(self, type) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    // 判断 是否 完成初始化
    if (!self || !self.isValid || !self.getDynamicProperty('entity:is_initial'))
        return;
    // 判断触发控制器是否冷却完成
    if (!opal.TriggerControl('攻击冷却', self, 40))
        return;
    /**
     * 是否暴击
     */
    const erupt = opal.IsErupt(self);
    /**
     * 攻击目标
     */
    const target = self.target;
    // 检测 攻击目标
    if (!target || !target.isValid)
        return;
    // 执行细分事件
    switch (type) {
        //* 渊鲸 - 执行者
        case 'execute':
            whale_attack.Execute(self, target, erupt);
            break;
        //* 渊鲸 - 君临者
        case 'emperor':
            whale_attack.Emperor(self, target, erupt);
            break;
        default: break;
    }
    ;
}
;
/**
 * 归忆蝰蛇炮 - 元素攻击
 *
 * @param {server.Entity} self - 实体对象
 *
 * @param {string} type - 类型
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
export async function machineViperAttack(self, type) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    // 判断 是否 完成初始化
    if (!self || !self.isValid || !self.getDynamicProperty('entity:is_initial'))
        return;
    // 判断触发控制器是否冷却完成
    if (!opal.TriggerControl('攻击冷却', self, 40))
        return;
    /**
     * 攻击目标
     */
    const target = self.target;
    // 检测 攻击目标
    if (!target || !target.isValid)
        return;
    // 修正实体朝向
    self.setRotation(opal.Vector.difference(self.location, target.location));
    // 执行细分事件
    switch (type) {
        //* 蝰蛇 - 维系者
        case 'support':
            viper_attack.Support(self, target);
            break;
        //* 星图阵营
        case 'starry_family':
            viper_attack.StarryFamily(self, target);
            break;
        default: break;
    }
    ;
}
;
/**
 * 隧龙列车运行事件
 *
 * @param {server.Entity} entity - 隧龙列车实体
 *
 * @param {string} type - 列车事件类型
 *
 * @returns {Promise<void>} - 返回一个Promise, 表示异步操作的完成
 */
export async function tunnelDragonTravel(entity, type) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    // 判断 实体是否有效
    if (!entity || !entity.isValid)
        return;
    /**
     * 获取 列车能量
     */
    const energy = entity.getDynamicProperty('energy:offline_vehicle_power') ?? 3500;
    // 基于事件类型执行细分操作
    switch (type) {
        // 列车行驶
        case 'train_travel':
            if (energy >= 200) {
                /**
                 * 申请 触发控制令牌
                 */
                const token = opal.TriggerControl('隧龙列车-光照方块', entity, 45);
                // 触发 数据驱动 实体事件
                entity.triggerEvent('entity_event:travel');
                // 检测光照令牌是否申请成功
                if (!token)
                    return;
                // 消耗列车能量
                entity.setDynamicProperty('energy:offline_vehicle_power', energy - 200);
                /**
                 * 定义 坐标基准点
                 */
                const anchor = opal.Vector.relativeOffset(entity.location, entity.getViewDirection(), { front: -4, right: 0, above: 0 });
                /**
                 * 方块状态-灵魂火把
                 */
                const permutation = server.BlockPermutation.resolve('minecraft:soul_torch');
                /**
                 * 转化为光源的预备方块
                 */
                const block = entity.dimension.getBlock(anchor);
                // 如果 方块为空气 就转换为 灵魂火把
                if (block?.isAir)
                    block.setPermutation(permutation);
            }
            else {
                /**
                 * 申请能源耗尽的显示令牌
                 */
                const token = opal.TriggerControl('隧龙列车-能源不足', entity, 200);
                // 检测能源耗尽令牌是否申请成功
                if (!token)
                    return;
                /**
                 * 获取 附近的玩家
                 */
                const players = entity.dimension.getPlayers({ maxDistance: 32, location: entity.location });
                /**
                 * 编辑消息通知
                 */
                const message = [
                    opal.translate(entity),
                    { text: ': 能源不足, 列车无法继续运行 :' },
                    { text: opal.Vector.toString(entity.location) }
                ];
                // 推送消息
                players.forEach(player => player.sendMessage(message));
            }
            break;
        // 仓储管理
        case 'inventory_filter':
            break;
        // 扩展模块
        case 'extend_module':
            /**
             * 列车模块查询条件
             */
            const options = {
                families: ['train_parts'],
                location: entity.location,
                maxDistance: 3
            };
            /**
             * 获取 列车部件
             */
            const trainParts = entity.dimension.getEntities(options);
            /**
             * 获取 玩家
             */
            const player = server.world.getEntity(entity.getDynamicProperty('entity:contract_user'));
            /**
             * 定义了 窗口界面 的 标题
             */
            const title = {
                text: "<§9§o§l 隧龙领航者-隧道掘进列车 §r>§2扩展组件"
            };
            /**
             * 定义了 窗口界面 的 选项
             */
            const option = [
                { text: '<§5§o§l 单人列车沙发 §5>§r' },
                { text: '<§5§o§l 基础列车货架 §5>§r' }
            ];
            /**
             * 定义了 窗口界面 的 表单对象
             */
            const display = new serverUI.ActionFormData()
                .title(title)
                .button(option[0], "textures/项目图标/神机操持/单人沙发")
                .button(option[1], "textures/项目图标/神机操持/列车货架");
            if (!player || trainParts.length >= 4)
                return player.sendMessage([opal.translate(player), { text: '-> 当前列车的<§l§9 扩展插槽 §r>已满载, 无法继续创建<§l§9 扩展组件 §r>' }]);
            // 显示窗口界面
            display.show(player).then(option => {
                if (option.canceled)
                    return;
                switch (option.selection) {
                    // 沙发
                    case 0:
                        opal.TrySpawnEntity(entity.dimension, 'starry_map:execute.couch', entity.location);
                        break;
                    // 货架
                    case 1:
                        opal.TrySpawnEntity(entity.dimension, 'starry_map:execute.inventory', entity.location);
                        break;
                }
            });
            break;
        // 载具回收
        case 'recycling':
            entity.runCommand('opal:unload_package_inventory @s starry_map:call_tunnel_dragon_guide');
            break;
        // 未知
        default: break;
    }
}
;
/**
 * 实体阵亡后的紧急保存与封印
 *
 * 该函数在实体阵亡时执行, 用于紧急保存实体数据并生成封印物品
 *
 * 包括创建封印物品、复制实体坐标、播放粒子特效以及封印实体
 *
 * @param {server.Entity} entity - 阵亡的实体对象
 *
 * @returns {Promise<void>} - 返回一个 Promise, 表示异步操作的完成
 */
export async function entityDeathPreservation(entity) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 创建 物品对象 - 星月诗篇
     */
    const sealedItem = new server.ItemStack('starry_map:moon_and_stars');
    /**
     * 复制实体坐标
     */
    const originalPosition = opal.Vector.copy(entity.location);
    /**
     * 复制实体坐标
     */
    const elevatedPosition = originalPosition.add({ x: 0, y: 2, z: 0 });
    /**
     * 粒子参数
     */
    const molang = new server.MolangVariableMap();
    /**
     * 物品名称
     */
    const itemName = '§c极限档案 - §d';
    /**
     * 物品词缀
     */
    const itemDescription = [
        `类型: ${entity.typeId}`,
        `名称: ${entity.nameTag}`,
        "§a___________________",
        "此乃[ 魔神 - 葬火 ]的恩惠",
        "在登临[ 最终档案馆 ]的王座时",
        "祂曾向众生立下许诺:",
        "    凡此领航之众, 皆为吾之同族",
        "    只要吾之火不曾熄灭, 纵使败者亦能重燃"
    ];
    // 设置 粒子尺寸
    molang.setFloat('variable.size', 4);
    // 播放 蝴蝶特效
    molang.setFloat('variable.direction', 3);
    opal.TrySpawnParticle(entity.dimension, 'scripts:path_butterfly', originalPosition, molang);
    // 播放 圆环特效
    molang.setFloat('variable.direction', 0);
    opal.TrySpawnParticle(entity.dimension, 'scripts:path_round', elevatedPosition, molang);
    // 播放 四芒星特效
    opal.TrySpawnParticle(entity.dimension, 'scripts:path_star4_small', elevatedPosition, molang);
    // 将实体数据保存到封印物品中, 并生成物品
    opal.UnloadInventoryAndPackageInPlace(entity, sealedItem, itemName, itemDescription);
}
;
/**
 * 为实体随机装备武器、护腿和副手物品, 或清空其装备
 *
 * 该函数会根据实体的装备状态, 随机选择装备并为其装备, 或者清空其装备
 *
 * 如果实体具有 `minecraft:is_chested` 组件, 则为其随机装备武器、护腿和副手物品；
 *
 * 否则, 清空其主手、副手和护腿槽位的物品
 *
 * @param {server.Entity} entity - 需要装备或清空装备的实体对象
 * @returns {Promise<void>} - 返回一个 Promise, 表示异步操作的完成
 */
export async function randomlyEquipOrClear(entity) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 随机选择护腿装备
     *
     * 使用 `opal.AnalysisWeight` 函数从 `table.role_armor_legs` 中随机选择一个护腿
     */
    const armorlegs = opal.AnalysisWeight(table.role_armor_legs).output;
    /**
     * 随机选择主手武器
     *
     * 使用 `opal.AnalysisWeight` 函数从 `table.role_main_hand` 中随机选择一个主手武器
     */
    const mainhand = opal.AnalysisWeight(table.role_main_hand).output;
    /**
     * 随机选择副手物品
     *
     * 使用 `opal.AnalysisWeight` 函数从 `table.role_off_hand` 中随机选择一个副手物品
     */
    const offhand = opal.AnalysisWeight(table.role_off_hand).output;
    // 等待 5 帧 确保实体组件已更新
    await server.system.waitTicks(5);
    // 根据实体是否具有 `minecraft:is_chested` 组件来决定装备或清空装备
    switch (entity.hasComponent('minecraft:is_chested')) {
        case true:
            // 添加随机装备
            server.system.runTimeout(() => entity.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${mainhand}`), 4);
            server.system.runTimeout(() => entity.runCommand(`replaceitem entity @s slot.weapon.offhand 0 ${offhand}`), 8);
            server.system.runTimeout(() => entity.runCommand(`replaceitem entity @s slot.armor.legs 0 ${armorlegs}`), 12);
            break;
        default:
            // 清空装备
            server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air'), 4);
            server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.weapon.offhand 0 air'), 8);
            server.system.runTimeout(() => entity.runCommand('replaceitem entity @s slot.armor.legs 0 air'), 12);
            break;
    }
}
;
/**
 * 控制实体进行动力飞行
 *
 * 此函数通过计算实体的视角方向和速度, 来模拟动力飞行的效果它首先尝试找到实体附近是否有玩家,
 *
 * 如果有, 则根据实体的视角方向计算新的速度向量, 并根据玩家的俯仰角度决定是否向上飞行
 *
 * @param {server.Entity} [entity] 需要进行动力飞行的实体对象
 *
 * @param {number} [speed] 飞行的速度, 决定了实体飞行的快慢
 */
export async function applyDynamicFlightToEntity(entity, speed) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 获取绑定的玩家 ID
     *
     * @type {boolean | number | string | server.Vector3 | undefined}
     */
    const playerID = entity.getDynamicProperty('dynamic_flight_in_player');
    // 验证绑定的玩家 ID 是否为字符串类型
    if (typeof playerID !== 'string')
        return opal.ThrowErrorIfPermitted('动力飞行失败, 玩家不存在');
    /**
     * 获取绑定的玩家对象
     *
     * @type {server.Player}
     */
    const player = server.world.getEntity(playerID);
    // 验证绑定的玩家对象是否存在
    if (!player)
        return opal.ThrowErrorIfPermitted('动力飞行失败, 玩家不存在');
    // 验证玩家是否正在跳跃, 如果是, 则清除实体的当前速度并返回
    if (player.isJumping)
        return entity.clearVelocity();
    /**
     * 获取实体视角方向
     *
     * @type {server.Vector3}
     */
    const direction = entity.getViewDirection();
    /**
     * 根据实体视角方向和速度参数计算新的速度向量
     *
     * @type {server.Vector3}
     */
    const newVelocity = opal.Vector.multiply(direction, speed);
    /**
     * 在新的速度向量基础上增加一个向上的分量, 用于模拟实体在飞行时的爬升效果
     *
     * @type {server.Vector3}
     */
    const climbVelocity = opal.Vector.add(newVelocity, opal.Vector.CONSTANT_UP);
    // 清除实体当前速度, 准备应用新速度
    entity.clearVelocity();
    // 根据玩家俯仰角度决定应用的速度向量
    entity.applyImpulse(player.getRotation().x >= -5 ? (player.getRotation().x > 55 ? direction : newVelocity) : climbVelocity);
}
;
/**
 * 将实体与玩家绑定, 以便控制实体的动力飞行
 *
 * @param {server.Entity} [entity] 需要进行动力飞行的实体对象
 */
export async function dynamicFlightToBinding(entity) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 获取玩家对象
     */
    const player = entity.dimension.getPlayers({ location: entity.location, maxDistance: 8, closest: 1 })[0];
    // 验证玩家对象是否存在
    if (!player)
        return opal.ThrowErrorIfPermitted(`绑定失败: 在实体周围 8 米范围内未找到任何玩家`);
    // 绑定玩家 ID
    entity.setDynamicProperty('dynamic_flight_in_player', player.id);
}
;
/**
 * 解除实体与玩家的绑定, 停止控制实体的动力飞行
 *
 * @param {server.Entity} [entity] 需要停止动力飞行的实体对象
 */
export async function dynamicFlightToSeparate(entity) {
    // 延迟执行, 避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 获取绑定的玩家ID
     *
     * @type {boolean | number | string | server.Vector3 | undefined}
     */
    const playerID = entity.getDynamicProperty('dynamic_flight_in_player');
    // 验证绑定的玩家ID是否为字符串类型
    if (typeof playerID !== 'string')
        return opal.ThrowErrorIfPermitted('解除动力飞行绑定失败: 实体未绑定到玩家');
    /**
     * 获取绑定的玩家对象
     *
     * @type {server.Player}
     */
    const player = server.world.getEntity(playerID);
    // 验证绑定的玩家对象是否存在
    if (!player)
        return opal.ThrowErrorIfPermitted('解除动力飞行绑定失败: 绑定的玩家不存在');
    // 清除玩家的摄像机动画
    player.camera.clear();
    // 解除绑定
    entity.setDynamicProperty('dynamic_flight_in_player');
}
;
/**
 * 将玩家牵引到实体周围随机位置
 *
 * @param {server.Entity} entity - 需要执行牵引逻辑的实体对象
 */
export async function applyTractionToPlayer(entity) {
    // 延迟执行，避免触发器冲突
    await server.system.waitTicks(0);
    /**
     * 获取绑定的玩家ID
     */
    const boundPlayerId = entity.getDynamicProperty('entity:contract_user');
    // 如果没有绑定玩家ID，则直接返回
    if (!boundPlayerId)
        return;
    /**
     * 根据玩家ID获取玩家对象
     */
    const boundPlayer = server.world.getEntity(boundPlayerId);
    // 检查玩家对象是否有效且与实体处于同一维度
    if (!boundPlayer || !boundPlayer.isValid || boundPlayer.dimension.id !== entity.dimension.id)
        return;
    /**
     * 获取玩家头部位置
     */
    const playerHeadPosition = opal.Vector.copy(boundPlayer.getHeadLocation());
    /**
     * 计算玩家与实体之间的距离
     */
    const distanceToEntity = playerHeadPosition.distance(entity.location);
    // 如果玩家距离实体小于等于 16 米，则不进行牵引
    if (distanceToEntity <= 16)
        return;
    /**
     * 在玩家周围生成一个随机位置
     */
    const randomPosition = playerHeadPosition.random(1);
    /**
     * 获取目标位置的方块对象
     */
    const targetBlock = entity.dimension.getBlock(randomPosition);
    /**
     * 获取玩家下方方块
     */
    const belowblock = entity.dimension.getBlock(boundPlayer.location)?.below();
    /**
     * 生成随机时间刻
     */
    const randomTime = opal.RandomFloor(5, 15);
    // 验证目标位置是否适合传送
    // 条件：目标方块不可为固体，上方方块不可为固体，下方方块必须为固体
    if (!targetBlock || targetBlock.isSolid || targetBlock.above()?.isSolid || !belowblock?.isSolid)
        return;
    // 播放传送特效
    opal.TrySpawnParticle(entity.dimension, 'constant:the_cracks_of_the_misty_sea', entity.getHeadLocation());
    opal.TrySpawnParticle(entity.dimension, 'constant:the_cracks_of_the_misty_sea', randomPosition);
    // 添加隐身效果
    entity.addEffect('minecraft:invisibility', Math.floor(randomTime * 1.5));
    // 播放牵引音效
    //boundPlayer.playSound('conduit.activate');
    // 等待 一段随机时间
    await server.system.waitTicks(randomTime);
    // 将玩家传送到目标位置
    entity.teleport(randomPosition, { facingLocation: playerHeadPosition });
}
;
