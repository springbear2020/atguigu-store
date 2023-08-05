<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <CategorySelection @transmitCategory="transmitCategory" :isChecked="scene !== 1"></CategorySelection>
    </el-card>
    <el-card>
      <!-- SPU 数据列表 -->
      <div v-show="scene === 1">
        <!-- 添加 -->
        <el-button type="primary" @click="addSPU" icon="el-icon-plus" style="margin-bottom: 20px"
                   :disabled="!category3Id">添加 SPU
        </el-button>

        <!-- 数据列表 -->
        <el-table border :data="spuList">
          <el-table-column label="#" type="index" align="center"></el-table-column>
          <el-table-column label="名称" align="center" prop="spuName"></el-table-column>
          <el-table-column label="描述" align="center" prop="description"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row, $index}">
              <el-button type="success" icon="el-icon-plus" size="mini" title="添加 SKU"
                         @click="addSkuOfSpu(row)"></el-button>
              <el-popconfirm :title="`确定要删除【${row.spuName}】这条 SPU 吗？`" @onConfirm="deleteSpu(row.id)"
                             style="margin: 0 10px">
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  title="删除 SPU"
                  slot="reference">
                </el-button>
              </el-popconfirm>
              <el-button type="warning" icon="el-icon-edit" size="mini" title="编辑 SPU"
                         @click="editSPU(row)"></el-button>
              <el-button type="info" icon="el-icon-view" size="mini" title="查看 SPU 下的 SKU"
                         @click="checkSkuList(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页条 -->
        <el-pagination
          style="margin-top: 20px; text-align: center"
          :current-page="current"
          :page-sizes="[20, 40, 60, 80, 100]"
          :page-size="size"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>

      <!-- 添加/编辑 SPU -->
      <SpuForm v-show="scene === 2" @changeScene="changeScene" ref="spu"></SpuForm>

      <!-- 添加/编辑 SKU -->
      <SkuForm v-show="scene === 3" @changeScene="changeScene" ref="sku"></SkuForm>

      <!-- SPU 下的 SKU 列表 -->
      <el-dialog :title="`《${clickedSpu.spuName}》下的 SKU 列表`" :visible.sync="dialogTableVisible">
        <el-table :data="skuList">
          <el-table-column property="skuName" label="名称" width="150"></el-table-column>
          <el-table-column property="price" label="价格" width="200"></el-table-column>
          <el-table-column property="weight" label="重量"></el-table-column>
          <el-table-column label="默认图片">
            <template slot-scope="{row, $index}">
              <img :src="row.skuDefaultImg" alt="cover" style="width: 100px; height: 100px"/>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import SkuForm from "@/views/product/spu/SkuForm";
import SpuForm from "@/views/product/spu/SpuForm";

export default {
  name: "Spu",
  components: {SpuForm, SkuForm},
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      spuList: [],
      current: 1,
      size: 20,
      total: 0,
      // [1] SPU 数据列表；[2] 添加/编辑 SPU；[3] 添加/编辑 SKU
      scene: 1,
      dialogTableVisible: false,
      skuList: [],
      clickedSpu: {}
    }
  },
  methods: {
    // 接收 CategorySelection 传递的一级、二级和三级分类 id 数据
    transmitCategory(category) {
      this.category1Id = category.category1Id
      this.category2Id = category.category2Id
      this.category3Id = category.category3Id
      // 三种分类 ID 都存在时才从服务器获取数据
      if (this.category1Id && this.category2Id && this.category3Id) {
        this.getSpuList()
      } else {
        // 分类选择发生变化，清除原有数据
      }
    },
    // 获取 SPU 分类数据
    async getSpuList() {
      let result = await this.$api.spu.reqSpuPageData(this.current, this.size, this.category3Id)
      this.total = result.data.total
      this.spuList = result.data.records
    },
    // 改变每页显示数量
    handleSizeChange(size) {
      this.size = size
      this.getSpuList()
    },
    // 切换页码
    handleCurrentChange(current) {
      this.current = current
      this.getSpuList()
    },
    // 添加 SPU
    addSPU() {
      this.scene = 2
      this.$refs.spu.fetchData(this.category3Id)
    },
    // 编辑 SPU
    editSPU(row) {
      this.scene = 2
      // 通过子组件的方法初始化子组件数据
      this.$refs.spu.initSpuData(row)
    },
    // 切换场景
    changeScene(scene) {
      this.scene = scene
      this.getSpuList()
    },
    // 添加 SKU
    addSkuOfSpu(row) {
      this.scene = 3
      // 调用子组件的方法，初始化 SPU 下的 SKU 数据
      this.$refs.sku.initData(row, this.category1Id, this.category2Id, this.category3Id)
    },
    // 删除 SPU
    async deleteSpu(spuId) {
      let res = await this.$api.spu.reqDeleteSpu(spuId);
      this.$message.success(res.message)
      this.getSpuList()
    },
    // 查看 SPU 下的 SKU
    async checkSkuList(row) {
      this.dialogTableVisible = true
      let res = await this.$api.sku.reqSkuListOfSpu(row.id)
      this.skuList = res.data
      this.clickedSpu = row
    }
  }
}
</script>

<style scoped>

</style>
