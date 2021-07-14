<template>
  <div
    v-if="isMobile"
    @click="handleTool(info.name, info.startStr, info.endStr)"
    class="tool_button"
  >
    <span :class="['icon iconfont', `icon-${info.icon}`]"></span>
  </div>
  <div
    v-else-if="info.name === 'code'"
    @click="handleTool(info.name, info.startStr, info.endStr)"
    v-tip.bottom="codeOptions"
    class="tool_button"
  >
    <span :class="['icon iconfont', `icon-${info.icon}`]"></span>
  </div>
  <div
    v-else-if="info.name === 'table'"
    @click="handleTool(info.name, info.startStr, info.endStr)"
    v-tip.bottom="tableOptions"
    class="tool_button"
  >
    <span :class="['icon iconfont', `icon-${info.icon}`]"></span>
  </div>
  <div
    v-else
    v-tip.bottom="options"
    @click="handleTool(info.name, info.startStr, info.endStr)"
    @dblclick="handleDbClick(info.name)"
    class="tool_button"
  >
    <span :class="['icon iconfont', `icon-${info.icon}`]"></span>
  </div>
</template>
<script>
import { formatText, checkBoswer } from "@/assets/js/utils";
import codeSelect from "./code-select";
import tableSelect from "./table-select";
export default {
  components: { codeSelect, tableSelect },
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
    zIndex: {
      type: [String, Number],
      default: ""
    },
    themeOptions: {
      type: Object,
      default: () => {}
    },
    selectionInfo: {
      type: Object,
      default: () => {}
    },
    ulNum: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {};
  },
  computed: {
    darkMode() {
      return this.themeOptions && this.themeOptions.dark;
    },
    isMobile() {
      const isMobile = checkBoswer();
      return isMobile;
    },
    options() {
      return {
        content: this.info.tip,
        zIndex: parseInt(this.zIndex) + 1,
        theme: this.darkMode ? "dark" : "light"
      };
    },
    codeOptions() {
      return {
        content: this.info.tip,
        customComponent: codeSelect,
        customClass: "codeSelectDialog",
        width: 110,
        customListeners: {
          select: val => {
            this.closeTips();
            const lang = val.toLowerCase().replace(/-/, "");
            this.handleTool("code", "\n```" + lang + "\n", "\n\n\n```");
          }
        },
        zIndex: parseInt(this.zIndex) + 1,
        theme: this.darkMode ? "dark" : "light"
      };
    },
    tableOptions() {
      return {
        content: this.info.tip,
        customClass: "tableSelectDialog",
        customComponent: tableSelect,
        customListeners: {
          select: val => {
            console.log(val);
            this.handleTool("table", val, "");
            this.closeTips();
          }
        },
        zIndex: parseInt(this.zIndex) + 1,
        theme: this.darkMode ? "dark" : "light"
      };
    }
  },
  methods: {
    closeTips() {
      Array.from(document.getElementsByClassName("v-tip-container")).map(
        item => {
          item.remove();
        }
      );
    },
    handleDbClick(type) {
      if (type !== "format") return;
      this.$emit("setFormatType", { lock: true });
    },
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
          this.$emit("updateText", { startStr, endStr });
          break;
        case "format":
          this.$emit("setFormatType", { lock: false });
          break;
        case "ol":
          let ulNum = this.ulNum;
          this.$emit("updateText", { startStr: `\n${ulNum++}. `, endStr: "" });
          this.$emit("update:ulNum", ulNum);
          break;
        case "file":
          this.$emit("upload");
          break;
        case "fullScreen":
          this.$emit("setFullScreen", true);
          break;
        case "cancelFullScreen":
          this.$emit("setFullScreen", false);
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
  padding: 4px 8px;
  box-sizing: border-box;
  cursor: pointer;
  &.active {
    .icon {
      color: var(--md-editor-border-color-active);
    }
  }
  .icon {
    font-size: 18px;
    color: var(--md-editor-text-color);
    @media (any-hover: hover) {
      &:hover {
        color: var(--md-editor-border-color-active);
      }
    }

    &.icon-quxiaoquanping_o {
      font-size: 24px;
      margin: 0 -4px;
    }
  }
}
</style>
