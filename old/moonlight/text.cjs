const Segment = require('segment');
const segment = new Segment();

// 使用默认的识别模块及字典
segment.useDefault();

// 关键步骤：启用词性标注模块
//segment.use('POSTokenizer');  // 加载词性分析模块
// 分词
const result = segment.doSegment('请解释一下什么是魔晶扳手',
	{
		// 去除标点符号
		stripPunctuation: true,
		// 返回详细信息（包含词性）
		simple: false,
	}
);

console.log(JSON.stringify(result));