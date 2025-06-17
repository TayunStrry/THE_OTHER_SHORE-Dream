import Segment from '../deliverable/JavaScript/segment.js';
const segment = new Segment();

// 使用默认的识别模块及字典
segment.useDefault();

// 关键步骤：启用词性标注模块
//segment.use('POSTokenizer');  // 加载词性分析模块
// 分词
const result = segment.doSegment('当< 机械生命体 >损毁或< 持有元素力 >的生命击杀目标时, 有概率掉落',
	{
		// 去除标点符号
		stripPunctuation: true,
		simple: true,  // 只返回分词结果，不返回其他信息
	}
);

console.log(result);
// 输出: ['这是', '一个', '基于', 'Node.js', '的', '中文', '分词', '模块']

const result1 = segment.doSegment('当< 机械生命体 >损毁或< 持有元素力 >的生命击杀目标时, 有概率掉落',
	{
		// 去除标点符号
		stripPunctuation: true,
		// 返回详细信息（包含词性）
		simple: false,
	}
);

console.log(JSON.stringify(result1));