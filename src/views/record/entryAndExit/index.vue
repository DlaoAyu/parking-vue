<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-form :inline="true" :model="searchModel" class="form-inline">
            <el-form-item label="车牌颜色">
              <el-select
                v-model="searchModel.plateColor"
                filterable
                placeholder="请选择车牌颜色"
                size="mini"
                clearable
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否是固定车">
              <!-- <el-input
                v-model="searchModel.type"
                placeholder="请选择是否为固定车"
                clearable
                size="mini"
              ></el-input> -->
              <el-select
                v-model="searchModel.type"
                filterable
                placeholder="请选择是否为固定车"
                size="mini"
                clearable
              >
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="进出方向">
              <!-- <el-input
                v-model="searchModel.direction"
                placeholder="请选择进出方向"
                clearable
                size="mini"
              ></el-input> -->
              <el-select
                v-model="searchModel.direction"
                filterable
                placeholder="请选择进出方向"
                size="mini"
                clearable
              >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="getCarScanList"
                icon="el-icon-search"
                size="mini"
                >查询</el-button
              >
            </el-form-item>
            <!-- <el-form-item>
              <el-button
                type="primary"
                @click="openEdit(null)"
                icon="el-icon-plus"
                size="mini"
                plain
                >新增</el-button
              >
            </el-form-item> -->
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
      <el-table :data="carScanList" stripe style="width: 100%">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="picture" label="图片" align="center">
          <template slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="click">
              <img
                :src="scope.row.picture"
                alt=""
                style="width: 300px; height: 300px"
              />
              <img
                slot="reference"
                :src="scope.row.picture"
                style="width: 40px; height: 40px"
              />
            </el-popover>
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="plateColor" label="车牌颜色" align="center">
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              size="small"
              v-if="scope.row.plateColor == 'blue'"
              >蓝色</el-tag
            >
            <el-tag
              effect="dark"
              type="warning"
              size="small"
              v-else-if="scope.row.plateColor == 'yellow'"
              >黄色</el-tag
            >
            <el-tag
              effect="dark"
              type="success"
              size="small"
              v-else-if="scope.row.plateColor == 'green'"
              >绿色</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="plateNum" label="车牌号" align="center">
        </el-table-column>
        <el-table-column prop="type" label="是否为固定车" align="center">
          <!-- 状态转换，0为否，1为是 -->
          <template slot-scope="scope">
            <el-tag type="danger" size="mini" v-if="scope.row.type == 0"
              >否</el-tag
            >
            <el-tag type="success" size="mini" v-else-if="scope.row.type == 1"
              >是</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="扫描时间" align="center">
        </el-table-column>
        <el-table-column prop="direction" label="进出方向" align="center">
          <!-- 状态转换，0为驶入，1为驶出 -->
          <template slot-scope="scope">
            <el-tag type="warning" size="mini" v-if="scope.row.direction == 0"
              >驶入</el-tag
            >
            <el-tag
              type="success"
              size="mini"
              v-else-if="scope.row.direction == 1"
              >驶出</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                @click="deleteRecord(scope.row)"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import carScanApi from "@/api/carScan";
export default {
  data() {
    return {
      options: [
        {
          value: "blue",
          label: "蓝色",
        },
        {
          value: "yellow",
          label: "黄色",
        },
        {
          value: "green",
          label: "绿色",
        },
      ],
      options1: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],
      options2: [
        {
          value: "0",
          label: "驶入",
        },
        {
          value: "1",
          label: "驶出",
        },
      ],
      formLabelWidth: "130px",
      roleForm: {},
      dialogFormVisible: false,
      title: "",
      total: 0,
      searchModel: {
        pageNum: 1,
        pageSize: 10,
        plateColor: "",
        type: "",
        direction: "",
      },
      carScanList: [],
    };
  },
  methods: {
    //删除进出记录
    deleteRecord(carScan) {
      this.$confirm(
        `您确认删除车牌号为： ${carScan.plateNum} 的这条记录?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          carScanApi.deleteCarScanById(carScan.id).then((res) => {
            this.$message({
              type: "success",
              message: res.message,
            });
            this.getCarScanList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //表单重置
    resetForm() {
      this.searchModel.plateColor = "";
      this.searchModel.type = "";
      this.searchModel.direction = "";
      this.getCarScanList();
    },
    onSubmit() {
      console.log("submit!");
    },
    // 分页重载
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getCarScanList();
    },
    handleCurrentChange(pageNum) {
      this.searchModel.pageNum = pageNum;
      this.getCarScanList();
    },
    getCarScanList() {
      carScanApi.getCarScanList(this.searchModel, this.name).then((res) => {
        this.carScanList = res.data.rows;
        this.total = res.data.total;
      });
    },
  },
  //钩子函数（页面一打开，里面的方法就会执行一次）
  created() {
    this.getCarScanList();
  },
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style>
.el-dialog .el-input {
  width: 85%;
}
</style>