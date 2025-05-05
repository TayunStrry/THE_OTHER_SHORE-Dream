/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
/*
 * 方块组件
 */
import * as machine_gate from "./machine_gate";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
/**
 * * 进行检测的默认物品标签
 */
const defaultTag = 'tags:magic_tool.series';
/**
 * * 组件前缀代词
 */
const componentPrefix = 'opal:interact.';
/**
 * * 方块自定义组件列表
 */
const components = new Map();
;
/**
 * * 实体交互方块组件
 *
 * @param source - 方块组件参数
 */
function InteractComponentTrigger(source) {
    /**
     * * 方块对象
     */
    const block = source.block;
    /**
     * * 方块状态
     */
    const state = source.block.permutation;
    /**
     * * 方块维度
     */
    const dimension = source.dimension;
    /**
     * * 玩家对象
     */
    const player = source.player;
    /**
     * * 玩家背包
     */
    const container = player?.getComponent('minecraft:inventory')?.container;
    /**
     * * 物品对象
     */
    const item = container?.getItem(player?.selectedSlotIndex ?? 0);
    // 返回 方块交互组件 的 解构
    return { block, state, dimension, player, container, item };
}
;
/*
 * 从林木椅
 */
components.set(componentPrefix + 'jungle_wood_chair', {
    async onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 移除不应该存在的实体实体
        analysis.dimension.getEntitiesAtBlockLocation(analysis.block).filter(entity => entity.typeId === 'starry_map:execute.player_seat').forEach(entity => entity.remove());
        // 等待 1 tick
        await server.system.waitTicks(1);
        // 创建 玩家座位点实体
        opal.TrySpawnEntity(analysis.dimension, 'starry_map:execute.player_seat', analysis.block.center());
    }
});
/*
 * 计数模块
 */
components.set(componentPrefix + 'counting_module', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (!analysis.item?.hasTag(defaultTag))
            return;
        /**
         ** 输入值
         */
        const input = analysis.state.getState('STATE:input');
        // 赋值 方块状态
        opal.TrySetPermutation(analysis.block, 'STATE:input', input != 10 ? input + 1 : 1);
        opal.TrySetPermutation(analysis.block, 'STATE:count', 1);
        // 播放音效 与 粒子效果
        analysis.player?.playSound('tile.piston.out');
        // 显示悬浮文本
        opal.DisplayFloatingText(analysis.block, '<§l§e 计数模块 §r> : §l§9' + (input != 10 ? input + 1 : 1));
    }
});
/*
 * 交互终端
 */
components.set(componentPrefix + 'control_panel', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        if (analysis.item?.hasTag(defaultTag)) {
            /**
             ** 方块状态值
             */
            const note = analysis.state.getState('STATE:rune_note');
            // 赋值 方块状态
            opal.TrySetPermutation(analysis.block, 'STATE:rune_note', note != 7 ? note + 1 : 0);
            // 播放音效 与 粒子效果
            analysis.player?.playSound('tile.piston.out');
            // 显示悬浮文本
            switch (note) {
                case 0:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§9 诸海元素 §r]');
                    break;
                case 1:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§4 烛火元素 §r]');
                    break;
                case 2:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§2 界木元素 §r]');
                    break;
                case 3:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§6 归忆元素 §r]');
                    break;
                case 4:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§5 极雷元素 §r]');
                    break;
                case 5:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§l 启程元素 §r]');
                    break;
                case 6:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§0 焚绝元素 §r]');
                    break;
                case 7:
                    analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§l 虚无模式 §r]');
                    break;
                default: break;
            }
        }
        else {
            /**
             ** 方块状态值
             */
            const note = analysis.state.getState('STATE:rune_note');
            if (analysis.state.getState('STATE:stage') != 0)
                return;
            if (note != 0) {
                opal.TrySetPermutation(analysis.block, 'STATE:stage', 1);
                analysis.player?.playSound('conduit.activate');
                analysis.player?.sendMessage('| §l交互终端§r | : §6信号已发送');
            }
            else {
                analysis.player?.playSound('random.click');
                analysis.player?.sendMessage('| §l交互终端§r | : §4当前操作无法执行!§r\n| §l交互终端§r | : 使用§l§6 魔晶工具 §r调整| 信号类型 |');
            }
        }
    }
});
/*
 * 逻辑非门
 */
components.set(componentPrefix + 'logic_inverter', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (!analysis.item?.hasTag(defaultTag))
            return;
        /**
         ** 输入值
         */
        const price = analysis.state.getState('STATE:price');
        // 赋值 方块状态
        opal.TrySetPermutation(analysis.block, 'STATE:price', price != 9 ? price + 1 : 1);
        // 播放音效 与 粒子效果
        analysis.player?.playSound('tile.piston.out');
        analysis.player?.sendMessage('| 参数设置 | : §l§e逻辑元件§r[§6 运行周期§r] -> §u' + (price != 9 ? price + 1 : 1));
    }
});
/*
 * 信号过滤
 */
components.set(componentPrefix + 'signal_filtering', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (!analysis.item?.hasTag(defaultTag))
            return;
        /**
         ** 方块状态值
         */
        const note = analysis.state.getState('STATE:rune_note');
        // 赋值 方块状态
        opal.TrySetPermutation(analysis.block, 'STATE:rune_note', note != 7 ? note + 1 : 0);
        // 播放音效 与 粒子效果
        analysis.player?.playSound('tile.piston.out');
        // 显示设置文本
        switch (note) {
            case 0:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§9 诸海元素 §r]');
                break;
            case 1:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§4 烛火元素 §r]');
                break;
            case 2:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§2 界木元素 §r]');
                break;
            case 3:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§6 归忆元素 §r]');
                break;
            case 4:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§5 极雷元素 §r]');
                break;
            case 5:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§l 启程元素 §r]');
                break;
            case 6:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§l§0 焚绝模式 §r]');
                break;
            case 7:
                analysis.player?.sendMessage('| 参数设置 | : §l§e交互终端§r[§l 虚无模式 §r]');
                break;
            default: break;
        }
    }
});
/*
 * 旋转方块朝向
 */
components.set(componentPrefix + 'rotation_direction', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了魔晶工具系列物品
        if (!analysis.item?.hasTag(defaultTag)) {
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color');
            // 检测玩家手持物品是否属于魔法书 且 方块是否有色彩参数
            if (!color || !analysis.item?.hasTag('tags:magic_literature:series'))
                return;
            // 设置方块的色彩参数
            opal.TrySetPermutation(analysis.block, 'STATE:color', color != 6 ? color + 1 : 1);
            // 播放音效 与 粒子效果
            analysis.player?.playSound('mob.sheep.shear');
            // 终止函数的后续运行
            return;
        }
        ;
        /**
         ** 方块状态值
         */
        const face = analysis.state.getState('minecraft:block_face');
        // 播放音效 与 粒子效果
        analysis.player?.playSound('tile.piston.in');
        // 赋值 方块状态
        switch (face) {
            case 'down':
                opal.TrySetPermutation(analysis.block, 'minecraft:block_face', 'up');
                break;
            case 'up':
                opal.TrySetPermutation(analysis.block, 'minecraft:block_face', 'north');
                break;
            case 'north':
                opal.TrySetPermutation(analysis.block, 'minecraft:block_face', 'south');
                break;
            case 'south':
                opal.TrySetPermutation(analysis.block, 'minecraft:block_face', 'west');
                break;
            case 'west':
                opal.TrySetPermutation(analysis.block, 'minecraft:block_face', 'east');
                break;
            case 'east':
                opal.TrySetPermutation(analysis.block, 'minecraft:block_face', 'down');
                break;
            default: break;
        }
    }
});
/*
 * 伺服基座
 */
components.set(componentPrefix + 'servo_susceptor', {
    onPlayerInteract(source) {
        /*
         * 方块组件参数 的 解构
         */
        const { player, block, item, state } = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (!item?.hasTag(defaultTag))
            return;
        /**
         ** 方块状态值
         */
        const value = state.getState('STATE:value');
        // 赋值 方块状态
        opal.TrySetPermutation(block, 'STATE:value', value != 5 ? value + 1 : 0);
        // 播放音效 与 粒子效果
        player?.playSound('tile.piston.out');
        // 显示 提示文本
        player?.sendMessage({
            rawtext: [
                opal.translate(block),
                { text: `: 已修改至[§6 最大负载 §r]参数 -> ${value != 5 ? value + 1 : 0}` }
            ]
        });
    }
});
/*
 * 水平机关门
 */
components.set(componentPrefix + 'horizontal_gate', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 根据符文类型决定是 开启 或 强制关闭
        if (analysis.state.getState('STATE:rune_type') == 0) {
            opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 7);
            analysis.player?.playSound('open.bamboo_wood_door');
        }
        else if (analysis.state.getState('STATE:rune_type') != 0) {
            opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            analysis.player?.playSound('open.bamboo_wood_door');
            machine_gate.Urgent(analysis.block);
        }
    }
});
/*
 * 垂直机关门
 */
components.set(componentPrefix + 'vertical_gate', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { item, player, block, state } = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (item?.typeId == block.typeId) {
            player?.playSound('place.amethyst_block');
            /**
             * * 获取方块对象
             */
            const target = block.above();
            // 检测上方方块是否为空
            if (target?.isAir)
                target.setPermutation(block.permutation);
            // 终止函数的后续运行
            return;
        }
        ;
        // 根据符文类型决定是 开启 或 强制关闭
        if (state.getState('STATE:rune_type') == 0 && state.getState('STATE:about') != 0) {
            opal.TrySetPermutation(block, 'STATE:rune_type', 7);
            player?.playSound('open.bamboo_wood_door');
        }
        else if (state.getState('STATE:rune_type') != 0 && state.getState('STATE:about') != 0) {
            opal.TrySetPermutation(block, 'STATE:rune_type', 0);
            player?.playSound('open.bamboo_wood_door');
            machine_gate.Urgent(block);
        }
    }
});
/*
 * 魔晶上传
 */
components.set(componentPrefix + 'magic_crystal_upload', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        opal.TrySpawnParticle(analysis.block.dimension, 'constant:prompt_transport_above', analysis.block.bottomCenter());
        opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
        analysis.player?.playSound('conduit.activate');
        machine_gate.AboveTeleport(analysis.block);
    }
});
/*
 * 魔晶下传
 */
components.set(componentPrefix + 'magic_crystal_download', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        opal.TrySpawnParticle(analysis.block.dimension, 'constant:prompt_transport_below', analysis.block.center());
        opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
        analysis.player?.playSound('conduit.activate');
        machine_gate.BelowTeleport(analysis.block);
    }
});
/*
 * 合金钢锅
 */
components.set(componentPrefix + 'special_alloy_pot', {
    onPlayerInteract(source) {
        /**
         * 方块组件参数 的 解构
         */
        const { item, block, player, container, state, dimension } = InteractComponentTrigger(source);
        /**
         * 根据火焰状态显示的烹饪提示信息：
         * - 当火焰未点燃时, 提示用户点火；
         * - 当火焰已点燃时, 提示持续搅拌食材。
         */
        const waterPrompt = { text: state.getState('STATE:flame') == 0 ? '§4§l 火未点燃, 请先点火后再持续搅拌~§r' : '§9§l 请持续搅拌让味道充分融合!§r' };
        /**
         * 根据锅内是否有水显示的提示信息：
         * - 当锅内无水时, 提示用户放入食材；
         * - 当锅内有水且火焰已点燃时, 确认搅拌开始的提示。
         */
        const flamePrompt = { text: state.getState('STATE:water') === 0 ? '§4§l锅里空空如也, 请先放入食材！§r' : '§v§l火已点燃, 现在可以开始搅拌啦！§r' };
        // 检测是否使用了正确道具
        if (item?.typeId == block.typeId || !player || !container || !item)
            return;
        // === 烹饪准备阶段 ===
        if (state.getState('STATE:flame') == 0 || state.getState('STATE:water') == 0) {
            [
                'minecraft:flint_and_steel',
                'starry_map:abyssal_whale_wreckage',
                'starry_map:spirit_lizard_shard',
                'starry_map:wild_bee_shard',
                'starry_map:viper_barrel'
            ].forEach((itemId, index) => {
                // 判断玩家手持物品是否在样本数组中
                if (itemId !== item?.typeId)
                    return;
                // 如果是打火石 则进入点火逻辑
                if (index == 0) {
                    opal.TrySetPermutation(block, 'STATE:flame', 1);
                    player?.playSound('fire.ignite');
                    player.sendMessage(flamePrompt);
                }
                // 如果是食材 则进入放水逻辑
                else {
                    player.sendMessage({ rawtext: [{ text: '§9§l已放入 §r' }, opal.translate(item), waterPrompt] });
                    opal.ConsumeItemStack(container, player.selectedSlotIndex, item);
                    opal.TrySetPermutation(block, 'STATE:water', index);
                    player?.playSound('bucket.empty_water');
                }
            });
            // 如果并未 放入食材 且 手持物品 是 熟食 则直接放入
            if (state.getState('STATE:water') == 0 && item.hasTag('minecraft:is_cooked')) {
                player.sendMessage({ rawtext: [{ text: '已放入 ' }, opal.translate(item), waterPrompt] });
                opal.ConsumeItemStack(container, player.selectedSlotIndex, item);
                opal.TrySetPermutation(block, 'STATE:water', 9);
                player?.playSound('bucket.empty_water');
            }
        }
        // === 烹饪进行阶段 ===
        else if (state.getState('STATE:flame') == 1 && state.getState('STATE:water') != 0 && state.getState('STATE:count') != 9) {
            player.sendMessage({ text: `§m§l锅中咕嘟作响, 还需要再搅拌${9 - state.getState('STATE:count')}次...§r` });
            opal.TrySetPermutation(block, 'STATE:count', state.getState('STATE:count') + 1);
            player?.playSound('random.swim');
        }
        // === 烹饪结束阶段 ===
        else if (state.getState('STATE:flame') == 1 && state.getState('STATE:water') != 0 && state.getState('STATE:count') == 9) {
            /**
             * 食物刷新点
             */
            const bottomCenter = block.above()?.bottomCenter();
            // 如果获取不到底部中心点则返回
            if (!bottomCenter)
                return;
            // 如果玩家没有放入调料则返回
            if (!item.hasTag('tags:item_delicacies.sauce')) {
                player.sendMessage({ rawtext: [{ text: '§v§l还没放调料呢...请先放入§r ' }, opal.translate('starry_map:unknown_dipping_sauce', 'item')] });
                return;
            }
            ;
            // 根据锅内水类型判断输出类型
            switch (state.getState('STATE:water')) {
                // 如果输出类型应该是原版汤
                case 9:
                    /**
                     ** 物品生成锚点
                     */
                    const anchor = opal.Vector.toString(bottomCenter, { delimiter: ' ' });
                    // 随机生成汤
                    dimension.runCommand(`loot spawn ${anchor} loot random_soup`);
                    break;
                case 1:
                    const food_1 = [
                        'starry_map:charcoal_roasted_abyssal_whale',
                        'starry_map:abyssal_whale_soup'
                    ];
                    opal.TrySpawnItem(dimension, new server.ItemStack(food_1[opal.RandomFloor(0, 1)]), bottomCenter);
                    break;
                case 2:
                    const food_2 = [
                        'starry_map:spirit_lizard_delicacy',
                        'starry_map:spirit_lizard_apple'
                    ];
                    opal.TrySpawnItem(dimension, new server.ItemStack(food_2[opal.RandomFloor(0, 1)]), bottomCenter);
                    break;
                case 3:
                    const food_3 = [
                        'starry_map:bee_fire_cuisine',
                        'starry_map:charcoal_roasted_wild_bee',
                        'starry_map:wild_bee_roasted_chicken'
                    ];
                    opal.TrySpawnItem(dimension, new server.ItemStack(food_3[opal.RandomFloor(0, 2)]), bottomCenter);
                    break;
                case 4:
                    const food_4 = [
                        'starry_map:curry_viper'
                    ];
                    opal.TrySpawnItem(dimension, new server.ItemStack(food_4[0]), bottomCenter);
                    break;
                default: break;
            }
            ;
            // 重置方块状态
            opal.TrySetPermutation(block, 'STATE:flame', 0);
            opal.TrySetPermutation(block, 'STATE:water', 0);
            opal.TrySetPermutation(block, 'STATE:count', 0);
            // 播放音效
            player?.playSound('bucket.empty_water');
            // 清除玩家手持的调料
            opal.ConsumeItemStack(container, player.selectedSlotIndex, item);
        }
    }
});
/*
 * 金属伪装
 */
components.set(componentPrefix + 'metal_camouflage', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 判断玩家和玩家背包是否存在
        if (!analysis.player || !analysis.container)
            return;
        /**
         ** 当前手持物品
         */
        const item = analysis.container.getItem(analysis.player.selectedSlotIndex);
        if (!item)
            return;
        // 修改方块纹理
        switch (item?.typeId) {
            case 'minecraft:gold_block':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 1);
                break;
            case 'minecraft:iron_block':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 2);
                break;
            case 'minecraft:emerald_block':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 3);
                break;
            case 'minecraft:diamond_block':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 4);
                break;
            case 'minecraft:lapis_block':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 5);
                break;
            case 'minecraft:netherite_block':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 6);
                break;
            case 'minecraft:copper_block':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 7);
                break;
            case 'minecraft:redstone_block':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 8);
                break;
            default: break;
        }
        ;
        // 播放音效
        analysis.player?.playSound('fire.ignite');
    }
});
/*
 * 木质伪装
 */
components.set(componentPrefix + 'wood_camouflage', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 判断玩家和玩家背包是否存在
        if (!analysis.player || !analysis.container)
            return;
        /**
         ** 当前手持物品
         */
        const item = analysis.container?.getItem(analysis.player.selectedSlotIndex);
        if (!item)
            return;
        // 修改方块纹理
        switch (item?.typeId) {
            case 'minecraft:oak_planks':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 1);
                break;
            case 'minecraft:spruce_planks':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 2);
                break;
            case 'minecraft:birch_planks':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 3);
                break;
            case 'minecraft:jungle_planks':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 4);
                break;
            case 'minecraft:acacia_planks':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 5);
                break;
            case 'minecraft:dark_oak_planks':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 6);
                break;
            case 'minecraft:mangrove_planks':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 7);
                break;
            case 'minecraft:cherry_planks':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 8);
                break;
            case 'minecraft:bamboo_planks':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 9);
                break;
            case 'minecraft:crimson_planks':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 10);
                break;
            case 'minecraft:warped_planks':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 11);
                break;
            default: break;
        }
        ;
        // 播放音效
        analysis.player?.playSound('fire.ignite');
    }
});
/*
 * 石质伪装
 */
components.set(componentPrefix + 'stone_camouflage', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 判断玩家和玩家背包是否存在
        if (!analysis.player || !analysis.container)
            return;
        /**
         ** 当前手持物品
         */
        const item = analysis.container?.getItem(analysis.player.selectedSlotIndex);
        if (!item)
            return;
        // 修改方块纹理
        switch (item?.typeId) {
            case 'minecraft:polished_basalt':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 1);
                break;
            case 'minecraft:polished_granite':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 2);
                break;
            case 'minecraft:polished_diorite':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 3);
                break;
            case 'minecraft:polished_andesite':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 4);
                break;
            case 'minecraft:polished_blackstone':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 5);
                break;
            case 'minecraft:polished_deepslate':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 6);
                break;
            case 'minecraft:polished_tuff':
                opal.TrySetPermutation(analysis.block, 'STATE:texture', 7);
                break;
            default: break;
        }
        ;
        // 播放音效
        analysis.player?.playSound('fire.ignite');
    }
});
/*
 * 魔晶储罐
 */
components.set(componentPrefix + 'crystal_tank', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        /**
         ** 获取玩家
         */
        const player = analysis.player;
        /**
         ** 获取玩家背包
         */
        const container = player?.getComponent('minecraft:inventory')?.container;
        /**
         ** 缓存值
         */
        const caching = analysis.state.getState('STATE:caching');
        // 判断玩家是否满足触发条件
        if (!player || !container || !analysis.item?.getTags().includes('tags:energy_crystal.series'))
            return;
        // 判断物品是否属于 永恒魔晶石
        if (analysis.item?.getTags().includes('tags:eternal_crystal')) {
            /**
             ** 恒常-魔晶储罐
             */
            const constant = server.BlockPermutation.resolve('starry_map:constant_tank');
            // 播放音效与粒子效果
            opal.TrySpawnParticle(analysis.dimension, 'constant:smoke_rune_white', analysis.block.above()?.bottomCenter());
            opal.TrySpawnParticle(analysis.dimension, 'constant:smoke_rune_white', analysis.block.above()?.bottomCenter());
            analysis.player?.playSound('cauldron.explode');
            // 置换方块类型
            analysis.block.setPermutation(constant);
            // 清除物品
            opal.DeleteItemStack(container, new server.ItemStack(analysis.item.typeId));
        }
        else if (caching != 8) {
            // 赋值 方块状态
            opal.TrySetPermutation(analysis.block, 'STATE:caching', caching + 1);
            // 播放音效 与 粒子效果
            player.playSound('block.end_portal_frame.fill');
            // 清除物品
            opal.DeleteItemStack(container, new server.ItemStack(analysis.item.typeId));
        }
        else if (caching == 8) {
            // 播放音效与粒子效果
            analysis.player?.playSound('mob.shulker.bullet.hit');
            opal.TrySpawnParticle(analysis.dimension, 'constant:smoke_rune_white', analysis.block.above()?.bottomCenter());
            opal.TrySpawnParticle(analysis.dimension, 'constant:smoke_rune_white', analysis.block.above()?.bottomCenter());
            // 显示提示
            analysis.player?.sendMessage('§c容器已满载, 无法继续填充');
            // 赋值 方块状态
            opal.TrySetPermutation(analysis.block, 'STATE:output', 2);
        }
    }
});
/*
 * 熔岩质能
 */
components.set(componentPrefix + 'magma_power', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 判断玩家和玩家背包是否存在
        if (!analysis.player || !analysis.container)
            return;
        /**
         ** 当前手持物品
         */
        const item = analysis.item;
        // 检测物品
        if (!item || item?.typeId !== 'minecraft:lava_bucket')
            return;
        /**
         ** 获取方块状态
         */
        const magma = analysis.state.getState('STATE:magma');
        // 检测是否已满载
        if (magma == 15)
            return;
        // 修改方块纹理
        opal.TrySetPermutation(analysis.block, 'STATE:magma', magma + 1);
        // 播放音效
        analysis.player?.playSound('bucket.fill_lava');
        // 清除物品
        analysis.container.setItem(analysis.player.selectedSlotIndex);
        // 生成空铁桶
        opal.TrySpawnItem(analysis.dimension, new server.ItemStack('minecraft:bucket'), analysis.block.center());
    }
});
/*
 * 区块显示
 */
components.set(componentPrefix + 'region_display', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { block, item } = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (item?.typeId == block.typeId)
            return;
        /**
         * * 检测当前区块是否有能量
         */
        const testEnergy = opal.AlterEnergy(block, 0, false);
        /**
         * * 设定 区块显示 的 粒子类型
         */
        const showType = testEnergy[0] == true ? 'constant:pulse_rune_green' : 'constant:pulse_rune_red';
        // 显示 区块边界
        opal.DisplayChunkBoundary(block);
        //显示烟雾效果
        opal.TrySpawnParticle(block.dimension, showType, opal.Vector.add(block, opal.Vector.CONSTANT_HALF));
    }
});
/*
 * 诸界道标
 */
components.set(componentPrefix + 'road_sign_presets', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const { block, item } = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (item?.typeId == block.typeId)
            return;
        /**
         * * 诸界道标 数据信息
         */
        const RoadSign = new Map();
        /**
         * * 获取 玩家
         */
        const player = block.dimension.getPlayers({ location: block.location, maxDistance: 8, closest: 1 })[0];
        // 检测玩家是否使用过诸界道标
        if (!opal.TriggerControl('诸界道标:使用冷却', player, 20))
            return;
        // 获取 所有 道标
        player.getDynamicPropertyIds().filter(id => id.startsWith('road_sign:')).forEach(id => opal.CompileSign(player, id, RoadSign));
        /**
         * * 获取 道标名称
         */
        const name = Array.from(RoadSign.keys()).map(id => `§n§o§l§${Math.floor(Math.random() * 6)}` + id.split(':')[1]);
        /**
         * * 定义了 窗口界面 的 标题
         */
        const title = {
            text: "§9<§l 诸界道标 §r§9>"
        };
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().title(title);
        name.forEach(info => display.button(info, "textures/物品贴图/魔法书籍/空间宝典"));
        if (name.length == 0)
            return player.onScreenDisplay.setTitle("§4暂无 §9道标信息§r");
        // 显示窗口界面
        display.show(player).then(option => {
            //检测玩家是否退出窗口
            if (option.canceled || option.selection == undefined)
                return;
            /**
             * * 获取 道标参数
             */
            const value = Array.from(RoadSign.values());
            //执行传送流程 并 播放音效
            player.teleport(value[option.selection].location, { dimension: value[option.selection].dimension });
            server.system.runTimeout(() => player.playSound("mob.endermen.portal"), 5);
        });
    }
});
/*
 * 附魔分离
 */
components.set(componentPrefix + 'enchantment_dissociation', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        /**
         ** 进行交互的玩家
         */
        const player = analysis.player;
        /**
         ** 机器下方的方块对象
         */
        const below = analysis.block.below();
        /**
         ** 机器下方的物品容器
         */
        const container = below?.getComponent('minecraft:inventory')?.container;
        /**
         ** 获取物品附魔
         */
        const enchantable = analysis.item?.getComponent('minecraft:enchantable');
        /**
         ** 获取全部附魔条目
         */
        const enchantments = enchantable?.getEnchantments();
        /**
         * * 尝试分离附魔书
         *
         * @param {server.Enchantment[]} enchantments - 获取物品附魔条目
         *
         * @param {server.Container} container - 机器下方的物品容器
         *
         * @param {server.Block} block - 机器下方的方块对象
         *
         * @param {server.ItemEnchantableComponent} enchantable - 获取物品附魔组件
         */
        function dissociation(enchantments, container, block, enchantable) {
            /**
             ** 获取附魔条目的数量
             */
            const number = enchantments.length;
            /**
             ** 定于需要消耗的书本
             */
            const blockItem = new server.ItemStack('minecraft:book', number);
            /**
             ** 粒子显示锚点
             */
            const anchor = opal.Vector.add(block.center(), { x: 0, y: 2, z: 0 });
            // 检测物品是否足够
            if (!opal.CheckItemStack(container, [blockItem]))
                return opal.ErrorMessage('<§l§b 附魔分离 §r>§4 发生错误§r', block, { text: '未能在<§l§3 方块容器 §r>内获取到足够数量的<§l§u 书本 §r>' });
            // 判断能量是否足够
            if (!opal.ExpendEnergy(analysis.block, -number * 1000))
                return;
            // 删除 普通书本
            opal.DeleteItemStack(container, blockItem);
            // 添加 附魔书
            enchantments.forEach(enchantment => {
                /**
                 ** 附魔书的物品对象
                 */
                const item = new server.ItemStack('minecraft:enchanted_book');
                /**
                 * * 物品掉落位置
                 */
                const location = block.above(2)?.bottomCenter() ?? block.center();
                // 写入附魔效果
                item.getComponent('minecraft:enchantable')?.addEnchantment(enchantment);
                // 掉落 附魔书
                const book = opal.TrySpawnItem(block.dimension, item, location);
                // 移动到指定位置
                if (book instanceof server.Entity)
                    book.teleport(location);
            });
            // 播放音效
            analysis.player?.playSound('block.enchanting_table.use');
            // 显示 粒子效果
            opal.TrySpawnParticle(block.dimension, 'constant:erupt_rune_purple', anchor);
            opal.TrySpawnParticle(block.dimension, 'constant:impact_rune_purple', anchor);
            opal.TrySpawnParticle(block.dimension, 'constant:excite_rune_purple', anchor);
            // 清除 物品附魔
            enchantable?.removeAllEnchantments();
        }
        // 检测方块与物品容器是否有效
        if (!below || !container)
            return opal.ErrorMessage('<§l§b 附魔分离 §r>§4 发生错误§r', analysis.block, { text: '未能在设备下方找到合适的<§l§3 方块容器 §r>' });
        // 检测玩家与附魔是否有效
        if (!player || !enchantable || !enchantments)
            return;
        // 检测 附魔条目数量
        if (enchantments.length == 0)
            return;
        // 尝试分离附魔书
        dissociation(enchantments, container, below, enchantable);
        // 置换 玩家 手持的物品
        analysis.container?.setItem(player.selectedSlotIndex, analysis.item);
    }
});
/*
 * 魔晶充能
 */
components.set(componentPrefix + 'star_energy_infusion', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 设定使用间隔
        if (!opal.TriggerControl('消耗星尘力补充物品数值', analysis.block, 20))
            return;
        /**
         * * 恢复物品耐久
         */
        function RestoreDurabilit() {
            /**
             * * 获取物品耐久组件
             */
            const durability = analysis.item?.getComponent('minecraft:durability');
            // 检测能量是否足够
            if (!durability || durability.damage == 0 || !opal.ExpendEnergy(analysis.block, -durability.damage * 5))
                return;
            // 恢复耐久
            durability.damage = 0;
            // 置换 玩家 手持的物品
            analysis.container?.setItem(analysis.player?.selectedSlotIndex ?? 0, analysis.item);
            // 显示 特效
            ChargingSpecialEffects();
        }
        ;
        /**
         * * 恢复列车能量
         */
        function RestoreVehiclePower() {
            /**
             ** 获取物品的能量属性
             */
            const power = analysis.item?.getDynamicProperty('energy:offline_vehicle_power') ?? 3500;
            // 检测能量是否足够
            if (!opal.ExpendEnergy(analysis.block, -10000) || power >= 1000000)
                return;
            // 恢复列车能量
            analysis.item?.setDynamicProperty('energy:offline_vehicle_power', power + 10000);
            analysis.item?.setLore([`<§9§o§l 剩余能量 §r>: ${power + 10000}`]);
            // 置换 玩家 手持的物品
            analysis.container?.setItem(analysis.player?.selectedSlotIndex ?? 0, analysis.item);
            // 显示 特效
            ChargingSpecialEffects();
        }
        ;
        /**
         * * 显示 特效
         */
        function ChargingSpecialEffects() {
            /**
             * * 定义 粒子参数
             */
            const molang = new server.MolangVariableMap();
            /**
             ** 粒子射流方向
             */
            const direction = opal.Vector.difference(analysis.block.center(), analysis.player?.location ?? { x: 0, y: 0, z: 0 });
            // 设置 粒子参数
            molang.setFloat('variable.type', 0);
            molang.setVector3('variable.direction', direction);
            // 显示 粒子效果
            opal.TrySpawnParticle(analysis.block.dimension, 'scripts:path_ray', analysis.block.center(), molang);
            opal.TrySpawnParticle(analysis.block.dimension, 'constant:erupt_rune_purple', analysis.block.center());
            opal.TrySpawnParticle(analysis.block.dimension, 'constant:excite_rune_purple', analysis.block.center());
            // 播放音效
            analysis.player?.playSound('block.enchanting_table.use');
        }
        ;
        // 检测物品是否包含对应标签
        if (analysis.item?.hasTag('tags:use_energy_to_restore_vehicle_power'))
            return RestoreVehiclePower();
        if (analysis.item?.hasTag('tags:use_energy_to_restore_durability'))
            return RestoreDurabilit();
    }
});
/*
 * 强化魔晶充能
 */
components.set(componentPrefix + 'super_star_energy_infusion', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        // 设定使用间隔
        if (!opal.TriggerControl('消耗星尘力补充物品数值', analysis.block, 20))
            return;
        /**
         * * 恢复物品耐久
         */
        function RestoreDurabilit() {
            /**
             * * 获取物品耐久组件
             */
            const durability = analysis.item?.getComponent('minecraft:durability');
            // 检测能量是否足够
            if (!durability || durability.damage == 0 || !opal.ExpendEnergy(analysis.block, -durability.damage * 5))
                return;
            // 恢复耐久
            durability.damage = 0;
            // 置换 玩家 手持的物品
            analysis.container?.setItem(analysis.player?.selectedSlotIndex ?? 0, analysis.item);
            // 为玩家附加状态效果增益
            analysis.player?.addEffect('minecraft:saturation', 100, { amplifier: 1, showParticles: false });
            analysis.player?.addEffect('minecraft:speed', 100, { amplifier: 1, showParticles: false });
            analysis.player?.addEffect('minecraft:haste', 100, { amplifier: 1, showParticles: false });
            // 显示 特效
            ChargingSpecialEffects();
        }
        ;
        /**
         * * 恢复列车能量
         */
        function RestoreVehiclePower() {
            /**
             ** 获取物品的能量属性
             */
            const power = analysis.item?.getDynamicProperty('energy:offline_vehicle_power') ?? 3500;
            // 检测能量是否足够
            if (!opal.ExpendEnergy(analysis.block, -10000) || power >= 1000000)
                return;
            // 恢复列车能量
            analysis.item?.setDynamicProperty('energy:offline_vehicle_power', power + 30000);
            analysis.item?.setLore([`<§9§o§l 剩余能量 §r>: ${power + 30000}`]);
            // 置换 玩家 手持的物品
            analysis.container?.setItem(analysis.player?.selectedSlotIndex ?? 0, analysis.item);
            // 显示 特效
            ChargingSpecialEffects();
        }
        ;
        /**
         * * 显示 特效
         */
        function ChargingSpecialEffects() {
            /**
             * * 定义 粒子参数
             */
            const molang = new server.MolangVariableMap();
            /**
             ** 粒子射流方向
             */
            const direction = opal.Vector.difference(analysis.block.center(), analysis.player?.location ?? { x: 0, y: 0, z: 0 });
            // 设置 粒子参数
            molang.setFloat('variable.type', 0);
            molang.setVector3('variable.direction', direction);
            // 显示 粒子效果
            opal.TrySpawnParticle(analysis.block.dimension, 'scripts:path_ray', analysis.block.center(), molang);
            opal.TrySpawnParticle(analysis.block.dimension, 'constant:erupt_rune_purple', analysis.block.center());
            opal.TrySpawnParticle(analysis.block.dimension, 'constant:excite_rune_purple', analysis.block.center());
            // 播放音效
            analysis.player?.playSound('block.enchanting_table.use');
        }
        ;
        // 检测物品是否包含对应标签
        if (analysis.item?.hasTag('tags:use_energy_to_restore_vehicle_power'))
            return RestoreVehiclePower();
        else
            return RestoreDurabilit();
    }
});
/*
 * 曜石熔炉
 */
components.set(componentPrefix + 'obsidian_furnace', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        if (!analysis.player || !analysis.container)
            return;
        /**
         ** 当前手持物品
         */
        const item = analysis.container.getItem(analysis.player.selectedSlotIndex);
        // 检测物品
        if (!item)
            return;
        if (item.typeId === 'starry_map:compressed_stone') {
            /**
             ** 获取方块状态
             */
            const material = analysis.state.getState('STATE:material');
            if (material != 8) {
                // 赋值方块状态
                opal.TrySetPermutation(analysis.block, 'STATE:material', material + 1);
                // 清除物品
                opal.DeleteItemStack(analysis.container, new server.ItemStack(item.typeId));
            }
            else
                analysis.player.onScreenDisplay.setTitle('§d剩余空间不足, 无法填充');
            // 播放音效
            analysis.player?.playSound('use.stone');
        }
        ;
        if (item.typeId === 'minecraft:bucket') {
            /**
             ** 获取方块状态
             */
            const magma = analysis.state.getState('STATE:magma');
            /**
             ** 物品生成锚点
             */
            const anchor = opal.Vector.toString(analysis.block.above()?.bottomCenter(), { delimiter: ' ' });
            // 检测方块状态
            if (magma == 0)
                analysis.player.onScreenDisplay.setTitle('§d储备不足, 无法提取');
            else {
                analysis.dimension.runCommand(`loot spawn ${anchor} loot "iron_bucket/lava"`);
                // 修改方块状态
                opal.TrySetPermutation(analysis.block, 'STATE:magma', magma - 1);
                // 播放音效
                analysis.player?.playSound('bucket.empty_lava');
                // 清除物品
                opal.DeleteItemStack(analysis.container, new server.ItemStack(item.typeId));
            }
        }
    }
});
/*
 * 曜石储罐
 */
components.set(componentPrefix + 'obsidian_storage_tank', {
    onPlayerInteract(source) {
        /**
         * * 方块组件参数 的 解构
         */
        const analysis = InteractComponentTrigger(source);
        // 检测是否使用了正确道具
        if (analysis.item?.typeId == analysis.block.typeId)
            return;
        if (!analysis.player || !analysis.container)
            return;
        /**
         ** 当前手持物品
         */
        const item = analysis.container.getItem(analysis.player.selectedSlotIndex);
        // 检测物品
        if (!item)
            return;
        if (item.typeId === 'minecraft:bucket') {
            /**
             ** 获取方块状态
             */
            const magma = analysis.state.getState('STATE:magma');
            /**
             ** 物品生成锚点
             */
            const anchor = opal.Vector.toString(analysis.block.above()?.bottomCenter(), { delimiter: ' ' });
            // 检测方块状态
            if (magma == 0)
                analysis.player.onScreenDisplay.setTitle('§d熔岩不足, 无法提取');
            else {
                analysis.dimension.runCommand(`loot spawn ${anchor} loot "iron_bucket/lava"`);
                // 修改方块状态
                opal.TrySetPermutation(analysis.block, 'STATE:magma', magma - 1);
                // 播放音效
                analysis.player?.playSound('bucket.empty_lava');
                // 清除物品
                opal.DeleteItemStack(analysis.container, new server.ItemStack(item.typeId));
            }
        }
        ;
        if (item.typeId === 'minecraft:lava_bucket') {
            /**
             ** 获取方块状态
             */
            const magma = analysis.state.getState('STATE:magma');
            /**
             ** 物品生成锚点
             */
            const anchor = opal.Vector.toString(analysis.block.above()?.bottomCenter(), { delimiter: ' ' });
            // 检测方块状态
            if (magma == 15)
                analysis.player.onScreenDisplay.setTitle('§d容量不足, 无法填充');
            else {
                analysis.dimension.runCommand(`loot spawn ${anchor} loot "iron_bucket/empty"`);
                // 修改方块状态
                opal.TrySetPermutation(analysis.block, 'STATE:magma', magma + 1);
                // 播放音效
                analysis.player?.playSound('bucket.fill_lava');
                // 清除物品
                opal.DeleteItemStack(analysis.container, new server.ItemStack(item.typeId));
            }
        }
        ;
    }
});
/*
 * 容器枢纽
 */
components.set(componentPrefix + 'container_hub', {
    async onPlayerInteract(source) {
        // 解构参数并验证基础条件
        const { player, block, item, container } = InteractComponentTrigger(source);
        // 判断是否完成了事件触发器的冷却
        if (!opal.TriggerControl('容器枢纽_玩家点击', block, 10))
            return;
        // 判断事件返回的对象是否完整可用
        if (!player || !item || !container)
            return;
        // 判断是否成功获取到能量
        if (!opal.ExpendEnergy(block, -10))
            return;
        /**
         * 获取容器查询结果
         */
        let searchResults = opal.SearchContainers(block, item, 8);
        // 如果没有找到容器, 放宽条件重新搜索
        if (searchResults.length === 0)
            searchResults = opal.SearchContainers(block);
        // 统一处理搜索结果
        if (searchResults.length === 0) {
            player.sendMessage('§c未能找到存放<§9 当前物品 §c>的<§v 可用容器 §c>');
            player.playSound('respawn_anchor.deplete');
        }
        else {
            injectContainers(block, item, container, player.selectedSlotIndex, searchResults);
            player.playSound('respawn_anchor.charge');
        }
    }
});
/**
 * 将物品注入目标容器中。
 *
 * @param {server.Block} block - 操作的方块对象。
 *
 * @param {server.ItemStack} item - 要存放的物品。
 *
 * @param {server.Container} container - 玩家背包或其他来源容器。
 *
 * @param {number} slot - 玩家背包中选中的槽位索引。
 *
 * @param {ReturnType<typeof SearchContainers>} params - 搜索得到的目标容器和方块结果数组。
 */
function injectContainers(block, item, container, slot, params) {
    /**
     * * 获取目标容器和目标方块
     */
    const [targetContainer, targetBlock] = params[0];
    // 将物品添加到方块容器中
    targetContainer.addItem(item);
    // 从玩家背包中移除物品
    container?.setItem(slot);
    // 设置一个自由指针, 指向方块位置
    opal.SetFreePointer({ location: block.bottomCenter(), dimension: block.dimension }, targetBlock.bottomCenter(), 1);
}
;
/*
 * 遗落档案
 */
components.set(componentPrefix + 'document_display', {
    onPlayerInteract(source, data) {
        /**
         * 解构交互事件对象, 获取玩家、物品、方块和维度信息
         */
        const { player, item, block, dimension } = InteractComponentTrigger(source);
        // 如果玩家使用的物品与方块类型相同, 则不执行任何操作
        if (item?.typeId === block.typeId)
            return;
        // 检查玩家是否在 60tick 的间隔内触发过此事件, 如果是则不执行操作
        if (!player || !opal.TriggerControl('查询与显示档案馆遗失的数据终端', player, 20))
            return;
        /**
         * 从方块状态中获取关联的档案内容字符串
         */
        const archives = data.params.archives || '开发者名单';
        /**
         * 创建一个新的 Molang 变量映射, 用于设置粒子效果参数
         */
        const molang = new server.MolangVariableMap();
        // 设置粒子大小为 4
        molang.setFloat('variable.size', 4);
        // 设置粒子方向为 3
        molang.setFloat('variable.direction', 3);
        /**
         * 获取方块上方中心点的坐标, 如果上方没有方块则使用当前方块中心点
         */
        const anchor = block.above()?.bottomCenter() || block.bottomCenter();
        // 对玩家播放一个音效, 表示交互已发生
        player.playSound('conduit.activate');
        // 尝试在指定维度和坐标处生成圆环粒子效果
        opal.TrySpawnParticle(dimension, 'scripts:path_round', block.bottomCenter(), molang);
        // 尝试在指定维度和坐标处生成钻石粒子效果
        opal.TrySpawnParticle(dimension, 'scripts:path_star4_small', block.center(), molang);
        // 尝试在指定维度和坐标处生成蝴蝶粒子效果
        opal.TrySpawnParticle(dimension, 'scripts:path_butterfly', anchor, molang);
        // 创建一个新的ActionFormData实例, 用于显示档案内容的界面
        new serverUI
            .ActionFormData()
            // 设置界面的标题为方块翻译后的名称
            .title(opal.translate(block))
            // 设置界面的正文为档案内容的Lexicon界面
            .body(opal.lexiconInterface(player, archives, true))
            // 添加一个关闭按钮, 使用红色加粗文本样式
            .button('§4§l关闭§r')
            // 显示界面给玩家
            .show(player);
    }
});
/**
 * * 离线档案
 */
components.set(componentPrefix + 'document_display_expire', {
    /**
     * 当玩家与档案馆遗失数据终端发生交互时触发
     *
     * @param {server.BlockComponentPlayerInteractEvent} source - 交互事件对象
     */
    onPlayerInteract(source) {
        /**
         * 解构交互事件对象, 获取玩家、物品、方块和维度信息
         *
         * @param {INTERACT_COMPONENT} InteractComponentTrigger - 提供交互事件数据的函数
         *
         * @returns {{player: Player, item: Item | null, block: Block, dimension: Dimension}}
         */
        const { player, item, block, dimension } = InteractComponentTrigger(source);
        /**
         * 如果玩家使用的物品与方块类型相同则取消操作
         *
         * @returns {void}
         */
        if (item?.typeId === block.typeId)
            return;
        /**
         * 检查是否在60tick内触发过此事件
         *
         * 该检查用于防止快速点击或连续触发重复操作
         *
         * @param {number} 间隔 - 60tick的间隔
         *
         * @returns {boolean}
         */
        if (!player || !opal.TriggerControl('查询与显示档案馆遗失的数据终端', player, 60))
            return;
        /**
         * 创建用于设置粒子效果参数的 Molang 变量映射
         *
         * @param {server.MolangVariableMap} molang - Molang变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 获取当前方块上方中心点的坐标, 若上方没有方块则使用自身中心点
         *
         * @param {Block} block - 方块对象
         *
         * @returns {Coordinates} 坐标点
         */
        const anchor = block.above()?.bottomCenter() || block.bottomCenter();
        /**
         * 定义成功交互后的回调函数
         */
        const isSuccess = () => {
            player.playSound('respawn_anchor.charge');
            molang.setFloat('variable.size', 4);
            molang.setFloat('variable.direction', 3);
            /**
             * 在指定维度和坐标生成不同类型的粒子效果
             *
             * @param {Dimension} dimension - 维度对象
             *
             * @param {string} particleScript - 粒子效果脚本名
             *
             * @param {Coordinates} position - 粒子生成位置
             */
            opal.TrySpawnParticle(dimension, 'scripts:path_round', block.bottomCenter(), molang);
            opal.TrySpawnParticle(dimension, 'scripts:path_star4_small', block.center(), molang);
            opal.TrySpawnParticle(dimension, 'scripts:path_butterfly', anchor, molang);
        };
        /**
         * 根据随机数选择不同的档案馆类型进行处理
         */
        switch (opal.RandomFloor(0, 9)) {
            case 1:
                dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.abyss_whale_emperor'));
                player.onScreenDisplay.setActionBar([
                    { text: '§9§l联网校验成功, 已成功加载: §u' },
                    opal.translate('starry_map:document.abyss_whale_emperor', 'block')
                ]);
                isSuccess();
                break;
            case 2:
                dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.tyrannosaurus_rex'));
                player.onScreenDisplay.setActionBar([
                    { text: '§9§l联网校验成功, 已成功加载: §u' },
                    opal.translate('starry_map:document.tyrannosaurus_rex', 'block')
                ]);
                isSuccess();
                break;
            case 3:
                dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.wild_wasp_emperor'));
                player.onScreenDisplay.setActionBar([
                    { text: '§9§l联网校验成功, 已成功加载: §u' },
                    opal.translate('starry_map:document.wild_wasp_emperor', 'block')
                ]);
                isSuccess();
                break;
            case 4:
                dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.wild_wasp_guide'));
                player.onScreenDisplay.setActionBar([
                    { text: '§9§l联网校验成功, 已成功加载: §u' },
                    opal.translate('starry_map:document.wild_wasp_guide', 'block')
                ]);
                isSuccess();
                break;
            case 4:
                dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.amber_jasmine'));
                player.onScreenDisplay.setActionBar([
                    { text: '§9§l联网校验成功, 已成功加载: §u' },
                    opal.translate('starry_map:document.amber_jasmine', 'block')
                ]);
                isSuccess();
                break;
            default:
                // 先生成特效粒子效果
                opal.TrySpawnParticle(dimension, 'constant:erupt_rune_orange', block.center());
                opal.TrySpawnParticle(dimension, 'constant:smoke_rune_green', block.center());
                opal.TrySpawnParticle(dimension, 'constant:smoke_rune_blue', block.center());
                opal.TrySpawnParticle(dimension, 'constant:smoke_rune_red', block.center());
                // 更新玩家提示信息和播放音效
                player.onScreenDisplay.setTitle({ text: '§c§l联网校验失败, 模块已损毁...§r' });
                player.playSound('respawn_anchor.deplete');
                player.playSound('item.trident.thunder');
                // 根据条件生成不同的实体
                server.system.run(() => {
                    if (block.isLiquid) {
                        opal.TrySpawnEntity(dimension, 'starry_map:abyss_whale.detection.point', block.center());
                    }
                    else {
                        opal.TrySpawnEntity(dimension, 'starry_map:viper.support', block.center());
                    }
                });
                // 设置方块为空气
                dimension.setBlockPermutation(block, server.BlockPermutation.resolve('minecraft:air'));
        }
    }
});
/*
 * 扩散填充
 */
components.set(componentPrefix + 'diffusion_filling', {
    onPlayerInteract(source, data) {
        //todo 事件预处理
        /**
         * 解构交互事件对象, 获取关键参数：
         *
         * - player: 触发事件的玩家对象
         *
         * - item: 玩家手持物品信息
         *
         * - block: 被交互的目标方块
         *
         * - dimension: 方块所在的维度对象
         */
        const { player, item, block, dimension } = InteractComponentTrigger(source);
        /*
         * 阻止使用相同类型物品的交互（避免干扰正常使用）
         */
        if (item?.typeId === block.typeId)
            return;
        /*
         * 交互频率控制（60 tick = 3秒冷却, 防止滥用）
         */
        if (!player || !opal.TriggerControl('使用 扩散填充 进行方块置换', player, 10))
            return;
        //todo 参数初始化
        /**
         * 方向映射表, 用于根据方块状态获取扩散方向的配置。
         */
        const directionMap = new Map([
            ['all', opal.Vector.CONSTANT_ALL],
            ['horizontal', opal.Vector.CONSTANT_HORIZONTAL],
            ['vertical', opal.Vector.CONSTANT_VERTICAL]
        ]);
        /**
         * 参数对象, 包含扩散的最大数量、扩散方向、原型方块、目标方块和消耗的方块。
         */
        let { max_number: maxNumber, directions, proto_blocks, target_block: targetBlockId, expense } = data.params;
        // TODO 参数校验
        if (!maxNumber || !directions || !proto_blocks || !targetBlockId || !expense)
            return;
        /**
         * 获取扩散方向的配置。
         *
         * @returns {opal.Vector[]} 扩散方向的向量数组。
         */
        const directionVector = directionMap.get(directions) || opal.Vector.CONSTANT_DOWN_HORIZONTAL;
        /**
         * 允许被替换的原始方块类型集合（用 | 分隔）
         *
         * @type {Set<string>}
         */
        const protoBlockIds = new Set(proto_blocks);
        //todo 置换系统初始化
        try {
            /**
             * 广度优先搜索队列：
             *
             * - 使用队列结构实现扩散效果
             *
             * - 初始包含被点击的方块
             *
             * @type {server.Block[]}
             */
            const blocksToMine = [block];
            /**
             * 已替换方块计数器
             *
             * @type {number}
             */
            let minedCount = 0;
            /**
             * 循环运行标志位
             *
             * @type {boolean}
             */
            let keepRun = true;
            /**
             * 每 tick 处理次数（分摊计算压力）
             *
             * @type {number}
             */
            const magnification = 100;
            /**
             * 存储每 tick 的 ID
             */
            const tickIds = [];
            /*
             * 如果目标方块为 'items_in_hand', 则使用玩家手持物品的 ID 进行替换
             */
            if (targetBlockId == 'items_in_hand') {
                /**
                 * 物品ID映射表, 用于根据物品 ID 获取对应的方块 ID
                 */
                const itemMap = new Map([
                    ['minecraft:powder_snow_bucket', 'minecraft:powder_snow'],
                    ['minecraft:water_bucket', 'minecraft:water'],
                    ['minecraft:lava_bucket', 'minecraft:lava']
                ]);
                /**
                 * 玩家手持物品的 ID
                 *
                 * @type {string}
                 */
                const itemId = itemMap.get(item?.typeId ?? '') || item?.typeId || 'minecraft:air';
                /**
                 * 允许玩家自定义的物品的白名单
                 *
                 * @type {Set<string>}
                 */
                const ItemWhitelist = new Set([
                    "minecraft:grass_block",
                    "minecraft:netherrack",
                    "minecraft:end_stone",
                    "minecraft:deepslate",
                    "minecraft:red_sand",
                    "minecraft:stone",
                    "minecraft:water",
                    "minecraft:sand",
                    "minecraft:dirt"
                ]);
                /*
                 * 如果玩家拥有权限, 则使用物品 ID 进行替换, 否则使用白名单进行判断
                 */
                if (opal.isPlayerAuthorized(player) && itemId !== 'minecraft:air')
                    targetBlockId = itemId;
                /*
                 * 如果玩家没有权限, 则使用白名单进行判断
                 */
                else if (ItemWhitelist.has(itemId))
                    targetBlockId = itemId;
                /*
                 * 如果玩家没有手持物品, 则终止事件处理函数
                 */
                else
                    return player.onScreenDisplay.setActionBar({ text: '§c§l很抱歉, 您目前不能使用这个方块进行替换§r' });
            }
            ;
            /**
             * * 构建 目标方块 属性对象
             */
            const construct = server.BlockPermutation.resolve(targetBlockId);
            //todo 终止事件处理函数
            /**
             * 终止事件处理函数：
             *
             * 1. 清除定时器
             *
             * 2. 播放提示音效
             *
             * 3. 记录运行日志
             *
             * 4.支付代价
             */
            const stopEvent = () => {
                // 设置终止标志
                keepRun = false;
                // 清除定时器
                tickIds.forEach(id => server.system.clearRun(id));
                // 播放提示音效
                player.playSound('chime.amethyst_block');
                // 支付消耗
                if (expense !== "create" && typeof expense == 'number')
                    opal.ExpendEnergy(block, minedCount * -(expense || 100));
                // 记录运行日志
                //console.log(`[扩散填充] 操作终止 | 已替换 ${minedCount}/${maxNumber} 个方块 | 队列剩余 ${blocksToMine.length} | 扩散填充费用: ${expense}`);
            };
            //todo 异步处理任务
            /**
             * 定时任务核心逻辑（每tick执行）：
             *
             * 1. 使用 magnification 控制每 tick 处理量
             *
             * 2. 采用广度优先算法遍历相邻方块
             *
             * 3. 执行方块替换并更新队列
             */
            const execute = () => {
                // 循环处理任务
                for (let index = 0; index < magnification && keepRun; index++) {
                    /*
                     * 终止条件检测（队列空、达到上限、手动终止）
                     */
                    if (blocksToMine.length === 0 || minedCount >= maxNumber || !keepRun)
                        return stopEvent();
                    /**
                     * 从队列头部取出当前处理方块
                     *
                     * @type {server.Block | undefined}
                     */
                    const currentBlock = blocksToMine.shift();
                    /*
                     * 判断 方块是否存在 否则 终止事件运行
                     */
                    if (!currentBlock)
                        return stopEvent();
                    // 尝试执行方块替换
                    try {
                        execute(currentBlock);
                    }
                    catch (error) {
                        /**
                         * 获取 错误信息
                         */
                        const info = error instanceof Error ? error : new Error(String(error));
                        opal.ErrorMessage('< 扩散填充 >在执行时发生错误', block, { text: info.message });
                        stopEvent();
                    }
                }
                ;
                /**
                 * 处理当前方块的相邻方块替换逻辑, 实现扩散填充功能
                 *
                 * @param {server.Block} currentBlock - 当前方块对象, 用于计算相邻方块的位置
                 */
                function execute(currentBlock) {
                    /*
                     * 遍历所有指定方向的相邻方块
                     */
                    for (const direction of directionVector) {
                        /**
                         * 获取相邻方块
                         *
                         * @type {server.Block | undefined}
                         */
                        const adjacentBlock = currentBlock.offset(direction);
                        /*
                         * 有效性验证（存在性 + 类型匹配）
                         */
                        if (!adjacentBlock || adjacentBlock.typeId === targetBlockId || !opal.TemplateMatcher(protoBlockIds, adjacentBlock.typeId))
                            continue;
                        /*
                         * 异步执行方块替换（确保主线程不阻塞）
                         */
                        tickIds.push(server.system.run(() => adjacentBlock.setPermutation(construct)));
                        /**
                         * 更新队列和计数器
                         */
                        blocksToMine.push(adjacentBlock);
                        minedCount++;
                    }
                }
            };
            // 创建定时器
            tickIds.push(server.system.runInterval(execute));
            /*
             * 立即替换被点击的初始方块
             */
            dimension.setBlockPermutation(block, construct);
        }
        catch (error) {
            /**
             * 获取 错误信息
             */
            const info = error instanceof Error ? error : new Error(String(error));
            // 记录错误信息
            opal.ErrorMessage('< 扩散填充 >在构建时发生错误', block, { text: info.message });
        }
    }
});
/*
 * 状态值增加组件
 */
components.set(componentPrefix + 'state_value_increase', {
    onPlayerInteract(source, data) {
        /**
         * 解构交互事件对象, 获取关键参数：
         *
         * - player: 触发事件的玩家对象
         *
         * - item: 玩家手持物品信息
         *
         * - block: 被交互的目标方块
         *
         * - dimension: 方块所在的维度对象
         */
        const { player, item, block, state } = InteractComponentTrigger(source);
        /**
         * 检查玩家的交互是否符合预期条件:
         *
         * - item 类型是否与目标方块类型一致
         *
         * - 物品是否携带默认标签（确保物品属于该组件的有效范围）
         */
        if (item?.typeId !== block.typeId && !item?.hasTag(defaultTag))
            return;
        /**
         * 获取需要修改的属性名
         */
        const type = data.params.revise;
        /**
         * 获取 可能存在的提示信息
         */
        const message = data.params.message;
        // 确认参数是否完整
        if (!type || !message)
            return;
        /**
         * 获取需要修改的属性的当前值
         */
        const value = state.getState(type);
        /**
         * 获取属性值修改结果
         */
        const result = opal.TrySetPermutation(block, type, value + 1);
        // 如果修改失败, 则重置属性值
        if (result instanceof Error)
            opal.TrySetPermutation(block, type, 0);
        // 显示提示信息
        if (message.length !== 0)
            player?.onScreenDisplay.setActionBar(message[value]);
        // 播放点击音效
        player?.playSound('place.amethyst_cluster');
    }
});
/*
 * 源能枢纽
 */
components.set(componentPrefix + 'source_energy_hub', {
    onPlayerInteract(source) {
        /**
         * 解构交互事件对象, 获取关键参数：
         *
         * - player: 触发事件的玩家对象
         *
         * - item: 玩家手持物品信息
         *
         * - block: 被交互的目标方块
         *
         * - dimension: 方块所在的维度对象
         */
        const { player, item, block, dimension } = InteractComponentTrigger(source);
        /**
         * 如果玩家使用的物品与方块类型相同则取消操作
         *
         * @returns {void}
         */
        if (item?.typeId === block.typeId)
            return;
        /**
         * 检查是否在60tick内触发过此事件
         *
         * 该检查用于防止快速点击或连续触发重复操作
         *
         * @param {number} 间隔 - 60tick的间隔
         *
         * @returns {boolean}
         */
        if (!player || !opal.TriggerControl('访问-源能枢纽', player, 60))
            return;
        /**
         * 星尘能名词
         */
        const name = '§a§l[§9§l 星尘力缓存 §r§a§l]§r';
        /**
         * 交互时变动的能量
         */
        const value = 100000;
        /**
         * 星尘能命名空间标识符
         */
        const typeid = 'stardust_energy_cache:';
        /**
         * 创建用于设置粒子效果参数的 Molang 变量映射
         *
         * @param {server.MolangVariableMap} molang - Molang变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 获取当前方块上方中心点的坐标, 若上方没有方块则使用自身中心点
         *
         * @param {Block} block - 方块对象
         *
         * @returns {Coordinates} 坐标点
         */
        const anchor = block.above()?.bottomCenter() || block.bottomCenter();
        /**
         * 获取全部动态属性的 ID 列表, 并过滤出以 "stardust_energy_cache:" 开头的属性
         */
        const getIds = server.world.getDynamicPropertyIds().filter(id => id.startsWith(typeid));
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().button(`<§v§l 创建 §r>${name}`, 'textures/项目图标/提升');
        // 设置粒子大小为 4
        molang.setFloat('variable.size', 4);
        // 设置粒子方向为 3
        molang.setFloat('variable.direction', 3);
        // 尝试在指定维度和坐标处生成圆环粒子效果
        opal.TrySpawnParticle(dimension, 'scripts:path_round', block.bottomCenter(), molang);
        // 尝试在指定维度和坐标处生成钻石粒子效果
        opal.TrySpawnParticle(dimension, 'scripts:path_star4_small', block.center(), molang);
        // 尝试在指定维度和坐标处生成蝴蝶粒子效果
        opal.TrySpawnParticle(dimension, 'scripts:path_butterfly', anchor, molang);
        // 对玩家播放一个音效, 表示交互已发生
        player.playSound('conduit.activate');
        // 将方块的 "is_storage" 属性设置为 false
        opal.TrySetPermutation(block, 'STATE:is_storage', false);
        // 遍历获取的动态属性 ID 列表, 并为每个 ID 创建一个按钮
        getIds.forEach(id => display.button(`<§m§l 提取 §r>${name}: ` + id.replace(typeid, '')));
        // 显示窗口界面
        display.show(player).then(option => {
            // 如果玩家取消了窗口界面, 则不执行后续代码
            if (option.canceled || option.selection == undefined)
                return;
            /**
             * 获取选中的按钮的索引
             */
            const index = option.selection - 1;
            // 如果选中的按钮的索引大于等于 0, 则执行以下代码
            if (index === -1) {
                /**
                 * 获取当前区块范围中指定 ID 的动态属性的能量值
                 */
                const energy = opal.QueryEnergy(block);
                // 如果能量值小于等于 100000, 则发送一条错误消息并返回
                if (energy <= value)
                    return player.sendMessage('当前区块中星尘能量不足, 请继续收集星尘能量!');
                // 尝试从指定 ID 的动态属性中消耗 100000 点能量
                opal.AlterEnergy(block, -value, false);
                // 设置新的动态属性值
                server.world.setDynamicProperty(typeid + opal.RandomFloor(10000, 99999), value);
                // 发送一条消息通知玩家
                player.sendMessage(`已消耗当前区块 ${value} 点能量, 并已存入${name}中, 当前区块剩余能量: ` + (energy - value) + ' 点');
            }
            else if (getIds.length > 0) {
                // 清除被选中的动态属性
                server.world.setDynamicProperty(getIds[index]);
                // 尝试向指定 ID 的动态属性中添加 100000 点能量
                opal.AlterEnergy(block, value, true);
                // 发送一条消息通知玩家
                player.sendMessage(`已从${name}中取出 ${value} 点能量, 当前区块剩余能量: ` + opal.QueryEnergy(block) + ' 点');
            }
        });
    }
});
export default components;
