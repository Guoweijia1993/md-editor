<template>
  <div :class="['md_textarea', { fullScreen, isFocus }]">
    <textarea
      :id="id"
      @change="$emit('update:text', textContent)"
      @input="input"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @paste="pasteFile"
      @keydown.meta.enter.exact="submit"
      @keydown.ctrl.enter.exact="submit"
      v-model="textContent"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :rows="rows"
      :style="{ height: editorHeight, overflow: autoSize ? 'hidden' : 'auto' }"
    >
    </textarea>
    <span
      @click="$emit('update:fullScreen', false)"
      v-if="fullScreen"
      class="icon iconfont icon-quxiaoquanping_o"
    ></span>
  </div>
</template>
<script>
import {
  getSelectionInfo,
  getPosition,
  throttle as throttleFn
} from "@/assets/js/utils";
export default {
  props: {
    fullScreen: {
      type: Boolean,
      default: false
    },
    throttleTime: {
      type: Number,
      default: 1000
    },
    isFocus: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    },
    text: {
      type: [String, Number],
      default: ""
    },
    maxLength: {
      type: [String, Number],
      default: ""
    },
    rows: {
      type: [String, Number],
      default: ""
    },
    selectionInfo: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      id: new Date().getTime(),
      textContent: "",
      editorHeight: "auto"
    };
  },
  created() {
    document.addEventListener("mouseup", this.checkSelection);
  },
  watch: {
    text: {
      immediate: true,
      handler: function(val) {
        this.textContent = val;
      }
    },
    textContent: {
      immediate: true,
      handler: function() {
        setTimeout(() => {
          if (!this.autoSize) return;
          this.reSizeHeight();
        }, 0);
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("mouseup", this.checkSelection);
  },
  computed: {
    emitText() {
      return throttleFn(() => {
        this.$emit("update:text", this.textContent);
      }, this.throttleTime);
    },
    autoSize() {
      return this.rows === "auto";
    }
  },
  methods: {
    input() {
      this.$emit("update:textLength", this.textContent.length);
      this.emitText();
    },
    reSizeHeight() {
      const textEl = document.getElementById(this.id);
      if (!textEl) return;
      const fontSize = getComputedStyle(textEl).getPropertyValue("font-size");
      const lineHeight = getComputedStyle(textEl).getPropertyValue(
        "line-height"
      );

      const fontFamily = getComputedStyle(textEl).getPropertyValue(
        "font-family"
      );
      const hideElId = "hdieEl" + this.id;
      let hideEl = document.getElementById(hideElId);

      if (!hideEl) {
        hideEl = document.createElement("div");
        textEl.parentNode.appendChild(hideEl);
      }
      hideEl.id = hideElId;
      hideEl.style.fontSize = fontSize;
      hideEl.style.lineHeight = lineHeight;
      hideEl.style.fontFamily = fontFamily;
      hideEl.innerText = this.textContent;
      const contentHeight = hideEl.offsetHeight;
      this.editorHeight = `${contentHeight + parseFloat(fontSize) * 1.2}px`;
      textEl.parentNode.removeChild(hideEl);
    },
    submit() {
      this.$emit("submit");
    },
    setFocus(val) {
      this.$emit("update:isFocus", val);
    },
    checkSelection() {
      const info = getSelectionInfo(this.id);
      if (!info) {
        const cursorPoint = getPosition(this.id);
        this.$emit("update:selectionInfo", {
          selectorId: this.id,
          selectionStart: cursorPoint,
          selectionEnd: cursorPoint
        });
        return;
      }
      this.$emit("update:selectionInfo", info);
    },
    pasteFile(event) {
      let fileList = [];
      const items = (event.clipboardData || window.clipboardData).items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          fileList.push(items[i].getAsFile());
          break;
        }
      }
      if (!fileList.length) return;
      this.$emit("update:fileList", fileList);
    }
  }
};
</script>
<style lang="less" scoped>
.md_textarea {
  position: relative;
  padding: 14px 0;
  background: var(--md-editor-content-bg-color);
  // border-left: 1px solid var(--md-editor-border-color);
  // border-right: 1px solid var(--md-editor-border-color);
  transition: border 0.3s;
  // padding: 14px;
  box-sizing: border-box;
  // &.isFocus {
  //   border-left: 1px solid var(--md-editor-border-color-active);
  //   border-right: 1px solid var(--md-editor-border-color-active);
  // }
  &.fullScreen {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: var(--md-editor-fullScrren-zIndex);
    padding: 40px 60px;
    box-sizing: border-box;
    textarea {
      font-size: 20px;
    }
  }

  textarea {
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: var(--md-editor-content-bg-color);
    color: var(--md-editor-text-color-active);
    height: var(--md-editor-height);
    resize: none;

    font-family: "Menlo", "DejaVu Sans Mono", "Liberation Mono", "Consolas",
      "Ubuntu Mono", "Courier New", "andale mono", "lucida console", monospace;
    &::placeholder {
      color: var(--md-editor-text-color);
    }
  }
  .icon {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 32px;
    cursor: pointer;
  }
}
</style>
