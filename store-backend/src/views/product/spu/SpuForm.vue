<template>
  <div>
    <el-form label-width="80px" :model="spuInfo">
      <el-form-item label="SPU 名称">
        <el-input placeholder="请输入 SPU 名称" v-model="spuInfo.spuName"></el-input>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spuInfo.tmId">
          <el-option :label="brand.tmName" :value="brand.id" v-for="brand in brandList" :key="brand.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU 描述">
        <el-input placeholder="请输入 SPU 描述" type="textarea" rows="3" v-model="spuInfo.description"></el-input>
      </el-form-item>

      <el-form-item label="SPU 图片">
        <el-upload
          :action="VUE_APP_BASE_API+'/admin/product/fileUpload'"
          list-type="picture-card"
          :file-list="spuInfo.spuImageList || []"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="enlarge selected image">
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select :placeholder="`还有 ${unSelectedAttrs.length} 个销售属性未选择`" v-model="selectedAttrIdAndName">
          <el-option :label="unSelectedAttr.name" :value="`${unSelectedAttr.id}:${unSelectedAttr.name}`"
                     v-for="unSelectedAttr in unSelectedAttrs" :key="unSelectedAttr.id"></el-option>
        </el-select>
        <el-button icon="el-icon-plus" type="primary" style="margin-left: 20px" :disabled="!selectedAttrIdAndName"
                   @click="addSaleAttr">添加销售属性
        </el-button>
        <!-- 数据列表 -->
        <el-table border :data="spuInfo.spuSaleAttrList" style="margin-top: 20px">
          <el-table-column label="#" type="index" align="center"></el-table-column>
          <el-table-column label="属性名" prop="saleAttrName" align="center"></el-table-column>
          <el-table-column label="属性值" align="center">
            <template scope="{row, $index}">
              <el-tag :key="attrVal.id" v-for="(attrVal, index) in row.spuSaleAttrValueList" closable
                      :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index, 1)">
                {{ attrVal.saleAttrValueName }}
              </el-tag>
              <el-input class="input-new-tag" ref="saveTagInput" size="small" v-if="row.inputShow"
                        v-model="row.inputValue" @blur="handleConfirm(row)">
              </el-input>
              <el-button class="button-new-tag" size="small" v-else @click="addSaleAttrValue(row)">+</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row, $index}">
              <el-button size="mini" type="danger" icon="el-icon-delete"
                         @click="spuInfo.spuSaleAttrList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdateSpuInfo">保存</el-button>
        <el-button @click="clearAndChange">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      // 图片预览
      dialogImageUrl: '',
      dialogVisible: false,
      // SPU 信息
      spuInfo: {
        category3Id: '',
        description: "",
        // "id": 0,
        spuImageList: [
          // {
          //   "id": 0,
          //   "imgName": "",
          //   "imgUrl": "",
          //   name: '',
          //   url: '',
          //   "spuId": 0
          // }
        ],
        spuName: "",
        spuSaleAttrList: [
          // {
          // "baseSaleAttrId": 0,
          // "id": 0,
          // "saleAttrName": "",
          // "spuId": 0,
          // spuSaleAttrValueList: [
          // {
          //   "baseSaleAttrId": 0,
          //   "id": 0,
          //   "isChecked": "",
          //   "saleAttrName": "",
          //   "saleAttrValueName": "",
          //   "spuId": 0
          // }
          // ]
          // }
        ],
        tmId: ''
      },
      // 所有品牌信息
      brandList: [],
      // 所有销售属性
      saleAttrList: [],
      // 添加销售属性时选择的属性 id 和 name
      selectedAttrIdAndName: ''
    }
  },
  computed: {
    VUE_APP_BASE_API() {
      return process.env.VUE_APP_BASE_API
    },
    // 过滤出当前 SPU 中不存在的销售属性
    unSelectedAttrs() {
      return this.saleAttrList.filter(item => {
        return this.spuInfo.spuSaleAttrList.every(attr => {
          return item.name !== attr.saleAttrName
        })
      })
    }
  },
  methods: {
    // 照片墙移除图片
    handleRemove(file, fileList) {
      this.spuInfo.spuImageList = fileList
    },
    // 照片墙图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上次成功时的回调
    handleSuccess(response, file, fileList) {
      this.$message.success(response.message)
      fileList.forEach(item => {
        item.imgUrl = item.url || ''
        item.imgName = item.name || ''
      })
      this.spuInfo.spuImageList = fileList
    },
    // 初始化 SPU 数据：详情、图片列表、品牌信息、平台销售属性
    async initSpuData(row) {
      // 查询 spu 详情
      let result = await this.$api.spu.reqSpuDetail(row.id)
      this.spuInfo = result.data
      // 获取 spu 图片列表
      result = await this.$api.spu.reqSpuImageList(row.id)
      let imageList = result.data
      // 为每个 image 对象追加 name 和 url 属性以支持 element 组件展示图片
      imageList.forEach(image => {
        image.name = image.imgName
        image.url = image.imgUrl
      })
      this.spuInfo.spuImageList = imageList
      // 获取所有品牌信息
      result = await this.$api.brand.reqBrandList();
      this.brandList = result.data
      // 获取所有平台销售属性
      result = await this.$api.platform.reqSaleAttrList()
      this.saleAttrList = result.data
    },
    // 添加销售属性
    addSaleAttr() {
      const attrArr = this.selectedAttrIdAndName.split(':')
      let saleAttr = {
        saleAttrName: attrArr[1],
        baseSaleAttrId: attrArr[0],
        spuSaleAttrValueList: []
      }
      this.spuInfo.spuSaleAttrList.push(saleAttr)
      // 移除已经选择添加的销售属性
      this.selectedAttrIdAndName = ''
    },
    // 添加销售属性值
    addSaleAttrValue(row) {
      // 动态添加响应式数据以支持添加属性值操作时 + 与 input 框的切换
      this.$set(row, 'inputShow', true)
      this.$set(row, 'inputValue', '')
    },
    // 添加属性值输入框确定
    handleConfirm(row) {
      let inputVal = row.inputValue
      if (inputVal.trim() === '') {
        this.$message.warning('销售属性值不能为空');
        row.inputValue = ''
        row.inputShow = false
        return;
      }
      // 没重复返回 true，重复返回 false
      let isRepeat = row.spuSaleAttrValueList.every(item => item.saleAttrValueName !== inputVal)
      if (!isRepeat) {
        this.$message.warning('销售属性值不能重复');
        return;
      }
      // 将添加的属性值加入到 saleAttrValueList
      let newAttrVal = {
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrValueName: row.inputValue
      };
      row.spuSaleAttrValueList.push(newAttrVal)
      row.inputValue = ''
      row.inputShow = false
    },
    // 保存或更新 SPU 信息
    async saveOrUpdateSpuInfo() {
      let result = await this.$api.spu.reqSaveOfUpdateSpu(this.spuInfo)
      this.$message.success(result.message)
      // 切换到销售属性列表即场景 1
      this.$emit('changeScene', 1)
    },
    /*
     * 父组件调用，不可删除
     * 获取平台所有品牌和销售属性信息
     */
    async fetchData(category3Id) {
      this.spuInfo.category3Id = category3Id
      // 获取所有品牌信息
      let result = await this.$api.brand.reqBrandList();
      this.brandList = result.data
      // 获取所有平台销售属性
      result = await this.$api.platform.reqSaleAttrList()
      this.saleAttrList = result.data
    },
    // 清除表单数据，切换场景
    clearAndChange() {
      // 切换场景
      this.$emit('changeScene', 1)
      // 清除数据：将当前组件配置对象的 data() 函数的返回值赋值给响应式数据
      Object.assign(this._data, this.$options.data())
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
