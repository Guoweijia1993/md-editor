<template>
  <div v-if="isMobile" @click="mobileClick" class="tool_button">
    <span :class="['icon iconfont', `icon-${info.icon}`]"></span>
  </div>
  <transition-group
    style="position:relative"
    name="loading"
    v-else-if="info.icon === 'loading'"
  >
    <div key="loading" class="tool_button loading_button">
      <span class="circle">
        <span class="loading"></span>
        <span class="percent">{{ info.percent + "%" }}</span>
      </span>
      <!-- <span :class="['icon loading iconfont', `icon-${info.icon}`]"> </span> -->
    </div>
  </transition-group>
  <!-- 自定义的工具 -->
  <div
    class="tool_button"
    @click="info.click"
    v-tip.bottom="info.tip"
    v-else-if="info.register"
  >
    <img :src="info.icon" alt="" />
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
    v-else-if="info.name === 'headline'"
    v-tip.bottom="headlineOptions"
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
  <transition-group name="loading" v-else-if="info.name === 'video'">
    <div
      key="video"
      @click="handleTool(info.name, info.startStr, info.endStr)"
      v-tip.bottom="videoOptions"
      class="tool_button"
    >
      <span :class="['icon iconfont', `icon-${info.icon}`]"></span>
    </div>
  </transition-group>
  <transition-group name="loading" v-else>
    <div
      key="tool"
      v-tip.bottom="options"
      @click="handleTool(info.name, info.startStr, info.endStr)"
      @dblclick="handleDbClick(info.name)"
      class="tool_button"
    >
      <span :class="['icon iconfont', `icon-${info.icon}`]"></span>
    </div>
  </transition-group>
</template>
<script>
import { checkBoswer } from "@/assets/js/utils";
import codeSelect from "./code-select";
import videoSelect from "./video-select";
import tableSelect from "./table-select";
import markdownDoc from "./markdown-doc";
import headlineSelect from "./headline-select";
export default {
  components: { codeSelect, tableSelect, videoSelect, headlineSelect },
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
        customComponent: markdownDoc,
        customProps: {
          name: this.info.tip,
          doc: this.info.doc
        },
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
    videoOptions() {
      return {
        // content: this.info.tip,
        customComponent: videoSelect,
        customClass: "videoSelectDialog",
        width: 72,
        customListeners: {
          addVideo: val => {
            this.closeTips();
            switch (val) {
              case "link":
                this.handleTool("code", "![video](", ")\n");
                break;
              case "upload":
                this.$emit("upload", "video");
                break;
              default:
                break;
            }
          }
        },
        zIndex: parseInt(this.zIndex) + 1,
        theme: this.darkMode ? "dark" : "light"
      };
    },
    headlineOptions() {
      return {
        content: this.info.tip,
        customComponent: headlineSelect,
        customClass: "headlineSelectDialog",
        width: 110,
        customListeners: {
          select: val => {
            this.closeTips();
            const lang = "#".repeat(val + 1);
            this.handleTool("code", "\n" + lang + " ", "\n");
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
    mobileClick() {
      setTimeout(() => {
        this.handleTool(this.info.name, this.info.startStr, this.info.endStr);
      }, 0);
    },
    closeTips() {
      Array.from(document.getElementsByClassName("v-tip-container")).map(
        item => {
          // item.remove();
          item.style.display = "none";
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
        case "call":
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
        case "img":
          this.$emit("upload", "img");
          break;
        case "file":
          this.$emit("upload", "file");
          break;
        case "video":
          this.$emit("upload", "video");
          break;
        case "file":
          this.$emit("upload", "file");
          break;
        case "fullScreen":
          this.$emit("setFullScreen", true);
          break;
        case "cancelFullScreen":
          this.$emit("setFullScreen", false);
          break;
        case "help":
          this.$emit("updateShowHelp", true);
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@keyframes rotate {
  from {
    transform: translateY(-50%) rotate(0deg);
  }
  to {
    transform: translateY(-50%) rotate(359deg);
  }
}
.tool_button {
  padding: 0 8px 8px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  line-height: 1;
  overflow: hidden;
  &.active {
    .icon {
      color: var(--md-editor-border-color-active);
    }
  }
  &.loading_button {
    padding: 0 2px 8px;
  }
  .circle {
    display: inline-block;
    width: 30px;
    height: 16px;
    border: 1px solid var(--md-editor-border-color-active);
    border-radius: 10px;
    vertical-align: text-bottom;
    position: relative;
    box-sizing: border-box;
    .loading {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 18px;
      height: 6px;
      background: #fff;
      animation: rotate 3s linear infinite;
      transform-origin: 0 50%;
      border-radius: 10px;
    }
    .percent {
      font-size: 12px;
      line-height: 15px;
      position: absolute;
      z-index: 99;
      top: 50%;
      left: 50%;
      color: var(--md-editor-border-color-active);
      transform: translate(-50%, -50%) scale(0.8);
      white-space: nowrap;
    }
  }
  img {
    width: 18px;
    display: inline-block;
    vertical-align: text-bottom;
  }
  .icon {
    font-size: 18px;
    color: var(--md-editor-text-color);
    display: inline-block;
    vertical-align: text-bottom;
    @media screen and (max-width: 768px) {
      vertical-align: text-top;
    }
    @media (any-hover: hover) {
      &:hover {
        color: var(--md-editor-border-color-active);
      }
    }
    &.icon-quxiaoquanping_o {
      font-size: 24px;
      margin: 0 -4px;
    }
    &.icon-unorderedList,
    &.icon-youxuliebiao {
      font-size: 18px;
    }
    &.icon-geshishua {
      font-size: 15px;
    }
    &.icon-lianjie {
      font-size: 16px;
    }
    &.icon-file {
      font-size: 19px;
    }
  }
}
</style>
