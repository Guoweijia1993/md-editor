<template>
  <div :class="['md_textarea', { fullScreen, isFocus }]">
    <textarea
      spellcheck="false"
      :id="id"
      @change="$emit('update:text', textContent)"
      @input="input"
      @keydown.stop.50="handleCallUser"
      @keydown.stop.229="handleCallUser"
      @focus="setFocus(true)"
      @blur="blur"
      @paste="pasteFile"
      @keydown.stop.up="changeActiveUserIndex($event, 'up')"
      @keydown.stop.down="changeActiveUserIndex($event, 'down')"
      @keydown.enter="handleEnter"
      @keydown.meta.enter.exact="submit"
      @keydown.ctrl.enter.exact="submit"
      @keydown.tab.prevent="$emit('tab')"
      v-model="textContent"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :rows="rows"
      :disabled="disabled"
      :class="{ disabled }"
      :style="{
        height: editorHeight,
        overflow: editorOverFlow,
        cursor: disabled
          ? 'not-allowed'
          : formatType
          ? `url(https://codechina.csdn.net/codechina/operation-work/uploads/a1b7c2a995b2320dca911e2f2ecb9b88/format.png),text`
          : 'text'
      }"
    >
    </textarea>
    <transition name="slide-fade">
      <helpDoc
        v-if="showHelp"
        @updateShowHelp="$emit('updateShowHelp', $event)"
        :showHelp.sync="showHelp"
      />
    </transition>
    <transition name="slideup-fade">
      <selectUser
        :userList="userList"
        :activeUserIndex.sync="activeUserIndex"
        v-show="showSelectUser"
        :position="selectUserPosition"
        @selectUser="handleSelectUser"
      />
    </transition>
  </div>
</template>
<script>
import {
  getSelectionInfo,
  getPosition,
  isAndroid,
  throttle as throttleFn
} from "@/assets/js/utils";
import selectUser from "./components/user-select";
import helpDoc from "./components/help-doc";
import renderMix from "./mixins/render-mixins";
import selectUserMix from "./mixins/select-user-mixins";
export default {
  components: { helpDoc, selectUser },
  mixins: [renderMix, selectUserMix],
  props: {
    id: {
      type: String,
      default: ""
    },
    html: {
      type: [String, Promise],
      default: ""
    },
    htmlMinHeight: {
      default: ""
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    throttleTime: {
      type: Number,
      default: 1000
    },
    isFocus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    },
    text: {
      type: [String, Number],
      default: ""
    },
    maxLength: {
      type: [String, Number],
      default: ""
    },
    rows: {
      type: [String, Number],
      default: ""
    },
    height: {
      type: Number,
      default: 0
    },
    selectionInfo: {
      type: Object,
      default: () => {}
    },
    formatType: {
      default: ""
    },
    showHelp: {
      type: Boolean,
      default: false
    },
    userList: {
      type: [Boolean, Array],
      default: false
    }
  },

  data() {
    return {
      textContent: "",
      editorHeight: "auto",
      editorOverFlow: "auto",
      showSelectUser: false,
      queryInfo: {
        startPosition: "",
        endPosition: "",
        keyWord: ""
      },
      activeUserIndex: 0,
      selectUserPosition: { left: 0, top: 0 }
    };
  },
  created() {
    document.addEventListener("mouseup", this.checkSelection);
  },
  mounted() {
    this.resetPreviewMinHeight();
  },
  watch: {
    // userList: {
    //   handler: function(val) {
    //     if (!val.length) return;
    //     this.activeUserIndex = 0;
    //   }
    // },
    isFocus: {
      handler: function(val) {
        if (val) {
          this.resetPreviewMinHeight();
        } else {
          setTimeout(() => {
            this.showSelectUser = false;
          }, 200);
        }
      }
    },
    text: {
      immediate: true,
      handler: function(val) {
        this.textContent = val;
        this.transferMarkdown(val);
      }
    },
    fullScreen: {
      immediate: true,
      handler: function(val) {
        if (val) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
        setTimeout(() => {
          this.reSizeTextareaHeight();
        }, 0);
      }
    },
    textContent: {
      immediate: true,
      handler: function() {
        setTimeout(() => {
          if (!this.autoSize) return;
          this.reSizeTextareaHeight();
        }, 0);
      }
    },
    showSelectUser: {
      handler: function(val) {
        if (!val) {
          this.resetQueryInfo();
        }
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("mouseup", this.checkSelection);
  },
  computed: {
    emitText() {
      // return throttleFn(() => {}, this.throttleTime);
      return () => {
        this.$emit("update:text", this.textContent);
      };
    },
    autoSize() {
      return this.rows === "auto";
    }
  },
  methods: {
    changeActiveUserIndex(event, type) {
      if (this.showSelectUser) {
        event.preventDefault();
        const max = this.userList.length;
        if (type === "down") {
          this.activeUserIndex++;
          if (this.activeUserIndex >= max) {
            this.activeUserIndex = 0;
          }
          const index = this.activeUserIndex;
          const activeItem = document.getElementById("md_user_id_" + index);
          const activeTop =
            activeItem.offsetTop - activeItem.parentNode.scrollTop;

          if (index === 0) {
            document
              .getElementById("md_user_id_" + index)
              .parentNode.scrollTo(0, 0);
          }
          if (index > 3 && activeTop > 126) {
            document
              .getElementById("md_user_id_" + index)
              .parentNode.scrollTo(0, 40 * (index - 3));
            // .scrollIntoView({ behavior: "smooth" });
          }
        } else {
          this.activeUserIndex--;
          if (this.activeUserIndex < 0) {
            this.activeUserIndex = max - 1;
          }
          const index = this.activeUserIndex;
          const activeItem = document.getElementById("md_user_id_" + index);
          const activeTop =
            activeItem.offsetTop - activeItem.parentNode.scrollTop;
          if (index === max - 1) {
            activeItem.parentNode.scrollTo(
              0,
              activeItem.parentNode.scrollHeight
            );
          }
          if (activeTop < 46) {
            document
              .getElementById("md_user_id_" + this.activeUserIndex)
              .parentNode.scrollTo(0, 40 * index);
          }
          // .scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    resetPreviewMinHeight() {
      setTimeout(() => {
        const textEl = document.getElementById(this.id);
        if (!textEl) return;
        const height = textEl.offsetHeight;
        this.$emit("update:htmlMinHeight", height);
      }, 0);
    },
    resetQueryInfo() {
      this.queryInfo = {
        startPosition: "",
        endPosition: "",
        keyWord: ""
      };
    },
    input(e) {
      if (isAndroid() && e.data === "@") {
        this.createSelectUserDialog("android");
      }
      if (this.showSelectUser) this.handleQueryUser(e);
      this.$emit("update:textLength", this.textContent.length);
      this.emitText();
    },
    blur() {
      this.renderUserTags();
      this.setFocus(false);
    },
    createHideEl(type) {
      const textEl = document.getElementById(this.id);
      if (!textEl) return;
      const fontSize = getComputedStyle(textEl).getPropertyValue("font-size");
      const lineHeight = getComputedStyle(textEl).getPropertyValue(
        "line-height"
      );
      const fontFamily = getComputedStyle(textEl).getPropertyValue(
        "font-family"
      );
      const hideElId = type + this.id;
      let hideEl = document.getElementById(hideElId);
      if (!hideEl) {
        hideEl = document.createElement("div");
        textEl.parentNode.appendChild(hideEl);
      }
      hideEl.id = hideElId;
      hideEl.style.fontSize = fontSize;
      hideEl.style.lineHeight = lineHeight;
      hideEl.style.fontFamily = fontFamily;
      return hideEl;
    },
    reSizeTextareaHeight() {
      const textEl = document.getElementById(this.id);
      if (!textEl) return;
      const fontSize = getComputedStyle(textEl).getPropertyValue("font-size");

      const hideEl = this.createHideEl("clac_height_El_");
      hideEl.innerText = this.textContent;
      const contentHeight = hideEl.offsetHeight;
      this.editorHeight = this.fullScreen
        ? "calc(100% - 42px)"
        : this.height
        ? this.height + "px"
        : this.autoSize
        ? `${contentHeight + parseFloat(fontSize) * 1.2}px`
        : "auto";
      this.editorOverFlow =
        this.autoSize && !this.fullScreen && !this.height ? "hidden" : "auto";
      textEl.parentNode.removeChild(hideEl);
    },
    handleEnter(e) {
      if (this.showSelectUser) {
        const activeUser = this.userList[this.activeUserIndex];
        this.handleSelectUser(activeUser);
        e.preventDefault();
        return;
      }
      this.$emit("enter");
    },
    submit() {
      this.$emit("submit");
    },
    setFocus(val) {
      this.$emit("update:isFocus", val);
    },
    checkSelection() {
      const info = getSelectionInfo(this.id);
      if (!info) {
        const cursorPoint = getPosition(this.id);
        this.$emit("update:selectionInfo", {
          selectorId: this.id,
          selectionStart: cursorPoint,
          selectionEnd: cursorPoint
        });
        return;
      }
      this.$emit("update:selectionInfo", info);
    },
    pasteFile(event) {
      let fileList = [];
      const items = (event.clipboardData || window.clipboardData).items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          fileList.push(items[i].getAsFile());
          break;
        }
      }
      if (!fileList.length) return;
      this.checkSelection();
      this.$emit("update:fileList", fileList);
    }
  }
};
</script>
<style lang="less" scoped>
.md_textarea {
  position: relative;
  padding: 14px 0;
  background: var(--md-editor-content-bg-color);
  // border-left: 1px solid var(--md-editor-border-color);
  // border-right: 1px solid var(--md-editor-border-color);
  transition: border 0.3s;
  // padding: 14px;
  box-sizing: border-box;
  // &.isFocus {
  //   border-left: 1px solid var(--md-editor-border-color-active);
  //   border-right: 1px solid var(--md-editor-border-color-active);
  // }

  &.fullScreen {
    height: 100%;
    textarea {
      font-size: 20px;
      max-height: 100%;
      overflow-y: auto;
    }
  }
  &.disabled {
    background: var(--md-editor-content-bg-color-disabled);
  }

  textarea {
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: var(--md-editor-content-bg-color);
    color: var(--md-editor-text-color-active);
    height: var(--md-editor-height);
    resize: none;
    font-size: 14px;
    line-height: 1.625;
    word-break: break-all;
    font-family: "Menlo", -apple-system, SF UI Text, Arial, PingFang SC,
      Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif, SimHei,
      SimSun;
    &::placeholder {
      color: var(--md-editor-text-color);
    }
    &.disabled {
      opacity: var(--md-editor-disabled-opacity);
    }
    // &:disabled {
    //   background: var(--md-editor-content-bg-color-disabled);
    // }
  }
  .icon {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 32px;
    cursor: pointer;
  }
}
</style>
