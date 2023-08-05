<template>
  <div class="card-charts" ref="charts">

  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: "LineCharts",
  mounted() {
    let lineCharts = echarts.init(this.$refs.charts)
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: 'category',
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: 'line',
          data: [10, 7, 23, 5, 12, 1, 34, 21, 53, 15, 43, 23],
          // 隐藏拐点
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: 'purple'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {offset: 0, color: 'purple'},
                {offset: 1, color: 'white'},
              ]
            },
            global: false
          },
          smooth: true
        }
      ],
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    })
  }
}
</script>

<style scoped>
.card-charts {
  height: 100%;
  width: 100%;
}
</style>
