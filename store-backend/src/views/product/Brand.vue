<template>
  <div>
    <!-- 添加 -->
    <el-button type="primary" @click="handleAdd" icon="el-icon-plus" style="margin-bottom: 20px">添加</el-button>

    <!-- 数据列表 -->
    <el-table border :data="dataList">
      <el-table-column label="#" type="index" align="center"></el-table-column>
      <el-table-column label="名称" prop="tmName" align="center"></el-table-column>
      <el-table-column label="图标" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.logoUrl"
            fit="fill"></el-image>
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
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
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

    <!-- 添加/编辑对话框 -->
    <el-dialog :title="brandForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" :model="brandForm" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="brandForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌图标" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            :action="VUE_APP_BASE_API+'/admin/product/fileUpload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="brandForm.logoUrl" :src="brandForm.logoUrl" class="avatar" alt="image file upload">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传 jpg/png 文件，且不超过 2MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateBrand">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Brand",
  data() {
    return {
      current: 1,
      size: 20,
      total: 0,
      dataList: [],
      dialogFormVisible: false,
      brandForm: {
        id: undefined,
        tmName: '',
        logoUrl: ''
      },
      // 表单校验规则
      rules: {
        tmName: [
          {required: true, message: '请输入品牌名称', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'change'}
        ],
        logoUrl: [
          {required: true, message: '请选择品牌 LOGO 图片', trigger: 'change'}
        ],
      }
    }
  },
  mounted() {
    this.getPageData()
  },
  computed: {
    VUE_APP_BASE_API() {
      return process.env.VUE_APP_BASE_API
    }
  },
  methods: {
    // 获取品牌分页数据
    async getPageData() {
      const {current, size} = this
      let result = await this.$api.brand.reqBrandPageData(current, size)
      this.total = result.data.total
      this.size = result.data.size
      this.current = result.data.current
      this.dataList = result.data.records
    },
    // 改变每页显示数量
    handleSizeChange(size) {
      this.size = size
      this.getPageData()
    },
    // 切换页码
    handleCurrentChange(current) {
      this.current = current
      this.getPageData()
    },
    // 添加品牌
    handleAdd() {
      // 重置表单并展示对话框
      this.brandForm = {
        id: undefined,
        tmName: '',
        logoUrl: ''
      }
      this.dialogFormVisible = true
    },
    // 编辑品牌
    handleEdit(row) {
      // 浅拷贝：解决编辑未提交时 dataList 已修改
      this.brandForm = {...row}
      this.dialogFormVisible = true
    },
    // 删除品牌
    handleDelete(index, row) {
      this.$confirm(`确认删除《${row.tmName}》这个品牌信息吗？`, '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await this.$api.brand.reqDeleteBrand(row.id)
        if (result.code) {
          this.$message.success('删除成功！')
          // 解决最后一页输出删除后查询无果的 bug
          this.current = this.dataList.length > 1 ? this.current : this.current - 1
          this.getPageData()
        }
      }).catch(() => {
        this.$message.info('取消删除！');
      });
    },
    // 图片上传成功
    handleAvatarSuccess(res) {
      this.brandForm.logoUrl = res.data
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传前验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isPNG || isJPG)) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return (isPNG || isJPG) && isLt2M;
    },
    // 添加或更新品牌信息
    addOrUpdateBrand() {
      // 表单项逐个验证
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let result = await this.$api.brand.reqAddOrUpdateBrand(this.brandForm);
          if (result.code) {
            this.$message.success(result.message)
            this.dialogFormVisible = false
            this.getPageData()
          }
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
