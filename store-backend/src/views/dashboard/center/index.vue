<template>
  <div style="margin: 20px 0">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="views"></el-tab-pane>
        </el-tabs>

        <!-- 头部文字 -->
        <div class="right">
          <el-button size="mini" @click="setToday">今日</el-button>
          <el-button size="mini" @click="setWeek">本周</el-button>
          <el-button size="mini" @click="setMonth">本月</el-button>
          <el-button size="mini" @click="setYear">本年</el-button>
          <el-date-picker
            v-model="selectedDate"
            size="mini"
            type="daterange"
            range-separator="-"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>

      <div class="content">
        <el-row :gutter="10">
          <el-col :span="18">
            <!-- 内容图表 -->
            <div ref="charts" style="width: 100%;height: 300px"></div>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-weight: bold">门店{{ activeTitle }}排名</span>
              </div>
              <ul>
                <li>
                  <span class="list-left">1</span>
                  <span class="list-center">肯德基</span>
                  <span class="list-right">135323</span>
                </li>
                <li>
                  <span class="list-left">2</span>
                  <span class="list-center">华莱士</span>
                  <span class="list-right">653245</span>
                </li>
                <li>
                  <span class="list-left">3</span>
                  <span class="list-center">麦当劳</span>
                  <span class="list-right">753334</span>
                </li>
                <li>
                  <span class="list-left">4</span>
                  <span class="list-center">德克士</span>
                  <span class="list-right">425243</span>
                </li>
                <li>
                  <span class="list-left">5</span>
                  <span class="list-center">汉堡王</span>
                  <span class="list-right">52452</span>
                </li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'

export default {
  name: "index",
  data() {
    return {
      activeName: 'sale',
      saleData: [522, 353, 200, 334, 390, 330, 220, 431, 532, 893, 234, 532],
      viewData: [425, 953, 542, 637, 842, 135, 463, 747, 563, 524, 757, 241],
      selectedDate: []
    }
  },
  computed: {
    activeTitle() {
      return this.activeName === 'sale' ? '销售额' : '访问量';
    }
  },
  watch: {
    activeName(val) {
      let data = val === 'sale' ? this.saleData : this.viewData;
      this.initCharts(this.activeTitle, data)
    }
  },
  mounted() {
    this.initCharts(this.activeTitle, this.saleData)
  },
  methods: {
    initCharts(title, data) {
      echarts.init(this.$refs.charts).setOption({
        title: {
          text: title + '趋势'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: data
          }
        ]
      })
    },
    setToday() {
      const today = dayjs().format('YYYY-MM-DD')
      this.selectedDate = [today, today]
    },
    setWeek() {
      let start = dayjs().day(1).format('YYYY-MM-DD')
      let end = dayjs().day(7).format('YYYY-MM-DD');
      this.selectedDate = [start, end]
    },
    setMonth() {
      let start = dayjs().startOf('month').format('YYYY-MM-DD')
      let end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.selectedDate = [start, end]
    },
    setYear() {
      let start = dayjs().startOf('year').format('YYYY-MM-DD')
      let end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.selectedDate = [start, end]
    }
  }
}
</script>

<style scoped>
.clearfix {
  display: flex;
  position: relative;
  justify-content: space-between;
}

.tab {
  width: 100%;
}

.right {
  position: absolute;
  right: 0;
}

.right span {
  margin: 0 10px;
}

ul {
  list-style: none;
  width: 100%;
  padding: 0;
}

ul li {
  margin: 20px 0;
}

.list-left {
  float: left;
}

.list-center {
  margin-left: 20px;
}

.list-right {
  float: right;
}
</style>


