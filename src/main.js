import Vue from "vue";
import App from "./App";
import store from "./store";
import { initStyle, isNotEmpty } from "@/assets/js/utils";
import "@/assets/style/global.less";

function initMdEditor(obj) {
  const { el, onChange, canAttachFile, themeOptions } = obj;
  if (!el || !document.querySelector(el)) throw new Error("请指定容器");
  if (isNotEmpty(themeOptions)) initStyle(themeOptions);
  if (isNotEmpty(canAttachFile))
    store.commit("setCanAttachFile", canAttachFile);

  new Vue({
    store,
    render: h =>
      h(App, {
        on: {
          change(val) {
            onChange(val);
          }
        }
      })
  }).$mount(el);
}

window.MdEditor = initMdEditor;
