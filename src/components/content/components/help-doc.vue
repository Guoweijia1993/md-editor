<template>
  <div class="help_doc">
    <div class="doc_container">
      <h2>
        Markdown 语法
        <span
          @click="$emit('updateShowHelp', false)"
          :class="['icon iconfont', `icon-guanbi`]"
        ></span>
      </h2>
      <ul class="list">
        <li v-for="(item, index) in list" :key="index">
          <span :class="['icon iconfont', `icon-${item.icon}`]"></span>
          <span>{{ item.title }}</span>
          <span class="doc">{{ item.doc }}</span>
        </li>
      </ul>
    </div>
    <div class="before"></div>
    <div class="after"></div>
  </div>
</template>
<script>
export default {
  props: {
    showHelp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [
        {
          title: "一级标题",
          doc: "# 标题",
          icon: "yijibiaoti"
        },
        {
          title: "二级标题",
          doc: "## 标题",
          icon: "erjibiaoti"
        },
        {
          title: "三级标题",
          doc: "### 标题",
          icon: "sanjibiaoti"
        },
        {
          title: "粗体",
          doc: "**内容**",
          icon: "bold"
        },
        {
          title: "斜体",
          doc: "_内容_",
          icon: "italic"
        },
        {
          title: "引用",
          doc: "> 引用内容",
          icon: "yinyong"
        },
        {
          title: "链接",
          doc: "[链接标题](url)",
          icon: "lianjie"
        },
        {
          title: "图片",
          doc: '![alt](url "title")',
          icon: "tupian"
        },
        {
          title: "代码",
          doc: "`代码`",
          icon: "daimakuai"
        },
        {
          title: "代码块",
          doc: "```编程语言↵代码```",
          icon: "code"
        },
        {
          title: "无序列表",
          doc: "- 内容",
          icon: "unorderedList"
        },
        {
          title: "有序列表",
          doc: "1. 内容",
          icon: "youxuliebiao"
        },
        {
          title: "任务列表",
          doc: "- [ ] 待办事项",
          icon: "renwu"
        },
        {
          title: "分割线",
          doc: "---",
          icon: "fengexian"
        },
        {
          title: "删除线",
          doc: "~~内容~~",
          icon: "shanchuxian"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.help_doc {
  position: absolute;
  // background: #fff;
  background: var(--md-editor-content-bg-color);
  height: calc(100% + 10px);
  width: 260px;
  top: 0;
  right: -16px;
  box-sizing: border-box;
  border-left: 1px solid var(--md-editor-border-color);
  padding: 14px;
  padding-right: 0;
  // border-radius: 4px;
  z-index: 9;
  .before {
    position: absolute;
    top: 4px;
    left: 0;
    width: 100%;
    height: 24px;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      var(--md-editor-content-bg-color),
      rgba(255, 255, 255, 0)
    );
  }
  .after {
    pointer-events: none;
    position: absolute;
    bottom: 12px;
    left: 0;
    width: 100%;
    height: 24px;
    background: linear-gradient(
      to top,
      var(--md-editor-content-bg-color),
      rgba(255, 255, 255, 0)
    );
  }
  .doc_container {
    overflow-y: auto;
    padding-right: 14px;
    height: 100%;
    scrollbar-color: transparent transparent;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    h2 {
      font-size: 16px;
      color: var(--md-editor-text-color-active);
      .icon {
        float: right;
        margin-top: 3px;
        cursor: pointer;
        font-weight: 400;
      }
    }
    ul.list {
      margin-top: 14px;
      li {
        font-size: 14px;
        color: var(--md-editor-helpdoc-color);
        margin-bottom: 10px;
        .icon {
          display: inline-block;
          vertical-align: middle;
        }
        .doc {
          float: right;
        }
      }
    }
  }
}
</style>
