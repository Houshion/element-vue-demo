<!-- charts -->
<template>
  <div id="charts">
    <!-- <el-button-group class="mg-t-5 tar wd-100">
      <el-button
        type="primary"
        :plain="item.active?false:true"
        v-for="(item,index) in buttons"
        :key="index"
        @click="changeType(item)"
      >{{item.name}}</el-button>
    </el-button-group>-->
    <el-radio-group v-model="chartVal" class="mg-t-5 wd-100">
      <el-radio-button :label="item.name" v-for="(item,index) in buttons" :key="index"></el-radio-button>
    </el-radio-group>
    <div class="mg-t-5 wd-100">
      日期：
      <el-date-picker
        class="mg-r-10"
        v-model="dateTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </div>
    <div class="wd-100">
      <v-chart :options="option"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'charts',
  data() {
    let data = []

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI
      let r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }
    return {
      dateTime: '',
      buttons: [
        { name: "用户趋势", active: true, type: 1 },
        { name: "订单趋势", active: false, type: 2 },
        { name: "收益趋势", active: false, type: 3 },
      ],
      chartVal: "用户趋势",
      option: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
          y: "bottom",
        },
        grid: {
          left: '3%',
          right: '50px',
          bottom: '50px',
          //   containLabel: true
        },
        xAxis: {
          type: 'category',
          //   boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            data: [220, 182, 191, 2605, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  components: {},
  computed: {},
  created() {
    const _this = this
  },
  methods: {
    changeType(item) {
      console.log(item.type);
      this.buttons.forEach(item => {
        item.active = false
      });
      item.active = true
    }
  }
};
</script>
<style scoped lang='less'>
.echarts {
  width: 100%;
  height: 400px;
}
</style>