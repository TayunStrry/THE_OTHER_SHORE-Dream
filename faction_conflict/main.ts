import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
import { TrySpawnEntity, TrySpawnParticle } from "../system/create";
import { translate } from "../system/translate";
import { TriggerControl } from "../system/control";
import { Vector, MinecraftColor } from "../system/maths";
/**
 * 组件前缀代
 */
const componentPrefix = 'opal:';
/**
 * 实体生成计划表格式
 */
interface memberPlanTable {
    /**
     *  实体生成数量
     */
    entityAmountValue: number,
    /**
     *  实体生成序列号
     */
    entityIndexValue: number,
    /**
     *  实体所属的阵营序列号
     */
    legionIndexValue: number,
    /**
     *  实体生成名称
     */
    entityNameValue: string
};
/**
 * 判断战争是否应该结束
 */
let shouldTheWarBeTerminated = 0;
/**
 *  公开的实体生成数量
 */
let publicEntityAmountValue = 0;
/**
 * 公开的实体生成序列号
 */
let publicEntityIndexValue = 0;
/**
 * 公开的实体阵营序列号
 */
let publicLegionIndexValue = 0;
/**
 *  公开的实体生成名称
 */
let publicEntityNameValue = "士兵";
/**
 *  实体生成计划表
 */
let planTable: memberPlanTable[] = [];
/**
 * 等待在下一周期中新增的计划表
 */
let pendingPlanTable: memberPlanTable[] = [];
/**
 *  团成员目录
 */
let memberDirectory: string[] = [
    //"minecraft:ender_dragon",
    "minecraft:warden",
    "minecraft:piglin_brute",
    "minecraft:iron_golem",
    "minecraft:wither",
    "minecraft:elder_guardian",
    "minecraft:creeper",
    "minecraft:hoglin",
    "minecraft:ravager",
    "minecraft:enderman",
    "minecraft:zoglin",
    "minecraft:witch",
    "minecraft:vindicator",
    "minecraft:polar_bear",
    "minecraft:guardian",
    "minecraft:zombie_pigman",
    "minecraft:zombie_horse",
    "minecraft:vex",
    "minecraft:pillager",
    "minecraft:piglin",
    "minecraft:ghast",
    "minecraft:stray",
    "minecraft:shulker",
    "minecraft:phantom",
    "minecraft:magma_cube",
    "minecraft:husk",
    "minecraft:evocation_illager",
    "minecraft:drowned",
    "minecraft:blaze",
    "minecraft:creaking",
    "minecraft:donkey",
    "minecraft:endermite",
    "minecraft:goat",
    "minecraft:horse",
    "minecraft:llama",
    "minecraft:mooshroom",
    "minecraft:mule",
    "minecraft:panda",
    "minecraft:skeleton",
    "minecraft:skeleton_horse",
    "minecraft:strider",
    "minecraft:trader_llama",
    "minecraft:wolf",
    "minecraft:zombie",
    "minecraft:zombie_villager_v2",
    "minecraft:turtle",
    "minecraft:spider",
    "minecraft:snow_golem",
    "minecraft:sniffer",
    "minecraft:slime",
    "minecraft:silverfish",
    "minecraft:sheep",
    "minecraft:salmon",
    "minecraft:rabbit",
    "minecraft:pig",
    "minecraft:ocelot",
    "minecraft:fox",
    "minecraft:cow",
    "minecraft:cat",
    "minecraft:camel",
    "minecraft:breeze",
    "minecraft:armadillo",
    "minecraft:agent",
    "minecraft:allay",
    "minecraft:axolotl",
    "minecraft:dolphin",
    "minecraft:fish",
    "minecraft:frog",
    "minecraft:parrot",
    "minecraft:glow_squid",
    "minecraft:squid",
    "minecraft:tadpole",
    "minecraft:tropicalfish",
    "minecraft:villager_v2",
    "minecraft:pufferfish",
    "minecraft:bat"
];
/**
 * 持续显示全局信息
 */
let continuousDisplay: boolean = false;
/**
 * 物品自定义组件列表
 */
const itemComponents = new Map<string, server.ItemCustomComponent>();
// TODO : 注册自定义组件: 可视化参数设定
itemComponents.set(componentPrefix + 'select_legion_in_server_ui',
    {
        'onUse'(arg0) { selectLegionInServerUI(arg0.source); }
    }
);
// TODO : 注册自定义组件: 数值化参数设定
itemComponents.set(componentPrefix + 'set_public_property',
    {
        'onUse'(arg0) { setPublicProperty(arg0.source) }
    }
);
// TODO : 确保军团基地生成点的唯一性
server.world.afterEvents.entitySpawn.subscribe(
    data => {
        /**
         * 获取诞生的实体
         */
        const { entity } = data;
        // 验证实体是否有效
        if (!entity || !entity.isValid()) return;
        /**
         * 获取维度,坐标与命名空间标识符
         */
        const { dimension, location, typeId } = entity;
        /**
         * 定义军团基地类型及其对应的家族标签
         */
        const legionBaseConfig: Record<string, string> = {
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
            dimension.getEntities({ families: [familyTag], location, maxDistance: 256 }).filter(newEntity => newEntity.id !== entity.id).forEach(entity => entity.remove());
        }
        // 添加标签
        entity.addTag(typeId.split(':')[0]);
    }
);
// TODO : 当世界初始化时注册与刷新军团成员目录并构建周期性执行
server.world.afterEvents.worldInitialize.subscribe(
    async data => {
        // 输出等待初始化的信息
        server.world.sendMessage('[世界初始化] : 正在初始化军团成员目录...');
        // 延迟 100 tick 执行后续初始化流程
        await server.system.waitTicks(100);
        // TODO : 初始化军团成员列表
        /**
         * 获取所有实体类型的赋予命名空间标识符
         */
        //const entityTypes = server.EntityTypes.getAll().map(type => type.id).filter(id => id.split(/:/)[0] === 'minecraft' && id.split(/:/)[1] !== 'player');
        // 遍历所有实体类型 并添加至对应的成员目录中
        //entityTypes.sort((a, b) => a.length - b.length).forEach(
        //type => {
        /**
         *  获取命名空间标识符
         */
        //const namespace = type.split(':')[0];
        // 忽略非minecraft命名空间
        //if (namespace !== 'minecraft') return;
        // 添加至成员目录中
        //memberDirectory.push(type);
        //}
        //);
        // TODO : 周期性遍历并执行计划表
        server.system.runInterval(tickEvent, 10);
        // 输出初始化完毕的提示信息
        server.world.sendMessage('[世界初始化] : 初始化已完成, 点击< 木质按钮 >即可开启设置面板');
    }
);
// TODO : 监听原版按钮的点击事件
server.world.afterEvents.buttonPush.subscribe(
    event => {
        // 获取事件信息
        const { source: player, block } = event;
        // 判断点击按钮的是否是玩家
        if (player instanceof server.Player)
            if (block.typeId === 'minecraft:stone_button') setPublicProperty(player)
            else selectLegionInServerUI(player);
    }
);
// TODO : 监听实体触发器事件
server.world.afterEvents.dataDrivenEntityTrigger.subscribe(
    event => {
        const { entity, eventId } = event;
        switch (eventId) {
            case 'entity_event:legion_base_under_attack': legionBaseUnderAttack(entity); break;

            default: break;
        }
    }
);
// TODO : 加载并注册自定义物品组件
server.world.beforeEvents.worldInitialize.subscribe(
    data => {
        /**
         * 物品自定义组件实例数组
         */
        const itemCustoms = [...itemComponents.values()];
        /**
         * 物品自定义组件名称数组
         */
        const itemNames = [...itemComponents.keys()];
        // === 物品自定义组件注册 ===
        for (let itemIndex = 0; itemIndex < itemCustoms.length; itemIndex++) data.itemComponentRegistry.registerCustomComponent(itemNames[itemIndex], itemCustoms[itemIndex]);
    }
);
/*
 * < 实体 > 生命值变化后 事件
 */
server.world.afterEvents.entityHealthChanged.subscribe(
    data => {
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
        HealthAlterDisplay(self, Math.ceil(value));
        // 排除无效实体
        if (self.typeId.split(':')[1] !== 'legion_base') return;
        // 获取所有在基地附近的实体
        self.dimension
            .getEntities({ location: self.location, maxDistance: 5 })
            .filter(target => target.id !== self.id)
            .forEach(
                target => {
                    /**
                     * 拷贝目标位置
                     */
                    const targetLocation = Vector.copy(target.location);
                    /**
                     * 获取两个坐标的距离
                     */
                    const targetdistance = targetLocation.distance(selfLocation);
                    // 忽略玩家
                    if (target instanceof server.Player) return;
                    // 赋予击退效果
                    try {
                        target.applyImpulse(targetLocation.difference(selfLocation).multiply(5 - targetdistance));
                    }
                    catch (error) { }
                }
            )
        // 播放音效
        dimension.getPlayers().forEach(player => player.playSound('respawn_anchor.set_spawn'));
        // 播放粒子
        dimension.spawnParticle('constant:erupt_rune_blue', above);
        dimension.spawnParticle('constant:erupt_rune_red', above);
    }
);
/**
 * 显示实体生命值变动效果, 通过在实体上方显示粒子效果来表示生命值的增减
 *
 * @param {server.Entity} [entity] - 需要显示生命值变动的实体
 *
 * @param {number} [variation] - 生命值变动的数值, 正数表示生命值增加, 负数表示生命值减少
 */
function HealthAlterDisplay(entity: server.Entity, variation: number) {
    // 检查实体是否有效, 如果实体为空或无效, 则不执行任何操作
    if (!entity || !entity.isValid || !TriggerControl('生命值变动 -> ' + variation, entity as any)) return;
    /**
     * 获取实体类型的基础显示偏移量, 用于确定粒子效果的显示位置
     *
     * 如果没有指定偏移量, 则使用默认值1.5
     *
     * @type {number}
     */
    const baseOffset: number = 1.5;
    /**
     * 生成随机的显示位置偏移量, 用于在实体上方显示粒子效果时增加随机性
     *
     * @type {server.Vector3}
     */
    const randomOffset: server.Vector3 = Vector.random(Vector.CONSTANT_ZERO, baseOffset, Vector.CONSTANT_UP.multiply(2));
    // 如果生命值变动的数值大于99999, 则将数值设置为99999
    if (Math.abs(variation) >= 99999) variation = 99999;
    /**
     * 确定生命值变动的方向, 0表示生命值增加, 1表示生命值减少
     * @type {number}
     */
    const direction: number = variation >= 0 ? 0 : 1;
    // 确保显示的数值为正数
    variation = Math.abs(variation);
    /**
     * 创建粒子参数映射, 用于设置粒子效果的参数
     *
     * @type {server.MolangVariableMap}
     */
    const molang: server.MolangVariableMap = new server.MolangVariableMap();
    /**
     * 将生命值变动数值拆分为单个数字数组, 并反转顺序, 以便从高位到低位显示
     *
     * @type {number[]}
     */
    const digits: number[] = variation.toString().split('').reverse().map(Number);
    /**
     * 获取实体属性面板中的符文颜色, 用于设置粒子效果的颜色
     *
     * @type {server.RGB}
     */
    const color: server.RGB = new MinecraftColor(255, 10, 10);
    /**
     * 获取实体所在维度的对象, 用于在正确的维度中生成粒子效果
     *
     * @type {server.Dimension}
     */
    const dimension: server.Dimension = server.world.getDimension(entity.dimension.id);
    // 设置粒子显示的偏移量
    molang.setVector3('variable.offset', randomOffset);
    // 设置粒子颜色
    molang.setColorRGB('variable.color', color);
    // 遍历数字数组, 显示每个数字的粒子效果
    digits.forEach(
        (digit, index) => {
            // 设置粒子显示的数字属性
            molang.setVector3('variable.property', { x: digit, y: index, z: digits.length * 2 });
            // 尝试在实体位置生成数字显示粒子
            TrySpawnParticle(dimension as any, 'scripts:number_display', entity.location, molang);
        }
    );
    // 设置符号显示的粒子属性
    molang.setVector3('variable.property', { x: direction, y: digits.length - 1, z: digits.length });
    // 尝试在实体位置生成符号显示粒子
    TrySpawnParticle(dimension as any, 'scripts:symbol_display', entity.location, molang);
};
/**
 * 在遍历计划表时执行的函数
 */
function tickEvent() {
    /**
     * 获取当前世界中的第一个玩家
     */
    const targetPlayer = server.world.getPlayers()[0];
    // ! 如果未找到玩家，则退出函数
    if (!targetPlayer) return console.error("未找到玩家");
    /**
     * 获取玩家所在维度
     */
    const dimension = targetPlayer.dimension;
    /**
     * 获取维度内所有实体
     */
    const entities = dimension.getEntities();
    /**
     * 获取蓝色军团的基地
     */
    const blueLegionBase = getLegionBase(entities, "blue_legion");
    /**
     * 获取红色军团的基地
     */
    const redLegionBase = getLegionBase(entities, "red_legion");
    // ! 检测军团的基地是否全部存在
    if (!redLegionBase || !blueLegionBase) return console.error("未找到完整的军团基地 -> " + blueLegionBase?.isValid() + " & " + redLegionBase?.isValid());
    // ! 判断是否应该终止战争
    if (shouldTheWarBeTerminated == 1) return legionBaseUnderAttack(blueLegionBase);
    /**
     * 读取全局变量
     */
    const results = readGlobalVariables();
    // 显示全局参数
    parameterDisplay(results);
    /**
     * 在遍历计划表时执行
     *
     * @param {memberPlanTable} plan - 计划表实例
     */
    const planEvent = (plan: memberPlanTable) => {
        try {
            /**
             * 基于阵营与序列码映射出实体命名空间标识符
             */
            const mappingEntityTypeID = memberDirectory[publicEntityIndexValue];
            // 显示实体生成
            //console.log("正在生成 " + mappingEntityTypeID + " 成员");
            /**
             * 尝试生成军团成员实体
             */
            const targetEntity = TrySpawnEntity(dimension as any, mappingEntityTypeID, plan.legionIndexValue == 1 ? blueLegionBase.location : redLegionBase.location);
            // 判断实体是否生成错误
            if (targetEntity instanceof Error) return console.error(targetEntity.message, targetEntity.stack);
            // 为生成的实体赋予名称
            targetEntity.nameTag = `${plan.legionIndexValue == 1 ? '§9' : '§m'}` + plan.entityNameValue;
            // 添加阵营标签
            targetEntity.addTag(plan.legionIndexValue == 1 ? 'blue_legion' : 'red_legion');
            // 消耗可用生成数量
            plan.entityAmountValue--
            // 如果生成数量耗尽则不再加入下个周期的生成计划内
            if (plan.entityAmountValue == 0) return;
            // 如果一切正常则将当前计划表延续到下一个周期
            pendingPlanTable.push(plan);
        }
        catch (error) {
            /**
             * 获取 错误信息
             */
            const info = error instanceof Error ? error : new Error(String(error));
            // 打印错误信息
            console.error(info.message, info.stack);
        }
    };
    // 清空上一周期的缓存
    pendingPlanTable = [];
    // 遍历计划表
    planTable.forEach(planEvent);
    // 重新赋值计划表
    planTable = pendingPlanTable;
};
/**
 * 读取全局变量
 */
function readGlobalVariables(): boolean {
    // 如果设定的阵营值是非法值, 则不加入计划表
    if (publicLegionIndexValue !== 1 && publicLegionIndexValue !== 2) return false;
    // 将全局变量加入计划表
    pendingPlanTable.push(
        {
            entityAmountValue: Math.floor(Math.max(publicEntityAmountValue, 1)),
            entityIndexValue: Math.floor(publicEntityIndexValue),
            legionIndexValue: Math.floor(publicLegionIndexValue),
            entityNameValue: publicEntityNameValue
        }
    );
    // 在读取结束后修改全局变量
    publicLegionIndexValue = -1;
    // 返回读取成功
    return true;
};
/**
 * 显示全局状态
 *
 * @param {boolean} allowDisplay - 是否允许显示
 */
function parameterDisplay(allowDisplay: boolean) {
    // 如果常驻显示和允许显示都不为真，则不执行后续代码
    if (!continuousDisplay && !allowDisplay) return;
    // 遍历全体玩家并显示全局公开参数
    server.world.getAllPlayers().forEach(player =>
        // 在玩家快捷栏上方显示
        player.onScreenDisplay.setActionBar(
            {
                rawtext: [
                    { text: ' 生成数量: ' + publicEntityAmountValue },
                    { text: ' 生成序列: ' + publicEntityIndexValue },
                    { text: ' 阵营序列: ' + publicLegionIndexValue },
                    { text: ' 生成名称: ' + publicEntityNameValue },
                ]
            }
        )
    );
};
/**
 * 使用服务器表单选择阵营
 *
 * @param {server.Player} player - 玩家
 */
function selectLegionInServerUI(player: server.Player) {
    /**
     * 新建一个 Action 表单窗口
     */
    const window = new serverUI.ActionFormData()
        .title("§9§l<§u 军团阵营 §9>§r§3选择界面§r")
        .button("<§s§o§l 蓝方军团基地 §r>", "textures/blue_legion_base")
        .button("<§4§o§l 红方军团基地 §r>", "textures/red_legion_base")
        .button("<[§c§o§l 终止战斗模拟 §r]>")
    // 显示表单窗口
    window.show(player).then(
        response => {
            // 如果玩家取消了窗口界面, 则不执行后续代码
            if (response.canceled || response.selection == undefined) return;
            //  获取玩家选择的按钮索引 并判断是否为终止战斗模拟按钮
            if (response.selection == 2) return shouldTheWarBeTerminated = 1;
            /**
             * 获取玩家选择的阵营索引
             */
            const legionIndexValue = response.selection + 1;
            // 跳转至显示选择阵营内实体的界面
            selectEntityInServerUI(player, legionIndexValue);
        }
    );
};
/**
 * 使用服务器表单显示当前阵容内实体
 *
 * @param {server.Player} player - 玩家
 *
 * @param {number} legionIndexValue - 阵营索引值
 */
function selectEntityInServerUI(player: server.Player, legionIndexValue: number) {
    /**
     * 新建一个 Action 表单窗口
     */
    const window = new serverUI.ActionFormData();
    // 根据阵营索引注入实体类型选项
    if (legionIndexValue == 1) memberDirectory.forEach(type => window.button(translate(type, 'entity'), 'textures/blue_legion_base_config'));
    if (legionIndexValue == 2) memberDirectory.forEach(type => window.button(translate(type, 'entity'), 'textures/red_legion_base_config'));
    // 显示表单窗口
    window.show(player).then(
        response => {
            // 如果玩家取消了窗口界面, 则不执行后续代码
            if (response.canceled || response.selection == undefined) return;
            /**
             * 获取玩家选择的实体索引
             */
            const entityIndexValue = response.selection;
            // 跳转至显示实体详细信息的界面
            writeEntityNameInServerUI(player, legionIndexValue, entityIndexValue)
        }
    );
};
/**
 * 使用服务器表单设置实体名称
 *
 * @param {server.Player} player - 玩家
 *
 * @param {number} legionIndexValue - 阵营索引值
 *
 * @param {number} entityIndexValue - 实体索引值
 */
function writeEntityNameInServerUI(player: server.Player, legionIndexValue: number, entityIndexValue: number) {
    /**
     * 新建一个 Modal 表单窗口
     */
    const window = new serverUI.ModalFormData()
        .slider('可用的实体生成数量', 1, 64, 1, 8)
        .textField('请输入实体名称', '请输入你所期望显示的实体名称')
    // 显示表单窗口
    window.show(player).then(
        response => {
            // 验证表单关闭状态 或 窗口界面数据是否为空
            if (response.canceled || response.formValues === undefined) return;
            /**
             * 获取实体生成数量
             */
            const entityAmountValue = response.formValues[0] as number;
            /**
             * 获取实体名称
             */
            const entityNameValue = response.formValues[1] as string;
            // 设置全局变量
            publicEntityAmountValue = entityAmountValue;
            publicEntityIndexValue = entityIndexValue;
            publicLegionIndexValue = legionIndexValue;
            publicEntityNameValue = entityNameValue;
        }
    );
    // 关闭持续显示信息
    continuousDisplay = false;
};
/**
 * 设置公共属性的函数，通过模态表单获取玩家输入并更新全局变量。
 *
 * @param {server.Player} player - 表示当前操作的玩家对象，用于显示表单窗口。
 *
 * 此函数会创建一个包含四个文本字段的模态表单：
 * - 实体生成量：表示需要生成的实体数量（十进制整数）
 * - 实体索引值：用于标识实体的唯一索引（十进制整数）
 * - 阵营索引值：用于标识阵营的唯一索引（十进制整数）
 * - 实体名称值：希望为实体设置的名称（字符串）
 *
 * 用户提交后，会对输入进行解析并保存到全局变量中。
 */
function setPublicProperty(player: server.Player) {
    /**
     * 创建模态表单窗口，用于输入与实体和阵营相关的配置信息。
     */
    const window = new serverUI.ModalFormData()
        .textField('实体生成量', '请输入: 10进制 整数', publicEntityAmountValue.toString())
        .textField('实体索引值', '请输入: 10进制 整数', publicEntityIndexValue.toString())
        .textField('阵营索引值', '请输入: 10进制 整数', publicLegionIndexValue.toString())
        .textField('实体名称值', '请输入: 期望显示的名称', publicEntityNameValue);

    // 显示表单窗口给玩家
    window.show(player).then(
        response => {
            // 检查用户是否取消了表单或未提供数据
            if (response.canceled || response.formValues === undefined) return;
            /**
             * 解析表单返回的数据：
             * - 将所有字段转换为数字类型，并确保它们是整数；
             * - 如果解析失败，则使用默认值 1。
             */
            const analysisProperty = response.formValues.map(Number).map(value => isNaN(value) ? 1 : Math.floor(value));
            // 更新全局变量
            publicEntityAmountValue = analysisProperty[0]; // 实体生成量
            publicEntityIndexValue = analysisProperty[1]; // 实体索引值
            publicLegionIndexValue = analysisProperty[2]; // 阵营索引值
            publicEntityNameValue = (response.formValues[3] as string | undefined) || ''; // 实体名称值
        }
    );
    // 开启持续显示模式
    continuousDisplay = true;
};
/**
 * 根据阵营 ID 查找对应的基地实体
 *
 * @param {server.Entity[]} entities 所有实体列表
 *
 * @param {string} legionType 阵营类型（red_legion/blue_legion）
 *
 * @returns {server.Entity | undefined} 基地实体或undefined
 */
function getLegionBase(entities: server.Entity[], legionType: string): server.Entity | undefined {
    return entities.find(entity => entity.typeId.startsWith(`${legionType}:`) && entity.typeId === `${legionType}:legion_base`);
};
/**
 * 当军团基地被攻击时触发的处理函数
 *
 * @param {server.Entity} entity - 被攻击的实体对象
 */
function legionBaseUnderAttack(entity: server.Entity) {
    // 触发器控制
    if (!TriggerControl('军团基地被攻击', entity as any, 40)) return;
    /**
     * 获取维度与坐标
     */
    const { dimension, location } = entity;
    /**
     * 获取上方位置
     */
    const above = Vector.copy(location).above(1);
    // 遍历当前维度中的全部实体
    dimension.getEntities().forEach(
        target => {
            // 判断实体是否正确加载
            if (!target || !target.isValid()) return;
            // 移除掉落物
            if (target.typeId == 'minecraft:item') return target.remove();
            /**
             * 获取实体的家族组件
             */
            const familyComponent = target.getComponent('minecraft:type_family');
            // 判断实体是否存在家族组件
            if (!familyComponent) return;
            // 销毁现存的军团成员
            if ((target.hasTag('red_legion') || target.hasTag('blue_legion')) && target.typeId.split(':')[1] !== 'legion_base') return target.remove();
            // 销毁现存的怪物
            if (familyComponent.hasTypeFamily('monster')) return target.remove();
            /**
             * 获取实体血量组件
             */
            const healthComponent = target.getComponent('health');
            // 重置红色军团血量
            if (familyComponent.hasTypeFamily('redLegionBase') && healthComponent) return healthComponent.setCurrentValue(healthComponent.defaultValue);
            // 重置蓝色军团血量
            if (familyComponent.hasTypeFamily('blueLegionBase') && healthComponent) return healthComponent.setCurrentValue(healthComponent.defaultValue);
        }
    );
    // 基于被摧毁的军团类型播放提示
    switch (entity.typeId) {
        case 'red_legion:legion_base':
            dimension.getPlayers().forEach(player => player.onScreenDisplay.setTitle('<§1§o§l 蓝方军团基地 §r> 获胜!!!'));
            break;

        case 'blue_legion:legion_base':
            dimension.getPlayers().forEach(player => player.onScreenDisplay.setTitle('<§4§o§l 红方军团基地 §r> 获胜!!!'));
            break;
    };
    // 播放音效
    dimension.getPlayers().forEach(player => player.playSound('respawn_anchor.deplete'));
    // 播放粒子
    dimension.spawnParticle('constant:fireworks_fireball_rune_blue', above);
    dimension.spawnParticle('constant:erupt_rune_blue', above);
    dimension.spawnParticle('constant:fireworks_fireball_rune_red', above);
    dimension.spawnParticle('constant:erupt_rune_red', above);
    // 复位标识符
    shouldTheWarBeTerminated = 0;
};