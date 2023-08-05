<template>
  <div class="charts-bar" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: "BarCharts",
  mounted() {
    let bar = echarts.init(this.$refs.charts);
    bar.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'bar',
          data: [10, 7, 23, 5, 12, 1, 34, 21, 53, 15, 43, 23],
          color: 'blue'
        }
      ],
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      tooltip: {}
    })
  }
}
</script>

<style scoped>
.charts-bar {
  width: 100%;
  height: 100%;
}
</style>
