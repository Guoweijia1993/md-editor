import Vue from "vue";
import App from "./App";
import Vtip from "vtip";
import "vtip/lib/index.min.css";
import { initStyle, setzIndex, isNotEmpty } from "@/assets/js/utils";
import "@/assets/style/global.less";

Vue.use(Vtip.directive);

function initMdEditor(obj) {
  const {
    el,
    onChange = () => {},
    onUpload = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onInput = () => {},
    onSubmit = () => {},
    placeholder,
    value,
    zIndex = 2000,
    rule,
    rows = 10,
    maxLength,
    showWordLimit,
    throttle,
    canPreview,
    canAttachFile,
    themeOptions,
    toolsOptions
  } = obj;
  if (!el || !document.querySelector(el)) throw new Error("请指定容器");
  if (isNotEmpty(themeOptions)) initStyle(themeOptions);
  if (isNotEmpty(zIndex)) setzIndex(zIndex);
  new Vue({
    render: h =>
      h(App, {
        on: {
          change(val) {
            onChange(val);
          },
          input(val) {
            onInput(val);
          },
          focus(val) {
            onFocus(val);
          },
          blur(val) {
            onBlur(val);
          },
          submit(val) {
            onSubmit(val);
          },
          upload({ val, callback }) {
            onUpload(val, function(res) {
              callback(res);
            });
          }
        },
        props: {
          canAttachFile,
          value,
          rule,
          rows,
          throttle,
          canPreview,
          toolsOptions,
          placeholder,
          maxLength,
          showWordLimit
        }
      })
  }).$mount(el);
}

window.MdEditor = initMdEditor;
