/**
 * 系统初始化事件
 */
async function systemInitializationEvent() {
	// 应用保存的主题
	applySavedTheme();
	// 更新连接状态
	updateConnectionStatus(false);
	// 加载保存的配置
	loadSavedConfigs();
	// 初始化 Mermaid 图表库配置
	mermaid.initialize(
		{
			// 页面加载完成后自动渲染 Mermaid 图表
			startOnLoad: true,
			// 根据页面是否处于深色模式选择 Mermaid 主题，深色模式下使用 "dark" 主题，否则使用 "default" 主题
			theme: document.body.classList.contains("dark-mode") ? "dark" : "default",
			// 设置安全级别为宽松模式，允许执行更多操作
			securityLevel: "loose",
			// 使用与页面相同的字体家族
			fontFamily: "inherit",
			// 配置流程图
			flowchart: {
				// 设置流程图的方向为从左到右（Left to Right）
				rankDir: 'LR',
				// 允许流程图使用最大宽度
				useMaxWidth: true,
				// 设置连接线的弯曲样式为阶梯状
				curve: 'stepAfter',
				// 禁用 HTML 标签支持
				htmlLabels: false,
				// 设置图表的内边距为 0
				diagramPadding: 0,
				// 设置默认的渲染器为 canvas
				defaultRenderer: 'canvas',
			}
		}
	);
	// 添加所有风格的代码高亮
	hljs.highlightAll();
	// 注册 mermaid 语言支持，并为 mermaid 语法编写高亮风格
	hljs.registerLanguage('mermaid', () => mermaidHighlight());
	// 注册 echarts 语言支持，使用 json 高亮风格
	hljs.registerLanguage('echarts', () => hljs.getLanguage('json'));
	// 应用当前配置（如果有）
	const currentConfigName = localStorage.getItem("currentConfig");
	// 如果有保存的配置，则应用该配置
	if (currentConfigName && savedConfigs[currentConfigName]) await applyConfigToUI(savedConfigs[currentConfigName]);
	// 否则应用默认配置
	else await applyConfigToUI({});
	// 加载系统 TTS 语音
	if ("speechSynthesis" in window) {
		// 绑定语音加载事件，但不立即加载
		speechSynthesis.onvoiceschanged = () => {
			loadSystemSpeechModelVoiceSelect();
			// 解绑事件避免重复加载
			speechSynthesis.onvoiceschanged = null;
		};
		// 首次加载语音
		loadSystemSpeechModelVoiceSelect();
	}
	else {
		// 如果浏览器不支持系统 TTS 功能，显示提示信息
		ttsSupportIndicator.className = "tts-support-indicator tts-not-supported";
		ttsSupportIndicator.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 浏览器不支持系统 TTS 功能';
		// 如果当前语音引擎是系统模式，切换到自定义模式
		if (currentSpeechEngineType === "system") switchSpeechEngineMode("custom");
	}
	// 延迟加载演示消息，确保页面初始化完成后再显示演示内容
	setTimeout(loadDemoMessage, 800);
	// 设置角色模式初始状态
	setVtuberState(VTUBER_STATES.IDLE);
};
/**
 * mermaid语言 高亮规则
 */
function mermaidHighlight() {
	return {
		name: 'Mermaid',
		aliases: ['mmd'], // 可选别名
		contains: [
			{
				className: 'keyword',
				begin: '\\b(flowchart|graph|pie|gantt|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gitGraph|subgraph|end|click)\\b',
				relevance: 10
			},
			{
				className: 'title',
				begin: 'title\\s+["\']?',
				end: '["\']?|$',
				excludeBegin: true
			},
			{
				className: 'symbol',
				begin: /[+\-*/%&|=<>^~]|\.\.|\-\-|\|\|/ // 扩展操作符支持
			},
			{
				className: 'comment',
				begin: '%%.*',
				end: '$',
				relevance: 0
			},
			{
				className: 'string',
				begin: /"[^"]*"/,
				end: /[^\\]"/
			},
			{
				className: 'number',
				begin: '\\b\\d+(\\.\\d+)?\\b'
			}
		]
	}
};
/**
 * 加载示例消息
 */
function loadDemoMessage() {
	/**
	 * 将演示消息以助手身份添加到消息面板中，但不加载进历史记录
	 */
	const assistantMsgObj = addMessageToHistory("assistant", demoMessage, false);
	/**
	 * 创建消息元素并渲染
	 */
	let messageElement = renderMessage(assistantMsgObj, false);
	// 为think区块添加折叠功能
	messageElement.querySelectorAll(".toggle-think").forEach(bindFoldingButton);
};
// TODO: 绑定 系统初始化事件
document.addEventListener("DOMContentLoaded", systemInitializationEvent);
// TODO: 绑定 语音模型音量滑块事件
speechModelVolumeSlider.addEventListener("input", () => speechModelVolumeValue.textContent = `${Math.round(speechModelVolumeSlider.value * 100)}%`);
// TODO: 绑定 语音模型语速滑块事件
speechModelSpeedSlider.addEventListener("input", () => speechModelSpeedValue.textContent = `${speechModelSpeedSlider.value}x`);
// TODO: 绑定 推理模型类型显示切换事件
reasoningModelDropdown.addEventListener("change", () => currentModel.textContent = reasoningModelDropdown.value);