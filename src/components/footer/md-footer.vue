<template>
  <div :class="['md_footer', { active: isFocus }]">
    <div class="doc"></div>
    <upload-files />
  </div>
</template>
<script>
import uploadFiles from "./upload-files";
import { mapState } from "vuex";
export default {
  components: { uploadFiles },
  data() {
    return {};
  },
  computed: {
    ...mapState(["isFocus"])
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
  color: var(--md-editor-text-color);
  transition: border-top 0.3s;
  &.active {
    border-top: 1px solid var(--md-editor-theme-color-active);
  }
}
</style>
