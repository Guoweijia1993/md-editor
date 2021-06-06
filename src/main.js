import Vue from "vue";
import App from "./App";
import store from "./store";
import Vtip from "vtip";
import "vtip/lib/index.min.css";
import { initStyle, isNotEmpty, updateText } from "@/assets/js/utils";
import "@/assets/style/global.less";

Vue.use(Vtip.directive);

function initMdEditor(obj) {
  const { el, onChange, onUpload, canAttachFile, themeOptions } = obj;
  if (!el || !document.querySelector(el)) throw new Error("请指定容器");
  if (isNotEmpty(themeOptions)) initStyle(themeOptions);
  if (isNotEmpty(canAttachFile))
    store.commit("setCanAttachFile", canAttachFile);

  new Vue({
    store,
    render: (h) =>
      h(App, {
        on: {
          change(val) {
            onChange(val);
          },
          upload(val) {
            onUpload(val, function(res) {
              updateText("\n\n![img](", `${res})\n`);
            });
          }
        }
      })
  }).$mount(el);
}

window.MdEditor = initMdEditor;
