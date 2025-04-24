# THE_OTHER_SHORE:Dream

[< 简体中文 >](./README.md)
[< Compilation Entry File >](./THE_OTHER_SHORE.ts)
[< Pre-release TS Source Code >](./scripts/pre_release.js.ts)
[< BridgeProtocol TS Source Code >](./system/BridgeProtocol.ts)

## Dream Introduction

- The JavaScript modules are open-sourced from <THE_OTHER_SHORE:OPAl-Script>
- The data-driven modules are open-sourced from <THE_OTHER_SHORE:Dream>
- We sincerely look forward to the Bedrock edition modding community, which can gradually align with the Java version
- A research project on "Infrastructure" for Bedrock edition is hereby launched

![Naxiatu Thinking](静态_纳西妲.jpg)

## Dream Installation Tutorial

- **Purchase and install the latest "Official Version" and "Test Version" of Minecraft Bedrock**
- **Download and place the code data from this git repository**
- **Download and install npm | NodeJS | TSC in Visual Studio Code**
- **Try to compile TS scripts**: In the terminal, enter:

```bash
## When using the preview version, use the following command to compile:
npm run compile

## When using the official version, use the following command to compile:
npm run compile_stability
```

## Dream Basic Information

- **Protocol Version**: v4.4.0-0.0.5
- **Release Date**: 2025-04-23
- **Development Team**:
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
- **Contact Information**:
  - QQ: 1965304849
  - QQ Group: 906314036
  - QQ Channel: pd14718782

## Dream Future Directions

- **More modularized design of data-driven modules**: making it easier for players to customize and modify mod function parameters
- **More map and structure gameplay**: improving playability, adding more fun to the game
- **More optimizations and industrial modules**: deepening the development and optimization of maglev industry, strengthening the gaming experience of thematic gameplay

![Bouncing Naxiatu](动态_纳西妲.gif)

## BridgeProtocol Introduction

- The Unified Push Protocol (hereinafter referred to as "protocol") is a communication protocol designed for Bedrock edition games, aiming to standardize data exchange between multiple mod packages.
- The protocol provides a set of flexible interfaces that allow developers to easily integrate and expand functions, realizing modularized data push.

## BridgeProtocol Basic Information

- **Protocol Version**: v1.0.4.24.11.15
- **Architect**: aa剑侠
- **Protocol Author**: 钛宇-星光阁
- **Release Date**: 2024-11-14
- **Contact Information**:
  - QQ: 1965304849
  - QQ Group: 906314036
  - QQ Channel: pd14718782

### Data Type Definitions

- **JSON Value Type (JSONValue)**: Supports strings, boolean values, numbers, JSON objects, and JSON arrays.
- **JSON Object (JSONObject)**: A collection of key-value pairs, where values can be any JSON value type.
- **JSON Array (JSONArray)**: An array of JSON value types.
- **Game Object Type (GameObject)**: Includes entities, blocks, players, dimensions, or item stacks.
- **Transmission Data Type (TransmissionDataType)**: Supports JSON values, game objects, and their arrays.

### Function Definitions

- **Export Function Type (ExportFunctionType)**: Functions that accept TransmissionDataType parameters and return TransmissionDataType values.

### Event Listeners

- **EventListener Interface (EventListener)**: Used to subscribe to and unsubscribe from events.

### Script Messages

- **ScriptMessage Interface (ScriptMessage)**: Standardizes the message format for script execution.

### Function Implementations

- **Protocol Interceptors Class (ProtocolInterceptors)**: Handles custom logic before and after function calls.
- **Unified Push Protocol (BridgeProtocol)**: The core class, managing project identifiers, function lists, interceptors, and descriptions.

### Helper Functions

- **Event Getter (eventGetter)**: Creates a Promise that waits for a specified event to occur.
- **Random Integer Generator (randomFloor)**: Generates a random integer within a specified range.
- **Simplified Sequence Number Generator (BriefID)**: Based on timestamp and random number generation sequence numbers.

![Naxiatu Thinking](静态_纳西妲.jpg)

## BridgeProtocol Notes

- This system is just a protocol, it does not involve specific function implementation.
- All functions should be independently implemented by each mod.
- The push system only serves as the carrier for data transmission and does not involve data processing and storage.

## BridgeProtocol Usage Instructions

### Export Functions

Add/Update Function: Add or update functions to the function list through the `exportFunction` method.

### Call Functions

Asynchronous call: Use the `call` method to asynchronously call a function and wait for the result.

### Data Conversion

Data conversion functions: include `dataToArray`, `dataToTransmitString`, `typeConversion`, etc., which are used to convert server script event command messages into data types suitable for transmission.

### String Representation

Game object string representation: includes `blockToString`, `entityToString`, `dimensionToString`, etc., which are used to convert game objects into string forms.

## BridgeProtocol Usage Example

### Create Protocol Instance

```typescript
const bridge = new BridgeProtocol();
```

### Export Module Function

```typescript
< Format >
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

< Example >
bridge.exportFunction((player: server.Player)=>{ player.sendMessage("Hello, World!"); }, "sayHello");
```

### Call Module Function

```typescript
< Format >
bridge.call("myFunctionName", [arg1, arg2]);

< Example >
bridge.call("sayHello", [player]);
```

### Using Protocol Interceptors

```typescript
bridge.protocolInterceptors.onCalled(func, functionName, parameters);
bridge.protocolInterceptors.onCalling(callback, functionName, parameters);
```

### Multi-end Calls Based on Class dts Solution

```typescript
// End 1
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
// End 2
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

## BridgeProtocol Future Directions

- **Support more game object types**: such as support for container data, item data, etc.
- **Support more accurate two-way communication**: such as targeted calling a function in a certain mod package
- **Support cross-modular call acceleration reasoning**: such as giving priority to frequently called functions, and prohibiting the resending of calls that cannot respond in the call layer

![蹦蹦跳跳的纳西妲](动态_纳西妲.gif)
