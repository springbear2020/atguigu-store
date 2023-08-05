<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommand></TodayRecommand>
    <CommodityRank></CommodityRank>
    <GuessLike></GuessLike>
    <Floor></Floor>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/views/home/ListContainer.vue"
import TodayRecommand from "@/views/home/TodayRecommand.vue"
import CommodityRank from "@/views/home/CommodityRank.vue"
import GuessLike from "@/views/home/GuessLike.vue"
import Floor from "@/views/home/Floor.vue"
import Brand from "@/views/home/Brand.vue"

export default {
  data() {
    return {};
  },
  components: { ListContainer, TodayRecommand, CommodityRank, GuessLike, Floor, Brand },
  methods: {},
};
</script>

<style scoped>
</style>