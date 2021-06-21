<template>
  <div :class="['md_container', { active: isFocus }]">
    <markdown-header
      :text.sync="text"
      :selectionInfo.sync="selectionInfo"
      :showPreview.sync="showPreview"
      :isFocus.sync="isFocus"
      :canPreview="canPreview"
      :toolsOptions="toolsOptions"
      :fullScreen.sync="fullScreen"
      @upload="$refs.mdUploadFile.click()"
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
    <markdownPreview :text="text" :html.sync="html" v-show="showPreview" />
    <markdown-editor
      :selectionInfo.sync="selectionInfo"
      :text.sync="text"
      :fileList.sync="fileList"
      :placeholder="placeholder"
      :isFocus.sync="isFocus"
      :throttleTime="throttle"
      :fullScreen.sync="fullScreen"
      :maxLength="maxLength"
      :textLength.sync="textLength"
      :rows="rows"
      @submit="submit"
      v-show="!showPreview"
    />
    <div v-if="maxLength && showWordLimit" class="word_limit">
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
import { formatText } from "@/assets/js/utils";
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
    canAttachFile: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number],
      default: ""
    },
    throttle: {
      type: Number,
      default: 1000
    },
    canPreview: {
      type: Boolean,
      default: true
    },
    toolsOptions: {
      type: Object,
      default: () => {}
    },
    rows: {
      type: [Number, String],
      default: ""
    },
    maxLength: {
      type: [Number, String],
      default: ""
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    rule: {
      type: RegExp,
      default: /./
    }
  },
  data() {
    return {
      fullScreen: false,
      isFocus: false,
      showPreview: false,
      fileList: [],
      text: "",
      html: "",
      textLength: "",
      selectionInfo: {
        selectorId: "",
        selectionStart: "",
        selectionEnd: ""
      }
    };
  },

  watch: {
    html: {
      immediate: true,
      handler: function(val) {
        this.textLength = this.text.length;
        this.$emit("change", {
          text: this.text,
          html: this.html
        });
        this.$emit("input", {
          text: this.text,
          html: this.html
        });
      }
    },
    isFocus: {
      handler: function(val) {
        const value = {
          text: this.text,
          html: this.html
        };
        if (val) {
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
              "\n\n![img](",
              `${url})\n`
            );
            _this.text = newText;
          }
        });
        this.fileList = [];
      }
    }
  },
  methods: {
    upload(e) {
      this.fileList = Array.from(e.target.files);
    },
    submit() {
      this.$emit("submit", {
        text: this.text,
        html: this.html
      });
    }
  }
};
</script>
<style lang="less" scoped>
.md_container {
  width: 100%;
  background: var(--md-editor-frame-bg-color);
  // margin: 200px auto;
  border: 1px solid var(--md-editor-border-color);
  border-radius: 4px;
  padding: 10px 16px;
  box-sizing: border-box;
  transition: border 0.3s;
  position: relative;
  &.active {
    border: 1px solid var(--md-editor-border-color-active);
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
