import Vue from "vue";
import App from "./App";
import "@/assets/style/global.less";

function MdEditor(obj) {
  const { el, onChange } = obj;
  if (!el || !document.querySelector(el)) throw new Error("请指定容器");

  new Vue({
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
