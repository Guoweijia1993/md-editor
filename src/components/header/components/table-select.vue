<template>
  <div
    class="block_container"
    @mousemove.stop="getCursorPoint"
    @mouseout="resetCursorPoint"
    @click.stop="handleSelectTable"
    ref="block_container"
  >
    <span v-show="lastItem.row && lastItem.col" class="select_num"
      >{{ lastItem.row }}&nbsp;x&nbsp;{{ lastItem.col }}</span
    >
    <div
      ref="block"
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
      list: new Array(60).fill(0).map((item, index) => {
        return {
          index: index + 1,
          active: false,
          row: Math.floor(index / 10) + 1,
          col: (index % 10) + 1
        };
      }),
      mousePoint: {
        x: 0,
        y: 0
      },
      dialogPositon: {
        x: 0,
        y: 0
      },
      lastItem: {
        row: 0,
        col: 0
      }
    };
  },
  created() {
    setTimeout(() => {
      this.createBlockPoint();
    }, 0);
  },

  methods: {
    handleSelectTable() {
      const { row, col } = this.lastItem;
      const str = `\n\n|${this.createStr(" 表头 |", col)}\n|${this.createStr(
        " ------ |",
        col
      )}\n${this.createStr("|" + this.createStr(" 单元格 |", col) + "\n", row)}`;

      this.$emit("select", str);
    },
    createStr(str, num) {
      let res = "";
      new Array(num).fill(0).forEach(item => {
        res += str;
      });
      return res;
    },
    createBlockPoint() {
      const list = this.$refs.block;
      this.list = this.list.map((item, index) => {
        item.x = list[index].getBoundingClientRect().left;
        item.y = list[index].getBoundingClientRect().top;
        return item;
      });
    },
    getCursorPoint(e) {
      this.mousePoint = {
        x: e.clientX,
        y: e.clientY
      };
      this.setBlockActive();
    },
    resetCursorPoint() {
      this.lastItem = {
        row: 0,
        col: 0
      };
      this.list.forEach(item => {
        item.active = false;
      });
    },
    setBlockActive() {
      const mousePoint = this.mousePoint;
      const list = this.list;
      list.forEach(item => {
        item.active = mousePoint.x > item.x && mousePoint.y > item.y;
      });
      const lastItem = list.filter(item => item.active).pop();
      if (!lastItem) return;
      this.lastItem = { row: lastItem.row, col: lastItem.col };
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
  cursor: pointer;
  margin-bottom: 4px;
  .select_num {
    position: absolute;
    top: 8px;
    right: 10px;
  }
  .block {
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
