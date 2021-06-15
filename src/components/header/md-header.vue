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
        :info="item"
        :fullScreen="fullScreen"
        @setFullScreen="$emit('update:fullScreen', true)"
        @updateText="updateText"
        v-for="(item, index) in toolsShow"
        :key="index"
        :text="text"
        :selectionInfo="selectionInfo"
      />
    </div>
  </div>
</template>
<script>
import { isNotFalse } from "@/assets/js/utils";
import toolButton from "./tool-button";
export default {
  components: { toolButton },
  props: {
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
    toolsOptions: {
      type: Object,
      default: () => {}
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
  data() {
    return {
      toolButtonList: [
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
          icon: "baojiaquotation",
          tip: "插入引用",
          startStr: "\n> ",
          endStr: ""
        },
        {
          name: "code",
          icon: "code",
          tip: "插入代码",
          startStr: "`",
          endStr: "`"
        },
        {
          name: "link",
          icon: "lianjie",
          tip: "添加链接",
          startStr: "[",
          endStr: "](url)"
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
            "\n\n| header | header |\n| ------ | ------ |\n| cell | cell |\n| cell | cell |\n\n",
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
    setShowPreview(val) {
      this.$emit("update:showPreview", val);
    },
    updateText(val) {
      this.$emit("update:text", val);
      this.$emit("update:selectionInfo", {
        selectorId: "",
        selectionStart: "",
        selectionEnd: ""
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
          background: var(--md-editor-border-color);
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
    /deep/.tool_button {
      margin: 0 8px;
    }
  }
}
</style>
