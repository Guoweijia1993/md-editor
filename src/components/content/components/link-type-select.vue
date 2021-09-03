<template>
  <div
    class="md_select_container"
    :style="{ left: this.left + 'px', top: this.top + 'px' }"
  >
    <ul v-show="list.length" class="md_select_user">
      <li class="choose_title">显示为</li>
      <li
        @click="selectLinkType(index)"
        v-for="(item, index) in list"
        :key="index"
        :id="linkTypeItemId(index)"
        :class="[{ active: isActive(index) }]"
      >
        <span
          :class="['md_select_user_avatar icon iconfont', `icon-${item.icon}`]"
        ></span>
        <div class="md_select_user_info">
          <div class="md_select_user_name">{{ item.nickname }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    position: {
      type: Object,
      default: () => {
        return {
          left: 0,
          top: 0
        };
      }
    },
    activeLinkTypeIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    position: {
      immediate: true,
      handler: function({ left, top }) {
        this.left = left;
        this.top = top + 40;
      }
    }
  },
  data() {
    return {
      left: 0,
      top: 0,
      list: [
        {
          avatar: "",
          icon: "kapian",
          nickname: "卡片"
        },
        {
          avatar: "",
          icon: "biaoti",
          nickname: "标题"
        },
        {
          avatar: "",
          icon: "lianjie",
          nickname: "链接"
        }
      ],
      selectDisable: false
    };
  },
  methods: {
    selectLinkType(index) {
      if (this.selectDisable) return;
      this.selectDisable = true;
      this.$emit("selectLinkType", index);
      setTimeout(() => {
        this.selectDisable = false;
      }, 1000);
    },
    isActive(index) {
      return index === this.activeLinkTypeIndex;
    },
    linkTypeItemId(index) {
      return "md_link_type_id_" + index;
    }
  }
};
</script>
<style lang="less" scoped>
.md_select_container {
  position: absolute;
  background: var(--md-editor-content-bg-color);
  box-shadow: 0 1px 6px rgb(0 0 0 / 10%);
  border: 1px solid var(--md-editor-border-color);
  border-radius: 4px;
  z-index: var(--md-editor-fullScrren-zIndex);
  margin: 0;
  .md_select_user {
    max-height: 196px;
    width: 120px;
    padding: 6px 0;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-color: transparent transparent;
    scrollbar-width: none;
    margin: 0 !important;
    list-style: none !important;
    scroll-behavior: smooth;
    .choose_title {
      color: var(--md-editor-text-color-active);
      font-size: 12px;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 1em;
      background-color: rgba(50, 50, 50, 0.3);
    }
    &::-webkit-scrollbar-track {
      border-radius: 1em;
      background-color: rgba(50, 50, 50, 0);
    }
    li {
      display: flex;
      box-sizing: border-box;
      padding: 4px 8px;
      cursor: pointer;
      @media (any-hover: hover) {
        &:hover {
          background: var(--md-editor-item-active-bg-color);
        }
      }
      &.active {
        background: var(--md-editor-item-active-bg-color);
      }
      .md_select_user_avatar {
        width: 24px;
        height: 24px;
        font-size: 16px;
        text-align: center;
        line-height: 24px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 6px;
      }
      .md_select_user_info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        .md_select_user_name {
          font-size: 14px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          color: var(--md-editor-text-color-active);
        }
      }
    }
  }
}
</style>
