<template>
  <div
    v-tip.top="info.tip"
    @click="handleTool(info.name, info.startStr, info.endStr)"
    class="tool_button"
  >
    <span :class="['icon iconfont', `icon-${info.icon}`]"></span>
  </div>
</template>
<script>
import { formatText } from "@/assets/js/utils";
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    text: {
      type: [String, Number],
      default: ""
    },
    selectionInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ulNum: 1
    };
  },
  methods: {
    handleTool(type, startStr, endStr) {
      switch (type) {
        case "bold":
        case "italic":
        case "quote":
        case "code":
        case "link":
        case "ul":
        case "task":
        case "table":
          this.updateText(startStr, endStr);
          break;
        case "ol":
          let ulNum = this.ulNum;
          this.updateText(`\n${ulNum}. `, "");
          this.ulNum++;
          break;
        case "file":
          this.$emit("upload");
          break;
        case "fullScreen":
          this.$emit("setFullScreen", true);
          break;
        default:
          break;
      }
    },
    updateText(startStr, endStr) {
      const originalText = this.text;
      const selectionInfo = this.selectionInfo;
      const newText = formatText(originalText, selectionInfo, startStr, endStr);
      this.$emit("updateText", newText);
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
    &.icon-tupian {
      font-size: 24px;
    }
  }
}
</style>
