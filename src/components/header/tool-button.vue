<template>
  <div @click="handleTool(info.name)" class="tool_button">
    <span :class="['icon iconfont', `icon-${info.icon}`]"></span>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { formatText } from "@/assets/js/utils";
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState(["selectionInfo", "text", "ulNum"])
  },
  methods: {
    ...mapMutations(["setFullScreen", "setText", "setUlNum"]),
    handleTool(type) {
      switch (type) {
        case "bold":
          this.updateText("**", "**");
          break;
        case "italic":
          this.updateText("_", "_");
          break;
        case "quote":
          this.updateText("\n> ", "");
          break;
        case "code":
          this.updateText("`", "`");
          break;
        case "link":
          this.updateText("[", "](url)");
          break;
        case "ul":
          this.updateText("\n- ", "");
          break;
        case "ol":
          let ulNum = this.ulNum;
          this.updateText(`\n${ulNum++}. `, "");
          this.setUlNum(ulNum);
          break;
        case "task":
          this.updateText("\n- [ ] ", "");
          break;
        case "table":
          this.updateText(
            `\n\n| header | header |\n| ------ | ------ |\n| cell | cell |\n| cell | cell |\n\n`,
            ""
          );
          break;
        case "fullScreen":
          this.setFullScreen(true);
          break;

        default:
          break;
      }
    },
    updateText(startStr, endStr) {
      const selectionInfo = this.selectionInfo;
      const originalText = this.text;
      const newText = formatText(originalText, selectionInfo, startStr, endStr);
      if (!newText) return;
      this.setText(newText);
    }
  }
};
</script>
<style lang="less" scoped>
.tool_button {
  .icon {
    font-size: 18px;
    color: var(--md-editor-text-color);
    cursor: pointer;
    &:hover {
      color: var(--md-editor-text-color-active);
    }
  }
}
</style>
