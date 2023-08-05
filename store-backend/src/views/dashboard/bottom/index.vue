<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <HotSearch></HotSearch>
      </el-col>
      <el-col :span="12">
        <SaleCategory></SaleCategory>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HotSearch from "@/views/dashboard/bottom/HotSearch";
import SaleCategory from "@/views/dashboard/bottom/SaleCategory";

export default {
  name: "index",
  components: {SaleCategory, HotSearch}
}
</script>

<style scoped>

</style>
