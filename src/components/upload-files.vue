<template>
  <div class="upload_files" @click="upload">
    <span :class="['icon iconfont', 'icon-tupian']"></span>
    <span>添加附件</span>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    upload() {}
  }
};
</script>
<style lang="less" scoped>
.upload_files {
  cursor: pointer;
  .icon {
    font-size: 20px;
    color: #666;
    cursor: pointer;
    display: inline-block;
    vertical-align: bottom;
    &:hover {
      color: #000;
    }
  }
}
</style>
