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
