import marked from "marked";
// 获取选中文本信息

export function getSelectionInfo(selectorId) {
  const selector = document.getElementById(selectorId);
  if (!selector) return;
  const { selectionStart = 0, selectionEnd = 0 } = selector;
  if (selectionStart === selectionEnd) return "";
  const selection = window.getSelection().toString();
  return {
    selectorId,
    selection,
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
// 获取光标的位置
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
  codeTheme,
  helpdocColor
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
    helpdocColor = "#CCCCD8";
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
  if (helpdocColor) {
    document.documentElement.style.setProperty(
      "--md-editor-helpdoc-color",
      helpdocColor
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
// 去除头部空格行
export function removeBlankLine(val) {
  if (!val) return "";
  return val.replace(/^\n/, "");
}

// 获取被过滤掉的标签
export function getFilteredTags(oldStr, newStr) {
  // if (oldStr.length - newStr.length === 0) return [];
  // const filteredStr = oldStr.replace(newStr.trim(), "");
  // console.log(11, filteredStr);
  const virtualDom = document.createElement("div");
  virtualDom.innerHTML = oldStr;
  const oldTags = Array.from(virtualDom.getElementsByTagName("*"));
  virtualDom.innerHTML = newStr;
  const newTags = Array.from(virtualDom.getElementsByTagName("*"));

  // 待优化
  const filteredTags = new Array(oldTags.length - newTags.length).fill(0);

  return filteredTags;
}
// 格式刷的规则
export function copyFormatRules(selection) {
  if (!selection) return "";
  const first1 = selection.slice(0, 1);
  const first2 = selection.slice(0, 2);
  const first3 = selection.slice(0, 3);
  const first4 = selection.slice(0, 4);
  const first5 = selection.slice(0, 5);
  const first6 = selection.slice(0, 6);
  const first7 = selection.slice(0, 7);
  const end1 = selection.slice(-1);
  const end2 = selection.slice(-2);
  const end3 = selection.slice(-3);
  let formatType = "";
  switch (true) {
    // 斜体
    case first1 === "_" && end1 === "_":
      formatType = {
        startStr: "_",
        endStr: "_"
      };
      break;
    // 加粗
    case first2 === "**" && end2 === "**":
      formatType = {
        startStr: "**",
        endStr: "**"
      };
      break;
    // 代码
    case first3 === "```" && end3 === "```":
      formatType = {
        startStr: "\n```\n",
        endStr: "\n\n```",
        type: "code"
      };
      break;
    // 引用
    case first2 === "> ":
      formatType = {
        startStr: "\n> ",
        endStr: ""
      };
      break;
    // 待办
    case first6 === "- [ ] ":
      formatType = {
        startStr: "\n- [ ] ",
        endStr: ""
      };
      break;
    // 无序列表
    case first2 === "- ":
      formatType = {
        startStr: "\n- ",
        endStr: ""
      };
      break;
    // H6
    case first7 === "###### ":
      formatType = {
        startStr: "\n###### ",
        endStr: ""
      };
      break;
    // H5
    case first6 === "##### ":
      formatType = {
        startStr: "\n##### ",
        endStr: ""
      };
      break;
    // H4
    case first5 === "#### ":
      formatType = {
        startStr: "\n#### ",
        endStr: ""
      };
      break;
    // H3
    case first4 === "### ":
      formatType = {
        startStr: "\n### ",
        endStr: ""
      };
      break;
    // H2
    case first3 === "## ":
      formatType = {
        startStr: "\n## ",
        endStr: ""
      };
      break;
    // H1
    case first2 === "# ":
      formatType = {
        startStr: "\n# ",
        endStr: ""
      };
      break;
    default:
      break;
  }

  return formatType;
}

export function addLanguageClass(html) {
  const virtualDom = document.createElement("div");
  virtualDom.innerHTML = html;
  virtualDom.querySelectorAll("code").forEach(item => {
    if (!/language-/.test(item.className)) {
      item.className = "language-javascript";
    }
  });
  return virtualDom;
}
export function addLinkTarget(html) {
  const virtualDom = document.createElement("div");
  virtualDom.innerHTML = html;
  const userList = [];
  Array.from(virtualDom.querySelectorAll("a[href]")).forEach(item => {
    item.setAttribute("target", "_blank");
    if (item.getAttribute("type") === "user") {
      userList.push(item.dataset.user);
    }
  });
  const list = Array.from(new Set(userList)); // 去重
  return { callUserList: list, userHtml: virtualDom.innerHTML };
}
export function getLinkTags(id, html) {
  const virtualDom = document.createElement("div");
  virtualDom.innerHTML = html;
  const links = Array.from(
    virtualDom.querySelectorAll("a:not([download])")
  ).map((item, index) => {
    item.id = id + "_" + index;
    return {
      id: item.id,
      title: item.innerText,
      url: item.href
    };
  });
  return { vDom: virtualDom, links };
}

export function getLinkTitle(linkEl) {
  const title = linkEl.innerText;
  return /^http/.test(title) ? "" : title;
}

export function renderLinkCard(title, item) {
  return `
  <span class="md_link_title">${title || item.title || ""}</span>
  ${item.desc ? `<span class="md_link_desc">${item.desc}</span>` : ""}
  <span class="md_flex_card">
  ${
    item.img
      ? `<img class="md_link_img" src="${item.img}" />`
      : "<span class='md_link_img icon iconfont icon-lianjie'></span>"
  }
    <span class="flex-1">
      <span class="md_link_url">${item.url}</span>
    </span>
  </span>`;
}

export function preventDefault(id) {
  const textEl = document.getElementById(id);
  textEl.blur();
  setTimeout(() => {
    textEl.focus();
  }, 0);
  return;
}
