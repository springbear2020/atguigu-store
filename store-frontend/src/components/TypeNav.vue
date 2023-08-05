<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="categoryMouseLeave" @mouseenter="allCategoryMouseEnter">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="isTypeNavShow">
            <!-- 动态添加、移除样式 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                  class="item bo"
                  v-for="(category, index) in categoryList"
                  :key="category.categoryId"
                  :class="{ active: curIndex === index }"
              >
                <h3
                    @mouseenter="categoryMouseEnter(index)"
                    :data-category-name="category.categoryName"
                    :data-category1-id="category.categoryId"
                >
                  <a
                      style="cursor: pointer"
                      :data-category-name="category.categoryName"
                      :data-category1-id="category.categoryId"
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
                            style="cursor: pointer"
                            :data-category-name="categoryChild.categoryName"
                            :data-category2-id="categoryChild.categoryId"
                        >{{ categoryChild.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                            v-for="item in categoryChild.categoryChild"
                            :key="item.categoryId"
                        >
                          <a
                              style="cursor: pointer"
                              :data-category-name="item.categoryName"
                              :data-category3-id="item.categoryId"
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
        </transition>
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
import {mapState} from "vuex";
import throttle from "lodash/throttle";

export default {
  data() {
    return {
      curIndex: -1,
      isTypeNavShow: false,
    };
  },
  methods: {
    // 函数节流：将多次频繁触发优化为少量触发
    categoryMouseEnter: throttle(function (index) {
      this.curIndex = index;
    }, 100),
    categoryMouseLeave() {
      this.curIndex = -1;
      if (this.$route.path !== "/home") {
        this.isTypeNavShow = false;
      }
    },
    allCategoryMouseEnter() {
      if (this.$route.path !== "/home") {
        this.isTypeNavShow = true;
      }
    },
    // 利用编程式路由导航 + 事件委派实现路由传递参数
    goSearch(event) {
      let element = event.target;
      let {categoryName, category1Id, category2Id, category3Id} =
          element.dataset;

      // 拼接查询参数
      if (categoryName) {
        let conditions = {categoryName: categoryName};
        if (category1Id) {
          conditions.category1Id = category1Id;
        } else if (category2Id) {
          conditions.category2Id = category2Id;
        } else if (category3Id) {
          conditions.category3Id = category3Id;
        }

        let reqObj = {name: "Search", query: conditions};

        // 如果路径中存在 params 参数则一并携带
        if (this.$route.params) {
          reqObj.params = this.$route.params;
        }

        this.$router.push(reqObj);
      }
    },
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  mounted() {
    // 首页默认展示三级联动导航栏
    if (this.$route.path === "/home") {
      this.isTypeNavShow = true;
    }
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

    /* 过渡动画 */

    .sort-enter {
      height: 0px;
    }

    .sort-enter-to {
      height: 461px;
    }

    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>