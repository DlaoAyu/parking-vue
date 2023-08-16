<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-form :inline="true" :model="searchModel" class="form-inline">
            <el-form-item label="停车场名称">
              <el-input
                v-model="searchModel.parkName"
                placeholder="请输入停车场名称"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="停车场地址">
              <el-input
                v-model="searchModel.parkAddress"
                placeholder="请输入停车场地址"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="getParkInfoList"
                icon="el-icon-search"
                size="mini"
                >查询</el-button
              >
            </el-form-item>
            <el-form-item v-if="name === 'root'">
              <el-button
                type="primary"
                @click="openEdit(null)"
                icon="el-icon-plus"
                size="mini"
                plain
                >新增</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="4" align="right">
          <el-form>
            <el-form-item>
              <el-button
                @click="resetForm"
                icon="el-icon-refresh"
                size="mini"
                plain
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <!-- 搜索结果 -->
    <el-card>
      <el-table :data="parkInfoList" stripe style="width: 100%">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="parkName" label="停车场名称" align="center">
        </el-table-column>
        <el-table-column prop="parkAddress" label="停车场地址" align="center">
        </el-table-column>
        <el-table-column prop="parkPic" label="停车场图片" align="center">
          <!-- <template slot-scope="scope">
               <img :src="scope.row.parkPic" min-width="70" height="70"/>
          </template> -->
          <template slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="click">
              <img :src="scope.row.parkPic" alt="" style="width: 300px;height: 300px">
              <img slot="reference" :src="scope.row.parkPic" style="width: 40px;height: 40px">
            </el-popover>
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="parkRule" label="收费标准(每小时/元)" align="center">
        </el-table-column>
        <el-table-column prop="parkAmount" label="车位数量" align="center">
        </el-table-column>
        <el-table-column prop="parkSpare" label="剩余车位数" align="center">
        </el-table-column>
        
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <el-button
              @click="openEdit(scope.row.parkId)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
            ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button v-if="name === 'root'"
              @click="deleteParkInfoById(scope.row)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
            ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <div align="right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchModel.pageNum"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="searchModel.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 角色信息编辑对话框、 -->
    <el-dialog
      @close="clearForm"
      :title="title"
      :visible.sync="dialogFormVisible"
      top="3%"
    >
      <el-form :model="parkInfoForm" :rules="rules" ref="parkInfoFormRef">
        <el-form-item
          prop="parkName"
          label="停车场名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="parkInfoForm.parkName"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="parkAddress"
          label="停车场地址"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="parkInfoForm.parkAddress"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="parkRule"
          label="收费规则"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.number="parkInfoForm.parkRule"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="parkAmount"
          label="车位数"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.number="parkInfoForm.parkAmount"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="parkSpare"
          label="剩余车位数"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.number="parkInfoForm.parkSpare"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="parkPic"
          label="停车场图片"
          :label-width="formLabelWidth"
        >
          <!-- <el-input
            v-model="parkInfoForm.parkPic"
            autocomplete="off"
            clearable
          ></el-input> -->
          <!-- <el-upload
            class="avatar-uploader"
            action="http://localhost:9999/file/upLoad"
            :show-file-list="false"
            :on-success="handleUploadSuccess">
            <img v-if="parkInfoForm.parkPic" :src="parkInfoForm.parkPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
          <el-upload
            ref="upload"
            action="http://localhost:9999/file/upLoad"
            :limit="1"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </el-form-item>

        
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveParkInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import parkInfoApi from "@/api/parkManage";
export default {
  data() {
    return {
      menuList: [],
      menuProps: {
         children: 'children',
        label: 'title'
      },
      formLabelWidth: "130px",
      parkInfoForm: {},
      dialogFormVisible: false,
      title: "",
      total: 0,
      searchModel: {
        pageNum: 1,
        pageSize: 10,
        parkInfo: "",
        parkName: "",
        parkAddress: "",
        parkRule:"",
        parkAmount: "",
        region: "",
        sex: "",
        flag: "",
      },
      parkInfoList: [],
      rules: {
        parkName: [
          { required: true, message: "请输入停车场名称", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        parkAddress: [
          { required: true, message: "输入停车地址", trigger: "blur" },
          {
            min: 1,
            max: 16,
            message: "长度在 1 到 16 个字符",
            trigger: "blur",
          },
        ],
        parkRule: [
          { required: true, message: "输入收费规则（单位：元/小时），输入的必须是整数", trigger: "blur" },
          {
            type: 'number',
            message: "必须输入整数",
            trigger: "blur",
          },
        ],
        parkAmount: [
          { required: true, message: "输入车位数量，必须输入整数", trigger: "blur" },
          {
            type: 'number',
            message: "必须输入整数",
            trigger: "blur",
          },
        ],
        parkSpare: [
          { required: true, message: "输入车位数量，必须输入整数", trigger: "blur" },
          {
            type: 'number',
            message: "必须输入整数",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //图片上传时限制大小
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //获取后端返回的图片url
    handleUploadSuccess(res){
      console.log(res)
      this.parkInfoForm.parkPic = res.data
      console.log(this.parkInfoForm.parkPic)
    },
    //表单重置
    resetForm() {
      this.searchModel.parkName = "";
      this.searchModel.parkAddress = "";
      this.getParkInfoList();
    },
    //删除停车场
    deleteParkInfoById(parkInfo) {
      this.$confirm(`您确认删除停车场 ${parkInfo.parkName} ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          parkInfoApi.deleteParkInfoById(parkInfo.parkId).then((res) => {
            this.$message({
              type: "success",
              message: res.message,
            });
            this.getParkInfoList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加停车场
    saveParkInfo() {
      //触发表单验证
      this.$refs.parkInfoFormRef.validate((valid) => {
        if (valid) {
          // let checkedKeys = this.$refs.menuRef.getCheckedKeys();
          // let halfCheckedKeys = this.$refs.menuRef.getHalfCheckedKeys();
          // this.parkInfoForm.menuIdList = checkedKeys.concat(halfCheckedKeys);
          // console.log(this.parkInfoForm.menuIdList);
          // return;
          //提交请求给后端，添加角色信息
          parkInfoApi.saveParkInfo(this.parkInfoForm).then((res) => {
            //成功提示
            this.$message({
              message: res.message,
              type: "success",
            });
            //关闭对话框
            this.dialogFormVisible = false;
            //刷新表格数据
            this.getParkInfoList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //清理对话框表单
    clearForm() {
      this.parkInfoForm = {};
      //清除表单验证
      this.$refs.parkInfoFormRef.clearValidate();
      this.$refs['upload'].clearFiles(); //清除历史文件列表
      //清理权限设置
      // this.$refs.menuRef.setCheckedKeys([]);
    },
    openEdit(parkId) {
      if (parkId == null) {
        this.title = "新增停车场信息";
      } else {
        this.title = "修改停车场信息";
        //根据parkId查询数据
        parkInfoApi.getParkInfoById(parkId).then((res) => {
          this.parkInfoForm = res.data;
          //this.$refs.menuRef.setCheckedKeys(res.data.menuIdList);
        });
      }
      this.dialogFormVisible = true;
    },
    onSubmit() {
      console.log("submit!");
    },
    // 分页重载
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getParkInfoList();
    },
    handleCurrentChange(pageNum) {
      this.searchModel.pageNum = pageNum;
      this.getParkInfoList();
    },
    getParkInfoList() {
      parkInfoApi.getParkInfoList(this.searchModel,this.name).then((res) => {
        this.parkInfoList = res.data.rows;
        this.total = res.data.total;
      });
    },
  },
  //钩子函数（页面一打开，里面的方法就会执行一次）
  created() {
    this.getParkInfoList();
    //this.getAllMenu();
  },
  computed: {
    ...mapGetters([
      "name",
    ]),
  },
};
</script>

<style>
.el-dialog .el-input {
  width: 85%;
}

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