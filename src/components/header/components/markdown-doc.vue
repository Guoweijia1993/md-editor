<template>
  <div class="md_doc_tips">
    <div class="name">{{ name }}</div>
    <!-- <div class="doc" v-if="doc">Markdown: {{ doc }}</div> -->
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    doc: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.md_doc_tips {
  text-align: center;
  .doc {
    color: var(--md-editor-text-color-active);
  }
}
</style>
