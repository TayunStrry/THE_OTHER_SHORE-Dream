import * as server from "@minecraft/server";
import * as serverUI from "@minecraft/server-ui";
import { setRuntimeState, getRuntimeState } from './data';
import { Vector, TrySpawnEntity } from './tool';
/**
 * 蓝色军团名称
 */
const nemeTag = "§9§o§l<| 蓝色军团 |>§r";
/**
 * 实体 0 最大生成量
 */
let maxAmount_0 = 0;
/**
 * 实体 1 最大生成量
 */
let maxAmount_1 = 0;
/**
 * 实体 2 最大生成量
 */
let maxAmount_2 = 0;
/**
 * 实体 3 最大生成量
 */
let maxAmount_3 = 0;
/**
 * 实体 4 最大生成量
 */
let maxAmount_4 = 0;
/**
 * 实体 5 最大生成量
 */
let maxAmount_5 = 0;
/**
 * 实体 6 最大生成量
 */
let maxAmount_6 = 0;
/**
 * 实体 7 最大生成量
 */
let maxAmount_7 = 0;
/**
 * 实体 8 最大生成量
 */
let maxAmount_8 = 0;
/**
 * 实体 9 最大生成量
 */
let maxAmount_9 = 0;

/**
 * @param {server.Entity} entity - 基地实体
 * @returns {boolean} - 是否继续执行招募流程
 */
function summon_0(entity: server.Entity): boolean {
    if (maxAmount_0 <= 0 || Math.random() > 0.75) return true;
    const type = 'blue_legion:blaze'; // 烈焰人
    const { dimension, location } = entity;
    const above = Vector.copy(location).above(1).random(1);
    const target = TrySpawnEntity(dimension, type, above);
    if (target instanceof server.Entity) target.nameTag = nemeTag;
    maxAmount_0--;
    return false;
};

/**
 * @param {server.Entity} entity - 基地实体
 * @returns {boolean} - 是否继续执行招募流程
 */
function summon_1(entity: server.Entity): boolean {
    if (maxAmount_1 <= 0 || Math.random() > 0.75) return true;
    const type = 'blue_legion:stray'; // 流浪者
    const { dimension, location } = entity;
    const above = Vector.copy(location).above(1).random(1);
    const target = TrySpawnEntity(dimension, type, above);
    if (target instanceof server.Entity) target.nameTag = nemeTag;
    maxAmount_1--;
    return false;
};

/**
 * @param {server.Entity} entity - 基地实体
 * @returns {boolean} - 是否继续执行招募流程
 */
function summon_2(entity: server.Entity): boolean {
    if (maxAmount_2 <= 0 || Math.random() > 0.75) return true;
    const type = 'blue_legion:iron_golem'; // 铁傀儡
    const { dimension, location } = entity;
    const above = Vector.copy(location).above(1).random(1);
    const target = TrySpawnEntity(dimension, type, above);
    if (target instanceof server.Entity) target.nameTag = nemeTag;
    maxAmount_2--;
    return false;
};

/**
 * @param {server.Entity} entity - 基地实体
 * @returns {boolean} - 是否继续执行招募流程
 */
function summon_3(entity: server.Entity): boolean {
    if (maxAmount_3 <= 0 || Math.random() > 0.75) return true;
    const type = 'blue_legion:evocation_illager'; // 唤魔者
    const { dimension, location } = entity;
    const above = Vector.copy(location).above(1).random(1);
    const target = TrySpawnEntity(dimension, type, above);
    if (target instanceof server.Entity) target.nameTag = nemeTag;
    maxAmount_3--;
    return false;
};

/**
 * @param {server.Entity} entity - 基地实体
 * @returns {boolean} - 是否继续执行招募流程
 */
function summon_4(entity: server.Entity): boolean {
    if (maxAmount_4 <= 0 || Math.random() > 0.75) return true;
    const type = 'blue_legion:phantom'; // 幻翼
    const { dimension, location } = entity;
    const above = Vector.copy(location).above(1).random(1);
    const target = TrySpawnEntity(dimension, type, above);
    if (target instanceof server.Entity) target.nameTag = nemeTag;
    maxAmount_4--;
    return false;
};

/**
 * @param {server.Entity} entity - 基地实体
 * @returns {boolean} - 是否继续执行招募流程
 */
function summon_5(entity: server.Entity): boolean {
    if (maxAmount_5 <= 0 || Math.random() > 0.75) return true;
    const type = 'blue_legion:cave_spider'; // 洞穴蜘蛛
    const { dimension, location } = entity;
    const above = Vector.copy(location).above(1).random(1);
    const target = TrySpawnEntity(dimension, type, above);
    if (target instanceof server.Entity) target.nameTag = nemeTag;
    maxAmount_5--;
    return false;
};

/**
 * @param {server.Entity} entity - 基地实体
 * @returns {boolean} - 是否继续执行招募流程
 */
function summon_6(entity: server.Entity): boolean {
    if (maxAmount_6 <= 0 || Math.random() > 0.75) return true;
    const type = 'blue_legion:piglin_brute'; // 猪灵蛮兵
    const { dimension, location } = entity;
    const above = Vector.copy(location).above(1).random(1);
    const target = TrySpawnEntity(dimension, type, above);
    if (target instanceof server.Entity) target.nameTag = nemeTag;
    maxAmount_6--;
    return false;
};

/**
 * @param {server.Entity} entity - 基地实体
 * @returns {boolean} - 是否继续执行招募流程
 */
function summon_7(entity: server.Entity): boolean {
    if (maxAmount_7 <= 0 || Math.random() > 0.75) return true;
    const type = 'blue_legion:witch'; // 女巫
    const { dimension, location } = entity;
    const above = Vector.copy(location).above(1).random(1);
    const target = TrySpawnEntity(dimension, type, above);
    if (target instanceof server.Entity) target.nameTag = nemeTag;
    maxAmount_7--;
    return false;
};

/**
 * @param {server.Entity} entity - 基地实体
 * @returns {boolean} - 是否继续执行招募流程
 */
function summon_8(entity: server.Entity): boolean {
    if (maxAmount_8 <= 0 || Math.random() > 0.75) return true;
    const type = 'blue_legion:silverfish'; // 蠧虫
    const { dimension, location } = entity;
    const above = Vector.copy(location).above(1).random(1);
    const target = TrySpawnEntity(dimension, type, above);
    if (target instanceof server.Entity) target.nameTag = nemeTag;
    maxAmount_8--;
    return false;
};

/**
 * @param {server.Entity} entity - 基地实体
 * @returns {boolean} - 是否继续执行招募流程
 */
function summon_9(entity: server.Entity): boolean {
    if (maxAmount_9 <= 0 || Math.random() > 0.75) return true;
    const type = 'blue_legion:ravager'; // 劫掠兽
    const { dimension, location } = entity;
    const above = Vector.copy(location).above(1).random(1);
    const target = TrySpawnEntity(dimension, type, above);
    if (target instanceof server.Entity) target.nameTag = nemeTag;
    maxAmount_9--;
    return false;
};

export function execute(entity: server.Entity) {
    const functions = [
        summon_0,
        summon_1,
        summon_2,
        summon_3,
        summon_4,
        summon_5,
        summon_6,
        summon_7,
        summon_8,
        summon_9
    ];
    for (const func of functions) {
        /**
         * 尝试执行函数
         */
        const result = func(entity);
        // 如果返回值为 false 则跳出循环
        if (!result) break;
    }
};

export function revise(arg0: server.ItemComponentUseEvent) {
    // 如果玩家处于潜行状态, 则修改健康值
    if (arg0.source.isSneaking) return reviseHealth(arg0.source);
    /**
     * 表单窗口
     */
    const display = new serverUI.ModalFormData().title('军团对战 - 修改器(蓝色军团)');
    // 添加滑动条
    display.slider('烈焰人', 0, 100, 1, maxAmount_0);
    display.slider('流浪者', 0, 100, 1, maxAmount_1);
    display.slider('铁傀儡', 0, 100, 1, maxAmount_2);
    display.slider('唤魔者', 0, 100, 1, maxAmount_3);
    display.slider('幻翼', 0, 100, 1, maxAmount_4);
    display.slider('洞穴蜘蛛', 0, 100, 1, maxAmount_5);
    display.slider('猪灵蛮兵', 0, 100, 1, maxAmount_6);
    display.slider('女巫', 0, 100, 1, maxAmount_7);
    display.slider('蠧虫', 0, 100, 1, maxAmount_8);
    display.slider('劫掠兽', 0, 100, 1, maxAmount_9);
    // 显示窗体
    display.show(arg0.source).then(
        option => {
            // 验证表单是否为关闭状态
            if (option.canceled || option.formValues == undefined) return;
            // 遍历表单数据
            option.formValues.forEach(
                (value, index) => {
                    // 如果数据不存在或数据类型错误, 则返回
                    if (typeof value !== 'number') return;
                    // 更新数据
                    if (index == 0) maxAmount_0 = value;
                    if (index == 1) maxAmount_1 = value;
                    if (index == 2) maxAmount_2 = value;
                    if (index == 3) maxAmount_3 = value;
                    if (index == 4) maxAmount_4 = value;
                    if (index == 5) maxAmount_5 = value;
                    if (index == 6) maxAmount_6 = value;
                    if (index == 7) maxAmount_7 = value;
                    if (index == 8) maxAmount_8 = value;
                    if (index == 9) maxAmount_9 = value;
                }
            )
        }
    )
}

function reviseHealth(player: server.Player) {
    /**
     * 获取军团基地的实体数组
     */
    const legionBase = player.dimension.getEntities({ type: 'blue_legion:legion_base' })[0];
    // 如果不存在则返回
    if (!legionBase || !legionBase.isValid()) return;
    /**
     * 表单窗口
     */
    const form = new serverUI.ModalFormData().title('军团对战 - 修改器<§1§o§l 蓝方军团基地 §r>');
    /**
     * 获取军团基地的健康值组件
     */
    const healthComponent = legionBase.getComponent('minecraft:health');
    // 如果不存在则返回
    if (!healthComponent) return;
    // 添加滑动条
    form.slider(`<§1§o§l 蓝方军团基地 §r>剩余生命值`, 0, healthComponent.defaultValue, 1, healthComponent.currentValue);
    form.slider('强行终止对战', 0, 100, 1, getRuntimeState());
    // 显示窗体
    form.show(player).then(
        async option => {
            // 验证表单是否为关闭状态
            if (option.canceled || !option.formValues) return;
            /**
             * 获取表单设定的基地生命值数据
             */
            const value = option.formValues[0];
            // 如果数据不存在或数据类型错误, 则返回
            if (typeof value !== 'number') return;
            // 设置健康值组件的值
            if (value !== 0) {
                healthComponent.setCurrentValue(value);
            }
            else {
                // 设置健康值组件的值为 1
                healthComponent.setCurrentValue(1);
                // 等待
                await server.system.waitTicks(5);
                // 造成伤害
                legionBase.applyDamage(1, { 'damagingEntity': player, 'cause': server.EntityDamageCause.entityAttack });
            };
            // 强制关闭对战
            setRuntimeState(option.formValues[1] as number);
        }
    );
};

export function clearTheRemainingQuantity() {
    maxAmount_0 = 0;
    maxAmount_1 = 0;
    maxAmount_2 = 0;
    maxAmount_3 = 0;
    maxAmount_4 = 0;
    maxAmount_5 = 0;
    maxAmount_6 = 0;
    maxAmount_7 = 0;
    maxAmount_8 = 0;
    maxAmount_9 = 0;
};