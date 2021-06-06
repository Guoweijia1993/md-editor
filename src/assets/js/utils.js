import store from '@/store'

// 获取选中文本信息

export function getSelectionInfo(selectorId) {
  const selector = document.getElementById(selectorId);
  // const selection = window.getSelection();
  const { selectionStart = 0, selectionEnd = 0 } = selector;
  if (selectionStart === selectionEnd) return "";
  return {
    selectionStart,
    selectionEnd
  };
}

// 工具栏格式化文本
export function formatText(text, selectionInfo, startStr = "", endStr = "") {
  if (!selectionInfo) return text + startStr + endStr;
  return (
    text.slice(0, selectionInfo.selectionStart) +
    startStr +
    text.slice(selectionInfo.selectionStart, selectionInfo.selectionEnd) +
    endStr +
    text.slice(selectionInfo.selectionEnd)
  );
}

//
export function updateText(startStr, endStr) {
  const selectionInfo = store.state.selectionInfo;
  const originalText = store.state.text;
  const newText = formatText(originalText, selectionInfo, startStr, endStr);
  if (!newText) return;
  store.commit("setText", newText);
}

// 初始化样式
export function initStyle({
  borderColor,
  borderColorActive,
  textColor,
  textColorActive
}) {
  if (borderColor) {
    document.documentElement.style.setProperty(
      "--md-editor-border-color",
      borderColor
    );
  }
  if (borderColorActive) {
    document.documentElement.style.setProperty(
      "--md-editor-border-color-active",
      borderColorActive
    );
  }
  if (textColor) {
    document.documentElement.style.setProperty(
      "--md-editor-text-color",
      textColor
    );
  }
  if (textColorActive) {
    document.documentElement.style.setProperty(
      "--md-editor-text-color-active",
      textColorActive
    );
  }
}

// 
export function isNotEmpty(val) {
  return val !== null && val !== undefined;
}
