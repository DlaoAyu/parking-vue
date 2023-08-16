<template>
  <div class="app-container">
    <el-upload
      class="upload-demo"
      action="/api/upload"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :data="{ title: form.title, description: form.description }"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitForm">提交</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: '',
        description: ''
      },
      uploadUrl: '/api/upload'
    };
  },
  methods: {
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt500k = file.size / 1024 < 500;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt500k) {
        this.$message.error('上传图片大小不能超过 500KB!');
      }
      return isJPG && isLt500k;
    },
    handleSuccess(response, file) {
      console.log(response);
      console.log(file);
      if (response.code === 200) {
        this.$message.success('上传成功');
      } else {
        this.$message.error(response.message);
      }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$refs.upload.submit();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>