<template>
  <div :class="['md_textarea', { fullScreen, isFocus }]">
    <textarea
      :id="id"
      @change="$emit('update:text', textContent)"
      @input="input"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @paste="pasteFile"
      @keydown.enter="$emit('enter')"
      @keydown.meta.enter.exact="submit"
      @keydown.ctrl.enter.exact="submit"
      @keydown.tab.prevent="$emit('tab')"
      v-model="textContent"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :rows="rows"
      :style="{ height: editorHeight, overflow: editorOverFlow }"
    >
    </textarea>
  </div>
</template>
<script>
import {
  getSelectionInfo,
  getPosition,
  getFilteredTags,
  throttle as throttleFn
} from "@/assets/js/utils";
import marked from "marked";
export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    html: {
      type: String,
      default: ""
    },
    htmlMinHeight: {
      default: ""
    },
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
    height: {
      type: Number,
      default: 0
    },
    selectionInfo: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      textContent: "",
      editorHeight: "auto",
      editorOverFlow: "auto"
    };
  },
  created() {
    document.addEventListener("mouseup", this.checkSelection);
  },
  mounted() {
    this.resetPreviewMinHeight();
  },
  watch: {
    isFocus: {
      handler: function(val) {
        if (val) {
          this.resetPreviewMinHeight();
        }
      }
    },
    text: {
      immediate: true,
      handler: function(val) {
        const cursorPoint = getPosition(this.id);
        this.textContent = val;
        this.transferMarkdown(val);
      }
    },
    fullScreen: {
      immediate: true,
      handler: function(val) {
        if (val) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
        setTimeout(() => {
          this.reSizeTextareaHeight();
        }, 0);
      }
    },
    textContent: {
      immediate: true,
      handler: function() {
        setTimeout(() => {
          if (!this.autoSize) return;
          this.reSizeTextareaHeight();
        }, 0);
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("mouseup", this.checkSelection);
  },
  computed: {
    emitText() {
      // return throttleFn(() => {}, this.throttleTime);
      return () => {
        this.$emit("update:text", this.textContent);
      };
    },
    autoSize() {
      return this.rows === "auto";
    }
  },
  methods: {
    resetPreviewMinHeight() {
      setTimeout(() => {
        const textEl = document.getElementById(this.id);
        if (!textEl) return;
        const height = textEl.offsetHeight;
        this.$emit("update:htmlMinHeight", height);
      }, 0);
    },
    transferMarkdown(val) {
      marked.setOptions({
        breaks: true,
        gfm: true,
        langPrefix: "language-",
        highlight: function(code, lang, callback) {
          let html = require("highlight.js").highlightAuto(code).value;
          return html;
        }
      });
      const str = val + "";
      // if (!str.trim()) return;
      const html = marked(str);
      const virtualDom = document.createElement("div");
      virtualDom.innerHTML = html;
      virtualDom.querySelectorAll("code").forEach(item => {
        if (!/language-/.test(item.className)) {
          item.className = "language-javascript";
        }
      });
      const DOMPurify = require("dompurify");
      const cleanHtml = DOMPurify.sanitize(virtualDom.innerHTML, {
        FORBID_TAGS: ["style", "script"]
      });
      // console.log(html.length);
      // console.log(cleanHtml.length);

      const filteredTags = getFilteredTags(html, cleanHtml);
      this.$emit("getFilteredTags", filteredTags);
      this.$emit("update:html", cleanHtml);
    },
    input() {
      this.$emit("update:textLength", this.textContent.length);
      this.emitText();
    },
    reSizeTextareaHeight() {
      console.log("setHeight");

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
      this.editorHeight = this.fullScreen
        ? "calc(100% - 42px)"
        : this.height
        ? this.height + "px"
        : this.autoSize
        ? `${contentHeight + parseFloat(fontSize) * 1.2}px`
        : "auto";
      this.editorOverFlow =
        this.autoSize && !this.fullScreen && !this.height ? "hidden" : "auto";
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
    height: 100%;
    textarea {
      font-size: 20px;
      max-height: 100%;
      overflow-y: auto;
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
    font-family: "Menlo", -apple-system, SF UI Text, Arial, PingFang SC,
      Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif, SimHei,
      SimSun;
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
