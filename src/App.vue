<template>
  <div :class="['md_container', { active: isFocus }]">
    <markdown-header />
    <markdownPreview v-if="showPreview" />
    <markdown-editor v-else />
    <markdown-footer
      :can-attach-file="canAttachFile"
      v-if="!showPreview && canAttachFile"
    />
  </div>
</template>
<script>
import markdownHeader from "./components/header/md-header";
import markdownFooter from "./components/footer/md-footer";
import markdownEditor from "./components/content/md-textarea";
import markdownPreview from "./components/content/md-preview";
import { mapState } from "vuex";
export default {
  components: {
    markdownHeader,
    markdownFooter,
    markdownEditor,
    markdownPreview
  },

  computed: {
    ...mapState(["showPreview", "isFocus", "canAttachFile"])
  }
};
</script>
<style lang="less" scoped>
.md_container {
  width: 1000px;
  margin: 200px auto;
  border: 1px solid var(--md-editor-border-color);
  border-radius: 4px;
  padding: 10px 16px;
  box-sizing: border-box;
  transition: border 0.3s;
  &.active {
    border: 1px solid var(--md-editor-border-color-active);
  }
}
</style>
