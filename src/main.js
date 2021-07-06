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
    placeholder,
    value,
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
      onUpload(val, function(res) {
        callback(res);
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

  this.getValue = function(callback) {
    if (callback) {
      callback(this.value);
    }
    return this.value;
  };

  this.setValue = function(val) {
    props.value = (val || "") + "";
    this.vEl.$forceUpdate();
  };

  this.focus = function() {
    props.focus = true;
    this.vEl.$forceUpdate();
  };

  this.blur = function() {
    props.focus = false;
    this.vEl.$forceUpdate();
  };

  this.toggleTab = function(setPreview) {
    if (setPreview !== "edit" && setPreview !== "preview") {
      props.setPreview = !props.preview;
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
