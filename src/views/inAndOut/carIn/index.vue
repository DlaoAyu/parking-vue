<template>
  <div class="app-container">
    <div class="scan">
      <!-- 图片上传区 -->
      <el-card style="width: 65%">
        <div class="scanBox">
          <!-- <el-button type="success" plain round icon="el-icon-upload"
            >入场图片 上传识别</el-button
          > -->
          <!-- <el-image style="margin-top: 20px; width: 100%; height: 450px;" :src="url" :preview-src-list="srcList"/> -->
          <div class="uploadPic">
            <el-upload
              class="scan-uploader"
              action="http://localhost:9999/carScan/carScan"
              :show-file-list="false"
              :on-success="handleScanSuccess"
              :on-remove="handleRemove"
              :before-upload="beforeScanUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="scan" />
              <i v-else class="el-icon-upload scan-uploader-icon"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
          </div>
        </div>
      </el-card>
      <!-- 识别结果表单 -->
      <el-card style="width: 35%">
        <div class="scanFormBox">
          <h2 style="padding-bottom: 40px;">入场车辆扫描结果</h2>
          <el-form
            :model="scanForm"
            :rules="rules"
            ref="scanFormRef"
            label-width="100px"
          >
            <el-form-item label="车牌颜色" prop="plateColor">
              <el-input v-model="scanForm.plateColor" clearable placeholder="车牌颜色"></el-input>
            </el-form-item>
            <el-form-item label="车牌号" prop="plateNum">
              <el-input v-model="scanForm.plateNum" clearable placeholder="车牌号"></el-input>
            </el-form-item>
            <el-form-item label="入场时间" prop="createTime">
              <!-- <el-input v-model="scanForm.entryTime"></el-input> -->
              <el-date-picker
                v-model="scanForm.createTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择入场时间">
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="选择停车场" prop="parkId" v-show= "parkId = ''">
              <el-input v-model="scanForm.parkId" clearable placeholder="选择停车场"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="picture" v-show= "picture = ''">
              <el-input v-model="scanForm.picture" clearable placeholder="图片"></el-input>
            </el-form-item>
            <el-form-item label="方向" prop="direction" v-show= "direction = ''">
              <el-input v-model="scanForm.direction" clearable placeholder="图片"></el-input>
            </el-form-item> -->
            <el-form-item>
              <div class="formButton">
                <el-button type="primary" size="small" round @click="addEntryCar"
                  >确认入场</el-button
                >
                <el-button size="small" round icon="el-icon-refresh" @click="resetForm"
                  >重置</el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

import scanApi from "@/api/scanAndOrder";
import { mapGetters } from "vuex";
export default {
  data() {
    //时间表单验证
    var checkDate = (rule, value, callback) => {
      var reg =
        /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
      if (!reg.test(value)) {
        return callback(
          new Error("时间格式不正确,正确格式为:2023-01-01 00:00:00")
        );
      }
      callback();
    };
    return {
      scanForm :{
        plateColor: "",
        plateNum: "",
        createTime: "",
        parkName: "",
        parkId: "",
        picture: "",
        direction: "",
        entryTime: "",
      },//识别结果表单
      imageUrl: "",
      //表单校验规则
      rules: {
        plateColor: [
          { required: true, message: "请填写正确的车牌颜色", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        plateNum: [
          { required: true, message: "请填写车牌号", trigger: "blur" },
          {
            min: 1,
            max: 8,
            message: "长度在 1 到 8 个字符",
            trigger: "blur",
          },
        ],
        createTime: [
          { required: true, message: "请填写正确的入场时间", trigger: "blur" },
          { validator: checkDate, trigger: "blur" },
        ],
        parkName: [
          { required: true, message: "请选择停车场", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 新增扫描记录
    addEntryCar(){
      this.$refs.scanFormRef.validate((valid) =>{
        if (valid) {
          scanApi.addEntryCar(this.scanForm).then((res) => {
            //成功提示
            this.$message({
              message: res.message,
              type: "success",
            });
          })
        }else {
          console.log("error submit!!");
          return false;
        }
      })
    },
    resetForm() {
      this.scanForm.plateColor = "";
      this.scanForm.plateNum = "";
      this.scanForm.createTime = "";
      this.scanForm.parkName = "";
      //清除表单验证
      this.$refs.scanFormRef.clearValidate();
      //清除图片
      this.imageUrl = "";
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleScanSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.scanForm.createTime = res.data.scanTime
      this.scanForm.entryTime = res.data.scanTime
      this.scanForm.plateColor = res.data.plate.color
      this.scanForm.plateNum = res.data.plate.number
      this.scanForm.picture = res.data.imagePath
      console.log(res);
    },
    beforeScanUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  computed: {
    ...mapGetters([
      "parkInfoList",
    ]),
  },
  created() {
    // this.getUserInfo();
    // 这里是一个从vux中取得parkInfoList的各个字段值的Demo代码
    // 取到的数字类型代码能够直接进行计算！！！！！！❤️❤️❤️❤️
    //let sum = 0
    let list = this.parkInfoList
    let parkIdList = [] // 存储需要的字段的值的List集合
    list.forEach((item) => {
      parkIdList.push(item.parkId); // fieldName为需要取出的字段的名称
    });
    //sum = fieldList * 5
    let parkId = parkIdList.join(',');
    this.scanForm.parkId = parkId //为停车场Id赋值
    //this.scanForm.direction = 0
    //console.log(this.scanForm.parkId);

  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
// .scan {
//   width: 100%;
//   height: 550px;
//   display: flex;
//   flex-direction: row;
//   background-size: 100%;
  
// }
// .scanBox {
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
// }
.scanFormBox {
  margin-right: 5%;
  margin-top: 10%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.formButton {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.uploadPic {
  width: 100%;
  height: 510px;
}
.scan-uploader .el-upload {
  width: 100%;
  height: 520px;
  border: 5px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.scan-uploader .el-upload:hover {
  border-color: #409eff;
}
.scan-uploader-icon {
  font-size: 80px;
  color: #8c939d;
  margin-top: 20%;
  text-align: center;
}
</style>