<template>
  <div class="relative">
    <div :class="['md_preview', { fullScreen }]">
      <div
        class="md_preview_scroll_container"
        v-html="html"
        @scroll="getScrollBarTop"
        :style="{
          height: height > 0 ? height + 'px' : 'auto',
          'min-height': htmlMinHeight + 'px'
        }"
      ></div>
    </div>
    <transition name="slide-fade">
      <helpDoc
        v-if="showHelp === 'help'"
        @updateShowDoc="$emit('updateShowDoc', $event)"
        :showHelp.sync="showHelp"
      />
      <dirDoc
        v-if="showHelp === 'dir'"
        @updateShowDoc="$emit('updateShowDoc', $event)"
        :showHelp.sync="showHelp"
        :dirTags="dirTags"
        :scrollBarTop.sync="scrollBarTop"
      />
    </transition>
  </div>
</template>
<script>
import helpDoc from "./components/help-doc.vue";
import dirDoc from "./components/toc-doc.vue";
export default {
  components: { helpDoc, dirDoc },
  data() {
    return {
      scrollBarTop: 0
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
    htmlMinHeight: {
      default: ""
    },
    height: {
      type: Number,
      default: 0
    },
    html: {
      type: [String, Promise],
      default: ""
    },
    showHelp: {
      type: [Boolean, String],
      default: false
    },
    dirTags: {
      type: Array,
      default: () => []
    },
    fullScreen: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.addClass();
    this.addControls();
  },
  updated() {
    this.addClass();
    this.addControls();
  },
  methods: {
    addClass() {
      setTimeout(() => {
        const previewDomList = document.querySelectorAll(".md_preview code");
        if (!previewDomList.length) return;
        previewDomList.forEach(item => {
          item.className += " md_hljs";
        });
      }, 0);
    },
    addControls() {
      setTimeout(() => {
        const videoDomList = document.querySelectorAll(".md_preview video");
        if (!videoDomList.length) return;
        videoDomList.forEach(item => {
          item.setAttribute("preload", "auto");
        });
      }, 0);
    },
    getScrollBarTop() {
      if (this.showHelp === "dir")
        this.scrollBarTop = document.querySelector(
          ".md_preview_scroll_container"
        ).scrollTop;
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
  overflow-y: auto;
  .md_preview_scroll_container {
    overflow-y: auto;
    position: relative;
    scroll-behavior: smooth;
  }
  &.fullScreen {
    max-height: calc(100% - 42px);
    overflow-y: auto;
  }
  .help_doc {
    height: 100%;
  }
}
</style>
