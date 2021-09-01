import { getPosition, formatText } from "@/assets/js/utils";
export default {
  methods: {
    handleSelectLinkType(index) {
      console.log(index);
      const originalText = this.textContent;
      const queryInfo = this.queryInfo;
      const cursorPosition = getPosition(this.id);
      let typeStr = "";
      switch (index) {
        case 0:
          break;
        case 1:
          typeStr = "::1";
          break;
        case 2:
          typeStr = "::2";
          break;
        default:
          break;
      }
      const newText =
        originalText.slice(0, cursorPosition) +
        typeStr +
        originalText.slice(cursorPosition);
      this.textContent = newText;
      this.emitText();
      this.showSelectLinkType = false;
      this.$nextTick(() => {
        const textEl = document.getElementById(this.id);
        textEl.setSelectionRange(
          cursorPosition + typeStr.length,
          cursorPosition + typeStr.length
        );
        textEl.focus();
      });
    },
    createSelectLinkTypeDialog(type) {
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
        const frameWidth = textEl.parentNode.offsetWidth;
        this.selectLinkTypePosition = {
          left:
            pEl.offsetLeft < frameWidth * (2 / 3)
              ? pEl.offsetLeft
              : pEl.offsetLeft - 200,
          top: pEl.offsetTop - textEl.scrollTop
        };
        textEl.parentNode.removeChild(hideEl);
        // this.queryInfo.startPosition = getPosition(this.id) + 1;
        // this.queryInfo.endPosition = getPosition(this.id) + 1;
        // if (type === "android") {
        //   this.queryInfo.startPosition--;
        //   this.queryInfo.endPosition--;
        // }
        // this.$emit("queryUserList", this.queryInfo.keyWord);
        this.$nextTick(() => {
          // const userList = this.userList;
          // if (userList === false) return;
          // if (this.queryInfo.keyWord === "") {
          //   this.allUserList = userList;
          // }
          this.showSelectLinkType = true;
          this.$nextTick(() => {
            const list = textEl.parentNode.querySelector(".md_select_user");
            if (list) {
              this.activeLinkTypeIndex = 0;
              list.scrollTo(0, 0);
            }
          });
        });
      });
    }
  }
};
