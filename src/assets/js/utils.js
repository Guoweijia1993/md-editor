// 获取选中文本信息

export function getSelectionInfo(selectorId) {
  const selector = document.getElementById(selectorId);
  // const selection = window.getSelection();
  const { selectionStart = 0, selectionEnd = 0 } = selector;
  if (selectionStart === selectionEnd) return "";
  return {
    selectorId,
    selectionStart,
    selectionEnd
  };
}

export const getPosition = function(selectorId) {
  const element = document.getElementById(selectorId);
  let cursorPos = 0;
  if (document.selection) {
    //IE
    var selectRange = document.selection.createRange();
    selectRange.moveStart("character", -element.value.length);
    cursorPos = selectRange.text.length;
  } else if (element.selectionStart || element.selectionStart == "0") {
    cursorPos = element.selectionStart;
  }
  return cursorPos;
};

// 工具栏格式化文本
export function formatText(text, selectionInfo, startStr = "", endStr = "") {
  if (!selectionInfo) return;
  const newText =
    text.slice(0, selectionInfo.selectionStart) +
    startStr +
    text.slice(selectionInfo.selectionStart, selectionInfo.selectionEnd) +
    endStr +
    text.slice(selectionInfo.selectionEnd);
  return newText;
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

export function isNotFalse(val) {
  return val !== false;
}
