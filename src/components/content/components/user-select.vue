<template>
  <div
    class="md_select_container"
    :style="{ left: this.left + 'px', top: this.top + 'px' }"
  >
    <ul v-show="list.length" class="md_select_user">
      <li
        @click="selectUser(item)"
        v-for="(item, index) in list"
        :key="index"
        :id="userItemId(index)"
        :class="[{ active: isActive(index) }]"
      >
        <img class="md_select_user_avatar" :src="item.avatar" />
        <div class="md_select_user_info">
          <div class="md_select_user_name">{{ item.nickname }}</div>
          <!-- <div class="md_select_user_desc">最近回答过类似问题</div> -->
        </div>
      </li>
    </ul>
    <div v-show="list.length" class="after"></div>
    <div v-show="!list.length" class="md_select_no_data">
      轻敲空格完成输入
    </div>
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
    userList: {
      type: [Array, Boolean],
      default: false
    },
    activeUserIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    list() {
      const list = this.userList;
      if (!list.length) return [];
      return list.map((item, index) => {
        if (index === 0) {
          item.active = true;
        } else {
          item.active = false;
        }
        return item;
      });
    }
  },
  watch: {
    position: {
      immediate: true,
      handler: function({ left, top }) {
        this.left = left + 12;
        this.top = top + 40;
      }
    }
  },
  data() {
    return {
      left: 0,
      top: 0,
      selectDisable: false
    };
  },
  methods: {
    selectUser(user) {
      if (this.selectDisable) return;
      this.selectDisable = true;
      this.$emit("selectUser", user);
      setTimeout(() => {
        this.selectDisable = false;
      }, 1000);
    },
    isActive(index) {
      return index === this.activeUserIndex;
    },
    userItemId(index) {
      return "md_user_id_" + index;
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
  .after {
    pointer-events: none;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 28px;
    background: linear-gradient(
      to top,
      var(--md-editor-content-bg-color),
      rgba(255, 255, 255, 0)
    );
  }
  .md_select_user {
    max-height: 196px;
    width: 180px;
    padding: 6px 0;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-color: transparent transparent;
    scrollbar-width: none;
    margin: 0 !important;
    list-style: none !important;
    scroll-behavior: smooth;
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
      // & + li {
      //   margin-top: 10px;
      // }
      .md_select_user_avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 8px;
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
        .md_select_user_desc {
          font-size: 12px;
          color: var(--md-editor-helpdoc-color);
        }
      }
    }
  }
  .md_select_no_data {
    font-size: 12px;
    padding: 4px 8px;
    box-sizing: border-box;
    color: var(--md-editor-helpdoc-color);
  }
}
</style>
