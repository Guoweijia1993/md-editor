import { getPosition, formatText } from "@/assets/js/utils";
export default {
  methods: {
    handleSelectUser(user) {
      const originalText = this.textContent;
      const queryInfo = this.queryInfo;
      const cursorPosition = getPosition(this.id);
      const username = user.name + " ";
      const newText =
        originalText.slice(0, queryInfo.startPosition) +
        username +
        originalText.slice(queryInfo.endPosition);
      this.textContent = newText;
      this.emitText();
      this.showSelectUser = false;
      this.$nextTick(() => {
        const textEl = document.getElementById(this.id);
        textEl.setSelectionRange(
          cursorPosition + username.length,
          cursorPosition + username.length
        );
        textEl.focus();
      });
    },
    handleQueryUser() {
      const endPosition = getPosition(this.id);
      const startPosition = this.queryInfo.startPosition;
      const keyWord = this.textContent.slice(startPosition, endPosition);
      this.queryInfo.endPosition = endPosition;

      if (endPosition < startPosition || keyWord.slice(-1) === " ") {
        this.showSelectUser = false;
        return;
      }

      this.queryInfo.keyWord = keyWord;
      this.$emit("queryUserList", keyWord);
    },
    handleCallUser(e) {
      if (e.key === "@") {
        this.createSelectUserDialog();
      }
    },
    createSelectUserDialog() {
      const textEl = document.getElementById(this.id);
      if (!textEl) return;
      const height = getComputedStyle(textEl).getPropertyValue("height");
      const width = getComputedStyle(textEl).getPropertyValue("width");
      const scrollTop = textEl.scrollTop;
      const originalText = this.textContent;
      const cursorPoint = getPosition(this.id);
      const selectionInfo = {
        selectionStart: cursorPoint,
        selectionEnd: cursorPoint
      };
      const newText = formatText(
        originalText,
        selectionInfo,
        "<span id='call_position'>",
        "</span>"
      );
      const hideEl = this.createHideEl("clac_position_El_");
      hideEl.style.position = "absolute";
      hideEl.style.width = width;
      hideEl.style.height = height;
      hideEl.style.overflowY = "auto";
      hideEl.style.wordBreak = "break-all";
      hideEl.style.top = "14px";
      hideEl.style.left = 0;
      hideEl.style.whiteSpace = "pre-wrap";
      hideEl.innerHTML = newText;
      this.$nextTick(() => {
        hideEl.scrollTop = scrollTop;
        const pEl = document.getElementById("call_position");
        this.selectUserPosition = {
          left: pEl.offsetLeft,
          top: pEl.offsetTop - textEl.scrollTop
          // left: pEl.getBoundingClientRect().left,
          // top: pEl.getBoundingClientRect().top
        };
        textEl.parentNode.removeChild(hideEl);
        this.showSelectUser = true;
        this.queryInfo.startPosition = getPosition(this.id) + 1;
        this.queryInfo.endPosition = getPosition(this.id) + 1;
        this.$emit("queryUserList", this.queryInfo.keyWord);
      });
    }
  }
};
