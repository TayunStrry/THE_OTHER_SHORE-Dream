import nodejieba from 'nodejieba';

// 初始化（可选，但推荐）
nodejieba.load();
const text = "当< 机械生命体 >损毁或< 持有元素力 >的生命击杀目标时, 有概率掉落";
// 默认分词
const result1 = nodejieba.cut(text, false);
//console.log(result1); // ["这是", "一个", "中文", "分词", "的", "例子"]

// 带词性标注的分词
const result2 = nodejieba.tag(text);
console.log(JSON.stringify(result2));
// 输出示例：
// [
//   { word: "这是", tag: "r" },
//   { word: "一个", tag: "m" },
//   { word: "中文", tag: "nz" },
//   { word: "分词", tag: "n" },
//   { word: "的", tag: "uj" },
//   { word: "例子", tag: "n" }
// ]

// 提取关键词
const result3 = nodejieba.extract(text, 8);
//console.log(JSON.stringify(result3));
// 输出示例：
// [
//   { word: "分词", weight: 11.7392 },
//   { word: "中文", weight: 10.8564 },
//   { word: "例子", weight: 10.642 }
// ]
