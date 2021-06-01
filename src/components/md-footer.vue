<template>
  <div class="md_footer">
    <div class="doc"></div>
    <upload-files />
  </div>
</template>
<script>
import uploadFiles from "./upload-files";
export default {
  components: { uploadFiles },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.md_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--md-editor-theme-color);
  padding-top: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #666;
}
</style>
