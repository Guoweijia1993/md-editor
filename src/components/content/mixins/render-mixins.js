import {
  getFilteredTags,
  getLinkTags,
  addLanguageClass,
  addLinkTarget,
  renderVideo,
  getfilesize
} from "@/assets/js/utils";
import marked from "marked";
import DOMPurify from "dompurify";
export default {
  methods: {
    async transferMarkdown(val) {
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
          "textarea",
          "form",
          "button"
        ]
      }); // 去除标签
      const filteredTags = getFilteredTags(html, cleanHtml); // 计算是否有标签被过滤
      // 链接转换为卡片
      const { vDom, links } = getLinkTags(this.id, cleanHtml);
      const { callUserList, userHtml } = addLinkTarget(cleanHtml);
      // const videoHtml = await renderVideo(this.id, userHtml);
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
            const size = title.split(" ").pop();
            const name = title
              .split(" ")
              .slice(0, -1)
              .join(" ");
            return `<div id="md_file_card" class="md_file_card">
              <div class="md_flex_card">
                <span class="md_file_img icon iconfont icon-doc"></span>
                <span class="flex-1">
                  <span class="md_file_title">${name}</span>
                  <span class="md_file_desc">${getfilesize(size)}</span>
                </span>
                <span class="md_file_controls">
                <a href="${href}" type="file" download="${name}" class="md_file_download icon iconfont icon-xiazai"></a>
                </span>
              </div>
            </div>`;
          }
        //   if (text === "video") {
        //     return `<video
        //         class="video-js"
        //         controls
        //         preload="auto"
        //         data-setup='{}'>
        //       <source src="${href}" type="video/mp4"></source>
        //     </video>`;
        //   }
          // ![img](...)渲染图片
          let out = '<img src="' + href + '" alt="' + text + '"';
          if (title) {
            out += ' title="' + title + '"';
          }
          out += "/>";
          return out;
        },
        // link(href, title, text) {
        //   console.log(href, title, text);

        //   if (href === null) {
        //     return text;
        //   }

        //   let out = '<a href="' + href + '"';
        //   if (title) {
        //     out += ' title="' + title + '"';
        //   }
        //   out += ">" + text + "</a>";
        //   return out;
        // },
        text(text) {

          const newText = text.replace(/(\@\S+\s{0,1})/g, function(val) {
            const user = _this.getUserByName(val.slice(1).trim());
            return `<a type="user" download data-user="${user &&
              user.username}" href="${(user && user.url) || "javascript:void(0)"}" class="md_call_user">${val}</a>`;
          });
          return newText;
        }
      };
      marked.use({ renderer });
    }
  }
};
