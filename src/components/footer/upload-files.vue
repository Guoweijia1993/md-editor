<template>
  <div class="upload_files" @click="$refs.mdUploadFile.click()">
    <span class="icon iconfont icon-tupian"></span>
    <input
      ref="mdUploadFile"
      class="md_upload"
      type="file"
      name="md-upload-file"
      id="md-upload-file"
      @change="upload"
    />
    <span>添加附件</span>
  </div>
</template>
<script>
export default {
  props: {
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    upload(e) {
      const fileList = Array.from(e.target.files);
      this.$emit("changeFileList", fileList);
    }
  }
};
</script>
<style lang="less" scoped>
.upload_files {
  cursor: pointer;
  .icon {
    font-size: 20px;
    color: var(--md-editor-text-color);
    cursor: pointer;
    display: inline-block;
    vertical-align: bottom;
  }
  &:hover {
    color: var(--md-editor-text-color-active);
  }
  .md_upload {
    display: none;
  }
}
</style>
