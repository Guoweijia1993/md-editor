import Vue from "vue";
import App from "./App";
import Vtip from "vtip";
import "vtip/lib/index.min.css";
import { initStyle, setzIndex, isNotEmpty } from "@/assets/js/utils";
import "@/assets/style/global.less";
Vue.use(Vtip.directive);

function initMdEditor(obj) {
  const _this = this;
  this.value = {
    text: "",
    html: ""
  };
  this.vEl = "";
  let {
    el,
    onLoad = () => {},
    onChange = () => {},
    onUpload = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onInput = () => {},
    onSubmit = () => {},
    renderLinks = () => {},
    queryUserList = () => {},
    placeholder,
    value,
    disabled,
    zIndex = 2000,
    filePathRule,
    rows = 6,
    height,
    tabSize = 2,
    maxLength,
    showWordLimit,
    throttle = 600,
    canPreview,
    canAttachFile,
    themeOptions,
    toolsOptions
  } = obj;
  if (!el || !document.querySelector(el)) throw new Error("请指定容器");
  if (isNotEmpty(themeOptions)) initStyle(themeOptions);
  if (isNotEmpty(zIndex)) setzIndex(zIndex);

  const id = new Date().getTime() + "";
  const props = {
    canAttachFile,
    value,
    themeOptions,
    filePathRule,
    rows,
    height: parseInt(height),
    id,
    throttle,
    canPreview,
    toolsOptions,
    placeholder,
    maxLength,
    zIndex,
    disabled,
    tabSize,
    setPreview: false,
    setFullScreen: false,
    focus: false,
    showWordLimit
  };
  const listeners = {
    changeTab(val) {
      props.setPreview = val;
      props.focus = !val;
      _this.vEl.$forceUpdate();
    },
    changeFullScreen(val) {
      props.setFullScreen = val;
      _this.vEl.$forceUpdate();
    },
    change(val) {
      onChange(val);
      _this.value = val;
      props.value = val.text;
      _this.vEl.$forceUpdate();
    },
    input(val) {
      onInput(val);
      _this.value = val;
      props.value = val.text;
    },
    load(val) {
      onLoad(val);
      _this.value = val;
    },
    focus(val) {
      onFocus(val);
      _this.value = val;
    },
    blur(val) {
      onBlur(val);
      _this.value = val;
      props.focus = false;
      props.value = val.text;
      _this.vEl.$forceUpdate();
    },
    submit(val) {
      onSubmit(val);
    },
    upload({ val, callback }) {
      console.log(val);

      onUpload(val, function(res) {
        callback({
          url: res,
          file: val
        });
      });
    },
    renderLinks({ links, callback }) {
      renderLinks(links, function(res) {
        callback(res);
      });
    },
    queryUserList({ keyWord, callback }) {
      // queryUserList(keyWord, function(res) {
      const list = [
        {
          id: 1,
          name: "藤原拓海",
          avatar:
            "https://img2.baidu.com/it/u=2380211986,3979961921&fm=26&fmt=auto&gp=0.jpg"
        },
        {
          id: 2,
          name: "高桥凉介",
          avatar:
            "https://img0.baidu.com/it/u=777620324,2343967729&fm=26&fmt=auto&gp=0.jpg"
        },
        {
          id: 3,
          name: "马奎斯",
          avatar:
            "https://img2.baidu.com/it/u=1297316011,1869565258&fm=26&fmt=auto&gp=0.jpg"
        },
        {
          id: 4,
          name: "王一博",
          avatar:
            "https://img2.baidu.com/it/u=298051053,3773223854&fm=26&fmt=auto&gp=0.jpg"
        },
        {
          id: 5,
          name: "王俊凯",
          avatar:
            "https://img1.baidu.com/it/u=2378425879,2273515018&fm=26&fmt=auto&gp=0.jpg"
        },
        {
          id: 6,
          name: "易烊千玺",
          avatar:
            "https://img0.baidu.com/it/u=2227200088,1939721201&fm=26&fmt=auto&gp=0.jpg"
        }
      ];

      if (!keyWord) {
        callback(list);
        return;
      }
      callback(
        list.filter(item => {
          return item.name.includes(keyWord);
        })
      );
      // });
    }
  };
  this.vEl = new Vue({
    render: h =>
      h(App, {
        on: listeners,
        props: props
      })
  }).$mount(el);

  this.getValue = function(callback) {
    if (callback) {
      callback(this.value);
    }
    return this.value;
  };

  this.setValue = function(val) {
    props.value = (val || "") + "";
    this.vEl.$forceUpdate();
    if (!props.setPreview) return;
    setTimeout(() => {
      this.toggleTab();
    });
    setTimeout(() => {
      this.toggleTab();
    });
  };

  this.focus = function() {
    props.focus = true;
    this.vEl.$forceUpdate();
  };

  this.blur = function() {
    props.focus = false;
    this.vEl.$forceUpdate();
  };

  this.disable = function() {
    props.disabled = true;
    this.vEl.$forceUpdate();
  };

  this.enable = function() {
    props.disabled = false;
    this.vEl.$forceUpdate();
  };

  this.toggleTab = function(setPreview) {
    if (setPreview !== "edit" && setPreview !== "preview") {
      props.setPreview = !props.setPreview;
    } else {
      props.setPreview = setPreview === "preview";
    }
    props.focus = !props.setPreview;
    this.vEl.$forceUpdate();
  };

  this.toggleFullScreen = function(setFullScreen) {
    if (setFullScreen === undefined) {
      props.setFullScreen = !props.setFullScreen;
    } else {
      props.setFullScreen = setFullScreen;
    }
    this.vEl.$forceUpdate();
  };
}

window.MdEditor = initMdEditor;
