<!-- indextable -->
<template>
  <div id="indextable" class="wd-100">
    <!-- <o-table :title="title"></o-table> -->
    <o-table
      :tableData="tableData"
      :tableTitle="tableTitle"
      @btnFunc="btnFunc"
      @selecChange="selecChange"
      @switchChange="switchChange"
      @inputChange="inputChange"
      :pageMsg="pageMsg"
      class="wd-100"
    ></o-table>
    <div class="flexEnd">
      <el-button-group class="mg-tb-5  tar">
        <el-button icon="el-icon-arrow-left">上一页</el-button>
        <el-button>
          下一页
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script>
import otable from "@/components/table";
export default {
  name: 'indextable',
  data() {
    return {
      search: "", // 模糊搜索当前页面数据
      loading: false, // 是否加载表格
      tableTitle: [
        { prop: "date", label: "日期", width: "100" },
        { prop: "name", label: "用户增长量", width: "95" },
        { prop: "province", label: "充电宝订单", width: "95" },
        { prop: "city", label: "充电宝收益", width: "95" },
        { prop: "province", label: "售卖柜订单", width: "95" },
        { prop: "province", label: "售卖柜收益", width: "95" },
        { prop: "province", label: "用户商城订单", width: "108" },
        { prop: "province", label: "用户商城收益", width: "108" },
        { prop: "province", label: "批发商城订单", width: "108" },
        { prop: "province", label: "批发商城收益", width: "auto" },
      ], 
      // 表头信息，prop对应
      // tableSlot: [
      //   {
      //     title: "上下架",
      //     slotType: "switch",
      //     width: 80
      //   },
      //   {
      //     title: "数量",
      //     slotType: "inputNum",
      //     width: 200
      //   },
      //   {
      //     title: "操作",
      //     slotType: "btn",
      //     buttontype: "text", // text为文字按钮，默认不传为正常按钮
      //     slot: [
      //       { label: "编辑", type: "edit" },
      //       { label: "删除", type: "dele" }
      //     ]
      //   }
      // ],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          switch: 0,
          zip: 7
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          switch: 1,
          zip: 6
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          switch: 0,
          zip: 5
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          switch: 0,
          zip: 4
        },
        {
          date: "2016-06-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          switch: 1,
          zip: 3
        },
        {
          date: "2016-07-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          switch: 0,
          zip: 2
        },
        {
          date: "2016-05-21",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          switch: 0,
          zip: 1
        },
        {
          date: "2016-05-31",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          switch: 0,
          zip: 0
        }
      ],
      pageMsg: {
        status: false,
      }
    };
  },
  components: {},
  computed: {},
  created() {
    const _this = this
  },
  methods: {
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
  }
};
</script>
<style scoped lang='less'>
</style>