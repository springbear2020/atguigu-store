<template>
  <div>
    <el-table border :data="dataList">
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称"></el-table-column>
      <el-table-column prop="skuDesc" label="描述"></el-table-column>
      <el-table-column label="默认图片" width="130px">
        <template slot-scope="{row, $index}">
          <img style="width: 100px;height: 100px" :src="row.skuDefaultImg" alt="cover"/>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80px"></el-table-column>
      <el-table-column prop="price" label="价格" width="80px"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row, $index}">
          <el-button title="上架" size="mini" type="success" icon="el-icon-top" v-if="row.isSale !== 1"
                     @click="goodsOn(row)"></el-button>
          <el-button title="下架" size="mini" type="info" icon="el-icon-bottom" v-else @click="goodsOff(row)"></el-button>
          <el-button title="编辑" size="mini" icon="el-icon-edit" @click="editSku(row)"></el-button>
          <el-button title="详情" size="mini" type="primary" icon="el-icon-view" @click="skuDetail(row)"></el-button>
          <el-popconfirm :title="`确定要删除《${row.skuName}》吗？`" style="margin-left: 10px" @onConfirm="deleteSku(row)">
            <el-button slot="reference" title="删除" size="mini" type="danger" icon="el-icon-delete"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页条 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="text-align: center; margin-top: 20px"
      :current-page="current"
      :page-sizes="pageSizes"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 抽屉 -->
    <el-drawer :visible.sync="isDrawerShow" direction="rtl" :show-close="false" size="40%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ sku.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ sku.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ sku.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag v-for="attr in sku.skuAttrValueList" :key="attr.id" style="margin: 0 5px">{{
              attr.valueName
            }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <template>
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="pic in sku.skuImageList" :key="pic.id">
                <img :src="pic.imgUrl" alt="cover">
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      current: 1,
      size: 100,
      total: 100,
      pageSizes: [20, 40, 60, 80, 100],
      dataList: [],
      sku: {},
      isDrawerShow: false
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 获取 SKU 列表分页数据
    async fetchData() {
      let res = await this.$api.sku.reqSkuPageData(this.current, this.size);
      this.total = res.data.total
      this.dataList = res.data.records
    },
    // 每页显示数量改变
    handleSizeChange(size) {
      this.size = size
      this.fetchData()
    },
    // 当前页码改变
    handleCurrentChange(current) {
      this.current = current
      this.fetchData()
    },
    // 商品上架
    async goodsOn(row) {
      let res = await this.$api.sku.reqGoodsOn(row.id)
      row.isSale = 1
      this.$message.success(res.message)
    },
    // 商品下架
    async goodsOff(row) {
      let res = await this.$api.sku.reqGoodsOff(row.id)
      row.isSale = 0
      this.$message.success(res.message)
    },
    // 编辑 SKU
    editSku(row) {
      this.$message.info("功能正在开发中······")
    },
    // SKU 详情
    async skuDetail(row) {
      this.isDrawerShow = true
      let res = await this.$api.sku.reqSkuDetails(row.id)
      this.sku = res.data
    },
    // 删除 SKU
    async deleteSku(row) {
      let res = await this.$api.sku.reqDeleteSku(row.id)
      this.$message.success(res.message)
      this.fetchData()
    }
  }
}
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 20px;
  text-align: right;
}

.el-col {
  margin: 10px 10px;
}
</style>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
