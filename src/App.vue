<template>
  <div
    :class="['md_container', { active: isFocus, fullScreen }]"
    :id="'md_' + id"
  >
    <markdown-header
      :id="textareaId"
      :ref="'md_header_' + id"
      :text.sync="text"
      :selectionInfo.sync="selectionInfo"
      :showPreview.sync="showPreview"
      :isFocus.sync="isFocus"
      :canPreview="canPreview"
      :toolsOptions="toolsOptions"
      :zIndex="zIndex"
      :tabSize="tabSize"
      :disabled="disabled"
      :fullScreen.sync="fullScreen"
      :themeOptions="themeOptions"
      :uploadImgPercent="uploadImgPercent"
      :uploadVideoPercent="uploadVideoPercent"
      :registerTools="registerTools"
      @upload="handleUpload"
      @getFormatType="formatType = $event"
      @updateShowHelp="showHelp = $event"
      @renderLinks="$emit('renderLinks', $event)"
    />
    <input
      ref="mdUploadFile"
      class="md_upload"
      type="file"
      hidden
      name="md-upload-file"
      id="md-upload-file"
      @change="upload"
    />
    <markdownPreview
      :id="textareaId"
      :fullScreen.sync="fullScreen"
      :text="text"
      :height="textareaHeight"
      :html.sync="html"
      :htmlMinHeight="htmlMinHeight"
      v-if="showPreview"
    />

    <markdown-editor
      :selectionInfo.sync="selectionInfo"
      :text.sync="text"
      :fileList.sync="fileList"
      :placeholder="placeholder"
      :isFocus.sync="isFocus"
      :throttleTime="throttle"
      :htmlMinHeight.sync="htmlMinHeight"
      :fullScreen.sync="fullScreen"
      :maxLength="maxLength"
      :textLength.sync="textLength"
      :rows="rows"
      :height="textareaHeight"
      :html.sync="html"
      :id="textareaId"
      :disabled="disabled"
      :show-help="showHelp"
      :formatType="formatType"
      :userList="userList"
      :ref="'md_textarea_' + id"
      :renderLinks="renderLinks"
      @tab="$refs['md_header_' + id].tab()"
      @submit="submit"
      @enter="handleEnter"
      @getFilteredTags="filteredTags = $event"
      @updateShowHelp="showHelp = $event"
      @renderLinksHtml="renderLinksHtml"
      @queryUserList="queryUserList"
      @callUserList="callUserList = $event"
      v-else
    />
    <div v-if="maxLength && showWordLimit && !showPreview" class="word_limit">
      <span>{{ textLength }}</span
      >/<span>{{ maxLength }}</span>
    </div>
    <!-- <markdown-footer
      :fileList.sync="fileList"
      :canAttachFile="canAttachFile"
      :isFocus.sync="isFocus"
      :can-attach-file="canAttachFile"
      v-if="!showPreview && canAttachFile"
    /> -->
  </div>
</template>
<script>
import markdownHeader from "./components/header/md-header";
import markdownFooter from "./components/footer/md-footer";
import markdownEditor from "./components/content/md-textarea";
import markdownPreview from "./components/content/md-preview";
import {
  formatText,
  checktUrl,
  getLinkTitle,
  renderLinkCard
} from "@/assets/js/utils";
export default {
  components: {
    markdownHeader,
    markdownFooter,
    markdownEditor,
    markdownPreview
  },
  props: {
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    id: {
      type: String,
      default: ""
    },
    tabSize: {
      type: [String, Number],
      default: ""
    },
    // canAttachFile: {
    //   type: Boolean,
    //   default: true
    // },
    // 初始化时赋值
    value: {
      type: [String, Number],
      default: ""
    },
    // 全屏时的z-index
    zIndex: {
      type: [String, Number],
      default: ""
    },
    // input时间节流
    throttle: {
      type: Number,
      default: 0
    },
    setPreview: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    setFullScreen: {
      // type: Boolean,
      default: ""
    },
    // 是否可以预览
    canPreview: {
      type: Boolean,
      default: true
    },
    // 主题
    themeOptions: {
      type: Object,
      default: () => {}
    },
    focus: {
      type: Boolean,
      default: false
    },
    // 工具栏
    toolsOptions: {
      type: Object,
      default: () => {}
    },
    // 自定义工具栏
    registerTools: {
      type: Array,
      default: () => []
    },
    // 行高度
    rows: {
      type: [Number, String],
      default: ""
    },
    // 高度
    height: {
      type: Number,
      default: 0
    },
    // 最大长度
    maxLength: {
      type: [Number, String],
      default: ""
    },
    // 显示字数限制
    showWordLimit: {
      type: Boolean,
      default: false
    },
    // 图片路径规则
    filePathRule: {
      type: RegExp,
      default: () => {}
    },
    renderLinks: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // isMobile() {
    //   const isMobile = checkBoswer();
    //   return isMobile;
    // },
    textareaId() {
      return "textarea_" + this.id;
    },
    headId() {
      return "md_header_" + this.id;
    },
    textareaHeight() {
      const height = this.height;
      if (!height) return 0;
      return height - 83;
    },
    uploadImgCallBack() {
      const _this = this;
      return function({ url, file: { name } }) {
        if (isNaN(parseInt(url))) {
          const originalText = _this.text;
          const selectionInfo = _this.selectionInfo;
          const newText = formatText(
            originalText,
            selectionInfo,
            "\n![img](",
            `${url} "=600 #left")\n`
          );
          _this.text = newText;
          _this.$refs.mdUploadFile.value = "";
          _this.uploadImgPercent = 100;
          _this.$refs["md_textarea_" + _this.id].waiting = false;
        } else {
          _this.$refs["md_textarea_" + _this.id].waiting = true;
          _this.uploadImgPercent = parseInt(url);
        }
        _this.$refs["md_header_" + _this.id].loading(
          "img",
          _this.uploadImgPercent
        );
      };
    },
    uploadFileCallBack() {
      const _this = this;
      return function({ url, file: { name, size } }) {
        const originalText = _this.text;
        const selectionInfo = _this.selectionInfo;
        const newText = formatText(
          originalText,
          selectionInfo,
          "\n![file](",
          `${url.replace(/\s/g, "%20")} '${name} ${size}')\n`
        );
        _this.text = newText;
        _this.$refs.mdUploadFile.value = "";
      };
    },
    uploadVideoCallBack() {
      const _this = this;
      return function({ url, file: { name } }) {
        if (isNaN(parseInt(url))) {
          const originalText = _this.text;
          const selectionInfo = _this.selectionInfo;
          const newText = formatText(
            originalText,
            selectionInfo,
            "![video](",
            `${url})\n`
          );
          _this.text = newText;
          _this.$refs.mdUploadFile.value = "";
          _this.uploadVideoPercent = 100;
        } else {
          _this.uploadVideoPercent = parseInt(url);
        }
        _this.$refs["md_header_" + _this.id].loading(
          "video",
          _this.uploadVideoPercent
        );
      };
    }
  },
  data() {
    return {
      fullScreen: false,
      isFocus: false,
      showPreview: false,
      uploadType: "img",
      fileList: [],
      filteredTags: [],
      text: "",
      html: "",
      ulNum: 1,
      formatType: "",
      htmlMinHeight: 150,
      showHelp: false,
      uploadImgPercent: 0,
      uploadFlePercent: 0,
      uploadVideoPercent: 0,
      textLength: "",
      userList: false,
      callUserList: [],
      linkList: [],
      selectionInfo: {
        selectorId: "",
        selectionStart: "",
        selectionEnd: ""
      }
    };
  },
  created() {
    setTimeout(() => {
      this.$emit("load", {
        text: this.text,
        html: this.html
      });
    }, 0);
  },
  watch: {
    focus: {
      handler: function(val) {
        setTimeout(() => {
          const textEl = document.getElementById(this.textareaId);
          if (!textEl) return;
          if (val) {
            textEl.focus();
          } else {
            textEl.blur();
          }
        });
      }
    },
    showPreview: {
      handler: function(val) {
        this.$emit("changeTab", val);
      }
    },
    setPreview: {
      handler: function(val) {
        this.showPreview = val;
      }
    },
    setFullScreen: {
      handler: function(val) {
        this.fullScreen = val;
      }
    },
    fullScreen: {
      handler: function(val) {
        this.$emit("changeFullScreen", val);
      }
    },
    text: {
      immediate: true,
      handler: function(val) {
        this.textLength = val.length;
      }
    },
    html: {
      immediate: false,
      handler: function(val) {
        const emitContent = {
          text: this.text,
          html: this.html
        };
        if (this.filePathRule) {
          const checkResult = checktUrl(val, this.filePathRule);
          emitContent.invalidList = checkResult;
        }
        if (this.callUserList.length) {
          emitContent.callUserList = this.callUserList;
        } else {
          emitContent.callUserList = [];
        }
        emitContent.filteredTags = this.filteredTags;

        this.$emit("change", emitContent);
        this.$emit("input", emitContent);
      }
    },
    isFocus: {
      handler: function(val) {
        const value = {
          text: this.text,
          html: this.html
        };
        if (val) {
          this.showHelp = false;
          this.$emit("focus", value);
        } else {
          this.$emit("blur", value);
        }
      }
    },
    value: {
      immediate: true,
      handler: function(val) {
        this.text = val;
      }
    },
    fileList: {
      immediate: false,
      deep: true,
      handler: function(val) {
        const uploadType = this.uploadType;
        if (!val.length) return;
        this.$emit("upload", {
          val: val[0],
          type: uploadType,
          callback:
            uploadType === "img"
              ? this.uploadImgCallBack
              : uploadType === "video"
              ? this.uploadVideoCallBack
              : this.uploadFileCallBack
        });
        this.fileList = [];
      }
    }
  },
  methods: {
    handleUpload(type) {
      this.uploadType = type;
      this.$refs.mdUploadFile.click();
      document.getElementById(this.textareaId).focus();
    },
    handleEnter() {
      this.$refs[this.headId].resetUlNum();
    },
    upload(e) {
      this.fileList = Array.from(e.target.files);
      this.$refs.mdUploadFile.value = "";
    },
    submit() {
      this.$emit("submit", {
        text: this.text,
        html: this.html
      });
    },
    getVideoList(callback) {
      const virtualDom = document.createElement("div");
      virtualDom.style.height = 0;
      virtualDom.innerHTML = this.html;
      document.body.appendChild(virtualDom);
      const vEls = Array.from(virtualDom.getElementsByTagName("video"));
      const list = vEls.map(item => {
        item.preload = true;
        return new Promise((res, rej) => {
          item.oncanplay = function() {
            res({
              src: item.src,
              duration: item.duration
            });
          };
        });
      });
      document.body.removeChild(virtualDom);
      Promise.all(list).then(res => {
        callback(res);
      });
    },
    queryUserList(keyWord) {
      const _this = this;
      this.$emit("queryUserList", {
        keyWord,
        callback: function(list) {
          _this.userList = list;
        }
      });
    },
    renderLinksHtml({ vDom, links }) {
      // 缓存里没有的链接，就发送请求获取信息
      const emitList = links.filter(
        item => !this.linkList.find(link => link && link.url === item.url)
      );
      console.log("emit", emitList);
      this.$emit("renderLinks", {
        links: emitList,
        callback: list => {
          // 用原始数组做循环
          links.forEach(item => {
            const linkItem = this.linkList.find(
              link => link && link.url === item.url
            );
            // 如果
            if (!linkItem) {
              const returnLink = list.find(
                link => link && link.url === item.url
              );
              if (!returnLink) return;
              item.title = returnLink.title;
              item.description = returnLink.description;
              item.icon = returnLink.icon;
              this.linkList.push(returnLink);
            } else {
              item.title = linkItem.title;
              item.description = linkItem.description;
              item.icon = linkItem.icon;
            }
            // item.csdn = true;
            const linkEl = vDom.querySelector("#" + item.id);
            if (!linkEl) return;
            const url = item.csdn
              ? "https://link.csdn.net/?target=" + item.url
              : item.url;
            // linkEl.className = "md_link_card";
            item.linkType = linkEl.getAttribute("data-type");
            linkEl.setAttribute("target", "_blank");
            linkEl.setAttribute("href", url);
            if (item.url.includes(".ipynb")) {
              linkEl.className = "jupyterEl";
            }
            const title = getLinkTitle(linkEl, item);
            linkEl.innerHTML = renderLinkCard(title, item);
          });

          this.html = vDom.innerHTML;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.md_container {
  background: var(--md-editor-frame-bg-color);
  border: 1px solid var(--md-editor-border-color);
  border-radius: 4px;
  padding: 10px 16px;
  box-sizing: border-box;
  transition: border 0.3s;
  position: relative;
  // overflow: hidden; // 注释为了显示@用户的弹窗
  &.fullScreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    margin: 0;
    border: 1px solid transparent !important;
    z-index: var(--md-editor-fullScrren-zIndex);
  }
  &.active {
    border: 1px solid var(--md-editor-border-color-active);
  }
  &.disabled {
    background: var(--md-editor-frame-bg-color-disabled);
  }
  .word_limit {
    position: absolute;
    right: 10px;
    bottom: 8px;
    font-size: 12px;
    color: var(--md-editor-text-color);
  }
}
</style>
