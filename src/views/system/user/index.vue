<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-form :inline="true" :model="searchModel" class="form-inline">
            <el-form-item label="用户名">
              <el-input
                v-model="searchModel.userName"
                placeholder="用户名"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话号">
              <el-input
                v-model="searchModel.phonenumber"
                placeholder="电话号"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select
                v-model="searchModel.sex"
                placeholder="性别"
                clearable
                size="mini"
              >
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="getUserList"
                icon="el-icon-search"
                size="mini"
                >查询</el-button
              >
            </el-form-item>
            <el-form-item>
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
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" align="center">
        </el-table-column>
        <el-table-column prop="phonenumber" label="电话号码" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
          <!-- 性别转换，1为男，0为女 2为未知 -->
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 0">女</span>
            <span v-else-if="scope.row.sex == 1">男</span>
            <span v-else-if="scope.row.sex == 2">未知</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="用户状态" align="center">
          <!-- 状态转换，0为停用，1为正常 -->
          <template slot-scope="scope">
            <el-tag type="danger" size="mini" v-if="scope.row.status == 0"
              >停用</el-tag
            >
            <el-tag type="success" size="mini" v-else-if="scope.row.status == 1"
              >正常</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope" ><!--v-if="scope.row.userId !== 1"-->
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <el-button
              @click="openEdit(scope.row.userId)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
            ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              @click="deleteUser(scope.row)"
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
    <!-- 用户信息编辑对话框、 -->
    <el-dialog
      @close="clearForm"
      :title="title"
      :visible.sync="dialogFormVisible"
      top="0.5%"
    >
      <el-form :model="userForm" :rules="rules" ref="userFormRef">
        <el-form-item
          prop="userName"
          label="用户名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="userForm.userName"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="nickName"
          label="昵称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="userForm.nickName"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="userForm.userId == null || userForm.userId == undefined"
          prop="password"
          label="登录密码"
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="userForm.password"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="phonenumber"
          label="电话号码"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="userForm.phonenumber"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="userForm.sex" placeholder="性别" clearable>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户角色" :label-width="formLabelWidth">
          <el-checkbox-group
            v-model="userForm.roleIdList"
            :max="2"
            style="width: 85%"
          >
            <el-checkbox
              v-for="role in roleList"
              :label="role.roleId"
              :key="role.roleId"
              >{{ role.flag }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="所管辖停车场" :label-width="formLabelWidth">
          <el-checkbox-group
            v-model="userForm.parkIdList"
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
        <el-form-item label="用户状态" :label-width="formLabelWidth">
          <el-switch
            v-model="userForm.status"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import userApi from "@/api/userManage";
import roleApi from "@/api/roleManage";
import parkInfoApi from "@/api/parkManage";
export default {
  data() {
    //邮箱表单验证
    var checkEmail = (rule, value, callback) => {
      var reg =
        /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
      if (!reg.test(value)) {
        return callback(new Error("邮箱格式错误"));
      }
      callback();
    };
    return {
      parkInfoList: [],
      roleList: [],
      formLabelWidth: "130px",
      userForm: {
        roleIdList: [],
        parkIdList: []
      },
      dialogFormVisible: false,
      title: "",
      total: 0,
      searchModel: {
        pageNum: 1,
        pageSize: 10,
        user: "",
        userName: "",
        phonenumber: "",
        region: "",
        sex: "",
      },
      userList: [],
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请设置初始密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
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
    getAllRoleList() {
      roleApi.getAllRoleList().then((res) => {
        this.roleList = res.data;
        //console.log(this.roleList);
      });
    },
    //表单重置
    resetForm() {
      this.searchModel.userName = "";
      this.searchModel.phonenumber = "";
      this.searchModel.sex = "";
      this.getUserList();
    },
    //删除用户
    deleteUser(user) {
      this.$confirm(`您确认删除用户 ${user.userName} ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          userApi.deleteUserById(user.userId).then((res) => {
            this.$message({
              type: "success",
              message: res.message,
            });
            this.getUserList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加用户
    saveUser() {
      //触发表单验证
      this.$refs.userFormRef.validate((valid) => {
        if (valid) {
          //提交请求给后端，添加用户信息
          userApi.saveUser(this.userForm).then((res) => {
            //成功提示
            this.$message({
              message: res.message,
              type: "success",
            });
            //关闭对话框
            this.dialogFormVisible = false;
            //刷新表格数据
            this.getUserList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //清理对话框表单
    clearForm() {
      this.userForm = {
        roleIdList: [],
        parkIdList: []
      };
      //清除表单验证
      this.$refs.userFormRef.clearValidate();
    },
    openEdit(userId) {
      if (userId == null) {
        this.title = "新增用户";
      } else {
        this.title = "修改用户";
        //根据userId查询数据
        userApi.getUserById(userId).then((res) => {
          this.userForm = res.data;
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
      this.getUserList();
    },
    handleCurrentChange(pageNum) {
      this.searchModel.pageNum = pageNum;
      this.getUserList();
    },
    getUserList() {
      userApi.getUserList(this.searchModel).then((res) => {
        this.userList = res.data.rows;
        this.total = res.data.total;
      });
    },
  },
  created() {
    this.getUserList();
    this.getAllRoleList();
    this.getAllParkInfoList();
  },
};
</script>

<style>
.el-dialog .el-input {
  width: 85%;
}
</style>