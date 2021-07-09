<template>
  <div class="block_container" ref="block_container">
    <div
      @mousemove.stop="getCursorPoint"
      :class="['block', { active: item.active }]"
      v-for="(item, index) in list"
      :key="index"
    ></div>
  </div>
</template>
<script>
import { throttle as throttleFn } from "@/assets/js/utils";
export default {
  data() {
    return {
      list: new Array(40).fill({
        index: 0,
        active: false
      })
    };
  },
  computed: {},
  methods: {
    getCursorPoint(e) {
      console.log(e.clientX, e.clientY);
      const target = e.target;

      const { offsetLeft, offsetTop } = target;
      if (e.clientX > offsetLeft) {
        target.className = "block active";
      }
      // console.log(offsetLeft, offsetTop);
    }
  }
};
</script>
<style lang="less" scoped>
@block-size: 16px;
@block-margin: 2px;
.block_container {
  width: (@block-size+ @block-margin*2) * 10;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .block {
    cursor: pointer;
    width: @block-size;
    height: @block-size;
    box-sizing: border-box;
    margin: @block-margin;
    border: 1px solid var(--md-editor-border-color);
    &:hover,
    &.active {
      border: 1px solid var(--md-editor-border-color-active);
    }
  }
}
</style>
