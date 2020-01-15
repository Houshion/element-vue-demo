<template>
  <div class="pd-10 bfff">
    <o-editor
      ref="editor"
      v-model="editor.content"
      :height="300"
      :data="editor.data"
      :url="editor.url"
    />
    <div class="topList flexAround">
      <div class="item font12 flex tac">
        <div class="wd-100 overfont">平台总收益</div>
        <div class="wd-100 overfont">168453.00元</div>
        <div class="wd-100 tar">520单</div>
      </div>
      <div class="item font12 flex tac">
        <div class="wd-100 overfont">充电宝收益</div>
        <div class="wd-100 overfont">168453.00元</div>
        <div class="wd-100 tar">520单</div>
      </div>
      <div class="item font12 flex tac">
        <div class="wd-100 overfont">售卖柜收益</div>
        <div class="wd-100 overfont">168453.00元</div>
        <div class="wd-100 tar">520单</div>
      </div>
      <div class="item font12 flex tac">
        <div class="wd-100 overfont">用户商城收益</div>
        <div class="wd-100 overfont">168453.00元</div>
        <div class="wd-100 tar">520单</div>
      </div>
      <div class="item font12 flex tac">
        <div class="wd-100 overfont">批发商城收益</div>
        <div class="wd-100 overfont">168453.00元</div>
        <div class="wd-100 tar">520单</div>
      </div>
      <div class="item font12 flex tac">
        <div class="wd-100 overfont">用户数量</div>
        <div class="wd-100 overfont">88888个</div>
        <div class="wd-100 tar"></div>
      </div>
      <div class="item font12 flex tac">
        <div class="wd-100 overfont">运营商数量</div>
        <div class="wd-100 overfont">8888个</div>
        <div class="wd-100 tar"></div>
      </div>
      <div class="item font12 flex tac">
        <div class="wd-100 overfont">商家数量</div>
        <div class="wd-100 overfont">888个</div>
        <div class="wd-100 tar"></div>
      </div>
      <div class="item font12 flex tac">
        <div class="wd-100 overfont">补货员数量</div>
        <div class="wd-100 overfont">88个</div>
        <div class="wd-100 tar"></div>
      </div>
      <div class="item font12 flex tac">
        <div class="wd-100 overfont">设备数量</div>
        <div class="wd-100 overfont">8台</div>
        <div class="wd-100 tar"></div>
      </div>
    </div>
    <div class="table mg-t-20">
      <div class="flexStart">
        <el-date-picker
          class="mg-r-10"
          v-model="dateTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary">重置</el-button>
      </div>
      <indextable></indextable>
    </div>
    <charts></charts>
  </div>
</template>

<script>
import { indextable, charts } from "./script";
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  components: {
    indextable,
    charts
  },
  computed: {
    ...mapGetters([
      'name',
      'userInfo'
    ])
  },
  data() {
    return {
      dateTime: '',
      editor: {
        data: {},
        url: '',
        content: ''
      }
    }
  },
  created() {

  },
  mounted() {
    const _this = this;
    console.log(this.userInfo.email)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.item {
  width: calc((100% - 1.2rem) / 5);
  margin-bottom: 0.2rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 0.2rem;
  height: 1.2rem;
  border-radius: 10px;
  color: #ffffff;
  &:nth-child(1) {
    background: #58a3f7;
  }
  &:nth-child(2) {
    background: #ff6699;
  }
  &:nth-child(3) {
    background: #fec03d;
  }
  &:nth-child(4) {
    background: #52c1f5;
  }
  &:nth-child(5) {
    background: #9900ff;
  }
  &:nth-child(6) {
    background: #fb6260;
  }
  &:nth-child(7) {
    background: #3366cc;
  }
  &:nth-child(8) {
    background: #4fc1b0;
  }
  &:nth-child(9) {
    background: #aeaeae;
  }
  &:nth-child(10) {
    background: #657180;
  }
}
</style>
