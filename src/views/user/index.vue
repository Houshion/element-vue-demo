<!-- userList -->
<template>
  <div id="userList">
    <div class="mg-t-5 bfff pd-10">
      <el-form :model="searchForm">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-input clearable placeholder="请输入用户名称" v-model="searchForm.name">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input clearable placeholder="请输入手机号码" v-model="searchForm.phone">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-col>
          <el-col :span="12" class="tar">
            <search-btn @search="search" @reset="reset"></search-btn>
          </el-col>
        </el-row>
      </el-form>
      <o-table
        class="mg-t-5"
        :loading="loading"
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableSlot="tableSlot"
        :pageMsg="pageMsg"
        @btnFunc="btnFunc"
        @selecChange="selecChange"
        @switchChange="switchChange"
        @inputChange="inputChange"
      ></o-table>
    </div>
  </div>
</template>
<script>
// import * as member from "@/api/member";
export default {
  name: 'userList',
  data() {
    return {
      searchForm: {
        name: '',
        phone: ''
      },
      tableTitle: [
        { prop: "mid", label: "ID", width: "100" },
        { prop: "nickname", label: "用户名称", width: "95" },
        { prop: "avatar", label: "用户头像", width: "95" },
        { prop: "mobile", label: "手机号码", width: "95" },
        { prop: "province", label: "押金情况", width: "95" },
        { prop: "province", label: "消费金额", width: "95" },
        { prop: "date", label: "注册时间", width: "auto" },
      ],
      //   表头信息，prop对应
      tableSlot: [
        {
          title: "操作",
          slotType: "btn",
          buttontype: "info", // text为文字按钮，默认不传为正常按钮
          width: 300,
          slot: [
            { label: "信用记录", type: "edit" },
            { label: "货柜记录", type: "edit" },
            { label: "商城记录", type: "edit" }
          ]
        }
      ],
      tableData: [],
      pageMsg: {
        page: 1,
        status: true,
        size: 10,
        sizes: [10, 20, 50, 100],
      },
      loading: false
    };
  },
  components: {},
  computed: {},
  created() {
    const _this = this;
    this.init()
  },
  methods: {
    async init() {
      // this.loading = true
      // let form = {
      //   pageNo: this.pageMsg.page,
      //   pageSize: this.pageMsg.size
      // }
      // let res = await member.memberList(form);
      // this.tableData = res.records
      // this.pageMsg.total = res.total
      // this.loading = false
    },
    btnFunc(index, type) {
      const _this = this;
      console.log(index, type);
    },
    selecChange(val) {
      const _this = this;
      let data = [];
      val.forEach(item => {
        data.push(item.date);
      });
      console.log(data);
    },
    switchChange(row, index) {
      console.log("switchChange", row, index);
    },
    inputChange(val) {
      console.log(val);
    },
    search() { },
    reset() { },
  }
};
</script>
<style scoped lang='less'>
</style>