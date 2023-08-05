<template>
  <div class="pagination">
    <!-- 当前页码大于 1 才显示上一页 -->
    <button v-show="pageNum > 1" @click="$emit('changePageNumber', pageNum - 1)">上一页</button>
    <!-- 起始页码大于 1 才显示第 1 页 -->
    <button v-show="pageNumArr[0] > 1" @click="$emit('changePageNumber', 1)" :class="{active: pageNum === 1}">1</button>
    <button v-show="pageNumArr[0] > 2">···</button>

    <!-- 连续的页码 -->
    <button v-for="num in pageNumArr" :key="num" :disabled="pageNum === num" @click="$emit('changePageNumber', num)"
            :class="{active: pageNum === num}"> {{ num }}
    </button>

    <button v-show="pageNumArr[pageNumArr.length - 1] < pages - 1">···</button>
    <!-- 终止页码小于总页数才显示最后一页 -->
    <button v-show="pageNumArr[pageNumArr.length - 1] < pages" @click="$emit('changePageNumber', pages)"
            :class="{active: pageNum === pages}">{{
        pages
      }}
    </button>
    <!-- 当前页码小于 pages 才显示下一页 -->
    <button v-show="pageNum < pages" @click="$emit('changePageNumber', pageNum + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNum', 'pageSize', 'total', 'continues'],
  computed: {
    pages() {
      return Math.ceil(this.total / this.pageSize)
    },
    pageNumArr() {
      const {pageNum, pages, continues} = this;
      let start = 0;
      let end = 0;

      // 连续的页数比总页数大，则显示 [1, pages]
      if (continues > pages) {
        start = 1;
        end = pages;
      } else {
        start = pageNum - Math.floor(continues / 2)
        end = pageNum + Math.floor(continues / 2)
        // 解决起始页面小于 1
        if (start < 1) {
          start = 1;
          end = continues
        }
        // 解决终止页面大于 pages
        if (end >= pages) {
          end = pages
          start = end - continues + 1
        }
      }

      let res = [];
      while (start <= end) {
        res.push(start++)
      }
      return res;
    }
  },
}
</script>

<style lang="less" scoped>
.active {
  background: deepskyblue;
}
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
