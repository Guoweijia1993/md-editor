import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fullScreen: false,
    isFocus: false,
    showPreview: false,
    toolButtonList: [
      {
        name: "bold",
        icon: "bold",
        tip: "粗体",
        startStr: "**",
        endStr: "**"
      },
      {
        name: "italic",
        icon: "italic",
        tip: "斜体",
        startStr: "_",
        endStr: "_"
      },
      {
        name: "quote",
        icon: "baojiaquotation",
        tip: "插入引用",
        startStr: "\n> ",
        endStr: ""
      },
      {
        name: "code",
        icon: "code",
        tip: "插入代码",
        startStr: "`",
        endStr: "`"
      },
      {
        name: "link",
        icon: "lianjie",
        tip: "添加链接",
        startStr: "[",
        endStr: "](url)"
      },
      {
        name: "ul",
        icon: "unorderedList",
        tip: "添加无序列表",
        startStr: "\n- ",
        endStr: ""
      },
      {
        name: "ol",
        icon: "youxuliebiao",
        tip: "添加有序列表",
        startStr: "",
        endStr: ""
      },
      {
        name: "task",
        icon: "renwu",
        tip: "添加任务列表",
        startStr: "\n- [ ] ",
        endStr: ""
      },
      {
        name: "table",
        icon: "biaoge",
        tip: "添加表格",
        startStr:
          "\n\n| header | header |\n| ------ | ------ |\n| cell | cell |\n| cell | cell |\n\n",
        endStr: ""
      },
      {
        name: "fullScreen",
        icon: "fullScreen",
        tip: "全屏模式"
      }
    ],
    ulNum: 1,
    text:
      "# 456456456\n## 4657567\n3456`456`4\n```js\nfunction fn() {\n  return null;\n}\n```\n56456",
    selectionInfo: "",
    html: "",
    canAttachFile: true
  },
  mutations: {
    setFullScreen(state, val) {
      state.fullScreen = val;
    },
    setShowPreview(state, val) {
      state.showPreview = val;
    },
    setFocus(state, val) {
      state.isFocus = val;
    },
    setText(state, val) {
      state.text = val;
      state.selectionInfo = "";
    },
    setSelectionInfo(state, val) {
      state.selectionInfo = val;
    },
    setHtml(state, val) {
      state.html = val;
    },
    setUlNum(state, val) {
      state.ulNum = val;
    },
    setCanAttachFile(state, val) {
      state.canAttachFile = val;
    }
  }
});
