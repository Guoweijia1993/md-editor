<template>
  <div class="tool_button">
    <span :class="['icon iconfont', `icon-${info.name}`]"></span>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style lang="less" scoped>
.tool_button {
  .icon {
    font-size: 18px;
    color: #666;
    cursor: pointer;
    &:hover {
      color: #000;
    }
  }
}
</style>
