<template>
  <div class="md_preview">
    <div v-html="html"></div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import marked from "marked";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["text", "html"])
  },
  methods: {
    ...mapMutations(["setHtml"]),
    transferMarkdown(val) {
      if (!val.trim()) return;
      const html = marked(val);
      this.setHtml(html);
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
.md_preview {
  min-height: 170px;
  padding: 10px 0;
  box-sizing: border-box;
  color: var(--md-editor-text-color);
  word-break: break-all;
}
</style>
