// 加载系统TTS语音
function loadSystemTtsVoices() {
	// 检查浏览器是否支持语音合成
	if (!("speechSynthesis" in window)) {
		ttsSupportIndicator.className = "tts-support-indicator tts-not-supported";
		ttsSupportIndicator.innerHTML =
			'<i class="fas fa-exclamation-triangle"></i> 浏览器不支持系统TTS功能';
		return;
	}

	// 获取可用的语音
	availableVoices = speechSynthesis.getVoices();

	// 清空语音选择框
	ttsVoiceSelect.innerHTML = "";

	// 添加语音选项
	availableVoices.forEach((voice) => {
		const option = document.createElement("option");
		option.value = voice.name;
		option.textContent = `${voice.name} (${voice.lang})`;
		ttsVoiceSelect.appendChild(option);
	});

	// 尝试选择中文语音（如果可用）
	const chineseVoice = availableVoices.find(
		(voice) => voice.lang.startsWith("zh") || voice.lang.startsWith("cmn")
	);

	if (chineseVoice) {
		ttsVoiceSelect.value = chineseVoice.name;
	}
}

// 播放TTS
async function playTTS(text) {
	// 获取需要朗读的文本
	let textToPlay = text;

	// 如果未提供文本，尝试获取最后一条AI消息
	if (!textToPlay) {
		const lastAssistantMsg = [...conversationHistory]
			.reverse()
			.find((msg) => msg.role === "assistant");

		if (lastAssistantMsg) {
			textToPlay = lastAssistantMsg.content;
		}
	}

	// 提取结论部分
	let finalText = extractConclusion(textToPlay);

	// 如果没有提取到结论，使用整个文本
	if (!finalText) {
		finalText = textToPlay;
	}

	// 清理文本（移除括号和尖括号内容）
	const cleanedText = cleanTextForTTS(finalText);

	if (!cleanedText) {
		if (!isVtuberMode) {
			showApiStatus("没有可用的AI消息用于TTS", "error");
		}
		return;
	}

	// 截断过长的文本
	const truncatedText =
		cleanedText.length > 2000
			? cleanedText.substring(0, 2000) + "..."
			: cleanedText;

	try {
		// 停止当前正在播放的语音
		stopTTS();
		// 更新状态
		if (isVtuberMode) {
			setVtuberState(VTUBER_STATES.SPEAKING);
		}
		else {
			ttsButton.disabled = true;
			ttsButton.innerHTML =
				currentTtsMode === "custom"
					? '<i class="fas fa-spinner fa-spin"></i> 生成中...'
					: '<i class="fas fa-volume-up"></i> 播放中...';
		}
		if (currentTtsMode === "custom") {
			await playCustomTTS(truncatedText);
		}
		else {
			playSystemTTS(truncatedText);
		}
		if (!isVtuberMode) {
			showApiStatus("语音生成中...", "success");
		}
	}
	catch (error) {
		console.error("TTS播放失败:", error);
		if (!isVtuberMode) {
			showApiStatus(`TTS错误: ${error.message}`, "error");
			ttsButton.disabled = false;
			ttsButton.innerHTML = '<i class="fas fa-play"></i> 播放';
		}
		else {
			setVtuberState(VTUBER_STATES.IDLE);
		}
	}
}

// 使用自定义TTS API播放
async function playCustomTTS(text) {
	const endpoint = ttsApiEndpoint.value;
	const speed = parseFloat(ttsSpeed.value);

	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			text: text,
			speed: speed,
		}),
	});

	if (!response.ok) {
		throw new Error(`TTS API错误: ${response.status} ${response.statusText}`);
	}

	// 获取音频数据
	const audioBlob = await response.blob();
	const audioUrl = URL.createObjectURL(audioBlob);

	// 创建音频元素
	currentAudio = new Audio(audioUrl);
	currentAudio.volume = parseFloat(ttsVolume.value);
	currentAudio.play();

	// 更新按钮状态
	if (!isVtuberMode) {
		ttsButton.disabled = false;
		ttsButton.innerHTML = '<i class="fas fa-play"></i> 播放中...';
	}

	// 音频播放结束事件
	currentAudio.onended = function () {
		if (isVtuberMode) {
			setVtuberState(VTUBER_STATES.IDLE);
		} else {
			ttsButton.innerHTML = '<i class="fas fa-play"></i> 播放';
		}
		URL.revokeObjectURL(audioUrl);
	};
}

// 使用系统TTS播放
function playSystemTTS(text) {
	// 停止任何正在进行的语音
	speechSynthesis.cancel();

	// 创建新的语音实例
	const utterance = new SpeechSynthesisUtterance(text);

	// 设置语音参数
	utterance.rate = parseFloat(ttsSpeed.value);
	utterance.volume = parseFloat(ttsVolume.value);

	// 设置语音（如果可用）
	const selectedVoice = availableVoices.find(
		(voice) => voice.name === ttsVoiceSelect.value
	);
	if (selectedVoice) {
		utterance.voice = selectedVoice;
	}

	// 播放语音
	speechSynthesis.speak(utterance);

	// 更新状态
	utterance.onend = function () {
		if (isVtuberMode) {
			setVtuberState(VTUBER_STATES.IDLE);
		} else {
			ttsButton.disabled = false;
			ttsButton.innerHTML = '<i class="fas fa-play"></i> 播放';
		}
	};

	currentSpeech = utterance;
}

// 停止语音播放
function stopTTS() {
	// 停止自定义TTS
	if (currentAudio) {
		currentAudio.pause();
		currentAudio.currentTime = 0;
		if (isVtuberMode) {
			setVtuberState(VTUBER_STATES.IDLE);
		} else {
			ttsButton.innerHTML = '<i class="fas fa-play"></i> 播放';
		}
	}

	// 停止系统TTS
	if (speechSynthesis) {
		speechSynthesis.cancel();
	}

	if (!isVtuberMode) {
		ttsButton.disabled = false;
		ttsButton.innerHTML = '<i class="fas fa-play"></i> 播放';
	}
}
