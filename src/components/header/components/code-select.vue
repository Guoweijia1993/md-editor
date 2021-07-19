<template>
  <div class="code_select_container">
    <ul>
      <li
        @click="$emit('select', item)"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        "Bash",
        "C",
        "C++",
        "C#",
        "CLike",
        "CSS",
        "Go",
        "Html",
        "Java",
        "JavaScript",
        "TypeScript",
        "Kotlin",
        "Markup",
        "Objective-C",
        "Peri",
        "PHP",
        "Shell",
        "Python",
        "Ruby",
        "SQL",
        "Swift",
        "VB.Net",
        "YAML",
        "Erlang",
        "Scala",
        "Clojure",
        "Cobol",
        "CoffeeScript",
        "CommonLisp",
        "R",
        "XML"
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.code_select_container {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 18px;
    pointer-events: none;
    background: linear-gradient(to top, #fff, transparent);
  }
}
ul {
  max-height: 142px;
  overflow-y: auto;
  margin-top: 2px;
  margin-bottom: 6px;
  border-top: 1px solid #e1e1e1;
  padding-top: 4px;
  box-sizing: border-box;
  scrollbar-color: transparent transparent;
  // scrollbar-track-color: transparent;
  // -ms-scrollbar-track-color: transparent;

  &::-webkit-scrollbar {
    display: none;
    width: 2px;
    height: 2px;
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
    &:hover {
      color: var(--md-editor-border-color-active);
    }
  }
}
</style>
