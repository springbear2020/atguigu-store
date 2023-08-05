<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: "CircleCharts",
  mounted() {
    let myCharts = echarts.init(this.$refs.charts)
    myCharts.setOption({
      title: {
        text: 'Search Engine',
        subtext: 1048,
        top: 'center',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: [
            {value: 1048, name: 'Search Engine'},
            {value: 735, name: 'Direct'},
            {value: 580, name: 'Email'},
            {value: 484, name: 'Union Ads'},
            {value: 300, name: 'Video Ads'}
          ]
        }
      ]
    })
    myCharts.on('mouseover', (params) => {
      const {name, value} = params.data
      myCharts.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 300px;
}
</style>
