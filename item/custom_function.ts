/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
import * as type from "../data/type";
import * as table from "../data/table";
import prompt from "../data/prompt";
/**
 * * 物品抽取事件
 */
export function extractEvent(player: server.Player, entity?: server.Entity, block?: server.Block, container?: server.Container) {
    /**
     * * 事件
     *
     * @param {server.Container} input 容器
     */
    const Event = (input: server.Container) => {
        /**
         * * 物品组
         */
        const StackGroup: server.ItemStack[] = [];
        //执行 抽取 容器内容 的流程
        if (input && container) {
            /**
             * * 空格数量
             */
            let emptySlots = container.emptySlotsCount - 1;
            //抽取 目标容器内 指定数量 的物品
            for (let α = 0; α < input.size; α++) {
                /**
                 * * 获取 物品
                 */
                const getItem = input.getItem(α);
                // 判断 物品是否存在
                if (emptySlots == 0) continue;
                if (!getItem) continue;
                // 将 物品 加入 物品组
                StackGroup.push(getItem);
                input.setItem(α);
                emptySlots -= 1;
            };
            //向 玩家背包中 填充物品
            for (let α of StackGroup) container.addItem(α);
            //显示 玩家背包 的剩余储存空间
            player.sendMessage(`§7正在远程抽取物品, < 您的背包 >的剩余空间为§r:§2 ${emptySlots}`);
        }
    };
    if (entity) {
        /**
         * * 获取 实体容器
         */
        const getContainer = entity.getComponent('minecraft:inventory')?.container;
        if (getContainer) Event(getContainer);
        else player.sendMessage(`§7无法获取实体:§6<§c ${entity.typeId} §6>§7的容器信息`);
    }
    else if (block) {
        /**
         * * 获取 方块容器
         */
        const getContainer = block.getComponent('minecraft:inventory')?.container;
        if (getContainer) Event(getContainer);
        else {
            /**
             * * 标题
             */
            const title: server.RawMessage = {
                text: "<§8§o§l 物资清除 §r>§9操作界面"
            };
            /**
             * * 选项
             */
            const option: server.RawMessage[] = [
                { text: '§c§l掉落物清理§r' }
            ];
            /**
             * * 用法
             */
            const labelα: server.RawMessage = { text: '物资整理 -> 删除' };
            /**
             * * 选项
             */
            const labelβ: server.RawMessage = {
                text: "§6设置§r<§a 清理范围 §r>"
            };
            new serverUI.ModalFormData()
                .title(title)
                .dropdown(labelα, option, { 'defaultValueIndex': 0 })
                .slider(labelβ, 8, 255, { 'valueStep': 1, 'defaultValue': 64 })
                .show(player).then(
                    option => {
                        if (option.canceled) return;
                        opal.TrySpawnParticle(player.dimension, 'constant:general_tips', opal.Vector.add(player.getHeadLocation(), { x: 0, y: 1.5, z: 0 }));
                        player.runCommand(`kill @e[type=item,r=${(option.formValues as any[])[1]}]`);
                        player.sendMessage("§4掉落物已销毁, 该操作不可撤销!");
                    }
                )
        }
    }
};
/**
 * * 物品注入事件
 */
export function injectEvent(player: server.Player, entity?: server.Entity, block?: server.Block, container?: server.Container) {
    /**
     * * 事件
     *
     * @param {server.Container} input 容器
     */
    const Event = (input: server.Container) => {
        if (!container) return;
        // 移除 当前道具
        container.setItem(player.selectedSlotIndex);
        /**
         * * 物品组
         */
        const StackGroup: server.ItemStack[] = [];
        //执行 向 容器内 注入物品 的流程
        if (!input) return;
        //获取 目标容器 剩余存储空间
        let emptySlots = input.emptySlotsCount;
        //抽取 玩家背包内 指定数量 的物品
        for (let α = 0; α < container.size; α++) {
            /**
             * * 获取 物品
             */
            const getItem = container.getItem(α);
            // 判断 物品是否存在
            if (emptySlots == 0) break;
            if (!getItem) continue;
            // 将 物品 加入 物品组
            StackGroup.push(getItem);
            container.setItem(α);
            emptySlots -= 1;
        }
        //向 容器内 填充物品
        for (let α of StackGroup) input.addItem(α);
        //显示 目标容器 的剩余储存空间
        player.sendMessage(`§7正在远程注入物品, < 目标容器 >的剩余空间为§r:§2 ${emptySlots}`);
    };
    if (entity) {
        /**
         * * 获取 实体容器
         */
        const getContainer = entity.getComponent('minecraft:inventory')?.container;
        if (getContainer) Event(getContainer);
        else player.sendMessage(`§7无法获取实体:§6<§c ${entity.typeId} §6>§7的容器信息`);
    }
    else if (block) {
        /**
         * * 获取 方块容器
         */
        const getContainer = block.getComponent('minecraft:inventory')?.container;
        if (getContainer) Event(getContainer);
        else player.sendMessage(`§7无法获取方块:§6<§c ${block.typeId} §6>§7的容器信息`);
    }
};
/**
 * * 容器整理
 */
export function containerSorting(player: server.Player, block?: server.Block) {
    /**
     * * 获取 方块容器
     */
    const container = block?.getComponent('minecraft:inventory')?.container;
    /**
     * * 物品组
     */
    const items: server.ItemStack[] = [];
    // 遍历 方块容器
    if (!container) return;
    // 遍历 方块容器
    for (let index = 0; index < container.size; index++) {
        /**
         * * 获取 物品
         */
        const item = container.getItem(index);
        if (!item) continue;
        container.setItem(index);
        items.push(item);
    };
    // 重新 放入 方块容器
    for (let item of opal.OrganizeItemStacks(items)) container.addItem(item);
    // 播放音效
    player.playSound("armor.equip_diamond");
};
/**
 * * 用于显示各种传送模式的基础窗口
 */
export function basePresets() {
    /**
     * * 定义了 窗口界面 的 标题
     */
    const title: server.RawMessage = {
        text: "§9《§5 空间宝典 §9》§r"
    };
    /**
     * * 定义了 窗口界面 的 选项
     */
    const option: server.RawMessage[] = [
        { text: '<§4§o§l 相对传送 §r>' },
        { text: '<§5§o§l 随机传送 §r>' },
        { text: '<§9§o§l 诸界道标 §r>' }
    ];
    /**
     * * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData()
        .title(title)
        .button(option[0], "textures/物品贴图/魔法书籍/空间宝典")
        .button(option[1], "textures/物品贴图/魔法书籍/魔导手册")
        .button(option[2], "textures/物品贴图/魔法书籍/空间宝典")
    //输出 表单对象
    return display
};
/**
 * * 用于显示[ 相对坐标 ]< 传送机制 >的设置窗口
 */
export function relativePresets() {
    /**
     * * 定义了 窗口界面 的 标题
     */
    const title: server.RawMessage = {
        text: "§9《§5 空间宝典 §9》§r"
    };
    /**
     * * 定义了 窗口界面 的 滑动条标题
     */
    const option: server.RawMessage[] = [
        { text: '§3相对§a X轴坐标§r' },
        { text: '§3相对§a Y轴坐标§r' },
        { text: '§3相对§a Z轴坐标§r' }
    ];
    /**
     * * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ModalFormData()
        .title(title)
        .slider(option[0], -64, 64, { 'valueStep': 1, 'defaultValue': 0 })
        .slider(option[1], -64, 64, { 'valueStep': 1, 'defaultValue': 0 })
        .slider(option[2], -64, 64, { 'valueStep': 1, 'defaultValue': 0 })
    //输出 表单对象
    return display
};
/**
 * * 用于显示[ 随机坐标 ]< 传送机制 >的设置窗口
 */
export function randomPresets() {
    /** 定义了 窗口界面 的 标题 */
    const title: server.RawMessage = {
        text: "§9《§5 空间宝典 §9》§r"
    };
    /** 定义了 窗口界面 的 滑动条标题 */
    const option: server.RawMessage[] = [
        { text: '§3偏移§a X轴基准§r' },
        { text: '§3偏移§a Y轴基准§r' },
        { text: '§3偏移§a Z轴基准§r' },
        { text: '§3设置§a 极限范围§r' }
    ];
    /** 定义了 窗口界面 的 表单对象 */
    const display = new serverUI.ModalFormData()
        .title(title)
        .slider(option[0], -16, 16, { 'valueStep': 1, 'defaultValue': 0 })
        .slider(option[1], -16, 16, { 'valueStep': 1, 'defaultValue': 0 })
        .slider(option[2], -16, 16, { 'valueStep': 1, 'defaultValue': 0 })
        .slider(option[3], 16, 255, { 'valueStep': 1, 'defaultValue': 16 })
    //输出 表单对象
    return display
};
/**
 * * 用于显示[ 诸界道标 ]< 传送机制 >的设置窗口
 */
export function signPresets(input: Map<string, type.LOCATION_AND_DIMENSION>) {
    /**
     * * 获取 道标名称
     */
    const name = Array.from(input.keys()).map(id => `§n§o§l§${Math.floor(Math.random() * 6)}` + id.split(':')[1]);
    /** 定义了 窗口界面 的 标题 */
    const title: server.RawMessage = {
        text: "§9《§5 空间宝典 §9》§r"
    };
    /** 定义了 窗口界面 的 选项 */
    const option: server.RawMessage[] = [
        { text: '<§2§o§l 创建道标 §r>' },
        { text: '<§5§o§l 道标传送 §r>' },
        { text: '<§4§o§l 移除道标 §r>' }
    ];
    /** 定义了 窗口界面 的 输入栏提示 */
    const text: server.RawMessage[] = [
        { text: '<§2§o§l 识别标签 §r> -> §9重命名' },
        { text: '§c请输入 诸界道标 识别标签§r' },
        { text: '§c是否启用<§2§o§l 雾海裂隙 §r>§r' }
    ];
    /** 定义了 窗口界面 的 表单对象 */
    const display = new serverUI.ModalFormData()
        .title(title)
        .dropdown('', name.length !== 0 ? name : ["§4暂无 §9道标信息§r"], { 'defaultValueIndex': (name.length > 1 ? name.length - 1 : 0) })
        .dropdown('', option, { 'defaultValueIndex': (name.length !== 0 ? 1 : 0) })
        .textField(text[0], text[1], { 'defaultValue': opal.BriefID() })
        .toggle(text[2], { 'defaultValue': false })
    //输出 表单对象
    return display
};
/**
 * * 执行 相对传送
 */
export function renRelative(player: server.Player, option: serverUI.ModalFormResponse) {
    //检测玩家是否退出窗口
    if (option.canceled) return;
    /**
     * * 获取 目标位置
     */
    const location = opal.Vector.add(player.location,
        {
            x: parseInt((option.formValues as any[])[0]),
            y: parseInt((option.formValues as any[])[1]),
            z: parseInt((option.formValues as any[])[2]),
        }
    );
    // 传送玩家
    player.teleport(location);
    // 播放音效
    server.system.runTimeout(() => player.playSound("mob.endermen.portal"), 2);
};
/**
 * * 执行 随机传送
 */
export function renRandom(player: server.Player, option: serverUI.ModalFormResponse) {
    //检测玩家是否退出窗口
    if (option.canceled) return
    /**
     * * 获取 目标位置
     */
    const location = opal.Vector.add(player.location,
        {
            x: parseInt((option.formValues as any[])[0]),
            y: parseInt((option.formValues as any[])[1]),
            z: parseInt((option.formValues as any[])[2]),
        }
    );
    /**
     * * 获取锚点位置
     */
    const anchor = opal.QueryFoothold({ location: location, dimension: player.dimension }, parseInt((option.formValues as any[])[3]), -60, 300);
    // 传送玩家
    player.teleport(anchor);
    // 播放音效
    server.system.runTimeout(() => player.playSound("mob.endermen.portal"), 5);
};
/**
 * * 执行 道标传送
 */
export function renRoadSign(player: server.Player, option: serverUI.ModalFormResponse, input: Map<string, type.LOCATION_AND_DIMENSION>) {
    //检测玩家是否退出窗口
    if (!option.formValues) return
    /**
     * * 获取 道标参数
     */
    const value = Array.from(input.values());
    /**
     * * 获取 道标名称
     */
    const name = Array.from(input.keys());
    /**
     * * 指向 玩家 开始传送的 位置
     */
    const pointLocation = player.location;
    /**
     * * 指向 玩家 开始传送的 维度
     */
    const pointDimension = player.dimension;
    /**
     * * 获取 玩家的 输入信息
     */
    const forms: any[] = option.formValues;
    /**
     * * 获取 玩家自身 的 锚点信息
     */
    const selfAnchor = JSON.stringify({ location: player.location, dimension: player.dimension.id });
    // 根据 选项 进行 不同 处理
    switch (forms[1]) {
        //新增 道标信息
        case 0: player.setDynamicProperty('road_sign:' + forms[2], selfAnchor); break;

        //使用 道标信息
        case 1:
            // 判断是否开启 雾海裂隙
            if (forms[3]) server.system.runTimeout(() => mistySeaFissure(player, pointLocation, pointDimension), 5)
            // 传送玩家
            player.teleport(value[forms[0]].location, { dimension: value[forms[0]].dimension });
            // 播放音效
            server.system.runTimeout(() => player.playSound("mob.endermen.portal"), 5);
            break;

        //移除 道标信息
        case 2: player.setDynamicProperty(name[forms[0]]); break;
    };
};
/**
 * * 执行 雾海裂隙
 */
function mistySeaFissure(player: server.Player, location: server.Vector3, dimension: server.Dimension) {
    /**
     * * 获取 玩家自身 的 锚点信息
     */
    const origin = opal.Vector.add(player.location, opal.Vector.CONSTANT_UP);
    // 创建 雾海裂隙
    server.system.runTimeout(
        () => {
            opal.MistySeaFissure.BriefCreate('诸界道标所创建的一次性雾海裂隙效果',
                {
                    locations: [
                        origin,
                        location
                    ],
                    dimensions: [
                        player.dimension,
                        dimension
                    ]
                }
            );
            player.playSound("ambient.weather.thunder", { location: player.location, volume: 10 });
            opal.TrySpawnParticle(player.dimension, 'constant:fireworks_fireball_amber_color', origin);
            opal.TrySpawnParticle(player.dimension, 'constant:smoke_rune_white', origin);
        },
        100
    )
};
/**
 * 源能秘典的表单逻辑
 *
 * 展示源能秘典的目录页和详情页
 *
 * @param {server.Player} player - 玩家对象
 */
export function sourceEnergy(player: server.Player) {
    /**
     * 获取所有引导文本的标题
     *
     * @type {string[]}
     */
    const keys: string[] = Array.from(prompt.keys());
    /**
     * 获取所有引导文本的内容
     *
     * @type {server.RawMessage[][]}
     */
    const value: server.RawMessage[][] = Array.from(prompt.values()).map(item => item.map(info => info.refer));
    /**
     * 定义了 窗口界面 的 标题
     *
     * @type {server.RawMessage}
     */
    const title: server.RawMessage = {
        text: "§9《§5 源能秘典 §9》§r"
    };
    /**
     * 创建源能秘典的目录页表单
     *
     * @type {serverUI.ActionFormData}
     */
    const display: serverUI.ActionFormData = new serverUI.ActionFormData().title(title);
    /**
     * 遍历 引导文本 并 加入 按钮
     *
     * 为目录页表单添加按钮, 每个按钮对应一个引导文本的标题
     */
    keys.forEach(key => display.button('§l§u' + key, "textures/物品贴图/魔法书籍/源能秘典"));
    /**
     * 展示源能秘典的目录页表单
     *
     * @param {server.Player} player - 玩家对象
     */
    display.show(player).then(
        option => {
            /**
             * 判断玩家是否取消操作或选择无效
             *
             * 如果玩家取消操作或选择无效, 则直接返回
             */
            if (option.canceled || option.selection == undefined) return;
            /**
             * 创建源能秘典的详情页表单
             *
             * @type {serverUI.ActionFormData}
             */
            const action: serverUI.ActionFormData = new serverUI.ActionFormData().title('§l§u§o' + keys[option.selection]).body({ rawtext: value[option.selection] });
            /**
             * 为详情页表单添加关闭和返回按钮
             */
            action.button('§4§l关闭§r').button('§u§l返回§r');
            /**
             * 展示源能秘典的详情页表单, 并处理玩家的按钮选择
             */
            action.show(player).then(
                option => {
                    /**
                     * 如果玩家取消操作或选择无效, 则直接返回
                     */
                    if (option.canceled || option.selection == undefined) return;
                    /**
                     * 如果玩家点击返回按钮, 则重新展示目录页表单
                     */
                    option.selection == 1 ? sourceEnergy(player) : void 0;
                    /**
                     * 播放翻书音效, 提示玩家操作成功
                     */
                    player.playSound('item.book.page_turn');
                }
            );
        }
    );
};
/**
 * * 定义 魔导手册 功能
 */
export function magicHandbook(player: server.Player, item: server.ItemStack, block?: server.Block) {
    /**
     * * 根据玩家所持物品或目标方块的类型, 查询并创建情报接口
     */
    const intel = opal.lexiconInterface(player, block?.typeId ?? item.typeId);
    // 使用后, 物品进入冷却状态, 模拟翻书页的音效
    item.getComponent('minecraft:cooldown')?.startCooldown(player);
    player.playSound('item.book.page_turn');
    // 打开情报窗口, 展示查询到的信息
    opal.windowedRetriever(player, intel);
};
/**
 * * 锚点绑定
 */
export function bindingAnchor(player: server.Player) {
    /**
     * * 设定查询参数
     */
    const options: server.EntityQueryOptions = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
        excludeFamilies: ["monster", "player"]
    };
    /**
     * * 获取 实体 的 距离信息
     */
    const Distance = (entity: server.Entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
    /**
     * * 获取 实体数组
     */
    const entitys = opal.EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => !entity.getDynamicProperty('entity:false_anchor_point') && entity.getComponent('minecraft:is_tamed'));
    /**
     * * 定义了 窗口界面 的 标题
     */
    const title: server.RawMessage = {
        text: "§9§l<§u 锚点绑定 §9>§r§3操作界面"
    };
    /**
     * * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData().title(title);
    // 遍历 实体数组 并 加入 按钮
    entitys.forEach(entity => display.button(opal.DistanceAndName(entity, Distance(entity)), "textures/物品贴图/特殊道具/锚点虚印"));
    if (entitys.length < 1) display.button('§4§l周围不存在 §c<§9 可以§6<§u 锚点绑定 §6>§9的实体 §c>§r', "textures/物品贴图/特殊道具/锚点虚印");
    // 播放 音效
    player.playSound('item.book.page_turn');
    // 显示 窗口界面
    display.show(player).then(
        option => {
            if (option.selection == undefined || entitys.length === 0) return;
            /**
             * * 获取 目标 实体
             */
            const target = entitys[option.selection];
            // 播放 音效
            player.playSound('random.levelup');
            // 设定 锚点绑定
            target.setDynamicProperty('entity:false_anchor_point', player.id);
            player.sendMessage([{ text: '正在执行§9§l<§u 锚点绑定 §9>§r: ' }, opal.translate(target)]);
        }
    )
};
/**
 * * 锚点召集
 */
export function musterAnchor(player: server.Player) {
    /**
     * * 设定查询参数
     */
    const options: server.EntityQueryOptions = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
        excludeFamilies: ["monster", "player"]
    };
    /**
     * * 获取 实体 的 距离信息
     */
    const Distance = (entity: server.Entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
    /**
     * * 获取 实体数组
     */
    const queue = opal.EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => entity.getDynamicProperty('entity:false_anchor_point') == player.id);
    /**
     * * 定义了 窗口界面 的 标题
     */
    const title: server.RawMessage = {
        text: "§9§l<§u 锚点召集 §9>§r§3操作界面"
    };
    /**
     * * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData().title(title).button('§l< 召集全部 >', "textures/物品贴图/特殊道具/锚点虚印");
    // 遍历 实体数组 并 加入 按钮
    queue.forEach(entity => display.button(opal.DistanceAndName(entity, Distance(entity)), "textures/物品贴图/特殊道具/锚点虚印"));
    if (queue.length < 1) display.button('§4§l周围不存在 §c<§9 完成§6<§u 锚点召集 §6>§9的实体 §c>§r', "textures/物品贴图/特殊道具/锚点虚印");
    // 显示 窗口界面
    display.show(player).then(
        option => {
            // 检测 是否满足 运行条件
            if (option.selection == undefined || queue.length === 0) return;
            // 运行 锚点召集
            if (option.selection == 0) {
                // 将列表内的全部目标召集到玩家身边的随机位置
                queue.forEach(entity => entity.teleport(opal.Vector.randomTopmostBlock(player)));
                // 显示提示信息
                player.sendMessage({ text: '正在执行§9§l<§u 锚点召集 §9>§r' });
            }
            else {
                /**
                 * * 获取 目标 实体
                 */
                const target = queue[option.selection - 1];
                // 设定 锚点召集
                target.teleport(player.location);
                player.sendMessage([{ text: '正在执行§9§l<§u 锚点召集 §9>§r: ' }, opal.translate(target)]);
            };
            // 播放 音效
            player.playSound('random.levelup');
        }
    )
};
/**
 * * 锚点移除
 */
export function deleteAnchor(player: server.Player) {
    /**
     * * 设定查询参数
     */
    const options: server.EntityQueryOptions = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
        excludeFamilies: ["monster", "player"]
    };
    /**
     * * 获取 实体 的 距离信息
     */
    const Distance = (entity: server.Entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
    /**
     * * 获取 实体数组
     */
    const queue = opal.EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => entity.getDynamicProperty('entity:false_anchor_point') == player.id);
    /**
     * * 定义了 窗口界面 的 标题
     */
    const title: server.RawMessage = {
        text: "§9§l<§u 锚点移除 §9>§r§3操作界面"
    };
    /**
     * * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData().title(title);
    // 遍历 实体数组 并 加入 按钮
    queue.forEach(entity => display.button(opal.DistanceAndName(entity, Distance(entity)), "textures/物品贴图/特殊道具/锚点虚印"));
    if (queue.length < 1) display.button('§4§l周围不存在 §c<§9 可以§6<§u 锚点移除 §6>§9的实体 §c>§r', "textures/物品贴图/特殊道具/锚点虚印");
    // 显示 窗口界面
    display.show(player).then(
        option => {
            // 检测 是否满足 运行条件
            if (option.selection == undefined || queue.length === 0) return;
            /**
             * * 获取 目标 实体
             */
            const target = queue[option.selection];
            // 播放 音效
            player.playSound('random.levelup');
            // 设定 锚点移除
            target.setDynamicProperty('entity:false_anchor_point');
            player.sendMessage([{ text: '正在执行§9§l<§u 锚点移除 §9>§r: ' }, opal.translate(target)]);
        }
    )
};
/**
 * * 锚点传送
 */
export function arrivalAnchor(player: server.Player) {
    /**
     * * 设定查询参数
     */
    const options: server.EntityQueryOptions = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
        excludeFamilies: ["monster", "player"]
    };
    /**
     * * 获取 实体 的 距离信息
     */
    const Distance = (entity: server.Entity) => Math.floor(opal.Vector.distance(player.location, entity.location));
    /**
     * * 获取 实体数组
     */
    const queue = opal.EntitysSort(player.dimension, options, (a, b) => Distance(a) - Distance(b), entity => entity.getDynamicProperty('entity:false_anchor_point') == player.id);
    /**
     * * 定义了 窗口界面 的 标题
     */
    const title: server.RawMessage = {
        text: "§9§l<§u 锚点召集 §9>§r§3操作界面"
    };
    /**
     * * 定义了 窗口界面 的 表单对象
     */
    const display = new serverUI.ActionFormData().title(title).button('§l< 随机传送 >', "textures/物品贴图/特殊道具/锚点虚印");
    // 遍历 实体数组 并 加入 按钮
    queue.forEach(entity => display.button(opal.DistanceAndName(entity, Distance(entity)), "textures/物品贴图/特殊道具/锚点虚印"));
    if (queue.length < 1) display.button('§4§l周围不存在 §c<§9 完成§6<§u 锚点召集 §6>§9的实体 §c>§r', "textures/物品贴图/特殊道具/锚点虚印");
    // 显示 窗口界面
    display.show(player).then(
        option => {
            // 检测 是否满足 运行条件
            if (option.selection == undefined || queue.length === 0) return;
            // 运行 锚点召集
            if (option.selection == 0) {
                /**
                 * * 获取 目标 实体
                 */
                const target = queue[opal.RandomFloor(1, queue.length - 1)];
                // 设定 锚点传送
                player.teleport(target.location);
                player.sendMessage([{ text: '正在执行§9§l<§u 锚点传送 §9>§r: ' }, opal.translate(target)]);
            }
            else {
                /**
                 * * 获取 目标 实体
                 */
                const target = queue[option.selection - 1];
                // 设定 锚点传送
                player.teleport(target.location);
                player.sendMessage([{ text: '正在执行§9§l<§u 锚点传送 §9>§r: ' }, opal.translate(target)]);
            };
            // 播放 音效
            player.playSound('random.levelup');
        }
    )
};
/**
 * * 方块获取
 */
export function obtainBlock(player: server.Player, container: server.Container, block?: server.Block) {
    /**
     * * 方块的物品对象
     */
    const protoItem = block?.getItemStack(1, true);
    // 给与玩家对应 的 方块物品对象
    if (!block || !protoItem) return;
    /**
     * * 方块的附加信息
     */
    const message: server.RawMessage = { rawtext: [{ text: '获取到: ' }, opal.translate(block)] };
    // 在背包中添加方块物品
    container.addItem(protoItem);
    // 输出 消息
    player.sendMessage(message);
};
/**
 * * 获取 伤害提升
 */
export function increaseDamage(player: server.Player, container: server.Container, single: boolean = true) {
    // 遍历 背包容器
    for (let index = 0; index < container.size; index++) {
        /**
         * * 获取 物品对象
         */
        const item = container.getItem(index);
        // 排除无效的物品对象
        if (!item || !item.hasTag('tags:energy_crystal.series')) continue;
        /**
         * * 获取 物品对象标识
         */
        const typeID = item.typeId.split(/:/)[1];
        // 排除 无法进行强化的 魔晶石
        if (typeID == 'eternal_energy') continue;
        if (single) only(item)
        else all(item);
        break;
    };
    function only(item: server.ItemStack) {
        /**
         * * 进行消耗的样本物品
         */
        const sample = new server.ItemStack(item.typeId);
        /**
         * * 获取 玩家属性面板
         */
        const stages = opal.GetProperty(player);
        /**
         * * 计算 魔晶武器 攻击提升
         */
        const raise_basic_attack = stages.raise_basic_attack + (stages.basic_attack) * 2;
        // 设置 玩家属性面板
        opal.AlterProperty(player, { raise_basic_attack });
        // 消耗 物品对象
        opal.DeleteItemStack(container, sample);
    };
    function all(item: server.ItemStack) {
        /**
         * * 进行消耗的样本物品
         */
        const sample = new server.ItemStack(item.typeId, item.amount);
        /**
         * * 获取 玩家属性面板
         */
        const stages = opal.GetProperty(player);
        /**
         * * 计算 魔晶武器 攻击提升
         */
        const raise_basic_attack = ((stages.raise_basic_attack + (stages.basic_attack) * 2) * item.amount) + 3;
        // 设置 玩家属性面板
        opal.AlterProperty(player, { raise_basic_attack });
        // 消耗 物品对象
        opal.DeleteItemStack(container, sample);
    }
};
/**
 * * 魔晶弹弓 - 弹道运行
 */
function bowTick(args: type.ROUTE_ANNEX_ARGS): boolean {
    /**
     * * 获取 方块对象
     */
    const block = args.dimension.getBlock(args.location);
    if (!block || !block.isValid) return false;
    if (block && block.isAir) return true;
    return false;
};
/**
 * * 魔晶弹弓 - 弹道终止
 */
function bowStop(args: type.ROUTE_ANNEX_ARGS) {
    /**
     * * 获取 方块对象
     */
    const block = args.dimension.getBlock(args.location);
    // 确认 目标方块是否存在
    if (!block || !block.isValid) return;
    /**
     * * 目标方块周围的方块队列
     */
    const blocks: server.Block[] = [];
    //获取 目标附近 的 全部方块
    for (let axleX = -1; axleX < 2; axleX++) for (let axleY = -1; axleY < 2; axleY++) for (let axleZ = -1; axleZ < 2; axleZ++) {
        /**
         * * 获取 方块对象
         */
        const sample = block.offset({ x: axleX, y: axleY, z: axleZ });
        //写入方块信息
        if (sample) blocks.push(sample);
    };
    //遍历方块队列 并点亮方块
    for (let index = 0; index < blocks.length; index++) {
        if (!blocks[index].isAir || blocks[index].below()?.isAir || blocks[index].below()?.isLiquid) continue;
        blocks[index].setPermutation(server.BlockPermutation.resolve('minecraft:soul_torch'));
        break;
    };
};
/**
 * * 魔晶弹弓 - 潜行时
 */
export function bowSneaking(object: server.Player) {
    // 创建 路径包
    opal.PathExecute.Create('魔晶弹弓-照明射线', 1,
        {
            particles: ['constant:track_color_yellow'],
            dimension: object.dimension,
            locations: [],
            on_move: bowTick,
            on_done: bowStop,
            cooldown: 1,
            speed: 1,
            shoot: {
                start_place: object.getHeadLocation(),
                toward: object.getViewDirection(),
                max_distance: 128
            }
        }
    )
};
/**
 * * 魔晶弹弓 - 命中后
 */
export function bowHitAfter(object: server.Player, target?: server.Entity) {
    /**
     * * 获取 玩家的 状态属性
     */
    const data = opal.GetProperty(object);
    /**
     * * 定义 粒子参数
     */
    const molang = new server.MolangVariableMap();
    if (!target) return;
    // 设置 粒子参数
    molang.setColorRGB('variable.color', table.getRuneColor(data.self_rune));
    molang.setVector3('variable.direction', opal.Vector.CONSTANT_DOWN);
    molang.setFloat('variable.range', 5);
    molang.setFloat('variable.type', 0);
    // 播放 粒子效果
    object.spawnParticle('scripts:path_spurt', opal.Vector.add(target.location, { x: 0, y: 5, z: 0 }), molang);
    /**
     * * 是否暴击
     */
    const erupt = opal.IsErupt(object);
    // 触发 魔晶弹弓 追击伤害
    opal.ElementalAttack(object, target, erupt);
};
/**
 * 判断是否满足连锁挖掘条件
 */
export function canTriggerChainMining(player: server.Player, itemStack: server.ItemStack | undefined, type: string | undefined): boolean {
    // 判断标识符与触发器是否允许触发
    if (!type || !opal.TriggerControl('区块连锁', player, 20)) return false;
    // 匹配玩家状态与玩家设置是否匹配1
    switch (type) {
        case '潜行': return player.isSneaking;

        case '始终': return true;

        default: return false;
    }
}
/**
 * 检查耐久度是否足够
 */
export function checkDurability(durability: server.ItemDurabilityComponent, waste: number, player: server.Player, itemStack: server.ItemStack): boolean {
    /**
     * 耐久度差值
     */
    const surplus = durability.maxDurability - durability.damage;
    // 判断 耐久度是否足够
    if (waste >= surplus) {
        player.sendMessage([opal.translate(itemStack), { text: ' -> 耐久度不足, 无法连锁' }]);
        return false;
    }
    return true;
}
/**
 * 添加挖掘疲劳和饥饿效果
 */
export function applyMiningEffects(player: server.Player): void {
    player.addEffect('minecraft:mining_fatigue', 200, { amplifier: 29, showParticles: false });
    player.addEffect('minecraft:hunger', 200, { amplifier: 29, showParticles: false });
}
/**
 * 执行区块连锁挖掘路径, 清除指定范围内的同类方块并收集掉落物。
 *
 * @param dimension - 玩家当前所处的维度（如主世界、下界等）
 * @param blockID - 被挖掘的方块类型标识符（如 "minecraft:stone"）
 * @param location - 挖掘操作的中心位置坐标
 * @param range - 连锁挖掘的横向范围（x/z轴方向上的半径）
 * @param depth - 连锁挖掘的向下深度（y轴负方向）
 * @param height - 连锁挖掘的向上高度（y轴正方向）
 * @param player - 触发挖掘操作的玩家对象
 */
export function executeMiningPath(dimension: server.Dimension, blockID: string, location: server.Vector3, range: number, depth: number, height: number, player: server.Player): void {
    /**
     * moveEvent 是路径执行过程中的每一步回调函数。
     * 它会在路径遍历到每一个坐标点时被调用。
     *
     * @param args - 路径执行时的参数对象, 包含当前处理的位置和维度信息
     *
     * @returns 返回 true 表示继续执行路径, false 会中断路径
     */
    const moveEvent = (args: type.ROUTE_ANNEX_ARGS) => {
        /**
         * 当前路径点对应的方块对象
         *
         * 如果该方块存在且与目标方块类型一致, 则进行挖掘处理。
         */
        const getBlock = args.dimension.getBlock(args.location);
        // 检测方块标识符是否正确
        if (getBlock?.typeId === blockID) {
            /**
             * 使用 fill 命令将该方块替换为空气, 并触发破坏效果。
             * 这会移除方块并生成掉落物。
             */
            args.dimension.runCommand(`fill ${args.location.x} ${args.location.y} ${args.location.z} ${args.location.x} ${args.location.y} ${args.location.z} air [] destroy`);
            /**
             * 用于查询掉落物品实体的选项。
             *
             * 它定义了在当前挖掘点附近搜索掉落物的范围。
             */
            const itemOptions: server.EntityQueryOptions = { location: args.location, type: "minecraft:item", maxDistance: 4 };
            /**
             * 用于查询经验球实体的选项。
             *
             * 它定义了在当前挖掘点附近搜索经验球的范围。
             */
            const expOptions: server.EntityQueryOptions = { location: args.location, type: "minecraft:xp_orb", maxDistance: 4 };
            /**
             * 从当前挖掘点周围获取的所有掉落物和经验球实体。
             * 它们将被传送到玩家头部位置。
             */
            const select = [...args.dimension.getEntities(itemOptions), ...args.dimension.getEntities(expOptions)];
            // 将掉落物和经验球传送到玩家头部位置
            select.forEach(entity => entity.teleport(player.getHeadLocation(), { dimension: player.dimension }));
        }
        // 继续执行路径
        return true;
    };
    /**
     * 立方体路径的起始坐标。
     * 它由中心点加上范围、深度构成, 表示路径扫描区域的一个顶点。
     */
    const start = opal.Vector.add(location, { x: range, y: depth, z: range });
    /**
     * 立方体路径的结束坐标。
     * 它由中心点减去范围、加上高度构成, 表示路径扫描区域的另一个顶点。
     */
    const done = opal.Vector.add(location, { x: -range, y: height, z: -range });
    /**
     * 创建一个立方体路径扫描计划。
     * 它会在指定范围内逐步扫描每个坐标点, 并调用 moveEvent 处理逻辑。
     */
    opal.PathExecute.CreateForCube(
        '区块连锁-路径执行',
        {
            /**
             * 路径扫描过程中显示的粒子特效名称数组。
             */
            particles: ['constant:track_color_yellow'],
            /**
             * 额外指定的路径点列表（这里为空, 使用 start 和 done 自动生成）。
             */
            locations: [],
            /**
             * 路径执行所在的维度。
             */
            dimension,
            /**
             * 路径每步之间的冷却时间（单位：tick）。
             */
            cooldown: 1,
            /**
             * 路径执行的速度控制（单位：tick/step）。
             */
            speed: 1,
            /**
             * 路径点相对于方块坐标的偏移量。
             */
            offset: opal.Vector.CONSTANT_HALF,
            /**
             * 每次路径移动到一个新坐标点时执行的回调函数。
             */
            on_move: moveEvent,
        },
        start,
        done,
        0.25
    );
};
/**
 * * 魔晶盾牌
 */
export function useMagicCrystalShield(player: server.Player, item: server.ItemStack) {
    // 播放 动画
    player.playAnimation('animation.item.shield.resist', { blendOutTime: 0.5 });
    // 播放 声音
    player.playSound('item.shield.block');
    // 检测 是否完成冷却
    if (!opal.TriggerControl('魔晶盾牌:伤害反射', player, 60)) return;
    if (!player.isSneaking) return;
    // 更新 物品冷却
    item.getComponent('minecraft:cooldown')?.startCooldown(player);
    // 弹反伤害
    shieldReflexDamage(player, item);
};
/**
 * * 魔晶盾牌 - 伤害弹反
 */
function shieldReflexDamage(player: server.Player, item: server.ItemStack) {
    /**
     * * 过滤条条件
     */
    const options: server.EntityQueryOptions = {
        excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
        location: player.location,
        maxDistance: 4
    };
    /**
     * * 获取 玩家的属性面板
     */
    const getData = opal.GetProperty(player);
    // 造成 弹反伤害
    player.dimension.getEntities(options).filter(entity => entity.id !== player.id).forEach(entity => opal.ElementalAttack(player, entity, true, getData));
    // 生成 粒子效果
    if (getData.self_rune !== type.RUNE_ENUM.void) opal.TrySpawnParticle(player.dimension, `constant:impact_${getData.self_rune}`, player.location);
    if (getData.self_rune === type.RUNE_ENUM.void) opal.TrySpawnParticle(player.dimension, 'minecraft:sonic_explosion', player.location);
    // 更新 物品冷却
    item.getComponent('minecraft:cooldown')?.startCooldown(player);
};
/**
 * * 魔晶锤子
 */
export function magicCrystalHammer(player: server.Player, item: server.ItemStack, container: server.Container, block?: server.Block) {
    /**
     * * 获取 金属锭 所处的 方块对象
     */
    const pointer = block?.above();
    // 确认 目标方块是否存在
    if (!pointer) return;
    /**
     * * 获取 金属锭 物品对象
     */
    const material = pointer.dimension.getEntitiesAtBlockLocation(pointer.location);
    // 遍历 金属锭 物品对象
    for (let index = 0; index < material.length; index++) {
        /**
         * * 获取 金属锭 物品对象
         */
        const item = material[index].getComponent('item')?.itemStack;
        // 如果物品不存在 或 数量不足
        if (!item || item?.amount < 2) continue;
        /**
         * * 获取 锻压类型 标签
         */
        const tags = item?.getTags().filter(tag => tag.startsWith('tags:mineral_resources.make'));
        // 如果 锻压类型 标签不存在
        if (tags.length == 0) continue;
        /**
         * * 获取 锻压类型
         */
        const type = tags[0].split('.')[2];
        /**
         * * 获取 物品锻压阶段
         */
        const stage = item.typeId.split(':')[1].split('.').length;
        /**
         * * 获取 物品名称
         */
        const name = stage == 1 ? item.typeId.split(':')[1] : item.typeId.split(':')[1].split('.')[1];
        // 删除 金属锭 物品对象
        material[index].remove();
        // 消耗 物品数量
        if (item.amount > 2) {
            item.amount -= 2;
            const newMaterial = opal.TrySpawnItem(pointer.dimension, item, pointer.center());
            if (newMaterial instanceof server.Entity) server.system.run(() => newMaterial.teleport(pointer.center()));
        };
        // 生成 金属板 物品对象
        const mineral = opal.TrySpawnItem(pointer.dimension, new server.ItemStack('starry_map:' + type + '.' + name), pointer.center());
        // 移动 金属板 物品对象
        if (mineral instanceof server.Entity) server.system.run(() => mineral.teleport(pointer.center()));
        // 播放 声音
        player.playSound('random.anvil_use');
        // 结束循环
        break;
    };
    // 更新 物品冷却
    item.getComponent('minecraft:cooldown')?.startCooldown(player);
    // 更新 物品耐久
    opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
};
/**
 * * 魔晶钥匙
 */
export async function magicCrystalKey(player: server.Player, item: server.ItemStack, container: server.Container, block?: server.Block) {
    /**
     * * 方块白名单
     */
    const whiteList = new Set<string>(['minecraft:trial_spawner', 'minecraft:mob_spawner', 'minecraft:vault']);
    /**
     * * 获取 容器对象
     */
    const inventory = block?.getComponent('inventory')?.container;
    /**
     * 容器中的物品名称
     */
    const itemName: string[] = [];
    // 确认 目标方块是否存在 且 是否为容器或白名单
    if (!block || !inventory && !whiteList.has(block?.typeId)) return;
    /**
     * * 获取 容器的物品对象
     */
    const chest = block.getItemStack(1, true);
    /**
     * * 拷贝方块中心坐标
     */
    const blockLocation = opal.Vector.copy(block.center());
    // 清空容器内容
    if (inventory) for (let index = 0; index < inventory.size; index++) {
        /**
         * * 获取 容器物品对象
         */
        const item = inventory.getItem(index);
        // 添加 物品名称
        if (itemName.length <= 10 && item) itemName.push(`${item.typeId} -> ${item.amount}`);
        // 清空容器物品对象
        inventory.setItem(index)
    };
    // 移除容器方块
    block.setPermutation(server.BlockPermutation.resolve('minecraft:air'));
    // 等待 1 tick
    await server.system.waitTicks(1);
    // 移除方块销毁后散落的物品掉落物实体
    block.dimension.getEntities({ location: blockLocation, maxDistance: 1, type: 'minecraft:item' }).forEach(entity => entity.remove());
    // 等待 1 tick
    await server.system.waitTicks(1);
    // 生成 容器的物品对象
    if (chest) {
        // 为 容器的物品对象 附加词缀
        chest.setLore([`搬运者: ${player.nameTag}`, ...itemName]);
        // 生成 容器的物品对象
        opal.TrySpawnItem(block.dimension, chest, block.center())
    };
    // 播放音效
    player.playSound('block.barrel.open');
    // 更新 物品冷却
    item.getComponent('minecraft:cooldown')?.startCooldown(player);
    // 更新 物品耐久
    opal.SetDurability(player, item, container, player.selectedSlotIndex, 1);
};
/**
 * * 生成 初始角色
 */
export function initialSummoning(player: server.Player) {
    /**
     * * 定义 队列信息
     */
    const queue = ['starry_map:guide.crystal', 'starry_map:guide.moon_light', 'starry_map:execute.roaring'];
    // 召唤 琉璃 月华 啸天
    server.system.runTimeout(() => appointCallRole(player, queue), 8);
    // 设置 已经 完成初始化生成
    player.setDynamicProperty('entity:house_create_after', true);
    // 显示 引导提示
    opal.PlayPrompt(player, "召唤星辉雅居");
    // 召唤 星辉雅居
    starlightHouse(player);
};
/**
 * * 创建 星辉雅居
 *
 * @param {server.Player} player - 触发事件的玩家
 */
function starlightHouse(player: server.Player) {
    /**
     * * 获取 游戏规则
     */
    const rule = server.world.getDynamicProperty('game_rules:regenerate.starlight_house') ?? true;
    /**
     * * 定义 坐标基准点
     */
    const reference = opal.Vector.add(player.location, { x: -13, y: -15, z: -13 });
    /**
     * * 读取 建筑结构
     */
    const template = server.world.structureManager.get('mystructure:starlight_house');
    // 判断是否生成结构
    if (rule === false) return emergencyPlan(player);
    // 检测 建筑结构
    if (!template) return player.sendMessage([opal.translate(player), { text: ' -> 未能获取到<§l§9 星辉雅居 §r>的结构数据文件' }]);
    // 预填充空间
    opal.TryFillBlocks(player.dimension, reference, opal.Vector.add(reference, { x: 24, y: 24, z: 24 }), 'minecraft:white_stained_glass');
    // 加载 建筑结构
    server.system.runTimeout(() => server.world.structureManager.place(template, player.dimension, reference), 2);
    // 移动 玩家位置
    server.system.runTimeout(() => player.applyKnockback({ x: (Math.random() * 2) - 1, z: (Math.random() * 2) }, -1), 4);
    // 设置 游戏规则
    if (rule == true) server.world.setDynamicProperty('game_rules:regenerate.starlight_house', false);
};
/**
 * * 紧急物资补偿计划
 *
 * @param {server.Player} player - 接收补偿物资的玩家对象
 */
function emergencyPlan(player: server.Player) {
    /**
     * * 补偿物资列表
     */
    const subsidy: server.ItemStack[] = [
        new server.ItemStack('starry_map:magic_crystal_pickaxe'),
        new server.ItemStack('starry_map:magic_crystal_screwdriver'),
        new server.ItemStack('starry_map:magic_crystal_shield'),
        new server.ItemStack('starry_map:magic_crystal_hammer'),
        new server.ItemStack('starry_map:magic_crystal_wrench'),
        new server.ItemStack('starry_map:magic_crystal_key'),
        new server.ItemStack('starry_map:magic_crystal_bow'),
        new server.ItemStack('starry_map:magic_crystal_claw'),
        new server.ItemStack('starry_map:magic_handbook'),
        new server.ItemStack('starry_map:faerie_healing'),
        new server.ItemStack('starry_map:exhausted_armor'),
        new server.ItemStack('minecraft:barrel')
    ];
    // 生成 补偿物资
    subsidy.forEach(item => opal.TrySpawnItem(player.dimension, item, player.location));
};
/**
 * * 随机角色召唤事件
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {string[]} type - 角色类型
 */
export function randomCallRole(player: server.Player, type: string) {
    /**
     * * 定义 坐标基准点
     */
    const vertex0 = opal.Vector.add(player.location, { x: 3, y: 5, z: 3 });
    /**
     * * 定义 坐标基准点
     */
    const vertex1 = opal.Vector.add(player.location, { x: -3, y: 0, z: -3 });
    /**
     * * 定义 角色召唤锚点
     */
    const anchor = opal.Vector.rangeRandom(vertex0, vertex1);
    // 播放 粒子效果
    opal.TrySpawnParticle(player.dimension, 'constant:the_cracks_of_the_misty_sea', anchor);
    // 判断 是否已经召唤过 治疗类角色
    if (!player.getDynamicProperty('entity:healer_role_up')) {
        /**
         * * 治疗型 角色队列
         */
        const choice = opal.AnalysisWeight(table.call_healer_role).output;
        player.setDynamicProperty('entity:healer_role_up', true);
        opal.TrySpawnEntity(player.dimension, choice, anchor);
        return;
    };
    // 判断 是否已经召唤过 增伤类角色
    if (!player.getDynamicProperty('entity:fortify_role_up')) {
        /**
         * * 增伤型 角色队列
         */
        const choice = opal.AnalysisWeight(table.call_fortify_role).output;
        player.setDynamicProperty('entity:fortify_role_up', true);
        opal.TrySpawnEntity(player.dimension, choice, anchor);
        return;
    };
    // 执行 角色召唤
    switch (opal.RandomFloor(1, 32)) {
        case 16:
            WaspClusterRaidTrigger.Create(player.id, 20, { locations: [player.getHeadLocation()], dimensions: [player.dimension] });
            player.onScreenDisplay.setTitle('§c§l< 野蜂 袭击 > !!!§r');
            opal.TrySpawnEntity(player.dimension, type, anchor);
            break;

        default: opal.TrySpawnEntity(player.dimension, type, anchor); break;
    }
};
/**
 * * 指定角色召唤事件
 *
 * @param {server.Player} player - 玩家对象
 *
 * @param {string[]} queue - 角色队列
 */
function appointCallRole(player: server.Player, queue: string[]) {
    /**
     * * 定义 坐标基准点
     */
    const vertex0 = opal.Vector.add(player.location, { x: 2, y: 2, z: 2 });
    /**
     * * 定义 坐标基准点
     */
    const vertex1 = opal.Vector.add(player.location, { x: -2, y: 0, z: -2 });
    // 播放 粒子效果
    opal.TrySpawnParticle(player.dimension, 'constant:the_cracks_of_the_misty_sea', opal.Vector.rangeRandom(vertex0, vertex1));
    // 执行 角色召唤
    queue.forEach(entity => opal.TrySpawnEntity(player.dimension, entity, opal.Vector.rangeRandom(vertex0, vertex1)));
};
/**
 * * 野蜂机群袭击触发器
 *
 * @param {number} cooldown tick间隔时间, 建议值为: 20
 */
class WaspClusterRaidTrigger extends opal.Template {
    /**
     * * 定义 事件计时器
     */
    protected eventTimer = 0;
    public afterPlanEvent(data: type.AFTER_PLAN_DATA) {
        // 检测 条件是否齐全
        if (!this.annex.dimensions) return data.remove();
        if (!this.annex.locations) return data.remove();
        /**
         * * 获取 事件维度
         */
        const dimension = this.annex.dimensions[0];
        /**
         * * 获取 原始坐标
         */
        const proto = this.annex.locations[0];
        /**
         * * 获取 随机坐标
         */
        const current = opal.Vector.add(proto, { x: Math.random() * 16 - 8, y: Math.random() * 16, z: Math.random() * 16 - 8 });
        // 显示 粒子效果
        opal.TrySpawnParticle(dimension, 'constant:the_cracks_of_the_misty_sea', current);
        /**
         * * 解析 权重信息
         */
        const analysis = opal.AnalysisWeight(table.wasp_cluster_raid).output;
        // 生成 野蜂实体
        const wasp = opal.TrySpawnEntity(dimension, analysis, current);
        if (wasp instanceof server.Entity) wasp.nameTag = '§u野蜂 袭击§r';
        // 当事件结束时 生成战利品
        if (this.eventTimer >= 15) {
            opal.TrySpawnItem(dimension, new server.ItemStack('starry_map:eternal_energy'), current);
            opal.TrySpawnParticle(dimension, 'constant:fireworks_salvo_rune_red', current);
            opal.TrySpawnParticle(dimension, 'constant:disperse_rune_red', current);
            opal.TrySpawnParticle(dimension, 'constant:erupt_rune_red', current);
            return data.remove();
        };
        this.eventTimer += 1;
    };
};
/**
 * * 装备事件触发器
 */
export class EquipmentEventTrigger extends opal.Template {
    /**
     * * 物品被动事件触发器
     *
     * @param {server.Player} player 执行物品被动事件的玩家
     */
    protected Trigger(player: server.Player) {
        /**
         * * 装备容器
         */
        const equippable = player.getComponent('minecraft:equippable');
        /**
         * * 物品槽位
         */
        const itemSlot: server.EquipmentSlot[] = Object.values(server.EquipmentSlot);
        // 遍历物品槽位 并 基于物品类型执行对应事件
        itemSlot.map(slot => equippable?.getEquipment(slot)).forEach(
            (item, index) => {
                switch (item?.typeId) {
                    case 'starry_map:purple_gold_soul_jade': purpleGoldSoulJade(player, item, itemSlot[index], equippable); break;

                    case 'starry_map:scarlet_flame_heart': scarletFlameHeart(player, item, itemSlot[index], equippable); break;

                    case 'starry_map:starry_night_bead': starryNightBead(player, item, itemSlot[index], equippable); break;

                    case 'starry_map:ice_essence_gem': iceEssenceGem(player, item, itemSlot[index], equippable); break;

                    case 'starry_map:azure_sea_tide': azureSeaTide(player, item, itemSlot[index], equippable); break;

                    case 'starry_map:magic_crystal_shield': magicCrystalShield(player); break;

                    case 'starry_map:ocean_blessed_scarf': seasInRing(player); break;

                    default: break;
                }
            }
        )
    };
    public afterPlanEvent() {
        /**
         * * 获取 全体玩家
         */
        const players = server.world.getAllPlayers();
        // 遍历玩家队列
        players.forEach(player => this.Trigger(player));
    };
    /**
     * * 简短的容器构造器
     *
     * @param nameTag - 容器名称
     */
    static BriefCreate(nameTag: string) {
        return this.Create(nameTag, 100, {});
    };
};
/**
 * * 诸海之环 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function seasInRing(player: server.Player) {
    /**
     * * 实体过滤选项
     */
    const options: server.EntityQueryOptions = {
        excludeFamilies: ['monster'],
        location: player.location,
        maxDistance: 8,
        closest: 8
    };
    /**
     * * 实体排序
     */
    const onSort = (entity0: server.Entity, entity1: server.Entity) => {
        const distance0 = opal.Vector.distance(player.location, entity0.location);
        const distance1 = opal.Vector.distance(player.location, entity1.location);
        return distance0 - distance1;
    };
    /**
     * * 实体筛选
     */
    const onFilter = (target: server.Entity) => {
        return target.id === player.id || target.getDynamicProperty('entity:contract_user') == player.id;
    };
    /**
     * * 实体队列
     */
    const entitys = opal.EntitysSort(player.dimension, options, onSort, onFilter);
    // 造成 范围 瞬间治疗 效果
    entitys.forEach(entity => entity.addEffect('minecraft:instant_health', 1, { amplifier: 2, showParticles: false }));
    // 判断玩家是否在液体内
    if (!player.isInWater) return;
    // 赋予玩家 额外的 状态效果
    player.addEffect('minecraft:conduit_power', 300, { showParticles: false });
    /**
     * * 生成 珍珠游鱼 实体
     */
    const fish = opal.TrySpawnEntity(player.dimension, 'starry_map:elves.fish_of_pearl', player.location);
    if (fish instanceof Error) return;
    // 赋予动态属性
    player.getDynamicPropertyIds().forEach(id => fish.setDynamicProperty(id, player.getDynamicProperty(id)));
    // 校准 珍珠游鱼 的属性
    fish.setDynamicProperty('entity:improve', table.max_experience);
    fish.setDynamicProperty('entity:contract_user', player.id);
    fish.setDynamicProperty('entity:unlock', true);
};
/**
 * * 魔晶盾牌 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function magicCrystalShield(player: server.Player) {
    // 为玩家附着状态效果
    player.addEffect('minecraft:absorption', 300, { amplifier: 8, showParticles: false });
    player.addEffect('minecraft:resistance', 300, { amplifier: 2, showParticles: false });
};
/**
 * * 星夜凝华 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function starryNightBead(player: server.Player, item: server.ItemStack, slot: server.EquipmentSlot, equippable?: server.EntityEquippableComponent) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, opal.AlterDurability(item, 1));
    // 为玩家附着状态效果
    player.addEffect('minecraft:night_vision', 600, { showParticles: false });
    player.addEffect('minecraft:haste', 300, { amplifier: 2, showParticles: false });
};
/**
 * * 紫晶魂玉 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function purpleGoldSoulJade(player: server.Player, item: server.ItemStack, slot: server.EquipmentSlot, equippable?: server.EntityEquippableComponent) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, opal.AlterDurability(item, 1));
    // 为玩家附着状态效果
    player.addEffect('minecraft:village_hero', 300, { showParticles: false });
    player.addEffect('minecraft:trial_omen', 300, { showParticles: false });
};
/**
 * * 寒冰灵韵 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function iceEssenceGem(player: server.Player, item: server.ItemStack, slot: server.EquipmentSlot, equippable?: server.EntityEquippableComponent) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, opal.AlterDurability(item, 1));
    /**
     * * 实体过滤选项
     */
    const options: server.EntityQueryOptions = {
        families: ['monster'],
        location: player.location,
        maxDistance: 24,
        closest: 8
    };
    /**
     * * 实体筛选
     */
    const entitys = player.dimension.getEntities(options);
    // 为玩家附着状态效果
    player.addEffect('minecraft:speed', 300, { amplifier: 2, showParticles: false });
    // 为怪物附加状态效果
    entitys.forEach(entity => entity.addEffect('minecraft:slowness', 300, { amplifier: 4 }));
};
/**
 * * 碧海潮生 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function azureSeaTide(player: server.Player, item: server.ItemStack, slot: server.EquipmentSlot, equippable?: server.EntityEquippableComponent) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, opal.AlterDurability(item, 1));
    // 为玩家附着状态效果
    player.addEffect('minecraft:conduit_power', 600, { showParticles: false });
    player.addEffect('minecraft:weaving', 300, { showParticles: false });
};
/**
 * * 赤焰灵心 技能效果
 *
 * @param {server.Player} player - 穿着装备的玩家
 */
function scarletFlameHeart(player: server.Player, item: server.ItemStack, slot: server.EquipmentSlot, equippable?: server.EntityEquippableComponent) {
    // 消耗 1 点耐久
    equippable?.setEquipment(slot, opal.AlterDurability(item, 1));
    // 为玩家附着状态效果
    player.addEffect('minecraft:fire_resistance', 300, { showParticles: false });
    player.addEffect('minecraft:strength', 300, { amplifier: 2, showParticles: false });
};