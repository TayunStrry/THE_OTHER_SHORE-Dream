/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统数据
 */
import { TRANSFER_FUNCTION, TRANSFER_DATA, JSON_ARRAY, JSON_OBJECT, EXPORT_FUNCTION } from "../data/type";
/**
 * 函数列表
 */
const functionList: Map<string, TRANSFER_FUNCTION> = new Map();
/**
 * 解析事件输入 并 调用列表中的指定函数
 */
export class analysis {
    /**
     * 脚本事件命令消息接收器
     *
     * @param {server.ScriptEventCommandMessageAfterEvent} [data] 从服务器接收到的脚本事件命令消息, 包含源实体和命令数据
     */
    constructor(public data: server.ScriptEventCommandMessageAfterEvent) {
        /**
         * 提取消息ID中的功能名称部分（格式为scriptId:funcName）
         */
        const name = data.id.split(':')[1];
        /**
         * 获取需要传输的数据
         */
        const info = this.dataToTransmitString;
        /**
         * 从函数列表中获取对应的功能处理函数
         */
        const func = functionList.get(name);
        // 如果存在对应的功能处理函数, 则调用该函数
        if (func) func(...info);
    };
    /**
     * * 将接收到的 数据 转换为 传输数据 类型数组
     *
     * * 此函数主要用于处理从服务器接收到的脚本事件命令消息, 并将其转换为适合传输的数据类型数组
     *
     * @returns {TRANSFER_DATA[]} 返回一个传输数据类型数组, 包含转换后的数据
     */
    public get dataToTransmitString(): TRANSFER_DATA[] {
        /**
         * * 获取 发送推送信息 的 实体的本身
         */
        const self = this.data.sourceEntity;
        /**
         * * 获取 发送推送信息 的 实体的目标
         *
         * * 如果源实体有目标, 则使用目标实体；否则, 尝试从源实体的视角方向获取实体列表中的第一个实体作为目标
         */
        const target = this.data.sourceEntity?.target ?? this.data.sourceEntity?.getEntitiesFromViewDirection()[0]?.entity;
        /**
         * * 将字符串转换为实体或数字或字符串
         *
         * * 此步骤旨在将接收到的字符串数据转换为更具体的数据类型, 以便后续处理和传输
         */
        const parameters = this.dataToArray.map(
            type => {
                // 如果是字符串, 则尝试将其转换为 游戏实例对象 或 数字 或 字符串
                if (typeof type === 'string') return this.typeConversion(type, self, target);
                // 如果是数组, 则尝试将其转换为 游戏实例对象 或 数字 或 字符串 的 数组
                else if (Array.isArray(type)) return type.map(
                    value => {
                        // 对数组中的每个字符串, 尝试将其转换为 游戏实例对象 或 数字 或 字符串
                        if (typeof value === 'string') return this.typeConversion(value, self, target)
                    }
                );
                // 如果不是字符串或数组, 则直接返回原始值
                else return type;
            }
        );
        // 返回转换后的参数数组
        return parameters;

    };
    /**
     * * 将接收到的服务器脚本事件命令消息转换为 JSONArray
     *
     * * 此函数处理的消息格式特殊, 包含多种数据类型表示, 如数字, 布尔值, 字符串和数组
     *
     * * 它通过一系列的条件判断和转换操作, 将字符串形式的数据转换为相应的JavaScript数据类型
     *
     * @returns {JSON_ARRAY} - 返回一个转换后的 JSONArray, 包含各种 JavaScript 数据类型
     */
    public get dataToArray(): JSON_ARRAY {
        /**
         * * 待转换的字符串数组
         *
         * * 然后按分号分割字符串, 得到每个单独的值进行后续处理
         */
        const strArray = this.data.message.split(/;/);
        /**
         * *将字符串转换为 JSONArray
         *
         * *遍历每个字符串值, 尝试将其转换为相应的数据类型
         */
        const convertedArray: JSON_ARRAY = strArray.map(
            value => {
                /**
                 * * 尝试转换为数字
                 */
                const number = Number(value.trim());
                // 如果值是数值的字符串形式, 转换为数值
                if (!isNaN(number)) return number;
                // 如果值是 "true", 转换为布尔值 true
                else if (value.toLowerCase() === 'true') return true;
                // 如果值是 "false", 转换为布尔值 false
                else if (value.toLowerCase() === 'false') return false;
                // 如果值是一个数组, 移除方括号并按逗号分割
                else if (value.startsWith('[') && value.endsWith(']')) return value.slice(1, -1).split(',').map(
                    value => {
                        /**
                         * * 尝试将数组元素转换为数字
                         */
                        const parsedNumber = Number(value.trim());
                        // 如果值是数值的字符串形式, 转换为数值
                        if (!isNaN(parsedNumber)) return parsedNumber;
                        // 如果不是, 返回原始字符串
                        return value.trim();
                    }
                );
                try {
                    /**
                     * * 尝试将字符串转换为 JSON 对象
                     */
                    const json = JSON.parse(value);
                    // 如果解析成功 则 返回 JSON 对象
                    if (typeof json === 'object' && json !== null) return json;
                }
                // 如果解析失败, 返回原始字符串
                catch {
                    // 返回原始字符串
                    return value.trim();
                }
            }
        );
        // 返回转换后的数组
        return convertedArray;
    };
    /**
     * * 解析特定的转义字符, 并将其转换为相应的对象引用
     *
     * @param {string} [data] - 要解析的字符串数据
     *
     * @param {server.Entity} [self] - 可选的自身实体对象, 用于获取块或维度信息
     *
     * @param {server.Entity} [target] - 可选的目标实体对象, 用于替换'target'字符串
     *
     * @returns {server.Entity | server.Block | server.Dimension | string} 解析后的对象或原始字符串
     */
    public typeConversion(data: string, self?: server.Entity, target?: server.Entity): TRANSFER_DATA {
        // 如果数据是'target', 返回目标实体对象
        if (data === 'target') return target;
        // 如果数据是'self', 返回自身实体对象
        else if (data === 'self') return self;
        // 如果数据以'e<'开头并以'>'结尾, 解析为实体标识符并返回相应的实体对象
        else if (data.startsWith('e<') && data.endsWith('>')) {
            /**
             * * 提取实体标识符
             */
            const entityId = data.slice(2, -1);
            // 获取并返回实体对象
            return server.world.getEntity(entityId);
        }
        // 解析以'es<'开头并以'>'结尾的数据, 将其转换为实体查询选项, 并获取符合条件的实体列表
        else if (data.startsWith('es<') && data.endsWith('>')) {
            /**
             * * 移除前后标记并解析为 JSON 对象
             */
            const proto = this.dataToJSON(data.slice(3, -1));
            /**
             * * 创建一个空对象, 用于存储实体查询选项
             */
            const options: server.EntityQueryOptions = {};
            /**
             * * 创建一个映射, 用于将简写键替换为实际的查询选项键
             */
            const replace = new Map<string, string>(
                [
                    ['c', 'closest'],
                    ['r', 'maxDistance'],
                    ['rm', 'minDistance'],
                    ['tags', 'tags'],
                    ['_tags', 'excludeTags'],
                    ['familys', 'families'],
                    ['_familys', 'excludeFamilies'],
                    ['name', 'name'],
                    ['_names', 'excludeNames'],
                    ['type', 'type'],
                    ['_types', 'excludeTypes'],
                    ['rx', 'maxVerticalRotation'],
                    ['rxm', 'minVerticalRotation'],
                    ['ry', 'maxHorizontalRotation'],
                    ['rym', 'minHorizontalRotation'],
                ]
            );
            // 遍历解析后的JSON对象的键
            Object.keys(proto).forEach(
                key => {
                    /**
                     * * 将简写键替换为实际的查询选项键
                     */
                    const newKey = replace.get(key);
                    // 如果替换成功, 则将该选项添加到查询选项中
                    if (newKey) (options as any)[newKey] = proto[key];
                }
            );
            // 如果没有指定发信源实体, 则抛出错误
            if (!self) throw new Error('实体转义符 => 解析错误: 需要指定 发信源实体');
            // 使用查询选项获取符合条件的实体列表
            return self.dimension.getEntities({ location: self.location, ...options });
        }
        // 如果数据以'b<'开头并以'>'结尾, 解析为块位置并返回相应的块对象
        else if (data.startsWith('b<') && data.endsWith('>')) {
            /**
             * * 获取 转义符信息
             */
            const split = data.slice(2, -1).split('.');
            /**
             * * 提取方块位置
             */
            const [x, y, z] = split.map(x => x.trim()).map(Number);
            // 检查是否提供了正确的参数数量
            if (split.length !== 4) throw new Error('方块转义符 => 解析错误: 正确格式为: b<x.y.z.dimension>');
            // 检查[x, y, z]是否都是数值
            if (isNaN(x) || isNaN(y) || isNaN(z)) throw new Error('方块转义符 => 解析错误: x, y, z 必须是数值');
            // 检查split[3]是否是字符串
            if (typeof split[3] !== 'string') throw new Error('方块转义符 => 解析错误: dimension 必须是字符串');
            // 使用自身实体的维度获取块对象
            return server.world.getDimension(split[3])?.getBlock({ x, y, z });
        }
        // 如果数据以'd<'开头并以'>'结尾, 解析为维度名称并返回相应的维度对象
        else if (data.startsWith('d<') && data.endsWith('>')) {
            /**
             * * 提取维度名称
             */
            const dimensionName = data.slice(2, -1);
            // 获取并返回维度对象
            return server.world.getDimension(dimensionName);
        }
        // 如果数据以'x<'开头并以'>'结尾, 解析为JSON字符串并返回相应的对象
        else if (data.startsWith('x<') && data.endsWith('>')) return this.dataToJSON(data.slice(2, -1));
        // 如果数据不包含任何转义字符, 直接返回原始数据
        else return data;
    };
    /**
     * * 将字符串数据转换为JSON对象
     *
     * * 此函数旨在处理特定格式的字符串, 将其转换为易于操作的JSON对象
     *
     * * 它通过解析字符串中的键值对, 并根据特定规则转换值的类型（如数字, 布尔值等）, 来构建JSON对象
     *
     *
     * @param {string} [data] - 以特定格式传递的字符串数据, 格式为"key1=value1:key2=value2"
     *
     * @returns {JSON_OBJECT} 返回一个JSONObject, 其中包含解析后的键值对
     */
    public dataToJSON(data: string): JSON_OBJECT {
        /**
         * * 初始化一个空对象来存储键值对
         */
        const result: JSON_OBJECT = {};
        /**
         * * 分割字符串以获取键值对
         */
        const pairs = data.split(':');
        // 遍历每个键值对
        pairs.forEach(
            pair => {
                /**
                 * * 获取 当前键值对 的键
                 */
                const key = pair.split('=')[0];
                /**
                 * * 获取 当前键值对 的值
                 */
                const value = pair.split('=')[1];
                /**
                 * * 尝试转换为数字
                 */
                const number = Number(value.trim());
                // 如果值是一个数组, 移除方括号并按逗号分割
                if (value.startsWith('[') && value.endsWith(']')) result[key] = value.slice(1, -1).split(',').map(
                    value => {
                        /**
                         * * 尝试将数组元素转换为数字
                         */
                        const parsedNumber = Number(value.trim());
                        // 如果值是数值的字符串形式, 转换为数值
                        if (!isNaN(parsedNumber)) return parsedNumber;
                        // 如果不是, 返回原始字符串
                        return value.trim();
                    }
                );
                // 如果值是 "true", 转换为布尔值 true
                else if (value.toLowerCase() === 'true') result[key] = true;
                // 如果值是 "false", 转换为布尔值 false
                else if (value.toLowerCase() === 'false') result[key] = false;
                // 如果值是数值的字符串形式, 转换为数值
                else if (!isNaN(number)) result[key] = number;
                // 否则, 直接使用字符串值
                else result[key] = value;
            }
        );
        return result;
    };
};
/**
 * 将部分游戏对象转换为字符串格式
 */
export class toString {
    /**
     * * 构造函数 => 禁止实例化
     */
    private constructor() { }
    /**
     * * 将数组转换为自定义字符串表示, 方便传输
     * * 并将它们用分号( ; )分隔
     */
    static array(array: TRANSFER_DATA[]): string {
        /**
         * * 将数组中的每个元素根据其类型转换为字符串
         */
        const elements = array.map(
            (element) => {
                // 如果元素为null, 直接返回字符串"null"
                if (element === null) return 'null';
                // 对于 undefined, 直接返回字符串"undefined"
                if (element === undefined) return 'undefined';
                // 对于布尔类型, 使用其toString方法转换为字符串
                if (typeof element === 'boolean') return element.toString();
                // 对于字符串类型, 直接使用其toString方法
                if (typeof element === 'string') return element.toString();
                // 对于数字类型, 使用其toString方法转换为字符串
                if (typeof element === 'number') return element.toString();
                // 如果元素是数组
                if (Array.isArray(element)) {
                    // 如果数组中每个元素都是 Block 实例, 调用 blockToString 方法
                    if (element.every(value => value instanceof server.Block)) return toString.block(element as server.Block[]);
                    // 如果数组中每个元素都是 Entity 实例, 调用 entityToString 方法
                    if (element.every(value => value instanceof server.Entity)) return toString.entity(element as server.Entity[]);
                    // 如果数组中每个元素都是 Dimension 实例, 调用 dimensionToString 方法
                    if (element.every(value => value instanceof server.Dimension)) return toString.dimension(element as server.Dimension[]);
                    // 如果数组中元素不是特定类型, 使用join方法拼接为字符串
                    return '[' + element.join(',') + ']';
                }
                // 如果元素是Block实例, 调用blockToString方法
                if (element instanceof server.Block) return toString.block(element);
                // 如果元素是Entity实例, 调用entityToString方法
                if (element instanceof server.Entity) return toString.entity(element);
                // 如果元素是Dimension实例, 调用dimensionToString方法
                if (element instanceof server.Dimension) return toString.dimension(element);
                // 对于其他对象类型, 使用JSON.stringify方法转换为字符串
                return JSON.stringify(element);
            }
        );
        // 将转换后的元素字符串用分号( ; )连接, 形成最终的字符串表示
        return elements.join(';');
    };
    /**
     * * 将 方块 或 方块数组 转换为 字符串形式
     *
     * @param {server.Block | server.Block[]} [input] - 方块 或 方块数组
     *
     * @returns {string} - 游戏对象的字符串表示
     *
     * @throws {Error} - 如果输入的参数类型错误时, 则抛出错误
     */
    static block(input: server.Block | server.Block[]): string {
        /**
         * * 将 游戏对象 转换为 字符串表示
         */
        const toString = (_block: server.Block) => `b<${_block.x}.${_block.y}.${_block.z}.${_block.dimension.id.split(':')[1]}>`;
        // 检查 输入 是否为 对象数组
        if (Array.isArray(input) && input.every(value => value instanceof server.Block)) {
            // 使用逗号分隔数组中的每个元素, 并包裹在方括号中
            return `[${input.map(toString).join(',')}]`;
        }
        // 检查 输入 是否为 单个对象
        else if (input instanceof server.Block) {
            // 直接转换 单个对象
            return toString(input);
        }
        // 如果输入既不是 数组 也不是 单个对象, 抛出错误
        else {
            throw new Error('无效输入:输入必须是 server.Block 对象或 server.Block 对象数组');
        }
    };
    /**
     * * 将 实体 或 实体数组 转换为 字符串形式
     *
     * @param {server.Entity | server.Entity[]} [input] - 实体 或 实体数组
     *
     * @returns {string} - 游戏对象的字符串表示
     *
     * @throws {Error} - 如果输入的参数类型错误时, 则抛出错误
     */
    static entity(input: server.Entity | server.Entity[]): string {
        /**
         * * 将 游戏对象 转换为 字符串表示
         */
        const toString = (_entity: server.Entity) => `e<${_entity.id}>`;
        // 检查 输入 是否为 对象数组
        if (Array.isArray(input) && input.every(value => value instanceof server.Entity)) {
            // 使用逗号分隔数组中的每个元素, 并包裹在方括号中
            return `[${input.map(toString).join(',')}]`;
        }
        // 检查 输入 是否为 单个对象
        else if (input instanceof server.Entity) {
            // 直接转换单个对象
            return toString(input);
        }
        // 如果输入既不是数组也不是单个对象, 抛出错误
        else {
            throw new Error('无效输入:输入必须是 server.Entity 对象或 server.Entity 对象数组');
        }
    };
    /**
     * * 将 维度 或 维度数组 转换为 字符串形式
     *
     * @param {server.Dimension | server.Dimension[]} [input] - 维度 或 维度数组
     *
     * @returns {string} - 游戏对象的字符串表示
     *
     * @throws {Error} - 如果输入的参数类型错误时, 则抛出错误
     */
    static dimension(input: server.Dimension | server.Dimension[]): string {
        /**
         * * 将 维度对象 转换为 字符串表示
         */
        const toString = (_dimension: server.Dimension) => `d<${_dimension.id}>`;
        // 检查 输入 是否为 对象数组
        if (Array.isArray(input) && input.every(value => value instanceof server.Dimension)) {
            // 使用逗号分隔数组中的每个元素, 并包裹在方括号中
            return `[${input.map(toString).join(',')}]`;
        }
        // 检查 输入 是否为 单个对象
        else if (input instanceof server.Dimension) {
            // 直接转换单个对象
            return toString(input);
        }
        // 如果输入既不是 数组 也不是 单个对象, 抛出错误
        else {
            throw new Error('无效输入:输入必须是 server.Dimension 对象或 server.Dimension 对象数组');
        }
    };
    /**
     * * 将实体查询选项转换为字符串
     *
     * * 该方法用于将服务器端的实体查询选项格式化为一个简化的字符串表示
     *
     * @param {server.EntityQueryOptions} [options] - 实体查询选项的对象, 包含多种查询参数, 如距离, 标签, 家族, 名称, 类型等
     *
     * @returns {string} 返回格式化后的查询字符串
     */
    static entityFilter(options: server.EntityQueryOptions): string {
        /**
         * * 创建一个映射, 用于将实际的查询选项键替换为简写键
         */
        const reverseReplace = new Map<string, string>(
            [
                ['closest', 'c'],
                ['maxDistance', 'r'],
                ['minDistance', 'rm'],
                ['tags', 'tags'],
                ['excludeTags', '_tags'],
                ['families', 'familys'],
                ['excludeFamilies', '_familys'],
                ['name', 'name'],
                ['excludeNames', '_names'],
                ['type', 'type'],
                ['excludeTypes', '_types'],
                ['maxVerticalRotation', 'rx'],
                ['minVerticalRotation', 'rxm'],
                ['maxHorizontalRotation', 'ry'],
                ['minHorizontalRotation', 'rym'],
            ]
        );
        /**
         * * 创建一个数组, 用于存储简写键和值的字符串对
         */
        const pairs: string[] = [];
        // 遍历输入的查询选项
        Object.keys(options).forEach(
            key => {
                /**
                 * * 将实际的查询选项键替换为简写键
                 */
                const newKey = reverseReplace.get(key);
                // 将键和值转换为字符串对, 并添加到数组中
                if (newKey) pairs.push(`${newKey}=${(options as any)[key]}`);
            }
        );
        /**
         * * 将数组中的字符串对连接成一个字符串, 并用冒号分隔
         */
        const resultString = pairs.join(':');
        // 返回格式化的字符串
        return `es<${resultString}>`;
    };
};
/**
 * 用于导出函数的基类, 提供将函数注册到一个 Map 中以便后续导出的能力。
 */
export class Exportable {
    /**
     * 构造函数, 接收包含函数或函数对象的输入, 并将其注册到 Map 中。
     *
     * @param {EXPORT_FUNCTION} input - 输入对象, 其值可以是函数或包含函数和名称的对象。
     *
     * @param {boolean} [show=false] - 是否显示导出函数的信息, 默认为 false。
     */
    constructor(input: EXPORT_FUNCTION, show: boolean = false) {
        /**
         * 递归提取所有函数及其路径, 并注册到 Map 中。
         *
         * @function
         *
         * @param {Record<string, any>} obj - 待检查的对象。
         *
         * @param {string} path - 当前对象的键路径（用于处理嵌套对象）。
         */
        const extractAndRegister = (obj: Record<string, any>, path?: string) => {
            // 遍历当前对象的所有属性
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    /**
                     * 获取当前属性的值(函数或对象)
                     */
                    const value = obj[key];
                    // 检查是否是函数
                    if (typeof value === 'function' && !/^\s*class\s+/.test(Function.prototype.toString.call(value))) {
                        /**
                         * 将函数注册到 Map 中, 键为函数路径, 值为函数名称本身
                         */
                        const fullPath = path ? `${path}.${key}` : key;
                        // 将函数注册到 Map 中
                        functionList.set(fullPath, value);
                        // 打印注册信息
                        if (show) console.log(`注册函数: ${fullPath}`);
                    }
                    else if (typeof value === 'object' && value !== null) {
                        // 递归处理嵌套对象
                        extractAndRegister(value as Record<string, any>, path ? `${path}.${key}` : key);
                    }
                }
            }
        };
        // 开始提取和注册函数
        extractAndRegister(input);
    };
    /**
     * 获取所有导出的函数, 返回一个包含函数名和对应函数的 Map 对象。
     *
     * @static
     * @returns {Map<string, TRANSFER_FUNCTION>} 包含导出函数的 Map 对象。
     */
    static getExportedFunctions(): Map<string, TRANSFER_FUNCTION> {
        return functionList;
    }
};
// 订阅游戏事件并处理返回值
server.system.afterEvents.scriptEventReceive.subscribe(data => new analysis(data), { namespaces: ['10086'] });