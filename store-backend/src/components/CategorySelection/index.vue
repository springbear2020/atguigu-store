<template>
  <div>
    <el-form :inline="true" :model="categoryForm">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="categoryForm.category1Id" @change="category2List" :disabled="isChecked">
          <el-option :label="c1.name" :value="c1.id" v-for="c1 in list1" :key="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="categoryForm.category2Id" @change="category3List" :disabled="isChecked">
          <el-option :label="c2.name" :value="c2.id" v-for="c2 in list2" :key="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="categoryForm.category3Id" @change="transmitCategory" :disabled="isChecked">
          <el-option :label="c3.name" :value="c3.id" v-for="c3 in list3" :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelection",
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      categoryForm: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
      }
    }
  },
  props: ['isChecked'],
  mounted() {
    this.category1List()
  },
  methods: {
    // 一级分类列表
    async category1List() {
      let result = await this.$api.platform.reqCategory1List()
      if (result.code === 200) {
        this.list1 = result.data
      }
    },
    // 一级分类下的二级分类列表
    async category2List() {
      // 重新选择一级分类，清除已存在的二级、三级分类
      this.categoryForm.category2Id = ''
      this.categoryForm.category3Id = ''
      this.$emit('transmitCategory', this.categoryForm)
      let result = await this.$api.platform.reqCategory2List(this.categoryForm.category1Id)
      if (result.code === 200) {
        this.list2 = result.data
      }
    },
    // 二级分类下的三级分类列表
    async category3List() {
      // 重新选择二级分类，清除一存在的三级分类
      this.categoryForm.category3Id = ''
      this.$emit('transmitCategory', this.categoryForm)
      let result = await this.$api.platform.reqCategory3List(this.categoryForm.category2Id)
      if (result.code === 200) {
        this.list3 = result.data
      }
    },
    // 传递分类 ID 数据
    transmitCategory() {
      this.$emit('transmitCategory', this.categoryForm)
    }
  }
}
</script>

<style scoped>

</style>
