<template>
  <div id="otable">
    <el-input placeholder="请输入内容" v-model="searchVal" v-if="search" clearable>
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-table
      class="border mg-t-5"
      ref="otable"
      :data="tables"
      style="width: 100%"
      tooltip-effect="dark"
      :show-overflow-tooltip="true"
      :header-row-style="{background:'#999'}"
      v-loading="loading"
      border=""
      @selection-change="selecChange"
    >
      <el-table-column type="selection" width="55" v-if="select"></el-table-column>
      <el-table-column
        v-for="item in tableTitle"
        :key="item.index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align||'left'"
      >
        <template slot-scope="scope">
          <div v-if="item.custom">
            <slot :name="item.prop" :data="scope.row"></slot>
          </div>
          <div v-else>{{scope.row[item.prop]}}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        v-for="(item,index) in tableTitle"
        :key="item.date"
        :fixed="index==0?true:false"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :show-overflow-tooltip="tips"
      ></el-table-column>-->
      <el-table-column
        v-for="(itemSlot,indexSlot) in tableSlot"
        :key="indexSlot"
        :label="itemSlot.title"
        show-overflow-tooltip
        :width="itemSlot.width?itemSlot.width:'auto'"
        :align="itemSlot.align||'center'"
      >
        <template slot-scope="scope">
          <div class="typeButton" v-if="itemSlot.slotType=='btn'&&!scope.row.hideSlot">
            <el-button
              v-for="i in itemSlot.slot"
              :key="i.title"
              v-show="btnHide(scope.row.hideBtn,i.type)"
              @click="btnType(scope.$index, i.type)"
              :type="itemSlot.buttontype=='text'?itemSlot.buttontype:(i.type=='dele'?'danger':itemSlot.buttontype)"
              size="small"
            >{{i.label}}</el-button>
          </div>
          <div class="typeSwitch" v-else-if="itemSlot.slotType=='switch'">
            <el-switch
              v-model="scope.row.switch"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-text="itemSlot.active?itemSlot.active:'开启'"
              :inactive-text="itemSlot.inactive?itemSlot.inactive:'关闭'"
              @change="switchChange(scope.row,scope.$index)"
            ></el-switch>
          </div>
          <div class="typeSwitch" v-else-if="itemSlot.slotType=='inputNum'">
            <el-input-number
              v-model="scope.row.number"
              @change="inputChange"
              size="mini"
              :min="0"
              :max="9999999"
              :label="itemSlot.label?item.itemSlot:'描述文字'"
            ></el-input-number>
          </div>
          <div class="typeButton" v-else-if="itemSlot.slotType=='btnMore'&&!scope.row.hideSlot">
            <el-button
              v-for="i in itemSlot.slot"
              :key="i.title"
              v-show="btnHide(scope.row.hideBtn,i.type)"
              @click="btnType(scope.$index, i.type)"
              :type="itemSlot.buttontype=='text'?'text':
                (i.type=='dele'?'danger':
                itemSlot.buttontype)"
              size="small"
            >{{i.label}}</el-button>
            <el-dropdown @command="btnType">
              <el-button size="small">...</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(more,index) in itemSlot.more"
                  :key="index"
                  :command="{index:scope.$index,type:more.type}"
                >{{more.title}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="mg-t-5 batch" v-if="multy">
      <el-checkbox v-model="selectAllChecked" @change="allChecked">全选</el-checkbox>
      <el-select
        size="mini"
        class="mg-lr-5"
        style="width:120px;"
        v-model="batchValue"
        placeholder="批量操作"
      >
        <el-option :label="item.name" :value="item.key" v-for="item in batchList" :key="item.name"></el-option>
      </el-select>
      <el-button type="info" size="mini" @click="batchSubmit">确认</el-button>
    </div>
    <el-pagination
      v-if="pageMsg.status"
      class="mg-t-5"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageMsg.page"
      :page-sizes="pageMsg.sizes"
      :page-size="pageMsg.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageMsg.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "otable",
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableTitle: {
      type: Array,
      default: () => []
    },
    tableSlot: {
      type: Array,
      default: () => []
    },
    select: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    tips: {
      type: Boolean,
      default: true
    },
    pageMsg: {
      type: Object,
      default: () => ({
        status: true,
        page: 1,
        size: 10,
        sizes: [10, 20, 50, 100],
        total: 0
      })
    },
    multy: {
      type: Boolean,
      default: false
    },
    batchList: {
      type: Array,
      default: () => [{ name: '删除', key: '1', }]
    },
    // selectAllChecked: {
    //   type: Boolean,
    //   default: false,
    // }
  },
  data() {
    return {
      batchValue: '',
      searchVal: "",
      dataLen: this.tableData.length,
      multipleSelection: [],
      selectAllChecked: false
    };
  },

  components: {},
  watch: {
    tableData() {
      this.loading = false
    }
  },

  computed: {
    // 模糊搜索
    tables() {
      const searchVal = this.searchVal;
      if (searchVal) {
        return this.tableData.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(searchVal) > -1
            );
          });
        });
      }
      return this.tableData;
    }
  },

  created() {
    const _this = this;
    console.log(_this.pageMsg);
  },

  mounted() {
    const _this = this;
    setTimeout(() => {
      // _this.loading = false;
    }, 500);
  },
  methods: {
    btnHide(val, type, items) {
      if (val) {
        val = new Set(val)
        return !val.has(type)
      } else {
        return true
      }
    },
    handleClick(row) {
      console.log(row);
    },
    btnType(index, type) {
      if (typeof index === 'object') {
        type = index.type
        index = index.index
      }
      this.$emit("btnFunc", index, type);
    },
    selecChange(val) {
      if (val.length >= this.tableData.length) {
        this.selectAllChecked = true
      } else {
        this.selectAllChecked = false
      }
      this.multipleSelection = val
      // this.$emit("selecChange", val);
    },
    switchChange(row, index) {
      this.$emit("switchChange", row, index);
    },
    inputChange(value) {
      this.$emit("inputChange", value);
    },
    handleSizeChange(val) {
      this.$emit("sizeChange", val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$emit("pageChange", val);
      console.log(`当前页: ${val}`);
    },
    allChecked(val) {
      console.log(val)
      if (val) {
        this.$refs.otable.toggleAllSelection();
      } else {
        this.$refs.otable.toggleAllSelection()
      }
    },
    batchSubmit() {
      if (this.multipleSelection.length > 0) {
        this.$emit("batchSubmit", this.batchValue, this.multipleSelection);
      } else {
        this.$message({
          message: '当前未选中',
          type: 'error',
          showClose: true,
        });
      }
    }
  }
};
</script>
<style lang='less' scoped>
ul.el-pager {
  width: auto;
}
.el-table__fixed-header-wrapper {
  font-weight: bold;
}
</style>