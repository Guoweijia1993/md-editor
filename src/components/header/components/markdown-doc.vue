<template>
  <div class="tips">
    <div class="name">{{ name }}</div>
    <div class="doc" v-if="doc">Markdown: {{ doc }}</div>
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
.tips {
  text-align: center;
  .doc {
    color: #666;
  }
}
</style>
