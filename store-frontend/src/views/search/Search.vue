<template>
  <div>
    <TypeNav/>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="conditions.categoryName">
              {{ conditions.categoryName }}<i @click="clearCategory">×</i>
            </li>
            <!-- 关键词面包屑 -->
            <li class="with-x" v-if="conditions.keyword">
              {{ conditions.keyword }}<i @click="clearKeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="conditions.trademark">
              {{ conditions.trademark.split(':')[1] }}<i @click="clearBrand">×</i>
            </li>
            <!-- 商品属性 -->
            <li class="with-x" v-if="conditions.props" v-for="(prop, index) in conditions.props" :key="index">
              {{ prop.split(':')[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!-- order -->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: hasOne}" @click="changeOrderType('1')">
                  <a>综合 <span class="iconfont" v-show="hasOne" :class="{'icon-down': isDesc, 'icon-up': isAsc}"></span></a>
                </li>
                <li :class="{active: hasTwo}" @click="changeOrderType('2')">
                  <a>价格 <span class="iconfont" v-show="hasTwo" :class="{'icon-down': isDesc, 'icon-up': isAsc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- goods -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div @click="checkDetail(good.id)" style="cursor: pointer">
                    <div class="p-img">
                      <a><img :src="good.defaultImg" alt="detail"/></a>
                    </div>
                    <div class="price">
                      <strong>
                        <em>¥ </em>
                        <i>{{ good.price }}</i>
                      </strong>
                    </div>
                    <div class="attr">
                      <a>{{ good.title }}</a>
                    </div>
                    <div class="commit">
                      <i class="command">已有<span>2000</span>人评价</i>
                    </div>
                  </div>
                  <div class="operate">
                    <a
                        target="_blank"
                        class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                    >收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- pages -->
          <Pagination :pageNum="conditions.pageNo" :pageSize="conditions.pageSize" :total="total"
                      :continues="5"
                      @changePageNumber="changePageNumber"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector";
import {mapGetters, mapState} from "vuex";

export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      conditions: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        // 商品属性数组
        props: [],
        trademark: "",
        // 排序方式：默认 [综合:降序]
        order: "1:desc",
        pageNo: 1,
        pageSize: 5,
      },
    };
  },
  created() {
    // 将路由路径中的参数信息赋值给条件查询对象
    Object.assign(this.conditions, this.$route.query, this.$route.params);
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.dispatch("commoditySearch", this.conditions);
    },
    // 清除商品分类信息，重新加载默认数据
    clearCategory() {
      this.conditions.categoryName = undefined;
      if (this.$route.params) {
        this.$router.push({name: "Search", params: this.$route.params});
      } else {
        this.$router.push({path: "/search"});
      }
    },
    clearKeyword() {
      this.conditions.keyword = undefined
      // 通过全局事件总线通知 Header 组件清除搜索关键字
      this.$bus.$emit('clearKeyword')
      // 清除路由路径中的 params 参数
      if (this.$route.params) {
        this.$router.push({path: "/search", query: this.$route.query});
      } else {
        this.$router.push({path: "/search"});
      }
    },
    // 自定义事件的回调函数
    trademarkInfo(trademark) {
      this.conditions.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.fetchData()
    },
    clearBrand() {
      this.conditions.trademark = undefined
      this.fetchData()
    },
    // 自定义事件的回调函数
    attrInfo(params) {
      if (this.conditions.props.indexOf(params) === -1) {
        this.conditions.props.push(params)
        this.fetchData();
      }
    },
    // 移除商品属性
    removeAttr(index) {
      this.conditions.props.splice(index, 1);
      this.fetchData();
    },
    // 修改商品排序方式
    changeOrderType(whichClick) {
      let originalNumber = this.hasOne ? '1' : '2'
      let newOrder = this.isAsc ? 'desc' : 'asc'

      if (whichClick !== originalNumber) {
        newOrder = 'desc'
      }
      this.conditions.order = `${whichClick}:${newOrder}`
      this.fetchData()
    },
    // 通过当前页面获取商品分页数据
    changePageNumber(current) {
      console.log(current)
      this.conditions.pageNo = current
      this.fetchData()
    },
    // 查看商品详情
    checkDetail(goodId) {
      this.$router.push(`detail/${goodId}`)
    }
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      total: state => state.search.searchList.total
    }),
    hasOne() {
      return this.conditions.order.indexOf('1') !== -1;
    },
    hasTwo() {
      return this.conditions.order.indexOf('2') !== -1;
    },
    isAsc() {
      return this.conditions.order.indexOf('asc') !== -1;
    },
    isDesc() {
      return this.conditions.order.indexOf('desc') !== -1;
    }
  },
  watch: {
    // 监听路由路径的变化，若发生改变则查询新的商品信息
    $route(newVal, oldVal) {
      if (newVal !== oldVal) {
        // 将之前的查询条件置空
        this.conditions.category1Id = undefined;
        this.conditions.category2Id = undefined;
        this.conditions.category3Id = undefined;
        Object.assign(this.conditions, this.$route.query, this.$route.params);
        this.fetchData();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>