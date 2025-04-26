# Dream & BridgeProtocol 项目说明文档

---

## 📌 文件索引

- [< 开源许可 >](./LICENSE) 基于 CC BY-NC 4.0 的开源许可协议
- [< 编译入口 >](./THE_OTHER_SHORE.ts) 部署项目后的编译入口文件
- [< 打包发布 >](./scripts/package.js) 项目打包发布脚本
- [< 协议源码 >](./system/BridgeProtocol.ts) 统一推送协议源码

---

## 👥 开发团队

- **技术主导**：
  - 钛宇·星光阁（架构开发）
  - 游京秋惜༈༊（移植规划）
  - 月白清风（百科编纂）
  - aa剑侠（协议设计）

- **艺术创作**：
  - 野生的麻薯、苏海伦等（模型纹理）

- **测试优化**：
  - 四夕、月白清风等10+成员

![纳西妲](image/纳西妲_夜空.jpg)

---

## 🏰 Dream项目概览

### 📋 项目信息

| 项目要素       | 内容详情                  |
|----------------|--------------------------|
| **协议版本**   | v4.4.0-0.0.5            |
| **发布日期**   | 2025年4月23日          |
| **开发团队**   | [开发团队](./开发团队.md)       |
| **联系方式**   | QQ群：906314036 / 频道：pd14718782 |

### 🧱 核心架构

- JavaScript模块开源于[ THE_OTHER_SHORE:OPAl-Script ]
- 数据驱动系统开源于当前项目[ THE_OTHER_SHORE:Dream ]
- 真诚期待基岩版的模组社区, 可以逐步向 Java 版看齐
- 特此展开基岩版< 基建 >研究项目

![纳西妲](image/纳西妲_思考.jpg)

---

### 🔧 安装指南

#### ⚙️ 准备工作

1. **游戏版本**：安装最新正式/测试版Bedrock Edition
2. **代码获取**：下载本Git仓库至本地
3. **开发环境**：VS Code + NodeJS + NPM 环境配置

#### 🛠️ 编译步骤

```bash
# 开发模式编译（预览版）
npm run tsc_beta

# 生产模式编译（正式版本）
npm run tsc_pack
```

### 🚩 Dream未来规划

1. **模块化扩展**
   - 支持自定义参数配置的动态数据驱动系统
2. **玩法深化**
   - 新增可探索地图与结构化任务体系
3. **工业增强**
   - 魔导工业化流程优化与主题体验强化

---

## 📡 BridgeProtocol 通信协议

### 🔬 协议概述

- 基岩版标准数据交换协议, 提供：
  - 跨模组函数调用接口
  - 游戏对象序列化规范
  - 双工通讯拦截机制

#### 📊 版本信息

| 元素         | 内容          |
|--------------|---------------|
| **协议版本**   | v1.0.4.24.11.15 |
| **发布日期**   | 2024年11月14日 |
| **开发团队**   | [开发团队](./开发团队.md) |

![纳西妲](image/纳西妲_招手.jpg)

---

### 📦 核心组件说明

#### 🧮 数据类型定义

```typescript
// 支持的数据结构
type JSONValue = string | boolean | number | JSONObject | JSONArray;
interface GameObject {
  entity: Entity,
  block: Block,
  player: Player,
  dimension: Dimension,
  itemStack: ItemStack
}
```

#### 🎛️ 关键函数接口

- `exportFunction(func, name?)`：导出可调用方法
- `call(functionName, args)`：异步执行远程函数

---

### 💻 使用示例

#### 🧩 基础调用模式

```typescript
// 导出"打招呼"函数
bridge.exportFunction(
  (player) => player.sendMessage("你好, 世界！"),
  "sayHello"
);

// 调用端使用
bridge.call("sayHello", [玩家对象]);
```

#### 🏗️ 高级对象操作示例

```typescript
// 客户端1：定义向量类
class Vector2 extends RemoteCtrlObject {
  constructor(x: number, y: number) { super(); this.x = x; }
  public add(deltaX: number) { return new Vector2(this.x + deltaX); }
}

// 客户端2：远程调用与操作
const vec = await bridge.solve().newVector(1);
console.log(await vec.add(999).x); // 输出1000
```

---

### ⚙️ 技术细节说明

#### 🔄 数据转换工具

| 方法名               | 功能描述                     |
|----------------------|----------------------------|
| `dataToArray`        | 转换数据为JSON数组         |
| `blockToString`      | 方块对象转标准字符串表示   |

#### 🛡️ 拦截器使用场景

```typescript
// 函数调用前后处理
bridge.protocolInterceptors.onCalled = (func, params) => console.log("开始执行");
bridge.protocolInterceptors.onCalling = (result) => console.log(`结果：${result}`);
```

---

### 🌠 未来技术方向

1. **数据类型扩展**
   - 支持容器/物品堆等复杂对象传输
2. **通信优化**
   - 实现模组级调用优先级控制
3. **调试增强**
   - 添加调用链追踪与性能统计功能

---

### ⚠️ 注意事项

- 本协议仅定义通信规范, 具体功能需模组实现
- 推送系统负责数据传输, 不处理存储逻辑
- 跨端使用建议统一TypeScript版本

![纳西妲](image/纳西妲_跳跃.gif)
