<template>
  <div :class="['md_header', { active: isFocus }]">
    <div class="header_tabs">
      <div
        :class="['tab_item', { active: canPreview && !showPreview }]"
        @click="setShowPreview(false)"
      >
        编辑
      </div>
      <div
        v-if="canPreview"
        :class="['tab_item', { active: showPreview }]"
        @click="setShowPreview(true)"
      >
        预览
      </div>
    </div>
    <div class="header_tools" v-if="!showPreview">
      <tool-button
        :ref="item.name"
        :ulNum.sync="ulNum"
        :info="item"
        :fullScreen="fullScreen"
        @setFullScreen="$emit('update:fullScreen', $event)"
        @updateText="handleUpdateText"
        @upload="$emit('upload')"
        @setFormatType="setFormatType"
        :class="{ active: item.name === 'format' && formatType }"
        v-for="(item, index) in toolsShow"
        :key="index"
        :text="text"
        :formatType.sync="formatType"
        :zIndex="zIndex"
        :themeOptions="themeOptions"
        :selectionInfo="selectionInfo"
      />
    </div>
  </div>
</template>
<script>
import {
  isNotFalse,
  formatText,
  getPosition,
  removeBlankLine,
  copyFormatRules
} from "@/assets/js/utils";
import toolButton from "./components/tool-button";
export default {
  components: { toolButton },
  props: {
    id: {
      type: String,
      default: ""
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    isFocus: {
      type: Boolean,
      default: false
    },
    showPreview: {
      type: Boolean,
      default: false
    },
    canPreview: {
      type: Boolean,
      default: true
    },
    themeOptions: {
      type: Object,
      default: () => {}
    },
    toolsOptions: {
      type: Object,
      default: () => {}
    },
    zIndex: {
      type: [String, Number],
      default: ""
    },
    tabSize: {
      type: [String, Number],
      default: ""
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
  computed: {
    toolsShow() {
      const toolsList = this.toolButtonList;
      const toolsOptions = this.toolsOptions;
      if (!toolsOptions) return toolsList;
      return toolsList.filter(item => {
        return isNotFalse(toolsOptions[item.name]);
      });
    }
  },
  watch: {
    fullScreen: {
      handler: function(val) {
        // console.log(val);
        if (val) {
          this.toolButtonList.pop();
          this.toolButtonList.push(this.cancelFullScreenBtn);
        } else {
          this.toolButtonList.pop();
          this.toolButtonList.push(this.fullScreenBtn);
        }
      }
    },
    selectionInfo: {
      handler: function(newVal, oldVal) {
        if (
          newVal.selectionStart === oldVal.selectionStart &&
          newVal.selectionEnd === oldVal.selectionEnd
        )
          return;
        this.copyFormat();
      }
    }
  },
  data() {
    return {
      cursorPoint: "",
      cancelFullScreenBtn: {
        name: "cancelFullScreen",
        icon: "quxiaoquanping_o",
        tip: "退出全屏"
      },
      formatType: "", // 格式刷类型
      lock: false,
      ulNum: 1,
      fullScreenBtn: {
        name: "fullScreen",
        icon: "fullScreen",
        tip: "全屏模式"
      },
      toolButtonList: [
        {
          name: "format",
          icon: "geshishua",
          tip: "格式刷"
        },
        {
          name: "bold",
          icon: "bold",
          tip: "粗体",
          startStr: "**",
          endStr: "**"
        },
        {
          name: "italic",
          icon: "italic",
          tip: "斜体",
          startStr: "_",
          endStr: "_"
        },
        {
          name: "quote",
          icon: "yinyong",
          tip: "插入引用",
          startStr: "\n> ",
          endStr: ""
        },
        {
          name: "code",
          icon: "code",
          tip: "插入代码块",
          startStr: "\n```\n",
          endStr: "\n\n\n```"
        },
        {
          name: "link",
          icon: "lianjie",
          tip: "添加链接",
          startStr: "[链接](",
          endStr: ")"
        },
        {
          name: "ul",
          icon: "unorderedList",
          tip: "添加无序列表",
          startStr: "\n- ",
          endStr: ""
        },
        {
          name: "ol",
          icon: "youxuliebiao",
          tip: "添加有序列表",
          startStr: "",
          endStr: ""
        },
        {
          name: "file",
          icon: "tupian",
          tip: "上传文件",
          startStr: "",
          endStr: ""
        },
        {
          name: "task",
          icon: "renwu",
          tip: "添加任务列表",
          startStr: "\n- [ ] ",
          endStr: ""
        },
        {
          name: "table",
          icon: "biaoge",
          tip: "添加表格",
          startStr:
            "\n\n| 表头 | 表头 |\n| ------ | ------ |\n| 单元格 | 单元格 |\n| 单元格 | 单元格 |\n\n",
          endStr: ""
        },
        {
          name: "fullScreen",
          icon: "fullScreen",
          tip: "全屏模式"
        }
      ]
    };
  },
  methods: {
    resetUlNum() {
      this.ulNum = 1;
    },
    setFormatType({ lock }) {
      if (this.formatType) {
        this.formatType = "";
        return;
      }
      const selectionInfo = this.selectionInfo;
      const selection = this.text.slice(
        selectionInfo.selectionStart,
        selectionInfo.selectionEnd
      );
      const formatType = copyFormatRules(selection);
      this.formatType = formatType;
      this.lock = lock;
    },
    copyFormat() {
      const selectionInfo = this.selectionInfo;
      const formatType = this.formatType;
      if (
        selectionInfo.selectionStart === selectionInfo.selectionEnd ||
        !formatType
      )
        return;
      this.handleUpdateText(formatType);
      if (this.lock) return;
      this.formatType = "";
    },
    tab() {
      const textEl = document.getElementById(this.id);
      const scrollTop = textEl.scrollTop;
      let startStr = "";
      const tabSize = parseInt(this.tabSize);
      Array.from({ length: tabSize }).forEach(() => {
        startStr += " ";
      });
      const endStr = "";
      const originalText = this.text;
      const cursorPoint = getPosition(this.id);
      const selectionInfo = {
        selectionStart: cursorPoint,
        selectionEnd: cursorPoint
      };
      const newText = formatText(originalText, selectionInfo, startStr, endStr);
      const len = newText.length - originalText.length;
      this.updateText(newText, len, scrollTop);
    },
    setShowPreview(val) {
      this.$emit("update:showPreview", val);
    },

    handleUpdateText({ startStr, endStr }) {
      const originalText = this.text;
      const selectionInfo = this.selectionInfo;
      const newText = formatText(originalText, selectionInfo, startStr, endStr);
      const len =
        selectionInfo.selectionEnd -
        selectionInfo.selectionStart +
        startStr.length;
      this.updateText(newText, len);
    },
    updateText(val, len = 0) {
      const textEl = document.getElementById(this.id);
      const scrollTop = textEl.scrollTop;
      textEl.blur();
      const cursorPoint = getPosition(this.id);
      this.$emit("update:text", removeBlankLine(val));
      this.$emit("update:selectionInfo", {
        selectorId: "",
        selectionStart: "",
        selectionEnd: ""
      });
      setTimeout(() => {
        textEl.focus();
        textEl.setSelectionRange(cursorPoint + len, cursorPoint + len);
        textEl.scrollTop = scrollTop;
      }, 0);
    }
  }
};
</script>
<style lang="less" scoped>
.md_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  transition: border-bottom 0.3s;
  border-bottom: 1px solid var(--md-editor-border-color);
  &.active {
    border-bottom: 1px solid var(--md-editor-border-color-active);
  }
  .header_tabs {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding-bottom: 10px;
    box-sizing: border-box;
    .tab_item {
      color: var(--md-editor-text-color);
      cursor: pointer;
      position: relative;
      padding: 0 6px;
      box-sizing: border-box;
      &::after {
        display: block;
        content: "";
        position: absolute;
        bottom: -12px;
        width: 0;
        height: 3px;
        left: 50%;
        transform: translateX(-50%);
        background: transparent;
        transition: all 0.3s;
      }

      &:hover {
        color: var(--md-editor-text-color-active);
        &::after {
          width: 100%;
          background: var(--md-editor-border-color-active);
        }
      }
      &.active {
        color: var(--md-editor-text-color-active);
        font-weight: 700;
        &::after {
          width: 100%;
          background: var(--md-editor-border-color-active);
        }
      }
      & + .tab_item {
        margin-left: 10px;
      }
    }
  }
  .header_tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
}
</style>
