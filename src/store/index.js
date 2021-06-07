import Vue from "vue";
import Vuex from "vuex";
import { formatText } from "@/assets/js/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fullScreen: false,
    isFocus: false,
    showPreview: false,
    placeholder: "请输入内容",
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
    fileList: "",
    ulNum: 1,
    //     text: `
    // # 标题一标题一标题一
    // ## 标题二标题二
    // 666\`行内代码\`666
    // \`\`\`js
    // // 是注释呀
    // /**
    // * @params x
    // */
    // function fn() {
    //   return null;
    // }
    // \`\`\`
    // **粗体文字**

    // _斜体文字_

    // > 这段是引用的内容\n
    // > 这段是引用的内容
    // > 这段是引用的内容

    // [链接](url)

    // - 无序列表
    // - 无序列表
    // - 无序列表

    // 1. 有序列表
    // 2. 有序列表
    // 3. 有序列表

    // - [ ] 任务列表
    // - [x] 任务列表
    // - [ ] 任务列表

    // | header | header |
    // | ------ | ------ |
    // | cell | cell |
    // | cell | cell |`,
    selectionInfo: "",
    text: "",
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
    },
    setFileList(state, val) {
      state.fileList = val;
    },
    setPlaceholder(state, val) {
      state.placeholder = val;
    }
  }
});
