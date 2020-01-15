<template>
  <div id="uploadImg">
    <el-upload
      v-if="type=='single'"
      class="avatar-uploader"
      action="http://dghxzsytj.app.xiaozhuschool.com/admin/gallery/upload/upload"
      :show-file-list="false"
      :before-upload="beforeuploadImg"
    >
      <img v-if="singleImg" :src="singleImg" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-upload
      v-else
      ref="uploadImg"
      action="http://dghxzsytj.app.xiaozhuschool.com/admin/gallery/upload/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeuploadImg"
      :before-remove="beforeRemove"
      :on-remove="removePicture"
      :file-list="imgList"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
  <!-- <omg @goUpload="upload" :singleImg="singleImg"></omg> -->
  <!-- <omg
    ref="uploadImg"
    @goUpload="upload2"
    @deleteImg="deleteImg"
    type="majority"
    :imgList="imgList"
  ></omg>-->
</template>
<script>
// title: "使用说明",
// content: [
//   "参数介绍",
//   "1.type——上传单图:single，上传多图:majority，不传默认单图single",
//   "2.方法this.$refs.upload.cleanUpImg()为清空图片",
//   "3.goUpload事件，上传动作，回调参数file"
// ]
export default {
  name: "uploadImg",
  props: {
    type: {
      type: String,
      default: 'single'
    },
    singleImg: {
      type: String,
      default: ''
    },
    imgList: Array,
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  watch: {
    img() {
      console.log(1)
    }
  },

  created() {
    const _this = this;
  },

  mounted() {
    const _this = this;
  },
  methods: {
    // 图片放大功能
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 重写图片上传事件
    beforeuploadImg(file) {
      const _this = this;
      _this.$emit("goUpload", file);
      //创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL;
    },
    // 删除前动作
    beforeRemove() {
      return this.$confirm(`确定移除该图片？`);
    },
    // 删除单个图片
    removePicture() {
      const _this = this;
      _this.$message({
        message: "删除成功",
        type: "success"
      });
      _this.$emit("deleteImg");
    },
    // 清空图片
    cleanUpImg() {
      this.$refs.uploadImg.clearFiles();
    }
  }
};
</script>
<style lang='less' scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  background-color: #fbfdff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar-uploader:hover {
  border-color: #409eff;
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
