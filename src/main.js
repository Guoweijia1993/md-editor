import Vue from "vue";
import App from "./App";
import Vtip from "vtip";
import "vtip/lib/index.min.css";
import { initStyle, setzIndex, isNotEmpty } from "@/assets/js/utils";
import "@/assets/style/global.less";
import "@/assets/jupyter-render/src/main.ts";
Vue.use(Vtip.directive);

function initMdEditor(obj) {
  const _this = this;
  this.value = {
    text: "",
    html: ""
  };
  this.vEl = "";
  this.videoList = [];
  let {
    el,
    onLoad = () => {},
    onChange = () => {},
    onUpload = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onInput = () => {},
    onSubmit = () => {},
    renderLinks,
    queryUserList,
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
    registerTools = [],
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
    renderLinks: Boolean(renderLinks),
    registerTools,
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
    upload({ val, type, callback }) {
      onUpload(val, type, function(res) {
        callback({
          url: res,
          file: val
        });
      });
    },
    renderLinks({ links, callback }) {
      if (!renderLinks) return callback(links);
      renderLinks(links, function(res) {
        callback(res);
      });
    },
    queryUserList({ keyWord, callback }) {
      if (!queryUserList) return callback(false); // 返回false则不触发@弹窗
      queryUserList(keyWord, function(res) {
        const list = res;
        if (!keyWord) return callback(list);
        callback(
          list.filter(item => {
            return item.nickname.toLowerCase().includes(keyWord.toLowerCase());
          })
        );
      });
    }
  };
  this.vEl = new Vue({
    render: h =>
      h(App, {
        on: listeners,
        props: props
      })
  }).$mount(el);

  this.getVideoList = function(callback) {
    return this.vEl.$children[0].getVideoList(callback);
  };

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

  this.registerTools = function(option) {
    props.registerTools = [];
    if (Array.isArray(option)) {
      props.registerTools.push(...option);
    } else {
      props.registerTools.push(option);
    }
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
