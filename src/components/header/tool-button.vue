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
import { mapMutations, mapState } from "vuex";
import { updateText } from "@/assets/js/utils";
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
          updateText(startStr, endStr);
          break;
        case "ol":
          let ulNum = this.ulNum;
          updateText(`\n${ulNum++}. `, "");
          this.setUlNum(ulNum);
          break;
        case "fullScreen":
          this.setFullScreen(true);
          break;
        default:
          break;
      }
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
