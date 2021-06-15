import Vue from "vue";
import App from "./App";
import Vtip from "vtip";
import "vtip/lib/index.min.css";
import { initStyle, isNotEmpty } from "@/assets/js/utils";
import "@/assets/style/global.less";

Vue.use(Vtip.directive);

function initMdEditor(obj) {
  const {
    el,
    onChange,
    onUpload,
    placeholder,
    value,
    canPreview,
    canAttachFile,
    themeOptions,
    toolsOptions
  } = obj;
  if (!el || !document.querySelector(el)) throw new Error("请指定容器");
  if (isNotEmpty(themeOptions)) initStyle(themeOptions);

  new Vue({
    render: h =>
      h(App, {
        on: {
          change(val) {
            onChange(val);
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
          canPreview,
          toolsOptions,
          placeholder
        }
      })
  }).$mount(el);
}

window.MdEditor = initMdEditor;
