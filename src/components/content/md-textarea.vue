<template>
  <div :class="['md_textarea', { fullScreen, isFocus }]">
    <textarea
      spellcheck="false"
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
      @keyup="keyup"
      v-model="textContent"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :rows="rows"
      :disabled="disabled"
      :style="{
        height: editorHeight,
        overflow: editorOverFlow,
        cursor: disabled
          ? 'not-allowed'
          : formatType
          ? `url(https://codechina.csdn.net/codechina/operation-work/uploads/a1b7c2a995b2320dca911e2f2ecb9b88/format.png),text`
          : 'text'
      }"
    >
    </textarea>
    <transition name="slide-fade">
      <helpDoc
        v-if="showHelp"
        @updateShowHelp="$emit('updateShowHelp', $event)"
        :showHelp.sync="showHelp"
      />
    </transition>
    <transition name="slideup-fade">
      <selectUser v-show="showSelectUser" :position="selectUserPosition" />
    </transition>
  </div>
</template>
<script>
import {
  getSelectionInfo,
  getPosition,
  getFilteredTags,
  getLinkTags,
  formatText,
  addLanguageClass,
  throttle as throttleFn
} from "@/assets/js/utils";
import marked from "marked";
import selectUser from "./components/select-user";
import helpDoc from "./components/help-doc";
import DOMPurify from "dompurify";
export default {
  components: { helpDoc, selectUser },
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
    disabled: {
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
    },
    formatType: {
      default: ""
    },
    showHelp: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      textContent: "",
      editorHeight: "auto",
      editorOverFlow: "auto",
      showSelectUser: false,
      selectUserPosition: { left: 0, top: 0 }
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
      const html = marked(str); // 解析markdown
      const virtualDom = addLanguageClass(html); // 如果没指定语言，添加默认语言
      const cleanHtml = DOMPurify.sanitize(virtualDom.innerHTML, {
        FORBID_TAGS: [
          "style",
          "script",
          "select",
          "option",
          "input",
          "textarea",
          "form",
          "button"
        ]
      }); // 去除标签
      const filteredTags = getFilteredTags(html, cleanHtml); // 计算是否有标签被过滤
      // 链接转换为卡片
      const { vDom, links } = getLinkTags(this.id, cleanHtml);

      this.$emit("getFilteredTags", filteredTags);
      this.$emit("update:html", cleanHtml);
      if (links.length) this.$emit("renderLinksHtml", { vDom, links });
    },
    input() {
      this.$emit("update:textLength", this.textContent.length);
      this.emitText();
    },
    keyup(e) {
      if (e.key === "@") {
        this.createSelectUserDialog();
      }
      // console.log(e);

      if (e.code === "Space" || e.code === "Enter") {
        this.showSelectUser = false;
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
        selectionStart: cursorPoint - 1,
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
          left: pEl.getBoundingClientRect().left,
          top: pEl.getBoundingClientRect().top
        };
        textEl.parentNode.removeChild(hideEl);
        this.showSelectUser = true;
      });
    },
    createHideEl(type) {
      const textEl = document.getElementById(this.id);
      if (!textEl) return;
      const fontSize = getComputedStyle(textEl).getPropertyValue("font-size");
      const lineHeight = getComputedStyle(textEl).getPropertyValue(
        "line-height"
      );
      const fontFamily = getComputedStyle(textEl).getPropertyValue(
        "font-family"
      );
      const hideElId = type + this.id;
      let hideEl = document.getElementById(hideElId);
      if (!hideEl) {
        hideEl = document.createElement("div");
        textEl.parentNode.appendChild(hideEl);
      }
      hideEl.id = hideElId;
      hideEl.style.fontSize = fontSize;
      hideEl.style.lineHeight = lineHeight;
      hideEl.style.fontFamily = fontFamily;
      return hideEl;
    },
    reSizeTextareaHeight() {
      const textEl = document.getElementById(this.id);
      if (!textEl) return;
      const fontSize = getComputedStyle(textEl).getPropertyValue("font-size");

      const hideEl = this.createHideEl("clac_height_El_");
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
      this.checkSelection();
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
  &.disabled {
    background: var(--md-editor-content-bg-color-disabled);
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
    font-size: 14px;
    word-break: break-all;
    font-family: "Menlo", -apple-system, SF UI Text, Arial, PingFang SC,
      Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif, SimHei,
      SimSun;
    &::placeholder {
      color: var(--md-editor-text-color);
    }
    // &:disabled {
    //   background: var(--md-editor-content-bg-color-disabled);
    // }
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
