<!-- authority/index  -->
<template>
  <div id="authorityIndex">
    <div class="pd-10 bfff">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNew">创建角色</el-button>
      <o-table
        :loading="loading"
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableSlot="tableSlot"
        :pageMsg="pageMsg"
        select
        multy
        @btnFunc="btnFunc"
        @selecChange="selecChange"
        @switchChange="switchChange"
        @inputChange="inputChange"
        @batchSubmit="batchSubmit"
        @pageChange="pageChange"
      ></o-table>
      <!-- 创建角色Dialog -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="cancel">
        <el-form :model="form" :rules="rules">
          <el-form-item label="角色名称" label-width="1rem" prop="role_name">
            <el-input clearable v-model="form.role_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色说明" label-width="1rem" prop="role_desc">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.role_desc"
              maxlength="30"
              show-word-limit
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="角色权限" label-width="1rem" prop="menu_ids">
            <el-tree
              ref="roleTree"
              class="ele-border"
              :data="tree"
              show-checkbox
              node-key="id"
              :default-checked-keys="treeIndex"
              :props="defaultProps"
              @check="treeChange"
            ></el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="ruleConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as role from "@/api/adminRole";
import { menuList } from "@/api/menu";
export default {
  name: 'authority/index',
  data() {
    return {
      tableTitle: [
        { prop: "role_name", label: "角色名称", width: "auto" },
        { prop: "role_desc", label: "角色说明", width: "auto" },
      ],
      // 表头信息，prop对应
      tableSlot: [
        {
          title: "操作",
          slotType: "btn",
          buttontype: "info", // text为文字按钮，默认不传为正常按钮
          slot: [
            { label: "编辑", type: "edit" },
            { label: "删除", type: "dele" },
          ]
        }
      ],
      tableData: [
        // {
        //   create_time: 1557040778,
        //   is_super: 0,
        //   role_desc: "4444",
        //   role_id: 34,
        //   role_name: "44444",
        // }
      ],
      loading: false,
      pageMsg: {
        page: 1,
        status: true,
        size: 10,
        sizes: [10, 20, 50, 100],
        total: 0,
      },
      dialogFormVisible: false,
      dialogTitle: '新增角色',
      form: {
        role_name: '',
        role_desc: '',
        menu_ids: ''
      },
      tree: [],
      treeIndex: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      rules: {
        role_name: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur"
          }
        ],
        role_desc: [
          {
            required: true,
            message: "请输入角色说明",
            trigger: "blur"
          }
        ],
        menu_ids: [
          {
            required: true,
            message: "请选择角色权限",
            trigger: "change"
          }
        ],
      },
    };
  },
  components: {},
  computed: {},
  created() {
    const _this = this;
    this.init();
    this.getMenu();
  },
  methods: {
    async init() {
      this.loading = true
      let form = {
        pageNo: this.pageMsg.page,
        pageSize: this.pageMsg.size
      }
      let res = await role.roleList(form);
      this.tableData = res.records
      this.pageMsg.total = res.total
      this.loading = false
      // console.log('role------>', res.records)
    },
    async getMenu() {
      menuList().then(res => {
        let treeData = new Array()
        res.records.forEach(item => {
          let a = { id: item.menu_id, label: item.menu_name, children: [] }
          item.childlist.forEach(i => {
            a.children.push({ id: i.menu_id, label: i.menu_name, children: [] })
          });
          treeData.push(a)
        })
        // treeData.push(a)
        this.tree = treeData
        console.log("菜单权限----->", treeData)
      })
    },
    // 操作按钮功能
    async btnFunc(index, type) {
      const _this = this;
      let form = {
        role_id: this.tableData[index].role_id
      }
      if (type == "edit") {
        this.dialogTitle = "编辑角色"
        this.dialogFormVisible = true
        console.log(this.$refs.roleTree)
        await role.roleDetail(form).then(res => {
          this.$refs.roleTree.setCheckedKeys([]);
          let menuIds = new Set(res.menu_ids);
          this.tree.forEach(item => {
            if (menuIds.has(item.id)) {
              menuIds.delete(item.id)
            }
          });
          this.treeIndex = [...menuIds]
          console.log('chulaile', this.treeIndex)
          this.form = {
            role_name: res.role_name,
            role_desc: res.role_desc,
            role_id: res.role_id,
            menu_ids: res.role_id
          }
        })
      } else if (type == "dele") {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          role.roleDel(form).then(res => {
            this.loading = true
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.init()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    selecChange(val) {
      const _this = this;
      let data = [];
      val.forEach(item => {
        data.push(item.date);
      });
      // console.log(data);
    },
    switchChange(row, index) {
      // console.log("switchChange", row, index);
    },
    inputChange(val) {
      // console.log(val);
    },
    batchSubmit(val, data) {
      console.log(val, data);
    },
    pageChange(val) {
      // console.log("现在是第", val, "页")
      this.pageMsg.page = val;
      this.init()
    },
    // 权限菜单树状态改变方法
    treeChange(data, key) {
      this.form.menu_ids = [...key.checkedKeys, ...key.halfCheckedKeys]
      // return console.log(key, this.form.menu_ids)
      // var keys = new Set(key.checkedKeys)
      // key.checkedNodes.forEach(item => {
      //   if (item.children.length > 0) {
      //     keys.delete(item.id)
      //   }
      // });
      // this.form.menu_ids = [...keys].join(",")
    },
    async ruleConfirm() {
      if (this.dialogTitle == "新增角色") {
        let res = await role.roleAdd(this.form);
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
      } else {
        let res = await role.roleEdit(this.form);
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      }
      this.$refs.roleTree.setCheckedKeys([]);
      this.init();
      this.dialogFormVisible = false;
    },
    // 添加新角色权限
    addNew() {
      this.dialogFormVisible = true;
      this.form = {
        role_name: '',
        role_desc: '',
        menu_ids: '',
        role_id: ''
      };
    },
    // 关闭窗口
    cancel() {
      this.$refs.roleTree.setCheckedKeys([]);
      this.dialogFormVisible = false;
    }
  }
};
</script>
<style scoped lang='less'>
</style>