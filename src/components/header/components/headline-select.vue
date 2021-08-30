<template>
  <div class="headline_select_container">
    <ul>
      <li
        @click="$emit('select', index)"
        v-for="(item, index) in list"
        :key="index"
      >
        <span :class="['icon iconfont', `icon-${item.icon}`]"></span>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          title: "一级标题",
          icon: "yijibiaoti"
        },
        {
          title: "二级标题",
          icon: "erjibiaoti"
        },
        {
          title: "三级标题",
          icon: "sanjibiaoti"
        },
        {
          title: "四级标题",
          icon: "sijibiaoti"
        }
        // {
        //   title: "五级标题",
        //   icon: "wujibiaoti"
        // },
        // {
        //   title: "六级标题",
        //   icon: "liujibiaoti"
        // }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.headline_select_container {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 18px;
    pointer-events: none;
  }
}
ul {
  max-height: 150px;
  overflow-y: hidden;
  margin-top: 2px;
  margin-bottom: 4px;
  border-top: 1px solid #e1e1e1;
  padding-top: 6px;
  box-sizing: border-box;
  scrollbar-color: transparent transparent;
  scrollbar-width: none;

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
    cursor: pointer;
    height: 24px;
    line-height: 24px;
    .iconfont {
      display: inline-block;
      vertical-align: middle;
    }
    &:hover {
      color: var(--md-editor-border-color-active);
    }
  }
}
</style>
