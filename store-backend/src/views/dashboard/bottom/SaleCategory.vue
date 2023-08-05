<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售额类别占比</span>
        <div style="float: right;">
          <el-radio-group size="small" v-model="radioSelected">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div>
        <CircleCharts></CircleCharts>
      </div>
    </el-card>
  </div>
</template>

<script>
import CircleCharts from "@/components/charts/CircleCharts";

export default {
  name: "SaleCategory",
  components: {CircleCharts},
  data() {
    return {
      radioSelected: '全部渠道'
    }
  }
}
</script>

<style scoped>

</style>
