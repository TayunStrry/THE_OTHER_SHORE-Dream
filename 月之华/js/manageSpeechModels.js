/**
 * 加载系统 TTS 语音列表并填充到选择框中
 */
function loadSystemSpeechModelVoiceSelect() {
	// 检查浏览器是否支持语音合成 API
	if (!("speechSynthesis" in window)) {
		// 不支持时更新状态提示为警告信息
		ttsSupportIndicator.className = "tts-support-indicator tts-not-supported";
		ttsSupportIndicator.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 浏览器不支持系统TTS功能';
		return;
	}
	// 获取当前可用的语音列表
	availableVoices = speechSynthesis.getVoices().sort((a, b) => a.name.localeCompare(b.name));
	/**
	 * 默认的音色配置名称
	 */
	const defaultVoiceName = 'Microsoft Xiaoxiao Online (Natural) - Chinese (Mainland)';
	// 清空语音选择下拉框内容
	speechModelVoiceSelect.innerHTML = "";
	// 遍历所有可用语音，添加选项到下拉框中
	availableVoices.forEach(
		voice => {
			/**
			 * 创建一个选项元素
			 */
			const option = document.createElement("option");
			// 设置选项的文字为语音名称
			option.value = voice.name;
			// 设置选项的文字为语音名称和语言
			option.textContent = `${voice.name} (${voice.lang})`;
			// 将选项添加到下拉框中
			speechModelVoiceSelect.appendChild(option);
		}
	);
	// 如果之前有选中项，则尝试恢复选择
	if (defaultVoiceName && availableVoices.some(v => v.name === defaultVoiceName)) {
		speechModelVoiceSelect.value = defaultVoiceName;
	}
	// 如果是首次加载且未设置默认值，则尝试选择中文语音
	else {
		/**
		 * 查找第一个语言代码以 "zh" 或 "cmn" 开头的中文语音
		 */
		const chineseVoice = availableVoices.find(voice => voice.lang.startsWith("zh") || voice.lang.startsWith("cmn"));
		// 如果找到中文语音，则设为默认选中
		if (chineseVoice) speechModelVoiceSelect.value = chineseVoice.name;
	}
};
/**
 * 播放文本转语音 (TTS) 的主函数
 *
 * @param {string} text - 要朗读的文本内容（可选）
 */
async function playSpeechModel(text) {
	/**
	 * 取要播放的文本内容
	 */
	let textToPlay = text;
	// 如果未提供文本，则查找最后一条 AI 发言作为默认内容
	if (!textToPlay) {
		const lastAssistantMsg = [...conversationHistory].reverse().find((msg) => msg.role === "assistant");
		// 提取结论部分
		if (lastAssistantMsg) textToPlay = lastAssistantMsg.content;
	}
	/**
	 * 提取文本中的结论部分用于朗读
	 */
	let finalText = extractConclusion(textToPlay);
	// 如果没有找到结论，使用原始文本
	if (!finalText) finalText = textToPlay
	/**
	 * 清理文本，移除括号和尖括号内容
	 */
	const cleanedText = cleanTextForTTS(finalText);
	// 如果清理后无内容，显示错误并退出
	if (!cleanedText) {
		showsystemStatusDisplayPanel("没有可用的AI消息用于TTS", "error");
		return;
	}
	/**
	 * 截断过长文本以适应 TTS 限制（最多2000字符）
	 */
	const truncatedText = cleanedText.length > 2000 ? cleanedText.substring(0, 2000) + "..." : cleanedText;
	try {
		// 停止当前正在播放的语音（防止叠加播放）
		stopSpeechModel();
		// 根据当前模式更新 UI 或虚拟主播状态
		if (displayVtuberMode) setVtuberState(VTUBER_STATES.SPEAKING);
		else {
			// 禁用按钮，防止重复点击
			playSpeechModelBtton.disabled = true;
			// 显示正在播放的图标
			playSpeechModelBtton.innerHTML = currentSpeechEngineType === "custom" ? '<i class="fas fa-spinner fa-spin"></i> 生成中...' : '<i class="fas fa-volume-up"></i> 播放中...';
		}
		// 根据当前语音引擎类型调用对应的播放方法
		if (currentSpeechEngineType === "custom") await playCustomTTS(truncatedText);
		// 播放系统语音
		else playSystemTTS(truncatedText);
		// 显示播放状态提示
		showsystemStatusDisplayPanel("语音生成中...", "success");
	}
	catch (error) {
		// 错误处理：日志记录、状态恢复、提示用户
		console.error("TTS播放失败:", error);
		if (!displayVtuberMode) {
			showsystemStatusDisplayPanel(`TTS错误: ${error.message}`, "error");
			playSpeechModelBtton.disabled = false;
			playSpeechModelBtton.innerHTML = '<i class="fas fa-play"></i> 播放';
		}
		else setVtuberState(VTUBER_STATES.IDLE);
	}
};
/**
 * 使用自定义 TTS 服务播放语音
 *
 * @param {string} text - 要朗读的文本内容
 */
async function playCustomTTS(text) {
	/**
	 * 获取自定义 TTS 的 API 地址
	 */
	const endpoint = apiEndpointSpeechModel.value;
	/**
	 * 获取自定义 TTS 的语速设置
	 */
	const speed = parseFloat(speechModelSpeedSlider.value);
	/**
	 * 发送 POST 请求到自定义 TTS 接口
	 */
	const response = await fetch(endpoint,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text, speed }),
		}
	);
	// 如果响应失败，抛出错误
	if (!response.ok) throw new Error(`TTS API错误: ${response.status} ${response.statusText}`);
	/**
	 * 获取音频数据
	 */
	const audioBlob = await response.blob();
	/**
	 * 创建音频播放对象
	 */
	const audioUrl = URL.createObjectURL(audioBlob);
	// 创建 Audio 对象并设置音量
	currentAudio = new Audio(audioUrl);
	currentAudio.volume = parseFloat(speechModelVolumeSlider.value);
	currentAudio.play();
	// 更新按钮状态为“播放中”
	if (!displayVtuberMode) {
		playSpeechModelBtton.disabled = false;
		playSpeechModelBtton.innerHTML = '<i class="fas fa-play"></i> 播放中...';
	}
	// 音频播放结束时的处理逻辑
	currentAudio.onended = function () {
		if (displayVtuberMode) setVtuberState(VTUBER_STATES.IDLE);
		else playSpeechModelBtton.innerHTML = '<i class="fas fa-play"></i> 播放';
		// 清理临时生成的音频资源链接
		URL.revokeObjectURL(audioUrl);
	};
};
/**
 * 使用浏览器内置系统 TTS 播放语音
 *
 * @param {string} text - 要朗读的文本内容
 */
function playSystemTTS(text) {
	// 停止当前正在播放的任何语音（防止冲突）
	speechSynthesis.cancel();
	/**
	 * 创建新的语音合成对象
	 */
	const utterance = new SpeechSynthesisUtterance(text);
	// 设置语速和音量参数
	utterance.rate = parseFloat(speechModelSpeedSlider.value);
	utterance.volume = parseFloat(speechModelVolumeSlider.value);
	/**
	 * 查找用户选择的语音并应用
	 */
	const selectedVoice = availableVoices.find(voice => voice.name === speechModelVoiceSelect.value);
	// 如果找到匹配的语音，则应用
	if (selectedVoice) utterance.voice = selectedVoice;
	// 开始播放语音
	speechSynthesis.speak(utterance);
	// 设置语音播放结束时的回调逻辑
	utterance.onend = function () {
		// 如果是 VTuber 模式，恢复空闲状态
		if (displayVtuberMode) setVtuberState(VTUBER_STATES.IDLE);
		else {
			// 否则更新按钮状态为可点击
			playSpeechModelBtton.disabled = false;
			playSpeechModelBtton.innerHTML = '<i class="fas fa-play"></i> 播放';
		}
	};
	// 保存当前语音实例以便后续控制或中断
	currentSpeech = utterance;
};
/**
 * 停止当前正在进行的语音播放（无论是自定义TTS还是系统TTS）
 */
function stopSpeechModel() {
	// 如果正在播放自定义 TTS 音频
	if (currentAudio) {
		// 暂停播放
		currentAudio.pause();
		// 重置播放位置到开头
		currentAudio.currentTime = 0;
		// 根据当前模式更新状态或按钮显示
		if (displayVtuberMode) setVtuberState(VTUBER_STATES.IDLE); // 恢复 VTuber 空闲状态
		// 恢复按钮文字
		else playSpeechModelBtton.innerHTML = '<i class="fas fa-play"></i> 播放';
	}
	// 停止系统 TTS 播放
	if (speechSynthesis) speechSynthesis.cancel();
	// 如果不是 VTuber 模式，确保按钮状态可用并恢复播放图标
	if (!displayVtuberMode) {
		playSpeechModelBtton.disabled = false;
		playSpeechModelBtton.innerHTML = '<i class="fas fa-play"></i> 播放';
	}
};