<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="mouseLeave">
        <h2 class="all">全部商品分类</h2>
        <div class="sort">
          <!-- 动态添加、移除样式 -->
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item bo"
              v-for="(category, index) in categoryList"
              :key="category.categoryId"
              :class="{ active: curIndex === index }"
            >
              <h3
                @mouseenter="mouseEnter(index)"
                :data-category-name="category.categoryName"
                :data-category-id="category.categoryId"
              >
                <a
                  :data-category-name="category.categoryName"
                  :data-category-id="category.categoryId"
                  >{{ category.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix" v-show="curIndex === index">
                <div
                  class="subitem"
                  v-for="categoryChild in category.categoryChild"
                  :key="categoryChild.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-category-name="categoryChild.categoryName"
                        :data-category-id="categoryChild.categoryId"
                        >{{ categoryChild.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="item in categoryChild.categoryChild"
                        :key="item.categoryId"
                      >
                        <a
                          :data-category-name="item.categoryName"
                          :data-category-id="item.categoryId"
                          >{{ item.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  data() {
    return {
      curIndex: -1,
    };
  },
  methods: {
    // 函数节流：将多次频繁触发优化为少量触发
    mouseEnter: throttle(function (index) {
      this.curIndex = index;
    }, 100),
    mouseLeave() {
      this.curIndex = -1;
    },
    // 利用编程式路由导航 + 事件委派实现路由传递参数
    goSearch(event) {
      let element = event.target;
      let { categoryName, categoryId } = element.dataset;
      if (categoryName && categoryId) {
        this.$router.push({
          path: "/search",
          query: { categoryName: categoryName, categoryId: categoryId },
        });
      }
    },
  },
  created() {
    // 通知 Vuex 发请求获取数据存于仓库中
    this.$store.dispatch("categoryList");
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .active {
          background: skyblue;
        }
      }
    }
  }
}
</style>