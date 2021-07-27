<template>
  <div
    class="md_select_container"
    :style="{ left: this.left + 'px', top: this.top + 'px' }"
  >
    <ul v-show="userList.length" class="md_select_user">
      <li
        @click="selectUser(item)"
        v-for="(item, index) in userList"
        :key="index"
      >
        <img class="md_select_user_avatar" :src="item.avatar" />
        <div class="md_select_user_info">
          <div class="md_select_user_name">{{ item.name }}</div>
          <div class="md_select_user_desc">最近回答过类似问题</div>
        </div>
      </li>
    </ul>
    <div v-show="userList.length" class="after"></div>
    <div v-show="!userList.length" class="md_select_no_data">
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
      type: Array,
      default: () => []
    }
  },
  watch: {
    position: {
      immediate: true,
      handler: function({ left, top }) {
        this.left = left + 14;
        this.top = top + 20;
      }
    }
  },
  data() {
    return {
      left: 0,
      top: 0
    };
  },
  methods: {
    selectUser(user) {
      this.$emit("selectUser", user);
    }
  }
};
</script>
<style lang="less" scoped>
.md_select_container {
  position: relative;
  position: fixed;

  background: #fff;
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
    max-height: 214px;
    width: 180px;
    // background: #fff;
    // box-shadow: 0 1px 6px rgb(0 0 0 / 10%);
    // border: 1px solid var(--md-editor-border-color);
    // border-radius: 4px;
    // z-index: var(--md-editor-fullScrren-zIndex);
    // margin: 0;
    padding: 6px 0;
    box-sizing: border-box;
    overflow-y: auto;
    scrollbar-color: transparent transparent;
    scrollbar-width: none;
    margin: 0 !important;
    list-style: none !important;
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
      padding: 6px 8px;
      cursor: pointer;
      &:hover {
        background: #f5f7fa;
      }
      // & + li {
      //   margin-top: 10px;
      // }
      .md_select_user_avatar {
        width: 44px;
        height: 44px;
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
