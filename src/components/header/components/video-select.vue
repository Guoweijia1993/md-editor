<template>
  <div class="video_select_container">
    <ul>
      <li @click="$emit('addVideo', 'upload')">上传视频</li>
      <li @click="$emit('addVideo', 'link')">插入视频</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.video_select_container {
  position: relative;
}
ul {
  max-height: 142px;
  overflow-y: auto;
  margin-bottom: 2px;
  padding-top: 4px;
  box-sizing: border-box;
  scrollbar-color: transparent transparent;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1em;
    background-color: rgba(50, 50, 50, 0.3);
  }
  &::-webkit-scrollbar-track {
    border-radius: 1em;
    background-color: rgba(50, 50, 50, 0);
  }
  li {
    cursor: pointer;
    height: 24px;
    line-height: 24px;
    text-align: center;
    &:hover {
      color: var(--md-editor-border-color-active);
    }
  }
}
</style>
