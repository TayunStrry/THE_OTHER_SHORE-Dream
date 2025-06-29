// TODO : 角色互动模式 聊天发送事件
characterInteractionChatInput.addEventListener("keypress", ChatInputDispatchEvent);
// TODO : 常规聊天模式 聊天发送事件
generalStatusChatInput.addEventListener("keypress", ChatInputDispatchEvent);
/**
 * 聊天输入发送事件
 *
 * @param {KeyboardEvent} event - 按键事件
 */
function ChatInputDispatchEvent(event) {
	// 检查是否正在生成
	if (characterInteractionChatInputButton.disabled == true || generalStatusChatInputButton.disabled == true) return;
	// 当按下 "Enter" 键且未同时按下 "Shift" 键时，触发发送消息操作
	if (event.key === "Enter" && !event.shiftKey) {
		// 阻止默认的换行行为
		event.preventDefault();
		// 向 AI 发送聊天消息
		sendChatMessageToBackendModel();
	}
};
/**
 * 发送聊天消息到后端模型
 */
async function sendChatMessageToBackendModel() {
	/**
	 * 获取用户输入并去除前后空格
	 */
	const message = characterInteractionChatInput.value.trim() || generalStatusChatInput.value.trim();
	// 如果消息为空，则不执行后续操作
	if (!message) return;
	/**
	 * 添加用户消息到聊天记录
	 */
	const userMsgObj = addMessageToHistory("user", message);
	// 将用户消息渲染到页面上
	renderMessage(userMsgObj);
	// 清空输入框
	characterInteractionChatInput.value = "";
	generalStatusChatInput.value = "";
	// 将消息发送到后端 API，并根据是否勾选“包含历史”传递相应参数
	await sendMessageToAPI(userMsgObj, isIncludeHistory);
};
/**
 * 添加消息到聊天记录
 *
 * @param {string} role 消息的角色
 *
 * @param {string} content 消息内容
 *
 * @param {boolean} [recorded=true] - 是否记录消息（默认true）
 *
 * @returns {object} 添加的消息对象
 */
function addMessageToHistory(role, content, recorded = true) {
	/**
	 * 创建一个消息对象
	 */
	const message = {
		role,
		content,
		timestamp: new Date().toISOString(),
	};
	// 判断是否添加消息到历史
	if (recorded) conversationHistory.push(message);
	// 返回消息对象
	return message;
};
/**
 * 发送消息到后端推理模型
 *
 * @param {string} userMessage - 用户输入的消息
 *
 * @param {boolean} useHistory - 是否使用历史记录
 *
 * @returns {Promise<string>} - API返回的响应消息
 */
async function sendMessageToAPI(userMessage, useHistory) {
	// 如果未连接到API，显示连接中状态并测试连接
	if (!isConnected) {
		// 显示连接中状态
		showsystemStatusDisplayPanel("正在尝试连接API", "success");
		// 执行测试连接
		testConnection();
	}
	// 设置用户已向模型发送消息的状态
	setStateWithTimeout(VTUBER_STATES.USER_INPUT, 1000);
	// 禁用输入按钮
	characterInteractionChatInputButton.disabled = true;
	generalStatusChatInputButton.disabled = true;
	// 创建中止控制器以便取消请求
	abortController = new AbortController();
	// 设置虚拟主播为思考状态（无超时）
	setVtuberState(VTUBER_STATES.THINKING);
	try {
		/**
		 * API端点URL
		 */
		const endpoint = apiEndpointReasoningModel.value + "/chat/completions";
		/**
		 * 获取当前选择的模型
		 */
		const model = reasoningModelDropdown.value;
		/**
		 * 温度参数转换
		 */
		const temp = parseFloat(temperature.value);
		/**
		 * 最大 token 数转换
		 */
		const maxToks = parseInt(maxTokens.value);
		/**
		 * 构建消息数组
		 */
		let messages = [];
		/**
		 * 处理系统时间
		 */
		const systemTime = '当前的日期与时间是: ( ' + getSystemTime() + ' )请确保行为与措辞符合当前日期与时间';
		// 添加系统提示词（如果有）
		if (inputSystemPrompt.value.trim() !== "") messages.push({ role: "system", content: inputSystemPrompt.value + systemTime });
		// 基于用户选择 判断是否包含完整历史
		if (useHistory) messages = messages.concat(conversationHistory.map(msg => ({ role: msg.role, content: msg.content })));
		// 只包含最后一条用户消息
		else messages.push({ role: "user", content: userMessage.content });
		// 基于用户选择决定是否启用深度思考
		if (isDisableThinking) messages.push({ role: "user", content: '/no_thinking' })
		/**
		 * 构建发给推理模型的请求体
		 */
		const requestBody = {
			model: model,
			messages: messages,
			temperature: isNaN(temp) ? 0.7 : temp,
			max_tokens: isNaN(maxToks) ? 4096 : maxToks,
			stream: true,
			enable_thinking: !isDisableThinking
		};
		/**
		 * 发送请求并等待响应
		 */
		const response = await fetch(endpoint,
			{
				method: "POST",
				headers: {
					"Authorization": "Bearer " + encodeURIComponent(document.getElementById("apiKeyReasoningModel").value),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
				// 使用中止控制器信号
				signal: abortController.signal,
			}
		);
		// 如果未能获得期望中的响应，则抛出错误
		if (!response.ok) throw new Error(`API返回错误: ${response.status} ${response.statusText}`);
		/**
		 * 创建一个空内容的助手消息对象，并添加到聊天记录中
		 */
		const assistantMsgObj = addMessageToHistory("assistant", "");
		/**
		 * 创建消息元素并渲染
		 */
		let messageElement = renderMessage(assistantMsgObj);
		/**
		 * 获取AI消息内容元素
		 */
		const contentElement = messageElement.querySelector(".markdown-content");
		/**
		 * 创建消息内容元素并渲染
		 */
		const reader = response.body.getReader();
		/**
		 * 创建文本解码器
		 */
		const decoder = new TextDecoder();
		/**
		 * 创建用于保存AI消息的变量
		 */
		let assistantMessage = "";
		// 循环处理文本块
		while (true) {
			// 读取数据块
			const { value, done } = await reader.read();
			// 如果传输完成，跳出循环
			if (done) break;
			/**
			 * 解码数据块
			 */
			const chunk = decoder.decode(value);
			/**
			 * 分割成行并过滤空行
			 */
			const lines = chunk.split("\n").filter((line) => line.trim() !== "");
			// 遍历每一行数据
			for (const line of lines) {
				// 检查数据块是否包含有效数据
				if (!line.startsWith("data: ")) continue;
				/**
				 * 获取数据块中的有效数据
				 */
				const data = line.replace("data: ", "");
				// 如果收到结束信号，退出循环
				if (data === "[DONE]") break;
				try {
					/**
					 * 解析JSON数据
					 */
					const jsonData = JSON.parse(data);
					// 检查数据块是否包含有效数据
					if (!jsonData.choices || !jsonData.choices[0].delta || !jsonData.choices[0].delta.content) continue;
					// 更新推理模型消息内容
					assistantMessage += jsonData.choices[0].delta.content;
					// 更新消息内容前保存当前状态
					assistantMsgObj.content = assistantMessage;
					/**
					 * 保存当前滚动条高度
					 */
					const prevScrollHeight = chatHistory.scrollHeight;
					/**
					 * 保存当前滚动条位置
					 */
					const prevScrollTop = chatHistory.scrollTop;
					/**
					 * 获取当前滚动条可见高度
					 */
					const prevClientHeight = chatHistory.clientHeight;
					// 处理内容更新
					contentElement.innerHTML = processThinkTags(assistantMessage);
					// 为think区块添加折叠功能
					contentElement.querySelectorAll(".toggle-think").forEach(bindFoldingButton);
					/**
					 * 计算新增消息气泡的高度
					 */
					const newMessageHeight = chatHistory.scrollHeight - prevScrollHeight;
					/**
					 * 获取当前滚动条位置
					 */
					const effectiveScrollTop = prevScrollTop;
					/**
					 * 获取当前滚动条可见高度
					 */
					const effectiveScrollBottom = effectiveScrollTop + prevClientHeight;
					/**
					 * 计算距离底部的距离
					 */
					const distanceToBottom = prevScrollHeight - effectiveScrollBottom;
					/**
					 * 底部阈值设置为1.5%
					 */
					const scrollThreshold = prevClientHeight * 0.015;
					/**
					 * 检查是否需要滚动到底部
					 */
					const checkIfAtBottom = distanceToBottom <= scrollThreshold || (distanceToBottom > scrollThreshold && distanceToBottom - newMessageHeight <= scrollThreshold);
					// 检查是否需要滚动到底部
					if (checkIfAtBottom) chatHistory.scrollTop = chatHistory.scrollHeight;
				}
				catch (error) {
					console.error("解析流数据出错:", error);
				}
				// 添加代码高亮
				contentElement.querySelectorAll('pre code').forEach((block) => hljs.highlightElement(block));
			}
		};
		// 显示成功状态
		showsystemStatusDisplayPanel("消息发送成功！", "success");
		// 生成 Mermaid 图表
		generateMermaidChart(contentElement);
		// 生成 ECharts 图表
		generateEChartsChart(contentElement);
		/**
		 * 检测情绪标签
		 */
		const emotion = handleEmotionTags(assistantMessage);
		// 如果启用了自动播放功能，播放语音
		if (autoplaySpeechModel.checked) playSpeechModel();
		// 处理情绪标签
		if (emotion) setStateWithTimeout(emotion);
		// 如果没有情绪标签，则进入说话模式
		else setStateWithTimeout(VTUBER_STATES.SPEAKING);
	}
	catch (error) {
		// 请求被中止
		if (error.name === "AbortError") showsystemStatusDisplayPanel("请求已取消", "error");
		else {
			// 其他错误
			console.error("API调用失败:", error);
			showsystemStatusDisplayPanel(`错误: ${error.message}`, "error");
			// 添加错误消息到聊天记录
			const errorMsg = `抱歉，请求处理时出错: ${error.message}`;
			const errorMsgObj = addMessageToHistory("assistant", errorMsg);
			renderMessage(errorMsgObj);
		}
	}
	finally {
		// 重新启用输入按钮
		characterInteractionChatInputButton.disabled = false;
		generalStatusChatInputButton.disabled = false;
		// 清理中止控制器
		abortController = null;
	}
};
/**
 * 绑定折叠按钮
 *
 * @param {HTMLButtonElement} button 折叠按钮
 */
function bindFoldingButton(button) {
	button.addEventListener("click",
		() => {
			/**
			 * 获取 think 区块内容元素
			 */
			const thinkContent = button.closest(".think-block").querySelector(".think-content");
			// 切换内容
			thinkContent.classList.toggle("collapsed");
			// 切换按钮文字
			if (thinkContent.classList.contains("collapsed")) button.textContent = "展开";
			else button.textContent = "折叠";
		}
	);
};
/**
 * 创建 Mermaid 图
 *
 * @param {HTMLElement} contentElement - 包含mermaid代码块的DOM容器元素
 */
function generateMermaidChart(contentElement) {
	try {
		/**
		 * 查找所有Mermaid代码块
		 */
		const mermaidBlocks = contentElement.querySelectorAll('code.language-mermaid');
		/**
		 * 创建图表容器（替换原始代码块）
		 *
		 * @param {HTMLElement} block - 原始代码块
		 */
		async function chartRendering(block) {
			try {
				/**
				 * 提取原始Mermaid代码定义
				 * 1. 剔除单行和多行注释
				 * 2. 保留有效Mermaid语法
				 */
				const graphDefinition = block.textContent.replace(/\/\/[^\n]*\n/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
				/**
				 * 创建图表容器元素
				 */
				const container = document.createElement('div');
				// 设置图表容器的类名
				container.className = 'mermaid-container';
				// 替换原始代码块为图表容器节点（保留原始文档结构）
				block.parentElement.replaceChild(container, block);
				/**
				 * 调用Mermaid渲染API，生成SVG图表。
				 *
				 * 为图表生成唯一ID（由时间戳和随机数组成），避免多个图表渲染时SVG元素ID冲突。
				 *
				 * @param {string} `mermaid-${Date.now()}-${Math.floor(Math.random() * 1000)}` - 生成的唯一图表ID
				 * @param {string} graphDefinition - Mermaid图表的定义代码
				 * @returns {Promise<{svg: string}>} - 包含生成的SVG字符串的对象
				 */
				const { svg } = await mermaid.render(`mermaid-${Date.now()}-${Math.floor(Math.random() * 1000)}`, graphDefinition);
				/**
				 * 创建临时DOM解析器，用于将SVG字符串解析为DOM元素
				 */
				const parser = new DOMParser();
				/**
				 * 解析SVG字符串，获取DOM文档
				 */
				const doc = parser.parseFromString(svg, 'image/svg+xml');
				/**
				 * 获取解析后的SVG文档的根元素
				 */
				const svgElement = doc.documentElement;
				/**
				 * 从SVG元素的aria-roledescription属性中获取图表类型
				 */
				const chartType = svgElement.getAttribute('aria-roledescription');
				// 只对流程图类型的图表进行viewBox调整，以优化显示效果
				if (chartType === 'flowchart') {
					/**
					 * 获取SVG元素的viewBox属性值
					 */
					const viewBox = svgElement.getAttribute('viewBox');
					// 若viewBox属性存在，则进行后续处理
					if (viewBox) {
						/**
						 * 将viewBox属性值按空白字符分割，并转换为数值数组
						 */
						const values = viewBox.split(/\s+/).map(parseFloat);
						// 确保viewBox数值数组包含4个有效数值
						if (values.length === 4 && values.every(v => !isNaN(v))) {
							// 调整viewBox的minX值，缩小左侧偏移量
							values[0] *= 0.45;
							// 调整viewBox的minY值，缩小顶部偏移量
							values[1] *= 0.45;
							// 调整viewBox的width值，适当放大图表宽度
							values[2] *= 1.05;
							// 调整viewBox的height值，适当放大图表高度
							values[3] *= 1.05;
							// 将调整后的数值数组重新组合为字符串，并设置回SVG元素的viewBox属性
							svgElement.setAttribute('viewBox', values.join(' '));
						}
					}
				}
				/**
				 * 使用XML序列化器将修改后的SVG DOM元素转换回字符串
				 */
				const modifiedSVG = new XMLSerializer().serializeToString(svgElement);
				// 将生成的SVG内容插入到图表容器中，并添加边框和内边距样式
				container.innerHTML = `<div style="width: 100%; border: 10px dashed #eee; padding: 0px">${modifiedSVG}</div>`;
			}
			catch (mermaidError) {
				console.error('Mermaid渲染失败:', mermaidError);
				container.innerHTML = `<div class="mermaid-error">图表渲染失败: ${mermaidError.message}</div>`;
			}
		};
		if (mermaidBlocks.length > 0) {
			// 确保Mermaid库已加载
			if (typeof mermaid !== 'undefined') {
				// 渲染每个Mermaid图表
				mermaidBlocks.forEach(chartRendering);
			}
			else console.warn("Mermaid库未加载，无法渲染图表");
		}
	}
	catch (parseError) {
		console.error("Mermaid解析出错:", parseError);
	}
};
/**
 * 在指定容器内渲染ECharts图表
 *
 * @param {HTMLElement} contentElement - 包含ECharts代码块的DOM容器元素
 */
function generateEChartsChart(contentElement) {
	try {
		/**
		 * 定位所有ECharts代码块
		 */
		const echartsBlocks = contentElement.querySelectorAll('code.language-echarts');
		// 无代码块时提前退出
		if (echartsBlocks.length === 0) return;
		// 步骤2: 验证ECharts库加载状态
		if (typeof echarts === 'undefined') return console.warn("ECharts库未加载，无法渲染图表");
		/**
		 * 创建图表容器（替换原始代码块）
		 *
		 * @param {HTMLElement} block - 原始代码块
		 */
		function chartRendering(block) {
			/**
			 * 创建图表容器（替换原始代码块）
			 */
			const container = document.createElement('div');
			// 设置容器样式
			container.className = 'echarts-container';
			container.style.cssText = 'width:100%; height:400px;';
			// 替换原始代码块
			block.parentElement.replaceChild(container, block);
			// 创建图表实例
			try {
				/**
				 * 从代码块中提取JSON配置文本，并移除其中的单行和多行注释，同时将单引号替换为双引号
				 * 此操作是为了确保后续能正确解析JSON内容
				 * 处理逻辑：
				 * 1. 移除所有以 // 开头的单行注释
				 * 2. 移除所有 '/*' 和 '*\/' 之间的多行注释
				 * 3. 将单引号替换为双引号
				 */
				let jsonText = block.textContent.replace(/\/\/[^\n]*\n/g, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/'/g, '"');
				/**
				 * 解析JSON内容
				 */
				let config = JSON.parse(jsonText) || {};
				// TODO : 配置完整性修复流程
				// 修复系列数据
				if (!config.series) config.series = [{ type: 'line', data: [5, 20, 36, 10, 10, 20] }];
				else if (!Array.isArray(config.series)) config.series = [config.series];
				// 修复 X 轴配置
				if (!config.xAxis) config.xAxis = { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] };
				else if (!config.xAxis.data) config.xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
				// 修复Y轴配置
				if (!config.yAxis) config.yAxis = { type: 'value' };
				// 补充基础布局配置
				if (!config.grid) config.grid = { left: '3%', right: '4%', bottom: '3%', containLabel: true };
				// 添加默认标题
				if (!config.title) config.title = { text: '月华的绘图册', left: 'center', top: 10 };
				// 多系列时自动生成图例
				if (!config.legend && config.series.length > 1) config.legend = { data: config.series.map(s => s.name || '系列'), bottom: 10 };
				// 添加导出工具
				if (!config.toolbox) config.toolbox = { feature: { saveAsImage: {} } };
				/**
				 * 初始化图标容器
				 */
				const chart = echarts.init(container);
				// 渲染图表
				chart.setOption(config);
				// 添加：存储图表实例到DOM元素上
				container._echartsInstance = chart;
				// 绑定响应式调整
				window.addEventListener('resize', () => chart.resize());
				// 添加：强制调整尺寸
				setTimeout(() => chart.resize(), 50);
			}
			catch (error) {
				// 步骤6: 渲染失败处理（保留原始配置）
				console.error('ECharts渲染失败:', error);
				// 创建一个div元素，用于显示错误信息
				container.innerHTML = `
				<div style="padding:20px; color:#f00; background:#fee;">
                    <p>图表渲染失败: ${error.message}</p>
                    <details>
                        <summary>配置详情</summary>
                        <pre>${block.textContent}</pre>
                    </details>
                </div>`;
			}
		};
		// 遍历处理每个代码块
		echartsBlocks.forEach(chartRendering);
	}
	catch (error) {
		// 全局错误捕获
		console.error("ECharts图表生成过程中出错:", error);
	}
};
/**
 * 渲染消息
 *
 * @param {object} message 要渲染的消息对象
 *
 * @returns {HTMLElement} 渲染后的消息元素
 */
function renderMessage(message) {
	/**
	 * 创建消息元素
	 */
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
	/**
	 * 构建系统时间
	 */
	const timestamp = getSystemTime();
	// 创建消息元素
	messageDiv.classList.add("message");
	messageDiv.innerHTML = `
        <div class="message-header">
            <span>${message.role === "user" ? "用户" : "月华"}</span>
            <span>${timestamp}</span>
        </div>
        <div class="markdown-content">${message.content}</div>
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
	/**
	 * 获取AI消息内容元素
	 */
	const contentElement = messageDiv.querySelector(".markdown-content");
	// 处理内容更新
	contentElement.innerHTML = processThinkTags(message.content);
	// 生成 Mermaid 图表
	generateMermaidChart(contentElement);
	// 生成 ECharts 图表
	generateEChartsChart(contentElement);
	// 添加消息类型样式
	if (message.role === "user") messageDiv.classList.add("user-message");
	else messageDiv.classList.add("assistant-message");
	// 将消息添加到聊天记录面板中
	chatHistory.appendChild(messageDiv);
	/**
	 * 获取复制按钮
	 */
	const copyBtn = messageDiv.querySelector(".action-btn");
	// 绑定复制功能
	copyBtn.addEventListener("click",
		() => {
			navigator.clipboard.writeText(message.content).then(
				() => {
					/**
					 * 获取复制图标的原始样式
					 */
					const originalIcon = copyBtn.innerHTML;
					// 复制成功图标
					copyBtn.innerHTML = '<i class="fas fa-check"></i>';
					// 2秒后恢复图标
					setTimeout(() => { copyBtn.innerHTML = originalIcon; }, 2000);
				}
			);
		}
	);
	// 添加TTS功能
	if (message.role === "assistant") {
		/**
		 * 获取播放按钮
		 */
		const ttsBtn = messageDiv.querySelector(".tts-btn");
		// 绑定播放事件
		ttsBtn.addEventListener("click",
			() => {
				/**
				 * 要播放的文本内容
				 */
				const content = cleanTextForTTS(extractConclusion(message.content));
				// 播放TTS
				playSpeechModel(content);
			}
		);
	};
	// 滚动到底部
	chatHistory.scrollTop = chatHistory.scrollHeight;
	// 添加代码高亮
	messageDiv.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));
	// 输出消息元素
	return messageDiv;
};
/**
 * 渲染所有消息
 */
function renderAllMessages() {
	// 清空聊天历史显示区域
	chatHistory.innerHTML = '';
	// 重新渲染所有消息
	conversationHistory.forEach(
		message => {
			// 渲染消息
			const newMessage = renderMessage(message);
			// 为think区块添加折叠功能
			newMessage.querySelectorAll(".toggle-think").forEach(bindFoldingButton);
		}
	);
	// 滚动到底部
	chatHistory.scrollTop = chatHistory.scrollHeight;
	/**
	 * 对图表进行重新渲染
	 */
	function renderAgain() {
		// 重新渲染所有 ECharts 图表
		document.querySelectorAll('.echarts-container').forEach(
			container => {
				/**
				 * 获取图表实例
				 */
				const chart = echarts.getInstanceByDom(container);
				// 重新渲染图表
				if (chart) chart.resize();
			}
		)
	};
	// 添加：强制重新渲染图表
	setTimeout(renderAgain, 100);
};