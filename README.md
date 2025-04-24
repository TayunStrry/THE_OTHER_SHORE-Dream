# THE_OTHER_SHORE:Dream

[< English >](./README.en.md)
[< 编译时入口文件 >](./THE_OTHER_SHORE.ts)
[< preRelease TS源码 >](./scripts/pre_release.js.ts)
[< BridgeProtocol TS源码 >](./system/BridgeProtocol.ts)

## Dream介绍

- 项目中的 JavaScript 模块 中开源于 <THE_OTHER_SHORE:OPAl-Script>
- 项目中的 数据驱动模块 中开源于 <THE_OTHER_SHORE:Dream>
- 真诚期待基岩版的模组社区，可以逐步向 Java 版看齐
- 特此展开基岩版< 基建 >研究项目

![Naxiatu Thinking](静态_纳西妲.jpg)

## Dream安装教程

- **购买并安装 minecraft Bedrock 的最新< 正式版 >与< 测试版 >**
- **下载并放置本git仓库的代码数据**
- **在 Visual Studio Code 中下载并安装 npm | NodeJS | TSC**
- **尝试进行 TS 脚本编译** : 在终端中输入：

```bash
## 使用预览版时, 使用以下命令进行编译：
npm run compile

## 使用正式版时, 使用以下命令进行编译：
npm run compile_stability
```

## Dream基本信息

- **协议版本**：v4.4.0-0.0.5
- **发布日期**：2025-04-23
- **开发团队**：
  - 钛宇·星光阁 <所有者, 开发, 优化>
  - 月白清风 <运营, 测试, 优化>
  - 游京秋惜༈༊ <开发, 移植, 优化>
  - 野生的麻薯 <模型, 纹理, 建筑>
  - 苏海伦 <模型, 纹理, 建筑>
  - 夜莺 <模型, 纹理, 建筑>
  - Ao <模型, 纹理, 建筑>
  - 大尺寸欧芹 <测试, 改进>
  - 隐墨·星尘 <测试, 改进>
  - 万古长风 <测试, 改进>
  - 心狐紫焰 <测试, 改进>
  - 黔中极客 <测试, 改进>
  - 昵称是蛤 <测试, 改进>
  - Sakura <测试, 改进>
  - 兵解掀 <测试, 改进>
  - 但均享 <测试, 改进>
  - 四夕 <测试, 创意设计>
  - 稽 <测试, 改进>
- **联系方式**：
  - QQ: 1965304849
  - QQ群: 906314036
  - QQ频道: pd14718782

## Dream未来方向

- **更多数据驱动模块化设计**：便于玩家更方便自定义与修饰模组功能参数
- **更多的地图与结构玩法**：提高可玩性, 增加更多的游戏趣味
- **更多的优化与工业模块**：深化魔导工业的开发与优化, 加强主题玩法的游戏体验

![蹦蹦跳跳的纳西妲](动态_纳西妲.gif)

## BridgeProtocol介绍

- 统一推送协议（以下简称“协议”）是一个为基岩版游戏设计的通信协议, 旨在标准化多个模组包之间的数据交换。
- 该协议提供了一套灵活的接口, 允许开发者轻松集成和扩展功能, 实现模块化的数据推送。

## BridgeProtocol基本信息

- **协议版本**：v1.0.4.24.11.15

- **架构作者**：aa剑侠

- **协议作者**：钛宇-星光阁

- **发布日期**：2024-11-14

- **联系方式**：
  - QQ: 1965304849
  - QQ群: 906314036
  - QQ频道: pd14718782

### 数据类型定义

- **JSON值类型（JSONValue）**：支持字符串、布尔值、数字、JSON对象、JSON数组。
- **JSON对象（JSONObject）**：键值对集合, 值可以是任何JSON值类型。
- **JSON数组（JSONArray）**：JSON值类型的数组。
- **游戏对象类型（GameObject）**：包括实体、方块、玩家、维度或物品堆。
- **传输数据类型（TransmissionDataType）**：支持JSON值、游戏对象及其数组。

### 函数定义

- **导出函数类型（ExportFunctionType）**：接受TransmissionDataType参数, 返回TransmissionDataType值的函数。

### 事件监听器

- **事件监听器接口（EventListener）**：用于订阅和取消事件监听。

### 脚本消息

- **脚本消息接口（ScriptMessage）**：标准化脚本执行时的消息格式。

### 功能实现

- **协议拦截器类（ProtocolInterceptors）**：处理函数调用前后的自定义逻辑。
- **统一推送协议（BridgeProtocol）**：核心类, 管理项目标识符、函数列表、拦截器和描述信息。

### 辅助函数

- **事件获取器（eventGetter）**：创建Promise, 等待指定事件发生。
- **随机整数生成器（randomFloor）**：生成指定范围内的随机整数。
- **简化序列号生成器（BriefID）**：基于时间戳和随机数生成序列号。

![Naxiatu Thinking](静态_纳西妲.jpg)

## BridgeProtocol注意事项

- 本系统仅为协议, 不涉及具体功能实现。
- 各项功能应由各个模组独立实现。
- 推送系统仅作为数据推送的载体, 不涉及数据处理和存储。

## BridgeProtocol使用说明

- **导出函数**: 添加/更新功能：通过`exportFunction`方法将函数添加或更新到功能列表。

- **调用函数**: 异步调用：使用`call`方法异步调用函数, 并等待结果。

- **数据转换**: 数据转换函数：包括`dataToArray`、`dataToTransmitString`、`typeConversion`等, 用于将服务器脚本事件命令消息转换为适合传输的数据类型。

- **字符串表示**: 游戏对象字符串表示：包括`blockToString`、`entityToString`、`dimensionToString`等, 用于将游戏对象转换为字符串形式。

## BridgeProtocol使用示例

- **创建协议实例**:

```typescript
const bridge = new BridgeProtocol();
```

- **导出模块函数**:

```typescript
< 格式 >
bridge.exportFunction(myFunction, "myFunctionName");
bridge.exportFunction(myFunction);

bridge.exportFunctions=[myFunction, "myFunctionName"];
bridge.exportFunctions=[myFunction];

bridge.exportFunctions=[
    [myFunction, "myFunctionName"],
    [myFunction, "myFunctionName"],
];
bridge.exportFunctions=[
    [myFunction],
    [myFunction],
];

< 案例 >
bridge.exportFunction((player: server.Player)=>{ player.sendMessage("Hello, World!"); }, "sayHello");
```

- **调用模块函数**:

```typescript
< 格式 >
bridge.call("myFunctionName", [arg1, arg2]);

< 案例 >
bridge.call("sayHello", [player]);
```

- **使用协议拦截器**:

```typescript
bridge.protocolInterceptors.onCalled(func, functionName, parameters);
bridge.protocolInterceptors.onCalling(callback, functionName, parameters);
```

- **基于类dts方案的多端调用**:

```typescript
//端1
function client1() {
    class Vector2 extends RemoteCtrlObject {
        x: number;
        y: number;
        constructor(x: number, y: number) {
            super();
            this.x = x;
            this.y = y;
        }
        public add(a: number, b: number) {
            return new Vector2(a + this.x, this.y + b);
        }
        pi = 3.14;
    }
    function newVector2(a: number, b: number) {
        return new Vector2(a, b);
    }
    bridge.exportFunction(newVector2);
}
```

```typescript
//端2
async function client2() {
    class Vector2 extends RemoteCtrlObject {
        x!: number;
        y!: number;
        constructor(x: number, y: number) {
            super();
        }
        public add(a: number, b: number) {
            return new Vector2(0,0);
        }
        pi!: number;
    }
    let exportTest = {
        exportId: "",
        "newVector2": (a: number, b: number) => {
            return new Vector2(a, b);
        }
    }
    const vec = await bridge.solve(exportTest).newVector2(1, 2);
    console.warn(await (await vec.add(999, 2)).x);
    console.warn(await vec.pi);

    vec.dispose();
}
client1();
client2();
```

## BridgeProtocol未来方向

- **支持更多游戏对象类型**：例如:支持容器数据、物品数据等。
- **支持更加精准的双工通讯**：例如:定点呼叫某个模组包的函数
- **支持跨模组调用加速推理**：例如为高频调用的函数提高优先级, 在调用层禁止无法响应的调用再次发送

![蹦蹦跳跳的纳西妲](动态_纳西妲.gif)
