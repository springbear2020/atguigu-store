<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>线上热门搜索</span>
        <el-dropdown style="float: right; padding: 3px 0">
          <span class="el-dropdown-link"><i class="el-icon-more"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <BottomCharts></BottomCharts>
          </el-col>
          <el-col :span="12">
            <BottomCharts></BottomCharts>
          </el-col>
        </el-row>
      </div>

      <div style="margin: 20px 0">
        <el-table
          border
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            prop="date"
            label="排名"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="关键字"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="用户"
            sortable>
          </el-table-column>
          <el-table-column
            prop="address"
            label="涨幅"
            sortable>
          </el-table-column>
        </el-table>
      </div>

      <div>
        <el-pagination
          style="float: right"
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import BottomCharts from "@/views/dashboard/bottom/BottomCharts";

export default {
  name: "HotSearch",
  components: {BottomCharts}
}
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
