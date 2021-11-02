<template>
  <docFrame @updateShowDoc="$emit('updateShowDoc', $event)">
    <template #title>目录</template>
    <template #content>
      <ul>
        <li
          :data-type="item.tag"
          @click.prevent.stop="scrollToTitle(item)"
          :class="{ active: dirItemActive(item) }"
          v-for="item in dirTags"
          :key="item.id"
        >
          <a href="javascript:viod(0)">
            {{ item.text }}
          </a>
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
    },
    dirTags: {
      type: Array,
      default: () => []
    },
    scrollBarTop: {
      type: Number,
      default: 0
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
        }
      ]
    };
  },
  computed: {
    topList() {
      return this.dirTags.map(item => Math.abs(item?.top));
    }
  },
  created() {
    this.$emit(
      "update:scrollBarTop",
      document.querySelector(".md_preview_scroll_container").scrollTop
    );
  },
  methods: {
    scrollToTitle(item) {
      const targetEl = document.getElementById(item.id);
      if (!targetEl) return;
      const scrollEl = document.querySelector(
        ".md_preview .md_preview_scroll_container"
      );
      if (
        scrollEl.scrollHeight > scrollEl.clientHeight ||
        scrollEl.offsetHeight > scrollEl.clientHeight
      ) {
        const targetOffsetTop = targetEl.offsetTop;
        scrollEl.scrollTop = targetOffsetTop;
      } else {
        targetEl.scrollIntoView({
          behavior: "smooth"
        });
      }
      // const targetOffsetTop = targetEl.offsetTop;
      // document.querySelector(
      //   ".md_preview .md_preview_scroll_container"
      // ).scrollTop = targetOffsetTop;
    },
    dirItemActive(item) {
      const itemScrollTop = document.getElementById(item.id)?.offsetTop;
      const top = this.scrollBarTop - itemScrollTop;
      this.$set(item, "top", top);
      return Math.abs(top) === Math.min(...this.topList);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/li {
  position: relative;
  cursor: pointer;
  a {
    text-decoration: none;
    color: inherit;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  &:hover,
  &.active {
    a {
      color: var(--md-editor-border-color-active);
    }
    &::before {
      color: var(--md-editor-border-color-active);
    }
  }
  &::before {
    content: "\·";
    position: absolute;
    left: 0;
    top: 50%;
    font-size: 20px;
    transform: translateY(-50%);
  }
  &[data-type="h1"] {
    padding-left: 20px;
  }
  &[data-type="h2"] {
    padding-left: 30px;
  }
  &[data-type="h3"] {
    padding-left: 40px;
  }
  &[data-type="h4"] {
    padding-left: 50px;
  }
  &[data-type="h5"] {
    padding-left: 60px;
  }
  &[data-type="h6"] {
    padding-left: 70px;
  }
}
</style>
