<template>
  <ul>
    <li
      @click="$emit('select', item)"
      v-for="(item, index) in list"
      :key="index"
    >
      {{ item }}
    </li>
  </ul>
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
ul {
  max-height: 160px;
  overflow-y: auto;
  margin-top: 2px;
  &::-webkit-scrollbar {
    display: none;
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
