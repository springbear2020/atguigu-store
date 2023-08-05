<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelection @transmitCategory="transmitCategory" :isChecked="!isTableShow"></CategorySelection>
    </el-card>
    <el-card>
      <!-- 平台属性列表数据展示 -->
      <div v-show="isTableShow">
        <!-- 添加 -->
        <el-button type="primary" @click="handleAdd" icon="el-icon-plus" style="margin-bottom: 20px"
                   :disabled="!category3Id">添加属性
        </el-button>

        <!-- 数据列表 -->
        <el-table border :data="platformAttrs">
          <el-table-column label="#" type="index" align="center"></el-table-column>
          <el-table-column label="名称" prop="attrName" align="center"></el-table-column>
          <el-table-column label="属性值" align="center">
            <template scope="{row, $index}">
              <el-tag v-for="attr in row.attrValueList" :key="attr.id" style="margin: 5px">{{ attr.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加/编辑属性 -->
      <div v-show="!isTableShow">
        <el-form :inline="true" :model="attrInfo">
          <!-- 添加属性名称 -->
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
          <el-button type="primary" icon="el-icon-plus" :disabled="!attrInfo.attrName" @click="addAttrValue">属性值
          </el-button>
          <el-button @click="isTableShow = true">取 消</el-button>

          <!-- 属性值列表 -->
          <el-table border :data="attrInfo.attrValueList" style="margin: 20px 0">
            <el-table-column label="#" type="index" align="center"></el-table-column>
            <el-table-column label="属性值" prop="attrName" align="center">
              <template scope="{row, $index}">
                <!-- 当输入框失焦或用户敲击回车时确定属性值 -->
                <el-input size="mini" placeholder="请输入属性值名称"
                          v-model="row.valueName" v-show="row.isEditingMode"
                          @blur="confirmAttrValue(row)" @keyup.native.enter="confirmAttrValue(row)"
                          :ref="$index">
                </el-input>
                <span v-show="!row.isEditingMode" @click="editing(row, $index)"> {{ row.valueName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="{row, $index}">
                <el-popconfirm :title="`确定要删除【${row.valueName}】属性值吗？`" @onConfirm="deleteAttrValue($index)">
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    slot="reference">
                  </el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <!-- 按钮 -->
          <el-button type="primary" icon="el-icon-check" :disabled="!attrInfo.attrValueList.length > 0"
                     @click="saveAttrInfo">保 存
          </el-button>
          <el-button @click="isTableShow = true">取 消</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: "Platform",
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      platformAttrs: [],
      isTableShow: true,
      attrInfo: {
        attrName: '',
        attrValueList: [],  // {attrId, valueName}
        categoryId: '',     // 三级分类 ID
        categoryLevel: 3    // 三级分类
      }
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
        this.attrList()
      } else {
        // 分类选择发生变化，清除原有数据
        this.platformAttrs = []
      }
    },
    // 获取平台属性列表
    async attrList() {
      let result = await this.$api.platform.reqPlatformAttrList(this.category1Id, this.category2Id, this.category3Id);
      if (result.code === 200) {
        this.platformAttrs = result.data
      }
    },
    // 添加属性，切换到属性添加/编辑页面
    handleAdd() {
      this.isTableShow = false
      // 重置数据
      this.attrInfo = {
        attrName: '',
        attrValueList: [],                // {attrId, valueName}
        categoryId: this.category3Id,     // 三级分类 ID
        categoryLevel: 3                  // 三级分类
      }
    },
    // 删除属性
    handleDelete(row) {
      this.$confirm(`确认删除《${row.attrName}》这个平台属性吗？`, '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await this.$api.platform.reqDeleteAttr(row.id)
        this.$message.success(result.message)
        this.attrList()
      }).catch(() => {
        this.$message.info('取消删除！');
      });
    },
    // 编辑属性
    handleEdit(row) {
      this.isTableShow = false
      // 使用 loadDash 进行对象的深拷贝，避免 row 与 this.attrInfo 指向同一个对象
      this.attrInfo = cloneDeep(row)
      // 给每个对象追加编辑与查看模式标记
      this.attrInfo.attrValueList.forEach(item => {
        // Vue 无法探测普通的新增属性，故使用 vm.$set
        this.$set(item, 'isEditingMode', false)
      })
    },
    // 添加属性值
    addAttrValue() {
      if (this.attrInfo.attrName.trim() === '') {
        this.$message.warning('请输入有效的属性名称！');
        return;
      }
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        // 编辑模式与查看模式
        isEditingMode: true
      });
      // 编辑列表最后一个 input 自动聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    // 确认属性值
    confirmAttrValue(row) {
      // 属性值不能为空串
      if (row.valueName.trim() === '') {
        this.$message.warning('请输入有效的属性值！');
        return;
      }
      // 不能添加重复的属性值
      let isRepeat = this.attrInfo.attrValueList.some(item => {
        if (item !== row) {
          return item.valueName === row.valueName
        }
      })
      if (isRepeat) {
        this.$message.warning('不能添加重复的属性值！');
        return;
      }
      row.isEditingMode = false;
    },
    // 删除属性值
    deleteAttrValue(index) {
      // 从数组中移除指定下标的元素
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 点击 span，切换为编辑模式
    editing(row, index) {
      row.isEditingMode = true;
      // input 框自动聚焦
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 保存平台售卖属性信息
    async saveAttrInfo() {
      // 整理参数：去除 attrInfo.attrValueList 中的空值和去除 isEditingMode 对象字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.valueName !== '') {
          delete item.isEditingMode
          return true
        }
      })
      let result = await this.$api.platform.reqSaveOrUpdateAttr(this.attrInfo);
      if (result.code === 200) {
        this.$message.success(result.message)
        this.attrList()
        this.isTableShow = true
      } else {
        this.$message.error(result.data)
      }
    }
  }
}
</script>

<style scoped>

</style>
