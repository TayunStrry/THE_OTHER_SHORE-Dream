// 添加消息到历史
function addMessageToHistory(role, content) {
	const message = {
		role,
		content,
		timestamp: new Date().toISOString(),
	};

	conversationHistory.push(message);
	return message;
}

// 渲染消息到聊天界面
function renderMessage(message) {
	const messageDiv = document.createElement("div");

	// 系统消息处理
	if (message.role === "system") {
		messageDiv.classList.add("message", "system-message");
		messageDiv.innerHTML = `
            <div class="message-header">
                <span>系统提示</span>
            </div>
            <div>${message.content}</div>
        `;
		chatHistory.appendChild(messageDiv);
		return messageDiv;
	}

	// 用户和AI消息处理
	const now = new Date(message.timestamp);
	const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
		2,
		"0"
	)}-${String(now.getDate()).padStart(2, "0")} ${String(
		now.getHours()
	).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

	// 特殊处理：将Mermaid代码块转换为可渲染格式
	let processedContent = message.content;

	// 1. 预处理Mermaid代码块
	processedContent = processedContent.replace(
		/```mermaid([\s\S]*?)```/g,
		(match, diagram) => `<div class="mermaid">${diagram}</div>`
	);

	// 2. 处理其他代码块（保持原样）
	processedContent = processedContent.replace(
		/<table(\s[^>]*)?>/gi,
		(match, attrs) => `<table class="markdown-table" ${attrs || ""}>`
	);

	// 3. 处理表格（增强表格样式）
	processedContent = processedContent.replace(
		/<table>/g,
		'<table class="markdown-table">'
	);

	// 4. 使用Marked.js解析Markdown
	processedContent = marked.parse(processedContent);

	// 5. 添加响应式容器
	processedContent = processedContent
		.replace(
			/<div class="mermaid">/g,
			'<div class="mermaid-container"><div class="mermaid">'
		)
		.replace(/<\/div><\/div>/g, "</div></div>");

	// 创建消息元素
	messageDiv.classList.add("message");
	messageDiv.innerHTML = `
        <div class="message-header">
            <span>${message.role === "user" ? "用户" : "Chat-AI"}</span>
            <span>${timestamp}</span>
        </div>
        <div class="markdown-content">${processedContent}</div>
        <div class="message-actions">
            <button class="action-btn" title="复制">
                <i class="fas fa-copy"></i>
            </button>
            ${message.role === "assistant"
			? `
            <button class="action-btn tts-btn" title="播放语音" data-content="${encodeURIComponent(
				message.content
			)}">
                <i class="fas fa-volume-up"></i>
            </button>
            `
			: ""
		}
        </div>
    `;

	// 添加消息类型样式
	if (message.role === "user") {
		messageDiv.classList.add("user-message");
	} else {
		messageDiv.classList.add("assistant-message");
	}

	// 添加到聊天历史
	chatHistory.appendChild(messageDiv);

	// 添加复制功能
	const copyBtn = messageDiv.querySelector(".action-btn");
	copyBtn.addEventListener("click", () => {
		navigator.clipboard.writeText(message.content).then(() => {
			const originalIcon = copyBtn.innerHTML;
			copyBtn.innerHTML = '<i class="fas fa-check"></i>';
			setTimeout(() => {
				copyBtn.innerHTML = originalIcon;
			}, 2000);
		});
	});

	// 添加TTS功能
	if (message.role === "assistant") {
		const ttsBtn = messageDiv.querySelector(".tts-btn");
		ttsBtn.addEventListener("click", function () {
			const content = decodeURIComponent(this.getAttribute("data-content"));
			playTTS(content);
		});
	}

	// 高亮代码块
	messageDiv.querySelectorAll("pre code").forEach((block) => {
		// 跳过Mermaid图表
		if (!block.closest(".mermaid-container")) {
			hljs.highlightElement(block);
		}
	});

	// 渲染Mermaid图表
	setTimeout(() => {
		const mermaidContainers = messageDiv.querySelectorAll(".mermaid");
		if (mermaidContainers.length > 0 && window.mermaid) {
			try {
				mermaid.init(
					{
						theme: document.body.classList.contains("dark-mode")
							? "dark"
							: "default",
						startOnLoad: true,
						securityLevel: "loose",
					},
					mermaidContainers
				);
			} catch (e) {
				console.error("Mermaid渲染错误:", e);
				mermaidContainers.forEach((container) => {
					container.innerHTML = `<div class="mermaid-error">图表渲染失败: ${e.message}</div>`;
				});
			}
		}
	}, 100);

	// 为think区块添加折叠功能
	messageDiv.querySelectorAll(".toggle-think").forEach((button) => {
		button.addEventListener("click", function () {
			const thinkContent =
				this.closest(".think-block").querySelector(".think-content");
			thinkContent.classList.toggle("collapsed");

			if (thinkContent.classList.contains("collapsed")) {
				this.textContent = "展开";
			} else {
				this.textContent = "折叠";
			}
		});
	});

	// 添加表格样式增强
	const tables = messageDiv.querySelectorAll("table");
	tables.forEach((table) => {
		if (!table.classList.contains("markdown-table")) {
			table.classList.add("markdown-table");
		}

		// 添加表头样式
		const headers = table.querySelectorAll("th");
		headers.forEach((header) => {
			header.classList.add("table-header");
		});

		// 添加斑马纹
		const rows = table.querySelectorAll("tr");
		rows.forEach((row, index) => {
			if (index % 2 === 1) {
				row.classList.add("table-row-odd");
			}
		});
	});

	// 滚动到底部
	chatHistory.scrollTop = chatHistory.scrollHeight;

	return messageDiv;
}

// 发送消息到API
async function sendMessageToAPI(userMessage, useHistory) {
	if (!isConnected) {
		showApiStatus("正在尝试链接API", "success");
		testConnection();
	}
	// 设置用户已向模型发送消息的状态
	setStateWithTimeout(VTUBER_STATES.USER_INPUT, 1000);
	// 检查用户输入和是否正在生成
	if (!userMessage || isGenerating) return;
	sendButton.disabled = true;
	isGenerating = true;
	// 创建中止控制器以便取消请求
	abortController = new AbortController();
	// 设置思考状态（无超时）
	setVtuberState(VTUBER_STATES.THINKING);
	try {
		const endpoint = apiEndpoint.value + "/v1/chat/completions";
		const model = aiModel.value;
		const temp = parseFloat(temperature.value);
		const maxToks = parseInt(maxTokens.value);
		// 构建消息数组
		let messages = [];
		// 添加系统提示词（如果有）
		if (systemPrompt.value.trim() !== "") {
			messages.push({ role: "system", content: systemPrompt.value });
		}
		if (useHistory) {
			// 包含完整历史
			messages = messages.concat(conversationHistory.map(msg => ({ role: msg.role, content: msg.content })));
		}
		else {
			// 只包含最后一条用户消息
			messages.push({ role: "user", content: userMessage.content });
		}
		// 构建请求体
		const requestBody = {
			model: model,
			messages: messages,
			temperature: isNaN(temp) ? 0.7 : temp,
			max_tokens: isNaN(maxToks) ? 1024 : maxToks,
			stream: true,
		};
		// 发送请求
		const response = await fetch(endpoint,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
				signal: abortController.signal,
			}
		);
		// 如果未能获得期望中的响应，则抛出错误
		if (!response.ok) throw new Error(`API返回错误: ${response.status} ${response.statusText}`);
		// 添加AI消息占位符
		const assistantMsgObj = addMessageToHistory("assistant", "");
		const messageElement = renderMessage(assistantMsgObj);
		const contentElement = messageElement.querySelector(".markdown-content");
		// 处理流式响应
		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let assistantMessage = "";
		// 循环处理文本块
		while (true) {
			const { value, done } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value);
			const lines = chunk.split("\n").filter((line) => line.trim() !== "");

			for (const line of lines) {
				if (line.startsWith("data: ")) {
					const data = line.replace("data: ", "");
					if (data === "[DONE]") {
						break;
					}

					try {
						const jsonData = JSON.parse(data);
						if (
							jsonData.choices &&
							jsonData.choices[0].delta &&
							jsonData.choices[0].delta.content
						) {
							assistantMessage += jsonData.choices[0].delta.content;

							// 更新消息内容前保存当前状态
							assistantMsgObj.content = assistantMessage;
							const prevScrollHeight = chatHistory.scrollHeight;
							const prevScrollTop = chatHistory.scrollTop;
							const prevClientHeight = chatHistory.clientHeight;

							// 使用统一的处理函数
							contentElement.innerHTML = processThinkTags(assistantMessage);

							// 高亮代码块
							contentElement.querySelectorAll("pre code").forEach((block) => {
								hljs.highlightElement(block);
							});

							// 为think区块添加折叠功能
							contentElement
								.querySelectorAll(".toggle-think")
								.forEach((button) => {
									button.addEventListener("click", function () {
										const thinkContent =
											this.closest(".think-block").querySelector(
												".think-content"
											);
										thinkContent.classList.toggle("collapsed");

										if (thinkContent.classList.contains("collapsed")) {
											this.textContent = "展开";
										} else {
											this.textContent = "折叠";
										}
									});
								});

							// 计算新增消息气泡的高度
							const newMessageHeight =
								chatHistory.scrollHeight - prevScrollHeight;

							// 计算当前滚动位置是否在底部10%区域内
							// 注意：减去新消息高度，模拟用户没有滚动时的位置
							const effectiveScrollTop = prevScrollTop;
							const effectiveScrollBottom =
								effectiveScrollTop + prevClientHeight;
							const distanceToBottom = prevScrollHeight - effectiveScrollBottom;

							// 计算底部阈值（减去新消息高度）
							const scrollThreshold = prevClientHeight * 0.025; // 距离底部区域小于等于2.5%时自动吸附（别问，问就是小黑子）

							// 如果之前就在底部区域内，或者新增高度使得内容进入底部区域
							if (
								distanceToBottom <= scrollThreshold ||
								(distanceToBottom > scrollThreshold &&
									distanceToBottom - newMessageHeight <= scrollThreshold)
							) {
								chatHistory.scrollTop = chatHistory.scrollHeight;
							}
						}
					}
					catch (e) {
						console.error("解析流数据出错:", e);
					}
				}
			}
		};
		// 显示运行状态
		showApiStatus("消息发送成功！", "success");
		// 检测情绪标签
		const emotion = handleEmotionTags(assistantMessage);
		// 如果启用了自动播放功能，播放语音
		if (autoPlayTTS.checked) playTTS();
		// 处理情绪标签
		if (emotion) setStateWithTimeout(emotion);
		// 如果没有情绪标签，则进入说话模式
		else setStateWithTimeout(VTUBER_STATES.SPEAKING);
	}
	catch (error) {
		if (error.name === "AbortError") {
			showApiStatus("请求已取消", "error");
		}
		else {
			console.error("API调用失败:", error);
			showApiStatus(`错误: ${error.message}`, "error");
			// 添加错误消息到聊天记录
			const errorMsg = `抱歉，请求处理时出错: ${error.message}`;
			const errorMsgObj = addMessageToHistory("assistant", errorMsg);
			renderMessage(errorMsgObj);
		}
	}
	finally {
		isGenerating = false;
		sendButton.disabled = false;
		abortController = null;
	}
}

// 发送消息
async function sendMessage() {
	const message = userInput.value.trim();
	if (!message) return;

	// 添加用户消息
	const userMsgObj = addMessageToHistory("user", message);
	renderMessage(userMsgObj);
	userInput.value = "";

	// 发送到API
	await sendMessageToAPI(userMsgObj, includeHistory.checked);
}
