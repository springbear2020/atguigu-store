<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <CardDetail title="总销售额" number="￥924532.23">
          <!-- 具名插槽 -->
          <template slot="charts">
            <span>周同比 56.67% <svg t="1670310623442" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                  xmlns="http://www.w3.org/2000/svg" p-id="3827" width="16" height="16"><path
              d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"
              p-id="3828" fill="#1afa29"></path></svg></span>
            <span>日同比 19.16% <svg t="1670310645890" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                  xmlns="http://www.w3.org/2000/svg" p-id="4794" width="16" height="16"><path
              d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z"
              p-id="4795" fill="#d81e06"></path></svg></span>
          </template>
          <template slot="footer">
            <span>日销售额 ￥6545.23</span>
          </template>
        </CardDetail>
      </el-col>
      <el-col :span="6">
        <CardDetail title="访问量" number="64251">
          <template slot="footer">
            <span>日访问量 5429</span>
          </template>
          <template slot="charts">
            <LineCharts></LineCharts>
          </template>
        </CardDetail>
      </el-col>
      <el-col :span="6">
        <CardDetail title="支付笔数" number="92342">
          <template slot="footer">
            <span>转化率 13%</span>
          </template>
          <template slot="charts">
            <BarCharts></BarCharts>
          </template>
        </CardDetail>
      </el-col>
      <el-col :span="6">
        <CardDetail title="运营活动效果" number="87%">
          <template slot="footer">
            <span>周同比 12.53% <svg t="1670310623442" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                  xmlns="http://www.w3.org/2000/svg" p-id="3827" width="16" height="16"><path
              d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"
              p-id="3828" fill="#1afa29"></path></svg></span>
            <span>日同比 3.36% <svg t="1670310645890" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                  xmlns="http://www.w3.org/2000/svg" p-id="4794" width="16" height="16"><path
              d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z"
              p-id="4795" fill="#d81e06"></path></svg></span>
          </template>
          <template slot="charts">
            <ProgressCharts></ProgressCharts>
          </template>
        </CardDetail>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineCharts from "@/components/charts/LineCharts";
import CardDetail from "@/views/dashboard/top/CardDetail";
import BarCharts from "@/components/charts/BarCharts";
import ProgressCharts from "@/components/charts/ProgressCharts";

export default {
  name: "TopCard",
  components: {ProgressCharts, BarCharts, CardDetail, LineCharts},
}
</script>

<style scoped>

</style>
