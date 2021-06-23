<template>
  <div :class="['htmledit_views', { fullScreen }]">
    <div v-html="html" :style="{ 'min-height': htmlHeight + 'px' }"></div>
  </div>
</template>
<script>
import marked from "marked";
import "highlight.js/styles/github.css";
export default {
  data() {
    return {
      htmlHeight: 150
    };
  },
  props: {
    id: {
      type: String,
      default: ""
    },
    text: {
      type: [String, Number],
      default: ""
    },
    html: {
      type: String,
      default: ""
    },
    fullScreen: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.resetHeight();
  },
  methods: {
    transferMarkdown(val) {
      marked.setOptions({
        highlight: function(code, lang, callback) {
          const html = require("highlight.js").highlightAuto(code).value;
          return html;
        }
      });
      const str = val + "";
      // if (!str.trim()) return;
      const html = marked(str);
      this.$emit("update:html", html);
    },
    resetHeight() {
      const textEl = document.getElementById(this.id);
      if (!textEl) return;
      const height = textEl.offsetHeight;
      this.htmlHeight = height;
    }
  },
  watch: {
    text: {
      immediate: true,
      handler: function(val) {
        this.transferMarkdown(val);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.htmledit_views {
  // min-height: 148px;
  padding: 14px 0;
  box-sizing: border-box;
  color: var(--md-editor-text-color);
  word-break: break-all;
  &.fullScreen {
    max-height: calc(100% - 42px);
    overflow-y: auto;
  }
}
</style>
