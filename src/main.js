import Vue from "vue";
import App from "./App";
import store from "./store";
import "@/assets/style/global.less";

function initStyle(val) {
  document.documentElement.style.setProperty(
    "--md-editor-theme-color-active",
    val
  );
}

function MdEditor(obj) {
  const { el, onChange, themeActive } = obj;
  if (!el || !document.querySelector(el)) throw new Error("请指定容器");
  initStyle(themeActive);

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

window.MdEditor = MdEditor;
