<template>
  <div class="md_preview">
    <div v-html="content"></div>
  </div>
</template>
<script>
export default {
  props: {
    content: {
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
.md_preview {
  min-height: 170px;
  padding: 10px 0;
  box-sizing: border-box;
  color: #303030;
}
</style>
