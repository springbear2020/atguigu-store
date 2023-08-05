<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU 名称">
        {{ spuInfo.spuName }}
      </el-form-item>

      <el-form-item label="SKU 名称">
        <el-input placeholder="请输入 SKU 名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input placeholder="请输入 SKU 价格（单位/元）" v-model="skuInfo.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量">
        <el-input placeholder="请输入 SKU 重量（单位/千克）" v-model="skuInfo.weight"></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input v-model="skuInfo.skuDesc" placeholder="请输入 SKU 规格描述" type="textarea" rows="3" cols="200"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="attr in spuPlatformAttrList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrVal.valueName" :value="`${attrVal.attrId}:${attrVal.id}`"
                         v-for="attrVal in attr.attrValueList" :key="attrVal.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.saleAttrIdAndValueId">
              <el-option :label="saleAttrVal.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrVal.id}`"
                         v-for="saleAttrVal in saleAttr.spuSaleAttrValueList" :key="saleAttrVal.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table border :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" prop="prop">
          </el-table-column>
          <el-table-column label="图片" align="center" prop="prop">
            <template slot-scope="{row, $index}">
              <img :src="row.imgUrl" alt="img" style="height: 100px; width: 100px"/>
            </template>
          </el-table-column>
          <el-table-column label="名称" align="center" prop="imgName">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row, $index}">
              <el-button type="primary" size="mini" v-if="row.isDefault === 0" @click="setImageDefault(row)">
                设为默认
              </el-button>
              <el-button type="success" size="mini" disabled v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveSkuInfo">保存</el-button>
        <el-button @click="clearAndChange">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      spuPlatformAttrList: [],
      spuInfo: {},
      skuInfo: {
        // father
        "category3Id": '',
        "spuId": '',
        "tmId": '',
        // v-model
        "skuName": "",
        "price": 0,
        "weight": '',
        "skuDesc": "",
        // server
        "skuImageList": [],
        "skuSaleAttrValueList": [],
        "skuAttrValueList": [],
        "skuDefaultImg": "",
      },
      multipleSelection: []
    }
  },
  methods: {
    // 父组件调用，不能删除
    async initData(spu, category1Id, category2Id, category3Id) {
      this.spuInfo = spu
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.tmId = spu.tmId
      this.skuInfo.spuId = spu.id
      // 获取 SPU 下的图片列表
      let res = await this.$api.spu.reqSpuImageList(spu.id)
      this.spuImageList = res.data
      // 遍历每张图片对象，追加 isDefault 属性为 0 以便提交给服务器
      this.spuImageList.forEach(item => {
        this.$set(item, 'isDefault', 0)
      })
      // 获取 SPU 下的销售属性
      res = await this.$api.spu.reqSpuSaleAttrs(spu.id)
      this.spuSaleAttrList = res.data
      // 获取平台属性
      res = await this.$api.platform.reqPlatformAttrList(category1Id, category2Id, category3Id);
      this.spuPlatformAttrList = res.data
    },
    // 图片列表选择发生变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 设置 SKU 图片列表默认图片
    setImageDefault(row) {
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row
    },
    // 保存 SKU
    async saveSkuInfo() {
      // 整理收集的平台属性、平台属性值 ID
      this.spuPlatformAttrList.forEach(item => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          this.skuInfo.skuAttrValueList.push({
            attrId,
            valueId
          })
        }
      })
      // 整理收集的销售属性以及销售属性值 ID
      this.spuSaleAttrList.forEach(item => {
        if (item.saleAttrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.saleAttrIdAndValueId.split(':')
          this.skuInfo.skuSaleAttrValueList.push({
            saleAttrId,
            saleAttrValueId
          })
        }
      })
      // 整理收集到的图片列表数据
      this.skuInfo.skuImageList = this.multipleSelection.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        }
      })

      // 请求服务器保存 SKU 信息
      let res = await this.$api.sku.reqSaveSkuInfo(this.skuInfo)
      this.$message.success(res.data || res.message)
      this.clearAndChange()
    },
    // 清除数据，切换场景
    clearAndChange() {
      Object.assign(this._data, this.$options.data())
      this.$emit('changeScene', 1)
    }
  }
}
</script>

<style scoped>

</style>
