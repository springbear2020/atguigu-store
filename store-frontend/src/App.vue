<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: { Header, Footer },
  created() {
    /*
     * 通知 Vuex 发请求获取商品分类数据存于仓库中
     * 将操作置于此处的目的是为了优化代码，做到只向服务发一次请求
     */
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
