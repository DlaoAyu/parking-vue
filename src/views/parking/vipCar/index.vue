<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-form :inline="true" :model="searchModel" class="form-inline">
            <el-form-item label="车主姓名">
              <el-input
                v-model="searchModel.belongName"
                placeholder="请输入车主姓名"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="车牌颜色">
              <el-input
                v-model="searchModel.plateColor"
                placeholder="请输入车牌颜色"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="车牌号码">
              <el-input
                v-model="searchModel.plateNum"
                placeholder="请输入车牌号码"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="getCarInfoList"
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
      <el-table :data="carInfoList" stripe style="width: 100%">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="belongName" label="车主姓名" align="center">
        </el-table-column>
        <el-table-column prop="belongNum" label="车主联系方式" align="center">
        </el-table-column>
        <el-table-column prop="plateColor" label="车牌颜色" align="center">
        </el-table-column>
        <el-table-column prop="plateNum" label="车牌号码" align="center">
        </el-table-column>
        <el-table-column prop="beginTime" label="开始日期" align="center">
        </el-table-column>
        <el-table-column prop="endTime" label="到期日期" align="center">
        </el-table-column>
        <el-table-column prop="parkName" label="所属停车场" align="center">
        </el-table-column>

        <el-table-column label="操作" align="center"  >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <el-button
              @click="openEdit(scope.row.carId)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
            ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <el-button
              @click="deleteCarInfo(scope.row)"
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
    <!-- 固定车信息编辑对话框、 -->
    <el-dialog
      @close="clearForm"
      :title="title"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="carInfoForm" :rules="rules" ref="carInfoFormRef">
        <el-form-item
          prop="belongName"
          label="车主姓名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="carInfoForm.belongName"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="belongNum"
          label="车主电话"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="carInfoForm.belongNum"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="plateColor"
          label="车牌颜色"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="carInfoForm.plateColor"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="plateNum"
          label="车牌号码"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="carInfoForm.plateNum"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="beginTime"
          label="开始日期"
          :label-width="formLabelWidth"
        >
          <!-- <el-input
            v-model="carInfoForm.beginTime"
            autocomplete="off"
            clearable
          ></el-input> -->
          <el-date-picker
            v-model="carInfoForm.beginTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="请选择开始日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item
          prop="endTime"
          label="到期日期"
          :label-width="formLabelWidth"
        >
          <!-- <el-input
            v-model="carInfoForm.endTime"
            autocomplete="off"
            clearable
          ></el-input> -->
          <el-date-picker
            v-model="carInfoForm.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="请选择到期日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="所属停车场" :label-width="formLabelWidth" v-if="name === 'root'">
          <el-checkbox-group
            v-model="carInfoForm.parkIdList"
            :max="1"
            style="width: 85%"
          >
            <el-checkbox
              v-for="parkInfo in parkInfoList"
              :label="parkInfo.parkId"
              :key="parkInfo.parkId"
              >{{ parkInfo.parkName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCarInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import carInfoApi from "@/api/carManage";
import parkInfoApi from "@/api/parkManage";
export default {
  data() {
    //时间表单验证
    var checkDate = (rule, value, callback) => {
      var reg =
        /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
      if (!reg.test(value)) {
        return callback(new Error("时间格式不正确,正确格式为:2023-01-01 00:00:00"));
      }
      callback();
    };
    return {
      parkInfoList: [],
      formLabelWidth: "130px",
      carInfoForm: {
        parkIdList: []
      },
      dialogFormVisible: false,
      title: "",
      total: 0,
      searchModel: {
        pageNum: 1,
        pageSize: 10,
        carInfo: "",
        belongName: "",
        plateColor: "",
        plateNum: "",
        sex: "",
        flag: "",
      },
      carInfoList: [],
      rules: {
        belongName: [
          { required: true, message: "请输入车主姓名", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        belongNum: [
          { required: true, message: "请输入车主联系电话", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入11位电话号码",
            trigger: "blur",
          },
        ],
        plateColor: [
          { required: true, message: "请输入车牌颜色", trigger: "blur" },
          {
            min: 1,
            max: 5,
            message: "长度在 1 到 5 个字符",
            trigger: "blur",
          },
        ],
        plateNum: [
          { required: true, message: "请输入车牌号码", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        beginTime: [
          { required: true, message: "请输入开始时间", trigger: "blur" },
          { validator: checkDate, trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请输入到期时间", trigger: "blur" },
          { validator: checkDate, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //获取所有停车场信息
    getAllParkInfoList() {
      parkInfoApi.getAllParkInfoList().then((res) => {
        this.parkInfoList = res.data;
        //console.log(this.parkInfoList);
      })
    },
    //表单重置
    resetForm() {
      this.searchModel.belongName = "";
      this.searchModel.plateColor = "";
      this.searchModel.plateNum = "";
      this.getCarInfoList();
    },
    //删除固定车
    deleteCarInfo(carInfo) {
      this.$confirm(`您确认删除车牌号为： ${carInfo.plateNum}  的固定车信息 ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          carInfoApi.deleteCarInfoById(carInfo.carId).then((res) => {
            this.$message({
              type: "success",
              message: res.message,
            });
            this.getCarInfoList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加固定车信息
    saveCarInfo() {
      //触发表单验证
      this.$refs.carInfoFormRef.validate((valid) => {
        if (valid) {
          //提交请求给后端，添加用户信息
          carInfoApi.saveCarInfo(this.carInfoForm).then((res) => {
            //成功提示
            this.$message({
              message: res.message,
              type: "success",
            });
            //关闭对话框
            this.dialogFormVisible = false;
            //刷新表格数据
            this.getCarInfoList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //清理对话框表单
    clearForm() {
      this.carInfoForm = {
        parkIdList: []
      };
      //清除表单验证
      this.$refs.carInfoFormRef.clearValidate();
      //清理权限设置
      //this.$refs.menuRef.setCheckedKeys([]);
    },
    openEdit(carId) {
      if (carId == null) {
        this.title = "新增固定信息";
      } else {
        this.title = "修改固定车信息";
        //根据carId查询数据
        carInfoApi.getCarInfoById(carId).then((res) => {
          this.carInfoForm = res.data;
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
      this.getCarInfoList();
    },
    handleCurrentChange(pageNum) {
      this.searchModel.pageNum = pageNum;
      this.getCarInfoList();
    },
    //查询VIP车List
    getCarInfoList() {
      carInfoApi.getCarInfoList(this.searchModel,this.name).then((res) => {
        this.carInfoList = res.data.rows;
        this.total = res.data.total;
      });
    },
  },
  //钩子函数（页面一打开，里面的方法就会执行一次）
  created() {
    this.getCarInfoList();
    this.getAllParkInfoList();
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
</style>