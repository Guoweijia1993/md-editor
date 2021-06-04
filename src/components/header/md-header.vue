<template>
  <div :class="['md_header', { active: isFocus }]">
    <div class="header_tabs">
      <div
        :class="['tab_item', { active: !showPreview }]"
        @click="setShowPreview(false)"
      >
        编辑
      </div>
      <div
        :class="['tab_item', { active: showPreview }]"
        @click="setShowPreview(true)"
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
import { mapState, mapMutations } from "vuex";
export default {
  components: { toolButton },
  computed: {
    ...mapState(["toolButtonList", "isFocus", "showPreview"])
  },
  methods: {
    ...mapMutations(["setShowPreview"])
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
