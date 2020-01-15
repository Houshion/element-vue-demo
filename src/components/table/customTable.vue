<!-- customTable -->
<template>
    <div class="customTable">
        <div class="baseMsg mg-b-5">
            <div class="title f16 fontb mg-b-5 flexVcenter flexStart">
                <svg
                    t="1562570123215"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1798"
                    width="26"
                    height="26"
                >
                    <path
                        d="M737.28 0H286.72C227.84 0 179.2 48.64 179.2 107.52V1024l332.8-204.8 332.8 204.8V107.52C844.8 48.64 796.16 0 737.28 0z m-28.16 384l-71.68 74.24c-5.12 5.12-7.68 12.8-7.68 23.04l17.92 102.4c2.56 12.8-5.12 25.6-17.92 28.16-5.12 2.56-10.24 0-15.36-2.56l-89.6-48.64c-7.68-5.12-15.36-5.12-23.04 0l-89.6 48.64c-12.8 5.12-25.6 2.56-33.28-10.24-2.56-5.12-2.56-10.24-2.56-15.36l17.92-104.96c2.56-7.68-2.56-15.36-7.68-23.04l-71.68-74.24c-10.24-10.24-10.24-25.6 0-35.84 5.12-5.12 7.68-5.12 12.8-7.68l99.84-12.8c7.68-2.56 15.36-7.68 17.92-12.8l46.08-94.72c5.12-12.8 17.92-17.92 30.72-12.8 5.12 2.56 10.24 7.68 12.8 12.8l46.08 94.72c2.56 7.68 10.24 12.8 17.92 12.8l99.84 15.36c12.8 2.56 23.04 15.36 20.48 30.72-5.12 5.12-5.12 10.24-10.24 12.8z"
                        p-id="1799"
                    ></path>
                </svg>
                {{title}}
            </div>
        </div>
        <template v-if="vertical">
            <div class="flex mg-b-5 pdlr">
                <div :style="'width:'+width+'%'">
                    <div class="formTable border-l f15 flexStart">
                        <div
                            class="row tac flex"
                            v-for="(item,index) in newTableTitle"
                            :key="index"
                            :style="'width:'+(100/col)+'%'"
                        >
                            <div class="box col title wd-30">{{item.label}}</div>
                            <div class="box col content wd-70">
                                <div v-if="!item.custom">{{tableData[item.prop]}}</div>
                                <div v-else>
                                    <slot :name="item.prop" :data="tableData"></slot>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row tac" v-for="item in (col-newTableTitle.length%col)" :key="item"> -->
                        <div
                            v-if="newTableTitle.length%col!=0"
                            class="row tac"
                            v-for="(item) in (col-newTableTitle.length%col)"
                            :key="item.id"
                            :style="'min-width:'+(100/col)+'%'"
                        >
                            <div class="box col title"></div>
                            <div class="box col"></div>
                        </div>
                    </div>
                    <div class="footer tar" v-if="foot">
                        <slot name="foot"></slot>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="!list">
            <div class="flex mg-b-5 pdlr">
                <div :style="'width:'+width+'%'">
                    <div class="formTable border-l f15 flexStart">
                        <div
                            class="row tac"
                            v-for="(item,index) in newTableTitle"
                            :key="index"
                            :style="'width:'+(100/col)+'%'"
                        >
                            <div class="box col title">{{item.label}}</div>
                            <div class="box col content">
                                <div v-if="!item.custom">{{tableData[item.prop]}}</div>
                                <div v-else>
                                    <slot :name="item.prop" :data="tableData"></slot>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row tac" v-for="item in (col-newTableTitle.length%col)" :key="item"> -->
                        <div
                            v-if="newTableTitle.length%col!=0"
                            class="row tac"
                            v-for="(item) in (col-newTableTitle.length%col)"
                            :key="item.id"
                            :style="'min-width:'+(100/col)+'%'"
                        >
                            <div class="box col title"></div>
                            <div class="box col"></div>
                        </div>
                    </div>
                    <div class="footer tar" v-if="foot">
                        <slot name="foot"></slot>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="flex mg-b-5 pdlr">
                <div :style="'width:'+width+'%'">
                    <div class="formTable border-l f15 flexStart">
                        <div
                            class="row tac"
                            v-for="(item,index) in newTableTitle"
                            :key="index"
                            :style="'width:'+(100/col)+'%'"
                        >
                            <div class="box col title">{{item.label}}</div>
                            <template v-for="(data,ida) in tableData">
                                <div class="box col content" :key="ida">
                                    <div v-if="!item.custom">{{data[item.prop]}}</div>
                                    <div v-else>
                                        <slot :name="item.prop" :data="data"></slot>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <!-- <div class="row tac" v-for="item in (col-newTableTitle.length%col)" :key="item"> -->
                        <div
                            v-if="newTableTitle.length%col!=0"
                            class="row tac"
                            v-for="(item) in (col-newTableTitle.length%col)"
                            :key="item.id"
                            :style="'min-width:'+(100/col)+'%'"
                        >
                            <div class="box col title"></div>
                            <template v-for="(data,ida) in tableData">
                                <div class="box col" :key="ida"></div>
                            </template>
                        </div>
                    </div>
                    <div class="footer tar" v-if="foot">
                        <slot name="foot"></slot>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        width: {
            type: String,
            default: '100'
        },
        tableTitle: Array,
        tableData: Object | Array,
        col: Number,
        foot: {
            type: Boolean,
            default: false
        },
        list: {
            type: Boolean,
            default: false
        },
        vertical: {
            type: Boolean,
            default: false
        }
    },
    name: 'customTable',
    data() {
        return {};
    },
    components: {},
    computed: {
        newTableTitle() {
            let arr = new Array()
            this.tableTitle.forEach(item => {
                if (!item.hide) {
                    arr.push(item)
                }
            });
            console.log(arr)
            return arr
        }
    },
    created() {
        const _this = this
    },
    methods: {
    }
};
</script>
<style scoped lang='less'>
.pdlr {
  padding-left: 26px;
  padding-right: 26px;
}
.formTable {
  border-top: solid 1px #e1e1e1;
  border-bottom: none;
  .col {
    min-height: 45px;
    border-right: 1px solid #e1e1e1;
    border-bottom: solid 1px #e1e1e1;
    &.title {
      color: #666666;
    //   background: #f9fafc;
      //   border-top: solid 1px #e1e1e1;
      border-bottom: solid 1px #e1e1e1;
    }
    &.content {
      color: #666666;
      background: #f9fafc;
      //   border-top: solid 1px #e1e1e1;
      border-bottom: solid 1px #e1e1e1;
    }
  }
}
.footer {
  color: #666666;
  background: #f9fafc;
  border: solid 1px #e1e1e1;
  border-top: none;
  padding: 15px;
}
</style>