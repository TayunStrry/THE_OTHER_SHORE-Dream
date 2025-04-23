import * as serverUI from '@minecraft/server-ui';
import * as server from '@minecraft/server';

/*
 * 原版接口
 */
/**
 * * 向量实例类
 */
class VectorCase {
    x;
    y;
    z;
    /**
     * 创建一个新的 Vector3 对象
     *
     * @param {number} x - 向量的 X 坐标
     *
     * @param {number} y - 向量的 Y 坐标
     *
     * @param {number} z - 向量的 Z 坐标
     */
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    ;
    /**
     * 比较当前 Vector3 对象与另一个 Vector3 对象是否相等
     *
     * @param {server.Vector3} sample - 要比较的 Vector3 对象
     *
     * @returns {boolean} 如果两个 Vector3 对象的 x、y 和 z 属性都相等, 则返回 true；否则返回 false
     */
    equals(sample) {
        return this.x === sample.x && this.y === sample.y && this.z === sample.z;
    }
    ;
    /**
     * 将当前 Vector3 对象与另一个 Vector3 对象相加
     *
     * @param {server.Vector3} sample - 要相加的 Vector3 对象
     *
     * @returns {Vector} 相加结果的新 Vector3 对象
     */
    add(sample) {
        return new Vector(sample.x + this.x, sample.y + this.y, sample.z + this.z);
    }
    ;
    /**
     * 返回当前 Vector3 对象的一个副本
     *
     * @returns {Vector} 当前 Vector3 对象的副本
     */
    get copy() {
        return this.add(Vector.CONSTANT_ZERO);
    }
    ;
    /**
     * 将当前 Vector3 对象的每个分量乘以一个标量
     *
     * @param {number} scale - 用于缩放的标量值
     *
     * @returns {Vector} 缩放后的新 Vector3 对象
     */
    multiply(scale) {
        return new Vector(this.x * scale, this.y * scale, this.z * scale);
    }
    ;
    /**
     * 从当前 Vector3 对象中减去另一个 Vector3 对象
     *
     * @param {server.Vector3} sample - 要减去的 Vector3 对象
     *
     * @returns {Vector} 减法结果的新 Vector3 对象
     */
    subtract(sample) {
        return new Vector(this.x - sample.x, this.y - sample.y, this.z - sample.z);
    }
    ;
    /**
     * 计算当前 Vector3 对象与另一个 Vector3 对象的点积
     *
     * @param {server.Vector3} sample - 要计算点积的 Vector3 对象
     *
     * @returns {number} 两个向量的点积结果
     */
    dot(sample) {
        return this.x * sample.x + this.y * sample.y + this.z * sample.z;
    }
    ;
    /**
     * 计算当前 Vector3 对象与另一个 Vector3 对象的叉积
     *
     * @param {server.Vector3} done - 要计算叉积的 Vector3 对象
     *
     * @returns {Vector} 两个向量的叉积结果
     */
    cross(done) {
        return new Vector(this.y * done.z - this.z * done.y, this.z * done.x - this.x * done.z, this.x * done.y - this.y * done.x);
    }
    ;
    /**
     * 将当前 Vector3 对象的每个分量除以一个标量
     *
     * @param {number} divisor - 用于除法的标量值
     *
     * @returns {Vector} 除法结果的新 Vector3 对象
     */
    division(divisor) {
        if (divisor === 0)
            return this;
        return new Vector(this.x / divisor, this.y / divisor, this.z / divisor);
    }
    ;
    /**
     * 获取当前 Vector3 对象的模（长度）
     *
     * @returns {number} 向量的模
     */
    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }
    ;
    /**
     * 计算当前 Vector3 对象与另一个 Vector3 对象之间的距离
     *
     * @param {server.Vector3} vector - 要计算距离的 Vector3 对象
     *
     * @returns {number} 两个向量之间的距离
     */
    distance(vector) {
        return Vector.magnitude(this.subtract(vector));
    }
    ;
    /**
     * 获取当前 Vector3 对象的单位向量
     *
     * @returns {Vector} 单位向量
     */
    get normalize() {
        const mag = this.magnitude;
        return new Vector(this.x / mag, this.y / mag, this.z / mag);
    }
    ;
    /**
     * 将当前 Vector3 对象的每个分量向下取整到指定的小数位数
     *
     * @param {number} decimals - 小数位数, 默认为 2
     *
     * @returns {Vector} 取整后的新 Vector3 对象
     */
    floor(decimals = 2) {
        /**
         * * 获取乘数
         */
        const multiplier = Math.pow(10, decimals);
        return new Vector(Math.floor(this.x * multiplier) / multiplier, Math.floor(this.y * multiplier) / multiplier, Math.floor(this.z * multiplier) / multiplier);
    }
    ;
    /**
     * 将当前 Vector3 对象转换为字符串
     *
     * @param {type.VECTOR_STRING_OPTIONS} [options] - 字符串化选项
     *
     * @returns {string} 向量的字符串表示
     */
    toString(options) {
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
        return components.join(delimiter);
    }
    ;
    /**
     * 将当前 Vector3 对象的每个分量限制在指定的范围内
     *
     * @param {type.VECTOR_LIMITS} [limits] - 包含最小值和最大值的对象
     *
     * @returns {Vector} 限制后的向量
     */
    clamp(limits) {
        return new Vector(Clamp({ min: limits?.min?.x ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.x ?? Number.MAX_SAFE_INTEGER }, this.x), Clamp({ min: limits?.min?.y ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.y ?? Number.MAX_SAFE_INTEGER }, this.y), Clamp({ min: limits?.min?.z ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.z ?? Number.MAX_SAFE_INTEGER }, this.z));
    }
    ;
    /**
     * 在当前 Vector3 对象和另一个 Vector3 对象之间随机生成一个向量
     *
     * @param {server.Vector3} done - 另一个 Vector3 对象
     *
     * @returns {Vector} 随机生成的向量
     */
    random(done) {
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
        return new Vector(RandomFloat(min.x, max.x), RandomFloat(min.y, max.y), RandomFloat(min.z, max.z));
    }
    ;
    /**
     * 计算当前 Vector3 对象与另一个 Vector3 对象之间的归一化差向量
     *
     * @param {Vector} done - 另一个 Vector3 对象
     *
     * @returns {Vector} 归一化后的差向量
     */
    difference(done) {
        /**
         * 计算差向量
         */
        const direction = done.subtract(this);
        return Vector.normalize(direction);
    }
    ;
}
/**
 * * 向量常量类
 */
class VectorConstant extends VectorCase {
    /**
     * 常量: 0.5 向量
     * 返回一个所有分量都为 0.5 的向量
     */
    static get CONSTANT_HALF() { return new Vector(0.5, 0.5, 0.5); }
    ;
    /**
     * 常量: 0 向量
     * 返回一个所有分量都为 0 的向量
     */
    static get CONSTANT_ZERO() { return new Vector(0, 0, 0); }
    ;
    /**
     * 常量: 向上单位向量
     * 返回一个 y 分量为 1, 其余分量为 0 的向上单位向量
     */
    static get CONSTANT_UP() { return new Vector(0, 1, 0); }
    ;
    /**
     * 常量: 向下单位向量
     * 返回一个 y 分量为 -1, 其余分量为 0 的向下单位向量
     */
    static get CONSTANT_DOWN() { return new Vector(0, -1, 0); }
    ;
    /**
     * 常量: 正一向量
     * 返回一个所有分量都是 1 的单位向量
     */
    static get CONSTANT_ONE() { return new Vector(1, 1, 1); }
    ;
    /**
     * 常量: 负一向量
     * 返回一个所有分量都是 -1 的单位向量
     */
    static get CONSTANT_LOSS_ONE() { return new Vector(-1, -1, -1); }
    ;
    /**
     * 常量: 西方向单位向量
     * 返回一个 x 分量为 -1, 其余分量为 0 的向西方向单位向量
     */
    static get CONSTANT_WEST() { return new Vector(-1, 0, 0); }
    ;
    /**
     * 常量: 东方向单位向量
     * 返回一个 x 分量为 1, 其余分量为 0 的向东方向单位向量
     */
    static get CONSTANT_EAST() { return new Vector(1, 0, 0); }
    ;
    /**
     * 常量: 北方向单位向量
     * 返回一个 z 分量为 1, 其余分量为 0 的向北方向单位向量
     */
    static get CONSTANT_SOUTH() { return new Vector(0, 0, 1); }
    ;
    /**
     * 常量: 南方向单位向量
     * 返回一个 z 分量为 -1, 其余分量为 0 的向南方向单位向量
     */
    static get CONSTANT_NORTH() { return new Vector(0, 0, -1); }
    ;
    /**
     * 常量: 水平方向单位向量数组
     * 包含四个水平方向（北、南、东、西）的单位向量
     */
    static get CONSTANT_HORIZONTAL() {
        return [
            Vector.CONSTANT_NORTH,
            Vector.CONSTANT_SOUTH,
            Vector.CONSTANT_EAST,
            Vector.CONSTANT_WEST
        ];
    }
    ;
    /**
     * 常量: 垂直方向单位向量数组
     * 包含两个垂直方向（上、下）的单位向量
     */
    static get CONSTANT_VERTICAL() {
        return [
            Vector.CONSTANT_DOWN,
            Vector.CONSTANT_UP,
        ];
    }
    ;
    /**
     * 常量: 所有方向单位向量数组
     * 包含所有方向（垂直和水平）的单位向量
     */
    static get CONSTANT_ALL() {
        return [
            ...Vector.CONSTANT_VERTICAL,
            ...Vector.CONSTANT_HORIZONTAL,
        ];
    }
    ;
    /**
     * 常量: 向下及水平方向单位向量数组
     * 包含向下方向（下）和所有水平方向（北、南、东、西）的单位向量
     */
    static get CONSTANT_DOWN_HORIZONTAL() {
        return [
            Vector.CONSTANT_DOWN,
            ...Vector.CONSTANT_HORIZONTAL,
        ];
    }
    ;
}
/**
 * * 向量工具类
 */
class Vector extends VectorConstant {
    /**
     * 转换向量对象类型
     *
     * @param vector - 输入纯粹的向量对象
     */
    static create(vector) {
        return new Vector(vector.x, vector.y, vector.z);
    }
    ;
    /**
     * 生成立方体阵列向量数组
     *
     * @param scope 向量坐标的范围大小（非负整数）
     *
     * @returns {Vector[]} 立方体阵列向量数组, 包含所有可能的 (x, y, z) 组合, 其中每个坐标值都在 [-scope, +scope] 范围内
     */
    static createCubeLattice(scope) {
        /**
         * 计算立方体的边长, 范围为 [-scope, +scope], 因此边长为 2 * scope + 1
         */
        const size = 2 * scope + 1;
        /**
         * 存储生成的向量数组
         */
        const vectors = [];
        // 遍历所有可能的坐标组合
        for (let i = 0; i < size ** 3; i++) {
            /**
             * 计算 x 坐标：通过整数除法和取模运算确定 x 的值
             */
            const x = -scope + Math.floor(i / (size ** 2)) % size;
            /**
             * 计算 y 坐标：通过整数除法和取模运算确定 y 的值
             */
            const y = -scope + Math.floor((i / size) % size);
            /**
             * 计算 z 坐标：通过取模运算确定 z 的值
             */
            const z = -scope + i % size;
            // 将计算出的坐标封装为 Vector 对象并添加到数组中
            vectors.push(new Vector(x, y, z));
        }
        // 返回生成的向量数组
        return vectors;
    }
    ;
    /**
     * * 判断向量是否相同
     *
     * @param {server.Vector3} start - 向量对象
     *
     * @param {server.Vector3} done - 向量对象
     *
     * @returns {boolean} - 判断向量是否相同
     */
    static equals(start, done) {
        return start.x === done.x && start.y === done.y && start.z === done.z;
    }
    ;
    /**
     * * 向量相加
     *
     * @param {server.Vector3} start - 向量对象
     *
     * @param {server.Vector3} done - 向量对象
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static add(start, done) {
        return new Vector(start.x + done.x, start.y + done.y, start.z + done.z);
    }
    ;
    /**
     * * 拷贝向量
     *
     * @param {server.Vector3} vector - 向量对象
     *
     * @returns {server.Vector3} - 拷贝后的向量对象
     */
    static copy(vector) {
        return this.add(vector, this.CONSTANT_ZERO);
    }
    ;
    /**
     * * 向量相减
     *
     * @param {server.Vector3} start - 向量对象
     *
     * @param {server.Vector3} done - 向量对象
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static subtract(start, done) {
        return new Vector(start.x - done.x, start.y - done.y, start.z - done.z);
    }
    ;
    /**
     * 将 Vector3 对象的每个分量乘以一个标量
     *
     * @param {server.Vector3} vector - 向量对象
     *
     * @param {number} scale - 缩放值
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static multiply(vector, scale) {
        return new Vector(vector.x * scale, vector.y * scale, vector.z * scale);
    }
    ;
    /**
     * * 向量点积值
     *
     * @param {server.Vector3} start - 向量对象
     *
     * @param {server.Vector3} done - 向量对象
     *
     * @returns {number} - 两个向量的点积值
     */
    static dot(start, done) {
        return start.x * done.x + start.y * done.y + start.z * done.z;
    }
    ;
    /**
     * * 向量叉积
     *
     * @param {server.Vector3} start - 向量对象
     *
     * @param {server.Vector3} done - 向量对象
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static cross(start, done) {
        return new Vector(start.y * done.z - start.z * done.y, start.z * done.x - start.x * done.z, start.x * done.y - start.y * done.x);
    }
    ;
    /**
     * * 向量除法
     *
     * @param {server.Vector3} vector - 向量对象
     *
     * @param {number} divisor - 除数
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static division(vector, divisor) {
        if (divisor === 0)
            return new Vector(vector.x, vector.y, vector.z);
        return new Vector(vector.x / divisor, vector.y / divisor, vector.z / divisor);
    }
    ;
    /**
     * * 向量模长值
     *
     * @param {server.Vector3} vector - 向量对象
     *
     * @returns {number} - 两个向量的模长
     */
    static magnitude(vector) {
        return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
    }
    ;
    /**
     * * 向量距离值
     *
     * @param {server.Vector3} start - 向量对象
     *
     * @param {server.Vector3} done - 向量对象
     *
     * @returns {number} - 两个向量间的距离
     */
    static distance(start, done) {
        return this.magnitude(this.subtract(start, done));
    }
    ;
    /**
     * * 向量归一化
     *
     * @param {server.Vector3} vector - 向量对象
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static normalize(vector) {
        /**
         * * 计算向量模长
         */
        const mag = this.magnitude(vector);
        return new Vector(vector.x / mag, vector.y / mag, vector.z / mag);
    }
    ;
    /**
     * * 向量取整
     *
     * @param {server.Vector3} vector - 向量对象
     *
     * @param {number} decimals - 小数位数
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static floor(vector, decimals = 2) {
        /**
         * * 获取乘数
         */
        const multiplier = Math.pow(10, decimals);
        return new Vector(Math.floor(vector.x * multiplier) / multiplier, Math.floor(vector.y * multiplier) / multiplier, Math.floor(vector.z * multiplier) / multiplier);
    }
    ;
    /**
     * * 向量转字符串
     *
     * @param {server.Vector3 | server.Vector2} vector - 向量对象
     *
     * @param {VECTOR_STRING_OPTIONS} options - 参数设置
     *
     * @returns {string} - 向量字符串
     */
    static toString(vector, options) {
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
    }
    ;
    /**
     * * 向量范围限制
     *
     * @param {server.Vector3} vector - 向量对象
     *
     * @param {VECTOR_LIMITS} limits - 范围限制
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static clamp(vector, limits) {
        return new Vector(Clamp({ min: limits?.min?.x ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.x ?? Number.MAX_SAFE_INTEGER }, vector.x), Clamp({ min: limits?.min?.y ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.y ?? Number.MAX_SAFE_INTEGER }, vector.y), Clamp({ min: limits?.min?.z ?? Number.MIN_SAFE_INTEGER, max: limits?.max?.z ?? Number.MAX_SAFE_INTEGER }, vector.z));
    }
    ;
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
    static lerp(start, done, time) {
        return new Vector(start.x + (done.x - start.x) * time, start.y + (done.y - start.y) * time, start.z + (done.z - start.z) * time);
    }
    ;
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
    static slerp(start, done, time) {
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
        if (Math.abs(angleSin) < Number.EPSILON)
            return start;
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
    }
    ;
    /**
     * * 范围内的随机向量
     *
     * @param {server.Vector3} start - 向量对象
     *
     * @param {server.Vector3} done - 向量对象
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static random(start, done) {
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
        return new Vector(RandomFloat(min.x, max.x), RandomFloat(min.y, max.y), RandomFloat(min.z, max.z));
    }
    ;
    /**
     * 在指定位置和维度内随机获取最高块的中心坐标
     *
     * @param {type.LOCATION_AND_DIMENSION} source - 包含位置和维度的对象
     *
     * @param {number} [range=8] - 随机偏移的范围, 默认值为8
     *
     * @returns {server.Vector3} 返回最高块的中心坐标, 如果无法找到最高块, 则返回源位置
     */
    static randomTopmostBlock(source, range = 8) {
        /**
         * * 随机偏移坐标
         */
        const offset = Vector.add(source.location, { x: RandomFloor(-range, range), y: 0, z: RandomFloor(-range, range) });
        // 输出 随机有效坐标
        return source.dimension.getTopmostBlock(offset)?.above(1)?.center() ?? source.location;
    }
    ;
    /**
     * * 计算 向量空间 的 差向量 并 归一化
     *
     * @param {server.Vector3} start - 向量对象
     *
     * @param {server.Vector3} done - 向量对象
     *
     * @returns {server.Vector3} - 计算后的向量对象
     */
    static difference(start, done) {
        /**
         * * 计算 两个向量 的 基本向量
         */
        const direction = this.subtract(done, start);
        // 返回 归一化后 的 差向量
        return this.normalize(direction);
    }
    ;
    /**
     * * 基于 实体旋转 获取 指向信息 的 3轴矢量
     *
     * @param {server.Vector2} rotate - 实体旋转的 2轴矢量
     */
    static AngleToPlace(rotate) {
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
    }
    ;
    /**
     * 将三维方向向量转换为实体旋转角度（基于Minecraft坐标系规则）
     *
     * @param {server.Vector3} direction - 标准化后的三维方向向量
     *
     * @returns {server.Vector2} 实体旋转角度（pitch/x轴, yaw/y轴）
     */
    static Vector3ToAngle(direction) {
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
    }
    ;
    /**
     * * 计算 目标方向相关 的 方向向量集
     *
     * @param {server.Vector3} front - 前方 方向向量
     *
     * @returns {VECTOR_DIRECTIONS} - 包含计算出的方向向量的对象
     */
    static directions(front) {
        /**
         * * 定义 常量 向量
         */
        const sample = this.CONSTANT_UP;
        /**
         * * 后方 方向向量
         */
        const back = this.normalize(this.multiply(front, -1));
        /**
         * * 右方 方向向量
         */
        const right = this.normalize(this.cross(front, sample));
        /**
         * * 左方 方向向量
         */
        const left = this.normalize(this.multiply(right, -1));
        /**
         * * 下方 方向向量
         */
        const down = this.normalize(this.cross(front, right));
        /**
         * * 上方 方向向量
         */
        const above = this.normalize(this.multiply(down, -1));
        // 返回计算结果
        return { front, back, left, right, above, down };
    }
    ;
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
    static relativeOffset(source, front, offset) {
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
    }
    ;
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
    static calculateLeadVelocity(posA, posB, speedA, velB) {
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
        if (magVaBA <= 0)
            return perpCompVa;
        /**
         * * 计算 A 发射的直线弹射物的速度向量
         */
        const vaAlongBA = this.multiply(normVecBA, -magVaBA);
        // 计算最终的速度向量（A的发射速度）
        return this.add(perpCompVa, vaAlongBA);
    }
    ;
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
    static chunkLocation(vector, Yzero = true, size = 16) {
        /**
         * * 计算 Y轴 的值
         */
        const y = Yzero ? 0 : vector.y;
        // 返回计算结果
        return new Vector(Math.floor(vector.x / size) * size, y, Math.floor(vector.z / size) * size);
    }
    ;
}
/**
 * * 基于 数据范围 输出钳位值
 *
 * @param {type.Vertex} input 包含数字范围的 Vertex 对象
 *
 * @param {number} test 用于测试的数值
 *
 * @returns {number} 输出的钳位值
 */
function Clamp(input, test) {
    return Math.max(input.min, Math.min(input.max, test));
}
/**
 * * 生成指定范围内的随机整数
 *
 * @param {number} min - 范围的最小值（包含在内）
 *
 * @param {number} max - 范围的最大值（包含在内）
 *
 * @returns {number} 返回 min 和 max 之间的一个随机整数, 包括 min 和 max
 */
function RandomFloor(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
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
function RandomFloat(min, max, length = 2) {
    return Number((Math.random() * (max - min) + min).toFixed(length));
}

/*
 * 原版接口
 */
/**
 * 触发控制组, 用于存储事件类型与触发时间的映射
 *
 * @type {Map<string, number>}
 */
const ControlGroup = new Map();
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
function getUniqueIdentifier(source) {
    // 如果来源是实体, 则返回实体的 ID
    if (source instanceof server.Entity)
        return source.id;
    // 如果来源是方块, 则返回方块所在维度和位置的组合字符串
    else if (source instanceof server.Block) {
        /**
         * * 维度标识符信息
         *
         * @type {string[]}
         */
        const dimension = source.dimension.id.split(/:/);
        // 获取 方块位置与维度信息字符串
        return `${dimension[0]}.${Vector.toString(source)}.${dimension[1]}`;
    }
    // 如果来源是向量, 则返回向量字符串
    else if (source instanceof Vector)
        return source.toString();
    // 抛出错误
    throw new Error("不支持的源类型 -> 您应该指定实体或方块作为参数");
}
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
function TriggerControl(eventType, source, waitTime = 20) {
    /**
     * 触发的事件的唯一标识符键
     *
     * @type {string}
     */
    const key = `${eventType}:${getUniqueIdentifier(source)}`;
    /**
     * 获取控制组中已存在的触发时间
     *
     * @type {number | undefined}
     */
    const existingTriggerTime = ControlGroup.get(key);
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
}

/*
 * 原版接口
 */
/**
 * * 尝试生成 掉落物
 *
 * @param {server.Dimension} dimension - 生成 掉落物 的维度
 *
 * @param {string} item - 生成 掉落物 的 物品对象
 *
 * @param {server.Vector3} location - 生成 掉落物 的位置
 *
 * @returns {Error | void} - 如果出现错误, 则返回错误对象, 否则返回 undefined
 */
function TrySpawnItem(dimension, item, location) {
    try {
        return dimension.spawnItem(item, location);
    }
    catch (error) {
        return error instanceof Error ? error : new Error(String(error));
    }
}

/*
 * 原版接口
 */
// 玩家加入服务器时发送提示信息
server.world.afterEvents.playerJoin.subscribe(async (event) => {
    await server.system.waitTicks(RandomFloor(200, 400));
    server.world.getEntity(event.playerId).sendMessage('[§v 琉璃 §r]: 拿着<§a 挖掘工具 §r>点击<§v 任意按钮 §r>后, 即可开启<§9 轻量连锁 §r>的控制界面哦～');
});
// 玩家破坏方块后触发主进程
server.world.afterEvents.playerBreakBlock.subscribe(event => lightweightChainMining(event.player, event.block, event.brokenBlockPermutation, event.itemStackBeforeBreak));
// 玩家点击按钮后触发控制界面
server.world.afterEvents.buttonPush.subscribe(event => {
    /**
     * 获取触发事件的实体
     */
    const source = event.source;
    // 判断点击按钮的是否是玩家
    if (source instanceof server.Player)
        CreateControlInterface(source);
});
/**
 * 轻量级连锁挖掘函数, 用于从起始方块开始挖掘与其类型相同的相邻方块
 *
 * 挖掘操作会持续进行, 直到达到指定的最大挖掘数量或工具耐久耗尽
 *
 * @param {server.Player} player - 执行挖掘操作的玩家对象
 *
 * @param {server.Block} startBlock - 开始挖掘的起始方块
 *
 * @param {server.BlockPermutation} blockPermutation - 方块的排列组合信息, 用于比较方块类型
 *
 * @param {server.ItemStack} [tool] - 用于挖掘的工具, 必须有 'minecraft:digger' 标签
 */
async function lightweightChainMining(player, startBlock, blockPermutation, tool) {
    // 校验工具和玩家状态
    if (!tool || (!tool.hasTag('minecraft:digger') && !tool.hasTag('minecraft:is_shears')))
        return;
    // 检查玩家是否拥有'lightweight_chain_mining'属性
    if (!player.getDynamicProperty('lightweight_chain_mining'))
        return;
    // 检查玩家是否处于潜行状态
    if (!player.isSneaking)
        return;
    // 触发挖掘判定, 由外部定义的控制函数决定是否允许挖掘
    if (!TriggerControl('轻量连锁_挖掘判定', player))
        return;
    /**
     * 获取工具的耐久度组件
     */
    const durabilityComponent = tool.getComponent('minecraft:durability');
    if (!durabilityComponent)
        return;
    /**
     * 获取玩家背包容器
     */
    const playerContainer = player.getComponent('minecraft:inventory')?.container;
    if (!playerContainer)
        return;
    /**
     * 获取工具的附魔信息
     */
    const enchantments = tool.getComponent('minecraft:enchantable')?.getEnchantments().map(e => e.type.id);
    if (!enchantments)
        return;
    /**
     * 最大连锁数量
     */
    const maxNumber = player.getDynamicProperty('max_chain_mining');
    /**
     * 是否启用 木桶缓存机制
     */
    const bucketCache = player.getDynamicProperty('bucket_cache');
    /**
     * 附加功能
     */
    const additionalFeatures = tool.hasTag('minecraft:is_shears') || enchantments.includes('silk_touch') ? 1 : enchantments.includes('fortune') ? 2 : 0;
    /**
     * 定义一个函数, 根据方块类型返回可挖掘的相邻方向
     *
     * @param permutation - 方块排列组合信息
     *
     * @returns - 可挖掘的相邻方向向量数组
     */
    function getMovableDirections(permutation) {
        switch (permutation.type.id) {
            case 'minecraft:grass_block':
            case 'minecraft:coarse_dirt':
            case 'minecraft:mycelium':
            case 'minecraft:podzol':
            case 'minecraft:stone':
            case 'minecraft:dirt':
                return Vector.CONSTANT_HORIZONTAL; // 水平方向
            default:
                return Vector.CONSTANT_ALL; // 六个方向
        }
    }
    /**
     * 获取初始块的可挖掘方向
     */
    const directions = getMovableDirections(blockPermutation);
    /**
     * 初始化队列, 用于管理待处理方块, 采用数组实现队列结构
     */
    const blocksToMine = [startBlock];
    /**
     * 记录已挖掘方块的数量, 默认为 0 开始
     */
    let minedCount = 0;
    /**
     * 获取当前操作的维度
     */
    const blockDimension = startBlock.dimension;
    /**
     * 创建一个映射表, 用于将特定方块类型映射为对应的方块类型
     */
    const blcokMapping = new Map([
        ['minecraft:lit_deepslate_redstone_ore', 'redstone_ore'],
        ['minecraft:deepslate_redstone_ore', 'redstone_ore'],
        ['minecraft:lit_redstone_ore', 'redstone_ore'],
        ['minecraft:redstone_ore', 'redstone_ore'],
    ]);
    // 开始循环处理, 直到队列为空或达到最大数量或工具损坏
    while (blocksToMine.length > 0 && minedCount < maxNumber) {
        // 如果达到了最大挖掘数量或工具损坏, 则跳出循环停止挖掘
        if (minedCount >= maxNumber || durabilityComponent.damage >= durabilityComponent.maxDurability - 6)
            break;
        /**
         * 从队列 'blocksToMine' 中移除第一个方块, 并将其赋值给变量 'currentBlock'
         *
         * 使用 shift() 方法实现先进先出（FIFO）的行为, 确保按顺序处理相邻方块
         */
        const currentBlock = blocksToMine.shift();
        // 如果当前方块不存在, 则跳出循环
        if (!currentBlock)
            break;
        // 处理当前方块周围的相邻方块, 根据可挖掘方向数组进行检查
        for (const direction of directions) {
            /**
             *  检查相邻块是否存在, 并且类型是否与目标类型相同
             */
            const adjacentBlock = currentBlock.offset(direction);
			// 如果相邻块不存在
			if (!adjacentBlock || !adjacentBlock.isValid) continue;
			/**
			 * 目标方块的识别类型标签映射
			 */
			const targetID = blcokMapping.get(adjacentBlock.typeId) || adjacentBlock.typeId;
			/**
			 * 原始方块的识别类型标签映射
			 */
			const protoID = blcokMapping.get(blockPermutation.type.id) || blockPermutation.type.id;
			// 如果相邻块的类型与目标类型不同, 则跳过该相邻块
			if (targetID !== protoID) continue;
            // 填充命令, 将相邻方块替换为空气, 达到挖掘效果
            if (additionalFeatures !== 1)
                blockDimension.runCommand(`fill ${adjacentBlock.x} ${adjacentBlock.y} ${adjacentBlock.z} ${adjacentBlock.x} ${adjacentBlock.y} ${adjacentBlock.z} air destroy`);
            // 精准采集效果
            else if (additionalFeatures == 1) {
                // 尝试将方块作为掉落物进行掉落
                TrySpawnItem(blockDimension, new server.ItemStack(adjacentBlock.typeId), adjacentBlock.bottomCenter());
                // 拆除被选中的方块
                adjacentBlock.setType('minecraft:air');
            }
            // 时运效果(暂时禁用)
            else if (additionalFeatures == 2) {
                /**
                 * 获取相邻方块上方的实体, 并尝试将其作为掉落物进行掉落
                 */
                const options = {
                    location: adjacentBlock.bottomCenter(),
                    maxDistance: 2,
                    closest: 1,
                    type: 'minecraft:item'
                };
                // 拆除被选中的方块
                blockDimension.runCommand(`fill ${adjacentBlock.x} ${adjacentBlock.y} ${adjacentBlock.z} ${adjacentBlock.x} ${adjacentBlock.y} ${adjacentBlock.z} air destroy`);
                // 等待 1 tick
                await server.system.waitTicks(1);
                // 生成额外的掉落物
                if (Math.random() >= 0.75)
                    blockDimension
                        .getEntities(options)
                        .map(item => item.getComponent('minecraft:item')?.itemStack)
                        .forEach(item => item ? TrySpawnItem(blockDimension, new server.ItemStack(item.typeId), adjacentBlock.bottomCenter()) : undefined);
            }
            // 将该被挖掘的方块加入队列, 以便继续处理其周围的相邻方块
            blocksToMine.push(adjacentBlock);
            // 损耗工具耐久度
            durabilityComponent.damage += 1;
            // 更新背包中的工具状态
            playerContainer.setItem(player.selectedSlotIndex, tool);
            // 累计已挖掘的方块数量
            minedCount++;
        }
    }
    /**
     * 掉落物实体的查询条件
     */
    const itemOptions = {
        location: startBlock.location,
        type: "minecraft:item",
        maxDistance: Clamp({ max: 256, min: 2 }, minedCount * 2)
    };
    /**
     * 经验球实体的查询条件
     */
    const expOptions = {
        location: startBlock.location,
        type: "minecraft:xp_orb",
        maxDistance: Clamp({ max: 256, min: 2 }, minedCount * 2)
    };
    /**
     * 获取范围内掉 落物实体 与 经验球实体
     */
    const entities = [...blockDimension.getEntities(itemOptions), ...blockDimension.getEntities(expOptions)];
    // 遍历掉落物和经验球, 根据 bucketCache 的值进行处理
    entities.forEach(entity => {
        // 判断是否开启桶缓存
        if (!bucketCache)
            return entity.teleport(player.getHeadLocation(), { dimension: player.dimension });
        /**
         * 获取掉落物 的 物品组件
         */
        const item = entity.getComponent('minecraft:item')?.itemStack;
        // 判断是否存在物品对象
        if (!item)
            return;
        // 判断玩家背包是否有空间
        if (playerContainer.emptySlotsCount > 1)
            playerContainer.addItem(item);
        // 如果玩家背包已满, 生成一个木桶来放置掉落物
        else if (playerContainer.emptySlotsCount <= 1 && !startBlock?.getComponent('minecraft:inventory')) {
            startBlock?.setPermutation(server.BlockPermutation.resolve('minecraft:barrel'));
            startBlock?.getComponent('minecraft:inventory')?.container?.addItem(item);
        }
        // 如果玩家背包已满且存在一个木桶, 则将掉落物放入木桶中
        else
            startBlock?.getComponent('minecraft:inventory')?.container?.addItem(item);
        // 删除掉落物
        entity.remove();
    });
    // 循环结束后, 将剩余的耐久度更新, 并将工具放回背包
    playerContainer.setItem(player.selectedSlotIndex, tool);
}
/**
 * * 创建 轻量连锁 控制界面
 *
 * @param {server.Player} player - 触发控制界面的玩家
 */
function CreateControlInterface(player) {
    /**
     * 获取玩家选中的道具
     */
    const item = player.getComponent('minecraft:inventory')?.container?.getItem(player.selectedSlotIndex);
    /**
     * 获取玩家选中的道具的文本
     */
    const texts = [
        { text: '是否开启: 潜行时触发< 轻量连锁 >机制' },
        {
            rawtext: [
                { text: '启用< 木桶缓冲 >机制\n' },
                { text: '如果背包空间不足\n' },
                { text: '将生成一个木桶\n' },
                { text: '存储多余的物品\n' },
                { text: '超出木桶容积的部分, 将直接消失\n' },
                { text: '++++++++++++++++++++' },
            ]
        },
        {
            text: '§v最大连锁数量§r'
        }
    ];
    // 检查工具是否有效且具有 'digger' 标签
    if (!item || !item.hasTag('minecraft:digger'))
        return;
    /**
     * 创建一个模态窗口, 用于获取玩家输入
     */
    const display = new serverUI.ModalFormData().title(player.nameTag).toggle(texts[0], false).toggle(texts[1], true).slider(texts[2], 10, 1000, 10, 500);
    // 显示窗口并等待玩家输入
    display.show(player).then(result => {
        if (result.canceled || !result.formValues)
            return;
        player.setDynamicProperty('lightweight_chain_mining', result.formValues[0]);
        player.setDynamicProperty('bucket_cache', result.formValues[1]);
        player.setDynamicProperty('max_chain_mining', result.formValues[2]);
    });
}
