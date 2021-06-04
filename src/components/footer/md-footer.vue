<template>
  <div :class="['md_footer', { active: isFocus }]">
    <div class="doc"></div>
    <upload-files v-if="canAttachFile" />
  </div>
</template>
<script>
import uploadFiles from "./upload-files";
import { mapState } from "vuex";
export default {
  components: { uploadFiles },
  computed: {
    ...mapState(["isFocus", "canAttachFile"])
  }
};
</script>
<style lang="less" scoped>
.md_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--md-editor-border-color);
  padding-top: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: var(--md-editor-text-color);
  transition: border-top 0.3s;
  &.active {
    border-top: 1px solid var(--md-editor-border-color-active);
  }
}
</style>
