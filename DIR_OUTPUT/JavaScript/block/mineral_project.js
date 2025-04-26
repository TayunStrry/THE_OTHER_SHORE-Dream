/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import * as table from "../data/table";
/**
 ** 初级造石单元 < 35 能量消耗 >
 */
export function Solidify(object) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(object, -35))
        return;
    /**
     ** 石材类型
     */
    const type = opal.AnalysisWeight(table.solidify_output).output;
    /**
     ** 石材物品
     */
    const item = new server.ItemStack(type, 1);
    /**
     ** 获取 方块容器
     */
    const container = object.below()?.getComponent('minecraft:inventory')?.container;
    // 判断 物品容器 是否存在
    if (!container || container.emptySlotsCount == 0)
        opal.TrySpawnItem(object.dimension, item, opal.Vector.add(object, { x: 0.5, y: 1, z: 0.5 }));
    else
        container.addItem(item);
}
;
/**
 ** 破坏核心 < 15 能量消耗 >
 */
export function Destroy(object, type) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(object, -15))
        return;
    /**
     ** 坐标组
     */
    const locationGroup = [];
    // 获取 方块的 坐标
    switch (type) {
        case 'east':
            locationGroup.push(opal.Vector.add(object, opal.Vector.CONSTANT_EAST), opal.Vector.add(object, { x: 6, y: 0, z: 0 }));
            break;
        case 'west':
            locationGroup.push(opal.Vector.add(object, opal.Vector.CONSTANT_WEST), opal.Vector.add(object, { x: -6, y: 0, z: 0 }));
            break;
        case 'up':
            locationGroup.push(opal.Vector.add(object, opal.Vector.CONSTANT_UP), opal.Vector.add(object, { x: 0, y: 6, z: 0 }));
            break;
        case 'down':
            locationGroup.push(opal.Vector.add(object, opal.Vector.CONSTANT_DOWN), opal.Vector.add(object, { x: 0, y: -6, z: 0 }));
            break;
        case 'south':
            locationGroup.push(opal.Vector.add(object, opal.Vector.CONSTANT_SOUTH), opal.Vector.add(object, { x: 0, y: 0, z: 6 }));
            break;
        case 'north':
            locationGroup.push(opal.Vector.add(object, opal.Vector.CONSTANT_NORTH), opal.Vector.add(object, { x: 0, y: 0, z: -6 }));
            break;
    }
    ;
    /**
     ** 在路径上挖掘
     */
    const TickEvent = (args) => {
        args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`);
        return true;
    };
    // 创建 破坏核心 路径显示包
    opal.PathExecute.Create('破坏核心-射线动画', 1, {
        particles: ['constant:track_rune_red'],
        offset: { x: 0.5, y: 0.5, z: 0.5 },
        locations: locationGroup,
        dimension: object.dimension,
        on_move: TickEvent,
        cooldown: 1,
        speed: 1
    });
}
;
/**
 ** 初级矿井单元 < 150 能量消耗 >
 */
export function Mine(object) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(object, -150))
        return;
    /**
     ** 当前节点名称
     */
    const current = `mineral_vein•${object.dimension.id}•${Math.floor(object.location.x / 16)}•0•${Math.floor(object.location.z / 16)}`;
    /**
     ** 区域属性名称
     */
    const realmName = opal.RealmPropertyName(object, current.split(/•/)[0], 2);
    // 如果 区域属性名称 为空
    if (!realmName)
        return opal.CreateMineralVein(current);
    /**
     ** 获取 方块容器
     */
    const container = object.south()?.getComponent('minecraft:inventory')?.container;
    /**
     ** 设定 物品对象
     */
    const itemStack = new server.ItemStack(opal.ExpendMineralVein(realmName), 1);
    // 判断 物品容器 是否存在
    if (!container || container.emptySlotsCount == 0)
        opal.TrySpawnItem(object.dimension, itemStack, opal.Vector.add(object, { x: 0.5, y: 1, z: 0.5 }));
    else
        container.addItem(itemStack);
    // 发送 信息
    opal.AlterMessageNotify('<§l§b 虚岩矿脉 §r>§n 剩余矿石§r', object, opal.QueryMineralVein(realmName));
}
;
/**
 ** 金属锻压 < 15 能量消耗 >
 */
export function Forming(object) {
    // 判断能量值 是否足够
    if (!opal.ExpendEnergy(object, -15))
        return;
    /**
     ** 获取 方块容器
     */
    const container = object.above()?.getComponent('minecraft:inventory')?.container;
    // 判断 物品容器 是否存在
    if (!container || container.emptySlotsCount == 0)
        return opal.ErrorMessage('<§l§b 金属锻压 §r>§4 发生错误§r', object, { text: '未能在设备上方找到合适的<§l§3 方块容器 §r>' });
    // 遍历物品容器
    for (let index = 0; index < container.size; index++) {
        /**
         ** 获取 物品对象
         */
        const item = container.getItem(index);
        // 如果物品不存在 或 数量不足
        if (!item || item?.amount < 2)
            continue;
        /**
         ** 获取 锻压类型 标签
         */
        const tags = item?.getTags().filter(tag => tag.startsWith('tags:mineral_resources.make'));
        // 如果 锻压类型 标签不存在
        if (tags.length == 0)
            continue;
        /**
         ** 获取 锻压类型
         */
        const type = tags[0].split('.')[2];
        /**
         ** 获取 物品锻压阶段
         */
        const stage = item.typeId.split(':')[1].split('.').length;
        /**
         ** 获取 物品名称
         */
        const name = stage == 1 ? item.typeId.split(':')[1] : item.typeId.split(':')[1].split('.')[1];
        // 减少 物品堆栈
        opal.ConsumeItemStack(container, index, item, 2);
        // 添加 金属板 物品对象
        container.addItem(new server.ItemStack('starry_map:' + type + '.' + name));
        // 播放锻打音效
        object.dimension.playSound('random.anvil_use', object.location, { volume: 1, pitch: 1 });
        break;
    }
}
