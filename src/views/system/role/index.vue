<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-form :inline="true" :model="searchModel" class="form-inline">
            <el-form-item label="角色名称">
              <el-input
                v-model="searchModel.roleName"
                placeholder="请输入角色名称"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="角色标识">
              <el-input
                v-model="searchModel.flag"
                placeholder="请输入角色标识"
                clearable
                size="mini"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="getRoleList"
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
      <el-table :data="roleList" stripe style="width: 100%">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center">
        </el-table-column>
        <el-table-column prop="flag" label="角色标识" align="center">
        </el-table-column>
        <el-table-column prop="status" label="角色状态" align="center">
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
          <template slot-scope="scope" >
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <el-button
              @click="openEdit(scope.row.roleId)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
            ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              @click="deleteRole(scope.row)"
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
      top="1%"
    >
      <el-form :model="roleForm" :rules="rules" ref="roleFormRef">
        <el-form-item
          prop="roleName"
          label="角色名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="roleForm.roleName"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="flag"
          label="角色标识"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="roleForm.flag"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="角色状态" :label-width="formLabelWidth">
          <el-switch
            v-model="roleForm.status"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="权限设置" prop="menuIdList" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            :props="menuProps"
            node-key="menuId"
            ref="menuRef"
            show-checkbox
            style="width: 85%"
            default-expand-all
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import roleApi from "@/api/roleManage";
import menuApi from "@/api/meunManage";
export default {
  data() {
    return {
      menuList: [],
      menuProps: {
         children: 'children',
        label: 'title'
      },
      formLabelWidth: "130px",
      roleForm: {},
      dialogFormVisible: false,
      title: "",
      total: 0,
      searchModel: {
        pageNum: 1,
        pageSize: 10,
        role: "",
        roleName: "",
        phonenumber: "",
        region: "",
        sex: "",
        flag: "",
      },
      roleList: [],
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        flag: [
          { required: true, message: "输入角色标识", trigger: "blur" },
          {
            min: 1,
            max: 16,
            message: "长度在 1 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //查询所有菜单数据
    getAllMenu() {
      menuApi.getAllMenu().then(res => {
        this.menuList = res.data;
      });
    },
    //表单重置
    resetForm() {
      this.searchModel.roleName = "";
      this.searchModel.flag = "";
      this.getRoleList();
    },
    //删除角色
    deleteRole(role) {
      this.$confirm(`您确认删除角色 ${role.roleName} ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          roleApi.deleteRoleById(role.roleId).then((res) => {
            this.$message({
              type: "success",
              message: res.message,
            });
            this.getRoleList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加角色
    saveRole() {
      //触发表单验证
      this.$refs.roleFormRef.validate((valid) => {
        if (valid) {
          let checkedKeys = this.$refs.menuRef.getCheckedKeys();
          let halfCheckedKeys = this.$refs.menuRef.getHalfCheckedKeys();
          this.roleForm.menuIdList = checkedKeys.concat(halfCheckedKeys);
          // console.log(this.roleForm.menuIdList);
          // return;
          //提交请求给后端，添加角色信息
          roleApi.saveRole(this.roleForm).then((res) => {
            //成功提示
            this.$message({
              message: res.message,
              type: "success",
            });
            //关闭对话框
            this.dialogFormVisible = false;
            //刷新表格数据
            this.getRoleList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //清理对话框表单
    clearForm() {
      this.roleForm = {};
      //清除表单验证
      this.$refs.roleFormRef.clearValidate();
      //清理权限设置
      this.$refs.menuRef.setCheckedKeys([]);
    },
    openEdit(roleId) {
      if (roleId == null) {
        this.title = "新增角色";
      } else {
        this.title = "修改角色";
        //根据roleId查询数据
        roleApi.getRoleById(roleId).then((res) => {
          this.roleForm = res.data;
          this.$refs.menuRef.setCheckedKeys(res.data.menuIdList);
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
      this.getRoleList();
    },
    handleCurrentChange(pageNum) {
      this.searchModel.pageNum = pageNum;
      this.getRoleList();
    },
    getRoleList() {
      roleApi.getRoleList(this.searchModel).then((res) => {
        this.roleList = res.data.rows;
        this.total = res.data.total;
      });
    },
  },
  //钩子函数（页面一打开，里面的方法就会执行一次）
  created() {
    this.getRoleList();
    this.getAllMenu();
  },
};
</script>

<style>
.el-dialog .el-input {
  width: 85%;
}
</style>