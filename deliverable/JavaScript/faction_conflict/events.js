import * as server from "@minecraft/server";
import { globalState, componentPrefix } from "./state";
import { Vector, MinecraftColor, RandomFloat } from "../system/maths";
import { TrySpawnParticle } from "../system/create";
import { TriggerControl } from "../system/control";
import { selectLegionInServerUI, setPublicProperty } from "./ui";
import { legionBaseUnderAttack } from "./legion";
/**
 * 确保军团基地生成点的唯一性
 */
export function registerEntitySpawnHandler() {
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
            dimension.getEntities({ families: [familyTag], location, maxDistance: 256 })
                .filter(newEntity => newEntity.id !== entity.id)
                .forEach(entity => entity.remove());
        }
    });
}
/**
 * 当世界初始化时注册与刷新军团成员目录并构建周期性执行
 */
export function registerWorldInitializeHandler() {
    server.world.afterEvents.worldInitialize.subscribe(async () => {
        // 输出等待初始化的信息
        server.world.sendMessage('[世界初始化] : 正在初始化军团成员目录...');
        // 延迟 100 tick 执行后续初始化流程
        await server.system.waitTicks(100);
        // 初始化玩家列表
        globalState.players.push(...server.world.getPlayers());
        // 输出初始化完毕的提示信息
        server.world.sendMessage('[世界初始化] : 初始化已完成, 点击< 木质按钮 >即可开启设置面板');
    });
}
/**
 * 监听原版按钮的点击事件
 */
export function registerButtonPushHandler() {
    server.world.afterEvents.buttonPush.subscribe(event => {
        // 获取事件信息
        const { source: player, block } = event;
        // 判断点击按钮的是否是玩家
        if (player instanceof server.Player)
            if (block.typeId === 'minecraft:stone_button')
                setPublicProperty(player);
            else
                selectLegionInServerUI(player);
    });
}
/**
 * 监听实体触发器事件
 */
export function registerDataDrivenEntityTriggerHandler() {
    server.world.afterEvents.dataDrivenEntityTrigger.subscribe(event => {
        const { entity, eventId } = event;
        switch (eventId) {
            case 'entity_event:legion_base_under_attack':
                legionBaseUnderAttack(entity);
                break;
            default: break;
        }
    });
}
/**
 * 加载并注册自定义物品组件
 */
export function registerItemComponentHandler() {
    server.world.beforeEvents.worldInitialize.subscribe(data => {
        // 注册缺少的自定义物品组件
        // 1. 注册select_legion_in_server_ui组件
        data.itemComponentRegistry.registerCustomComponent(`${componentPrefix}select_legion_in_server_ui`, {
            onUse: (event) => {
                const { source } = event;
                if (source instanceof server.Player) {
                    selectLegionInServerUI(source);
                }
            }
        });
        // 2. 注册set_public_property组件
        data.itemComponentRegistry.registerCustomComponent(`${componentPrefix}set_public_property`, {
            onUse: (event) => {
                const { source } = event;
                if (source instanceof server.Player) {
                    setPublicProperty(source);
                }
            }
        });
        // 保留原有注册逻辑以支持未来添加的自定义组件
        const itemCustoms = [...globalState.itemComponents.values()];
        const itemNames = [...globalState.itemComponents.keys()];
        for (let itemIndex = 0; itemIndex < itemCustoms.length; itemIndex++)
            data.itemComponentRegistry.registerCustomComponent(itemNames[itemIndex], itemCustoms[itemIndex]);
    });
}
/**
 * 监听实体生命值变化事件
 */
export function registerEntityHealthChangedHandler() {
    server.world.afterEvents.entityHealthChanged.subscribe(data => {
        /**
         * * 获取 实体
         */
        const self = data.entity;
        /**
         * * 伤害 的 数值
         */
        const value = data.oldValue - data.newValue;
        /**
         * 获取维度
         */
        const dimension = self.dimension;
        /**
         * 拷贝基地位置
         */
        const selfLocation = Vector.copy(self.location);
        /**
         * 获取上方位置
         */
        const above = Vector.copy(selfLocation).above(1);
        // 显示生命值变化
        // HealthAlterDisplay(self, Math.ceil(value));
        // 排除无效实体
        if (self.typeId.split(':')[1] !== 'legion_base')
            return;
        /**
         * 拷贝目标位置
         */
        const direction = Vector.copy(self.getViewDirection());
        // 获取所有在基地附近的实体
        self.dimension
            .getEntities({ location: self.location, maxDistance: 5 })
            .filter(target => target.id !== self.id && target.typeId !== 'minecraft:player')
            .forEach(target => target.applyImpulse(direction.multiply(5)));
        self.setRotation({ x: RandomFloat(-180, 180), y: RandomFloat(-180, 180) });
        // 播放音效
        dimension.getPlayers().forEach(player => player.playSound('respawn_anchor.set_spawn'));
        // 播放粒子
        dimension.spawnParticle('constant:erupt_rune_blue', above);
        dimension.spawnParticle('constant:erupt_rune_red', above);
    });
}
/**
 * 注册所有事件处理器
 */
export function registerAllEventHandlers() {
    registerEntitySpawnHandler();
    registerWorldInitializeHandler();
    registerButtonPushHandler();
    registerDataDrivenEntityTriggerHandler();
    registerItemComponentHandler();
    registerEntityHealthChangedHandler();
}
/**
 * 显示实体生命值变动效果, 通过在实体上方显示粒子效果来表示生命值的增减
 *
 * @param {server.Entity} [entity] - 需要显示生命值变动的实体
 *
 * @param {number} [variation] - 生命值变动的数值, 正数表示生命值增加, 负数表示生命值减少
 */
export function HealthAlterDisplay(entity, variation) {
    // 检查实体是否有效, 如果实体为空或无效, 则不执行任何操作
    if (!entity || !entity.isValid || !TriggerControl('生命值变动 -> ' + variation, entity))
        return;
    /**
     * 获取实体类型的基础显示偏移量, 用于确定粒子效果的显示位置
     *
     * 如果没有指定偏移量, 则使用默认值1.5
     *
     * @type {number}
     */
    const baseOffset = 1.5;
    /**
     * 生成随机的显示位置偏移量, 用于在实体上方显示粒子效果时增加随机性
     *
     * @type {server.Vector3}
     */
    const randomOffset = Vector.random(Vector.CONSTANT_ZERO, baseOffset, Vector.CONSTANT_UP.multiply(2));
    // 如果生命值变动的数值大于99999, 则将数值设置为99999
    if (Math.abs(variation) >= 99999)
        variation = 99999;
    /**
     * 确定生命值变动的方向, 0表示生命值增加, 1表示生命值减少
     * @type {number}
     */
    const direction = variation >= 0 ? 0 : 1;
    // 确保显示的数值为正数
    variation = Math.abs(variation);
    /**
     * 创建粒子参数映射, 用于设置粒子效果的参数
     *
     * @type {server.MolangVariableMap}
     */
    const molang = new server.MolangVariableMap();
    /**
     * 将生命值变动数值拆分为单个数字数组, 并反转顺序, 以便从高位到低位显示
     *
     * @type {number[]}
     */
    const digits = variation.toString().split('').reverse().map(Number);
    /**
     * 获取实体属性面板中的符文颜色, 用于设置粒子效果的颜色
     *
     * @type {server.RGB}
     */
    const color = new MinecraftColor(255, 10, 10);
    /**
     * 获取实体所在维度的对象, 用于在正确的维度中生成粒子效果
     *
     * @type {server.Dimension}
     */
    const dimension = server.world.getDimension(entity.dimension.id);
    // 设置粒子显示的偏移量
    molang.setVector3('variable.offset', randomOffset);
    // 设置粒子颜色
    molang.setColorRGB('variable.color', color);
    // 遍历数字数组, 显示每个数字的粒子效果
    digits.forEach((digit, index) => {
        // 设置粒子显示的数字属性
        molang.setVector3('variable.property', { x: digit, y: index, z: digits.length * 2 });
        // 尝试在实体位置生成数字显示粒子
        TrySpawnParticle(dimension, 'scripts:number_display', entity.location, molang);
    });
    // 设置符号显示的粒子属性
    molang.setVector3('variable.property', { x: direction, y: digits.length - 1, z: digits.length });
    // 尝试在实体位置生成符号显示粒子
    TrySpawnParticle(dimension, 'scripts:symbol_display', entity.location, molang);
}
;
