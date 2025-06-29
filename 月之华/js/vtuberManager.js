// 皮套状态
const VTUBER_STATES = {
	IDLE: "idle",
	THINKING: "thinking",
	SPEAKING: "speaking",
	ERROR: "error",
	USER_INPUT: "user_input",
	HAPPY: "happy",
	ANGRY: "angry",
	SHY: "shy",
	REQUEST: "request",
};

// 状态文本
const STATUS_TEXTS = {
	idle: "待机中",
	thinking: "思考中...",
	speaking: "说话中",
	error: "出错了",
	user_input: "等待输入",
	happy: "开心",
	angry: "生气",
	shy: "害羞",
	request: "请求",
};

// GIF资源路径配置
const GIFS = {
	idle: ["./GIF/待机-0.gif", "./GIF/待机-1.gif"],
	thinking: ["./GIF/思考-0.jpg"],
	speaking: ["./GIF/请求-0.gif", "./GIF/请求-1.gif", "./GIF/请求-2.gif"],
	error: [
		"./GIF/故障-0.gif",
		"./GIF/故障-1.gif",
		"./GIF/故障-2.gif",
		"./GIF/故障-3.gif",
		"./GIF/故障-4.gif",
	],
	user_input: ["./GIF/夜空.jpg", "./GIF/等待.gif"],
	happy: [
		"./GIF/高兴-0.gif",
		"./GIF/高兴-1.gif",
		"./GIF/高兴-2.gif",
		"./GIF/高兴-3.gif",
	],
	angry: ["./GIF/愤怒-0.gif", "./GIF/愤怒-1.gif"],
	shy: ["./GIF/害羞-0.gif"],
	request: ["./GIF/请求-0.gif", "./GIF/请求-1.gif", "./GIF/请求-2.gif"],
};

// 设置皮套状态
function setVtuberState(state) {
	currentVtuberState = state;

	// 获取该状态对应的GIF数组
	const gifArray = GIFS[state];
	if (gifArray && gifArray.length > 0) {
		// 随机选择一个GIF
		const randomIndex = Math.floor(Math.random() * gifArray.length);
		characterGif.src = gifArray[randomIndex];
	}
	else {
		// 如果没有定义该状态的GIF，使用默认的思考状态GIF
		characterGif.src = "gifs/thinking/thinking1.gif";
	}

	// 更新状态指示器
	vtuberStatus.innerHTML = `
        <div class="vtuber-status-dot"></div>
        <span>${STATUS_TEXTS[state]}</span>
    `;

	// 更新状态类
	vtuberStatus.className = "vtuber-status";
	vtuberStatus.classList.add(`status-${state}`);
}

function handleEmotionTags(content) {
	// 定义情绪标签映射
	const emotionMap = {
		"<happy>": VTUBER_STATES.HAPPY,
		"<angry>": VTUBER_STATES.ANGRY,
		"<shy>": VTUBER_STATES.SHY,
		"<request>": VTUBER_STATES.REQUEST,
	};

	let detectedEmotion = null;

	// 检查内容中是否包含情绪标签
	for (const [tag, emotion] of Object.entries(emotionMap)) {
		if (content.includes(tag)) {
			detectedEmotion = emotion;
			break;
		}
	}

	return detectedEmotion;
}

// 带超时的状态设置函数
function setStateWithTimeout(state, duration = 9000) {
	setVtuberState(state);
	if (state !== VTUBER_STATES.IDLE && state !== VTUBER_STATES.THINKING) {
		setTimeout(() => {
			// 仅在仍是当前状态时切换回待机
			if (currentVtuberState === state) {
				setVtuberState(VTUBER_STATES.IDLE);
			}
		}, duration);
	}
}

// 添加消息到聊天气泡
function addVtuberMessage(message, isUser = false) {
	const messageClass = isUser ? "vtuber-user-message" : "vtuber-ai-message";
	const messageElement = document.createElement("div");
	messageElement.className = `vtuber-message ${messageClass}`;

	// 使用Markdown解析内容
	const processedContent = processThinkTags(message);
	messageElement.innerHTML = processedContent;

	document.getElementById("vtuberChatBubble").appendChild(messageElement);

	// 高亮代码块
	messageElement.querySelectorAll("pre code").forEach((block) => {
		hljs.highlightElement(block);
	});

	// 滚动到底部
	const chatBubble = document.getElementById("vtuberChatBubble");
	chatBubble.scrollTop = chatBubble.scrollHeight;
}
// 角色模式发送消息
async function sendVtuberMessage() {
	const message = vtuberInput.value.trim();
	if (!message || isGenerating) return;

	// 添加用户消息
	const userMsgObj = {
		role: "user",
		content: message,
		timestamp: new Date().toISOString(),
	};
	conversationHistory.push(userMsgObj);
	addVtuberMessage(message, true);

	// 设置用户输入状态
	setStateWithTimeout(VTUBER_STATES.USER_INPUT, 1000);
	vtuberInput.value = "";

	// 设置思考状态（无超时）
	setVtuberState(VTUBER_STATES.THINKING);
	isGenerating = true;
	vtuberSendBtn.disabled = true;

	try {
		// 构建消息数组
		let messages = [];
		if (systemPrompt.value.trim() !== "") {
			messages.push({ role: "system", content: systemPrompt.value });
		}
		conversationHistory.forEach((msg) => {
			messages.push({ role: msg.role, content: msg.content });
		});

		// 创建AI消息元素
		const aiMessageElement = document.createElement("div");
		aiMessageElement.className = "message ai-message";
		vtuberChatBubble.appendChild(aiMessageElement);
		const contentElement = document.createElement("div");
		contentElement.className = "markdown-content";
		aiMessageElement.appendChild(contentElement);

		// 流式接收响应
		let assistantMessage = "";
		await fetchAIStreamResponse(messages, (chunk) => {
			assistantMessage += chunk;
			contentElement.innerHTML = processThinkTags(assistantMessage);
			// 高亮代码块
			contentElement.querySelectorAll("pre code").forEach((block) => {
				hljs.highlightElement(block);
			});

			// 绑定折叠事件
			bindThinkToggleEvents(contentElement);

			// 滚动到底部
			vtuberChatBubble.scrollTop = vtuberChatBubble.scrollHeight;
		});

		// 添加到历史记录
		const assistantMsgObj = {
			role: "assistant",
			content: assistantMessage,
			timestamp: new Date().toISOString(),
		};
		conversationHistory.push(assistantMsgObj);

		// 检测情绪标签
		const emotion = handleEmotionTags(assistantMessage);

		// 准备TTS内容（过滤括号和标签）
		const ttsContent = extractConclusion(assistantMessage);
		const cleanTtsContent = cleanTextForTTS(ttsContent);

		// 设置说话状态
		setVtuberState(VTUBER_STATES.SPEAKING);

		if (autoplaySpeechModel.checked && cleanTtsContent) {
			await playSpeechModel(cleanTtsContent);
		}

		// 处理情绪标签
		if (emotion) {
			setStateWithTimeout(emotion);
		}
		 else {
			setStateWithTimeout(VTUBER_STATES.IDLE);
		}
	}
	catch (error) {
		console.error("请求失败:", error);
		addVtuberMessage(`抱歉，出错了: ${error.message}`);
		// 错误状态优先级最高，覆盖其他状态
		setStateWithTimeout(VTUBER_STATES.ERROR, 2000);
	}
	finally {
		isGenerating = false;
		vtuberSendBtn.disabled = false;
	}
}
// 流式获取AI响应
async function fetchAIStreamResponse(messages, onChunkReceived) {
	const endpoint = apiEndpointReasoningModel.value + "/chat/completions";
	const model = reasoningModelDropdown.value;
	const temp = parseFloat(temperature.value);
	const maxToks = parseInt(maxTokens.value);

	try {
		// 构建请求体
		const requestBody = {
			model: model,
			messages: messages,
			temperature: isNaN(temp) ? 0.7 : temp,
			max_tokens: isNaN(maxToks) ? 1024 : maxToks,
			stream: true,
		};

		// 发送请求
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			throw new Error(`API返回错误: ${response.status} ${response.statusText}`);
		}

		// 处理流式响应
		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let assistantMessage = "";

		while (true) {
			const { value, done } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value);
			const lines = chunk.split("\n").filter((line) => line.trim() !== "");

			for (const line of lines) {
				if (line.startsWith("data: ")) {
					const data = line.replace("data: ", "");
					if (data === "[DONE]") {
						return;
					}

					try {
						const jsonData = JSON.parse(data);
						if (
							jsonData.choices &&
							jsonData.choices[0].delta &&
							jsonData.choices[0].delta.content
						) {
							onChunkReceived(jsonData.choices[0].delta.content);
						}
					} catch (e) {
						console.error("解析流数据出错:", e);
					}
				}
			}
		}
	} catch (error) {
		throw error;
	}
}