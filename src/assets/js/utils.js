// 获取选中文本信息

export function getSelectionInfo(selectorId) {
  const selector = document.getElementById(selectorId);
  if (!selector) return;
  // const selection = window.getSelection();
  const { selectionStart = 0, selectionEnd = 0 } = selector;
  if (selectionStart === selectionEnd) return "";
  return {
    selectorId,
    selectionStart,
    selectionEnd
  };
}

// 节流
export const throttle = function(fn, wait) {
  var timer = null;
  return function() {
    var context = this;
    var args = arguments;
    if (!timer) {
      timer = setTimeout(function() {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  };
};

export const getPosition = function(selectorId) {
  const element = document.getElementById(selectorId);
  if (!element) return 0;
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

export function setzIndex(index) {
  document.documentElement.style.setProperty(
    "--md-editor-fullScrren-zIndex",
    index
  );
}

// 初始化样式
export function initStyle({
  dark,
  borderColor,
  borderColorActive,
  textColor,
  textColorActive,
  placeholderColor,
  frameBgColor,
  contentBgColor,
  codeBgColor,
  codeTheme
}) {
  // 夜晚模式
  if (dark) {
    borderColor = "#44444F";
    borderColorActive = "#2998F2";
    textColor = "#777888";
    placeholderColor = "#777888";
    textColorActive = "#CCCCD8";
    frameBgColor = "#222226";
    codeBgColor = "#777888";
    contentBgColor = "#222226";
  }
  if (frameBgColor) {
    document.documentElement.style.setProperty(
      "--md-editor-frame-bg-color",
      frameBgColor
    );
  }
  if (contentBgColor) {
    document.documentElement.style.setProperty(
      "--md-editor-content-bg-color",
      contentBgColor
    );
  }

  if (codeBgColor) {
    document.documentElement.style.setProperty(
      "--md-editor-code-bg-color",
      codeBgColor
    );
  }

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
  if (codeTheme) {
    switch (codeTheme) {
      case "dark":
        import("@/assets/style/code/dark.css");
        break;
      case "light":
        import("@/assets/style/code/lightfair.css");
        break;
      case "atom-one-dark":
        import("@/assets/style/code/atom-one-dark.css");
        break;
      default:
        break;
    }
  } else {
    import("@/assets/style/code/lightfair.css");
  }
}

//
export function isNotEmpty(val) {
  return val !== null && val !== undefined;
}

export function isNotFalse(val) {
  return val !== false;
}

export function checktUrl(val, rule) {
  if (!val || !rule) return;
  const hideEl = document.createElement("div");
  hideEl.style.display = "none";
  hideEl.innerHTML = val;
  const imgList = Array.from(hideEl.getElementsByTagName("img"));
  return imgList.filter(item => !rule.test(item.src)).map(item => item.src);
}

export function checkBoswer() {
  const agent = navigator.userAgent.match(
    /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
  );
  return agent !== null;
}

export function removeBlankLine(val) {
  if (!val) return "";
  return val.replace(/^\n/, "");
}
