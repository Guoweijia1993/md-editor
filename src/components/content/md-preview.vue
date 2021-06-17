<template>
  <div class="htmledit_views">
    <div v-html="html"></div>
  </div>
</template>
<script>
import marked from "marked";
import "highlight.js/styles/github.css";
export default {
  data() {
    return {};
  },
  props: {
    text: {
      type: [String, Number],
      default: ""
    },
    html: {
      type: String,
      default: ""
    }
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
  min-height: 170px;
  padding: 10px 0;
  box-sizing: border-box;
  color: var(--md-editor-text-color);
  word-break: break-all;
}
</style>
