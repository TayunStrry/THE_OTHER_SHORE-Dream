// Import required modules
import * as mojang from "mojang-minecraft";
import { Vector, RandomFloor } from "../system/maths";
// 监听世界初始化事件，绑定aggro目标刷新函数
mojang.world.events.worldInitialize.subscribe(() => rebindAggroTarget());
/**
 * 重新绑定敌对军团目标的主函数
 */
function rebindAggroTarget(): void {
    /**
     * 时间价格，用于控制核心逻辑的执行频率
     */
    let timePrice = 0;
    // 监听游戏 tick事件（每游戏刻执行一次）
    mojang.world.events.tick.subscribe(
        () => {
            // 每 80 个游戏刻(4秒)执行一次核心逻辑
            if (++timePrice % 5 !== 0) return;
            /**
             * 获取当前世界中的第一个玩家
             */
            const targetPlayer = getFirstPlayer();
            // 如果未找到玩家，则退出函数
            if (!targetPlayer) return //console.error("未找到玩家");
            /**
             * 获取玩家所在维度
             */
            const dimension = targetPlayer.dimension;
            /**
             * 获取维度内所有实体
             */
            const entities = [...dimension.getEntities()];
            /**
             * 获取红色军团的基地
             */
            const redBase = getLegionBase(entities, "red_legion");
            /**
             * 获取蓝色军团的基地
             */
            const blueBase = getLegionBase(entities, "blue_legion");
            // 检测军团的基地是否全部存在
            if (!redBase || !blueBase) return console.error("未找到完整的军团基地");
            // 为红方军团设置蓝方基地为目标
            newSetAggroTarget(entities, blueBase, 'red_legion');
            // 为蓝方军团设置红方基地为目标
            newSetAggroTarget(entities, redBase, 'blue_legion');
        }
    );
}
/**
 * 获取世界中第一个玩家
 *
 * @returns 玩家实体或undefined
 */
function getFirstPlayer(): mojang.Player | undefined {
    return [...mojang.world.getPlayers()][0];
}
/**
 * 根据阵营ID查找对应的基地实体
 *
 * @param entities 所有实体列表
 *
 * @param legionType 阵营类型（red_legion/blue_legion）
 *
 * @returns 基地实体或undefined
 */
function getLegionBase(entities: mojang.Entity[], legionType: string): mojang.Entity | undefined {
    return entities.find(entity => entity.id.startsWith(`${legionType}:`) && entity.id === `${legionType}:legion_base`);
}
/**
 * 为指定阵营的军团设置目标基地
 *
 * @param entities 所有实体列表
 *
 * @param targetBase 目标基地
 *
 * @param tag - 阵营标签
 */
function newSetAggroTarget0(entities: mojang.Entity[], targetBase: mojang.Entity, tag: string) {
    entities.forEach(
        self => {
            if (self.hasTag(tag) && self.id.split(':')[1] !== 'legion_base') {
                /**
                 * 拷贝自身坐标
                 */
                const selfLocation = Vector.copy(self.location);
                /**
                 * 随机攻击目标
                 */
                const randomTarget = [...targetBase.dimension.getEntities()].filter(entity => !entity.hasTag(tag) && entity.id.split(':')[1] !== 'player');
                /**
                 * 随机选择一个目标
                 */
                const newTarget = Math.random() >= 0.8 ? targetBase : randomTarget.length >= 1 ? randomTarget[RandomFloor(0, randomTarget.length - 1)] : targetBase;
                // 注入攻击目标
                self.target = newTarget;
                // 判断实体是否存在目标
                if (randomTarget.length >= 1) {
                    /**
                     * 拷贝目标位置
                     */
                    const targetLocation = Vector.copy(newTarget.location);
                    /**
                     * 获取两个向量的差值
                     */
                    const difference = selfLocation.difference(targetLocation);
                    /**
                     * 获取两个向量的距离
                     */
                    const distance = Vector.distance(selfLocation, targetLocation);
                    // 强制移动实体位置
                    if (distance >= 8) self.setVelocity(new mojang.Vector(difference.x, 0, difference.z));
                }
                // 输出日志
                //console.log(`强制设定了${self.id}的锁定目标为${target.id}`);
            }
        }
    );
};
function setAggroTarget(entities: mojang.Entity[], targetBase: mojang.Entity, tag: string) {
    entities.forEach(
        self => {
            // 排除无效实体
            if (!self.hasTag(tag) || self.id.split(':')[1] === 'legion_base') return;
            /**
             * 拷贝自身坐标
             */
            const selfLocation = Vector.copy(self.location);
            // 剔除已经靠近对方基地的实体
            if (selfLocation.distance(targetBase.location) > 16) {
                /**
                 * 拷贝目标位置
                 */
                const targetLocation = Vector.copy(targetBase.location);
                /**
                 * 获取两个向量的差值
                 */
                const difference = selfLocation.difference(targetLocation);
                // 强制移动实体位置
                self.setVelocity(new mojang.Vector(difference.x, 0, difference.z));
                // 设置目标
                self.target = targetBase;
                // 跳过后续逻辑
                return;
            };
            /**
             * 距离最近的攻击目标
             */
            const closestTarget = [...targetBase.dimension.getEntities()].filter(entity => !entity.hasTag(tag) && entity.id.split(':')[1] !== 'player').sort((a, b) => Vector.copy(a.location).distance(selfLocation) - Vector.copy(b.location).distance(selfLocation))[0];
            // 剔除已经选中正确目标的实体
            if (closestTarget === self.target) return;
            /**
             * 拷贝目标位置
             */
            const targetLocation = Vector.copy(closestTarget.location);
            /**
             * 获取两个向量的差值
             */
            const difference = selfLocation.difference(targetLocation);
            /**
             * 获取两个向量的距离
             */
            const distance = Vector.distance(selfLocation, targetLocation);
            // 强制移动实体位置
            if (distance >= 5) self.setVelocity(new mojang.Vector(difference.x, 0, difference.z));
            // 设置攻击目标
            self.target = closestTarget;
        }
    )
};
function newSetAggroTarget(entities: mojang.Entity[], targetBase: mojang.Entity, tag: string) {
    entities.forEach(
        self => {
            // 排除无效实体
            if (!self.hasTag(tag) || self.id.split(':')[1] === 'legion_base') return;
            /**
             * 拷贝自身坐标
             */
            const selfLocation = Vector.copy(self.location);
            // 如果尚未靠近敌方基地
            if (!self.hasTag('approaching_enemy_camps')) {
                // 添加标签
                if (selfLocation.distance(targetBase.location) <= 5) return self.addTag('approaching_enemy_camps');
                /**
                 * 拷贝目标位置
                 */
                const targetLocation = Vector.copy(targetBase.location);
                /**
                 * 获取两个向量的差值
                 */
                const difference = selfLocation.difference(targetLocation);
                // 强制移动实体位置
                self.setVelocity(new mojang.Vector(difference.x, difference.y, difference.z));
                // 设置目标
                self.target = targetBase;
                // 跳过后续逻辑
                return;
            };
            // 如果实体已经有攻击目标就跳过
            if (self.target) return;
            /**
             * 距离最近的攻击目标
             */
            const closestTarget = [...targetBase.dimension.getEntities()].filter(entity => !entity.hasTag(tag) && entity.id.split(':')[1] !== 'player').sort((a, b) => Vector.copy(a.location).distance(selfLocation) - Vector.copy(b.location).distance(selfLocation))[0];
            /**
             * 拷贝目标位置
             */
            const targetLocation = Vector.copy(closestTarget.location);
            /**
             * 获取两个向量的差值
             */
            const difference = selfLocation.difference(targetLocation);
            /**
             * 获取两个向量的距离
             */
            const distance = Vector.distance(selfLocation, targetLocation);
            // 强制移动实体位置
            if (distance >= 5) self.setVelocity(new mojang.Vector(difference.x, 0, difference.z));
            // 设置攻击目标
            self.target = closestTarget;
            //console.log(`强制设定了${self.id}的锁定目标为${closestTarget.id}`);
        }
    )
}