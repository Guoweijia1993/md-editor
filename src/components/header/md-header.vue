<template>
  <div :class="['md_header', { active: isFocus }]">
    <div v-if="!disabled" class="header_tabs">
      <div
        :class="['tab_item', { active: canPreview && !showPreview }]"
        @click="setShowPreview(false)"
      >
        <!-- <span :class="['icon iconfont', `icon-bianji`]"></span> -->
        <span>编辑</span>
      </div>
      <div
        v-if="canPreview"
        :class="['tab_item', { active: showPreview }]"
        @click="setShowPreview(true)"
      >
        <!-- <span :class="['icon iconfont', `icon-yulan`]"></span> -->
        <span>预览</span>
      </div>
    </div>
    <div class="header_tools" v-if="!disabled && !showPreview">
      <tool-button
        :ref="item.name"
        :ulNum.sync="ulNum"
        :info="item"
        :fullScreen="fullScreen"
        @setFullScreen="$emit('update:fullScreen', $event)"
        @updateText="handleUpdateText"
        @upload="$emit('upload')"
        @setFormatType="setFormatType"
        @updateShowHelp="$emit('updateShowHelp', $event)"
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
  copyFormatRules,
  checkBoswer
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
    disabled: {
      type: Boolean,
      default: false
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
    },
    isMobile() {
      const isMobile = checkBoswer();
      return isMobile;
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
    },
    formatType: {
      handler: function(val) {
        this.$emit("getFormatType", val);
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
      scrollTop: 0,
      ulNum: 1,
      fullScreenBtn: {
        name: "fullScreen",
        icon: "fullScreen",
        tip: "全屏模式"
      },
      toolButtonList: [
        {
          name: "bold",
          icon: "bold",
          tip: "粗体",
          doc: "**内容**",
          startStr: "**",
          endStr: "**"
        },
        {
          name: "italic",
          icon: "italic",
          tip: "斜体",
          doc: "_内容_",
          startStr: "_",
          endStr: "_"
        },
        {
          name: "quote",
          icon: "yinyong",
          tip: "插入引用",
          doc: "> 内容",
          startStr: "\n> ",
          endStr: ""
        },
        {
          name: "format",
          icon: "geshishua",
          tip: "格式刷"
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
          doc: "[标题](链接)",
          startStr: "[链接标题](",
          endStr: ")"
        },
        {
          name: "ul",
          icon: "unorderedList",
          tip: "添加无序列表",
          doc: "- 空格",
          startStr: "\n- ",
          endStr: ""
        },
        {
          name: "ol",
          icon: "youxuliebiao",
          tip: "添加有序列表",
          doc: "1. 内容",
          startStr: "",
          endStr: ""
        },
        {
          name: "file",
          icon: "tupian",
          tip: "上传图片",
          startStr: "",
          endStr: ""
        },
        {
          name: "task",
          icon: "renwu",
          tip: "添加任务列表",
          doc: "- [空格] 内容",
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
          name: "help",
          icon: "help",
          tip: "Markdown语法"
        },
        {
          name: "fullScreen",
          icon: "fullScreen",
          tip: "全屏模式"
        }
      ]
    };
  },
  created() {},
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
      this.handleUpdateText({ ...formatType, copy: true });
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
      if (val) {
        const textEl = document.getElementById(this.id);
        this.scrollTop = textEl.scrollTop;
      } else {
        this.$nextTick(() => {
          const textEl = document.getElementById(this.id);
          if (!textEl) return;
          setTimeout(() => {
            textEl.scrollTop = this.scrollTop;
          }, 0);
        });
      }
    },

    handleUpdateText({ startStr, endStr, type, copy }) {
      const originalText = this.text;
      const selectionInfo = this.selectionInfo;
      let newText = formatText(originalText, selectionInfo, startStr, endStr);
      const s = selectionInfo.selectionStart;
      const e = selectionInfo.selectionEnd;
      if (copy) {
        const handleBlank = newText
          .slice(s, e)
          .replace(/(\n{2,})/g, `${endStr}$1${startStr}`);
        if (type !== "code") {
          newText =
            newText.slice(0, s) +
            handleBlank +
            newText.slice(e, newText.length);
        }
      }
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
      this.$nextTick(() => {
        textEl.focus();
        textEl.setSelectionRange(cursorPoint + len, cursorPoint + len);
        textEl.scrollTop = scrollTop;
      });
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
  // overflow-y: hidden;
  &.active {
    border-bottom: 1px solid var(--md-editor-border-color-active);
  }
  .header_tabs {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    // padding-bottom: 10px;
    box-sizing: border-box;
    .tab_item {
      color: var(--md-editor-text-color);
      cursor: pointer;
      position: relative;
      // height: 28px;
      padding: 0 6px 8px;
      box-sizing: border-box;
      &::after {
        display: block;
        content: "";
        position: absolute;
        bottom: -2px;
        width: 0;
        height: 2px;
        left: 50%;
        transform: translateX(-50%);
        background: transparent;
        transition: all 0.3s;
        // @media screen and (max-width: 768px) {
        //   bottom: -2px;
        // }
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
      .iconfont {
        font-size: 14px;
        display: inline-block;
      }
    }
  }
  .header_tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding-bottom: 10px;
    box-sizing: border-box;
  }
}
</style>
