<template>
  <div class="app-container" @touchmove.prevent>
    <el-card type="flex" justify="center" align="middle">
      <h1>欢迎使用智慧车位管理系统</h1>
    </el-card>
    <!--块类统计-->
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="8">
        <el-card class="box-card">
          <h3>总车位数</h3>
          <div>
            <i class="el-icon-s-shop" style="color: purple"></i>
            <span>{{parkAmount}}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <h3>剩余车位数</h3>
          <div>
            <i class="el-icon-s-shop" style="color: green"></i>
            <span>{{parkSpare}}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <h3>收入总额</h3>
          <div>
            <i class="el-icon-s-flag" style="color: red"></i>
            <span>{{totalIncome}}元</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import parkOrderApi from "@/api/parkOrder";
import parkInfoApi from "@/api/parkManage";
export default {
  //name: "Dashboard",
  data() {
    return {
      parkAmount:"",//总车位
      parkSpare:"",//剩余车位
      totalIncome:"",//总收入
    }
  },
  methods: {
    //计算总收入
    getTotalIncome() {
      parkOrderApi.getTotalIncome(this.name).then((res) => {
        this.totalIncome = res.data;
        //console.log(this.totalIncome)
      });
    },
    //查询所有停车位和剩余车位
    getParkSpace() {
      parkInfoApi.getParkSpace(this.name).then((res) => {
        this.parkAmount = res.data.parkAmount;
        this.parkSpare = res.data.parkSpare;
        //console.log(this.totalIncome)
      });
    },
  },
  computed: {
    ...mapGetters([
      "name",
      "parkInfoList",
    ]),
  },
  created() {
    this.getTotalIncome();
    this.getParkSpace()
    // console.log(this.totalIncome)
    // //let sum = 0
    // let list = this.parkInfoList
    // let parkAmountList = [] // 存储需要的字段的值的List集合
    // let parkSpareList = [] // 存储需要的字段的值的List集合
    // list.forEach((item) => {
    //   parkAmountList.push(item.parkAmount); // fieldName为需要取出的字段的名称
    // });
    // let parkAmount = parkAmountList.join(',');
    // list.forEach((item) => {
    //   parkSpareList.push(item.parkSpare); // fieldName为需要取出的字段的名称
    // });
    // let parkSpare = parkSpareList.join(',');

    // this.parkAmount = parkAmount//总车位数赋值
    // this.parkSpare = parkSpare//剩余车位数赋值

    //console.log("总车位："+parkAmount);
    //console.log("剩余车位："+parkSpare);

  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
