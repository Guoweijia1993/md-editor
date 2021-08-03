import {
  getFilteredTags,
  getLinkTags,
  addLanguageClass,
  addLinkTarget
} from "@/assets/js/utils";
import marked from "marked";
import DOMPurify from "dompurify";
export default {
  methods: {
    transferMarkdown(val) {
      this.rerender();
      marked.setOptions({
        breaks: true,
        gfm: true,
        langPrefix: "language-",
        highlight: function(code, lang, callback) {
          let html = require("highlight.js").highlightAuto(code).value;
          return html;
        }
      });
      const str = val + "";
      const html = marked(str); // 解析markdown
      const virtualDom = addLanguageClass(html); // 如果没指定语言，添加默认语言
      const cleanHtml = DOMPurify.sanitize(virtualDom.innerHTML, {
        FORBID_TAGS: [
          "style",
          "script",
          "select",
          "option",
          "input",
          "textarea",
          "form",
          "button"
        ]
      }); // 去除标签
      const filteredTags = getFilteredTags(html, cleanHtml); // 计算是否有标签被过滤
      // 链接转换为卡片
      const { vDom, links } = getLinkTags(this.id, cleanHtml);
      const { callUserList, userHtml } = addLinkTarget(cleanHtml);
      this.$emit("callUserList", callUserList);
      this.$emit("getFilteredTags", filteredTags);
      this.$emit("update:html", userHtml);
      if (links.length) this.$emit("renderLinksHtml", { vDom, links });
    },
    rerender() {
      const _this = this;
      const renderer = {
        image(href, title, text) {
          if (href === null) {
            return text;
          }
          // ![file](...)渲染文件，只可以下载
          if (text === "file") {
            return `<div class="md_file_card md_flex_card">
              <span class="md_file_img icon iconfont icon-doc"></span>
              <span class="flex-1">
                <span class="md_file_title">${title}</span>
                <span class="md_file_desc">16.6KB</span>
              </span>
              <span class="md_file_controls">
              <a href="${href}" type="file" download class="md_file_download icon iconfont icon-xiazai"></a>
              </span>
            </div>`;
          }
          // ![img](...)渲染图片
          let out = '<img src="' + href + '" alt="' + text + '"';
          if (title) {
            out += ' title="' + title + '"';
          }
          out += "/>";
          return out;
        },
        text(text) {
          const newText = text.replace(/(@.+? )/g, function(val) {
            const user = _this.getUserByName(val.slice(1).trim());
            return `<a type="user" data-user="${user &&
              user.username}" href="${user && user.url}" class="md_call_user">${val}</a>`;
          });
          return newText;
        }
      };
      marked.use({ renderer });
    }
  }
};
