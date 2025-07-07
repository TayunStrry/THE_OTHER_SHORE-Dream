/*
 * 原版接口
 */
import * as server from "@minecraft/server";
import * as maths from "../system/maths";
import * as create from "../system/create";
/*
 * 引入自定义函数
 */
import { getPreciseRotation, getMaxStates, getNextState } from "./custom_function";
/**
 * * 物品自定义组件列表
 */
const components = new Map<string, server.BlockCustomComponent>();
/*
 * 处理方块旋转
 */
components.set('cit:rotation',
    {
        /**
         * 在玩家放置方块前触发的回调函数，用于根据玩家的旋转角度设置方块的旋转状态
         *
         * @param {server.BlockComponentPlayerPlaceBeforeEvent} event - 玩家放置方块事件对象
         */
        beforeOnPlayerPlace(event: server.BlockComponentPlayerPlaceBeforeEvent) {
            // 从事件对象中解构出玩家对象
            const { player } = event;
            // 如果玩家对象不存在，直接返回
            if (!player) return;
            /**
             * 获取即将放置的方块的朝向状态
             */
            const blockFace = event.permutationToPlace.getState("minecraft:block_face");
            // 如果方块朝向不是朝上，直接返回
            if (blockFace !== "up") return;
            /**
             * 获取玩家的 Y 轴旋转角度
             */
            const playerYRotation = player.getRotation().y;
            /**
             * 调用自定义函数获取精确的旋转值
             */
            const rotation = getPreciseRotation(playerYRotation);
            // 更新即将放置的方块的旋转状态
            event.permutationToPlace = event.permutationToPlace.withState("cit:rotation", rotation);
        }
    }
);
/**
 * 处理动态状态的方块。
 */
components.set("cit:dynamic_state",
    {
        /**
         * 玩家与方块交互时触发的回调函数，用于处理动态状态的切换
         *
         * @param {server.BlockComponentPlayerInteractEvent} event - 玩家与方块交互事件对象
         */
        onPlayerInteract(event: server.BlockComponentPlayerInteractEvent) {
            // 从事件对象中解构出玩家对象和方块对象
            const { player, block } = event;
            // 如果玩家对象不存在或玩家没有潜行，直接返回
            if (!player || !player.isSneaking) return;
            /**
             * 获取当前方块的动态状态，若不存在则默认为 0
             */
            const currentState = block.permutation.getState("cit:dynamic_state") || 0;
            // 如果当前状态不是数字类型，直接返回
            if (typeof currentState !== "number") return;
            /**
             * 调用自定义函数获取最大状态数
             */
            const maxStates = getMaxStates(block);
            /**
             * 调用自定义函数获取下一个状态
             */
            const newState = getNextState(currentState, maxStates);
            /**
             * 获取方块的变体状态
             */
            const variant = block.permutation.getState("cit:variant");
            // 如果变体状态为 1 或 2，则处理特殊逻辑
            if (variant === 1 || variant === 2) {
                /**
                 * 根据变体状态确定基础方块
                 */
                const baseBlock = variant === 1 ? block : block.below();
                // 如果基础方块不存在，直接返回
                if (!baseBlock) return;
                /**
                 * 获取基础方块的当前动态状态，若不存在则默认为 0
                 */
                const baseCurrentState = baseBlock.permutation.getState("cit:dynamic_state") || 0;
                // 如果基础方块的当前状态不是数字类型，直接返回
                if (typeof baseCurrentState !== "number") return;
                /**
                 * 调用自定义函数获取基础方块的最大状态数
                 */
                const baseMaxStates = getMaxStates(baseBlock);
                /**
                 * 调用自定义函数获取基础方块的下一个状态
                 */
                const baseNewState = getNextState(baseCurrentState, baseMaxStates);
                // 更新基础方块的动态状态
                create.TrySetPermutation(baseBlock, "cit:dynamic_state", baseNewState);
                /**
                 * 获取基础方块上方的方块
                 */
                const topBlock = baseBlock.above();
                // 如果上方方块存在，则更新其动态状态
                if (topBlock) create.TrySetPermutation(topBlock, "cit:dynamic_state", baseNewState);
            }
            // 若变体状态不为 1 或 2，直接更新当前方块的动态状态
            else create.TrySetPermutation(block, "cit:dynamic_state", newState);
        }
    }
);
/**
 * 处理多方块结构的方块组件。
 */
components.set("cit:multiblock",
    {
        /**
         * 在玩家放置方块前触发的回调函数，用于处理多方块结构的放置逻辑
         *
         * @param {server.BlockComponentPlayerPlaceBeforeEvent} event - 玩家放置方块事件对象
         */
        beforeOnPlayerPlace(event: server.BlockComponentPlayerPlaceBeforeEvent) {
            // 从事件对象中解构出方块对象、玩家对象、即将放置的方块排列对象和维度对象
            const { block, player, permutationToPlace, dimension } = event;
            // 如果玩家对象不存在，无法进行后续操作，直接返回
            if (!player) return;
            /**
             * 获取当前方块上方的方块对象
             */
            const aboveBlock = block.above();
            /**
             * 获取当前方块下方的方块对象
             */
            const belowBlock = block.below();
            // 如果上方或下方方块不存在，无法进行后续操作，直接返回
            if (!aboveBlock || !belowBlock) return;
            /**
             * 获取玩家的 Y 轴旋转角度，用于确定方块的旋转状态
             */
            const playerYRotation = player.getRotation().y;
            /**
             * 调用自定义函数，根据玩家的 Y 轴旋转角度获取精确的旋转值
             */
            const rotation = getPreciseRotation(playerYRotation);
            // 检查上方方块是否有效且为空气方块
            if (aboveBlock.isValid && aboveBlock.isAir) {
                // 使用 server.system.run 确保在合适的时机执行方块设置操作
                server.system.run(
                    () => {
                        // 将上方方块的类型设置为当前方块的类型
                        aboveBlock.setType(permutationToPlace.type.id);
                        // 设置上方方块的变体状态为 2
                        create.TrySetPermutation(aboveBlock, "cit:variant", 2);
                        // 设置上方方块的动态状态为 0
                        create.TrySetPermutation(aboveBlock, "cit:dynamic_state", 0);
                        // 设置上方方块的旋转状态为计算得到的旋转值
                        create.TrySetPermutation(aboveBlock, "cit:rotation", rotation);
                        // 设置上方方块的朝向与即将放置的方块朝向一致
                        create.TrySetPermutation(aboveBlock, "minecraft:block_face", permutationToPlace.getState("minecraft:block_face") as string);
                    }
                )
                // 更新即将放置的方块的旋转状态，并设置其变体状态为 1
                event.permutationToPlace = event.permutationToPlace.withState("cit:rotation", rotation).withState("cit:variant", 1);
            }
            // 若上方方块不满足条件，检查下方方块是否有效且为空气方块
            else if (belowBlock.isValid && belowBlock.isAir) {
                // 使用 server.system.run 确保在合适的时机执行方块设置操作
                server.system.run(
                    () => {
                        // 将下方方块的类型设置为当前方块的类型
                        belowBlock.setType(permutationToPlace.type.id);
                        // 设置下方方块的变体状态为 1
                        create.TrySetPermutation(belowBlock, "cit:variant", 1);
                        // 设置下方方块的动态状态为 0
                        create.TrySetPermutation(belowBlock, "cit:dynamic_state", 0);
                        // 设置下方方块的旋转状态为计算得到的旋转值
                        create.TrySetPermutation(belowBlock, "cit:rotation", rotation);
                        // 设置下方方块的朝向为朝上
                        create.TrySetPermutation(belowBlock, "minecraft:block_face", 'up');
                    }
                )
                // 更新即将放置的方块的旋转状态，设置其变体状态为 2，并将朝向设置为朝上
                event.permutationToPlace = event.permutationToPlace.withState("cit:rotation", rotation).withState("cit:variant", 2).withState("minecraft:block_face", 'up');
            }
            // 若上方和下方方块都不满足条件
            else {
                /**
                 * 调用自定义函数创建一个 3x3x3 的立方体晶格向量数组
                 */
                const space = maths.Vector.createCubeLattice(1);
                // 遍历立方体晶格向量数组
                for (let index = 0; index < space.length; index++) {
                    /**
                     * 获取当前遍历到的向量
                     */
                    const vector = space[index];
                    /**
                     * 将当前向量与当前方块位置相加，得到目标方块的位置
                     */
                    const anchor = vector.add(block);
                    /**
                     * 根据目标位置获取对应的方块
                     */
                    const target = dimension.getBlock(anchor);
                    /**
                     * 获取目标方块上方的方块
                     */
                    const targetAbove = target?.above();
                    // 如果目标方块不存在、不是空气方块，或者其上方方块不存在、不是空气方块，则跳过本次循环
                    if (!target || !target.isAir || !targetAbove || !targetAbove.isAir) continue;
                    // 使用 server.system.run 确保在合适的时机执行方块设置操作
                    server.system.run(
                        () => {
                            /**
                             * 获取玩家的库存组件的容器
                             */
                            const container = player.getComponent('inventory')?.container;
                            /**
                             * 获取玩家当前选中槽位的物品
                             */
                            const item = container?.getItem(player.selectedSlotIndex);
                            // 将目标方块的类型设置为当前方块的类型
                            target.setType(permutationToPlace.type.id);
                            // 将目标方块上方的方块类型设置为当前方块的类型
                            targetAbove.setType(permutationToPlace.type.id);
                            // 设置目标方块上方的方块的变体状态为 2
                            create.TrySetPermutation(targetAbove, "cit:variant", 2);
                            // 设置目标方块上方的方块的动态状态为 0
                            create.TrySetPermutation(targetAbove, "cit:dynamic_state", 0);
                            // 设置目标方块上方的方块的旋转状态为计算得到的旋转值
                            create.TrySetPermutation(targetAbove, "cit:rotation", rotation);
                            // 设置目标方块上方的方块的朝向为朝上
                            create.TrySetPermutation(targetAbove, "minecraft:block_face", 'up');
                            // 设置目标方块的变体状态为 1
                            create.TrySetPermutation(target, "cit:variant", 1);
                            // 设置目标方块的动态状态为 0
                            create.TrySetPermutation(target, "cit:dynamic_state", 0);
                            // 设置目标方块的旋转状态为计算得到的旋转值
                            create.TrySetPermutation(target, "cit:rotation", rotation);
                            // 设置目标方块的朝向为朝上
                            create.TrySetPermutation(target, "minecraft:block_face", 'up');
                            // 如果玩家库存容器不存在或者当前选中槽位没有物品，直接返回
                            if (!container || !item) return;
                            // 如果当前选中槽位的物品堆叠数量大于 1
                            if (item.amount > 1) {
                                // 减少物品堆叠的数量
                                item.amount -= 1;
                                // 更新容器中当前选中槽位的物品堆叠
                                container.setItem(player.selectedSlotIndex, item);
                            }
                            // 如果当前选中槽位的物品堆叠数量为 1，则清空该槽位
                            else container.setItem(player.selectedSlotIndex);
                        }
                    )
                    // 找到合适的位置并完成放置操作后，跳出循环
                    break;
                }
                // 取消本次方块放置事件，因为已经在合适的位置重新放置了方块
                event.cancel = true;
            }
        }
    }
);
/**
 * 雪人多方块结构联动破坏
 */
components.set("cit:multidestory",
    {
        /**
         * 玩家破坏方块时触发的回调函数，用于处理多方块结构中关联方块的清理
         *
         * @param {server.BlockComponentPlayerBreakEvent} event - 玩家破坏方块事件对象
         */
        onPlayerBreak(event: server.BlockComponentPlayerBreakEvent) {
            // 从事件对象中解构出被破坏的方块对象和被破坏方块的排列对象
            const { block, brokenBlockPermutation } = event;
            /**
             * 获取被破坏方块的变体状态
             */
            const variant = brokenBlockPermutation.getState("cit:variant");
            // 如果变体状态为 1，清理上方的关联方块
            if (variant === 1) {
                /**
                 * 获取当前方块上方的方块
                 */
                const aboveBlock = block.above();
                // 如果上方方块存在，将其设置为空气方块
                if (aboveBlock) aboveBlock.setType("minecraft:air");
            }
            // 如果变体状态为 2，清理下方的关联方块
            else if (variant === 2) {
                /**
                 * 获取当前方块下方的方块
                 */
                const belowBlock = block.below();
                // 如果下方方块存在，将其设置为空气方块
                if (belowBlock) belowBlock.setType("minecraft:air");
            }
        }
    }
);
export default components;