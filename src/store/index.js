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
        format: "**"
      },
      {
        name: "italic",
        icon: "italic"
      },
      {
        name: "quote",
        icon: "baojiaquotation"
      },
      {
        name: "code",
        icon: "code"
      },
      {
        name: "link",
        icon: "lianjie"
      },
      {
        name: "ul",
        icon: "unorderedList"
      },
      {
        name: "ol",
        icon: "youxuliebiao"
      },
      {
        name: "task",
        icon: "renwu"
      },
      {
        name: "table",
        icon: "biaoge"
      },
      {
        name: "fullScreen",
        icon: "fullScreen"
      }
    ],
    ulNum: 1,
    text: "# 456456456\n## 4657567\n3456456456456",
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
