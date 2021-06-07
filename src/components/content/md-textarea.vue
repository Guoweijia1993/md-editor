<template>
  <div :class="['md_textarea', { fullScreen }]">
    <textarea
      :id="id"
      @change="setText(textContent)"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @paste="pasteFile"
      v-model="textContent"
      :placeholder="placeholder"
      rows="10"
    >
    </textarea>
    <span
      @click="setFullScreen(false)"
      v-if="fullScreen"
      class="icon iconfont icon-quxiaoquanping_o"
    ></span>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { getSelectionInfo, getPosition } from "@/assets/js/utils";
export default {
  data() {
    return {
      id: new Date().getTime(),
      isFocus: false,
      textContent: ""
    };
  },
  created() {
    document.addEventListener("mouseup", this.checkSelection);
  },
  watch: {
    text: {
      immediate: true,
      handler: function(val) {
        this.textContent = val;
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("mouseup", this.checkSelection);
  },
  computed: {
    ...mapState(["text", "fullScreen", "placeholder"])
  },
  methods: {
    ...mapMutations([
      "setText",
      "setFullScreen",
      "setSelectionInfo",
      "setFileList",
      "setFocus"
    ]),
    checkSelection() {
      const info = getSelectionInfo(this.id);
      if (!info) {
        const cursorPoint = getPosition(this.id);
        this.setSelectionInfo({
          selectorId: this.id,
          selectionStart: cursorPoint,
          selectionEnd: cursorPoint
        });
        return;
      }
      this.setSelectionInfo(info);
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
      this.setFileList(fileList[0]);
    }
  }
};
</script>
<style lang="less" scoped>
.md_textarea {
  position: relative;
  padding: 10px 0;
  background: #fff;
  &.fullScreen {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    padding: 40px 60px;
    box-sizing: border-box;
    textarea {
      font-size: 20px;
    }
  }
  textarea {
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    color: var(--md-editor-text-color);
    resize: none;
    font-family: "Menlo", "DejaVu Sans Mono", "Liberation Mono", "Consolas",
      "Ubuntu Mono", "Courier New", "andale mono", "lucida console", monospace;
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
