<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommand></TodayRecommand>
    <CommodityRank></CommodityRank>
    <GuessLike></GuessLike>
    <!-- 父 -> 子：通过 props 传递数据 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/views/home/ListContainer.vue";
import TodayRecommand from "@/views/home/TodayRecommand.vue";
import CommodityRank from "@/views/home/CommodityRank.vue";
import GuessLike from "@/views/home/GuessLike.vue";
import Floor from "@/views/home/Floor.vue";
import Brand from "@/views/home/Brand.vue";
import {mapState} from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    ListContainer,
    TodayRecommand,
    CommodityRank,
    GuessLike,
    Floor,
    Brand,
  },
  methods: {},
  mounted() {
    // 派发 action，获取 floor 组件数据
    this.$store.dispatch("floorList");
  },
  computed: {
    ...mapState({floorList: (state) => state.home.floorList}),
  },
};
</script>

<style scoped>
</style>