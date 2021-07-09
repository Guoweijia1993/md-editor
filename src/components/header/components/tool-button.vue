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
    class="tool_button"
  >
    <span :class="['icon iconfont', `icon-${info.icon}`]"></span>
  </div>
</template>
<script>
import { formatText, checkBoswer } from "@/assets/js/utils";
import languageList from "./language-list";
import tableSelect from "./table-select";
export default {
  components: { languageList, tableSelect },
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
    return {
      // ulNum: 1
    };
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
        customComponent: languageList,
        customListeners: {
          select: val => {
            console.log(val);
            const lang = val.toLowerCase().replace(/-/, "");
            this.handleTool("code", "\n```" + lang, "\n\n\n```");
          }
        },
        zIndex: parseInt(this.zIndex) + 1,
        theme: this.darkMode ? "dark" : "light"
      };
    },
    tableOptions() {
      return {
        content: this.info.tip,
        customComponent: tableSelect,
        customListeners: {
          select: val => {
            console.log(val);
            const lang = val.toLowerCase().replace(/-/, "");
            this.handleTool("code", "\n```" + lang, "\n\n\n```");
          }
        },
        zIndex: parseInt(this.zIndex) + 1,
        theme: this.darkMode ? "dark" : "light"
      };
    }
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
          this.updateText(`\n${ulNum++}. `, "");
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
    },
    updateText(startStr, endStr) {
      const originalText = this.text;
      const selectionInfo = this.selectionInfo;
      const newText = formatText(originalText, selectionInfo, startStr, endStr);
      const len =
        selectionInfo.selectionEnd -
        selectionInfo.selectionStart +
        startStr.length;

      this.$emit("updateText", { val: newText, len });
    }
  }
};
</script>
<style lang="less" scoped>
.tool_button {
  padding: 4px 8px;
  box-sizing: border-box;
  cursor: pointer;
  .icon {
    font-size: 18px;
    color: var(--md-editor-text-color);
    @media (any-hover: hover) {
      &:hover {
        color: var(--md-editor-text-color-active);
      }
    }
    &.icon-quxiaoquanping_o {
      font-size: 24px;
      margin: 0 -4px;
    }
  }
}
</style>
