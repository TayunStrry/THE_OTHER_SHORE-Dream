//import * as server from "@minecraft/server";
import * as mojang from "mojang-minecraft";
/**
 * 时间积分值
 */
let timePrice = 0;
// ! 监听游戏测试模块的 tick 事件
mojang.world.events.worldInitialize.subscribe(() => mojang.world.events.tick.subscribe(tickEvent));
/**
 * tick事件
 */
function tickEvent() {
    // 时间积分值自增
    timePrice++;
    // 20 tick执行一次
    if (timePrice % 20 != 0) return;
    // 重置时间积分值
    timePrice = 0;
    /**
     * ! 获取游戏测试模块的第一序列的玩家
     */
    const targetPlayer = [...mojang.world.getPlayers()][0];
    // 如果未找到玩家，则退出函数
    if (!targetPlayer) return console.error("未找到玩家");
    /**
     * ! 获取游戏测试模块的玩家所在的维度
     */
    const targetDimension = targetPlayer.dimension;
    /**
     * ! 获取游戏测试模块的玩家所在的维度的全部实体
     */
    const targetEntitys = [...targetDimension.getEntities()];
    /**
     * ! 获取游戏测试模块的玩家所在的维度中的红方基地
     */
    const redLegionBase = targetEntitys.find(entity => entity.id === "red_legion:legion_base");
    /**
     * ! 获取游戏测试模块的玩家所在的维度中的蓝方基地
     */
    const blueLegionBase = targetEntitys.find(entity => entity.id === "blue_legion:legion_base");
    // 判断两军基地是否存在
    if (!redLegionBase || !blueLegionBase) return console.error("没有找到完整的军团基地");
    // 如果军团成员不存在目标, 则强制锁定到对方基地
    targetEntitys.filter(entity => entity.id.split(':')[0] === "red_legion" && !entity.target).forEach(entity => injectTarget(entity, blueLegionBase));
    targetEntitys.filter(entity => entity.id.split(':')[0] === "blue_legion" && !entity.target).forEach(entity => injectTarget(entity, redLegionBase));
};
/**
 * 强制设定目标
 */
function injectTarget(self: mojang.Entity, target: mojang.Entity) {
    // 检测参数是否合法
    if (!self || !target) return;
    // 设置实体攻击目标
    self.target = target;
    // 输出信息
    //console.log("强制设定了" + self.id + "的锁定目标为" + target.id);
};