<!-- treeMenuTable -->
<template>
    <div id="treeMenuTable" class="pd-10 bfff">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="AddMenuShow">添加菜单</el-button>
        <tree-table
            class="mg-t-5"
            :key="key"
            :default-expand-all="defaultExpandAll"
            :data="data"
            :columns="columns"
            :indent="indent"
            :defaultChildren="tableTreeChildren"
            v-loading="loading"
            border=""
        >
            <template slot="operation" slot-scope="{scope}">
                <!-- <el-button type="success" size @click="editChild(scope)">新增子菜单</el-button> -->
                <el-button size="mini" @click="edit(scope)">编辑</el-button>
                <el-button type="danger" size="mini" @click="remove(scope)">删除</el-button>
            </template>
        </tree-table>
        <el-dialog
            :title="formTitle"
            :visible.sync="dialogMenu"
            width="30%"
            :close-on-click-modal="false"
        >
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="菜单名称" label-width="90px" prop="menu_name">
                    <el-input clearable v-model="form.menu_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单链接" label-width="90px">
                    <el-input clearable v-model="form.menu_url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择菜单" v-if="formTitle == '新增菜单'" label-width="90px">
                    <el-cascader
                        class="wd-100"
                        :options="data"
                        :props="menuProps"
                        v-model="selectedOptions"
                        @change="handleChange"
                        change-on-select
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="排序" label-width="90px">
                    <el-input clearable v-model="form.weight" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item class="align-right">
                    <el-button @click="cancel('form')">取 消</el-button>
                    <el-button
                        v-loading.fullscreen.lock="fullscreenLoading"
                        v-if="dialogSave"
                        type="primary"
                        @click="EditMenuSave('form')"
                    >保 存</el-button>
                    <el-button
                        v-loading.fullscreen.lock="fullscreenLoading"
                        v-else
                        type="primary"
                        @click="AddMenuSave('form')"
                    >新 增</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import treeTable from "@/components/TreeTable";
import * as menu from "@/api/menu";
export default {
    name: 'authority/menu',
    data() {
        return {
            fullscreenLoading: false,
            defaultExpandAll: true,
            key: 1,
            indent: 30,
            updata: false,
            columns: [
                {
                    label: "选择",
                    checkbox: true,
                    width: 100,
                    align: "left"
                },
                {
                    label: "菜单名称",
                    key: "menu_name",
                    expand: true,
                    align: "left"
                },
                {
                    label: "编辑",
                    key: "operation",
                    width: 200
                }
            ],
            tableTreeChildren: "childlist",
            loading: true,
            tableData: [{
                id: 1,
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                id: 2,
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                id: 3,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                children: [{
                    id: 31,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    id: 32,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }]
            }, {
                id: 4,
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            tableData1: [{
                id: 1,
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                id: 2,
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                id: 3,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                hasChildren: true
            }, {
                id: 4,
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            dialogMenu: false,
            dialogSave: false,
            formTitle: "新增菜单",
            form: {
                menu_id: "",
                menu_name: "",
                menu_url: "",
                menu_pid: 0,
                menu_url: "",
                weight: ""
            },
            rules: {
                menu_name: [
                    {
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur"
                    }
                ]
            },
            selectedOptions: [],
            data: [],
            menuProps: {
                children: "childlist",
                value: "menu_id",
                label: "menu_name"
            },
        };
    },
    components: { treeTable },
    computed: {},
    created() {
        const _this = this
        this.init()
    },
    methods: {
        async init() {
            let res = await menu.menuList();
            this.data = res.records;
            console.log(JSON.stringify(this.data))
            this.loading = false;
        },
        remove(scope) {
            this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    console.log(1)
                    menu.menuDel({ menu_id: scope.row.menu_id }).then(res => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        this.init();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        edit(scope) {
            console.log(scope);
            this.formTitle = "编辑菜单";
            this.dialogMenu = true;
            this.dialogSave = true;
            // this.menu_first = scope.row;
            console.log(scope.row.menu_id);
            this.form.menu_id = scope.row.menu_id;
            this.form.menu_pid = scope.row.menu_pid;
            this.form.menu_url = scope.row.menu_url;
            this.form.menu_name = scope.row.menu_name;
            this.form.weight = scope.row.weight;
            // this.menu_second = scope.row.childlist;
            const row = scope.row;
        },
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.dialogMenu = false;
            // this.form = {};
        },

        //新增子菜单
        editChild(scope) {
            this.formTitle = "新增子菜单";
            this.dialogMenu = true;
            this.form = {};
        },
        async AddMenuShow() {
            // this.menu_first = this.data;
            this.formTitle = '新增菜单';
            this.dialogSave = false;
            this.dialogMenu = true;
            this.form = {};
            this.selectedOptions = []
        },
        EditMenuSave(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    if (!this.form.menu_pid) this.form.menu_pid = 0;
                    this.fullscreenLoading = true;
                    await menu.menuEdit(this.form);
                    this.fullscreenLoading = false;
                    this.init();
                    this.dialogMenu = false;
                    this.$message({
                        type: "success",
                        message: "修改成功!"
                    });
                } else {
                    return false;
                }
            });
        },
        AddMenuSave(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    if (!this.form.menu_pid) this.form.menu_pid = 0;
                    this.fullscreenLoading = true;
                    await menu.menuAdd(this.form);
                    this.fullscreenLoading = false;
                    this.init();
                    // this.$bus.emit("AddMenuUpdate");
                    this.dialogMenu = false;
                    this.form = {};
                    this.selectedOptions = []
                    this.$message({
                        type: "success",
                        message: "新增成功!"
                    });
                } else {
                    return false;
                }
            });
        },
        handleChange(val) {
            this.form.menu_pid = val[val.length - 1];
        },
    }
};
</script>
<style scoped lang='less'>
</style>