<template>
  <docFrame @updateShowDoc="$emit('updateShowDoc', $event)">
    <template #title> Markdown 语法 </template>
    <template #content>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <span :class="['icon iconfont', `icon-${item.icon}`]"></span>
          <span>{{ item.title }}</span>
          <span class="doc">{{ item.doc }}</span>
        </li>
      </ul>
    </template>
  </docFrame>
</template>
<script>
import docFrame from "./doc-frame.vue";
export default {
  components: { docFrame },
  props: {
    showHelp: {
      type: [Boolean, String],
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
          title: "目录",
          doc: "[toc](目录)",
          icon: "dir"
        },
        {
          title: "图片",
          doc: "![alt](url)",
          icon: "img"
        },
        {
          title: "图片大小",
          doc: '![alt](url "=300x200")',
          icon: "img"
        },
        {
          title: "图片位置",
          doc: '![alt](url "#left")',
          icon: "img"
        },
        {
          title: "图片名称",
          doc: '![alt](url "%title")',
          icon: "img"
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
