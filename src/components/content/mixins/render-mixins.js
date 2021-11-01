import {
  getFilteredTags,
  getLinkTags,
  addLanguageClass,
  formatElements,
  linkTypeSpiltStr,
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
      // 获取标题列表
      const { vDom, links, dirTags } = getLinkTags(this.id, cleanHtml);
      const { callUserList, userHtml } = formatElements(cleanHtml);
      // const videoHtml = await renderVideo(this.id, userHtml);
      this.$emit("callUserList", callUserList);
      this.$emit("getFilteredTags", filteredTags);
      this.$emit("update:html", userHtml);
      if (links.length) this.$emit("renderLinksHtml", { vDom, links });
      if (dirTags.length) this.$emit("getDirTags", { vDom, dirTags });
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
          if (text === "video") {
            return `<p class="md_video"><video
                  class="video-js"
                  preload="none"
                  src="${href}"
                   ></video></p>`;
          }
          console.log("imgimgimg");

          // ![img](...)渲染图片
          let out =
            '<p class="md_img_container"><img src="' +
            href +
            '" alt="' +
            text +
            '"';
          if (title) {
            const reg_title = /(\%([\u4E00-\u9FA5\w.]+)\s??)/;
            const reg_align = /(\#([a-zA-Z]+)\s??)/;
            const reg_width = /(\=(\d+)\*?\s??)/;
            const reg_height = /([\*|x](\d+)\s??)/;

            if (reg_title.exec(title)) {
              var t = reg_title.exec(title)[2];
              out += ' title="' + t + '"';
            }

            if (reg_align.exec(title)) {
              var a = reg_align.exec(title)[2];
              if (a === "center") {
                out += 'style="display:inline-block;"';
              }
              out += ' align="' + a + '"';
            }
            if (reg_width.exec(title)) {
              var w = reg_width.exec(title)[2];
              out += ' width="' + w + 'px"';
            }
            if (reg_height.exec(title)) {
              var h = reg_height.exec(title)[2];
              out += ' height="' + h + 'px"';
            }
          }
          out += "/></p>";
          return out;
        },
        heading(text, level, raw, slugger) {
          if (this.options.headerIds) {
            return (
              "<h" +
              level +
              ' id="' +
              "h" +
              level +
              "_" +
              this.options.headerPrefix +
              slugger.slug(raw) +
              "_" +
              new Date().getTime() +
              '">' +
              text +
              "</h" +
              level +
              ">\n"
            );
          }
          // ignore IDs
          return "<h" + level + ">" + text + "</h" + level + ">\n";
        },
        link(href, title, text) {
          console.log("linklink");
          if (text?.toLowerCase() === "toc") {
            return `
            <h1 class="toc_title">${href}</h1>
            <div class="tocEl"></div>`;
          }

          if (!href && !title) return "";
          if (href === null) {
            return text;
          }
          const linkTypeArr = href.split(linkTypeSpiltStr);
          const linkType = linkTypeArr[1];
          href = linkTypeArr[0];
          text = text.split(linkTypeSpiltStr)[0];
          let invalidText = "";
          if (href === text) {
            const invalidRule = /[）】}\]]*$/;
            if (href.match(invalidRule)) {
              invalidText = href.match(invalidRule)[0];
              href = href.replace(invalidRule, "");
              text = href;
            }
          }

          let out = '<a href="' + href + '"';
          if (title) {
            out += ' title="' + title + '"';
          }
          if (linkType) {
            out += ' data-type="' + linkType + '"';
          }
          out += ">" + text + "</a>";
          if (invalidText) {
            out += invalidText;
          }
          return out;
        },
        text(text) {
          const newText = text
            .replace(/(\@\S+\s{0,1})/g, function(val) {
              const user = _this.getUserByName(val.slice(1).trim());
              return `<a type="user" download data-user="${user &&
                user.username}" href="${(user && user.url) || "javascript:void(0)"}" class="md_call_user">${val}</a>`;
            })
            // tab缩进
            .replace(/^\s{2,3}(.+)/, function(val) {
              return `<span style="display:inline-block;text-indent:2em;">${val}</span>`;
            })
            .replace(
              /\[TOC\]/i,
              `<h1 class="toc_title">目录</h1><div class="tocEl"></div>`
            );

          return newText;
        }
      };
      marked.use({ renderer });
    }
  }
};
