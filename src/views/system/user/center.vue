<template>
  <div class="app-container">
    <div class="box-card">
      <el-card style="width: 40%">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        <div>
          <div style="text-align: center">
            <div style="display: flex;justify-content: center;">
              <img :src="avatar" alt="" class="avatar" />
            </div>
          </div>
          <ul class="user-info">
            <li>
              <div style="height: 100%">
                <svg-icon icon-class="login" /> 登录账号
                <div class="user-right">{{ name }}</div>
              </div>
            </li>
            <li>
              <svg-icon icon-class="user1" /> 用户昵称
              <div class="user-right">{{ nickName }}</div>
            </li>
            <li>
              <svg-icon icon-class="sex" /> 性别
              <div class="user-right">
                <!-- {{ sex }} -->
                <template>
                  <span v-if="sex == 0">女</span>
                  <span v-else-if="sex == 1">男</span>
                  <span v-else-if="sex == 2">未知</span>
                </template>
              </div>
            </li>
            <li>
              <svg-icon icon-class="phone" /> 手机号码
              <div class="user-right">{{ phonenumber }}</div>
            </li>
            <li>
              <svg-icon icon-class="email" /> 用户邮箱
              <div class="user-right">{{ email }}</div>
            </li>
            <!-- <li>
              <svg-icon icon-class="anq" /> 安全设置
              <div class="user-right">
                <a @click="$refs.pass.dialog = true">修改密码</a>
                <a @click="$refs.email.dialog = true">修改邮箱</a>
              </div>
            </li> -->
          </ul>
        </div>
      </el-card>
      <el-card style="width: 60%"></el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import user from "@/api/user";
export default {
  data() {
    return {
      // userInfo: {
      //   menuList: [],
      //   roles :[],
      //   name: "",
      // },
    };
  },
  methods: {},
  computed: {
    ...mapGetters([
      "name",
      "nickName",
      "avatar",
      "email",
      "phonenumber",
      "sex",
      "parkInfoList",
    ]),
  },
  created() {
    // this.getUserInfo();


    // 这里是一个从vux中取得parkInfoList的各个字段值的Demo代码
    // 取到的数字类型代码能够直接进行计算！！！！！！❤️❤️❤️❤️
    let sum = 0
    let list = this.parkInfoList
    let fieldList = [] // 存储需要的字段的值的List集合
    list.forEach((item) => {
      fieldList.push(item.parkRule); // fieldName为需要取出的字段的名称
    });
    sum = fieldList * 5
    // console.log(sum);

  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.box-card {
  display: flex;
  width: 100%;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.user-info {
  margin-top: 50px;
  padding-left: 0;
  list-style: none;
  li {
    border-bottom: 1px solid #f0f3f4;
    padding: 11px 0;
    font-size: 13px;
  }
  .user-right {
    float: right;
    a {
      color: #317ef3;
    }
  }
}
</style>