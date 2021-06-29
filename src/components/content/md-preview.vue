<template>
  <div :class="['md_preview', { fullScreen }]">
    <div v-html="html" :style="{ 'min-height': htmlMinHeight + 'px' }"></div>
  </div>
</template>
<script>
import marked from "marked";
export default {
  data() {
    return {};
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
    htmlMinHeight: {
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
    this.addClass();
  },
  updated() {
    this.addClass();
  },
  methods: {
    addClass() {
      setTimeout(() => {
        const previewDom = document.querySelector(".md_preview code");
        if (!previewDom) return;
        previewDom.className = "md_hljs";
      }, 0);
    }
  }
};
</script>
<style lang="less" scoped>
.md_preview {
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
