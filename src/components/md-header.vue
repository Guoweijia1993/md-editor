<template>
  <div class="md_header">
    <div class="header_tabs">
      <div
        :class="['tab_item', { active: !showPreview }]"
        @click="toggleTab('edit')"
      >
        编辑
      </div>
      <div
        :class="['tab_item', { active: showPreview }]"
        @click="toggleTab('preview')"
      >
        预览
      </div>
    </div>
    <div class="header_tools" v-if="!showPreview">
      <tool-button
        :info="item"
        v-for="(item, index) in toolButtonList"
        :key="index"
      />
    </div>
  </div>
</template>
<script>
import toolButton from "./tool-button";
export default {
  components: { toolButton },
  props: {
    showPreview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      toolButtonList: [
        {
          name: "bold",
          format: "**"
        },
        {
          name: "italic"
        },
        {
          name: "baojiaquotation"
        },
        {
          name: "code"
        },
        {
          name: "lianjie"
        },
        {
          name: "unorderedList"
        },
        {
          name: "youxuliebiao"
        },
        {
          name: "renwu"
        },
        {
          name: "biaoge"
        },
        {
          name: "fullScreen"
        }
      ]
    };
  },
  methods: {
    toggleTab(type) {
      this.$emit("update:showPreview", type === "preview");
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
  border-bottom: 1px solid var(--md-editor-theme-color);
  .header_tabs {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding-bottom: 10px;
    box-sizing: border-box;
    .tab_item {
      color: #666;
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
        color: #000;
        &::after {
          width: 100%;
          background: #666;
        }
      }
      &.active {
        color: #000;
        font-weight: 700;
        &::after {
          width: 100%;
          background: var(--md-editor-theme-color-active);
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
