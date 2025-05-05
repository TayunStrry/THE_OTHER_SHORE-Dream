/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import { rune_color, is_wood, is_trees, is_crops } from "../data/table";
import * as opal from "../system/opal";
import * as type from "../data/type";
/*
 * 自定义组件
 */
import * as customFunction from "./custom_function";
import * as customType from "./custom_type";
/**
 * * 进行检测的默认物品标签
 */
const defaultTag = 'tags:magic_tool.series';
/**
 ** 常规类型 物品网络 申请
 */
let routineLogisticsRequest = new Map<string, server.Vector3>();
/**
 ** 跨越维度 物品网络 申请
 */
let surpassDimensionRequest = new Map<string, [server.Dimension, server.Vector3]>();
/**
 * * 组件前缀代词
 */
const prefix = ['opal:destroy.', 'opal:interact.', 'opal:place.', 'opal:step.', 'opal:tick.'];
/**
 * * 方块自定义组件列表
 */
const components = new Map<string, server.BlockCustomComponent>();
// TODO: 方块挖掘组件
/*
 * 魔晶储罐 - 方块破坏
 */
components.set(prefix[0] + 'crystal_tank',
    {
        onPlayerBreak(source: server.BlockComponentPlayerBreakEvent) {
            /**
             * * 方块破坏组件参数解构
             */
            const { block, dimension, player } = source;
            /**
             * * 获取破坏方块时的手持物品
             */
            const item = player?.getComponent('minecraft:inventory')?.container?.getItem(player.selectedSlotIndex);
            // 检测是否使用了正确道具
            if (!item?.hasTag(defaultTag)) return;
            /**
             ** 物品生成锚点
             */
            const anchor = opal.Vector.toString(block.above()?.bottomCenter() as server.Vector3, { delimiter: ' ' });
            // 随机生成魔晶石
            dimension.runCommand(`loot spawn ${anchor} loot "energy_crystal/random"`);
            // 播放音效 与 粒子效果
            player?.playSound('cauldron.explode');
            // 魔晶储罐被破坏时的粒子效果
            switch (opal.RandomFloor(0, 4)) {
                case 0:
                    opal.TrySpawnParticle(dimension, 'constant:fireworks_fireball_rune_red', block.above()?.bottomCenter() as server.Vector3);
                    opal.TrySpawnParticle(dimension, 'constant:fireworks_paper_rune_red', block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 1:
                    opal.TrySpawnParticle(dimension, 'constant:fireworks_fireball_rune_blue', block.above()?.bottomCenter() as server.Vector3);
                    opal.TrySpawnParticle(dimension, 'constant:fireworks_paper_rune_blue', block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 2:
                    opal.TrySpawnParticle(dimension, 'constant:fireworks_fireball_rune_green', block.above()?.bottomCenter() as server.Vector3);
                    opal.TrySpawnParticle(dimension, 'constant:fireworks_paper_rune_green', block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 3:
                    opal.TrySpawnParticle(dimension, 'constant:fireworks_fireball_rune_orange', block.above()?.bottomCenter() as server.Vector3);
                    opal.TrySpawnParticle(dimension, 'constant:fireworks_paper_rune_orange', block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 4:
                    opal.TrySpawnParticle(dimension, 'constant:fireworks_fireball_rune_purple', block.above()?.bottomCenter() as server.Vector3);
                    opal.TrySpawnParticle(dimension, 'constant:fireworks_paper_rune_purple', block.above()?.bottomCenter() as server.Vector3);
                    break;

                default: break;
            }
        }
    }
);
// TODO: 方块交互组件
/*
 * 从林木椅
 */
components.set(prefix[1] + 'jungle_wood_chair',
    {
        async onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            // 移除不应该存在的实体实体
            source.dimension.getEntitiesAtBlockLocation(source.block).filter(entity => entity.typeId === 'starry_map:execute.player_seat').forEach(entity => entity.remove());
            // 等待 1 tick
            await server.system.waitTicks(1);
            // 创建 玩家座位点实体
            opal.TrySpawnEntity(source.dimension, 'starry_map:execute.player_seat', source.block.center() as server.Vector3);
        }
    }
);
/*
 * 计数模块
 */
components.set(prefix[1] + 'counting_module',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (!analysis.item?.hasTag(defaultTag)) return;
            /**
             ** 输入值
             */
            const input = analysis.state.getState('STATE:input') as number;
            // 赋值 方块状态
            opal.TrySetPermutation(analysis.block, 'STATE:input', input != 10 ? input + 1 : 1);
            opal.TrySetPermutation(analysis.block, 'STATE:count', 1);
            // 播放音效 与 粒子效果
            analysis.player?.playSound('tile.piston.out');
            // 显示悬浮文本
            opal.DisplayFloatingText(analysis.block, '<§l§e 计数模块 §r> : §l§9' + (input != 10 ? input + 1 : 1));
        }
    }
);
/*
 * 交互终端
 */
components.set(prefix[1] + 'control_panel',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.hasTag(defaultTag)) {
                /**
                 ** 方块状态值
                 */
                const note = analysis.state.getState('STATE:rune_note') as number;
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
                const note = analysis.state.getState('STATE:rune_note') as number;
                if (analysis.state.getState('STATE:stage') != 0) return;
                if (note != 0) {
                    opal.TrySetPermutation(analysis.block, 'STATE:stage', 1);
                    analysis.player?.playSound('conduit.activate')
                    analysis.player?.sendMessage('| §l交互终端§r | : §6信号已发送');
                }
                else {
                    analysis.player?.playSound('random.click')
                    analysis.player?.sendMessage('| §l交互终端§r | : §4当前操作无法执行!§r\n| §l交互终端§r | : 使用§l§6 魔晶工具 §r调整| 信号类型 |');
                }
            }
        }
    }
);
/*
 * 逻辑非门
 */
components.set(prefix[1] + 'logic_inverter',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (!analysis.item?.hasTag(defaultTag)) return;
            /**
             ** 输入值
             */
            const price = analysis.state.getState('STATE:price') as number;
            // 赋值 方块状态
            opal.TrySetPermutation(analysis.block, 'STATE:price', price != 9 ? price + 1 : 1);
            // 播放音效 与 粒子效果
            analysis.player?.playSound('tile.piston.out');
            analysis.player?.sendMessage('| 参数设置 | : §l§e逻辑元件§r[§6 运行周期§r] -> §u' + (price != 9 ? price + 1 : 1));
        }
    }
);
/*
 * 信号过滤
 */
components.set(prefix[1] + 'signal_filtering',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (!analysis.item?.hasTag(defaultTag)) return;
            /**
             ** 方块状态值
             */
            const note = analysis.state.getState('STATE:rune_note') as number;
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
    }
);
/*
 * 旋转方块朝向
 */
components.set(prefix[1] + 'rotation_direction',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了魔晶工具系列物品
            if (!analysis.item?.hasTag(defaultTag)) {
                /**
                 * * 方块的色彩状态值
                 */
                const color = analysis.state.getState('STATE:color') as number;
                // 检测玩家手持物品是否属于魔法书 且 方块是否有色彩参数
                if (!color || !analysis.item?.hasTag('tags:magic_literature:series')) return;
                // 设置方块的色彩参数
                opal.TrySetPermutation(analysis.block, 'STATE:color', color != 6 ? color + 1 : 1);
                // 播放音效 与 粒子效果
                analysis.player?.playSound('mob.sheep.shear');
                // 终止函数的后续运行
                return;
            };
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face') as string;
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
    }
);
/*
 * 伺服基座
 */
components.set(prefix[1] + 'servo_susceptor',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /*
             * 方块组件参数 的 解构
             */
            const { player, block, item, state } = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (!item?.hasTag(defaultTag)) return;
            /**
             ** 方块状态值
             */
            const value = state.getState('STATE:value') as number;
            // 赋值 方块状态
            opal.TrySetPermutation(block, 'STATE:value', value != 5 ? value + 1 : 0);
            // 播放音效 与 粒子效果
            player?.playSound('tile.piston.out');
            // 显示 提示文本
            player?.sendMessage(
                {
                    rawtext: [
                        opal.translate(block),
                        { text: `: 已修改至[§6 最大负载 §r]参数 -> ${value != 5 ? value + 1 : 0}` }
                    ]
                }
            );
        }
    }
);
/*
 * 水平机关门
 */
components.set(prefix[1] + 'horizontal_gate',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.typeId == analysis.block.typeId) return;
            // 根据符文类型决定是 开启 或 强制关闭
            if (analysis.state.getState('STATE:rune_type') == 0) {
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 7);
                analysis.player?.playSound('open.bamboo_wood_door');
            }
            else if (analysis.state.getState('STATE:rune_type') != 0) {
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
                analysis.player?.playSound('open.bamboo_wood_door');
                customFunction.emergencyCloseMechanismDoor(analysis.block);
            }
        }
    }
);
/*
 * 垂直机关门
 */
components.set(prefix[1] + 'vertical_gate',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const { item, player, block, state } = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (item?.typeId == block.typeId) {
                player?.playSound('place.amethyst_block');
                /**
                 * * 获取方块对象
                 */
                const target = block.above();
                // 检测上方方块是否为空
                if (target?.isAir) target.setPermutation(block.permutation);
                // 终止函数的后续运行
                return;
            };
            // 根据符文类型决定是 开启 或 强制关闭
            if (state.getState('STATE:rune_type') == 0 && state.getState('STATE:about') != 0) {
                opal.TrySetPermutation(block, 'STATE:rune_type', 7);
                player?.playSound('open.bamboo_wood_door');
            }
            else if (state.getState('STATE:rune_type') != 0 && state.getState('STATE:about') != 0) {
                opal.TrySetPermutation(block, 'STATE:rune_type', 0);
                player?.playSound('open.bamboo_wood_door');
                customFunction.emergencyCloseMechanismDoor(block);
            }
        }
    }
);
/*
 * 魔晶上传
 */
components.set(prefix[1] + 'magic_crystal_upload',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.typeId == analysis.block.typeId) return;
            opal.TrySpawnParticle(analysis.block.dimension, 'constant:prompt_transport_above', analysis.block.bottomCenter());
            opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
            analysis.player?.playSound('conduit.activate');
            customFunction.AboveTeleport(analysis.block);
        }
    }
);
/*
 * 魔晶下传
 */
components.set(prefix[1] + 'magic_crystal_download',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.typeId == analysis.block.typeId) return;
            opal.TrySpawnParticle(analysis.block.dimension, 'constant:prompt_transport_below', analysis.block.center());
            opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
            analysis.player?.playSound('conduit.activate');
            customFunction.BelowTeleport(analysis.block);
        }
    }
);
/*
 * 合金钢锅
 */
components.set(prefix[1] + 'special_alloy_pot',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * 方块组件参数 的 解构
             */
            const { item, block, player, container, state, dimension } = customFunction.InteractComponentTrigger(source);
            /**
             * 根据火焰状态显示的烹饪提示信息：
             * - 当火焰未点燃时, 提示用户点火；
             * - 当火焰已点燃时, 提示持续搅拌食材。
             */
            const waterPrompt: server.RawMessage = { text: state.getState('STATE:flame') == 0 ? '§4§l 火未点燃, 请先点火后再持续搅拌~§r' : '§9§l 请持续搅拌让味道充分融合!§r' };
            /**
             * 根据锅内是否有水显示的提示信息：
             * - 当锅内无水时, 提示用户放入食材；
             * - 当锅内有水且火焰已点燃时, 确认搅拌开始的提示。
             */
            const flamePrompt: server.RawMessage = { text: state.getState('STATE:water') === 0 ? '§4§l锅里空空如也, 请先放入食材！§r' : '§v§l火已点燃, 现在可以开始搅拌啦！§r' };
            // 检测是否使用了正确道具
            if (item?.typeId == block.typeId || !player || !container || !item) return;
            // === 烹饪准备阶段 ===
            if (state.getState('STATE:flame') == 0 || state.getState('STATE:water') == 0) {
                [
                    'minecraft:flint_and_steel',
                    'starry_map:abyssal_whale_wreckage',
                    'starry_map:spirit_lizard_shard',
                    'starry_map:wild_bee_shard',
                    'starry_map:viper_barrel'
                ].forEach(
                    (itemId, index) => {
                        // 判断玩家手持物品是否在样本数组中
                        if (itemId !== item?.typeId) return;
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
                    }
                );
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
                player.sendMessage({ text: `§m§l锅中咕嘟作响, 还需要再搅拌${9 - (state.getState('STATE:count') as number)}次...§r` });
                opal.TrySetPermutation(block, 'STATE:count', state.getState('STATE:count') as number + 1);
                player?.playSound('random.swim');
            }
            // === 烹饪结束阶段 ===
            else if (state.getState('STATE:flame') == 1 && state.getState('STATE:water') != 0 && state.getState('STATE:count') == 9) {
                /**
                 * 食物刷新点
                 */
                const bottomCenter = block.above()?.bottomCenter();
                // 如果获取不到底部中心点则返回
                if (!bottomCenter) return;
                // 如果玩家没有放入调料则返回
                if (!item.hasTag('tags:item_delicacies.sauce')) {
                    player.sendMessage({ rawtext: [{ text: '§v§l还没放调料呢...请先放入§r ' }, opal.translate('starry_map:unknown_dipping_sauce', 'item')] });
                    return;
                };
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
                        ]
                        opal.TrySpawnItem(dimension, new server.ItemStack(food_1[opal.RandomFloor(0, 1)]), bottomCenter);
                        break;
                    case 2:
                        const food_2 = [
                            'starry_map:spirit_lizard_delicacy',
                            'starry_map:spirit_lizard_apple'
                        ]
                        opal.TrySpawnItem(dimension, new server.ItemStack(food_2[opal.RandomFloor(0, 1)]), bottomCenter);
                        break;
                    case 3:
                        const food_3 = [
                            'starry_map:bee_fire_cuisine',
                            'starry_map:charcoal_roasted_wild_bee',
                            'starry_map:wild_bee_roasted_chicken'
                        ]
                        opal.TrySpawnItem(dimension, new server.ItemStack(food_3[opal.RandomFloor(0, 2)]), bottomCenter);
                        break;
                    case 4:
                        const food_4 = [
                            'starry_map:curry_viper'
                        ]
                        opal.TrySpawnItem(dimension, new server.ItemStack(food_4[0]), bottomCenter);
                        break;

                    default: break;
                };
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
    }
);
/*
 * 金属伪装
 */
components.set(prefix[1] + 'metal_camouflage',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.typeId == analysis.block.typeId) return;
            // 判断玩家和玩家背包是否存在
            if (!analysis.player || !analysis.container) return;
            /**
             ** 当前手持物品
             */
            const item = analysis.container.getItem(analysis.player.selectedSlotIndex);
            if (!item) return;
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
            };
            // 播放音效
            analysis.player?.playSound('fire.ignite');
        }
    }
);
/*
 * 木质伪装
 */
components.set(prefix[1] + 'wood_camouflage',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.typeId == analysis.block.typeId) return;
            // 判断玩家和玩家背包是否存在
            if (!analysis.player || !analysis.container) return;
            /**
             ** 当前手持物品
             */
            const item = analysis.container?.getItem(analysis.player.selectedSlotIndex);
            if (!item) return;
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
            };
            // 播放音效
            analysis.player?.playSound('fire.ignite');
        }
    }
);
/*
 * 石质伪装
 */
components.set(prefix[1] + 'stone_camouflage',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.typeId == analysis.block.typeId) return;
            // 判断玩家和玩家背包是否存在
            if (!analysis.player || !analysis.container) return;
            /**
             ** 当前手持物品
             */
            const item = analysis.container?.getItem(analysis.player.selectedSlotIndex);
            if (!item) return;
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
            };
            // 播放音效
            analysis.player?.playSound('fire.ignite');
        }
    }
);
/*
 * 魔晶储罐
 */
components.set(prefix[1] + 'crystal_tank',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.typeId == analysis.block.typeId) return;
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
            const caching = analysis.state.getState('STATE:caching') as number;
            // 判断玩家是否满足触发条件
            if (!player || !container || !analysis.item?.getTags().includes('tags:energy_crystal.series')) return;
            // 判断物品是否属于 永恒魔晶石
            if (analysis.item?.getTags().includes('tags:eternal_crystal')) {
                /**
                 ** 恒常-魔晶储罐
                 */
                const constant = server.BlockPermutation.resolve('starry_map:constant_tank');
                // 播放音效与粒子效果
                opal.TrySpawnParticle(analysis.dimension, 'constant:smoke_rune_white', analysis.block.above()?.bottomCenter() as server.Vector3);
                opal.TrySpawnParticle(analysis.dimension, 'constant:smoke_rune_white', analysis.block.above()?.bottomCenter() as server.Vector3);
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
                opal.TrySpawnParticle(analysis.dimension, 'constant:smoke_rune_white', analysis.block.above()?.bottomCenter() as server.Vector3);
                opal.TrySpawnParticle(analysis.dimension, 'constant:smoke_rune_white', analysis.block.above()?.bottomCenter() as server.Vector3);
                // 显示提示
                analysis.player?.sendMessage('§c容器已满载, 无法继续填充')
                // 赋值 方块状态
                opal.TrySetPermutation(analysis.block, 'STATE:output', 2);
            }
        }
    }
);
/*
 * 熔岩质能
 */
components.set(prefix[1] + 'magma_power',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.typeId == analysis.block.typeId) return;
            // 判断玩家和玩家背包是否存在
            if (!analysis.player || !analysis.container) return;
            /**
             ** 当前手持物品
             */
            const item = analysis.item;
            // 检测物品
            if (!item || item?.typeId !== 'minecraft:lava_bucket') return;
            /**
             ** 获取方块状态
             */
            const magma = analysis.state.getState('STATE:magma') as number;
            // 检测是否已满载
            if (magma == 15) return;
            // 修改方块纹理
            opal.TrySetPermutation(analysis.block, 'STATE:magma', magma + 1);
            // 播放音效
            analysis.player?.playSound('bucket.fill_lava');
            // 清除物品
            analysis.container.setItem(analysis.player.selectedSlotIndex);
            // 生成空铁桶
            opal.TrySpawnItem(analysis.dimension, new server.ItemStack('minecraft:bucket'), analysis.block.center());
        }
    }
);
/*
 * 区块显示
 */
components.set(prefix[1] + 'region_display',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const { block, item } = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (item?.typeId == block.typeId) return;
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
    }
);
/*
 * 诸界道标
 */
components.set(prefix[1] + 'road_sign_presets',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const { block, item } = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (item?.typeId == block.typeId) return;
            /**
             * * 诸界道标 数据信息
             */
            const RoadSign = new Map<string, type.LOCATION_AND_DIMENSION>();
            /**
             * * 获取 玩家
             */
            const player = block.dimension.getPlayers({ location: block.location, maxDistance: 8, closest: 1 })[0];
            // 检测玩家是否使用过诸界道标
            if (!opal.TriggerControl('诸界道标:使用冷却', player, 20)) return;
            // 获取 所有 道标
            player.getDynamicPropertyIds().filter(id => id.startsWith('road_sign:')).forEach(id => opal.CompileSign(player, id, RoadSign));
            /**
             * * 获取 道标名称
             */
            const name = Array.from(RoadSign.keys()).map(id => `§n§o§l§${Math.floor(Math.random() * 6)}` + id.split(':')[1]);
            /**
             * * 定义了 窗口界面 的 标题
             */
            const title: server.RawMessage = {
                text: "§9<§l 诸界道标 §r§9>"
            };
            /**
             * * 定义了 窗口界面 的 表单对象
             */
            const display = new serverUI.ActionFormData().title(title)
            name.forEach(info => display.button(info, "textures/物品贴图/魔法书籍/空间宝典"));
            if (name.length == 0) return player.onScreenDisplay.setTitle("§4暂无 §9道标信息§r")
            // 显示窗口界面
            display.show(player).then(
                option => {
                    //检测玩家是否退出窗口
                    if (option.canceled || option.selection == undefined) return
                    /**
                     * * 获取 道标参数
                     */
                    const value = Array.from(RoadSign.values());
                    //执行传送流程 并 播放音效
                    player.teleport(value[option.selection].location, { dimension: value[option.selection].dimension });
                    server.system.runTimeout(() => player.playSound("mob.endermen.portal"), 5);
                }
            )

        }
    }
);
/*
 * 附魔分离
 */
components.set(prefix[1] + 'enchantment_dissociation',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.typeId == analysis.block.typeId) return;
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
            function dissociation(enchantments: server.Enchantment[], container: server.Container, block: server.Block, enchantable?: server.ItemEnchantableComponent) {
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
                if (!opal.CheckItemStack(container, [blockItem])) return opal.ErrorMessage('<§l§b 附魔分离 §r>§4 发生错误§r', block, { text: '未能在<§l§3 方块容器 §r>内获取到足够数量的<§l§u 书本 §r>' });
                // 判断能量是否足够
                if (!opal.ExpendEnergy(analysis.block, -number * 1000)) return;
                // 删除 普通书本
                opal.DeleteItemStack(container, blockItem);
                // 添加 附魔书
                enchantments.forEach(
                    enchantment => {
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
                        if (book instanceof server.Entity) book.teleport(location);
                    }
                );
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
            if (!below || !container) return opal.ErrorMessage('<§l§b 附魔分离 §r>§4 发生错误§r', analysis.block, { text: '未能在设备下方找到合适的<§l§3 方块容器 §r>' });
            // 检测玩家与附魔是否有效
            if (!player || !enchantable || !enchantments) return;
            // 检测 附魔条目数量
            if (enchantments.length == 0) return;
            // 尝试分离附魔书
            dissociation(enchantments, container, below, enchantable);
            // 置换 玩家 手持的物品
            analysis.container?.setItem(player.selectedSlotIndex, analysis.item);
        }
    }
);
/*
 * 魔晶充能
 */
components.set(prefix[1] + 'star_energy_infusion',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.typeId == analysis.block.typeId) return;
            // 设定使用间隔
            if (!opal.TriggerControl('消耗星尘力补充物品数值', analysis.block, 20)) return;
            /**
             * * 恢复物品耐久
             */
            function RestoreDurabilit() {
                /**
                 * * 获取物品耐久组件
                 */
                const durability = analysis.item?.getComponent('minecraft:durability');
                // 检测能量是否足够
                if (!durability || durability.damage == 0 || !opal.ExpendEnergy(analysis.block, -durability.damage * 5)) return;
                // 恢复耐久
                durability.damage = 0;
                // 置换 玩家 手持的物品
                analysis.container?.setItem(analysis.player?.selectedSlotIndex ?? 0, analysis.item);
                // 显示 特效
                ChargingSpecialEffects();
            };
            /**
             * * 恢复列车能量
             */
            function RestoreVehiclePower() {
                /**
                 ** 获取物品的能量属性
                 */
                const power = analysis.item?.getDynamicProperty('energy:offline_vehicle_power') as number ?? 3500;
                // 检测能量是否足够
                if (!opal.ExpendEnergy(analysis.block, -10000) || power >= 1000000) return;
                // 恢复列车能量
                analysis.item?.setDynamicProperty('energy:offline_vehicle_power', power + 10000);
                analysis.item?.setLore([`<§9§o§l 剩余能量 §r>: ${power + 10000}`]);
                // 置换 玩家 手持的物品
                analysis.container?.setItem(analysis.player?.selectedSlotIndex ?? 0, analysis.item);
                // 显示 特效
                ChargingSpecialEffects();
            };
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
            };
            // 检测物品是否包含对应标签
            if (analysis.item?.hasTag('tags:use_energy_to_restore_vehicle_power')) return RestoreVehiclePower();
            if (analysis.item?.hasTag('tags:use_energy_to_restore_durability')) return RestoreDurabilit();
        }
    }
);
/*
 * 强化魔晶充能
 */
components.set(prefix[1] + 'super_star_energy_infusion',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.typeId == analysis.block.typeId) return;
            // 设定使用间隔
            if (!opal.TriggerControl('消耗星尘力补充物品数值', analysis.block, 20)) return;
            /**
             * * 恢复物品耐久
             */
            function RestoreDurabilit() {
                /**
                 * * 获取物品耐久组件
                 */
                const durability = analysis.item?.getComponent('minecraft:durability');
                // 检测能量是否足够
                if (!durability || durability.damage == 0 || !opal.ExpendEnergy(analysis.block, -durability.damage * 5)) return;
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
            };
            /**
             * * 恢复列车能量
             */
            function RestoreVehiclePower() {
                /**
                 ** 获取物品的能量属性
                 */
                const power = analysis.item?.getDynamicProperty('energy:offline_vehicle_power') as number ?? 3500;
                // 检测能量是否足够
                if (!opal.ExpendEnergy(analysis.block, -10000) || power >= 1000000) return;
                // 恢复列车能量
                analysis.item?.setDynamicProperty('energy:offline_vehicle_power', power + 30000);
                analysis.item?.setLore([`<§9§o§l 剩余能量 §r>: ${power + 30000}`]);
                // 置换 玩家 手持的物品
                analysis.container?.setItem(analysis.player?.selectedSlotIndex ?? 0, analysis.item);
                // 显示 特效
                ChargingSpecialEffects();
            };
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
            };
            // 检测物品是否包含对应标签
            if (analysis.item?.hasTag('tags:use_energy_to_restore_vehicle_power')) return RestoreVehiclePower();
            else return RestoreDurabilit();
        }
    }
);
/*
 * 曜石熔炉
 */
components.set(prefix[1] + 'obsidian_furnace',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.typeId == analysis.block.typeId) return;
            if (!analysis.player || !analysis.container) return;
            /**
             ** 当前手持物品
             */
            const item = analysis.container.getItem(analysis.player.selectedSlotIndex);
            // 检测物品
            if (!item) return;
            if (item.typeId === 'starry_map:compressed_stone') {
                /**
                 ** 获取方块状态
                 */
                const material = analysis.state.getState('STATE:material') as number;
                if (material != 8) {
                    // 赋值方块状态
                    opal.TrySetPermutation(analysis.block, 'STATE:material', material + 1);
                    // 清除物品
                    opal.DeleteItemStack(analysis.container, new server.ItemStack(item.typeId));
                }
                else analysis.player.onScreenDisplay.setTitle('§d剩余空间不足, 无法填充');
                // 播放音效
                analysis.player?.playSound('use.stone');
            };
            if (item.typeId === 'minecraft:bucket') {
                /**
                 ** 获取方块状态
                 */
                const magma = analysis.state.getState('STATE:magma') as number;
                /**
                 ** 物品生成锚点
                 */
                const anchor = opal.Vector.toString(analysis.block.above()?.bottomCenter() as server.Vector3, { delimiter: ' ' });
                // 检测方块状态
                if (magma == 0) analysis.player.onScreenDisplay.setTitle('§d储备不足, 无法提取');
                else {
                    analysis.dimension.runCommand(`loot spawn ${anchor} loot "iron_bucket/lava"`)
                    // 修改方块状态
                    opal.TrySetPermutation(analysis.block, 'STATE:magma', magma - 1);
                    // 播放音效
                    analysis.player?.playSound('bucket.empty_lava');
                    // 清除物品
                    opal.DeleteItemStack(analysis.container, new server.ItemStack(item.typeId));
                }
            }
        }
    }
);
/*
 * 曜石储罐
 */
components.set(prefix[1] + 'obsidian_storage_tank',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.InteractComponentTrigger(source);
            // 检测是否使用了正确道具
            if (analysis.item?.typeId == analysis.block.typeId) return;
            if (!analysis.player || !analysis.container) return;
            /**
             ** 当前手持物品
             */
            const item = analysis.container.getItem(analysis.player.selectedSlotIndex);
            // 检测物品
            if (!item) return;
            if (item.typeId === 'minecraft:bucket') {
                /**
                 ** 获取方块状态
                 */
                const magma = analysis.state.getState('STATE:magma') as number;
                /**
                 ** 物品生成锚点
                 */
                const anchor = opal.Vector.toString(analysis.block.above()?.bottomCenter() as server.Vector3, { delimiter: ' ' });
                // 检测方块状态
                if (magma == 0) analysis.player.onScreenDisplay.setTitle('§d熔岩不足, 无法提取');
                else {
                    analysis.dimension.runCommand(`loot spawn ${anchor} loot "iron_bucket/lava"`)
                    // 修改方块状态
                    opal.TrySetPermutation(analysis.block, 'STATE:magma', magma - 1);
                    // 播放音效
                    analysis.player?.playSound('bucket.empty_lava');
                    // 清除物品
                    opal.DeleteItemStack(analysis.container, new server.ItemStack(item.typeId));
                }
            };
            if (item.typeId === 'minecraft:lava_bucket') {
                /**
                 ** 获取方块状态
                 */
                const magma = analysis.state.getState('STATE:magma') as number;
                /**
                 ** 物品生成锚点
                 */
                const anchor = opal.Vector.toString(analysis.block.above()?.bottomCenter() as server.Vector3, { delimiter: ' ' });
                // 检测方块状态
                if (magma == 15) analysis.player.onScreenDisplay.setTitle('§d容量不足, 无法填充');
                else {
                    analysis.dimension.runCommand(`loot spawn ${anchor} loot "iron_bucket/empty"`)
                    // 修改方块状态
                    opal.TrySetPermutation(analysis.block, 'STATE:magma', magma + 1);
                    // 播放音效
                    analysis.player?.playSound('bucket.fill_lava');
                    // 清除物品
                    opal.DeleteItemStack(analysis.container, new server.ItemStack(item.typeId));
                }
            };
        }
    }
);
/*
 * 容器枢纽
 */
components.set(prefix[1] + 'container_hub',
    {
        async onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            // 解构参数并验证基础条件
            const { player, block, item, container } = customFunction.InteractComponentTrigger(source);
            // 判断是否完成了事件触发器的冷却
            if (!opal.TriggerControl('容器枢纽_玩家点击', block, 10)) return;
            // 判断事件返回的对象是否完整可用
            if (!player || !item || !container) return;
            // 判断是否成功获取到能量
            if (!opal.ExpendEnergy(block, -10)) return;
            /**
             * 获取容器查询结果
             */
            let searchResults: ReturnType<typeof opal.SearchContainers> = opal.SearchContainers(block, item, 8);
            /**
             * 获取玩家的快捷栏选择索引
             */
            const slot = player.selectedSlotIndex;
            // 如果没有找到容器, 放宽条件重新搜索
            if (searchResults.length === 0) searchResults = opal.SearchContainers(block);
            // 统一处理搜索结果
            if (searchResults.length === 0) {
                player.sendMessage('§c未能找到存放<§9 当前物品 §c>的<§v 可用容器 §c>');
                player.playSound('respawn_anchor.deplete');
            }
            else {
                /**
                 * * 获取目标容器和目标方块
                 */
                const [targetContainer, targetBlock] = searchResults[0];
                // 将物品添加到方块容器中
                targetContainer.addItem(item);
                // 从玩家背包中移除物品
                container?.setItem(slot);
                // 设置一个自由指针, 指向方块位置
                opal.SetFreePointer({ location: block.bottomCenter(), dimension: block.dimension }, targetBlock.bottomCenter(), 1);
                // 播放音效
                player.playSound('respawn_anchor.charge');
            }
        }
    }
);
/*
 * 遗落档案
 */
components.set(prefix[1] + 'document_display',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent, data: server.CustomComponentParameters) {
            /**
             * 解构交互事件对象, 获取玩家、物品、方块和维度信息
             */
            const { player, item, block, dimension } = customFunction.InteractComponentTrigger(source);
            /**
             * 获取自定义组件的参数
             */
            const params = data.params as customType.DOCUMENT_DISPLAY;
            // 如果玩家使用的物品与方块类型相同, 则不执行任何操作
            if (item?.typeId === block.typeId) return;
            // 检查玩家是否在 60tick 的间隔内触发过此事件, 如果是则不执行操作
            if (!player || !opal.TriggerControl('查询与显示档案馆遗失的数据终端', player, 20)) return;
            /**
             * 从方块状态中获取关联的档案内容字符串
             */
            const archives = params.archives || '开发者名单';
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
    }
);
/**
 * * 离线档案
 */
components.set(prefix[1] + 'document_display_expire',
    {
        /**
         * 当玩家与档案馆遗失数据终端发生交互时触发
         *
         * @param {server.BlockComponentPlayerInteractEvent} source - 交互事件对象
         */
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
            /**
             * 解构交互事件对象, 获取玩家、物品、方块和维度信息
             *
             * @param {INTERACT_COMPONENT} customFunction.InteractComponentTrigger - 提供交互事件数据的函数
             *
             * @returns {{player: Player, item: Item | null, block: Block, dimension: Dimension}}
             */
            const { player, item, block, dimension } = customFunction.InteractComponentTrigger(source);
            /**
             * 如果玩家使用的物品与方块类型相同则取消操作
             *
             * @returns {void}
             */
            if (item?.typeId === block.typeId) return;
            /**
             * 检查是否在60tick内触发过此事件
             *
             * 该检查用于防止快速点击或连续触发重复操作
             *
             * @param {number} 间隔 - 60tick的间隔
             *
             * @returns {boolean}
             */
            if (!player || !opal.TriggerControl('查询与显示档案馆遗失的数据终端', player, 60)) return;
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
                    player.onScreenDisplay.setActionBar(
                        [
                            { text: '§9§l联网校验成功, 已成功加载: §u' },
                            opal.translate('starry_map:document.abyss_whale_emperor', 'block')
                        ]
                    );
                    isSuccess();
                    break;

                case 2:
                    dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.tyrannosaurus_rex'));
                    player.onScreenDisplay.setActionBar(
                        [
                            { text: '§9§l联网校验成功, 已成功加载: §u' },
                            opal.translate('starry_map:document.tyrannosaurus_rex', 'block')
                        ]
                    );
                    isSuccess();
                    break;

                case 3:
                    dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.wild_wasp_emperor'));
                    player.onScreenDisplay.setActionBar(
                        [
                            { text: '§9§l联网校验成功, 已成功加载: §u' },
                            opal.translate('starry_map:document.wild_wasp_emperor', 'block')
                        ]
                    );
                    isSuccess();
                    break;

                case 4:
                    dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.wild_wasp_guide'));
                    player.onScreenDisplay.setActionBar(
                        [
                            { text: '§9§l联网校验成功, 已成功加载: §u' },
                            opal.translate('starry_map:document.wild_wasp_guide', 'block')
                        ]
                    );
                    isSuccess();
                    break;

                case 4:
                    dimension.setBlockPermutation(block, server.BlockPermutation.resolve('starry_map:document.amber_jasmine'));
                    player.onScreenDisplay.setActionBar(
                        [
                            { text: '§9§l联网校验成功, 已成功加载: §u' },
                            opal.translate('starry_map:document.amber_jasmine', 'block')
                        ]
                    );
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
                    server.system.run(
                        () => {
                            if (block.isLiquid) {
                                opal.TrySpawnEntity(dimension, 'starry_map:abyss_whale.detection.point', block.center());
                            }
                            else {
                                opal.TrySpawnEntity(dimension, 'starry_map:viper.support', block.center());
                            }
                        }
                    );
                    // 设置方块为空气
                    dimension.setBlockPermutation(block, server.BlockPermutation.resolve('minecraft:air'));
            }
        }
    }
);
/*
 * 扩散填充
 */
components.set(prefix[1] + 'diffusion_filling',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent, data: server.CustomComponentParameters) {
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
            const { player, item, block, dimension } = customFunction.InteractComponentTrigger(source);
            /*
             * 阻止使用相同类型物品的交互（避免干扰正常使用）
             */
            if (item?.typeId === block.typeId) return;
            /*
             * 交互频率控制（60 tick = 3秒冷却, 防止滥用）
             */
            if (!player || !opal.TriggerControl('使用 扩散填充 进行方块置换', player, 10)) return;
            //todo 参数初始化
            /**
             * 方向映射表, 用于根据方块状态获取扩散方向的配置。
             */
            const directionMap: Map<string, opal.Vector[]> = new Map(
                [
                    ['all', opal.Vector.CONSTANT_ALL],
                    ['horizontal', opal.Vector.CONSTANT_HORIZONTAL],
                    ['vertical', opal.Vector.CONSTANT_VERTICAL]
                ]
            );
            /**
             * 参数对象, 包含扩散的最大数量、扩散方向、原型方块、目标方块和消耗的方块。
             */
            let { max_number: maxNumber, directions, proto_blocks, target_block: targetBlockId, expense } = data.params as customType.DIFFUSION_FILLING;
            // TODO 参数校验
            if (!maxNumber || !directions || !proto_blocks || !targetBlockId || !expense) return;
            /**
             * 获取扩散方向的配置。
             *
             * @returns {opal.Vector[]} 扩散方向的向量数组。
             */
            const directionVector: opal.Vector[] = directionMap.get(directions) || opal.Vector.CONSTANT_DOWN_HORIZONTAL;
            /**
             * 允许被替换的原始方块类型集合（用 | 分隔）
             *
             * @type {Set<string>}
             */
            const protoBlockIds: Set<string> = new Set(proto_blocks);
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
                const blocksToMine: server.Block[] = [block];
                /**
                 * 已替换方块计数器
                 *
                 * @type {number}
                 */
                let minedCount: number = 0;
                /**
                 * 循环运行标志位
                 *
                 * @type {boolean}
                 */
                let keepRun: boolean = true;
                /**
                 * 每 tick 处理次数（分摊计算压力）
                 *
                 * @type {number}
                 */
                const magnification: number = 100;
                /**
                 * 存储每 tick 的 ID
                 */
                const tickIds: number[] = [];
                /*
                 * 如果目标方块为 'items_in_hand', 则使用玩家手持物品的 ID 进行替换
                 */
                if (targetBlockId == 'items_in_hand') {
                    /**
                     * 物品ID映射表, 用于根据物品 ID 获取对应的方块 ID
                     */
                    const itemMap: Map<string, string> = new Map(
                        [
                            ['minecraft:powder_snow_bucket', 'minecraft:powder_snow'],
                            ['minecraft:water_bucket', 'minecraft:water'],
                            ['minecraft:lava_bucket', 'minecraft:lava']
                        ]
                    );
                    /**
                     * 玩家手持物品的 ID
                     *
                     * @type {string}
                     */
                    const itemId: string = itemMap.get(item?.typeId ?? '') || item?.typeId || 'minecraft:air';
                    /**
                     * 允许玩家自定义的物品的白名单
                     *
                     * @type {Set<string>}
                     */
                    const ItemWhitelist: Set<string> = new Set(
                        [
                            "minecraft:grass_block",
                            "minecraft:netherrack",
                            "minecraft:end_stone",
                            "minecraft:deepslate",
                            "minecraft:red_sand",
                            "minecraft:stone",
                            "minecraft:water",
                            "minecraft:sand",
                            "minecraft:dirt"
                        ]
                    );
                    /*
                     * 如果玩家拥有权限, 则使用物品 ID 进行替换, 否则使用白名单进行判断
                     */
                    if (opal.isPlayerAuthorized(player) && itemId !== 'minecraft:air') targetBlockId = itemId;
                    /*
                     * 如果玩家没有权限, 则使用白名单进行判断
                     */
                    else if (ItemWhitelist.has(itemId)) targetBlockId = itemId;
                    /*
                     * 如果玩家没有手持物品, 则终止事件处理函数
                     */
                    else return player.onScreenDisplay.setActionBar({ text: '§c§l很抱歉, 您目前不能使用这个方块进行替换§r' });
                };
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
                    if (expense !== "create" && typeof expense == 'number') opal.ExpendEnergy(block, minedCount * -(expense || 100));
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
                        if (blocksToMine.length === 0 || minedCount >= maxNumber || !keepRun) return stopEvent();
                        /**
                         * 从队列头部取出当前处理方块
                         *
                         * @type {server.Block | undefined}
                         */
                        const currentBlock: server.Block | undefined = blocksToMine.shift();
                        /*
                         * 判断 方块是否存在 否则 终止事件运行
                         */
                        if (!currentBlock) return stopEvent();
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
                    };
                    /**
                     * 处理当前方块的相邻方块替换逻辑, 实现扩散填充功能
                     *
                     * @param {server.Block} currentBlock - 当前方块对象, 用于计算相邻方块的位置
                     */
                    function execute(currentBlock: server.Block) {
                        /*
                         * 遍历所有指定方向的相邻方块
                         */
                        for (const direction of directionVector) {
                            /**
                             * 获取相邻方块
                             *
                             * @type {server.Block | undefined}
                             */
                            const adjacentBlock: server.Block | undefined = currentBlock.offset(direction);
                            /*
                             * 有效性验证（存在性 + 类型匹配）
                             */
                            if (!adjacentBlock || adjacentBlock.typeId === targetBlockId || !opal.TemplateMatcher(protoBlockIds, adjacentBlock.typeId)) continue;
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
    }
);
/*
 * 状态值增加组件
 */
components.set(prefix[1] + 'state_value_increase',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent, data: server.CustomComponentParameters) {
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
            const { player, item, block, state } = customFunction.InteractComponentTrigger(source);
            /**
             * 检查玩家的交互是否符合预期条件:
             *
             * - item 类型是否与目标方块类型一致
             *
             * - 物品是否携带默认标签（确保物品属于该组件的有效范围）
             */
            if (item?.typeId !== block.typeId && !item?.hasTag(defaultTag)) return;
            /**
             * 获取需要修改的属性名
             */
            const { revise, message } = data.params as customType.STATE_VALUE_INCREASE;
            // 确认参数是否完整
            if (!revise || !message) return;
            /**
             * 获取需要修改的属性的当前值
             */
            const value = state.getState(revise) as number;
            /**
             * 获取属性值修改结果
             */
            const result = opal.TrySetPermutation(block, revise, value + 1);
            // 如果修改失败, 则重置属性值
            if (result instanceof Error) opal.TrySetPermutation(block, revise, 0);
            // 显示提示信息
            if (message.length !== 0) player?.onScreenDisplay.setActionBar(message[value]);
            // 播放点击音效
            player?.playSound('place.amethyst_cluster');
        }
    }
);
/*
 * 源能枢纽
 */
components.set(prefix[1] + 'source_energy_hub',
    {
        onPlayerInteract(source: server.BlockComponentPlayerInteractEvent) {
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
            const { player, item, block, dimension } = customFunction.InteractComponentTrigger(source);
            /**
             * 如果玩家使用的物品与方块类型相同则取消操作
             *
             * @returns {void}
             */
            if (item?.typeId === block.typeId) return;
            /**
             * 检查是否在60tick内触发过此事件
             *
             * 该检查用于防止快速点击或连续触发重复操作
             *
             * @param {number} 间隔 - 60tick的间隔
             *
             * @returns {boolean}
             */
            if (!player || !opal.TriggerControl('访问-源能枢纽', player, 60)) return;
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
            display.show(player).then(
                option => {
                    // 如果玩家取消了窗口界面, 则不执行后续代码
                    if (option.canceled || option.selection == undefined) return;
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
                        if (energy <= value) return player.sendMessage('当前区块中星尘能量不足, 请继续收集星尘能量!');
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
                }
            )
        }
    }
);
// TODO: 方块放置组件
/*
 * 虚空方块
 */
components.set(prefix[2] + 'unreal_space',
    {
        beforeOnPlayerPlace(source: server.BlockComponentPlayerPlaceBeforeEvent) {
            source.permutationToPlace = source.permutationToPlace.withState('STATE:is_storage', 1)
        }
    }
);
/*
 * 魔导总线
 */
components.set(prefix[2] + 'magic_cable',
    {
        beforeOnPlayerPlace(source: server.BlockComponentPlayerPlaceBeforeEvent) {
            source.permutationToPlace = source.permutationToPlace.withState('STATE:is_storage', false)
        }
    }
);
/*
 * 从林木椅
 */
components.set(prefix[2] + 'jungle_wood_chair',
    {
        beforeOnPlayerPlace(source: server.BlockComponentPlayerPlaceBeforeEvent) {
            source.permutationToPlace = source.player?.isSneaking ? source.permutationToPlace.withState('STATE:type', 1) : source.permutationToPlace.withState('STATE:type', 0)
        }
    }
);
/*
 * 使徒人偶
 */
components.set(prefix[2] + 'divine_favor_guide_image',
    {
        async beforeOnPlayerPlace(source: server.BlockComponentPlayerPlaceBeforeEvent) {
            /**
             * * 获取方块状态
             */
            const { permutationToPlace, dimension, block } = source;
            // 设置状态
            source.permutationToPlace = permutationToPlace.withState('STATE:is_storage', false).withState('STATE:random_texture', opal.RandomFloor(0, 12));
            // 延迟 1 tick
            await server.system.waitTicks(1);
            // 播放音效
            dimension.playSound('chime.amethyst_block', block);
            // 延迟播放音效
            server.system.runTimeout(() => dimension.playSound('step.amethyst_block', block), 10);
            // 播放粒子
            opal.TrySpawnParticle(dimension, "constant:erupt_rune_orange", block.center());
            opal.TrySpawnParticle(dimension, "constant:disperse_rune_orange", block.center());
            opal.TrySpawnParticle(dimension, "constant:fireworks_fireball_amber_color", block.center());
        }
    }
);
// TODO: 方块踩踏组件
/*
 * 区块显示
 */
components.set(prefix[3] + 'region_display',
    {
        onStepOn(source: server.BlockComponentStepOnEvent) {
            /**
             * * 方块破坏组件参数解构
             */
            const { block } = source;
            // 执行 组件功能
            /**
             * * 获取 方块 周围 实体
             */
            const getEntities = block.dimension.getEntitiesAtBlockLocation(opal.Vector.add(block, opal.Vector.CONSTANT_UP));
            // 点燃 被选中的实体
            getEntities.forEach(entity => entity.setOnFire(20, true));
        }
    }
);
/*
 * 向量弹射
 */
components.set(prefix[3] + 'vector_ejection',
    {
        onStepOn(source: server.BlockComponentStepOnEvent) {
            /**
             * * 方块破坏组件参数解构
             */
            const { block } = source;
            /**
             * * 实体查询选项
             */
            const setOptions: server.EntityQueryOptions = {
                location: block.center(),
                maxDistance: 1.5,
            };
            /**
             * * 获取实体队列
             */
            const entitys = block.dimension.getEntities(setOptions);
            // 对选中的实体进行向量弹射
            entitys.forEach(
                entity => {
                    try {
                        /**
                         * * 获取 向量
                         */
                        const Vector = entity.getViewDirection();
                        /**
                         * * 计算 水平 弹射 速度
                         */
                        const horizontalPower = (Math.abs(Vector.x) + Math.abs(Vector.z)) * 16;
                        // 向量弹射
                        entity.applyKnockback({ x: Vector.x * horizontalPower, z: Vector.z * horizontalPower }, Math.abs(Vector.y) * 8);
                        entity.addEffect('minecraft:slow_falling', 60, { amplifier: 1, showParticles: false });
                        entity.addEffect('minecraft:resistance', 200, { amplifier: 31, showParticles: false });
                        entity.addEffect('minecraft:hunger', 200, { amplifier: 4, showParticles: false });
                    }
                    catch {
                        // 向量弹射
                        entity.applyImpulse({ x: 0, y: Math.random() + 0.1, z: 0 });
                    }
                }
            )
        }
    }
);
// TODO: 方块时刻组件
/*
 * 虚无方块
 */
components.set(prefix[4] + 'unreal_space',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 修饰方块状态
            if (analysis.state.getState('STATE:stage') == 0) opal.TrySetPermutation(analysis.block, 'STATE:stage', 2);
            // 预约时钟事件
            customFunction.blockTimer(analysis.block, 20, block => block.setPermutation(server.BlockPermutation.resolve('minecraft:air')));
        }
    }
);
/*
 * 虚空方块
 */
components.set(prefix[4] + 'nihility_space',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 播放音效
            analysis.dimension.playSound('use.stone', analysis.block.location);
            // 修改 方块属性
            switch (analysis.state.getState('STATE:value')) {
                case 0: opal.TrySetPermutation(analysis.block, 'STATE:value', 1); break;

                case 1: opal.TrySetPermutation(analysis.block, 'STATE:value', 2); break;

                case 2: opal.TrySetPermutation(analysis.block, 'STATE:value', 3); break;

                case 3: opal.TrySetPermutation(analysis.block, 'STATE:value', 4); break;

                case 4: opal.TrySetPermutation(analysis.block, 'STATE:value', 5); break;

                case 5: opal.TrySetPermutation(analysis.block, 'STATE:value', 6); break;

                case 6: opal.TrySetPermutation(analysis.block, 'STATE:value', 7); break;

                case 7: opal.TrySetPermutation(analysis.block, 'STATE:value', 8); break;

                case 8: opal.TrySetPermutation(analysis.block, 'STATE:value', 9); break;

                default:
                    analysis.dimension.playSound('beacon.activate', analysis.block.location);
                    analysis.block.setPermutation(server.BlockPermutation.resolve('minecraft:air'));
                    break;
            }
        }
    }
);
/*
 * 基础总线
 */
components.set(prefix[4] + 'basic_pipeline',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 判断方块的元素类型状态
            if (analysis.condition != 0 && analysis.condition != 9) customFunction.activateConnectedMagicCables(analysis.block, 'Xx-Yy-Zz', analysis.state);
            // 重置方块元素类型
            else if (analysis.condition == 9) {
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
                opal.TrySetPermutation(analysis.block, 'STATE:direction_positive.X', analysis.block.offset(opal.Vector.CONSTANT_EAST)?.hasTag('tags:magic_cable.port_negative.X') ?? false);
                opal.TrySetPermutation(analysis.block, 'STATE:direction_negative.X', analysis.block.offset(opal.Vector.CONSTANT_WEST)?.hasTag('tags:magic_cable.port_positive.X') ?? false);
                opal.TrySetPermutation(analysis.block, 'STATE:direction_positive.Y', analysis.block.offset(opal.Vector.CONSTANT_UP)?.hasTag('tags:magic_cable.port_negative.Y') ?? false);
                opal.TrySetPermutation(analysis.block, 'STATE:direction_negative.Y', analysis.block.offset(opal.Vector.CONSTANT_DOWN)?.hasTag('tags:magic_cable.port_positive.Y') ?? false);
                opal.TrySetPermutation(analysis.block, 'STATE:direction_negative.Z', analysis.block.offset(opal.Vector.CONSTANT_NORTH)?.hasTag('tags:magic_cable.port_positive.Z') ?? false);
                opal.TrySetPermutation(analysis.block, 'STATE:direction_positive.Z', analysis.block.offset(opal.Vector.CONSTANT_SOUTH)?.hasTag('tags:magic_cable.port_negative.Z') ?? false);
            };
        }
    }
);
/*
 * 脉冲锁存
 */
components.set(prefix[4] + 'pulse_latch',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * * 方块前处理事件
             */
            function beforeEvent() {
                // 尝试根据分析结果设置权限, 以确保正确的条件被满足
                opal.TrySetPermutation(analysis.block, 'STATE:rune_note', analysis.condition);
                // 强制重置类型, 确保不受之前状态的影响
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
                // 触发魔法电缆的更新事件锁定, 以即时反映当前的状态改变
                customFunction.LatchUpdateEvent(analysis.block);
            };
            /**
             * * 方块后处理事件
             */
            function afterEvent() {
                opal.TrySetPermutation(analysis.block, 'STATE:rune_note', 0);
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            };
            // 判断方块的元素类型, 如果条件满足且尚未设置, 则执行前处理事件
            if (analysis.condition != 0 && analysis.state.getState('STATE:rune_note') == 0) beforeEvent();
            // 如果条件满足且已设置, 则执行后处理事件
            else if (analysis.condition != 0 && analysis.state.getState('STATE:rune_note') != 0) afterEvent();
            // 设置方块在X, Y, Z轴的朝向属性
            opal.TrySetPermutation(analysis.block, 'STATE:direction_positive.X', (analysis.block.offset(opal.Vector.CONSTANT_EAST)?.hasTag('tags:magic_cable.port_negative.X') || analysis.block.offset(opal.Vector.CONSTANT_EAST)?.hasTag('tags:magic_cable.logic_negative.X')) ?? false);
            opal.TrySetPermutation(analysis.block, 'STATE:direction_negative.X', (analysis.block.offset(opal.Vector.CONSTANT_WEST)?.hasTag('tags:magic_cable.port_positive.X') || analysis.block.offset(opal.Vector.CONSTANT_WEST)?.hasTag('tags:magic_cable.logic_positive.X')) ?? false);
            opal.TrySetPermutation(analysis.block, 'STATE:direction_positive.Y', (analysis.block.offset(opal.Vector.CONSTANT_UP)?.hasTag('tags:magic_cable.port_negative.Y') || analysis.block.offset(opal.Vector.CONSTANT_UP)?.hasTag('tags:magic_cable.logic_negative.Y')) ?? false);
            opal.TrySetPermutation(analysis.block, 'STATE:direction_negative.Y', (analysis.block.offset(opal.Vector.CONSTANT_DOWN)?.hasTag('tags:magic_cable.port_positive.Y') || analysis.block.offset(opal.Vector.CONSTANT_DOWN)?.hasTag('tags:magic_cable.logic_positive.Y')) ?? false);
            opal.TrySetPermutation(analysis.block, 'STATE:direction_positive.Z', (analysis.block.offset(opal.Vector.CONSTANT_SOUTH)?.hasTag('tags:magic_cable.port_negative.Z') || analysis.block.offset(opal.Vector.CONSTANT_SOUTH)?.hasTag('tags:magic_cable.logic_negative.Z')) ?? false);
            opal.TrySetPermutation(analysis.block, 'STATE:direction_negative.Z', (analysis.block.offset(opal.Vector.CONSTANT_NORTH)?.hasTag('tags:magic_cable.port_positive.Z') || analysis.block.offset(opal.Vector.CONSTANT_NORTH)?.hasTag('tags:magic_cable.logic_positive.Z')) ?? false);
        }
    }
);
/*
 * 超导枢纽
 */
components.set(prefix[4] + 'super_omphalos',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 判断方块的元素类型状态
            if (analysis.condition != 0 && analysis.condition != 9) customFunction.superOmphalos(analysis.block, analysis.state);
            // 重置方块元素类型
            else if (analysis.condition == 9) opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
    }
);
/*
 * 超导髓鞘
 */
components.set(prefix[4] + 'super_pulse',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const { condition, block, dimension, state } = customFunction.TickComponentTrigger(source);
            // 判断方块的元素类型状态
            if (condition != 0 && condition != 9) {
                /**
                 * * 修改 目标方块状态 并 返回 射线动画 的 终点
                 */
                const done = customFunction.superPulse(block, state.getState('minecraft:block_face') as string);
                // 创建自由指针
                if (done && done?.isValid) opal.SetFreePointer({ location: block.bottomCenter(), dimension }, done.bottomCenter(), 0.5);
            }
            // 重置方块元素类型
            else if (condition == 9) opal.TrySetPermutation(block, 'STATE:rune_type', 0);
        }
    }
);
/*
 * 传播许可
 */
components.set(prefix[4] + 'enable_control',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 判断方块的元素类型状态
            if (analysis.condition != 0 && analysis.condition != 9) {
                /**
                 ** 上方方块
                 */
                const above = analysis.block.above();
                /**
                 ** 下方方块
                 */
                const below = analysis.block.below();
                /**
                 ** 方块标签
                 */
                const tag = 'tags:magic_cable.open';
                // 检测 脉冲锁存 是否开启
                if (above?.hasTag(tag) || below?.hasTag(tag)) {
                    customFunction.activateConnectedMagicCables(analysis.block, 'Xx-0-Zz', analysis.state);
                    opal.TrySetPermutation(analysis.block, 'STATE:stage', 1)
                }
                else if (!above?.hasTag(tag) && !below?.hasTag(tag)) {
                    opal.TrySetPermutation(analysis.block, 'STATE:stage', 0)
                    opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0)
                }
            }
            // 重置方块元素类型
            else if (analysis.condition == 9) opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
    }
);
/*
 * 红石侦测
 */
components.set(prefix[4] + 'redstone_detection',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 判断方块的红石能量强度
            customFunction.redstoneDetection(analysis.block, 'Xx-0-Zz', analysis.state);
        }
    }
);
/*
 * 计数模块
 */
components.set(prefix[4] + 'counting_module',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * * 方块前处理事件
             */
            function beforeEvent() {
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
                opal.TrySetPermutation(analysis.block, 'STATE:count', 0);
                customFunction.logicComponents(analysis.block, 'Xx-Yy-Zz');
            };
            /**
             * * 方块后处理事件
             */
            function afterEvent() {
                const count = analysis.state.getState('STATE:count') as number;
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
                opal.TrySetPermutation(analysis.block, 'STATE:count', count + 1);
            };
            if (analysis.state.getState('STATE:input') == analysis.state.getState('STATE:count')) beforeEvent();
            else if ((analysis.state.getState('STATE:input') != analysis.state.getState('STATE:count')) && analysis.state.getState('STATE:count') != 10) afterEvent();
        }
    }
);
/*
 * 交互终端
 */
components.set(prefix[4] + 'control_panel',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * * 方块前处理事件
             */
            function beforeEvent() {
                switch (analysis.state.getState('minecraft:block_face')) {
                    case 'down':
                        customFunction.interactiveTerminal(analysis.block, 'Xx-Y-Zz', analysis.state);
                        break;

                    case 'up':
                        customFunction.interactiveTerminal(analysis.block, 'Xx-y-Zz', analysis.state);
                        break;

                    case 'north':
                        customFunction.interactiveTerminal(analysis.block, 'Xx-Yy-Z', analysis.state);
                        break;

                    case 'south':
                        customFunction.interactiveTerminal(analysis.block, 'Xx-Yy-z', analysis.state);
                        break;

                    case 'west':
                        customFunction.interactiveTerminal(analysis.block, 'X-Yy-Zz', analysis.state);
                        break;

                    case 'east':
                        customFunction.interactiveTerminal(analysis.block, 'x-Yy-Zz', analysis.state);
                        break;

                    default: break;
                };
                opal.TrySetPermutation(analysis.block, 'STATE:stage', 2);
            };
            /**
             * * 方块后处理事件
             */
            function afterEvent() {
                opal.TrySetPermutation(analysis.block, 'STATE:stage', 0);
            };
            if (analysis.state.getState('STATE:stage') == 1) beforeEvent();
            else if (analysis.state.getState('STATE:stage') == 2) afterEvent();
        }
    }
);
/*
 * 逻辑非门
 */
components.set(prefix[4] + 'logic_inverter',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face') as string;
            /**
             ** 方块标签
             */
            const tag = 'tags:magic_cable.open';
            // 判断设备朝向
            switch (face) {
                case 'up':
                    if (!analysis.block.offset(opal.Vector.CONSTANT_UP)?.hasTag(tag)) customFunction.logicComponents(analysis.block, '0-y-0');
                    break;

                case 'down':
                    if (!analysis.block.offset(opal.Vector.CONSTANT_DOWN)?.hasTag(tag)) customFunction.logicComponents(analysis.block, '0-Y-0');
                    break;

                case 'north':
                    if (!analysis.block.offset(opal.Vector.CONSTANT_NORTH)?.hasTag(tag)) customFunction.logicComponents(analysis.block, '0-0-Z');
                    break;

                case 'south':
                    if (!analysis.block.offset(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag)) customFunction.logicComponents(analysis.block, '0-0-z');
                    break;

                case 'east':
                    if (!analysis.block.offset(opal.Vector.CONSTANT_EAST)?.hasTag(tag)) customFunction.logicComponents(analysis.block, 'x-0-0');
                    break;

                case 'west':
                    if (!analysis.block.offset(opal.Vector.CONSTANT_WEST)?.hasTag(tag)) customFunction.logicComponents(analysis.block, 'X-0-0');
                    break;

                default: break;
            }
        }
    }
);
/*
 * 逻辑异或
 */
components.set(prefix[4] + 'logic_exclusive_or',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * 获取目标方块
             *
             * @param input - 方块偏移
             *
             * @returns {server.Block | undefined} - 返回方块对象
             */
            const target = (input: server.Vector3): server.Block | undefined => analysis.block.offset(input);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face') as string;
            /**
             ** 方块标签
             */
            const tag = 'tags:magic_cable.open';
            // 判断设备朝向
            switch (face) {
                case 'up':
                    if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) || target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
                        if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) != target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
                            customFunction.logicComponents(analysis.block, '0-y-0');
                    break;

                case 'down':
                    if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) || target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
                        if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) != target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
                            customFunction.logicComponents(analysis.block, '0-Y-0');
                    break;

                case 'north':
                    if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) || target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
                        if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) != target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
                            customFunction.logicComponents(analysis.block, '0-0-Z');
                    break;

                case 'south':
                    if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) || target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
                        if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) != target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
                            customFunction.logicComponents(analysis.block, '0-0-z');
                    break;

                case 'east':
                    if (target(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag) || target(opal.Vector.CONSTANT_NORTH)?.hasTag(tag))
                        if (target(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag) != target(opal.Vector.CONSTANT_NORTH)?.hasTag(tag))
                            customFunction.logicComponents(analysis.block, 'x-0-0');
                    break;

                case 'west':
                    if (target(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag) || target(opal.Vector.CONSTANT_NORTH)?.hasTag(tag))
                        if (target(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag) != target(opal.Vector.CONSTANT_NORTH)?.hasTag(tag))
                            customFunction.logicComponents(analysis.block, 'X-0-0');
                    break;

                default: break;
            };
            // 状态重置
            opal.TrySetPermutation(analysis.block, 'STATE:stage', 0);
        }
    }
);
/*
 * 逻辑与门
 */
components.set(prefix[4] + 'logic_and_gate',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * 获取目标方块
             *
             * @param input - 方块偏移
             *
             * @returns {server.Block | undefined} - 返回方块对象
             */
            const target = (input: server.Vector3): server.Block | undefined => analysis.block.offset(input);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face') as string;
            /**
             ** 方块标签
             */
            const tag = 'tags:magic_cable.open';
            // 判断方块状态
            switch (face) {
                case 'up':
                    if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) && target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
                        customFunction.logicComponents(analysis.block, '0-y-0');
                    break;

                case 'down':
                    if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) && target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
                        customFunction.logicComponents(analysis.block, '0-Y-0');
                    break;

                case 'north':
                    if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) && target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
                        customFunction.logicComponents(analysis.block, '0-0-Z');
                    break;

                case 'south':
                    if (target(opal.Vector.CONSTANT_EAST)?.hasTag(tag) && target(opal.Vector.CONSTANT_WEST)?.hasTag(tag))
                        customFunction.logicComponents(analysis.block, '0-0-z');
                    break;

                case 'east':
                    if (target(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag) && target(opal.Vector.CONSTANT_NORTH)?.hasTag(tag))
                        customFunction.logicComponents(analysis.block, 'x-0-0');
                    break;

                case 'west':
                    if (target(opal.Vector.CONSTANT_SOUTH)?.hasTag(tag) && target(opal.Vector.CONSTANT_NORTH)?.hasTag(tag))
                        customFunction.logicComponents(analysis.block, 'X-0-0');
                    break;

                default: break;
            };
            // 状态重置
            opal.TrySetPermutation(analysis.block, 'STATE:stage', 0);
        }
    }
);
/*
 * 信号编译
 */
components.set(prefix[4] + 'signal_compilation',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * * 方块前处理事件
             */
            function beforeEvent() {
                customFunction.signalCompilation(analysis.block, 'Xx-0-Zz', analysis.state)
            };
            /**
             * * 方块后处理事件
             */
            function afterEvent() {
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
                opal.TrySetPermutation(analysis.block, 'STATE:stage', 0);
                opal.TrySetPermutation(analysis.block, 'STATE:index', 0);
            };
            if (analysis.state.getState('STATE:stage') == 0 && analysis.state.getState('STATE:rune_type') != 0) {
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
                opal.TrySetPermutation(analysis.block, 'STATE:stage', 1);
            }
            else if (analysis.state.getState('STATE:stage') == 1) beforeEvent();
            else if (analysis.state.getState('STATE:stage') == 2) afterEvent();
        }
    }
);
/*
 * 信号过滤
 */
components.set(prefix[4] + 'signal_filtering',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * * 方块前处理事件
             */
            function beforeEvent() {
                customFunction.signalProcessing(analysis.block, 'Xx-Yy-Zz', analysis.state)
            };
            /**
             * * 方块后处理事件
             */
            function afterEvent() {
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            };
            if (analysis.condition != 0 && analysis.condition != 9 && analysis.condition == analysis.state.getState('STATE:rune_note')) beforeEvent();
            if (analysis.condition != 0 && analysis.condition != 9 && analysis.condition != analysis.state.getState('STATE:rune_note')) afterEvent();
            else if (analysis.condition == 9) afterEvent();
        }
    }
);
/*
 * 信号转化
 */
components.set(prefix[4] + 'signal_conversion',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 判断方块的元素类型状态
            if (analysis.condition != 0 && analysis.condition != 9) customFunction.signalProcessing(analysis.block, 'Xx-Yy-Zz', analysis.state);
            // 重置方块元素类型
            else if (analysis.condition == 9) opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
    }
);
/*
 * 总线端口
 */
components.set(prefix[4] + 'bus_port',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 判断方块的元素类型状态
            if (analysis.condition != 0 && analysis.condition != 9) {
                /**
                 ** 方块状态值
                 */
                const face = analysis.state.getState('minecraft:block_face') as string;
                switch (face) {
                    case 'up':
                        customFunction.activateConnectedMagicCables(analysis.block, '0-Yy-0', analysis.state);
                        break;

                    case 'down':
                        customFunction.activateConnectedMagicCables(analysis.block, '0-Yy-0', analysis.state);
                        break;

                    case 'north':
                        customFunction.activateConnectedMagicCables(analysis.block, '0-0-Zz', analysis.state);
                        break;

                    case 'south':
                        customFunction.activateConnectedMagicCables(analysis.block, '0-0-Zz', analysis.state);
                        break;

                    case 'east':
                        customFunction.activateConnectedMagicCables(analysis.block, 'Xx-0-0', analysis.state);
                        break;

                    case 'west':
                        customFunction.activateConnectedMagicCables(analysis.block, 'Xx-0-0', analysis.state);
                        break;

                    default: break;
                }
            }
            // 重置方块元素类型
            else if (analysis.condition == 9) opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
    }
);
/*
 * 校准型-逻辑非门
 */
components.set(prefix[4] + 'correct_logic_not', function (): server.BlockCustomComponent {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block: server.Block, offset: server.Vector3, state: number) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 获取当前方块的锁存控制位状态
         */
        const control = block.offset(offset)?.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = opal.Vector.multiply(offset, -index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target) continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch')) continue;
            // 尝试设置目标位置的方块状态值
            opal.TrySetPermutation(target, 'STATE:rune_note', !control ? state : 0);
            // 判断锁存器激活事件是否完成冷却
            if (!opal.TriggerControl('锁存器激活事件', target, 10)) return;
            // 更新锁存器事件
            customFunction.LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    };
    return {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * * 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face') as string;
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color') as number;
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, opal.Vector.CONSTANT_UP, color);
                    break;

                case 'down':
                    controlState(analysis.block, opal.Vector.CONSTANT_DOWN, color);
                    break;

                case 'north':
                    controlState(analysis.block, opal.Vector.CONSTANT_NORTH, color);
                    break;

                case 'south':
                    controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, color);
                    break;

                case 'east':
                    controlState(analysis.block, opal.Vector.CONSTANT_EAST, color);
                    break;

                case 'west':
                    controlState(analysis.block, opal.Vector.CONSTANT_WEST, color);
                    break;

                default: break;
            }
        }
    }
}());
/*
 * 校准型-逻辑与门
 */
components.set(prefix[4] + 'correct_logic_and', function (): server.BlockCustomComponent {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {[server.Vector3, server.Vector3]} port - 端口向量, 用于判断目标方块的激活状态
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block: server.Block, offset: server.Vector3, port: [server.Vector3, server.Vector3], state: number) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 判断目标方块的激活状态
         *
         * @param input - 方块偏移
         *
         * @returns {boolean} - 目标方块的激活状态
         */
        const checkTarget = (input: server.Vector3): boolean => block.offset(input)?.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = opal.Vector.multiply(offset, index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target) continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch')) continue;
            // 尝试设置目标位置的方块状态值
            opal.TrySetPermutation(target, 'STATE:rune_note', checkTarget(port[0]) == checkTarget(port[1]) && checkTarget(port[0]) ? state : 0);
            // 判断锁存器激活事件是否完成冷却
            if (!opal.TriggerControl('锁存器激活事件', target, 10)) return;
            // 更新锁存器事件
            customFunction.LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    };
    return {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face') as string;
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color') as number;
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, opal.Vector.CONSTANT_DOWN, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'down':
                    controlState(analysis.block, opal.Vector.CONSTANT_UP, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'north':
                    controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'south':
                    controlState(analysis.block, opal.Vector.CONSTANT_NORTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'east':
                    controlState(analysis.block, opal.Vector.CONSTANT_WEST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
                    break;

                case 'west':
                    controlState(analysis.block, opal.Vector.CONSTANT_EAST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
                    break;

                default: break;
            };
        }
    }
}());
/*
 * 校准型-逻辑与非
 */
components.set(prefix[4] + 'correct_logic_nand', function (): server.BlockCustomComponent {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {[server.Vector3, server.Vector3]} port - 端口向量, 用于判断目标方块的激活状态
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block: server.Block, offset: server.Vector3, port: [server.Vector3, server.Vector3], state: number) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 判断目标方块的激活状态
         *
         * @param input - 方块偏移
         *
         * @returns {boolean} - 目标方块的激活状态
         */
        const checkTarget = (input: server.Vector3): boolean => block.offset(input)?.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = opal.Vector.multiply(offset, index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target) continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch')) continue;
            // 尝试设置目标位置的方块状态值
            opal.TrySetPermutation(target, 'STATE:rune_note', checkTarget(port[0]) == checkTarget(port[1]) && checkTarget(port[0]) ? 0 : state);
            // 判断锁存器激活事件是否完成冷却
            if (!opal.TriggerControl('锁存器激活事件', target, 10)) return;
            // 更新锁存器事件
            customFunction.LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    };
    return {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face') as string;
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color') as number;
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, opal.Vector.CONSTANT_DOWN, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'down':
                    controlState(analysis.block, opal.Vector.CONSTANT_UP, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'north':
                    controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'south':
                    controlState(analysis.block, opal.Vector.CONSTANT_NORTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'east':
                    controlState(analysis.block, opal.Vector.CONSTANT_WEST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
                    break;

                case 'west':
                    controlState(analysis.block, opal.Vector.CONSTANT_EAST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
                    break;

                default: break;
            };
        }
    }
}());
/*
 * 校准型-逻辑异或
 */
components.set(prefix[4] + 'correct_logic_xor', function (): server.BlockCustomComponent {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {[server.Vector3, server.Vector3]} port - 端口向量, 用于判断目标方块的激活状态
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block: server.Block, offset: server.Vector3, port: [server.Vector3, server.Vector3], state: number) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 判断目标方块的激活状态
         *
         * @param input - 方块偏移
         *
         * @returns {boolean} - 目标方块的激活状态
         */
        const checkTarget = (input: server.Vector3): boolean => block.offset(input)?.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = opal.Vector.multiply(offset, index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target) continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch')) continue;
            // 尝试设置目标位置的方块状态值
            opal.TrySetPermutation(target, 'STATE:rune_note', checkTarget(port[0]) != checkTarget(port[1]) ? state : 0);
            // 判断锁存器激活事件是否完成冷却
            if (!opal.TriggerControl('锁存器激活事件', target, 10)) return;
            // 更新锁存器事件
            customFunction.LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    };
    return {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face') as string;
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color') as number;
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, opal.Vector.CONSTANT_DOWN, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'down':
                    controlState(analysis.block, opal.Vector.CONSTANT_UP, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'north':
                    controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'south':
                    controlState(analysis.block, opal.Vector.CONSTANT_NORTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'east':
                    controlState(analysis.block, opal.Vector.CONSTANT_WEST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
                    break;

                case 'west':
                    controlState(analysis.block, opal.Vector.CONSTANT_EAST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
                    break;

                default: break;
            };
        }
    }
}());
/*
 * 校准型-逻辑或非
 */
components.set(prefix[4] + 'correct_logic_nor', function (): server.BlockCustomComponent {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {[server.Vector3, server.Vector3]} port - 端口向量, 用于判断目标方块的激活状态
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block: server.Block, offset: server.Vector3, port: [server.Vector3, server.Vector3], state: number) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 判断目标方块的激活状态
         *
         * @param input - 方块偏移
         *
         * @returns {boolean} - 目标方块的激活状态
         */
        const checkTarget = (input: server.Vector3): boolean => block.offset(input)?.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = opal.Vector.multiply(offset, index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target) continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch')) continue;
            // 尝试设置目标位置的方块状态值
            opal.TrySetPermutation(target, 'STATE:rune_note', checkTarget(port[0]) || checkTarget(port[1]) ? 0 : state);
            // 判断锁存器激活事件是否完成冷却
            if (!opal.TriggerControl('锁存器激活事件', target, 10)) return;
            // 更新锁存器事件
            customFunction.LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    };
    return {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face') as string;
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color') as number;
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, opal.Vector.CONSTANT_DOWN, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'down':
                    controlState(analysis.block, opal.Vector.CONSTANT_UP, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'north':
                    controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'south':
                    controlState(analysis.block, opal.Vector.CONSTANT_NORTH, [opal.Vector.CONSTANT_EAST, opal.Vector.CONSTANT_WEST], color);
                    break;

                case 'east':
                    controlState(analysis.block, opal.Vector.CONSTANT_WEST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
                    break;

                case 'west':
                    controlState(analysis.block, opal.Vector.CONSTANT_EAST, [opal.Vector.CONSTANT_SOUTH, opal.Vector.CONSTANT_NORTH], color);
                    break;

                default: break;
            };
        }
    }
}());
/*
 * 校准型-偏转棱镜
 */
components.set(prefix[4] + 'correct_deflection_prism', function (): server.BlockCustomComponent {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block: server.Block, offset: server.Vector3, state: number) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 获取当前方块的锁存控制位状态
         */
        const control = block.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = opal.Vector.multiply(offset, -index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target) continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch')) continue;
            // 尝试设置目标位置的方块状态值
            opal.TrySetPermutation(target, 'STATE:rune_note', control ? state : 0);
            // 判断锁存器激活事件是否完成冷却
            if (!opal.TriggerControl('锁存器激活事件', target, 10)) return;
            // 更新锁存器事件
            customFunction.LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    };
    return {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face') as string;
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color') as number;
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, opal.Vector.CONSTANT_UP, color);
                    break;

                case 'down':
                    controlState(analysis.block, opal.Vector.CONSTANT_DOWN, color);
                    break;

                case 'north':
                    controlState(analysis.block, opal.Vector.CONSTANT_NORTH, color);
                    break;

                case 'south':
                    controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, color);
                    break;

                case 'east':
                    controlState(analysis.block, opal.Vector.CONSTANT_EAST, color);
                    break;

                case 'west':
                    controlState(analysis.block, opal.Vector.CONSTANT_WEST, color);
                    break;

                default: break;
            }
        }
    }
}());
/*
 * 校准型-分光棱镜
 */
components.set(prefix[4] + 'correct_spectral_prism', function (): server.BlockCustomComponent {
    /**
     * 控制 魔导总线-脉冲锁存 的状态
     *
     * 该函数通过调整 魔导总线方块 的 数据标签 来改变其状态
     *
     * @param {server.Block} block 魔导总线方块对象, 代表需要控制状态的逻辑元件方块
     *
     * @param {server.Vector3}  offset 偏移量向量, 用于计算状态调整的目标位置
     *
     * @param {number} state -目标更新的状态值, 用于设置脉冲锁存 的状态
     */
    function controlState(block: server.Block, offset: server.Vector3, state: number) {
        /**
         * 创建 Molang 变量映射对象
         */
        const molang = new server.MolangVariableMap();
        /**
         * 获取当前方块的锁存控制位状态
         */
        const control = block.hasTag('tags:magic_cable.open') ?? false;
        // 遍历 1 到 15 之间的所有可能的指标位置
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = opal.Vector.multiply(offset, -index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target) continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch')) continue;
            // 尝试设置目标位置的方块状态值
            opal.TrySetPermutation(target, 'STATE:rune_note', control ? state : 0);
            // 判断锁存器激活事件是否完成冷却
            if (!opal.TriggerControl('锁存器激活事件', target, 10)) break;
            // 更新锁存器事件
            customFunction.LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        };
        for (let index = 1; index < 16; index++) {
            /**
             * 根据当前指标计算目标位置
             */
            const indicator = opal.Vector.multiply(offset, index);
            /**
             * 获取相对位置的方块对象
             */
            const target = block.offset(indicator);
            // 跳过无效位置
            if (!target) continue;
            // 尝试设置粒子参数
            molang.setColorRGB('variable.color', [...rune_color][state - 1][1]);
            // 尝试生成粒子
            opal.TrySpawnParticle(target.dimension, 'scripts:color_trajectory', target.center(), molang);
            // 如果目标位置不是脉冲锁存器, 则跳过当前循环
            if (!target.hasTag('tags:magic_cable.latch')) continue;
            // 尝试设置目标位置的方块状态值
            opal.TrySetPermutation(target, 'STATE:rune_note', control ? state : 0);
            // 判断锁存器激活事件是否完成冷却
            if (!opal.TriggerControl('锁存器激活事件', target, 10)) break;
            // 更新锁存器事件
            customFunction.LatchUpdateEvent(target);
            // 设置完成后, 跳出循环
            break;
        }
    };
    return {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face') as string;
            /**
             * * 方块的色彩状态值
             */
            const color = analysis.state.getState('STATE:color') as number;
            // 判断设备朝向
            switch (face) {
                case 'up':
                    controlState(analysis.block, opal.Vector.CONSTANT_UP, color);
                    break;

                case 'down':
                    controlState(analysis.block, opal.Vector.CONSTANT_DOWN, color);
                    break;

                case 'north':
                    controlState(analysis.block, opal.Vector.CONSTANT_NORTH, color);
                    break;

                case 'south':
                    controlState(analysis.block, opal.Vector.CONSTANT_SOUTH, color);
                    break;

                case 'east':
                    controlState(analysis.block, opal.Vector.CONSTANT_EAST, color);
                    break;

                case 'west':
                    controlState(analysis.block, opal.Vector.CONSTANT_WEST, color);
                    break;

                default: break;
            }
        }
    }
}());
/*
 * 打包投送
 */
components.set(prefix[4] + 'package_delivery',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const face = analysis.state.getState('minecraft:block_face') as string;
            // 执行功能
            customFunction.packageDelivery(analysis.block, face);
            // 播放音效 与 粒子效果
            analysis.dimension?.playSound('beacon.deactivate', analysis.block.location);
            // 状态重置
            opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
    }
);
/*
 * 方块放置
 */
components.set(prefix[4] + 'block_placement',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 执行功能
            customFunction.blockPlacement(analysis.block);
            // 播放音效 与 粒子效果
            analysis.dimension?.playSound('beacon.deactivate', analysis.block.location);
            // 状态重置
            opal.TrySetPermutation(analysis.block, 'STATE:energy', opal.RandomFloor(0, 6));
            opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
    }
);
/*
 * 物资收集
 */
components.set(prefix[4] + 'material_collection',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 执行功能
            customFunction.materialCollection(analysis.block, analysis.state);
            // 播放音效 与 粒子效果
            analysis.dimension?.playSound('beacon.deactivate', analysis.block.location);
            // 状态重置
            opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
    }
);
/*
 * 伺服基座
 */
components.set(prefix[4] + 'servo_drive',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * * 方块前处理事件
             */
            function beforeEvent() {
                /**
                 ** 查询方块标签
                 */
                const hasTag = (offset: server.Vector3, tag: string) => analysis.block.offset(offset)?.getTags().includes(tag) ?? false;
                // 使能 模块运行
                switch (analysis.condition) {
                    case 1:
                        if (hasTag({ x: 1, y: -1, z: 0 }, 'tags:magic_cable.series'))
                            if (!hasTag(opal.Vector.CONSTANT_EAST, 'tags:magic_cable.series'))
                                customFunction.Susceptor(analysis.block, 'X+');
                        break;

                    case 2:
                        if (hasTag({ x: -1, y: -1, z: 0 }, 'tags:magic_cable.series'))
                            if (!hasTag(opal.Vector.CONSTANT_WEST, 'tags:magic_cable.series'))
                                customFunction.Susceptor(analysis.block, 'X-');
                        break;

                    case 3:
                        if (hasTag({ x: 0, y: -1, z: 1 }, 'tags:magic_cable.series'))
                            if (!hasTag(opal.Vector.CONSTANT_SOUTH, 'tags:magic_cable.series'))
                                customFunction.Susceptor(analysis.block, 'Z+');
                        break;

                    case 4:
                        if (hasTag({ x: -0, y: -1, z: -1 }, 'tags:magic_cable.series'))
                            if (!hasTag(opal.Vector.CONSTANT_NORTH, 'tags:magic_cable.series'))
                                customFunction.Susceptor(analysis.block, 'Z-');
                        break;

                    default: break;
                };
                // 同步状态
                for (let index = 0; index <= 5; index++) {
                    /**
                     ** 方块标签
                     */
                    const tag = 'tags:servo_machine.value.' + index;
                    // 赋值 方块状态
                    if (hasTag(opal.Vector.CONSTANT_EAST, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
                    if (hasTag(opal.Vector.CONSTANT_WEST, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
                    if (hasTag(opal.Vector.CONSTANT_SOUTH, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
                    if (hasTag(opal.Vector.CONSTANT_NORTH, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
                };
                // 复位状态
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            };
            /**
             * * 方块后处理事件
             */
            function afterEvent() {
                /**
                 ** 方块状态值
                 */
                const direction = analysis.state.getState('STATE:direction') as number;
                // 复位状态
                opal.TrySetPermutation(analysis.block, 'STATE:direction', 0);
                // 执行 功能
                switch (direction) {
                    case 1:
                        for (let index = 0; index <= 5; index++) {
                            // 校验 状态
                            if (index != analysis.state.getState('STATE:value')) continue;
                            // 获取 锚点坐标
                            const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
                            const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_EAST) as server.Vector3, { delimiter: ' ' });
                            const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: 1, y: index, z: 0 }) as server.Vector3, { delimiter: ' ' });
                            const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: index, z: 0 }) as server.Vector3, { delimiter: ' ' });
                            // 执行 方块命令
                            analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                            analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_1} replace move`);
                            analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                        };
                        break;

                    case 2:
                        for (let index = 0; index <= 5; index++) {
                            // 校验 状态
                            if (index != analysis.state.getState('STATE:value')) continue;
                            // 获取 锚点坐标
                            const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
                            const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_WEST) as server.Vector3, { delimiter: ' ' });
                            const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: -1, y: index, z: 0 }) as server.Vector3, { delimiter: ' ' });
                            const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: index, z: 0 }) as server.Vector3, { delimiter: ' ' });
                            // 执行 方块命令
                            analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                            analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_1} replace move`);
                            analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                        };
                        break;

                    case 3:
                        for (let index = 0; index <= 5; index++) {
                            // 校验 状态
                            if (index != analysis.state.getState('STATE:value')) continue;
                            // 获取 锚点坐标
                            const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
                            const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_SOUTH) as server.Vector3, { delimiter: ' ' });
                            const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: 0, y: index, z: 1 }) as server.Vector3, { delimiter: ' ' });
                            const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: index, z: 0 }) as server.Vector3, { delimiter: ' ' });
                            // 执行 方块命令
                            analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                            analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_1} replace move`);
                            analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                        };
                        break;

                    case 4:
                        for (let index = 0; index <= 5; index++) {
                            // 校验 状态
                            if (index != analysis.state.getState('STATE:value')) continue;
                            // 获取 锚点坐标
                            const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
                            const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_NORTH) as server.Vector3, { delimiter: ' ' });
                            const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: 0, y: index, z: -1 }) as server.Vector3, { delimiter: ' ' });
                            const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: index, z: 0 }) as server.Vector3, { delimiter: ' ' });
                            // 执行 方块命令
                            analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                            analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_1} replace move`);
                            analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                        };
                        break;

                    default: break;
                };
            };
            if (analysis.condition != 0) beforeEvent();
            else if (analysis.state.getState('STATE:direction') != 0) afterEvent();
        }
    }
);
/*
 * 伺服牵引
 */
components.set(prefix[4] + 'servo_traction',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * * 方块前处理事件
             */
            function beforeEvent() {
                /**
                 ** 查询方块标签
                 */
                const hasTag = (offset: server.Vector3, tag: string) => analysis.block.offset(offset)?.getTags().includes(tag) ?? false;
                // 使能 模块运行
                switch (analysis.condition) {
                    case 1:
                        if (hasTag({ x: 1, y: 1, z: 0 }, 'tags:magic_cable.series'))
                            if (!hasTag(opal.Vector.CONSTANT_EAST, 'tags:magic_cable.series'))
                                customFunction.Susceptor(analysis.block, 'X+');
                        break;

                    case 2:
                        if (hasTag({ x: -1, y: 1, z: 0 }, 'tags:magic_cable.series'))
                            if (!hasTag(opal.Vector.CONSTANT_WEST, 'tags:magic_cable.series'))
                                customFunction.Susceptor(analysis.block, 'X-');
                        break;

                    case 3:
                        if (hasTag({ x: 0, y: 1, z: 1 }, 'tags:magic_cable.series'))
                            if (!hasTag(opal.Vector.CONSTANT_SOUTH, 'tags:magic_cable.series'))
                                customFunction.Susceptor(analysis.block, 'Z+');
                        break;

                    case 4:
                        if (hasTag({ x: -0, y: 1, z: -1 }, 'tags:magic_cable.series'))
                            if (!hasTag(opal.Vector.CONSTANT_NORTH, 'tags:magic_cable.series'))
                                customFunction.Susceptor(analysis.block, 'Z-');
                        break;

                    default: break;
                };
                // 同步状态
                for (let index = 0; index <= 5; index++) {
                    /**
                     ** 方块标签
                     */
                    const tag = 'tags:servo_machine.value.' + index;
                    // 赋值 方块状态
                    if (hasTag(opal.Vector.CONSTANT_EAST, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
                    if (hasTag(opal.Vector.CONSTANT_WEST, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
                    if (hasTag(opal.Vector.CONSTANT_SOUTH, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
                    if (hasTag(opal.Vector.CONSTANT_NORTH, tag)) opal.TrySetPermutation(analysis.block, 'STATE:value', index);
                };
                // 复位状态
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            };
            /**
             * * 方块后处理事件
             */
            function afterEvent() {
                /**
                 ** 方块状态值
                 */
                const direction = analysis.state.getState('STATE:direction') as number;
                // 复位状态
                opal.TrySetPermutation(analysis.block, 'STATE:direction', 0);
                // 执行 功能
                switch (direction) {
                    case 1:
                        for (let index = 0; index <= 5; index++) {
                            // 校验 状态
                            if (index != analysis.state.getState('STATE:value')) continue;
                            // 获取 锚点坐标
                            const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
                            const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_EAST) as server.Vector3, { delimiter: ' ' });
                            const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: 1, y: -index, z: 0 }) as server.Vector3, { delimiter: ' ' });
                            const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 0 }) as server.Vector3, { delimiter: ' ' });
                            // 执行 方块命令
                            analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                            analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_2} replace move`);
                            analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                        };
                        break;

                    case 2:
                        for (let index = 0; index <= 5; index++) {
                            // 校验 状态
                            if (index != analysis.state.getState('STATE:value')) continue;
                            // 获取 锚点坐标
                            const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
                            const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_WEST) as server.Vector3, { delimiter: ' ' });
                            const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: -1, y: -index, z: 0 }) as server.Vector3, { delimiter: ' ' });
                            const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 0 }) as server.Vector3, { delimiter: ' ' });
                            // 执行 方块命令
                            analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                            analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_2} replace move`);
                            analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                        };
                        break;

                    case 3:
                        for (let index = 0; index <= 5; index++) {
                            // 校验 状态
                            if (index != analysis.state.getState('STATE:value')) continue;
                            // 获取 锚点坐标
                            const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
                            const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_SOUTH) as server.Vector3, { delimiter: ' ' });
                            const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 1 }) as server.Vector3, { delimiter: ' ' });
                            const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 0 }) as server.Vector3, { delimiter: ' ' });
                            // 执行 方块命令
                            analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                            analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_2} replace move`);
                            analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                        };
                        break;

                    case 4:
                        for (let index = 0; index <= 5; index++) {
                            // 校验 状态
                            if (index != analysis.state.getState('STATE:value')) continue;
                            // 获取 锚点坐标
                            const anchor_0 = opal.Vector.toString(analysis.block as server.Vector3, { delimiter: ' ' });
                            const anchor_1 = opal.Vector.toString(analysis.block.offset(opal.Vector.CONSTANT_NORTH) as server.Vector3, { delimiter: ' ' });
                            const anchor_2 = opal.Vector.toString(analysis.block.offset({ x: 0, y: -index, z: -1 }) as server.Vector3, { delimiter: ' ' });
                            const anchor_3 = opal.Vector.toString(analysis.block.offset({ x: 0, y: -index, z: 0 }) as server.Vector3, { delimiter: ' ' });
                            // 执行 方块命令
                            analysis.dimension.runCommand(`fill ${anchor_1} ${anchor_2} air [] destroy`);
                            analysis.dimension.runCommand(`clone ${anchor_0} ${anchor_3} ${anchor_2} replace move`);
                            analysis.dimension.runCommand(`fill ${anchor_0} ${anchor_0} air`);
                        };
                        break;

                    default: break;
                };
            };
            if (analysis.condition != 0) beforeEvent();
            else if (analysis.state.getState('STATE:direction') != 0) afterEvent();
        }
    }
);
/*
 * 驱动核心
 */
components.set(prefix[4] + 'servo_omphalos',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 播放音效 与 粒子效果
            analysis.dimension?.playSound('beacon.deactivate', analysis.block.location);
            // 状态重置
            opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            // 执行功能
            switch (analysis.condition) {
                case 1: customFunction.servoOmphalos(analysis.block, 'X+'); break;
                case 2: customFunction.servoOmphalos(analysis.block, 'X-'); break;

                case 3: customFunction.servoOmphalos(analysis.block, 'Z+'); break;
                case 4: customFunction.servoOmphalos(analysis.block, 'Z-'); break;

                case 5: customFunction.servoOmphalos(analysis.block, 'Y+'); break;
                case 6: customFunction.servoOmphalos(analysis.block, 'Y-'); break;

                default: break;
            }
        }
    }
);
/*
 * 水平机关门
 */
components.set(prefix[4] + 'horizontal_gate',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 播放音效 与 粒子效果
            analysis.dimension?.playSound('close.iron_door', analysis.block.location);
            // 状态更改
            opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
            // 执行功能
            customFunction.horizontalGate(analysis.block);
        }
    }
);
/*
 * 垂直机关门
 */
components.set(prefix[4] + 'vertical_gate',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 播放音效 与 粒子效果
            analysis.dimension?.playSound('close.iron_door', analysis.block.location);
            // 状态更改
            opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
            // 执行功能
            customFunction.verticalGate(analysis.block);
        }
    }
);
/*
 * 魔晶上传
 */
components.set(prefix[4] + 'magic_crystal_upload',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * * 方块前处理事件
             */
            function beforeEvent() {
                opal.TrySpawnParticle(analysis.dimension, 'constant:prompt_transport_above', analysis.block.bottomCenter());
                analysis.dimension?.playSound('conduit.activate', analysis.block.location);
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
                customFunction.AboveTeleport(analysis.block);
            };
            /**
             * * 方块后处理事件
             */
            function afterEvent() {
                analysis.dimension?.playSound('place.amethyst_block', analysis.block.location);
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            };
            if (analysis.condition != 0 && analysis.condition != 9) beforeEvent();
            else if (analysis.condition == 9) afterEvent();
        }
    }
);
/*
 * 魔晶下传
 */
components.set(prefix[4] + 'magic_crystal_download',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * * 方块前处理事件
             */
            function beforeEvent() {
                opal.TrySpawnParticle(analysis.dimension, 'constant:prompt_transport_below', analysis.block.center());
                analysis.dimension?.playSound('conduit.activate', analysis.block.location);
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 9);
                customFunction.BelowTeleport(analysis.block);
            };
            /**
             * * 方块后处理事件
             */
            function afterEvent() {
                analysis.dimension?.playSound('place.amethyst_block', analysis.block.location);
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
            };
            if (analysis.condition != 0 && analysis.condition != 9) beforeEvent();
            else if (analysis.condition == 9) afterEvent();
        }
    }
);
/*
 * 造石单元
 */
components.set(prefix[4] + 'stone_machine',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * * 方块前处理事件
             */
            function beforeEvent() {
                /**
                 ** 方块状态值
                 */
                const value = analysis.state.getState('STATE:value') as number;
                // 复位状态
                opal.TrySetPermutation(analysis.block, 'STATE:value', value - 1);
            };
            /**
             ** 方块中继事件
             */
            function middleEvent() {
                // 播放音效 与 粒子效果
                analysis.dimension?.playSound('random.fizz', analysis.block.location);
                // 复位状态
                opal.TrySetPermutation(analysis.block, 'STATE:value', 5);
            };
            /**
             * * 方块后处理事件
             */
            function afterEvent() {
                // 播放音效 与 粒子效果
                analysis.dimension?.playSound('bucket.empty_lava', analysis.block.location);
                // 执行功能
                customFunction.Solidify(analysis.block);
                // 复位状态
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
                opal.TrySetPermutation(analysis.block, 'STATE:value', 0);
            };
            /**
             ** 方块状态值
             */
            const value = analysis.state.getState('STATE:value') as number;
            if (value != 0 && value != 1) beforeEvent();
            else if (value == 0) middleEvent();
            else if (value == 1) afterEvent();
        }
    }
);
/*
 * 金属锻压
 */
components.set(prefix[4] + 'metal_forming_press',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             * * 方块前处理事件
             */
            function beforeEvent() {
                /**
                 ** 方块状态值
                 */
                const value = analysis.state.getState('STATE:value') as number;
                // 播放音效 与 粒子效果
                analysis.dimension?.playSound('block.stonecutter.use', analysis.block.location);
                // 复位状态
                opal.TrySetPermutation(analysis.block, 'STATE:value', value + 1);
            };
            /**
             * * 方块后处理事件
             */
            function afterEvent() {
                // 播放音效 与 粒子效果
                analysis.dimension?.playSound('random.anvil_land', analysis.block.location);
                // 执行功能
                customFunction.Forming(analysis.block);
                // 复位状态
                opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
                opal.TrySetPermutation(analysis.block, 'STATE:value', 0);
            };
            /**
             ** 方块状态值
             */
            const value = analysis.state.getState('STATE:value') as number;
            if (value != 7) beforeEvent();
            else if (value == 7) afterEvent();
        }
    }
);
/*
 * 破坏核心
 */
components.set(prefix[4] + 'destroy_the_core',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            // 执行功能
            customFunction.Destroy(analysis.block, analysis.state.getState('minecraft:block_face') as string);
            // 复位状态
            opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
    }
);
/*
 * 矿井单元
 */
components.set(prefix[4] + 'mineral_machine',
    {
        onTick(source: server.BlockComponentTickEvent, data: server.CustomComponentParameters) {
            /**
             * * 方块组件参数 的 解构
             */
            const { block, dimension, state } = customFunction.TickComponentTrigger(source);
            /**
             * 方块组件属性值解析
             */
            const { revise, consumption, probability, doubling_probability: doubling, limit, chunk_size: chunkSize } = data.params as customType.MINERAL_MACHINE;
            // 如果参数对象为空, 则返回
            if (!revise || !consumption || !probability || !doubling || !limit || !chunkSize) return;
            // 判断能量值 是否足够
            if (!opal.ExpendEnergy(block, -consumption)) {
                // 复位状态
                opal.TrySetPermutation(block, 'STATE:rune_type', 0);
                opal.TrySetPermutation(block, revise, 0);
                return
            };
            // 判断方块自身是否因处于产出矿石的状态
            if (state.getState(revise) as number != 8) {
                // 播放音效
                dimension?.playSound('block.stonecutter.use', block.location);
                // 修改方块参数值
                opal.TrySetPermutation(block, revise, state.getState(revise) as number + 1);
            }
            else {
                /**
                 * 矿脉权重表
                 */
                const weightTable: Map<string, number> = new Map();
                // 获取当前维度的参数对象
                const proto = (data.params as customType.MINERAL_MACHINE)[dimension.id];
                // 如果当前维度没有参数对象, 则返回
                if (proto == undefined) return opal.AlterMessageNotify('<§l§b 虚岩矿脉 §r>§n 未发现矿脉§r', block, { text: '虚岩矿井 -> 在当前维度未发现矿脉！' });
                // 使用解构赋值直接从Object.entries获取键值对
                for (const [mineral, weight] of Object.entries(proto)) if (mineral !== undefined && weight !== undefined) weightTable.set(mineral, weight);
                /**
                 * 计算区块坐标
                 */
                const chunkLocation = opal.Vector.chunkLocation(block.location, true, chunkSize);
                /**
                 * 拼接区块标识符
                 */
                const identifier = 'mineral_machine -> ' + dimension.id + chunkLocation.toString();
                /**
                 * 获取区块内已经挖掘矿石数量
                 */
                const currentQuantity = server.world.getDynamicProperty(identifier) || 0;
                // 判断区块内已经挖掘矿石数量是否超过上限
                if (typeof currentQuantity != 'number' || currentQuantity > limit) return opal.AlterMessageNotify('<§l§b 虚岩矿脉 §r>§n 已经耗尽§r', block, { text: '虚岩矿井 -> 无法继续挖掘已枯竭的矿脉！' });
                // 判断是否应该产出矿物
                if (opal.IsEnable(probability)) {
                    /**
                     * 被选中的矿物方块
                     */
                    const mineral = new server.ItemStack(opal.AnalysisWeight(weightTable).output, opal.IsEnable(doubling) ? 2 : 1);
                    /**
                     ** 获取 方块容器
                     */
                    const container = block.south()?.getComponent('minecraft:inventory')?.container;
                    // 判断 物品容器 是否存在
                    if (!container || container.emptySlotsCount == 0) opal.TrySpawnItem(block.dimension, mineral, opal.Vector.add(block, { x: 0.5, y: 1, z: 0.5 }))
                    else container.addItem(mineral);
                }
                // 增加区块内已经挖掘矿石数量
                server.world.setDynamicProperty(identifier, currentQuantity + 1);
                // 播放音效
                dimension?.playSound('random.anvil_land', block.location);
                // 复位状态
                opal.TrySetPermutation(block, 'STATE:rune_type', 0);
                opal.TrySetPermutation(block, revise, 0);
            }
        }
    }
);
/*
 * 能量节点
 */
components.set(prefix[4] + 'energy_node',
    {
        onTick(source: server.BlockComponentTickEvent, data: server.CustomComponentParameters) {
            /**
             * * 方块组件参数 的 解构
             */
            const { block } = customFunction.TickComponentTrigger(source);
            /**
             * * 方块的能量值属性
             */
            const value = (data.params as customType.ENERGY_EXPEND).modify || 10;
            /**
             * * 补充 星尘能 消耗
             */
            const energy = opal.AlterEnergy(block, value, true);
            // 显示 魔晶网络 - 星尘值
            opal.AlterMessageNotify('<§l§b 能量节点 §r>§s 星尘力产出§r', block, { text: '<§l§d 星尘力 §r> : §l§u' + energy[1] + '§q↑§r' });
            // 复位状态
            opal.TrySetPermutation(block, 'STATE:stage', 0);
        }
    }
);
/*
 * 风力动能
 */
components.set(prefix[4] + 'wind_power',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const { block, state } = customFunction.TickComponentTrigger(source);
            /**
             ** 方块状态值
             */
            const rotate = state.getState('STATE:rotate') as number;
            /**
             ** 方块状态值
             */
            const type = state.getState('STATE:stage') as number;
            // 赋值方块状态
            opal.TrySetPermutation(block, 'STATE:rotate', rotate != 2 ? rotate + 1 : 0);
            opal.TrySetPermutation(block, 'STATE:stage', type != 9 ? type + 1 : 0);
            /**
             * * 获取 自身 的 方块状态
             */
            const permutation = block.permutation;
            /**
             * * 获取 当前运行阶段
             */
            const current = permutation.getState('STATE:stage') as number;
            // 判断 方块 是否 有 动能分配模块
            if (!customFunction.hasAdjacentAllocationPower(block)) return;
            // 判断方块是否在 高度阈值内
            if (block.y > 200 || block.y < 64) return;
            /**
             * * 计算 阈值
             */
            const threshold = Math.floor(9 - ((block.y - 64) / 15));
            // 判断阈值 是否 等于 当前运行阶段
            if (current < threshold) return;
            // 播放 风力叶片粒子效果
            if (opal.TriggerControl(block.typeId, block, 60)) {
                /**
                 * * 定义 粒子参数
                 */
                const molang = new server.MolangVariableMap();
                // 定义 粒子参数
                molang.setFloat('variable.direction', 2);
                molang.setFloat('variable.size', 16);
                // 播放 粒子效果
                opal.TrySpawnParticle(block.dimension, 'scripts:path_round', opal.Vector.add(block.location, opal.Vector.CONSTANT_HALF), molang);
                opal.TrySpawnParticle(block.dimension, 'scripts:path_label', opal.Vector.add(block.location, opal.Vector.CONSTANT_HALF), molang);
            };
            // 基于 方块朝向 遍历 动能分配模块
            switch (permutation.getState('minecraft:cardinal_direction')) {
                case 'south': customFunction.AllocationPowerInDirection(block, opal.Vector.CONSTANT_SOUTH); break;

                case 'north': customFunction.AllocationPowerInDirection(block, opal.Vector.CONSTANT_NORTH); break;

                case 'east': customFunction.AllocationPowerInDirection(block, opal.Vector.CONSTANT_EAST); break;

                case 'west': customFunction.AllocationPowerInDirection(block, opal.Vector.CONSTANT_WEST); break;

                default: break;
            };
            // 切换运行阶段
            opal.TrySetPermutation(block, 'STATE:stage', 9);
        }
    }
);
/*
 * 魔晶储罐
 */
components.set(prefix[4] + 'crystal_tank',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const { block, state, dimension } = customFunction.TickComponentTrigger(source);
            /**
             * * 获取 目标方块
             */
            const target = block.above();
            /**
             ** 检测目标块是否为能量节点
             */
            const onTag = target?.getTags()?.includes('tags:energy_module.node') as boolean;
            /**
             ** 获取方块状态
             */
            const caching = state.getState('STATE:caching') as number | undefined;
            // 播放音效 与 粒子效果
            if (!onTag && state.getState('STATE:output') as number == 1) dimension?.playSound('block.grindstone.use', block.location);
            // 如果检测到能量节点
            if (onTag) {
                /**
                 ** 粒子效果索引值
                 */
                const index = opal.RandomFloor(0, 4);
                // 播放粒子效果
                switch (index) {
                    case 0:
                        opal.TrySpawnParticle(dimension, 'constant:excite_rune_red', target?.bottomCenter() as server.Vector3);
                        break;

                    case 1:
                        opal.TrySpawnParticle(dimension, 'constant:excite_rune_blue', target?.bottomCenter() as server.Vector3);
                        break;

                    case 2:
                        opal.TrySpawnParticle(dimension, 'constant:excite_rune_green', target?.bottomCenter() as server.Vector3);
                        break;

                    case 3:
                        opal.TrySpawnParticle(dimension, 'constant:excite_rune_orange', target?.bottomCenter() as server.Vector3);
                        break;

                    case 4:
                        opal.TrySpawnParticle(dimension, 'constant:excite_rune_purple', target?.bottomCenter() as server.Vector3);
                        break;

                    default: break;
                };
                // 赋值方块状态
                opal.TrySetPermutation(block, 'STATE:caching', (caching || 0) + Math.floor(Math.random() * 2));
                // 替换储罐方块
                if (caching == 8) block.setPermutation(server.BlockPermutation.resolve('starry_map:empty_tank'));
                // 判断 方块 是否 存在
                if (target && target.isValid) opal.TrySetPermutation(target, 'STATE:stage', 1);
            };
            // 赋值方块状态
            opal.TrySetPermutation(block, 'STATE:output', onTag ? 1 : 0);
        }
    }
);
/*
 * 变换储罐
 */
components.set(prefix[4] + 'transform_tank',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             ** 辉光-魔晶储罐
             */
            const constant = server.BlockPermutation.resolve('starry_map:release_tank');
            // 播放粒子效果
            switch (opal.RandomFloor(0, 4)) {
                case 0:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_red', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 1:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_blue', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 2:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_green', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 3:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_orange', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 4:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:fireworks_fireball_rune_purple', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                default: break;
            };
            switch (opal.RandomFloor(0, 4)) {
                case 0:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_red', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 1:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_blue', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 2:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_green', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 3:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_orange', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 4:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:pulse_rune_purple', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                default: break;
            };
            switch (opal.RandomFloor(0, 4)) {
                case 0:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_red', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 1:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_blue', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 2:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_green', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 3:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_orange', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                case 4:
                    opal.TrySpawnParticle(analysis.dimension, 'constant:erupt_rune_purple', analysis.block.above()?.bottomCenter() as server.Vector3);
                    break;

                default: break;
            };
            analysis.dimension.playSound('cauldron.explode', analysis.block.location);
            analysis.block.setPermutation(constant);
        }
    }
);
/*
 * 动能分配
 */
components.set(prefix[4] + 'allocation_power',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const { block } = customFunction.TickComponentTrigger(source);
            /**
             * * 获取 目标方块
             */
            const target = block.above();
            /**
             ** 检测目标块是否为能量节点
             */
            const onTag = target?.getTags()?.includes('tags:energy_module.node') as boolean;
            // 判断 方块 是否 为 能量节点
            if (!onTag) return;
            // 赋值方块状态
            opal.TrySetPermutation(block, 'STATE:output', 0);
            // 判断 方块 是否 存在
            if (target && target.isValid) opal.TrySetPermutation(target, 'STATE:stage', 1);
        }
    }
);
/*
 * 熔岩质能
 */
components.set(prefix[4] + 'magma_power',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const { block, state, dimension } = customFunction.TickComponentTrigger(source);
            /**
             ** 获取计数值
             */
            const count = state.getState('STATE:count') as number;
            /**
             ** 获取熔岩量
             */
            const magma = state.getState('STATE:magma') as number;
            // 播放音效
            dimension?.playSound('fire.fire', block.location);
            // 执行功能
            if (customFunction.hasAdjacentAllocationPower(block)) {
                // 遍历 动能分配模块
                customFunction.AllocationPowerInDirection(block, opal.Vector.CONSTANT_SOUTH);
                customFunction.AllocationPowerInDirection(block, opal.Vector.CONSTANT_NORTH);
                customFunction.AllocationPowerInDirection(block, opal.Vector.CONSTANT_EAST);
                customFunction.AllocationPowerInDirection(block, opal.Vector.CONSTANT_WEST);
            };
            // 执行一定次数后修改方块状态
            customFunction.blockTimer(block, 2,
                () => {
                    if (count == 0) {
                        opal.TrySetPermutation(block, 'STATE:count', 15);
                        opal.TrySetPermutation(block, 'STATE:magma', magma - 1);
                    }
                    else {
                        opal.TrySetPermutation(block, 'STATE:count', count - 1);
                    };
                }
            )
        }
    }
);
/*
 * 水素质能
 */
components.set(prefix[4] + 'water_power',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const { block, state, dimension } = customFunction.TickComponentTrigger(source);
            /**
             * * 前处理事件
             */
            function beforeEvent() {
                /**
                 ** 空气方块
                 */
                const air = server.BlockPermutation.resolve('minecraft:air');
                /**
                 ** 水源方块
                 */
                const water = server.BlockPermutation.resolve('minecraft:water');
                /**
                 ** 锚点_a
                 */
                const anchor_a = opal.Vector.add(block.location, opal.Vector.CONSTANT_ONE);
                /**
                 ** 锚点_b
                 */
                const anchor_b = opal.Vector.add(block.location, opal.Vector.CONSTANT_LOSS_ONE);
                /**
                 ** 获取计数值
                 */
                const isWater = block.below()?.isLiquid as boolean;
                /**
                 ** 获取方块状态
                 */
                const current = state.getState('STATE:stage') as number;
                // 赋值 方块状态
                if (isWater) opal.TrySetPermutation(block, 'STATE:stage', current + 1);
                // 将 水源 置换为 空气
                opal.TryFillBlocks(dimension, anchor_a, anchor_b, air, { blockFilter: { includePermutations: [water] } });
            };
            /**
             * * 后处理事件
             */
            function afterEvent() {
                /**
                 * * 获取 自身 的 方块状态
                 */
                const permutation = block.permutation;
                // 判断 方块 是否 有 动能分配模块
                if (!customFunction.hasAdjacentAllocationPower(block)) return;
                // 切换运行阶段
                opal.TrySetPermutation(block, 'STATE:stage', 0);
                // 基于 方块朝向 遍历 动能分配模块
                switch (permutation.getState('minecraft:cardinal_direction')) {
                    case 'south': customFunction.AllocationPowerInDirection(block, opal.Vector.CONSTANT_SOUTH); break;

                    case 'north': customFunction.AllocationPowerInDirection(block, opal.Vector.CONSTANT_NORTH); break;

                    case 'east': customFunction.AllocationPowerInDirection(block, opal.Vector.CONSTANT_EAST); break;

                    case 'west': customFunction.AllocationPowerInDirection(block, opal.Vector.CONSTANT_WEST); break;

                    default: break;
                };
                // 播放 水花 粒子效果
                opal.SprayParticleTrigger(block.dimension, block.center());
            };
            if (state.getState('STATE:stage') as number !== 9) beforeEvent();
            else afterEvent();
        }
    }
);
/*
 * 植树造木
 */
components.set(prefix[4] + 'planting_and_logging',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const { block, state, dimension } = customFunction.TickComponentTrigger(source);
            /**
             * * 前处理事件
             */
            function beforeEvent() {
                /**
                 ** 获取计数值
                 */
                const stage = state.getState('STATE:stage') as number;
                dimension.playSound('block.composter.fill_success', block.location);
                opal.TrySetPermutation(block, 'STATE:stage', stage + 1);
            };
            /**
             * * 后处理事件
             */
            function afterEvent() {
                opal.TrySetPermutation(block, 'STATE:rune_type', 0);
                opal.TrySetPermutation(block, 'STATE:stage', 0);
                // 判断能量值 是否足够
                if (!opal.ExpendEnergy(block, -50)) return;
                /**
                 * * 获取 方块
                 */
                const target = block.south();
                // 检测 方块是否存在
                if (!target || !target.isValid) return;
                /**
                 * * 测试 方块类型
                 */
                const test = is_wood.has(target.typeId);
                /**
                 * 深色橡木锚点-0
                 */
                const anchor_0 = opal.Vector.add(block.location, { x: 1, y: 0, z: 2 });
                /**
                 * 深色橡木锚点-1
                 */
                const anchor_1 = opal.Vector.add(block.location, opal.Vector.CONSTANT_SOUTH);
                if (!test) return;
                switch (target?.typeId) {
                    // 黑橡木
                    case 'minecraft:dark_oak_log': opal.TryFillBlocks(block.dimension, anchor_0, anchor_1, 'minecraft:dark_oak_sapling'); break;
                    // 橡木
                    case 'minecraft:oak_log': target.setPermutation(server.BlockPermutation.resolve('minecraft:oak_sapling')); break;
                    // 云杉
                    case 'minecraft:spruce_log': target.setPermutation(server.BlockPermutation.resolve('minecraft:spruce_sapling')); break;
                    // 白桦
                    case 'minecraft:birch_log': target.setPermutation(server.BlockPermutation.resolve('minecraft:birch_sapling')); break;
                    // 丛林
                    case 'minecraft:jungle_log': target.setPermutation(server.BlockPermutation.resolve('minecraft:jungle_sapling')); break;
                    // 金合欢
                    case 'minecraft:acacia_log': target.setPermutation(server.BlockPermutation.resolve('acacia_sapling')); break;
                    // 樱花树
                    case 'minecraft:cherry_log': target.setPermutation(server.BlockPermutation.resolve('minecraft:cherry_sapling')); break;
                    // 绯红菌柄
                    case 'minecraft:crimson_stem': target.setPermutation(server.BlockPermutation.resolve('minecraft:crimson_fungus')); break;
                    // 诡异菌柄
                    case 'minecraft:warped_stem': target.setPermutation(server.BlockPermutation.resolve('minecraft:warped_fungus')); break;

                    default: break;
                };
                /**
                 * * 定义 起始点
                 */
                const start = opal.Vector.add(block, { x: -7, y: -1, z: -6 });
                /**
                 * * 定义 结束点
                 */
                const done = opal.Vector.add(block, { x: 7, y: 19, z: 8 });
                /**
                 * * 在 绘制路径 时 执行 的 程序
                 */
                const moveEvent = (args: type.ROUTE_ANNEX_ARGS) => {
                    /**
                     * * 检测方块是否需要被挖掘
                     */
                    const TestSort = () => {
                        /**
                         * * 获取 方块对象
                         */
                        const getBlock = args.dimension.getBlock(args.location);
                        // 检测 方块类型
                        if (getBlock) return is_trees.has(getBlock.typeId);
                        else return false
                    }
                    //执行路径事件的功能
                    if (TestSort()) args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`)
                    // 继续循环
                    return true
                };
                // 创建 路径执行计划
                opal.PathExecute.CreateForCube(
                    '植树造木-范围扫描',
                    {
                        particles: ['constant:track_rune_green'],
                        dimension: block.dimension,
                        locations: [],
                        cooldown: 1,
                        speed: 1,
                        offset: opal.Vector.CONSTANT_HALF,
                        on_move: moveEvent
                    },
                    start, done, 0.5
                );
            };
            if (state.getState('STATE:stage') as number !== 5) beforeEvent();
            else afterEvent();
        }
    }
);
/*
 * 作物侦测
 */
components.set(prefix[4] + 'crop_detection',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const { block, dimension } = customFunction.TickComponentTrigger(source);
            /**
             ** 检测方块是否处于开启状态
             */
            const onTag = block.above()?.getTags()?.includes('tags:magic_cable.open') as boolean;
            // 如果开启状态
            if (onTag) return;
            // 播放音效
            dimension.playSound('block.composter.ready', block.location);
            // 判断能量值 是否足够
            if (!opal.ExpendEnergy(block, -5)) return;
            /**
             * * 定义 路径事件
             */
            const TickEvent = (args: type.ROUTE_ANNEX_ARGS) => {
                /**
                 * * 获取 方块
                 */
                const block = args.dimension.getBlock(args.location);
                // 检测 方块是否存在
                if (!block || !block.isValid) return false;
                /**
                 * * 获取 方块类型
                 */
                const protoResult = is_crops.get(block.typeId);
                /**
                 * * 获取 方块状态
                 */
                const getPermutation = block.permutation;
                // 如果 可以收割
                if (protoResult === true || getPermutation.getState('growth') == 7) return false;
                else if (block.typeId == 'minecraft:sweet_berry_bush' && getPermutation.getState('growth') == 3) return false;
                else if (block.typeId == 'minecraft:cocoa' && getPermutation.getState('age') == 2) return false;
                else if (block.typeId == 'nether_wart' && getPermutation.getState('age') == 3) return false;
                // 继续循环
                else return true;
            };
            /**
             * * 定义 停止事件
             */
            const StopEvent = (args: type.ROUTE_ANNEX_ARGS) => {
                if (args.tick > 15) return;
                /**
                 * * 获取 方块
                 */
                const target = block.north();
                // 检测 方块是否存在
                if (!target || !target.isValid) return;
                // 设置方块状态
                opal.TrySetPermutation(target, 'STATE:rune_type', opal.RandomFloor(1, 7));
            };
            // 创建 路径事件
            opal.PathExecute.Create('作物侦测-检测射线', 1,
                {
                    locations: [block, opal.Vector.add(block, { x: 0, y: 0, z: 15 })],
                    particles: ['constant:track_rune_green'],
                    offset: { x: 0.5, y: 0.5, z: 0.5 },
                    dimension: block.dimension,
                    on_move: TickEvent,
                    on_done: StopEvent,
                    cooldown: 1,
                    speed: 1
                }
            );
        }
    }
);
/*
 * 魔晶明灯
 */
components.set(prefix[4] + 'magic_crystal_lamp',
    {
        onTick(source: server.BlockComponentTickEvent) {
            /**
             * * 方块组件参数 的 解构
             */
            const analysis = customFunction.TickComponentTrigger(source);
            /**
             ** 获取方块状态
             */
            const light = analysis.state.getState('STATE:light') as number;
            if (analysis.condition as number <= 3 && light != 15) opal.TrySetPermutation(analysis.block, 'STATE:light', light + 1);
            if (analysis.condition as number >= 4 && light != 0) opal.TrySetPermutation(analysis.block, 'STATE:light', light - 1);
            if (analysis.condition as number == 6) opal.TrySetPermutation(analysis.block, 'STATE:light', 15);
            if (analysis.condition as number == 7) opal.TrySetPermutation(analysis.block, 'STATE:light', 0);
            opal.TrySetPermutation(analysis.block, 'STATE:rune_type', 0);
        }
    }
);
/*
 * 水域天降
 */
components.set(prefix[4] + 'virtual_weather',
	{
		onTick(source: server.BlockComponentTickEvent, data: server.CustomComponentParameters) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = customFunction.TickComponentTrigger(source);
			/**
			 * * 获取计数值
			 */
			const stage = analysis.state.getState('STATE:stage') as number;
			/**
			 * * 检测方块是否处于开启状态
			 */
			const onTag = analysis.block.below()?.getTags()?.includes('tags:magic_cable.open') as boolean;
			/**
			 * * 获取粒子效果类型
			 */
			const { particle } = data.params as customType.VIRTUAL_WEATHER;
			// 检测是否处于开启状态
			if (!onTag) return;
			// 播放基础粒子效果
			if (stage == 0) opal.TrySpawnParticle(analysis.dimension, 'constant:impact_rune_white', analysis.block.location);
			// 播放自定义粒子效果
			if (stage == 0 && particle) opal.TrySpawnParticle(analysis.dimension, particle, analysis.block.location);
			// 设置方块状态值
			opal.TrySetPermutation(analysis.block, 'STATE:stage', stage != 3 ? stage + 1 : 0);
		}
	}
);
/*
 * 脉冲尖峰
 */
components.set(prefix[4] + 'PulsePeakCannon',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const { block } = customFunction.TickComponentTrigger(source);
			/**
			 ** 检测方块是否处于开启状态
			 */
			const onTag = block.below()?.getTags()?.includes('tags:magic_cable.open') as boolean;
			// 如果开启状态 或 能量值 是否足够
			if (!onTag || !opal.ExpendEnergy(block, -1)) return;
			/**
			 * * 设置 范围查询 的 过滤条条件
			 */
			const options: server.EntityQueryOptions = {
				excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
				excludeFamilies: ['player', 'starry'],
				location: block.location,
				maxDistance: 32,
				closest: 8
			};
			/**
			 * * 获取 目标列表
			 */
			const targets = block.dimension.getEntities(options).filter(
				entity => {
					const family = entity.getComponent('type_family');
					if (entity.target?.typeId === "minecraft:player") return true;
					if (entity.target?.hasTag('is_Contract')) return true;
					if (family?.hasTypeFamily('monster')) return true;
				}
			)
			if (targets.length === 0 || !opal.ExpendEnergy(block, -150)) return;
			/**
			 * * 暴击概率
			 */
			const erupt = opal.IsEnable(15);
			/**
			 * * 获取 炮击范围顶点
			 */
			const anchor_0 = block.offset({ x: opal.RandomFloat(-2, 2), y: 8, z: opal.RandomFloat(-2, 2) }) ?? block.center();
			/**
			 * * 获取 炮击范围顶点
			 */
			const anchor_1 = block.offset({ x: opal.RandomFloat(-4, 4), y: 4, z: opal.RandomFloat(-4, 4) }) ?? block.center();
			/**
			 * * 获取 随机炮击顶点
			 */
			const focus = opal.Vector.rangeRandom(anchor_0, anchor_1);
			/**
			 * * 炮弹爆炸事件
			 *
			 * @param args - 附加参数
			 */
			const powerExplode = (args: type.ROUTE_ANNEX_ARGS) => {
				// 验证 实体状态 是否正确
				if (!block || !block.isValid) return;
				/**
				 * * 过滤器参数
				 */
				const options: server.EntityQueryOptions = {
					excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
					excludeFamilies: ['player', 'starry'],
					location: args.location,
					maxDistance: 4,
					closest: 4
				};
				/**
				 * * 获取实体列表
				 */
				const entitys = args.dimension.getEntities(options).filter(
					entity => {
						const family = entity.getComponent('type_family');
						if (entity.target?.typeId === "minecraft:player") return true;
						if (entity.target?.hasTag('is_Contract')) return true;
						if (family?.hasTypeFamily('monster')) return true;
					}
				);
				/**
				 * * 创建 炮弹面板
				 */
				const bombData = opal.CreateEmptyProperty(
					{
						basic_attack: 15,
						erupt_odds: 45,
						erupt_hurt: 480,
						self_rune: 'rune_purple'
					}
				);
				/**
				 * * 获取 玩家
				 */
				const player = server.world.getPlayers()[0];
				// 创建 元素伤害
				entitys.forEach(entity => opal.ElementalAttack(player, entity, erupt, bombData));
				opal.TrySpawnParticle(args.dimension, 'constant:fireworks_fireball_rune_purple', args.location);
			};
			// 创建 路径包
			opal.PathExecute.Create('脉冲尖峰炮-炮击轨迹', 1,
				{
					locations: [block.center(), focus, targets[0].getHeadLocation()],
					particles: ['constant:track_rune_purple'],
					dimension: block.dimension,
					on_done: powerExplode,
					cooldown: 1,
					speed: 1
				}
			)
		}
	}
);
/*
 * 曜石熔炉
 */
components.set(prefix[4] + 'obsidian_furnace',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = customFunction.TickComponentTrigger(source);
			/**
			 * * 前处理事件
			 */
			function beforeEvent() {
				/**
				 * * 获取剩余石材数量
				 */
				const material = analysis.state.getState('STATE:material') as number;
				/**
				 * * 获取方块运行阶段
				 */
				const stage = analysis.state.getState('STATE:stage') as number;
				/**
				 * * 获取熔岩库存量
				 */
				const magma = analysis.state.getState('STATE:magma') as number;
				// 检测是否为 熔岩生成 阶段
				if (stage == 1 && material != 0) {
					opal.TrySetPermutation(analysis.block, 'STATE:material', material - 1);
					opal.TrySetPermutation(analysis.block, 'STATE:magma', magma + 1);
					opal.TrySetPermutation(analysis.block, 'STATE:direction_0', 0);
					opal.TrySetPermutation(analysis.block, 'STATE:direction_1', 0);
					opal.TrySetPermutation(analysis.block, 'STATE:direction_2', 0);
					opal.TrySetPermutation(analysis.block, 'STATE:direction_3', 0);
					opal.TrySetPermutation(analysis.block, 'STATE:stage', 0);
				}
				else if (stage == 0) customFunction.consumeEnergyAndAdvanceStage(analysis.block);
			};
			/**
			 * * 后处理事件
			 */
			function afterEvent() {
				const direction_0 = analysis.block.offset({ x: 0, y: -1, z: -1 })?.getTags()?.includes('tags:obsidian_smelting.storage_tank')
				const direction_1 = analysis.block.offset({ x: -1, y: -1, z: 0 })?.getTags()?.includes('tags:obsidian_smelting.storage_tank')
				const direction_2 = analysis.block.offset({ x: 0, y: -1, z: 1 })?.getTags()?.includes('tags:obsidian_smelting.storage_tank')
				const direction_3 = analysis.block.offset({ x: 1, y: -1, z: 0 })?.getTags()?.includes('tags:obsidian_smelting.storage_tank')
				opal.TrySetPermutation(analysis.block, 'STATE:direction_0', direction_0 ? 1 : 0);
				opal.TrySetPermutation(analysis.block, 'STATE:direction_1', direction_1 ? 1 : 0);
				opal.TrySetPermutation(analysis.block, 'STATE:direction_2', direction_2 ? 1 : 0);
				opal.TrySetPermutation(analysis.block, 'STATE:direction_3', direction_3 ? 1 : 0);
				customFunction.distributeLavaToStorageTanks(analysis.block);
			}
			const magma = analysis.state.getState('STATE:magma') as number;
			if (magma != 8) beforeEvent();
			if (magma == 8) afterEvent();
		}
	}
);
/*
 * 消耗星尘力
 */
components.set(prefix[4] + 'energy_expend',
	{
		onTick(source: server.BlockComponentTickEvent, data: server.CustomComponentParameters) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const { block } = customFunction.TickComponentTrigger(source);
			/**
			 * * 方块组件参数 的 解构
			 */
			const { modify, revise } = data.params as customType.ENERGY_EXPEND;
			/**
			 ** 查询剩余能量
			 */
			const energy = opal.ExpendEnergy(block, modify || -1);
			// 检测能量是否变动成功
			if (energy) opal.TrySetPermutation(block, revise || 'default', 2);
			else opal.TrySetPermutation(block, revise || 'default', 0);
		}
	}
);
/*
 * 常规 物流网络 接收端
 */
components.set(prefix[4] + 'routine_logistics_receiver',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = customFunction.TickComponentTrigger(source);
			/**
			 ** 获取 关于方块旋转 的 方块状态
			 */
			const direction = analysis.state.getState('minecraft:cardinal_direction');
			/**
			 ** 侦测 方块容器 并 提交 物品网络申请
			 *
			 * @param {server.Block | undefined} target - 目标容器方块
			 */
			function Detecting(target?: server.Block) {
				/**
				 ** 上方 的 物品展示框 的 物品信息
				 */
				const frame = analysis.block.above()?.getItemStack(1);
				/**
				 ** 指定的 方块 的 物品容器
				 */
				const container = target?.getComponent('inventory')?.container;
				// 检测 容器 展示框 剩余空间 是否满足要求
				if (!target || !frame || !container || container.emptySlotsCount == 0) return;
				/**
				 ** 物品网络频道
				 */
				const channel = frame.typeId;
				/**
				 ** 网络筛选类型
				 */
				const filter = container.getItem(0)?.typeId ?? frame.typeId;
				// 提交 物品网络申请
				routineLogisticsRequest.set(analysis.dimension.id + '•' + channel + '•' + filter, target.location);
			};
			// 基于 方块状态 旋转 容器读取方向
			switch (direction) {
				case 'south': Detecting(analysis.block.south()); break;

				case 'north': Detecting(analysis.block.north()); break;

				case 'east': Detecting(analysis.block.east()); break;

				case 'west': Detecting(analysis.block.west()); break;

				default: break;
			}
		}
	}
);
/*
 * 跨界 物流网络 接收端
 */
components.set(prefix[4] + 'surpass_logistics_receiver',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = customFunction.TickComponentTrigger(source);
			/**
			 ** 获取 关于方块旋转 的 方块状态
			 */
			const direction = analysis.state.getState('minecraft:cardinal_direction');
			/**
			 ** 侦测 方块容器 并 提交 物品网络申请
			 *
			 * @param {server.Block | undefined} target - 目标容器方块
			 */
			function Detecting(target?: server.Block) {
				/**
				 ** 上方 的 物品展示框 的 物品信息
				 */
				const frame = analysis.block.above()?.getItemStack(1);
				/**
				 ** 指定的 方块 的 物品容器
				 */
				const container = target?.getComponent('inventory')?.container;
				// 检测 容器 展示框 剩余空间 是否满足要求
				if (!target || !frame || !container || container.emptySlotsCount == 0) return;
				/**
				 ** 物品网络频道
				 */
				const channel = frame.typeId;
				/**
				 ** 网络筛选类型
				 */
				const filter = container.getItem(0)?.typeId ?? frame.typeId;
				// 提交 物品网络申请
				surpassDimensionRequest.set(channel + '•' + filter, [target.dimension, target.location]);
			};
			// 基于 方块状态 旋转 容器读取方向
			switch (direction) {
				case 'south': Detecting(analysis.block.south()); break;

				case 'north': Detecting(analysis.block.north()); break;

				case 'east': Detecting(analysis.block.east()); break;

				case 'west': Detecting(analysis.block.west()); break;

				default: break;
			}
		}
	}
);
/*
 * 常规 物流网络 发送端
 */
components.set(prefix[4] + 'routine_logistics_sender',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = customFunction.TickComponentTrigger(source);
			/**
			 ** 上方 的 物品展示框 的 物品信息
			 */
			const frame = analysis.block.above()?.getItemStack(1);
			// 检测 展示框 能量 请求数量 是否满足要求
			if (!frame || !opal.ExpendEnergy(analysis.block, -20) || routineLogisticsRequest.size < 1) return;
			/**
			 ** 物品网络频道
			 */
			const channel = [...routineLogisticsRequest].filter(
				info => {
					const split = info[0].split('•');
					return split[0] == analysis.dimension.id && split[1] == frame.typeId
				}
			);
			/**
			 ** 附近的方块容器
			 */
			const containers = [
				analysis.block.west()?.getComponent('inventory')?.container,
				analysis.block.east()?.getComponent('inventory')?.container,
				analysis.block.north()?.getComponent('inventory')?.container,
				analysis.block.south()?.getComponent('inventory')?.container,
			];
			/**
			 ** 重构 物品请求信息
			 */
			const judge = new Map<string, server.Vector3>(channel.map(info => [info[0].split('•')[2], info[1]]));
			// 遍历容器
			containers.forEach(
				container => {
					// 检测容器是否存在
					if (!container) return;
					// 遍历容器中的物品
					for (let index = 0; index < container.size; index++) {
						/**
						 ** 获取容器中的物品
						 */
						const item = container.getItem(index); if (!item) continue;
						/**
						 ** 检测物品是否在请求列表上
						 */
						const result = judge.get(item.typeId); if (!result) continue;
						/**
						 ** 获取发出请求的方块
						 */
						const block = analysis.dimension.getBlock(result); if (!block) continue;
						/**
						 ** 获取接收物品的方块容器
						 */
						const inventory = block.getComponent('inventory')?.container; if (!inventory) continue;
						// 迁移物品
						inventory.addItem(item);
						container.setItem(index);
						return;
					}
				}
			);
			// 清除 物品网络申请
			routineLogisticsRequest = new Map<string, server.Vector3>(
				[...routineLogisticsRequest].filter(
					info => {
						/**
						 ** 拆分 维度 频道 类型
						 */
						const split = info[0].split('•');
						// 检测 维度 频道 类型 是否符合
						return split[0] != analysis.dimension.id || split[1] != frame.typeId
					}
				)
			);
		}
	}
);
/*
 * 跨界 物流网络 发送端
 */
components.set(prefix[4] + 'surpass_logistics_sender',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = customFunction.TickComponentTrigger(source);
			/**
			 ** 上方 的 物品展示框 的 物品信息
			 */
			const frame = analysis.block.above()?.getItemStack(1);
			// 检测 展示框 能量 请求数量 是否满足要求
			if (!frame || !opal.ExpendEnergy(analysis.block, -30) || surpassDimensionRequest.size < 1) return;
			/**
			 ** 物品网络频道
			 */
			const channel = [...surpassDimensionRequest].filter(info => info[0].split('•')[0] == frame.typeId);
			/**
			 ** 附近的方块容器
			 */
			const containers = [
				analysis.block.west()?.getComponent('inventory')?.container,
				analysis.block.east()?.getComponent('inventory')?.container,
				analysis.block.north()?.getComponent('inventory')?.container,
				analysis.block.south()?.getComponent('inventory')?.container,
			];
			/**
			 ** 重构 物品请求信息
			 */
			const judge = new Map<string, [server.Dimension, server.Vector3]>(channel.map(info => [info[0].split('•')[1], info[1]]));
			// 遍历容器
			containers.forEach(
				container => {
					// 检测容器是否存在
					if (!container) return;
					// 遍历容器中的物品
					for (let index = 0; index < container.size; index++) {
						/**
						 ** 获取容器中的物品
						 */
						const item = container.getItem(index); if (!item) continue;
						/**
						 ** 检测物品是否在请求列表上
						 */
						const result = judge.get(item.typeId); if (!result) continue;
						/**
						 ** 获取发出请求的方块
						 */
						const block = result[0].getBlock(result[1]); if (!block) continue;
						/**
						 ** 获取接收物品的方块容器
						 */
						const inventory = block.getComponent('inventory')?.container; if (!inventory) continue;
						// 迁移物品
						inventory.addItem(item);
						container.setItem(index);
						return;
					}
				}
			);
			// 清除请求信息
			surpassDimensionRequest = new Map<string, [server.Dimension, server.Vector3]>(
				[...surpassDimensionRequest].filter(info => info[0].split('•')[0] != frame.typeId)
			);
		}
	}
);
/*
 * 容器整理
 */
components.set(prefix[4] + 'container_arrange',
	{
		onTick(source: server.BlockComponentTickEvent) {
			/**
			 * * 方块组件参数 的 解构
			 */
			const analysis = customFunction.TickComponentTrigger(source);
			/**
			 * 获取方块上下位置的容器组件
			 */
			const containers = [
				analysis.block.above()?.getComponent('inventory')?.container,
				analysis.block.below()?.getComponent('inventory')?.container,
			];
			// 判断是否成功获取到能量
			if (!opal.ExpendEnergy(analysis.block, -20)) return;
			// 遍历容器列表, 对每个容器执行操作
			containers.forEach(
				container => {
					// 如果容器不存在, 或者方块无法消耗能量, 则跳过当前循环
					if (!container || !opal.ExpendEnergy(analysis.block, -5)) return;
					/**
					 * 获取容器中的所有物品
					 */
					const items: server.ItemStack[] = [];
					// 遍历容器中的所有物品槽位
					for (let index = 0; index < container.size; index++) {
						/**
						 * 获取当前槽位的物品
						 */
						const item = container.getItem(index);
						// 如果当前槽位为空, 则跳过当前循环
						if (!item) continue;
						// 将物品从容器中移除
						container.setItem(index);
						// 将物品添加到物品列表中
						items.push(item);
					};
					// 将物品列表中的物品添加到容器中
					opal.OrganizeItemStacks(items).forEach(item => container.addItem(item));
				}
			)
		}
	}
);
/*
 * 遗物萃取
 */
components.set(prefix[4] + 'residual_extraction',
	{
		/**
		 * 方块组件 tick 事件处理器, 用于处理怪物掉落物提取逻辑
		 *
		 * @param {server.BlockComponentTickEvent} source - 方块组件tick事件对象
		 */
		onTick(source: server.BlockComponentTickEvent, data: server.CustomComponentParameters) {
			/**
			 * 解析方块组件触发事件
			 */
			const { block, dimension } = customFunction.TickComponentTrigger(source);
			/**
			 * 解析方块组件参数
			 */
			const { expense, container, consumption, revise } = data.params as customType.RESIDUAL_EXTRACTION;
			// 检测参数是否存在
			if (!expense || !container || !consumption || !revise) return;
			/**
			 * 获取偏移位置的容器组件
			 */
			const targetContainer = block.offset(container)?.getComponent('inventory')?.container;
			// 检测容器是否存在, 是否有空位, 是否消耗能量
			if (!targetContainer || targetContainer.emptySlotsCount == 0 || !opal.ExpendEnergy(block, -consumption)) return;
			/**
			 * 当前方块的状态值
			 */
			const state = block.permutation.getState(revise) as number;
			/**
			 * 是否成功提取怪物掉落物
			 */
			const conclusion = customFunction.extractResidues(targetContainer, expense);
			// 能量管理逻辑
			if (conclusion && state < 12) {
				// 增加能量值
				opal.TrySetPermutation(block, revise, state + 1);
				// 播放运行音效
				dimension.playSound('step.amethyst_cluster', block);
			}
			else if (conclusion) {
				// 重置能量值
				opal.TrySetPermutation(block, revise, 0);
				// 生成经验瓶
				targetContainer.addItem(new server.ItemStack('experience_bottle', 1));
				// 播放运行音效
				dimension.playSound('step.amethyst_cluster', block);
			};
		}
	}
);
/*
 * 容器枢纽
 */
components.set(prefix[4] + 'container_hub',
	{
		async onTick(source: server.BlockComponentTickEvent) {
			/**
			 * 解析方块组件触发事件
			 */
			const { block, dimension } = customFunction.TickComponentTrigger(source);
			/**
			 * 获取上方方块对象
			 */
			const above = block.above();
			/**
			 * 获取上方容器组件
			 */
			const container = above?.getComponent('inventory')?.container;
			/**
			 * 创建用于设置粒子效果参数的 Molang 变量映射
			 *
			 * @param {server.MolangVariableMap} molang - Molang变量映射对象
			 */
			const molang = new server.MolangVariableMap();
			/**
			 * 判断是否执行成功
			 */
			let success = false;
			// 判断是否成功获取到能量
			if (!opal.ExpendEnergy(block, -50)) return;
			// 判断事件返回的对象是否完整可用
			if (!above || !container) return;
			// 遍历上方容器中的物品槽位
			for (let index = 0; index < container.size; index++) {
				/**
				 * 获取当前槽位的物品
				 */
				const item = container.getItem(index);
				// 如果当前槽位为空, 则跳过当前循环
				if (!item) continue;
				/**
				 * 获取容器查询结果
				 */
				let searchResults = opal.SearchContainers(block, item, 8);
				// 移除重复的容器对象
				searchResults = searchResults.filter(value => !opal.Vector.equals(value[1].location, above.location));
				// 如果没有找到容器, 放宽条件重新搜索
				if (searchResults.length === 0) searchResults = opal.SearchContainers(block);
				// 如果没有找到容器, 则终止本次事件的继续执行
				if (searchResults.length === 0) return dimension.playSound('respawn_anchor.deplete', block);
				/**
				 * * 获取目标容器和目标方块
				 */
				const [targetContainer] = searchResults[0];
				// 将物品添加到目标方块容器中
				targetContainer.addItem(item);
				// 从上方容器中移除物品
				container?.setItem(index);
				// 标记物品已经成功转移
				success = true;
				// 中断循环执行
				await server.system.waitTicks(1);
			};
			// 设置粒子效果参数
			molang.setFloat('variable.size', 18);
			// 播放音效 表示运行结束
			if (success) dimension.playSound('respawn_anchor.charge', block);
			// 生成表示运行结束的粒子效果
			for (let index = 0; index < 3; index++) {
				molang.setFloat('variable.direction', index);
				opal.TrySpawnParticle(dimension, 'scripts:path_round', block.center(), molang);
			}
		}
	}
);
export default components;