<!-- topBar -->
<template>
  <div id="topBar">
    <div class="logo box">
      <img src="../../assets/404_images/404.png" alt="">
      <div>平台管理系统</div>
    </div>
    <div class="right-menu box font12">
      <div class="avatar-wrapper box cfff">
        <div class="user box pd-lr-10">
          <img src="../../assets/user.png" style="width:30px">
          <div>{{name}}</div>
        </div>
        <div class="line"></div>
        <div class="message box pd-lr-10">
          <el-dropdown class="avatar-container cfff font12">
            <el-badge :value="12" class="item">
              <i class="el-icon-message-solid"></i>
            </el-badge>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <div class="messageBox"></div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="line"></div>
        <div class="close box pd-lr-10" @click="logout">
          <img src="../../assets/close.png" style="width:20px;display:block">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'topBar',
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
    ])
  },
  created() {
    const _this = this
  },
  methods: {
    logout() {
      this.$confirm('您将退出系统……', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/logout')
        this.$message({
          type: 'success',
          message: '登出成功!'
        });
        setTimeout(() => {
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }, 1500);
      });
    }
  }
};
</script>
<style scoped lang='less'>
#topBar {
  position: fixed;
  width: 100%;
  height: 50px;
  background: #464c5b;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  z-index: 9;
  .logo {
    margin: 10px 0 10px 10px;
    font-size: 0.2rem;
    img {
      width: 40px;
      margin-right: 0.2rem;
    }
  }
  .right-menu {
    .line {
      width: 1px;
      background: #000;
      height: 15px;
      margin: 2px;
    }
  }
}
.messageBox {
  width: 400px;
  height: 200px;
  // position: fixed;
  // text-overflow: wrap;
  // right: 0;
  // top: 50px;
  // background: #f00;
}
</style>