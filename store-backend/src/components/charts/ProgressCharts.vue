<template>
  <div class="charts-progress" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: "ProgressCharts",
  mounted() {
    let progress = echarts.init(this.$refs.charts);
    progress.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [{
        type: 'bar',
        data: [78],
        color: 'skyblue',
        barWidth: '10px',
        showBackground: true,
        backgroundStyle: {
          color: 'grey'
        },
        label: {
          show: true,
          formatter: '|',
          position: 'right'
        }
      }],
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
    })
  }
}
</script>

<style scoped>
.charts-progress {
  height: 100%;
  width: 100%;
}
</style>
