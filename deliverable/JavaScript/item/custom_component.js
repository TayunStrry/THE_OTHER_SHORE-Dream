/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import * as table from "../data/table";
import * as type from "../data/type";
/*
 * 自定义组件
 */
import * as customFunction from "./custom_function";
/**
 * * 组件前缀代词
 */
const componentPrefix = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components = new Map();
/*
 * 幻彩棱镜
 */
components.set(componentPrefix + 'iridescent_prism', {
    'onHitEntity'(source, data) {
        /**
         * 获取自定义组件的参数
         */
        const params = data.params;
        /**
         * 对目标施加的状态效果
         */
        const targetEffects = params.to_target?.effects;
        /**
         * 对目标施加的状态效果放大器
         */
        const targetEffectAmplifier = params.to_target?.amplifier;
        /**
         * 对自身施加的状态效果
         */
        const selfEffects = params.to_self?.effects;
        /**
         * 对自身施加的状态效果放大器
         */
        const selfEffectAmplifier = params.to_self?.amplifier;
        /**
         * 对目标施加的命令
         */
        const targetCommands = params.to_target?.commands;
        /**
         * 对自身施加的命令
         */
        const selfCommands = params.to_self?.commands;
        /**
         * 对目标施加的击退等级
         */
        const knockbackLevel = params.to_target?.knockback_level;
        /**
         * 对目标施加的点燃时长
         */
        const igniteTime = params.to_target?.ignite_time;
        /**
         * 解构事件参数
         */
        const { hitEntity: target, attackingEntity: self, itemStack: item } = source;
        // TODO: 处理通用附加效果
        if (target && target.isValid && targetEffects && targetEffects.length > 0) {
            targetEffects.forEach(effect => target.addEffect(effect, opal.RandomFloor(20, 600), { amplifier: targetEffectAmplifier }));
        }
        ;
        if (self && self.isValid && selfEffects && selfEffects.length > 0) {
            selfEffects.forEach(effect => self.addEffect(effect, opal.RandomFloor(20, 600), { amplifier: selfEffectAmplifier }));
        }
        // TODO: 处理通用附加命令
        if (target && target.isValid && targetCommands && targetCommands.length > 0) {
            targetCommands.forEach(command => target.runCommand(command));
        }
        ;
        if (self && self.isValid && selfCommands && selfCommands.length > 0) {
            selfCommands.forEach(command => self.runCommand(command));
        }
        ;
        // TODO: 处理对目标施加点燃
        if (target && target.isValid && igniteTime) {
            target.setOnFire(igniteTime * 20);
        }
        // TODO: 处理对目标施加击退
        if (self && self.isValid && knockbackLevel) {
            /**
             * 获取目标位置
             */
            const targetLocation = opal.Vector.copy(target.location);
            /**
             * 获取玩家位置
             */
            const selfLocation = opal.Vector.copy(self.location);
            /**
             * 获取归一化差向量
             */
            const distance = selfLocation.difference(targetLocation);
            // 对目标施加动能
            target.applyKnockback(distance.multiply(knockbackLevel), knockbackLevel * 0.25);
        }
        /**
         * 获取物品染色信息
         */
        const itemColor = item?.getComponent('minecraft:dyeable')?.color;
        // 判断物品是否被染色
        if (!itemColor)
            return;
        /**
         * 获取实体的染色信息
         */
        const entityColor = opal.MinecraftColor.getEntityColor(target);
        /**
         * 判断物品与实体的颜色差值
         */
        const distance = opal.MinecraftColor.distance(entityColor, itemColor);
        // 如果判定为颜色相似
        if (distance <= 1) {
            /**
             * 获取实体的生命值
             */
            const health = target.getComponent('minecraft:health');
            // 判断生命值组件是否存在
            if (!health)
                return;
            /**
             * 获取实体的当前生命值
             */
            const curren = health.currentValue;
            /**
             * 获取实体的最大生命值
             */
            const max = health.defaultValue;
            // 设置实体生命值
            health?.setCurrentValue(curren - (max * 0.2));
        }
    }
});
/*
 * 召唤 渊鲸 - 维系者
 */
components.set(componentPrefix + 'call_whale_support', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        // 检测是否在 水下
        if (!player.dimension.getBlock(player.location)?.isLiquid) {
            player.sendMessage([opal.translate(player), { text: ' -> 请在水下使用, 无法在空气中召唤<§l§9 渊鲸-维系者 §r>' }]);
            return;
        }
        ;
        // 执行召唤流程
        opal.SummonEntityWithData(player, container, 'starry_map:abyss_whale.support');
    }
});
/*
 * 召唤 森蚺 - 哨兵炮
 */
components.set(componentPrefix + 'call_python_sentinel', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        // 执行召唤流程
        opal.SummonEntityWithData(player, container, 'starry_map:viper.sentinel');
    }
});
/*
 * 召唤 隧龙 - 领航者
 */
components.set(componentPrefix + 'call_tunnel_dragon_guide', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        // 执行召唤流程
        opal.SummonEntityWithData(player, container, 'starry_map:tunnel_dragon');
    }
});
/*
 * 召唤 虚物靶标
 */
components.set(componentPrefix + 'call_virtual_target', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        // 执行召唤流程
        opal.SummonEntityWithData(player, container, 'starry_map:execute.virtual_target');
    }
});
/**
 * * 森蚺 - 先锋炮
 */
components.set(componentPrefix + 'call_python_pioneer', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 4))
            return;
        /**
         * * 实体射线选中数组
         */
        const getEntities = player.getEntitiesFromViewDirection({ maxDistance: 64 })[0];
        /**
         * * 方块射线选中
         */
        const getBlock = player.getBlockFromViewDirection({ maxDistance: 64 });
        /**
         * * 方块距离
         */
        const blockDistance = getBlock?.block ? opal.Vector.distance(player.location, getBlock?.block) : 48;
        /**
         * * 射击距离
         */
        const distance = getEntities?.distance ?? blockDistance;
        /**
         * * 爆炸事件
         *
         * @param args - 附加参数
         */
        const powerExplode = (args) => {
            /**
             * * 过滤器参数
             */
            const options = {
                excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
                location: args.location,
                maxDistance: 8,
                closest: 8
            };
            /**
             * * 获取实体列表
             */
            const entitys = args.dimension.getEntities(options).filter(entity => entity.id !== player.id);
            // 创建 元素伤害
            entitys.forEach(entity => {
                /**
                 * * 是否暴击
                 */
                const erupt = opal.IsErupt(player);
                // 对目标施加一次击退
                opal.BackoffByDistance(player, entity);
                // 获得属性加成
                opal.AlterProperty(player, { raise_basic_attack: distance });
                // 结算法术伤害
                opal.ElementalAttack(player, entity, erupt);
            });
            // 播放 爆炸音效
            args.dimension.playSound('random.explode', args.location);
            // 创建粒子效果
            opal.TrySpawnParticle(player.dimension, 'constant:impact_rune_white', args.location);
        };
        // 创建 路径规划
        opal.PathExecute.Create('森蚺先锋炮-炮击轨迹', 1, {
            particles: ['constant:smoke_rune_white'],
            dimension: player.dimension,
            on_done: powerExplode,
            locations: [],
            cooldown: 1,
            speed: 1,
            shoot: {
                start_place: player.getHeadLocation(),
                toward: player.getViewDirection(),
                max_distance: distance,
            }
        });
        // 播放 开火音效
        player.playSound('mob.irongolem.repair');
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 状态侦测
 */
components.set(componentPrefix + 'stateful_inspection', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 获取玩家的背包容器
         */
        const container = player.getComponent('inventory')?.container;
        // 如果玩家、背包或物品不存在, 则不执行后续操作
        if (!container || !player || !item)
            return;
        // 检查物品是否冷却完毕, 如果没有冷却完毕则不执行后续操作
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 获取 状态信息
         */
        const message = opal.GetTargetIntel(player);
        // 如果没有获取到状态信息, 则向玩家发送错误消息并返回
        if (message.length === 0) {
            player.sendMessage([opal.translate(player), { text: '-> <§l§9 状态侦测 §r>未能找到你所指向的目标' }]);
            return;
        }
        ;
        // 根据玩家是否潜行, 决定如何显示状态信息
        if (player instanceof server.Player && player.isSneaking)
            player.sendMessage([...message, '\n']);
        // 玩家未潜行时, 显示状态信息界面
        else if (player instanceof server.Player && !player.isSneaking)
            new serverUI
                .ActionFormData()
                .title('§9<§l 状态信息 §r§9>')
                .body({ rawtext: message })
                .button('§4§l关闭§r')
                .button('§9§l导出§r')
                .show(player)
                // 如果玩家选择了导出按钮, 则清理并打印状态信息
                .then(result => { if (!result.canceled && result.selection == 1)
                console.warn(JSON.stringify(opal.CleanMessageArray(message))); });
        // 如果不是玩家触发, 则将状态信息发送到世界聊天
        else
            server.world.sendMessage([...message, '\n']);
        // 播放使用物品时的音效
        player.playSound('conduit.activate');
        // 在玩家位置播放粒子效果
        opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 开始物品的冷却时间
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 减少物品的耐久度
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/**
 * * 创造工具
 */
components.set(componentPrefix + 'creative_tools', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        // 如果玩家没有权限使用此物品, 则返回
        if (!opal.isPlayerAuthorized(player))
            return player.sendMessage('§c§l您没有权限使用此物品!§r');
        // 生成 创造模式 辅助道具
        opal.TrySpawnParticle(player.dimension, 'constant:fireworks_fireball_amber_color', opal.Vector.add(player.location, { x: 0, y: 3, z: 0 }));
        server.system.run(() => container.setItem(player.selectedSlotIndex));
        player.runCommand('loot spawn ~ ~3 ~ loot create_mode_toolkit');
        player.playSound("conduit.attack");
        // 播放 粒子效果
        opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 匣里乾坤
 */
components.set(componentPrefix + 'world_of_box', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        // 如果玩家没有权限使用此物品, 则返回
        if (!opal.isPlayerAuthorized(player))
            return player.sendMessage('§c§l您没有权限使用此物品!§r');
        /**
         * * 实体查询选项
         */
        const options = {
            excludeTypes: ["minecraft:xp_orb"],
            excludeFamilies: ['player'],
            location: player.location,
            maxDistance: 8
        };
        /**
         * * 获取 实体队列
         */
        const entitys = player.dimension.getEntities(options);
        /**
         * * 获取 状态信息
         */
        const status = player.getDynamicProperty('qiankun_in_the_box:status');
        // 判断 状态信息
        if (status == undefined) {
            // 输出 状态信息
            opal.TrySpawnParticle(player.dimension, 'constant:smoke_rune_purple', player.location);
            player.sendMessage(`§6|§r 正在<§a 收纳 §r>周围的实体 §6|§r`);
            player.playAnimation("animation.item.common.resist");
            player.playSound("conduit.activate");
            // 收集周围的实体
            entitys.forEach(entity => entity.tryTeleport(player.getHeadLocation()));
            // 更新 状态信息
            player.setDynamicProperty('qiankun_in_the_box:status', true);
            // 执行 实体收容 流程
            server.system.runTimeout(() => player.runCommand(`structure save "${player.id}" ~2~2~2 ~-2~-2~-2 true disk true`), 4);
            server.system.runTimeout(() => entitys.forEach(entity => { if (entity && entity.isValid)
                entity?.remove(); }), 6);
        }
        else {
            // 释放 被收容的 实体
            player.runCommand(`structure load "${player.id}" ~-2~-2~-2 0_degrees none true false`);
            // 输出 状态信息
            opal.TrySpawnParticle(player.dimension, 'constant:smoke_rune_purple', player.location);
            player.sendMessage(`§6|§r 正在<§d 释放 §r>储存的实体 §6|§r`);
            player.playAnimation("animation.item.common.resist");
            player.playSound("conduit.activate");
            // 更新 状态信息
            player.setDynamicProperty('qiankun_in_the_box:status', undefined);
        }
        ;
        // 播放 粒子效果
        opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 调试权杖
 */
components.set(componentPrefix + 'debugging_stick', {
    'onUseOn'(data) {
        // 解构 使用者 与 被使用到的方块状态
        const { source: player, usedOnBlockPermutation, block, itemStack } = data;
        // 如果玩家不是 Player实例 或 方块状态不存在, 则直接返回
        if (!(player instanceof server.Player) || !usedOnBlockPermutation || !block || !itemStack)
            return;
        // 如果玩家没有权限使用此物品, 则返回
        if (!opal.isPlayerAuthorized(player))
            return player.sendMessage('§c§l您没有权限使用此物品!§r');
        /**
         * * 获取全部的方块状态
         */
        const states = usedOnBlockPermutation.getAllStates();
        /**
         * * 方块状态键值对映射表
         */
        const stateMap = new Map(Object.keys(states).map(key => [key, states[key]]));
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().title(opal.translate(block)).body('请选择您想要调试的属性');
        // 如果 方块状态映射表 大于等于 1, 则加入按钮
        if (stateMap.size >= 1) {
            // 遍历 方块状态键, 并加入按钮
            [...stateMap.keys()].forEach(key => display.button(key));
            // 显示 窗口界面
            display.show(player).then(option => {
                // 如果玩家取消了表单, 则不进行操作
                if (option.canceled || option.selection == undefined)
                    return;
                /**
                 * * 被选中的 方块状态键
                 */
                const key = [...stateMap.keys()][option.selection];
                /**
                 * * 被选中的 方块状态值
                 */
                const value = stateMap.get(key);
                /**
                 * * 可选的 方块状态值
                 */
                const validValues = server.BlockStates.get(key)?.validValues;
                /**
                 * * 定义了 窗口界面 的 表单对象
                 */
                const display = new serverUI.ActionFormData().title(key + ' : ' + value).body('请选择当前方块状态的< 期望值 >');
                // 如果 方块状态值 有效值 大于等于 1, 则加入按钮
                if (validValues && validValues.length >= 1) {
                    // 遍历 方块状态值, 并加入按钮
                    validValues.forEach(value => display.button(JSON.stringify(value)));
                    // 显示 窗口界面
                    display.show(player).then(option => {
                        // 如果玩家取消了表单, 则不进行操作
                        if (option.canceled || option.selection == undefined)
                            return;
                        // 设置方块的属性
                        opal.TrySetPermutation(block, key, validValues[option.selection]);
                    });
                }
                else
                    player.sendMessage('§c§l该方块没有方块状态!');
            });
        }
        else
            player.sendMessage('§c§l该方块没有方块状态!');
    }
});
/*
 * 调试权杖
 */
components.set(componentPrefix + 'debugging_stick', {
    'onUseOn'(data) {
        // 解构 使用者 与 被使用到的方块状态
        const { source: player, usedOnBlockPermutation, block, itemStack } = data;
        // 如果玩家不是 Player实例 或 方块状态不存在, 则直接返回
        if (!(player instanceof server.Player) || !usedOnBlockPermutation || !block || !itemStack)
            return;
        // 如果玩家没有权限使用此物品, 则返回
        if (!opal.isPlayerAuthorized(player))
            return player.sendMessage('§c§l您没有权限使用此物品!§r');
        /**
         * * 获取全部的方块状态
         */
        const states = usedOnBlockPermutation.getAllStates();
        /**
         * * 方块状态键值对映射表
         */
        const stateMap = new Map(Object.keys(states).map(key => [key, states[key]]));
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().title(opal.translate(block)).body('请选择您想要调试的属性');
        // 如果 方块状态映射表 大于等于 1, 则加入按钮
        if (stateMap.size >= 1) {
            // 遍历 方块状态键, 并加入按钮
            [...stateMap.keys()].forEach(key => display.button(key));
            // 显示 窗口界面
            display.show(player).then(option => {
                // 如果玩家取消了表单, 则不进行操作
                if (option.canceled || option.selection == undefined)
                    return;
                /**
                 * * 被选中的 方块状态键
                 */
                const key = [...stateMap.keys()][option.selection];
                /**
                 * * 被选中的 方块状态值
                 */
                const value = stateMap.get(key);
                /**
                 * * 可选的 方块状态值
                 */
                const validValues = server.BlockStates.get(key)?.validValues;
                /**
                 * * 定义了 窗口界面 的 表单对象
                 */
                const display = new serverUI.ActionFormData().title(key + ' : ' + value).body('请选择当前方块状态的< 期望值 >');
                // 如果 方块状态值 有效值 大于等于 1, 则加入按钮
                if (validValues && validValues.length >= 1) {
                    // 遍历 方块状态值, 并加入按钮
                    validValues.forEach(value => display.button(JSON.stringify(value)));
                    // 显示 窗口界面
                    display.show(player).then(option => {
                        // 如果玩家取消了表单, 则不进行操作
                        if (option.canceled || option.selection == undefined)
                            return;
                        // 设置方块的属性
                        opal.TrySetPermutation(block, key, validValues[option.selection]);
                    });
                }
                else
                    player.sendMessage('§c§l该方块没有方块状态!');
            });
        }
        else
            player.sendMessage('§c§l该方块没有方块状态!');
    }
});
/**
 * * 物资整理
 */
components.set(componentPrefix + 'material_sorting', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 获取 实体
         */
        const getEntity = player.getEntitiesFromViewDirection({ maxDistance: 64 })[0]?.entity;
        /**
         * * 获取 方块
         */
        const getBlock = player.getBlockFromViewDirection({ maxDistance: 64 })?.block;
        // 执行 向 玩家背包中 抽取 或 注入物品 的流程
        player.isSneaking
            ? customFunction.extractEvent(player, getEntity, getBlock, container)
            : customFunction.injectEvent(player, getEntity, getBlock, container);
        // 播放音效
        player.playSound("armor.equip_diamond");
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 播放 粒子效果
        opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 抑水之环
 */
components.set(componentPrefix + 'inhibit_water', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 获取 方块对象
         */
        const block = player.getBlockFromViewDirection({ includeLiquidBlocks: true, maxDistance: 128 })?.block;
        // 判断 方块对象是否存在
        if (!block || block.typeId !== 'minecraft:water')
            return;
        // 判断 玩家是否潜行
        if (!player.isSneaking) {
            opal.TryFillBlocks(block.dimension, opal.Vector.add(block.location, { x: 5, y: 5, z: 5 }), opal.Vector.add(block.location, { x: -5, y: -5, z: -5 }), 'starry_map:unreal_space', {
                blockFilter: { includePermutations: [server.BlockPermutation.resolve('minecraft:water')] }
            });
            opal.TryFillBlocks(block.dimension, opal.Vector.add(block.location, { x: 4, y: 4, z: 4 }), opal.Vector.add(block.location, { x: -4, y: -4, z: -4 }), 'minecraft:air', {
                blockFilter: { includePermutations: [server.BlockPermutation.resolve('starry_map:unreal_space')] }
            });
        }
        else
            opal.TryFillBlocks(block.dimension, opal.Vector.add(block.location, { x: 5, y: 5, z: 5 }), opal.Vector.add(block.location, { x: -5, y: -5, z: -5 }), 'minecraft:air', { blockFilter: { includePermutations: [server.BlockPermutation.resolve('minecraft:water')] } });
        // 播放音效
        player.playSound("bucket.empty_lava");
        // 播放 粒子效果
        opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 虚空方块
 */
components.set(componentPrefix + 'nihility_space_block', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 2))
            return;
        /**
         * * 获取 下方的 方块
         */
        const target = player.dimension.getBlock(opal.Vector.add(player.location, opal.Vector.CONSTANT_DOWN));
        // 判断 方块是否存在 是否是空气
        if (target && target.isAir)
            target.setPermutation(server.BlockPermutation.resolve('starry_map:nihility_space'));
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 播放 粒子效果
        opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 紫金葫芦
 */
components.set(componentPrefix + 'purple_gold_gourd', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item || !opal.TriggerControl(item.typeId, player, 80))
            return;
        /**
         * * 动态属性 - 物品阶段
         */
        const state = item.getDynamicProperty('item:stage.purple_gold_gourd') ?? 0;
        /**
         * * 获取 动态属性 - 捕获时间点
         */
        const time = item.getDynamicProperty('item:time.purple_gold_gourd') ?? 0;
        /**
         * * 获取 动态属性 - 捕获实体
         */
        const save = item.getDynamicProperty('item:save.purple_gold_gourd') ?? 'minecraft:tnt';
        /**
         * * 获取 玩家 视线方向的 实体
         */
        const entity = player.getEntitiesFromViewDirection({ maxDistance: 64 })[0]?.entity;
        // 阶段判断
        switch (state) {
            case 0:
                // 播放 启动 音效
                player.playSound('音效.琉璃.紫金葫芦_蓄力使用');
                // 切换至下一阶段
                item.setDynamicProperty('item:stage.purple_gold_gourd', 1);
                break;
            case 1:
                // 验证实体是否存在且可用
                if (!entity || !entity.isValid || entity instanceof server.Player)
                    return player.playSound('音效.琉璃.紫金葫芦_捕获失败');
                /**
                 * * 获取 实体最大血量
                 */
                const health = entity.getComponent('minecraft:health')?.defaultValue || 10;
                // 判断实体血量是否超过上限
                if (health >= 200)
                    return player.playSound('音效.琉璃.紫金葫芦_捕获失败');
                // 播放 捕获 音效
                player.playSound('音效.琉璃.紫金葫芦_捕捉成功');
                // 切换至下一阶段
                item.setDynamicProperty('item:stage.purple_gold_gourd', 2);
                // 记录发动捕获的时间点
                item.setDynamicProperty('item:time.purple_gold_gourd', server.system.currentTick);
                // 记录实体类型
                item.setDynamicProperty('item:save.purple_gold_gourd', entity.typeId);
                // 播放 释放特效
                opal.TrySpawnParticle(player.dimension, 'constant:excite_rune_purple', entity.location);
                opal.TrySpawnParticle(player.dimension, 'constant:smoke_rune_purple', entity.location);
                opal.TrySpawnParticle(player.dimension, 'constant:erupt_rune_purple', entity.location);
                // 移除实体
                opal.UnloadInventoryAndDestroy(entity);
                break;
            case 2:
                // 验证炼化时间是否结束
                if (server.system.currentTick - time <= 1200)
                    return player.playSound('音效.琉璃.紫金葫芦_继续等待');
                /**
                 * * 创建 实体对象
                 */
                const target = opal.TrySpawnEntity(player.dimension, save, player.location);
                // 回到初始状态
                item.setDynamicProperty('item:stage.purple_gold_gourd', 0);
                // 播放 结束 音效
                player.playSound('音效.琉璃.紫金葫芦_炼化结束');
                // 击杀实体
                if (target instanceof server.Entity)
                    target.kill();
                break;
        }
        ;
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 播放 粒子效果
        opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 使用后获得状态效果
 */
components.set(componentPrefix + 'use_effect', {
    onConsume(source, data) {
        /**
         * * 获取自定义参数
         */
        const params = data.params;
        /**
         * 获取当前使用者
         */
        const { source: entity } = source;
        /**
         * 从数据中获取状态效果参数
         */
        const { effects, min_duration, max_duration, amplifier, health_changes } = params;
        /**
         * 获取生物的健康组件
         */
        const health = entity.getComponent('minecraft:health');
        // 遍历状态效果列表
        effects?.forEach(type => entity.addEffect(type, opal.RandomFloor(min_duration || 20, max_duration || 600), { amplifier }));
        // 更新生物的生命值
        health?.setCurrentValue(health.currentValue + (health_changes || 0));
    }
});
/*
 * 蜂火佳肴
 */
components.set(componentPrefix + 'bee_fire_cuisine', {
    onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试从生物中获取健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 如果健康组件不存在则默认为 0
         */
        const healthValue = healthComponent?.currentValue ?? 0;
        /**
         * 获取生物的 伤害提升 属性值
         */
        const damageIncrease = opal.GetProperty(creature).damage_increase;
        /**
         * 从视锥内获取排除特定家族的实体列表
         */
        const targets = creature.getEntitiesFromViewDirection({ 'excludeFamilies': ['player', 'starry'] });
        /**
         * 尝试获取第一个目标实体
         */
        const target = targets[0]?.entity;
        /**
         * 创建 Molang变量映射, 用于定义粒子效果参数
         */
        const molang = new server.MolangVariableMap();
        // 如果 伤害提升 小于等于血量的10倍, 则将伤害加倍, 并设置玩家为烛火元素
        if (damageIncrease <= healthValue * 10)
            opal.AlterProperty(creature, { 'damage_increase': healthValue * 2, 'self_rune': 'rune_red' });
        // 根据符文颜色设置粒子颜色
        molang.setColorRGB('variable.color', table.getRuneColor(opal.GetProperty(creature).self_rune));
        // 将粒子方向设置为垂直向下
        molang.setVector3('variable.direction', opal.Vector.CONSTANT_DOWN);
        // 设置粒子的影响范围
        molang.setFloat('variable.range', 5);
        // 设置粒子类型
        molang.setFloat('variable.type', 0);
        // 为生物赋予防火效果, 持续一定时间
        creature.addEffect('fire_resistance', opal.RandomFloor(20, 600));
        // 将生物设置为着火状态, 持续一定时间
        creature.setOnFire(opal.RandomFloor(20, 600));
        // 更新当前血量
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5); // 如果血量大于5, 则减少到 80%, 否则设为 5
        // 检查目标是否存在且有效
        if (!target || !target.isValid)
            return;
        // 在目标的特定位置播放粒子效果
        opal.TrySpawnParticle(creature.dimension, 'scripts:path_spurt', opal.Vector.add(target.location, { x: 0, y: 4, z: 0 }), molang);
        // 对目标进行元素攻击, 根据生物是否暴击使用不同的攻击方法
        opal.ElementalAttack(creature, target, opal.IsErupt(creature));
    }
});
/*
 * 通用食物效果 - 野蜂
 */
components.set(componentPrefix + 'general_food_effects_wild_bee', {
    onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试获取生物的健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 若无健康组件则默认为 5
         */
        const healthValue = healthComponent?.currentValue || 5;
        /**
         * 基于视线方向获取方块位置偏移
         */
        const blockDeviation = creature.getBlockFromViewDirection()?.block.location;
        /**
         * 目标位置基于生物自身方向计算偏移
         */
        const selfDeviation = opal.Vector.multiply(creature.getViewDirection(), 16).add(creature.location);
        /**
         * 目标位置为最高可站立方块或计算点本身
         */
        const targetLocation = creature.dimension.getTopmostBlock(blockDeviation || selfDeviation)?.center() || selfDeviation;
        // 更新血量：若当前血量大于 5, 则减少至 80%, 否则设为 5
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5);
        // 将生物传送到目标位置
        creature.teleport(targetLocation);
        // 将生物赋予防火效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('fire_resistance', opal.RandomFloor(20, 600));
        // 将生物设置为着火状态, 持续时间为随机值（20-600 秒）
        creature.setOnFire(opal.RandomFloor(20, 600));
        // 在目标位置播放声音效果
        creature.dimension.playSound('respawn_anchor.set_spawn', targetLocation);
    }
});
/*
 * 通用食物效果 - 渊鲸
 */
components.set(componentPrefix + 'general_food_effects_abyssal_whale', {
    async onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试获取生物的健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 若无健康组件则默认为 5
         */
        const healthValue = healthComponent?.currentValue || 5;
        /**
         * 拷贝当前坐标
         */
        const location = opal.Vector.copy(creature.location);
        // 更新血量：若当前血量大于 5, 则减少至 80%, 否则设为 5
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5);
        // 将生物赋予潮涌能量效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('conduit_power', opal.RandomFloor(20, 600));
        // 将生物赋予生命提升效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('health_boost', opal.RandomFloor(20, 600), { 'amplifier': 4 });
        // 熄灭实体身上的火焰
        creature.extinguishFire();
        // 在当前位置范围内寻找空气并替换为水
        opal.TryProcessBlocksInVolume(creature.dimension, location, 4, { 'includeTypes': ['minecraft:air'] }, (block) => block.setType('minecraft:flowing_water'));
        // 等待60个游戏刻
        await server.system.waitTicks(60);
        // 在当前位置范围内寻找水并替换为空气
        opal.TryProcessBlocksInVolume(creature.dimension, location, 8, { 'includeTypes': ['minecraft:flowing_water', 'minecraft:water'] }, (block) => block.setType('minecraft:air'));
    }
});
/*
 * 通用食物效果 - 灵蜥
 */
components.set(componentPrefix + 'general_food_effects_spirit_lizard', {
    async onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试获取生物的健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 若无健康组件则默认为 5
         */
        const healthValue = healthComponent?.currentValue || 5;
        // 更新血量：若当前血量大于 5, 则减少至 80%, 否则设为 5
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5);
        // 将生物赋予跳跃提升效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('jump_boost', opal.RandomFloor(20, 600), { 'amplifier': 4 });
        // 将生物赋予迅捷效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('speed', opal.RandomFloor(20, 600), { 'amplifier': 4 });
        // 等待60个游戏刻
        await server.system.waitTicks(60);
        // 将生物赋予黑暗效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('darkness', opal.RandomFloor(20, 600));
    }
});
/*
 * 通用食物效果 - 蝰蛇
 */
components.set(componentPrefix + 'general_food_effects_viper', {
    async onConsume(data) {
        /**
         * 获取当前使用者
         */
        const creature = data.source;
        /**
         * 尝试获取生物的健康组件
         */
        const healthComponent = creature.getComponent('health');
        /**
         * 获取当前血量, 若无健康组件则默认为 5
         */
        const healthValue = healthComponent?.currentValue || 5;
        // 更新血量：若当前血量大于 5, 则减少至 80%, 否则设为 5
        healthComponent?.setCurrentValue(healthValue > 5 ? Math.floor(healthValue * 0.8) : 5);
        // 将生物赋予抗性提升效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('resistance', opal.RandomFloor(20, 600), { 'amplifier': 4 });
        // 将生物赋予虚弱效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('weakness', opal.RandomFloor(20, 600), { 'amplifier': 4 });
        // 等待60个游戏刻
        await server.system.waitTicks(60);
        // 将生物赋予隐身效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('invisibility', opal.RandomFloor(20, 600));
        // 将生物赋予力量效果, 持续时间为随机值（20-600 秒）
        creature.addEffect('strength', opal.RandomFloor(20, 600));
    }
});
/*
 * 精灵治愈
 */
components.set(componentPrefix + 'faerie_healing', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 100))
            return;
        /**
         * * 定义 查询实体 的 参数
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
            excludeFamilies: ["monster"],
            location: player.location,
            maxDistance: 8
        };
        // 获取 附近的实体 并 赋予 生命恢复效果
        player.dimension.getEntities(options).forEach(entity => entity.addEffect("minecraft:regeneration", 300, { amplifier: 4, showParticles: false }));
        /**
         * * 定义 粒子参数
         */
        const molang = new server.MolangVariableMap();
        molang.setFloat('variable.size', 8);
        molang.setFloat('variable.direction', 3);
        // 播放 音效
        player.playSound('item.book.page_turn');
        // 播放 粒子效果
        opal.TrySpawnParticle(player.dimension, 'scripts:path_spiral', player.location, molang);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 林业指南
 */
components.set(componentPrefix + 'forestry_guidelines', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 100))
            return;
        /**
         * * 定义 起始点
         */
        const start = opal.Vector.add(player.location, { x: -5, y: -1, z: -5 });
        /**
         * * 定义 结束点
         */
        const done = opal.Vector.add(player.location, { x: 5, y: 15, z: 5 });
        /**
         * * 在 绘制路径 时 执行 的 程序
         */
        const moveEvent = (args) => {
            /**
             * * 检测方块是否需要被挖掘
             */
            const TestSort = () => {
                /**
                 * * 获取 方块对象
                 */
                const getBlock = args.dimension.getBlock(args.location);
                // 检测 方块类型
                if (getBlock)
                    return table.is_trees.has(getBlock.typeId);
                else
                    return false;
            };
            //执行路径事件的功能
            if (TestSort())
                args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`);
            // 继续循环
            return true;
        };
        // 播放 音效
        player.playSound('item.book.page_turn');
        // 创建 路径执行计划
        opal.PathExecute.CreateForCube('林业指南-范围扫描', {
            particles: ['constant:track_rune_green'],
            locations: [],
            dimension: player.dimension,
            cooldown: 1,
            speed: 1,
            on_move: moveEvent
        }, start, done, 0.25);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 矿物辞典
 */
components.set(componentPrefix + 'mineral_dictionary', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 100))
            return;
        /**
         * * 定义 起始点
         */
        const start = opal.Vector.add(player.location, { x: -5, y: -9, z: -5 });
        /**
         * * 定义 结束点
         */
        const done = opal.Vector.add(player.location, { x: 5, y: 9, z: 5 });
        /**
         * * 在 绘制路径 时 执行 的 程序
         */
        const moveEvent = (args) => {
            /**
             * * 检测方块是否需要被挖掘
             */
            const TestSort = () => {
                /**
                 * * 获取 方块对象
                 */
                const getBlock = args.dimension.getBlock(args.location);
                // 检测 方块类型
                if (getBlock)
                    return table.is_mineral.has(getBlock.typeId);
                else
                    return false;
            };
            //执行路径事件的功能
            if (TestSort()) {
                // 执行填充方块命令
                args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`);
                /**
                 * * 定义 掉落物 的 参数
                 */
                const options = {
                    location: args.location,
                    type: "minecraft:item",
                    maxDistance: 4
                };
                // 获取附近的掉落物
                args.dimension.getEntities(options).forEach(entity => entity.teleport(player.getHeadLocation(), { dimension: player.dimension }));
            }
            // 继续循环
            return true;
        };
        // 播放 音效
        player.playSound('item.book.page_turn');
        // 创建 路径执行计划
        opal.PathExecute.CreateForCube('矿物辞典-范围扫描', {
            particles: ['constant:track_color_rainbow'],
            locations: [],
            dimension: player.dimension,
            cooldown: 1,
            speed: 1,
            on_move: moveEvent
        }, start, done, 0.25);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 空间宝典
 */
components.set(componentPrefix + 'space_transition', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 100))
            return;
        /**
         * * 诸界道标 数据信息
         */
        const RoadSign = new Map();
        // 获取 所有 道标
        player.getDynamicPropertyIds().filter(id => id.startsWith('road_sign:')).forEach(id => opal.CompileSign(player, id, RoadSign));
        // 播放 音效
        player.playSound('item.book.page_turn');
        //当玩家处于潜行时 触发的随机传送机制
        if (player.isSneaking) {
            /**
             * * 获取 可用 的 着陆点
             */
            const anchor = opal.QueryEntityFoothold(player, [...table.area_legend.keys()], 10, 512);
            //执行传送流程 并 播放音效
            if (opal.Vector.distance(anchor, player.location) > 3)
                player.teleport(anchor);
            // 播放音效
            server.system.runTimeout(() => player.playSound("conduit.attack"), 5);
        }
        else
            customFunction.basePresets().show(player).then(option => {
                if (option.canceled)
                    return;
                switch (option.selection) {
                    //相对传送
                    case 0:
                        customFunction.relativePresets().show(player).then(option => customFunction.renRelative(player, option));
                        break;
                    //随机传送
                    case 1:
                        customFunction.randomPresets().show(player).then(option => customFunction.renRandom(player, option));
                        break;
                    //诸界道标
                    case 2:
                        customFunction.signPresets(RoadSign).show(player).then(option => customFunction.renRoadSign(player, option, RoadSign));
                        break;
                }
            });
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 精灵结契
 */
components.set(componentPrefix + 'faerie_contract', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 100))
            return;
        /**
         * * 设定查询参数
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb", "minecraft:player"]
        };
        /**
         * * 获取 实体 的 距离信息
         */
        const Distance = (entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
        /**
         * * 获取 实体组 并 过滤掉 无法驯服的实体
         */
        const queue = opal.EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => entity.getComponent('minecraft:tameable') && !entity.getComponent('minecraft:tameable')?.isTamed);
        /**
         * * 定义了 窗口界面 的 标题
         */
        const title = {
            text: "§9《§5 精灵结契 §9》§r"
        };
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().title(title);
        /**
         * * 获取 实体 的 名称信息
         */
        const Intel = (entity) => {
            return {
                rawtext: [
                    { text: '§l' },
                    opal.translate(entity),
                    { text: `\n§9距离: §5${Distance(entity)}` }
                ]
            };
        };
        /**
         * 获取玩家选择的槽位
         */
        const slotIndex = player.selectedSlotIndex;
        // 遍历 实体数组 并 加入 按钮
        if (queue.length >= 1)
            queue.forEach(entity => display.button(Intel(entity), "textures/物品贴图/魔法书籍/精灵结契"));
        else
            display.button('§4§l周围不存在 §c<§9 可以§6<§u 契约 §6>§9的实体 §c>§r', "textures/物品贴图/魔法书籍/战术规划");
        // 播放 音效
        player.playSound('item.book.page_turn');
        // 显示 窗口界面
        display.show(player).then(option => {
            if (option.selection == undefined || queue.length == 0)
                return;
            // 契约 实体
            queue[option.selection].getComponent('minecraft:tameable')?.tame(player);
            // 移除 物品
            server.system.runTimeout(() => container?.setItem(slotIndex), 5);
            // 播放 音效
            server.system.runTimeout(() => player.playSound('conduit.deactivate'), 1);
        });
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 魔法绪论
 */
components.set(componentPrefix + 'introduction_magic', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        // 判断条件是否满足
        if (!player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        // 显示 区块边界
        opal.DisplayChunkBoundary(player);
        /**
         * * 获取 当前区块的消息通知
         */
        const notify = table.message_notify;
        // 判断当前区块是否具有消息通知
        if (!notify || notify.size < 1)
            return player.playSound('respawn_anchor.deplete');
        /**
         * * 消息通知 的 类型
         */
        const keys = Array.from(notify.keys());
        /**
         * * 获取 消息通知 的 内容信息
         */
        const value = Array.from(notify.values());
        /**
         * * 定义了 窗口界面 的 标题
         */
        const title = { text: "§9《§5 魔导绪论 §9》§r" };
        /**
         * * 当前区块内 消息通知 的 全部内容
         */
        const rawMessage = { rawtext: [] };
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().title(title).button('§u§l关闭§r').button('§4§l清除§r');
        // 编写 消息通知 的 内容信息
        keys.forEach((key, index) => {
            rawMessage.rawtext?.push({ text: `『 ${key} 』\n` }, value[index], { text: '\n\n=====================\n' });
        });
        // 将 消息通知 的 内容信息 写入 窗口界面
        display.body(rawMessage);
        // 显示 窗口界面
        display.show(player).then(option => {
            if (option.canceled || option.selection == undefined)
                return;
            if (option.selection == 1)
                notify.clear();
        });
        // 播放 使用音效
        player.playSound('beacon.activate');
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 源能秘典
 */
components.set(componentPrefix + 'source_energy', {
    onUse(source) {
        /**
         * 触发自定义组件的玩家
         *
         * @type {server.Player}
         */
        const player = source.source;
        /**
         * 触发自定义组件的物品
         *
         * @type {server.ItemStack | undefined}
         */
        const item = source.itemStack;
        /**
         * 判断条件是否满足 如果玩家或物品为空, 则直接返回
         */
        if (!player || !item)
            return;
        /**
         * 判断是否冷却完成 如果冷却未完成, 则直接返回
         */
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        /**
         * 创建表单内容
         */
        customFunction.sourceEnergy(player);
        /**
         * 播放翻书音效, 提示玩家操作成功
         */
        player.playSound('item.book.page_turn');
        /**
         * 为物品设置冷却时间
         */
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 幻海集纳
 */
components.set(componentPrefix + 'fantasy_sea_collection', {
    onHitEntity(source) {
        /**
         * 被击中的实体
         */
        const entity = source.hitEntity;
        /**
         * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * 触发自定义组件的玩家
         */
        const player = source.attackingEntity;
        /**
         * 指向方块容器的坐标信息
         */
        const pointer = item?.getDynamicProperty('entity:unload_backpack_to_container');
        // 判断玩家对象是否正确
        if (!(player instanceof server.Player))
            return;
        // 判断是否错误试图修改其他玩家的背包容器
        if (entity instanceof server.Player)
            return player.onScreenDisplay.setActionBar({ text: '§c§l该道具不可对玩家使用!!' });
        // 判断是否记录了坐标
        if (!pointer)
            return player.onScreenDisplay.setActionBar({ text: '§c§l请先设置目标< 方块容器 >坐标' });
        /**
         * 获取 被击中的实体的背包容器
         */
        const container = entity.getComponent('minecraft:inventory')?.container;
        /**
         * 获取 目标容器的 容器对象
         */
        const blockContainer = entity.dimension.getBlock(pointer)?.getComponent('minecraft:inventory')?.container;
        // 判断 容器对象是否存在
        if (!container || !blockContainer)
            return player.onScreenDisplay.setActionBar({ text: '§c§l请确认< 方块容器 >是否 已加载 或 存在 !!' });
        /**
         * 获取 目标容器 剩余存储空间
         */
        let emptySlots = blockContainer.emptySlotsCount;
        /**
         * * 物品组
         */
        const items = [];
        //抽取 实体背包内 指定数量 的物品
        for (let index = 0; index < container.size; index++) {
            /**
             * * 获取 物品
             */
            const getItem = container.getItem(index);
            // 判断 物品是否存在
            if (emptySlots == 0)
                break;
            if (!getItem)
                continue;
            // 将 物品 加入 物品组
            items.push(getItem);
            container.setItem(index);
            emptySlots -= 1;
        }
        ;
        //向 容器内 填充物品
        for (let index of items)
            blockContainer.addItem(index);
        // 输出 提示消息
        player.onScreenDisplay.setActionBar(`§7正在远程转移物品, < 方块容器 >的剩余空间为§r:§2 ${emptySlots}`);
    },
    onUseOn(source) {
        /**
         * 玩家点击的方块
         */
        const block = source.block.above() ?? source.block;
        /**
         * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * 玩家的背包容器
         */
        const container = player.getComponent('inventory')?.container;
        // 判断玩家对象是否正确
        if (!(player instanceof server.Player))
            return;
        // 判断被选中的方块是否为容器
        if (block?.getComponent('minecraft:inventory')?.container) {
            // 播放粒子效果
            opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
            // 修正物品数据, 记录方块容器的位置
            item.setDynamicProperty('entity:unload_backpack_to_container', block.location);
            // 更新玩家操作栏提示
            player.onScreenDisplay.setActionBar('§9§l< 方块容器 >位置已更新');
            // 更新玩家背包中的物品
            container?.setItem(player.selectedSlotIndex, item);
            // 播放声音效果
            player.playSound('conduit.attack');
        }
        // 如果不是容器 则进行提示
        else {
            // 如果不是容器, 播放声音并提示玩家
            player.playSound('conduit.deactivate');
            // 在方块中心生成物品
            opal.TrySpawnItem(player.dimension, item, block.center());
            // 更新玩家操作栏提示
            player.onScreenDisplay.setActionBar('§c§l请点击< 方块容器 >下方的方块!');
            // 清空玩家选中的物品
            player.getComponent('minecraft:inventory')?.container?.setItem(player.selectedSlotIndex);
        }
    }
});
/*
* 锚点虚印
*/
components.set(componentPrefix + 'dynamic_anchor_point', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 标题
         */
        const title = {
            text: "§r<§9§o§l 锚点虚印 §r>§9操作界面"
        };
        /**
         * * 选项
         */
        const option = [
            { text: '<§5§o§l 锚点绑定 §r>' },
            { text: '<§9§o§l 锚点召集 §r>' },
            { text: '<§4§o§l 锚点移除 §r>' },
            { text: '<§9§o§l 锚点传送 §r>' }
        ];
        /**
         * * 获取 窗口对象
         */
        const display = new serverUI.ActionFormData()
            .title(title)
            .button(option[0], "textures/物品贴图/特殊道具/锚点虚印")
            .button(option[1], "textures/物品贴图/特殊道具/锚点虚印")
            .button(option[2], "textures/物品贴图/特殊道具/锚点虚印")
            .button(option[3], "textures/物品贴图/特殊道具/锚点虚印");
        // 显示 操作界面
        display.show(player).then(result => {
            if (result.canceled)
                return;
            // 根据 选项 进行 不同 处理
            switch (result.selection) {
                // 绑定模式
                case 0:
                    customFunction.bindingAnchor(player);
                    break;
                // 召集模式
                case 1:
                    customFunction.musterAnchor(player);
                    break;
                // 移除模式
                case 2:
                    customFunction.deleteAnchor(player);
                    break;
                // 传送模式
                case 3:
                    customFunction.arrivalAnchor(player);
                    break;
            }
            ;
            // 播放 音效
            player.playSound('random.levelup');
        });
        // 播放 音效
        player.playSound('random.levelup');
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 神机操持
 */
components.set(componentPrefix + 'mechanized_operation', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 过滤器参数
         */
        const whaleOptions = {
            type: 'starry_map:abyss_whale.support',
            location: player.location,
            maxDistance: 5
        };
        /**
         * * 获取 附近的 渊鲸
         */
        const whale = player.dimension.getEntities(whaleOptions);
        /**
         * * 界面标题
         */
        const title = {
            text: "§r<§9§o§l 神机操持 §r>§9操作界面"
        };
        /**
         * * 界面选项
         */
        const option = [
            { text: '<§5§o§l 上浮模式 §r>' },
            { text: '<§5§o§l 下潜模式 §r>' },
            { text: '<§9§o§l 列车行进 §r>' },
            { text: '<§9§o§l 列车左旋 §r>' },
            { text: '<§9§o§l 列车右旋 §r>' },
        ];
        /**
         * * 列车查询参数
         */
        const trainOptions = {
            families: ['train'],
            maxDistance: 48,
            location: player.location
        };
        // 播放 音效
        player.playSound('respawn_anchor.charge');
        /**
         * * 创建 界面
         */
        const display = new serverUI
            .ActionFormData()
            .title(title)
            .button(option[0], "textures/项目图标/神机操持/上浮模式")
            .button(option[1], "textures/项目图标/神机操持/下潜模式")
            .button(option[2], "textures/项目图标/神机操持/载具行驶")
            .button(option[3], "textures/项目图标/神机操持/左舷回转")
            .button(option[4], "textures/项目图标/神机操持/右舷回转");
        // 显示界面
        display.show(player).then(select => {
            //对 用户选项 做出反应
            switch (select.selection) {
                //启动 上浮模式
                case 0:
                    // 遍历 附近的 渊鲸
                    opal.GetContractRoles(player, whaleOptions, entity => {
                        /**
                         * * 获取 当前的方块
                         */
                        const block = entity.dimension.getBlock(entity.location);
                        // 如果处于流体中 就 解除渊鲸 的 航行限制
                        if (block?.isLiquid)
                            entity.triggerEvent('entity_event:secure_prohibit');
                        // 执行上浮模式实体事件
                        entity.triggerEvent('entity_event:immediately_float');
                    });
                    break;
                //启动 下潜模式
                case 1:
                    whale.forEach(info => info.triggerEvent('entity_event:immediately_dive'));
                    break;
                // 启动 列车行进
                case 2:
                    opal.GetContractRoles(player, trainOptions, (entity) => entity.triggerEvent('entity_event:switch'));
                    player.playSound('tile.piston.out');
                    break;
                // 启动 列车左旋
                case 3:
                    opal.GetContractRoles(player, trainOptions, (entity) => entity.addTag('tunnel_train.Sinistral'));
                    player.playSound('tile.piston.out');
                    break;
                // 启动 列车右旋
                case 4:
                    opal.GetContractRoles(player, trainOptions, (entity) => entity.addTag('tunnel_train.Dextral'));
                    player.playSound('tile.piston.out');
                    break;
            }
            ;
            // 播放 音效
            player.playSound('random.levelup');
        });
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 参悟之石
 */
components.set(componentPrefix + 'enlightenent', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 设置 实体 的 查询条件
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb", player.typeId],
            excludeFamilies: ["monster"],
            location: player.location,
            maxDistance: 16
        };
        /**
         * * 获取 实体 的 距离信息
         */
        const entityDistance = (entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
        /**
         * * 实体过滤器
         */
        const entityFilter = (entity) => entity.getComponent('minecraft:health') !== undefined;
        /**
         * * 获取 实体组 并 过滤掉 无法驯服的实体
         */
        const entityQueue = opal.EntitysSort(player.dimension, options, (a, b) => entityDistance(a) - entityDistance(b), entityFilter);
        /**
         * * 定义了 窗口界面 的 标题
         */
        const itemTitle = {
            text: "§9§l<§u 参悟之石 §9>§r§3操作界面"
        };
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const queueDisplay = new serverUI.ActionFormData().title(itemTitle);
        /**
         * * 功能选择界面
         *
         * @param option - 选项
         */
        const PropertySelection = (option) => {
            // 判断玩家是否 选择 退出
            if (option.selection == undefined || entityQueue.length == 0)
                return;
            /**
             * * 获取 目标 实体
             */
            const target = entityQueue[option.selection];
            /**
             * * 实体属性
             */
            const property = opal.GetProperty(target);
            /**
             * * 实体血量
             */
            const health = target.getComponent('health');
            /**
             * * 能量返还
             */
            const returnEnergy = target.getDynamicProperty('entity:return_energy') ?? 0;
            /**
             * * 获取 战斗经验值
             */
            const experience = target.getDynamicProperty('entity:experience') ?? 0;
            /**
             * * 用户标识符
             */
            const userId = target.getDynamicProperty('entity:contract_user');
            /**
             * * 用户名称
             */
            const userName = userId ? server.world.getEntity(userId)?.nameTag : '未知';
            /**
             * * 限制数值的范围
             *
             * @param {number} value - 数值
             *
             * @returns {number} 限定范围内的数值
             */
            const levelClamp = (value) => opal.Clamp({ max: table.max_experience, min: 0 }, Math.floor(value));
            /**
             * * 界面标题
             */
            const targetTitle = {
                rawtext: [
                    { text: '§u『§l ' }, opal.translate(target), { text: ' §u』' }
                ]
            };
            /**
             * * 界面内容
             */
            const targetIntel = {
                rawtext: [
                    { text: `[§q§l 实体血量 §r] : §l§2${Math.floor((health?.currentValue ?? 0))}§r /§l§3 ${health?.defaultValue ?? 0}§r\n` },
                    { text: `[§p§l 实体归属 §r] : §l§6${userName}§r\n` },
                    { text: `[§1§l 战术等级 §r] : §l§9${levelClamp(experience / table.experience_improve)}§r\n` },
                    { text: `[§s§l 战斗经验 §r] : §l§b${experience}§r\n` },
                ]
            };
            /**
             * * 提高被选中的属性数据
             *
             * @param option - 选项对象
             */
            const increaseProperty = (option, amount) => {
                // 判断玩家是否做出了选择
                if (option.selection == undefined)
                    return;
                // 基于 玩家选择的选项 判断 什么属性的数值
                switch (option.selection) {
                    //* 基础攻击
                    case 0:
                        // 判断 是否可以继续提升
                        if (property.basic_attack > 95)
                            return player.sendMessage(`§l§4<§c 基础攻击 §4>§r已到达上限, 无法继续提升`);
                        // 提示 修改结果
                        player.sendMessage(`§l§1<§9 基础攻击 §1>§t获得提升, 现在为§r: §l§u${property.basic_attack + (5 * amount)}`);
                        // 更改 实体属性
                        opal.AlterProperty(target, { basic_attack: (5 * amount) });
                        break;
                    //* 基础暴击
                    case 1:
                        // 判断 是否可以继续提升
                        if (property.erupt_odds > 95)
                            return player.sendMessage(`§l§4<§c 基础暴击 §4>§r已到达上限, 无法继续提升`);
                        // 提示 修改结果
                        player.sendMessage(`§l§1<§9 基础暴击 §1>§t获得提升, 现在为§r: §l§u${property.erupt_odds + (5 * amount)}%`);
                        // 更改 实体属性
                        opal.AlterProperty(target, { erupt_odds: (5 * amount) });
                        break;
                    //* 基础暴伤
                    case 2:
                        // 判断 是否可以继续提升
                        if (property.erupt_hurt > 475)
                            return player.sendMessage(`§l§4<§c 基础暴伤 §4>§r已到达上限, 无法继续提升`);
                        // 提示 修改结果
                        player.sendMessage(`§l§1<§9 基础暴伤 §1>§t获得提升, 现在为§r: §l§u${property.erupt_hurt + (25 * amount)}%`);
                        // 更改 实体属性
                        opal.AlterProperty(target, { erupt_hurt: (25 * amount) });
                        break;
                    //* 能量返还
                    case 3:
                        // 判断属性数值是否到达上限
                        if (returnEnergy > 95)
                            return player.sendMessage(`§l§4<§c 能量返还 §4>§r已到达上限, 无法继续提升`);
                        // 显示 修改结果
                        player.sendMessage(`§l§1<§9 能量返还 §1>§t获得提升, 现在为§r: §l§u${returnEnergy + (5 * amount)}`);
                        // 修改属性值
                        target.setDynamicProperty("entity:return_energy", returnEnergy + (5 * amount));
                        break;
                    //* 未知选项
                    default: break;
                }
                ;
                // 消耗指定数量的物品
                opal.ConsumeItemStack(container, player.selectedSlotIndex, item, amount);
            };
            /**
             * * 创建 选择 物品数量 的窗口
             */
            const amountDisplay = new serverUI.ModalFormData()
                .title(targetTitle)
                .slider('消耗数量', 1, item.amount, { 'valueStep': 1, 'defaultValue': 1 });
            /**
             * * 创建 选择 加成属性 的窗口
             */
            const PropertyDisplay = new serverUI.ActionFormData()
                .title(targetTitle)
                .body(targetIntel)
                .button(`提升§l§1[§9 基础攻击 §1]§r : §l§2${property.basic_attack}§r /§l§3 100 §r<§u§l +5 §r>`, 'textures/项目图标/攻击')
                .button(`提升§l§1[§9 基础暴击 §1]§r : §l§2${property.erupt_odds}%% §r /§l§3 100%% §r<§u§l +5%% §r>`, 'textures/项目图标/命中')
                .button(`提升§l§1[§9 基础暴伤 §1]§r : §l§2${property.erupt_hurt}%% §r /§l§3 500%% §r<§u§l +25%% §r>`, 'textures/项目图标/提升')
                .button(`提升§l§1[§9 能量返还 §1]§r : §l§2${returnEnergy} §r /§l§3 100 §r<§u§l +5 §r>`, 'textures/项目图标/返回')
                .button(`§l§1[§9 技能模组 §1]§r`, 'textures/项目图标/查询');
            // 判断 目标实体 与 手持物品 是否存在
            if (!item || !target)
                return;
            // 显示 窗口界面
            PropertyDisplay.show(player).then(option => {
                // 验证表单关闭状态 或 窗口界面数据是否为空
                if (option.canceled || option.selection == undefined)
                    return;
                // 基于 玩家选择的选项 判断 是否消耗指定数量的物品
                if (option.selection >= 4) {
                    /**
                     * * 查询并创建当前实体的战斗技能的情报接口
                     */
                    const intel = opal.lexiconInterface(player, target.typeId);
                    // 打开情报窗口, 展示查询到的信息
                    opal.windowedRetriever(player, intel);
                }
                // 创建 选择 物品数量 的窗口
                else
                    amountDisplay.show(player).then(amount => {
                        /**
                         * 获取 窗口界面 的数据
                         */
                        const info = amount.formValues;
                        // 验证表单关闭状态 或 窗口界面数据是否为空
                        if (!amount.canceled && info !== undefined)
                            increaseProperty(option, info[0]);
                    });
            });
        };
        // 在实体队列中添加当前玩家
        entityQueue.unshift(player);
        // 遍历 实体数组 并 加入 按钮
        entityQueue.forEach(entity => queueDisplay.button(opal.DistanceAndName(entity, entityDistance(entity)), "textures/物品贴图/特殊道具/参悟之石"));
        // 播放 音效
        player.playSound('bucket.empty_lava');
        // 显示 窗口界面
        queueDisplay.show(player).then(option => PropertySelection(option));
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 涤尽铅华
 */
components.set(componentPrefix + 'reduction_pureness', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 设置 实体 的 查询条件
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb", player.typeId],
            excludeFamilies: ["monster"]
        };
        /**
         * * 获取 实体 的 距离信息
         */
        const Distance = (entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
        /**
         * * 实体过滤器
         */
        const Filter = (entity) => {
            if (!entity.getComponent('minecraft:health'))
                return false;
            if (entity.getDynamicProperty('entity:contract_user') !== player.id)
                return false;
            return true;
        };
        /**
         * * 获取 实体组 并 过滤掉并未签订契约的实体
         */
        const queue = opal.EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => Filter(entity));
        /**
         * * 定义了 窗口界面 的 标题
         */
        const title = {
            text: "§9§l<§u 涤尽铅华 §9>§r§3操作界面"
        };
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData().title(title);
        // 遍历 实体数组 并 加入 按钮
        if (queue.length >= 1)
            queue.forEach(entity => display.button(opal.DistanceAndName(entity, Distance(entity)), "textures/物品贴图/召唤凭证/星月诗篇"));
        else
            display.button('§4§l周围不存在 §c<§9 可以§6<§2 纯净化 §6>§9的实体 §c>§r', "textures/物品贴图/召唤凭证/星月诗篇");
        // 播放 音效
        player.playSound('bucket.empty_lava');
        // 显示 窗口界面
        display.show(player).then(option => {
            if (option.selection == undefined || queue.length == 0)
                return;
            /**
             * * 获取 目标 实体
             */
            const target = queue[option.selection];
            /**
             * * 定义 相机参数
             */
            const camera = player.camera;
            /**
             * * 粒子参数
             */
            const molang = new server.MolangVariableMap();
            /**
             * * 复制实体坐标
             */
            const anchor_0 = opal.Vector.copy(target.location);
            /**
             * * 复制实体坐标
             */
            const anchor_1 = opal.Vector.add(anchor_0, { x: 0, y: 2, z: 0 });
            /**
             * * 创建 百灵绘卷 物品对象
             */
            const material = new server.ItemStack('starry_map:moon_and_stars');
            /**
             * * 物品名称
             */
            const name = '§b启航星语 - §s';
            /**
             * * 物品词缀
             */
            const lore = [
                `类型: ${target.typeId}`,
                `名称: ${target.nameTag}`,
                "§b___________________",
                "此乃[ 魔神 - 葬火 ]的恩惠",
                "在登临[ 最终档案馆 ]的王座时",
                "祂曾向众生立下许诺:",
                "    凡此领航之众, 皆为吾之同族",
                "    只要吾之火不曾熄灭, 纵使败者亦能重燃"
            ];
            // 封印实体
            opal.UnloadInventoryAndPackage(target, player, material, name, lore);
            // 设置 粒子尺寸
            molang.setFloat('variable.size', 4);
            // 播放 蝴蝶特效
            molang.setFloat('variable.direction', 3);
            opal.TrySpawnParticle(player.dimension, 'scripts:path_butterfly', anchor_0, molang);
            // 播放 圆环特效
            molang.setFloat('variable.direction', 0);
            opal.TrySpawnParticle(player.dimension, 'scripts:path_round', anchor_1, molang);
            // 播放 四芒星特效
            opal.TrySpawnParticle(player.dimension, 'scripts:path_star4_small', anchor_1, molang);
            // 播放 封印动画
            camera.setCamera('minecraft:free', { location: opal.Vector.add(anchor_0, { x: 5, y: 5, z: 5 }), facingLocation: anchor_0, easeOptions: { easeTime: 2 } });
            server.system.runTimeout(() => camera.fade({ fadeColor: { red: 0, green: 0, blue: 0 }, fadeTime: { fadeInTime: 1, fadeOutTime: 0.5, holdTime: 0.5 } }), 30);
            server.system.runTimeout(() => player.playSound('mob.allay.idle'), 60);
            server.system.runTimeout(() => player.teleport(anchor_0), 60);
            server.system.runTimeout(() => camera.clear(), 60);
        });
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/**
 * * 涵养灵露
 */
components.set(componentPrefix + 'moment_repair_dew', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包容器
         */
        const container = player.getComponent('inventory')?.container;
        /**
         * * 玩家装备槽容器
         */
        const equippable = player.getComponent('equippable');
        /**
         * * 物品槽位
         */
        const equippableSlot = Object.values(server.EquipmentSlot);
        /**
         * * 玩家装备槽物品
         */
        const equippables = equippableSlot.map(slot => equippable?.getEquipment(slot));
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        // 播放 基础使用音效
        player.playSound('fire.ignite');
        // 遍历 玩家背包
        for (let index = 0; index < container.size; index++) {
            /**
             * * 获取 背包中的物品对象
             */
            const getItem = container.getItem(index);
            /**
             * * 获取 物品耐久度
             */
            const durability = getItem?.getComponent('durability');
            // 跳过 无效物品
            if (!getItem || !durability || durability.damage == 0)
                continue;
            // 显示 文本提示
            player.sendMessage([opal.translate(getItem), ' §a§l修复成功!']);
            // 恢复 物品耐久度
            durability.damage -= durability.damage;
            // 播放 恢复音效
            player.playSound('conduit.attack');
            // 置换 物品
            container.setItem(index, getItem);
            break;
        }
        ;
        // 遍历玩家装备栏
        equippables.forEach((item, index) => {
            /**
             * * 获取 物品耐久度
             */
            const durability = item?.getComponent('durability');
            // 跳过 无效物品
            if (!item || !durability || durability.damage == 0)
                return;
            // 显示 文本提示
            player.sendMessage([opal.translate(item), ' §a§l修复成功!']);
            // 恢复 物品耐久度
            durability.damage -= durability.damage;
            // 播放 恢复音效
            player.playSound('conduit.attack');
            // 置换 物品
            equippable?.setEquipment(equippableSlot[index], item);
        });
        // 删除 物品
        opal.DeleteItemStack(container, new server.ItemStack(item.typeId));
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 幻影驱散
 */
components.set(componentPrefix + 'phantom_dispel_dust', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        // 播放 基础使用音效
        player.playSound('fire.ignite');
        /**
         * * 获取 实体 的 距离信息
         */
        const distance = (entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
        /**
         * * 实体过滤器
         */
        const filter = (entity) => {
            // 筛除 无血量组件的实体
            if (!entity.getComponent('minecraft:health'))
                return false;
            // 筛除 已经被驯服的实体
            if (entity.getComponent('is_tamed'))
                return false;
            // 如果玩家为创造 则无视敌对实体的攻击目标
            if (opal.isPlayerAuthorized(player))
                return true;
            // 筛除 攻击目标不是玩家的实体
            if (entity.target?.id !== player.id)
                return false;
            // 默认选中实体
            return true;
        };
        /**
         * * 扫描敌对生物队列
         */
        const entitys = opal.EntitysSort(player.dimension, { families: ['monster'] }, distance, filter);
        // 判断 是否扫描到敌对实体
        if (entitys.length < 1)
            return;
        // 遍历敌对生物队列
        entitys.forEach(entity => {
            // 播放 烟雾 粒子效果
            opal.TrySpawnParticle(entity.dimension, 'minecraft:knockback_roar_particle', entity.getHeadLocation());
            opal.TrySpawnParticle(entity.dimension, 'constant:impact_rune_white', entity.getHeadLocation());
            opal.TrySpawnParticle(entity.dimension, 'constant:excite_rune_white', entity.getHeadLocation());
            opal.TrySpawnParticle(entity.dimension, 'constant:pulse_rune_white', entity.getHeadLocation());
            // 播放 水花 粒子效果
            opal.SprayParticleTrigger(entity.dimension, entity.location);
            // 删除 实体
            entity.remove();
        });
        // 删除 物品
        opal.DeleteItemStack(container, new server.ItemStack(item.typeId));
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 给与玩家 隐身效果
        player.addEffect('minecraft:invisibility', 60);
        // 播放 实体销毁时的音效
        player.playSound('cauldron.fillpotion');
    }
});
/*
 * 换装礼盒
 */
components.set(componentPrefix + 'clothing_container', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 获取 神恩领航者 - 琉璃
         */
        const crystal = player.getEntitiesFromViewDirection().map(raycast => raycast.entity).filter(entity => entity.typeId == 'starry_map:guide.crystal')[0];
        /**
         * * 定义了 窗口界面 的 标题
         */
        const title = {
            text: "§9《§5 换装礼盒 §9》§r"
        };
        /**
         * * 定义了 窗口界面 的 选项
         */
        const option = [
            { text: '<§q§o§l 自然 §r>' },
            { text: '<§p§o§l 灿烂 §r>' },
            { text: '<§d§o§l 樱华 §r>' },
            { text: '<§u§o§l 梦幻 §r>' },
            { text: '<§s§o§l 漫海 §r>' },
            { text: '<§a§o§l 夏鸣 §r>' },
            { text: '<§c§o§l 领航 §r>' }
        ];
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData()
            .title(title)
            .button(option[0], "textures/项目图标/神恩使徒/界木")
            .button(option[1], "textures/项目图标/神恩使徒/归忆")
            .button(option[2], "textures/项目图标/神恩使徒/烛火")
            .button(option[3], "textures/项目图标/神恩使徒/极雷")
            .button(option[4], "textures/项目图标/神恩使徒/诸海")
            .button(option[5], "textures/项目图标/神恩使徒/界木")
            .button(option[6], "textures/项目图标/神恩使徒/启程");
        // 输出 表单对象
        if (crystal && crystal?.isValid)
            display.show(player).then(option => {
                if (option.canceled)
                    return;
                // 设定琉璃的皮肤纹理
                crystal.setProperty('property:facade', Number(option.selection));
                // 播放音效
                player.playSound('beacon.power');
            });
        // 播放 基础使用音效
        player.playSound('chime.amethyst_block');
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    }
});
/*
 * 契约重撰
 */
components.set(componentPrefix + 'contract_rewriting', {
    async onHitEntity(source) {
        /**
         * 玩家对象, 触发自定义组件的玩家
         */
        const player = source.attackingEntity;
        /**
         * 被攻击的实体对象, 即攻击命中的实体
         */
        const entity = source.hitEntity;
        /**
         * 物品对象, 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * 玩家的背包容器, 用于后续操作玩家背包中的物品
         */
        const container = player?.getComponent('inventory')?.container;
        // 如果玩家不是Player实例、物品不存在或背包容器不存在, 则直接返回
        if (!(player instanceof server.Player) || !item || !container)
            return;
        // 检查物品是否冷却完毕, 如果没有冷却完毕则返回
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        // 在玩家所在维度播放粒子效果
        opal.TrySpawnParticle(player.dimension, 'constant:prompt_firefly', player.location);
        // 开始物品的冷却计时
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 尝试驯服被攻击的实体
        entity.getComponent('tameable')?.tame(player);
        // 播放使用音效给玩家
        player.playSound('chime.amethyst_block');
        // 设置玩家动作条的文本信息
        player.onScreenDisplay.setActionBar({ text: '§a§l契约重铸成功! 实体已修正从属关系!§r' });
        // 等待一个游戏刻（tick）的时间
        await server.system.waitTicks(1);
        // 设置实体的契约用户为当前玩家
        entity.setDynamicProperty('entity:contract_user', player.id);
        // 从玩家背包中删除该物品
        opal.DeleteItemStack(container, item);
    }
});
/*
 * 魔晶扳手
 */
components.set(componentPrefix + 'magic_crystal_wrench', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 定义了 窗口界面 的 标题
         */
        const title = {
            rawtext: [
                {
                    text: "<§9§o§l "
                },
                opal.translate(item),
                {
                    text: " §r>§2操作界面"
                }
            ]
        };
        /**
         * * 定义了 窗口界面 的 选项
         */
        const option = [
            { text: '§l<§n§o 元素附魔 §u-§c 烛火 §5>§r' },
            { text: '§l<§n§o 元素附魔 §u-§b 诸海 §5>§r' },
            { text: '§l<§n§o 元素附魔 §u-§a 界木 §5>§r' },
            { text: '§l<§n§o 元素附魔 §u-§d 极雷 §5>§r' },
            { text: '§l<§n§o 元素附魔 §u-§p 归忆 §5>§r' },
            { text: '§l<§n§o 元素附魔 §u-§i 启程 §5>§r' },
            { text: '§l<§n§o 元素附魔 §u-§j 焚绝 §5>§r' }
        ];
        /**
         * * 定义了 窗口界面 的 表单对象
         */
        const display = new serverUI.ActionFormData()
            .title(title)
            .button(option[0], "textures/物品贴图/能量水晶/烛火_魔晶石")
            .button(option[1], "textures/物品贴图/能量水晶/诸海_魔晶石")
            .button(option[2], "textures/物品贴图/能量水晶/界木_魔晶石")
            .button(option[3], "textures/物品贴图/能量水晶/极雷_魔晶石")
            .button(option[4], "textures/物品贴图/能量水晶/归忆_魔晶石")
            .button(option[5], "textures/物品贴图/能量水晶/启程_魔晶石")
            .button(option[6], "textures/物品贴图/能量水晶/焚绝_魔晶石");
        /**
         * * 设置元素附魔
         *
         * @param nameTag - 名称标签
         * @param selfRune - 自身的附魔类型
         */
        const enchanting = (nameTag, selfRune) => {
            // 为物品添加动态属性
            item.setDynamicProperty('rune_hurt:self_rune', selfRune);
            // 设置物品名称
            item.nameTag = nameTag;
            // 为物品添加词缀
            item.setLore(['攻击命中后, 将获得' + nameTag]);
            // 设置 物品对象
            container.setItem(player.selectedSlotIndex, item);
            // 播放 音效
            player.playSound('block.enchanting_table.use');
        };
        // 播放 音效
        player.playSound('tile.piston.out');
        // 显示窗口界面
        display.show(player).then(option => {
            if (option.canceled)
                return;
            switch (option.selection) {
                //元素附魔 - 烛火
                case 0:
                    enchanting('§l<§n§o 元素附魔 §u-§c 烛火 §5>§r', type.RUNE_ENUM.red);
                    break;
                //元素附魔 - 诸海
                case 1:
                    enchanting('§l<§n§o 元素附魔 §u-§b 诸海 §5>§r', type.RUNE_ENUM.blue);
                    break;
                //元素附魔 - 界木
                case 2:
                    enchanting('§l<§n§o 元素附魔 §u-§a 界木 §5>§r', type.RUNE_ENUM.green);
                    break;
                //元素附魔 - 极雷
                case 3:
                    enchanting('§l<§n§o 元素附魔 §u-§d 极雷 §5>§r', type.RUNE_ENUM.purple);
                    break;
                //元素附魔 - 归忆
                case 4:
                    enchanting('§l<§n§o 元素附魔 §u-§p 归忆 §5>§r', type.RUNE_ENUM.orange);
                    break;
                //元素附魔 - 启程
                case 5:
                    enchanting('§l<§n§o 元素附魔 §u-§i 启程 §5>§r', type.RUNE_ENUM.white);
                    break;
                //元素附魔 - 焚绝
                case 6:
                    enchanting('§l<§n§o 元素附魔 §u-§j 焚绝 §5>§r', type.RUNE_ENUM.black);
                    break;
            }
        });
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
    },
    onHitEntity(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.attackingEntity;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 触发自定义组件的目标实体
         */
        const target = source.hitEntity;
        // 判断条件是否满足
        if (!(player instanceof server.Player) || !item || !target || !container)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 10))
            return;
        /**
         * * 获取 玩家属性面板
         */
        const stages = opal.GetProperty(player);
        /**
         * * 粒子名称
         */
        const particle = stages.self_rune != 'rune_void' ? 'constant:impact_' + stages.self_rune : 'minecraft:sonic_explosion';
        /**
         * * 设置 范围查询 的 过滤条条件
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
            location: target?.location,
            maxDistance: 4,
            closest: 8
        };
        /**
         * * 获取 目标周围的实体
         */
        const getQueue = player.dimension.getEntities(options).filter(entity => entity.id !== player.id);
        /**
         * * 是否暴击
         */
        const erupt = opal.IsErupt(player);
        /**
         * * 获取 元素附魔类型
         */
        const self_rune = item.getDynamicProperty('rune_hurt:self_rune') ?? 'rune_purple';
        // 对 玩家属性 进行 修改
        opal.SetProperty(player, { self_rune: self_rune });
        // 获取属性提升值
        //IncreaseDamage(player, container);
        // 对选中的实体队列造成伤害
        getQueue.forEach(entity => opal.ElementalAttack(player, entity, erupt));
        // 生成 粒子特效
        opal.TrySpawnParticle(player.dimension, "minecraft:huge_explosion_emitter", target?.location ?? player.location);
        opal.TrySpawnParticle(player.dimension, particle, target?.location ?? player.location);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 魔晶弹珠
 */
components.set(componentPrefix + 'magic_crystal_marbles', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        // 播放 动画
        player.playAnimation('animation.item.common.resist', { blendOutTime: 0.5 });
        // 播放 音效
        player.playSound('item.trident.riptide_1');
        /**
         * * 获取 玩家指向的实体
         */
        const target = player.getEntitiesFromViewDirection({ maxDistance: 48 })[0]?.entity;
        // 确认 目标实体是否存在
        if (!target || !target.isValid)
            return;
        /**
         * * 设置 范围查询 的 过滤条条件
         */
        const options = {
            excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
            location: target.location,
            maxDistance: 8,
            closest: 8
        };
        /**
         * * 获取 目标周围的实体
         */
        const queue = player.dimension.getEntities(options).filter(entity => entity.id !== player.id);
        // 确认 目标实体是否存在
        if (queue.length == 0 || !target)
            return;
        // 获取属性提升值
        customFunction.increaseDamage(player, container, false);
        /**
         * * 获取 玩家属性面板
         */
        const data = opal.GetProperty(player);
        /**
         * * 爆炸效果 粒子名称
         */
        const blastParticle = 'constant:fireworks_fireball_' + data.self_rune;
        /**
         * * 是否暴击
         */
        const erupt = opal.IsErupt(player);
        /**
         * * 定义 粒子参数
         */
        const molang = new server.MolangVariableMap();
        /**
         * * 玩家 与 目标 之间的距离
         */
        const distance = opal.Vector.distance(player.location, target.location);
        /**
         * * 进行消耗的样本物品
         */
        const sample = new server.ItemStack(item.typeId);
        // 消耗 物品对象
        opal.DeleteItemStack(container, sample);
        // 设置 粒子参数
        molang.setColorRGB('variable.color', table.getRuneColor(data.self_rune));
        molang.setVector3('variable.direction', player.getViewDirection());
        molang.setFloat('variable.range', distance);
        molang.setFloat('variable.type', 0);
        // 播放 粒子效果
        opal.TrySpawnParticle(player.dimension, 'scripts:path_spurt', player.getHeadLocation(), molang);
        // 延迟 触发 元素伤害
        server.system.runTimeout(() => {
            if (!target || !target.isValid)
                return;
            // 对选中的实体队列造成伤害
            queue.forEach(entity => opal.ElementalAttack(player, entity, erupt, data));
            // 创建 爆炸粒子
            if (queue.length > 1)
                opal.TrySpawnParticle(player.dimension, blastParticle, target.location);
        }, distance);
    }
});
/*
 * 魔晶弹弓
 */
components.set(componentPrefix + 'magic_crystal_bow', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 10))
            return;
        // 执行 弹弓照明 机制
        if (player.isSneaking)
            customFunction.bowSneaking(player);
        // 如果 玩家 不在潜行模式
        else {
            /**
             * * 获取 玩家属性面板
             */
            const data = opal.GetProperty(player);
            // 对 属性 进行 初始化
            opal.SetProperty(player, { raise_basic_attack: 0 });
            // 获取属性提升值
            customFunction.increaseDamage(player, container);
            // 生成 粒子特效
            opal.TrySpawnParticle(player.dimension, 'constant:excite_' + data.self_rune, player.getHeadLocation());
        }
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
    }
});
/*
 * 魔晶起子
 */
components.set(componentPrefix + 'magic_crystal_screwdriver', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        /**
         * * 设置界面标题
         */
        const title = {
            text: "<§9§o§l 区块连锁 §r>§2操作界面"
        };
        /**
         * * 设置界面内容
         */
        const label = { text: '区块连锁 -> 用法' };
        /**
         * * 设置界面滑动条
         */
        const slider = [
            { text: '<§9§o§l 区块连锁 §r>极限深度§r' },
            { text: '<§9§o§l 区块连锁 §r>极限高度§r' },
            { text: '<§9§o§l 区块连锁 §r>极限范围§r' }
        ];
        /**
         * * 设置界面下拉框
         */
        const option = [
            { text: '§l§1[§9 潜行触发 §1]§r' },
            { text: '§l§c[§c 关闭功能 §c]§r' },
            { text: '§l§1[§4 始终触发 §1]§r' }
        ];
        // 设置界面
        new serverUI.ModalFormData()
            .title(title)
            .slider(slider[0], -16, -1, { 'valueStep': 1, 'defaultValue': -5 })
            .slider(slider[1], 1, 16, { 'valueStep': 1, 'defaultValue': 5 })
            .slider(slider[2], 4, 16, { 'valueStep': 1, 'defaultValue': 5 })
            .dropdown(label, option, { 'defaultValueIndex': 1 })
            .show(player).then(popup => {
            if (popup.canceled)
                return;
            /**
             * * 功能类型
             */
            const mode = ['潜行', undefined, '始终'];
            // 获取 窗口值
            const formValues = popup.formValues;
            // 显示 功能类型
            player.sendMessage(option[formValues[3]]);
            // 设置 区块连锁 类型
            player.setDynamicProperty('block_chain:type', mode[formValues[3]]);
            // 设置 区块连锁 深度
            player.setDynamicProperty('block_chain:depth', formValues[0]);
            // 设置 区块连锁 高度
            player.setDynamicProperty('block_chain:height', formValues[1]);
            // 设置 区块连锁 范围
            player.setDynamicProperty('block_chain:range', formValues[2]);
        });
        //播放音效
        player.playSound("break.amethyst_block");
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    },
    onMineBlock(source) {
        /**
         * 解构自定义组件的数据
         */
        const { source: player, minedBlockPermutation, block, itemStack } = source;
        /**
         * 获取区块连锁的类型与状态
         */
        const type = player.getDynamicProperty('block_chain:type');
        // 条件检查
        if (!(player instanceof server.Player) || !customFunction.canTriggerChainMining(player, itemStack, type) || !itemStack)
            return;
        /**
         * 获取被挖掘的方块标识符
         */
        const blockID = minedBlockPermutation.type.id;
        /**
         * 获取被挖掘的方块的位置
         */
        const location = block.location;
        /**
         * 获取被挖掘的方块的维度
         */
        const dimension = block.dimension;
        /**
         * 获取玩家背包
         */
        const container = player.getComponent('minecraft:inventory')?.container;
        /**
         * 获取玩家设置的区块连锁高度
         */
        const height = player.getDynamicProperty('block_chain:height');
        /**
         * 获取玩家设置的区块连锁深度
         */
        const depth = player.getDynamicProperty('block_chain:depth');
        /**
         * 获取玩家设置的区块连锁范围
         */
        const range = player.getDynamicProperty('block_chain:range');
        /**
         * 获取物品耐久度组件
         */
        const durability = itemStack.getComponent('minecraft:durability');
        // 检查耐久度组件是否存在
        if (!durability)
            return;
        /**
         * 获取耐久度消耗
         */
        const waste = (Math.abs(depth) + height) * (range * 2);
        // 检查耐久度是否足够
        if (!customFunction.checkDurability(durability, waste, player, itemStack))
            return;
        // 应用挖掘后状态效果
        customFunction.applyMiningEffects(player);
        // 执行连锁挖掘
        customFunction.executeMiningPath(dimension, blockID, location, range, depth, height, player);
        // 更新耐久度
        durability.damage += waste;
        // 更新物品状态
        if (container)
            container.setItem(player.selectedSlotIndex, itemStack);
    }
});
/*
 * 魔晶钩爪
 */
components.set(componentPrefix + 'magic_crystal_claw', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        /**
         * * 获取 向量
         */
        const Vector = player.getViewDirection();
        /**
         * * 状态效果 参数
         */
        const [options_0, options_1] = [
            {
                amplifier: 0,
                showParticles: false
            },
            {
                amplifier: 4,
                showParticles: false
            }
        ];
        /**
         * * 计算 水平 弹射 速度
         */
        const horizontalPower = (Math.abs(Vector.x) + Math.abs(Vector.z)) * 8;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        //播放音效
        player.playSound("random.bow");
        // 向量弹射
        player.applyKnockback({ x: Vector.x * horizontalPower, z: Vector.z * horizontalPower }, Vector.y * 4);
        // 生成 粒子特效
        opal.TrySpawnParticle(player.dimension, 'constant:magic_crystal_claw.icon', player.location);
        // 添加 状态效果
        player.addEffect("minecraft:slow_falling", 40, options_0);
        player.addEffect("minecraft:resistance", 40, options_1);
        // 更新 物品耐久
        opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
    }
});
/*
 * 百灵绘卷
 */
components.set(componentPrefix + 'chorus_picture', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 140))
            return;
        /**
         * * 检测 当前高度
         */
        const testHeight = player.location.y < player.dimension.heightRange.min + 32;
        /**
         * * 判断 是否执行过 初始召唤
         */
        const rule = player.getDynamicProperty('entity:house_create_after') ?? false;
        /**
         * * 解析 权重信息
         */
        const analysis = opal.AnalysisWeight(table.chorus_call_role).output;
        // 检测当前高度是否可用
        if (testHeight)
            return player.sendMessage([opal.translate(player), { text: ' -> 当前高度不足, 无法使用<§l§9 百灵绘卷 §r>' }]);
        // 播放 召唤动画
        opal.CompleteSummonAnimation(player, player.getHeadLocation());
        // 清除 物品
        container?.setItem(player.selectedSlotIndex);
        // 执行初始化生成
        if (!rule)
            return customFunction.initialSummoning(player);
        // 召唤 随机角色
        server.system.runTimeout(() => customFunction.randomCallRole(player, analysis), 40);
        // 发送 信息
        opal.IntelMessage(player, 5, '新的伙伴已经出现, 快使用§9[§n§l 精灵结契 §r§9]§r与§9[§6 领航者 §9]§r缔结属于你们的§9[§u 契约 §9]§r吧!!');
    }
});
/*
 * 流光之星
 */
components.set(componentPrefix + 'flowing_star', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 140))
            return;
        /**
         * * 检测 当前高度
         */
        const testHeight = player.location.y < player.dimension.heightRange.min + 32;
        // 检测当前高度是否可用
        if (testHeight)
            return player.sendMessage([opal.translate(player), { text: ' -> 当前高度不足, 无法使用<§l§9 流光之星 §r>' }]);
        // 清除 物品
        container?.setItem(player.selectedSlotIndex);
        /**
         * * 定义 坐标基准点
         */
        const reference = opal.Vector.add(player.location, { x: -13, y: -15, z: -13 });
        /**
         * * 读取 建筑结构
         */
        const template = server.world.structureManager.get('mystructure:starlight_house');
        // 预先填充空间
        opal.TryFillBlocks(player.dimension, reference, opal.Vector.add(reference, { x: 24, y: 24, z: 24 }), 'minecraft:white_stained_glass');
        // 检测 建筑结构
        if (!template)
            return player.sendMessage([opal.translate(player), { text: ' -> 未能获取到<§l§9 星辉雅居 §r>的结构数据文件' }]);
        // 加载 建筑结构
        server.system.runTimeout(() => server.world.structureManager.place(template, player.dimension, reference), 2);
        // 移动 玩家位置
        server.system.runTimeout(() => player.applyKnockback({ x: (Math.random() * 2) - 1, z: (Math.random() * 2) }, -1), 4);
        // 发送 信息
        opal.IntelMessage(player, 5, '『 星辉雅居 』');
        // 播放 召唤动画
        opal.CompleteSummonAnimation(player, player.getHeadLocation());
    }
});
/*
 * 星月诗篇
 */
components.set(componentPrefix + 'moon_and_stars', {
    onUse(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!container || !player || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl('使用-星月诗篇-召唤-被收纳-的实体', player, 80))
            return;
        /**
         * * 获取 实体类型
         */
        const typeId = item.getDynamicProperty('reduction_pureness:type');
        // 检测 物品数据类型是否完整且正确
        if (!typeId)
            return player.sendMessage(`§l§4<§c 星月诗篇 §4>§r数据丢失, 无法继续使用`);
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 执行召唤流程
        opal.SummonEntityWithData(player, container, typeId);
        // 播放 召唤动画
        opal.ParticleSummonAnimation(player, player.location);
    },
    /**
     * 处理实体被击中的事件
     *
     * @param {server.ItemComponentHitEntityEvent} source - 被击中实体的事件源
     */
    onHitEntity(source) {
        /**
         * 攻击者（玩家）
         *
         * @type {server.Entity}
         */
        const player = source.attackingEntity;
        /**
         * 被击中的实体
         *
         * @type {server.Entity}
         */
        const entity = source.hitEntity;
        /**
         * 玩家使用的物品
         *
         * @type {server.ItemStack | undefined}
         */
        const item = source.itemStack;
        /**
         * 玩家背包
         *
         * @type {server.Container | undefined}
         */
        const container = player.getComponent('inventory')?.container;
        // 如果没有实体, 物品, 或者实体无效, 或者攻击者不是玩家, 则直接返回
        if (!entity || !item || !entity.isValid || !(player instanceof server.Player))
            return;
        // 检查冷却时间是否完成
        if (!opal.TriggerControl('实体尝试合并星月诗篇的数据', entity, 20))
            return;
        /**
         * 物品的实体类型属性
         *
         * @type {string}
         */
        const typeId = item.getDynamicProperty('reduction_pureness:type');
        /**
         * 获取实体的捕获未来属性
         */
        const captureTheFuture = entity.getDynamicProperty('entity:capture_the_future') ?? 1;
        // 如果物品类型与实体类型不匹配, 显示错误消息并播放声音
        if (typeId !== entity.typeId) {
            /**
             * 错误消息
             *
             * @type {server.RawMessage[]}
             */
            const errorMessage = [
                { text: '§l§4[ 神明 - 归忆 ]并未降下注视§r ' },
                opal.translate(entity),
                { text: ' §l§4似乎未能汲取到任何力量§r' },
            ];
            player.onScreenDisplay.setActionBar(errorMessage);
            player.playSound('conduit.deactivate');
        }
        else if (captureTheFuture <= 3) {
            /**
             * 实体的动态属性ID列表
             *
             * @type {string[]}
             */
            const propertyID = item.getDynamicPropertyIds().filter(id => !id.startsWith('reduction_pureness:'));
            /**
             * 实体的战斗经验值
             *
             * @type {number}
             */
            const experience = entity.getDynamicProperty('entity:experience') ?? 0;
            /**
             * 成功消息
             *
             * @type {server.RawMessage[]}
             */
            const successMessage = [
                { text: '§l§2源自[ 神明 - 归忆 ]的加护§r ' },
                opal.translate(entity),
                { text: ' §l§2从< 尚未焚尽 >的未来中汲取了力量, 战术等级提升了§9 5 §2级! §r' },
            ];
            // 遍历实体的动态属性ID列表, 将物品的动态属性复制到实体
            propertyID.forEach(id => {
                /**
                 * 当前物品的动态属性值
                 *
                 * @type {string | number | boolean | server.Vector3 | undefined}
                 */
                const itemProperty = item.getDynamicProperty(id);
                /**
                 * 当前实体的动态属性值
                 *
                 * @type {string | number | boolean | server.Vector3 | undefined}
                 */
                const entityProperty = entity.getDynamicProperty(id);
                // 如果两个属性都是数字类型, 则将它们相加并设置到实体上
                if (typeof itemProperty == 'number' && typeof entityProperty == 'number')
                    entity.setDynamicProperty(id, itemProperty + entityProperty);
            });
            // 记录截获未来的次数
            entity.setDynamicProperty('entity:capture_the_future', captureTheFuture + 1);
            // 增加实体的战斗经验值
            entity.setDynamicProperty('entity:experience', experience + 360);
            // 清除玩家手中的物品
            container?.setItem(player.selectedSlotIndex);
            // 显示成功消息并播放声音
            player.onScreenDisplay.setActionBar(successMessage);
            // 播放声音
            player.playSound('conduit.activate');
        }
        else {
            /**
             * 错误消息
             *
             * @type {server.RawMessage[]}
             */
            const errorMessage = [
                { text: '§l§4[ 神明 - 归忆 ]拒绝赐福§r ' },
                opal.translate(entity),
                { text: ' §l§4无法燃烧自己的未来§r' },
            ];
            // 显示失败消息
            player.onScreenDisplay.setActionBar(errorMessage);
        }
    }
});
/*
 * 空白蓝图
 */
components.set(componentPrefix + 'blank_industrial_blueprint', {
    onUseOn(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 触发自定义组件的方块
         */
        const block = source.block;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!block || !container || !(player instanceof server.Player) || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 20))
            return;
        // 检测 玩家是否正在潜行
        if (player.isSneaking) {
            // 保存坐标信息
            item.setDynamicProperty('industrial_blueprint:location_1', source.block.center());
            player.sendMessage([
                opal.translate(player),
                { text: ' -> 已记录位置: ' + opal.Vector.toString(source.block.location) }
            ]);
        }
        else {
            // 保存坐标信息
            item.setDynamicProperty('industrial_blueprint:location_2', source.block.center());
            player.sendMessage([
                opal.translate(player),
                { text: ' => 已记录位置: ' + opal.Vector.toString(source.block.location) }
            ]);
        }
        ;
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 刷新手持物品
        container.setItem(player.selectedSlotIndex, item);
        // 播放 音效
        player.playSound('resonate.amethyst_block');
        /**
         * * 读取 坐标信息
         */
        const location_1 = item.getDynamicProperty('industrial_blueprint:location_1');
        /**
         * * 读取 坐标信息
         */
        const location_2 = item.getDynamicProperty('industrial_blueprint:location_2');
        // 检测 坐标信息
        if (!location_1 || !location_2 || opal.Vector.equals(location_1, location_2))
            return;
        // 创建 路径显示
        opal.PathExecute.CreateForFrame('空白蓝图范围显示', {
            particles: ['constant:track_color_rainbow'],
            locations: [],
            dimension: player.dimension,
            cooldown: 1,
            speed: 1
        }, location_1, location_2);
    },
    onMineBlock(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        /**
         * * 读取 坐标信息
         */
        const location_1 = item?.getDynamicProperty('industrial_blueprint:location_1');
        /**
         * * 读取 坐标信息
         */
        const location_2 = item?.getDynamicProperty('industrial_blueprint:location_2');
        // 判断条件是否满足
        if (!container || !(player instanceof server.Player) || !location_1 || !location_2 || opal.Vector.equals(location_1, location_2))
            return;
        /**
         * * 处理工业蓝图的转换
         *
         * @param {serverUI.ModalFormResponse} option -玩家输入
         */
        const transformation = (option) => {
            // 判断 玩家输入
            if (option.canceled || !option.formValues)
                return;
            /**
             * * 创建 新的物品
             */
            const newItem = new server.ItemStack('starry_map:complete_blueprint');
            /**
             * * 获取 区域体积
             */
            const volume = new server.BlockVolume(location_1, location_2);
            /**
             * * 获取 区域体积向量
             */
            const vector = opal.Vector.subtract(volume.getMax(), volume.getMin());
            // 创建 结构
            server.world.structureManager.createFromWorld('mystructure:' + option.formValues[0]?.toString(), player.dimension, location_1, location_2, {
                saveMode: server.StructureSaveMode.World,
                includeEntities: false,
                includeBlocks: true
            });
            // 修改 物品名称
            newItem.nameTag = option.formValues[0];
            // 修改 物品数据
            newItem.setDynamicProperty('industrial_blueprint:vector', vector);
            newItem.setDynamicProperty('industrial_blueprint:volume', volume.getCapacity());
            newItem.setDynamicProperty('industrial_blueprint:structure', option.formValues[0]?.toString());
            // 延迟 5 tick后, 生成新物品
            server.system.runTimeout(() => opal.TrySpawnItem(player.dimension, newItem, player.location), 5);
            // 清除手持物品
            container.setItem(player.selectedSlotIndex);
        };
        // 显示 界面
        new serverUI.ModalFormData()
            .title("§l§9 保存结构 §r")
            .textField("§l§t 结构名称 §r", "§l§m 结构名称 §r", { 'defaultValue': opal.BriefID() })
            .show(player).then(option => transformation(option));
        // 播放 音效
        player.playSound('block.stonecutter.use');
    }
});
/*
 * 成品蓝图
 */
components.set(componentPrefix + 'industrial_blueprint', {
    onUseOn(source) {
        /**
         * * 触发自定义组件的玩家
         */
        const player = source.source;
        /**
         * * 触发自定义组件的物品
         */
        const item = source.itemStack;
        /**
         * * 触发自定义组件的方块
         */
        const block = source.block;
        /**
         * * 玩家背包
         */
        const container = player.getComponent('inventory')?.container;
        // 判断条件是否满足
        if (!block || !container || !(player instanceof server.Player) || !item)
            return;
        // 判断是否冷却完成
        if (!opal.TriggerControl(item.typeId, player, 80))
            return;
        /**
         * * 读取 蓝图名称
         */
        const structureName = item.getDynamicProperty('industrial_blueprint:structure');
        /**
         * * 读取 区域体积
         */
        const volume = item.getDynamicProperty('industrial_blueprint:volume');
        /**
         * * 边框向量
         */
        const vector = item.getDynamicProperty('industrial_blueprint:vector');
        /**
         * * 配置 结构放置参数
         */
        const options = {
            animationMode: server.StructureAnimationMode.Blocks,
            animationSeconds: 10
        };
        // 播放 音效
        player.playSound('respawn_anchor.set_spawn');
        // 更新 物品冷却
        item.getComponent('minecraft:cooldown')?.startCooldown(player);
        // 判断条件是否满足
        if (!vector || !volume || !structureName)
            return player.sendMessage('§c§l当前<§l§u 机械蓝图 §r>§c§l数据缺失, 无法使用 !');
        /**
         * * 读取 建筑结构
         */
        const structure = server.world.structureManager.get(structureName);
        // 判断结构是否存在
        if (!structure)
            return player.sendMessage([opal.translate(player), { text: ' -> 未能获取到<§l§u 机械蓝图 §r>的结构数据文件' }]);
        /**
         * * 起始坐标
         */
        const startPlace = block.center();
        /**
         * * 结束坐标
         */
        const donePlace = opal.Vector.add(startPlace, vector);
        // 创建 路径显示
        opal.PathExecute.CreateForFrame('成品蓝图范围显示', {
            particles: ['constant:track_color_rainbow'],
            locations: [],
            dimension: player.dimension,
            cooldown: 1,
            speed: 1
        }, startPlace, donePlace);
        // 判断玩家是否潜行
        if (!player.isSneaking)
            return;
        // 消耗 能量 并确认 能量 是否充足
        if (opal.QueryEnergy(block) <= volume * 1000)
            return player.sendMessage('<§l§u 星尘力 §r>§c§l不足, 无法加载<§l§u 机械蓝图 §r>§c§l !');
        // 消耗 星尘能量
        opal.ExpendEnergy(block, -volume * 1000);
        // 创建 蓝图中保存的结构
        server.world.structureManager.place(structure, player.dimension, block.location, options);
    }
});
export default components;
