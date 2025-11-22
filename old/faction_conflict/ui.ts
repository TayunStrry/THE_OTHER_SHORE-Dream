import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
import { globalState , CombatAttribute} from "./state";
import { translate } from "../system/translate";

/**
 * 使用服务器表单选择阵营
 *
 * @param {server.Player} player - 玩家
 */
export function selectLegionInServerUI(player: server.Player): void {
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
            if (response.selection == 2) return CombatAttribute.shouldTheWarBeTerminated = 1;
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
export function selectEntityInServerUI(player: server.Player, legionIndexValue: number): void {
    /**
     * 新建一个 Action 表单窗口
     */
    const window = new serverUI.ActionFormData();
    // 根据阵营索引注入实体类型选项
    if (legionIndexValue == 1) globalState.memberDirectory.forEach(type => window.button(translate(type, 'entity'), 'textures/blue_legion_base_config'));
    if (legionIndexValue == 2) globalState.memberDirectory.forEach(type => window.button(translate(type, 'entity'), 'textures/red_legion_base_config'));
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
export function writeEntityNameInServerUI(player: server.Player, legionIndexValue: number, entityIndexValue: number): void {
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
            CombatAttribute.publicEntityAmountValue = entityAmountValue;
            CombatAttribute.publicEntityIndexValue = entityIndexValue;
            CombatAttribute.publicLegionIndexValue = legionIndexValue;
            CombatAttribute.publicEntityNameValue = entityNameValue;
        }
    );
    // 关闭持续显示信息
    CombatAttribute.continuousDisplay = false;
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
export function setPublicProperty(player: server.Player): void {
    /**
     * 创建模态表单窗口，用于输入与实体和阵营相关的配置信息。
     */
    const window = new serverUI.ModalFormData()
        .textField('实体生成量', '请输入: 10进制 整数', CombatAttribute.publicEntityAmountValue.toString())
        .textField('实体索引值', '请输入: 10进制 整数', CombatAttribute.publicEntityIndexValue.toString())
        .textField('阵营索引值', '请输入: 10进制 整数', CombatAttribute.publicLegionIndexValue.toString())
        .textField('实体名称值', '请输入: 期望显示的名称', CombatAttribute.publicEntityNameValue);

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
            CombatAttribute.publicEntityAmountValue = analysisProperty[0]; // 实体生成量
            CombatAttribute.publicEntityIndexValue = analysisProperty[1]; // 实体索引值
            CombatAttribute.publicLegionIndexValue = analysisProperty[2]; // 阵营索引值
            CombatAttribute.publicEntityNameValue = (response.formValues[3] as string | undefined) || ''; // 实体名称值
        }
    );
    // 开启持续显示模式
    CombatAttribute.continuousDisplay = true;
};