<template>
  <div class="md_container">
    <markdown-header :showPreview.sync="showPreview" />
    <markdownPreview v-if="showPreview" :content="html" />
    <textarea
      v-else
      @change="changeText"
      @focus="isFocus = true"
      @blur="isFocus = false"
      v-model="text"
      rows="10"
    ></textarea>

    <markdown-footer v-if="!showPreview" />
  </div>
</template>
<script>
import markdownHeader from "./components/md-header";
import markdownFooter from "./components/md-footer";
import markdownPreview from "./components/md-preview";
import marked from "marked";
export default {
  components: { markdownHeader, markdownFooter, markdownPreview },
  data() {
    return {
      text: "",
      html: "",
      showPreview: false,
      isFocus: false
    };
  },
  methods: {
    changeText() {
      const text = this.text;
      this.html = marked(text);
      this.$emit("change", { text, html: this.html });
    }
  }
};
</script>
<style lang="less" scoped>
.md_container {
  width: 1000px;
  margin: 200px auto;
  border: 1px solid var(--md-editor-theme-color);
  border-radius: 4px;
  padding: 10px 16px;
  box-sizing: border-box;
  textarea {
    display: block;
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    color: #303030;
    resize: none;
    font-family: "Menlo", "DejaVu Sans Mono", "Liberation Mono", "Consolas",
      "Ubuntu Mono", "Courier New", "andale mono", "lucida console", monospace;
  }
}
</style>
