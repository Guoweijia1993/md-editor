<template>
  <div
    class="md_select_user"
    :style="{ left: this.left + 'px', top: this.top + 'px' }"
  >
    选择用户弹窗
  </div>
</template>
<script>
export default {
  props: {
    position: {
      type: Object,
      default: () => {
        return {
          left: 0,
          top: 0
        };
      }
    }
  },
  watch: {
    position: {
      immediate: true,
      handler: function({ left, top }) {
        this.left = left + 14;
        this.top = top + 14;
      }
    }
  },
  data() {
    return {
      left: 0,
      top: 0
    };
  }
};
</script>
<style lang="less" scoped>
.md_select_user {
  position: fixed;
  width: 100px;
  height: 200px;
  background: #fff;
  border: 1px solid red;
  box-shadow: 0 1px 6px rgb(0 0 0 / 10%);
  border: 1px solid var(--md-editor-border-color);
  border-radius: 4px;
  z-index: var(--md-editor-fullScrren-zIndex);
  box-sizing: border-box;
  padding: 6px 8px;
  margin: 0;
}
</style>
