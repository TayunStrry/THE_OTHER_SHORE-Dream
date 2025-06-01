/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统数据
 */
import * as type from "../../data/type";
/**
 * * 尝试生成 实体
 *
 * @param {string} typeID - 实体的 type_id
 *
 * @param {server.Dimension} dimension - 生成实体的维度
 *
 * @param {server.Vector3} location - 生成实体的位置
 *
 * @returns {Error | void} - 如果出现错误, 则返回错误对象, 否则返回 undefined
 */
export function TrySpawnEntity(dimension: server.Dimension, typeID: string, location: server.Vector3): Error | server.Entity {
    try {
        return dimension.spawnEntity(typeID as any, location);
    }
    catch (error) {
        return error instanceof Error ? error : new Error(String(error));
    }
};

/**
 * * 向量常量类
 */
class VectorConstant {
    /**
     * 常量: 0.5 向量
     * 返回一个所有分量都为 0.5 的向量
     */
    static get CONSTANT_HALF(): Vector { return new Vector(0.5, 0.5, 0.5) };
    /**
     * 常量: 0 向量
     * 返回一个所有分量都为 0 的向量
     */
    static get CONSTANT_ZERO(): Vector { return new Vector(0, 0, 0) };
    /**
     * 常量: 向上单位向量
     * 返回一个 y 分量为 1, 其余分量为 0 的向上单位向量
     */
    static get CONSTANT_UP(): Vector { return new Vector(0, 1, 0) };
    /**
     * 常量: 向下单位向量
     * 返回一个 y 分量为 -1, 其余分量为 0 的向下单位向量
     */
    static get CONSTANT_DOWN(): Vector { return new Vector(0, -1, 0) };
    /**
     * 常量: 正一向量
     * 返回一个所有分量都是 1 的单位向量
     */
    static get CONSTANT_ONE(): Vector { return new Vector(1, 1, 1) };
    /**
     * 常量: 负一向量
     * 返回一个所有分量都是 -1 的单位向量
     */
    static get CONSTANT_LOSS_ONE(): Vector { return new Vector(-1, -1, -1) };
    /**
     * 常量: 西方向单位向量
     * 返回一个 x 分量为 -1, 其余分量为 0 的向西方向单位向量
     */
    static get CONSTANT_WEST(): Vector { return new Vector(-1, 0, 0) };
    /**
     * 常量: 东方向单位向量
     * 返回一个 x 分量为 1, 其余分量为 0 的向东方向单位向量
     */
    static get CONSTANT_EAST(): Vector { return new Vector(1, 0, 0) };
    /**
     * 常量: 北方向单位向量
     * 返回一个 z 分量为 1, 其余分量为 0 的向北方向单位向量
     */
    static get CONSTANT_SOUTH(): Vector { return new Vector(0, 0, 1) };
    /**
     * 常量: 南方向单位向量
     * 返回一个 z 分量为 -1, 其余分量为 0 的向南方向单位向量
     */
    static get CONSTANT_NORTH(): Vector { return new Vector(0, 0, -1) };
    /**
     * 常量: 水平方向单位向量数组
     * 包含四个水平方向（北、南、东、西）的单位向量
     */
    static get CONSTANT_HORIZONTAL(): Vector[] {
        return [
            Vector.CONSTANT_NORTH,
            Vector.CONSTANT_SOUTH,
            Vector.CONSTANT_EAST,
            Vector.CONSTANT_WEST
        ]
    };
    /**
     * 常量: 垂直方向单位向量数组
     * 包含两个垂直方向（上、下）的单位向量
     */
    static get CONSTANT_VERTICAL(): Vector[] {
        return [
            Vector.CONSTANT_DOWN,
            Vector.CONSTANT_UP,
        ]
    };
    /**
     * 常量: 所有方向单位向量数组
     * 包含所有方向（垂直和水平）的单位向量
     */
    static get CONSTANT_ALL(): Vector[] {
        return [
            ...Vector.CONSTANT_VERTICAL,
            ...Vector.CONSTANT_HORIZONTAL,
        ]
    };
    /**
     * 常量: 向下及水平方向单位向量数组
     * 包含向下方向（下）和所有水平方向（北、南、东、西）的单位向量
     */
    static get CONSTANT_DOWN_HORIZONTAL(): Vector[] {
        return [
            Vector.CONSTANT_DOWN,
            ...Vector.CONSTANT_HORIZONTAL,
        ]
    };
};
/**
 * * 向量类
 */
export class Vector extends VectorConstant {
    /**
     * * 创建一个新的 Vector3 对象
     *
     * @param {number} x - 向量的 X 坐标
     *
     * @param {number} y - 向量的 Y 坐标
     *
     * @param {number} z - 向量的 Z 坐标
     */
    constructor(public x: number, public y: number, public z: number) { super(); };
    /**
     * * 生成立方体阵列向量数组
     *
     * @param scope 向量坐标的范围大小（非负整数）
     *
     * @returns {Vector[]} 立方体阵列向量数组, 包含所有可能的 (x, y, z) 组合, 其中每个坐标值都在 [-scope, +scope] 范围内
     */
    static createCubeLattice(scope: number): Vector[] {
        /**
         * 计算立方体的边长, 范围为 [-scope, +scope], 因此边长为 2 * scope + 1
         */
        const size: number = 2 * scope + 1;
        /**
         * 存储生成的向量数组
         */
        const vectors: Vector[] = [];
        // 遍历所有可能的坐标组合
        for (let i: number = 0; i < size ** 3; i++) {
            /**
             * 计算 x 坐标：通过整数除法和取模运算确定 x 的值
             */
            const x: number = -scope + Math.floor(i / (size ** 2)) % size;
            /**
             * 计算 y 坐标：通过整数除法和取模运算确定 y 的值
             */
            const y: number = -scope + Math.floor((i / size) % size);
            /**
             * 计算 z 坐标：通过取模运算确定 z 的值
             */
            const z: number = -scope + i % size;
            // 将计算出的坐标封装为 Vector 对象并添加到数组中
            vectors.push(new Vector(x, y, z));
        }
        // 返回生成的向量数组
        return vectors;
    };
    /**
     * * 比较当前 Vector3 对象与另一个 Vector3 对象是否相等
     *
     * @param {server.Vector3} start - 要比较的 Vector3 对象
     *
     * @param {server.Vector3} done - 要比较的 Vector3 对象
     *
     * @returns {boolean} - 如果两个 Vector3 对象的 x、y 和 z 属性都相等, 则返回 true；否则返回 false
     */
    static equals(start: server.Vector3, done: server.Vector3): boolean {
        return start.x === done.x && start.y === done.y && start.z === done.z;
    };
    /**
     * * 比较当前 Vector3 对象与另一个 Vector3 对象是否相等
     *
     * @param {server.Vector3} sample - 要比较的 Vector3 对象
     *
     * @returns {boolean} 如果两个 Vector3 对象的 x、y 和 z 属性都相等, 则返回 true；否则返回 false
     */
    equals(sample: server.Vector3): boolean {
        return this.x === sample.x && this.y === sample.y && this.z === sample.z;
    };
    /**
     * * 返回 Vector3 对象的一个副本
     *
     * @param {server.Vector3} vector - 需要拷贝的 Vector3 对象
     *
     * @returns {Vector} - 拷贝后的新 Vector 对象
     */
    static copy(vector: server.Vector3): Vector {
        return this.CONSTANT_ZERO.add(vector);
    };
    /**
     * * 返回当前 Vector3 对象的一个副本
     *
     * @returns {Vector} 当前 Vector 对象的副本
     */
    get copy(): Vector {
        return this.add(Vector.CONSTANT_ZERO);
    };
    /**
     * * 根据指定步数返回当前向量在y轴方向上的偏移结果
     *
     * @param {number} [steps = 1] - 垂直方向偏移量（可选, 默认为1）
     *
     * @returns {Vector} - 偏移后的新的 Vector 对象
     */
    above(steps?: number): Vector {
        /**
         * 获取偏移量
         */
        const offset = steps ?? 1;
        // 返回当前 Vector3 对象与偏移量相加后的新 Vector3 对象
        return this.add({ x: 0, y: offset, z: 0 });
    };
    /**
     * * 根据指定步数返回当前向量在x轴正方向的偏移结果
     *
     * @param {number} [steps=1] - 水平方向偏移量（可选, 默认为1）
     *
     * @returns {Vector} - 偏移后的新的 Vector 对象
     */
    east(steps?: number): Vector {
        /**
         * 获取偏移量
         */
        const offset = steps ?? 1;
        // 返回当前 Vector3 对象与偏移量相加后的新 Vector3 对象
        return this.add({ x: offset, y: 0, z: 0 });
    };
    /**
     * * 根据指定步数返回当前向量在z轴正方向的偏移结果
     *
     * @param {number} [steps=1] - 水平方向偏移量（可选, 默认为1）
     *
     * @returns {Vector} - 偏移后的新的 Vector 对象
     */
    north(steps?: number): Vector {
        /**
         * 获取偏移量
         */
        const offset = steps ?? 1;
        // 返回当前 Vector3 对象与偏移量相加后的新 Vector3 对象
        return this.add({ x: 0, y: 0, z: offset });
    };
    /**
     * * 将当前 Vector3 对象与另一个 Vector3 对象相加
     *
     * @param {server.Vector3} start - 要相加的 Vector3 对象
     *
     * @param {server.Vector3} done - 要相加的 Vector3 对象
     *
     * @returns {Vector} - 相加结果的新 Vector3 对象
     */
    static add(start: server.Vector3, done: server.Vector3): Vector {
        return new Vector(start.x + done.x, start.y + done.y, start.z + done.z);
    };
    /**
     * * 将当前 Vector3 对象与另一个 Vector3 对象相加
     *
     * @param {server.Vector3} sample - 要相加的 Vector3 对象
     *
     * @returns {Vector} - 相加结果的新 Vector3 对象
     */
    add(sample: server.Vector3): Vector {
        return new Vector(sample.x + this.x, sample.y + this.y, sample.z + this.z);
    };
    /**
     * * 从 Vector3 对象中减去另一个 Vector3 对象
     *
     * @param {server.Vector3} start - 被减去的 Vector3 对象
     *
     * @param {server.Vector3} done - 要减去的 Vector3 对象
     *
     * @returns {Vector} - 减法结果的新 Vector 对象
     */
    static subtract(start: server.Vector3, done: server.Vector3): Vector {
        return new Vector(start.x - done.x, start.y - done.y, start.z - done.z);
    };
    /**
     * * 从当前 Vector3 对象中减去另一个 Vector3 对象
     *
     * @param {server.Vector3} sample - 要减去的 Vector3 对象
     *
     * @returns {Vector} - 减法结果的新 Vector 对象
     */
    subtract(sample: server.Vector3): Vector {
        return new Vector(this.x - sample.x, this.y - sample.y, this.z - sample.z);
    };
    /**
     * * 将 Vector3 对象的每个分量乘以一个标量
     *
     * @param {server.Vector3} vector - 向量对象
     *
     * @param {number} scale - 用于缩放的标量值
     *
     * @returns {Vector} - 缩放后的新 Vector 对象
     */
    static multiply(vector: server.Vector3, scale: number): Vector {
        return new Vector(vector.x * scale, vector.y * scale, vector.z * scale);
    };
    /**
     * * 将当前 Vector 对象的每个分量乘以一个标量
     *
     * @param {number} scale - 用于缩放的标量值
     *
     * @returns {Vector} - 缩放后的新 Vector 对象
     */
    multiply(scale: number): Vector {
        return new Vector(this.x * scale, this.y * scale, this.z * scale);
    };
    /**
     * * 计算 Vector3 对象与另一个 Vector3 对象的点积
     *
     * @param {server.Vector3} start - 要计算点积的 Vector3 对象
     *
     * @param {server.Vector3} done - 要计算点积的 Vector3 对象
     *
     * @returns {number} - 两个向量的点积结果
     */
    static dot(start: server.Vector3, done: server.Vector3): number {
        return start.x * done.x + start.y * done.y + start.z * done.z;
    };
    /**
     * 计算当前 Vector3 对象与另一个 Vector3 对象的点积
     *
     * @param {server.Vector3} sample - 要计算点积的 Vector3 对象
     *
     * @returns {number} - 两个向量的点积结果
     */
    dot(sample: server.Vector3): number {
        return this.x * sample.x + this.y * sample.y + this.z * sample.z;
    };
    /**
     * * 计算 Vector3 对象与另一个 Vector3 对象的叉积
     *
     * @param {server.Vector3} start - 要计算叉积的 Vector3 对象
     *
     * @param {server.Vector3} done - 要计算叉积的 Vector3 对象
     *
     * @returns {server.Vector3} - 两个向量的叉积结果
     */
    static cross(start: server.Vector3, done: server.Vector3): Vector {
        return new Vector(
            start.y * done.z - start.z * done.y,
            start.z * done.x - start.x * done.z,
            start.x * done.y - start.y * done.x,
        )
    };
    /**
     * * 计算当前 Vector3 对象与另一个 Vector3 对象的叉积
     *
     * @param {server.Vector3} done - 要计算叉积的 Vector3 对象
     *
     * @returns {Vector} - 两个向量的叉积结果
     */
    cross(done: server.Vector3): Vector {
        return new Vector(
            this.y * done.z - this.z * done.y,
            this.z * done.x - this.x * done.z,
            this.x * done.y - this.y * done.x,
        );
    };
    /**
     * * 将 Vector3 对象的每个分量除以一个标量
     *
     * @param {server.Vector3} vector - 进行除法计算的 Vector3 对象
     *
     * @param {number} divisor - 用于除法的标量值
     *
     * @returns {Vector} - 除法结果的新 Vector3 对象
     */
    static division(vector: server.Vector3, divisor: number): Vector {
        if (divisor === 0) return new Vector(vector.x, vector.y, vector.z);
        return new Vector(vector.x / divisor, vector.y / divisor, vector.z / divisor);
    };
    /**
     * 将当前 Vector3 对象的每个分量除以一个标量
     *
     * @param {number} divisor - 用于除法的标量值
     *
     * @returns {Vector} - 除法结果的新 Vector3 对象
     */
    division(divisor: number): Vector {
        if (divisor === 0) return this;
        return new Vector(this.x / divisor, this.y / divisor, this.z / divisor);
    };
    /**
     * * 获取 Vector3 对象的模（长度）
     *
     * @param {server.Vector3} vector - 进行计算的 Vector3 对象
     *
     * @returns {number} - 向量的模
     */
    static magnitude(vector: server.Vector3): number {
        return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
    };
    /**
     * * 获取当前 Vector3 对象的模（长度）
     *
     * @returns {number} 向量的模
     */
    get magnitude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    };
    /**
     * * 计算 Vector3 对象与另一个 Vector3 对象之间的距离
     *
     * @param {server.Vector3} start - 要计算距离的 Vector3 对象
     *
     * @param {server.Vector3} done - 要计算距离的 Vector3 对象
     *
     * @returns {number} - 两个向量之间的距离
     */
    static distance(start: server.Vector3, done: server.Vector3): number {
        return this.magnitude(this.subtract(start, done));
    };
    /**
     * * 计算当前 Vector3 对象与另一个 Vector3 对象之间的距离
     *
     * @param {server.Vector3} vector - 要计算距离的 Vector3 对象
     *
     * @returns {number} - 两个向量之间的距离
     */
    distance(vector: server.Vector3): number {
        return Vector.magnitude(this.subtract(vector));
    };
    /**
     * * 获取 Vector3 对象的归一化向量
     *
     * @param {server.Vector3} vector - 进行计算的 Vector3 对象
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static normalize(vector: server.Vector3): Vector {
        /**
         * * 计算向量模长
         */
        const mag = this.magnitude(vector);
        return new Vector(vector.x / mag, vector.y / mag, vector.z / mag);
    };
    /**
     * * 获取当前 Vector3 对象的归一化向量
     *
     * @returns {Vector} 归一化的单位向量
     */
    get normalize(): Vector {
        /**
         * * 计算向量模长
         */
        const mag = this.magnitude;
        return new Vector(this.x / mag, this.y / mag, this.z / mag);
    };
    /**
     * * 将 Vector3 对象的每个分量向下取整到指定的小数位数
     *
     * @param {server.Vector3} vector - 进行计算的 Vector3 对象
     *
     * @param {number} decimals - 小数位数, 默认为 2
     *
     * @returns {Vector} - 取整后的新 Vector 对象
     */
    static floor(vector: server.Vector3, decimals: number = 2): Vector {
        /**
         * * 获取乘数
         */
        const multiplier = Math.pow(10, decimals);
        return new Vector(
            Math.floor(vector.x * multiplier) / multiplier,
            Math.floor(vector.y * multiplier) / multiplier,
            Math.floor(vector.z * multiplier) / multiplier
        );
    };
    /**
     * * 将当前 Vector3 对象的每个分量向下取整到指定的小数位数
     *
     * @param {number} decimals - 小数位数, 默认为 2
     *
     * @returns {Vector} - 取整后的新 Vector 对象
     */
    floor(decimals: number = 2): Vector {
        /**
         * * 获取乘数
         */
        const multiplier = Math.pow(10, decimals);
        return new Vector(
            Math.floor(this.x * multiplier) / multiplier,
            Math.floor(this.y * multiplier) / multiplier,
            Math.floor(this.z * multiplier) / multiplier
        );
    };
    /**
     * * 将 Vector3 对象转换为字符串
     *
     * @param {server.Vector3 | server.Vector2} [vector] - 向量对象
     *
     * @param {VECTOR_STRING_OPTIONS} [options] - 字符串化选项
     *
     * @returns {string} - 向量的字符串表示
     */
    static toString(vector: server.Vector3 | server.Vector2, options?: type.VECTOR_STRING_OPTIONS): string {
        /**
         * * 默认小数位数
         */
        const decimals = options?.decimals ?? 2;
        /**
         * * 向量 分隔字符串
         */
        const delimiter = options?.delimiter ?? ', ';
        /**
         * * 根据向量的类型, 获取不同的属性
         */
        const components = 'z' in vector
            ? [vector.x.toFixed(decimals), vector.y.toFixed(decimals), vector.z.toFixed(decimals)]
            : [vector.x.toFixed(decimals), vector.y.toFixed(decimals)];
        // 将向量组件连接成字符串
        return components.join(delimiter);
    };
    /**
     * * 将当前 Vector3 对象转换为字符串
     *
     * @param {type.VECTOR_STRING_OPTIONS} [options] - 字符串化选项
     *
     * @returns {string} - 向量的字符串表示
     */
    toString(options?: type.VECTOR_STRING_OPTIONS): string {
        /**
         * * 默认小数位数
         */
        const decimals = options?.decimals ?? 2;
        /**
         * * 向量 分隔字符串
         */
        const delimiter = options?.delimiter ?? ', ';
        /**
         * * 转为 字符串 数组
         */
        const components = [this.x.toFixed(decimals), this.y.toFixed(decimals), this.z.toFixed(decimals)];
        // 将向量组件连接成字符串
        return components.join(delimiter);
    };
    /**
     * * 将 Vector3 对象的每个分量限制在指定的范围内
     *
     * @param {server.Vector3} [vector] - 进行计算的 Vector3 对象
     *
     * @param {VECTOR_LIMITS} [limits] - 包含最小值和最大值的对象
     *
     * @returns {Vector} - 计算后的新 Vector 对象
     */
    static clamp(vector: server.Vector3, limits?: type.VECTOR_LIMITS): Vector {
        return new Vector(
            Clamp({ min: limits?.min?.x ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.x ?? Number.MAX_SAFE_INTEGER }, vector.x),
            Clamp({ min: limits?.min?.y ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.y ?? Number.MAX_SAFE_INTEGER }, vector.y),
            Clamp({ min: limits?.min?.z ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.z ?? Number.MAX_SAFE_INTEGER }, vector.z),
        )
    };
    /**
     * * 将当前 Vector3 对象的每个分量限制在指定的范围内
     *
     * @param {type.VECTOR_LIMITS} [limits] - 包含最小值和最大值的对象
     *
     * @returns {Vector} - 计算后的新 Vector 对象
     */
    clamp(limits?: type.VECTOR_LIMITS): Vector {
        return new Vector(
            Clamp({ min: limits?.min?.x ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.x ?? Number.MAX_SAFE_INTEGER }, this.x),
            Clamp({ min: limits?.min?.y ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.y ?? Number.MAX_SAFE_INTEGER }, this.y),
            Clamp({ min: limits?.min?.z ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.z ?? Number.MAX_SAFE_INTEGER }, this.z),
        );
    };
    /**
     * * 向量 线性插值
     *
     * @param {server.Vector3} start - 向量对象
     *
     * @param {server.Vector3} done - 向量对象
     *
     * @param {number} time - 时间系数
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static lerp(start: server.Vector3, done: server.Vector3, time: number): Vector {
        return new Vector(
            start.x + (done.x - start.x) * time,
            start.y + (done.y - start.y) * time,
            start.z + (done.z - start.z) * time,
        )
    };
    /**
     * * 向量 球面线性插值
     *
     * @param {server.Vector3} start - 向量对象
     *
     * @param {server.Vector3} done - 向量对象
     *
     * @param {number} time - 时间系数
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static slerp(start: server.Vector3, done: server.Vector3, time: number): server.Vector3 | Vector {
        /**
         * * 计算两个向量点积
         */
        const angleCosine = this.dot(start, done);
        /**
         * * 确保角度余弦值在 [-1, 1] 区间内
         */
        const safeAngleCosine = Math.min(Math.max(angleCosine, -1), 1);
        /**
         * * 计算角度余弦值
         */
        const angleTheta = Math.acos(safeAngleCosine);
        /**
         * * 计算角度正弦值
         */
        const angleSin = Math.sin(angleTheta);
        /**
         * * 处理几乎平行的向量
         */
        if (Math.abs(angleSin) < Number.EPSILON) return start;
        /**
         * * 计算插值比例 对应 vectorA
         */
        const ratioA = Math.sin((1.0 - time) * angleTheta) / angleSin;
        /**
         * * 计算插值比例 对应 vectorB
         */
        const ratioB = Math.sin(time * angleTheta) / angleSin;
        // 根据插值比例对两个向量进行缩放, 然后相加得到插值结果
        return this.add(this.multiply(start, ratioA), this.multiply(done, ratioB));
    };
    /**
     * * 在 Vector3 对象和另一个 Vector3 对象之间随机生成一个向量
     *
     * @param {server.Vector3} start - 进行计算的 Vector3 对象
     *
     * @param {server.Vector3} done - 进行计算的 Vector3 对象
     *
     * @returns {Vector} - 计算后的 Vector 对象
     */
    static rangeRandom(start: server.Vector3, done: server.Vector3): Vector {
        /**
         * * 获取两个向量范围
         */
        const range = new server.BlockVolume(start, done);
        /**
         * * 向量空间 的 最小值顶点
         */
        const min = range.getMin();
        /**
         * * 向量空间 的 最大值顶点
         */
        const max = range.getMax();
        // 随机生成一个向量
        return new Vector(
            RandomFloat(min.x, max.x),
            RandomFloat(min.y, max.y),
            RandomFloat(min.z, max.z)
        )
    };
    /**
     * 在当前 Vector3 对象和另一个 Vector3 对象之间随机生成一个向量
     *
     * @param {server.Vector3} done - 另一个 Vector3 对象
     *
     * @returns {Vector} - 计算后的 Vector 对象
     */
    rangeRandom(done: server.Vector3): Vector {
        /**
         * 创建一个 BlockVolume 对象, 表示从当前向量到目标向量的范围
         */
        const range = new server.BlockVolume(this, done);
        /**
         * 获取 BlockVolume 的最小顶点坐标
         */
        const min = range.getMin();
        /**
         * 获取 BlockVolume 的最大顶点坐标
         */
        const max = range.getMax();
        return new Vector(
            RandomFloat(min.x, max.x),
            RandomFloat(min.y, max.y),
            RandomFloat(min.z, max.z)
        );
    };
    /**
     * * 在指定锚点周围生成一个随机向量
     *
     * @param {server.Vector3} [anchor] - 基准位置坐标
     *
     * @param {number} [range] - 随机偏移范围（每个轴的偏移值在 [-range, +range] 之间）
     *
     * @param {server.Vector3} [offset] - 偏移量（默认为 { x: 0, y: 0, z: 0 }）
     *
     * @returns {Vector} - 计算后的 Vector 对象
     */
    static random(anchor: server.Vector3, range: number, offset: server.Vector3 = Vector.CONSTANT_ZERO): Vector {
        return Vector.add(anchor, { x: RandomFloat(-range, range), y: RandomFloat(-range, range), z: RandomFloat(-range, range) }).add(offset);
    };
    /**
     * * 在当前位置周围生成一个随机向量
     *
     * @param {number} range - 随机偏移范围（每个轴的偏移值在 [-range, +range] 之间）
     *
     * @param {server.Vector3} [offset] - 偏移量（默认为 { x: 0, y: 0, z: 0 }）
     *
     * @returns {Vector} - 计算后的 Vector 对象
     */
    random(range: number, offset: server.Vector3 = Vector.CONSTANT_ZERO): Vector {
        return Vector.add(this, { x: RandomFloat(-range, range), y: RandomFloat(-range, range), z: RandomFloat(-range, range) }).add(offset);;
    };
    /**
     * * 计算 Vector3 对象与另一个 Vector3 对象之间的归一化差向量
     *
     * @param {server.Vector3} start - 进行计算的 Vector3 对象
     *
     * @param {server.Vector3} done - 进行计算的 Vector3 对象
     *
     * @returns {Vector} - 归一化后的差向量
     */
    static difference(start: server.Vector3, done: server.Vector3): Vector {
        /**
         * * 计算 两个向量 的 基本向量
         */
        const direction = this.subtract(done, start);
        // 返回 归一化后 的 差向量
        return this.normalize(direction);
    };
    /**
     * * 计算当前 Vector3 对象与另一个 Vector3 对象之间的归一化差向量
     *
     * @param {Vector} done - 进行计算的 Vector3 对象
     *
     * @returns {Vector} - 归一化后的差向量
     */
    difference(done: Vector): Vector {
        /**
         * 计算差向量
         */
        const direction = done.subtract(this);
        return Vector.normalize(direction);
    };
    /**
     * 在指定位置和维度内随机获取最高块的中心坐标
     *
     * @param {type.LOCATION_AND_DIMENSION} source - 包含位置和维度的对象
     *
     * @param {number} [range=8] - 随机偏移的范围, 默认值为8
     *
     * @returns {server.Vector3} 返回最高块的中心坐标, 如果无法找到最高块, 则返回源位置
     */
    static randomTopmostBlock(source: type.LOCATION_AND_DIMENSION, range: number = 8): server.Vector3 {
        /**
         * * 随机偏移坐标
         */
        const offset = Vector.add(source.location, { x: RandomFloor(-range, range), y: 0, z: RandomFloor(-range, range) });
        // 输出 随机有效坐标
        return source.dimension.getTopmostBlock(offset)?.above(1)?.center() ?? source.location;
    };
    /**
     * * 基于 实体旋转 获取 指向信息 的 3轴矢量
     *
     * @param {server.Vector2} rotate - 实体旋转的 2轴矢量
     */
    static AngleToPlace(rotate: server.Vector2): server.Vector3 {
        /**
         * * 旋转角度(俯仰角)
         */
        const ry = -rotate.y * Math.PI / 180;
        /**
         * * 旋转角度(偏航角)
         */
        const rx = -rotate.x * Math.PI / 180;
        /**
         * * x 轴分量
         */
        const x = Math.sin(ry) * Math.cos(rx);
        /**
         * * Y 轴分量
         */
        const y = Math.sin(rx);
        /**
         * * Z 轴分量
         */
        const z = Math.cos(ry) * Math.cos(rx);
        // 返回指向的三维向量
        return { x, y, z };
    };
    /**
     * 将三维方向向量转换为实体旋转角度（基于Minecraft坐标系规则）
     *
     * @param {server.Vector3} direction - 标准化后的三维方向向量
     *
     * @returns {server.Vector2} 实体旋转角度（pitch/x轴, yaw/y轴）
     */
    static Vector3ToAngle(direction: server.Vector3): server.Vector2 {
        /**
         * 计算水平面投影长度
         */
        const horizontalDist = Math.sqrt(direction.x ** 2 + direction.z ** 2);
        /**
         * 计算偏航角（yaw）调整参数顺序和符号
         */
        let yaw = Math.atan2(-direction.x, direction.z) * (180 / Math.PI);
        /**
         * 计算俯仰角（pitch）并取反（Minecraft向下为正方向）
         */
        let pitch = -Math.atan2(direction.y, horizontalDist) * (180 / Math.PI);
        // 处理极端情况（垂直方向）
        if (isNaN(pitch)) {
            pitch = direction.y > 0 ? -90 : 90; // 符号与原始计算相反
        }
        // 规范yaw到[-180, 180]范围
        yaw = ((yaw + 180) % 360 + 360) % 360 - 180;
        // 返回实体旋转角度
        return { x: pitch, y: yaw };
    };
    /**
     * * 计算 目标方向相关 的 方向向量集
     *
     * @param {server.Vector3} front - 前方 方向向量
     *
     * @returns {VECTOR_DIRECTIONS} - 包含计算出的方向向量的对象
     */
    static directions(front: server.Vector3): type.VECTOR_DIRECTIONS {
        /**
         * * 定义 常量 向量
         */
        const sample: server.Vector3 = this.CONSTANT_UP;
        /**
         * * 后方 方向向量
         */
        const back: server.Vector3 = this.normalize(this.multiply(front, -1));
        /**
         * * 右方 方向向量
         */
        const right: server.Vector3 = this.normalize(this.cross(front, sample));
        /**
         * * 左方 方向向量
         */
        const left: server.Vector3 = this.normalize(this.multiply(right, -1));
        /**
         * * 下方 方向向量
         */
        const down: server.Vector3 = this.normalize(this.cross(front, right));
        /**
         * * 上方 方向向量
         */
        const above: server.Vector3 = this.normalize(this.multiply(down, -1));
        // 返回计算结果
        return { front, back, left, right, above, down };
    };
    /**
     * * 计算 目标方向相关 的 坐标偏移
     *
     * @param {server.Vector3} source - 进行计算的源坐标
     *
     * @param {server.Vector3} front - 前方向向量
     *
     * @param {VECTOR_RELATIVE_OFFSET} offset - 偏移量
     *
     * @returns {server.Vector3} - 计算后的坐标
     */
    static relativeOffset(source: server.Vector3, front: server.Vector3, offset: type.VECTOR_RELATIVE_OFFSET): Vector {
        /**
         * * 计算 方向向量集
         */
        const directions = this.directions(front);
        /**
         * * 计算 前方偏移量
         */
        const frontScale = this.multiply(front, offset.front);
        /**
         * * 计算 右方偏移量
         */
        const rightScale = this.multiply(directions.right, offset.right);
        /**
         * * 计算 上方偏移量
         */
        const upScale = this.multiply(directions.above, offset.above);
        // 返回偏移量
        return this.add(source, this.add(frontScale, this.add(upScale, rightScale)));
    };
    /**
     * * 提前量计算
     *
     * @param {server.Vector3} posA - 点 A 的位置
     *
     * @param {server.Vector3} posB - 点 B 的位置
     *
     * @param {number} speedA - A 发射的直线弹射物的速率
     *
     * @param {server.Vector3} velB - B 的速度
     *
     * @returns {server.Vector3} - A 发射的直线弹射物的速度
     */
    static calculateLeadVelocity(posA: server.Vector3, posB: server.Vector3, speedA: number, velB: server.Vector3): Vector {
        /**
         * * 计算 向量BA
         */
        const vecBA = this.subtract(posB, posA);
        /**
         * * 计算 向量BA的归一化向量
         */
        const normVecBA = this.normalize(vecBA);
        /**
         * * 计算 向量BA与速度B的点积
         */
        const compVbBA = this.dot(velB, normVecBA);
        /**
         * * 计算 向量BA与归一化B的垂直分量
         */
        const vbAlongBA = this.multiply(normVecBA, compVbBA);
        /**
         * * 计算 向量BA与速度B的垂直分量
         */
        const perpCompVa = this.subtract(velB, vbAlongBA);
        /**
         * * 计算 向量BA与速度A的垂直分量
         */
        const magVaBA = Math.sqrt(speedA * speedA - this.dot(perpCompVa, perpCompVa));
        // 如果A的发射速度在BA方向上的分量为负数, 则返回速度B的垂直分量
        if (magVaBA <= 0) return perpCompVa;
        /**
         * * 计算 A 发射的直线弹射物的速度向量
         */
        const vaAlongBA = this.multiply(normVecBA, -magVaBA);
        // 计算最终的速度向量（A的发射速度）
        return this.add(perpCompVa, vaAlongBA);
    };
    /**
     * * 获取区块坐标
     *
     * @param {server.Vector3} vector - 计算前的原始坐标
     *
     * @param {boolean} Yzero - 是否将 Y轴 的值设置为 0
     *
     * @param {number} size - 区块大小
     *
     * @returns {server.Vector3} - 计算后的区块坐标
     */
    static chunkLocation(vector: server.Vector3, Yzero: boolean = true, size: number = 16): Vector {
        /**
         * * 计算 Y轴 的值
         */
        const y = Yzero ? 0 : vector.y;
        // 返回计算结果
        return new Vector(Math.floor(vector.x / size) * size, y, Math.floor(vector.z / size) * size);
    };
};
/**
 * * 将数值限制在指定的最小值和最大值范围内
 *
 * @param {type.Vertex} input 包含数字范围的 Vertex 对象
 *
 * @param {number} value 用于测试的数值
 *
 * @returns {number} 限制后的数值, 确保在 [range.min, range.max] 区间内
 */
export function Clamp({ min, max }: type.VERTEX, value: number): number {
    return Math.max(min, Math.min(max, value));
};
/**
 * * 生成指定范围内的随机整数
 *
 * @param {number} min - 范围的最小值（包含在内）
 *
 * @param {number} max - 范围的最大值（包含在内）
 *
 * @returns {number} 返回 min 和 max 之间的一个随机整数, 包括 min 和 max
 */
export function RandomFloor(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
/**
 * * 生成一个在指定范围内的随机浮点数, 并保留指定的小数位数
 *
 * @param {number} min - 随机数范围的最小值（包含）
 *
 * @param {number} max - 随机数范围的最大值（包含）
 *
 * @param {number} length - 返回的浮点数的小数位数, 默认为2
 *
 * @returns {number} 在指定范围内的随机浮点数, 保留指定的小数位数
 */
export function RandomFloat(min: number, max: number, length: number = 2): number {
    return Number((Math.random() * (max - min) + min).toFixed(length));
};
/**
 * 触发控制组, 用于存储事件类型与触发时间的映射
 *
 * @type {Map<string, number>}
 */
const ControlGroup: Map<string, number> = new Map();
/**
 * 创建触发控制, 用于管理特定事件类型的触发频率
 *
 * 根据给定的事件类型、来源（实体或方块）和等待时间,
 *
 * 判断是否允许触发事件
 *
 * @param {string} [eventType] - 事件类型字符串
 *
 * @param {server.Entity | server.Block | Vector} [source] - 触发事件的来源, 可以是 实体 或 方块 或 Vector 对象
 *
 * @param {number} [waitTime] - 触发事件前的等待时间（游戏刻数）
 *
 * @returns {boolean} - 如果可以触发事件则返回 true, 否则返回 false
 */
export function TriggerControl(eventType: string, source: server.Entity | server.Block | Vector, waitTime: number = 20): boolean {
	/**
	 * 触发的事件的唯一标识符键
	 *
	 * @type {string}
	 */
	const key: string = `${eventType}:${getUniqueIdentifier(source)}`;
	/**
	 * 获取控制组中已存在的触发时间
	 *
	 * @type {number | undefined}
	 */
	const existingTriggerTime: number | undefined = ControlGroup.get(key);
	/*
	 * 如果不存在触发时间或当前游戏刻数大于等于触发时间
	 *
	 * 设置新的触发时间并返回 true
	 */
	if (existingTriggerTime === undefined || server.system.currentTick >= existingTriggerTime) {
		ControlGroup.set(key, server.system.currentTick + waitTime);
		return true;
	}
	// 否则返回 false
	return false;
};
/**
 * 获取来源对象的唯一标识符
 *
 * 如果来源是实体, 则返回实体的 ID
 *
 * 如果来源是方块, 则返回方块所在维度和位置的组合字符串
 *
 * @param {server.Entity | server.Block} [source] - 来源对象, 可以是实体或方块
 *
 * @returns {string} - 来源对象的唯一标识符
 */
function getUniqueIdentifier(source: server.Entity | server.Block | Vector): string {
	// 如果来源是实体, 则返回实体的 ID
	if (source instanceof server.Entity) return source.id;
	// 如果来源是方块, 则返回方块所在维度和位置的组合字符串
	else if (source instanceof server.Block) {
		/**
		 * * 维度标识符信息
		 *
		 * @type {string[]}
		 */
		const dimension: string[] = source.dimension.id.split(/:/);
		// 获取 方块位置与维度信息字符串
		return `${dimension[0]}.${Vector.toString(source)}.${dimension[1]}`;
	}
	// 如果来源是向量, 则返回向量字符串
	else if (source instanceof Vector) return source.toString();
	// 抛出错误
	throw new Error("不支持的源类型 -> 您应该指定实体或方块作为参数");
};