<template>
  <div
    :class="['md_container', { active: isFocus, fullScreen }]"
    :id="'md_' + id"
  >
    <markdown-header
      :id="textareaId"
      :ref="'md_header' + id"
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
      :ref="'md_textarea' + id"
      @tab="$refs['md_header' + id].tab()"
      @submit="submit"
      @enter="handleEnter"
      @getFilteredTags="filteredTags = $event"
      @updateShowHelp="showHelp = $event"
      @renderLinksHtml="renderLinksHtml"
      @queryUserList="queryUserList"
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
import { formatText, checktUrl, getLinkTitle } from "@/assets/js/utils";
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
      return "md_header" + this.id;
    },
    textareaHeight() {
      const height = this.height;
      if (!height) return 0;
      return height - 83;
    }
  },
  data() {
    return {
      fullScreen: false,
      isFocus: false,
      showPreview: false,
      fileList: [],
      filteredTags: [],
      text: "",
      html: "",
      ulNum: 1,
      formatType: "",
      htmlMinHeight: 150,
      showHelp: false,
      textLength: "",
      userList: [],
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
        const _this = this;
        if (!val.length) return;
        this.$emit("upload", {
          val: val[0],
          callback: function(url) {
            const originalText = _this.text;
            const selectionInfo = _this.selectionInfo;
            const newText = formatText(
              originalText,
              selectionInfo,
              "\n![img](",
              `${url})\n`
            );
            _this.text = newText;
            _this.$refs.mdUploadFile.value = "";
          }
        });
        this.fileList = [];
      }
    }
  },
  methods: {
    handleUpload() {
      this.$refs.mdUploadFile.click();
      document.getElementById(this.textareaId).focus();
    },
    handleEnter() {
      this.$refs[this.headId].resetUlNum();
    },
    upload(e) {
      this.fileList = Array.from(e.target.files);
    },
    submit() {
      this.$emit("submit", {
        text: this.text,
        html: this.html
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
      new Promise((resolve, reject) => {
        this.$emit("renderLinks", {
          links,
          callback: function(list) {
            resolve(list);
          }
        });
      }).then(res => {
        console.log("返回的列表", res);
        res.forEach(item => {
          const linkEl = vDom.querySelector("#" + item.id);
          linkEl.className = "md_link_card";
          linkEl.setAttribute("target", "_blank");
          const title = getLinkTitle(linkEl);
          linkEl.innerHTML = `
          <span class="md_link_title">${title || item.title}</span>
          <span class="md_flex_card">
            <img class="md_link_img" src="${item.img}" />
            <span class="flex-1">
              <span class="md_link_desc">${item.desc}</span>
              <span class="md_link_url">${item.url}</span>
            </span>
          </span>
          `;
        });
        // return vDom.innerHTML;
        this.html = vDom.innerHTML;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.md_container {
  // width: 100%;
  background: var(--md-editor-frame-bg-color);
  // margin: 200px auto;
  border: 1px solid var(--md-editor-border-color);
  border-radius: 4px;
  padding: 10px 16px;
  box-sizing: border-box;
  transition: border 0.3s;
  position: relative;
  overflow: hidden;
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
