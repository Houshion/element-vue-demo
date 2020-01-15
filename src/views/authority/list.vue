<!-- authority/list  -->
<template>
  <div id="authorityList">
    <div class="pd-10 bfff">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="openDialog(1)">创建管理员</el-button>
      <o-table
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableSlot="tableSlot"
        :pageMsg="pageMsg"
        select
        multy
        @btnFunc="btnFunc"
        @selecChange="selecChange"
        @batchSubmit="batchSubmit"
      ></o-table>
      <!-- 创建管理员Dialog -->
      <el-dialog
        :title="form.model==1?'新增管理员':form.model==2?'编辑管理员':'修改密码'"
        :visible.sync="form.dialogFormVisible"
        @close="cancel"
      >
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="用户账号" label-width="1rem" prop="username" v-if="form.model!=3">
            <el-input
              clearable
              v-model="form.username"
              autocomplete="off"
              :disabled="form.model==2?true:false"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" label-width="1rem" prop="password" v-if="form.model!=2">
            <el-input clearable type="password" v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" label-width="1rem" prop="password2" v-if="form.model!=2">
            <el-input clearable type="password" v-model="form.password2" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" label-width="1rem" prop="role_ids" v-if="form.model!=3">
            <el-select class="wd-100" v-model="form.role_ids" multiple placeholder="请选择角色">
              <el-option
                v-for="(item,index) in adminRoleList"
                :key="index"
                :label="item.role_name"
                :value="item.role_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as member from "@/api/member";
import { roleList } from "@/api/adminRole";
import { parseTime } from "@/utils";
export default {
  name: 'authority/list',
  data() {
    const password2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      tableTitle: [
        { prop: "username", label: "账号", width: "auto" },
        { prop: "role", label: "角色", width: "auto" },
        { prop: "create_time", label: "创建时间", width: "auto" },
      ],
      // 表头信息，prop对应
      tableSlot: [
        {
          title: "操作",
          slotType: "btn",
          buttontype: "info", // text为文字按钮，默认不传为正常按钮
          width: 250,
          slot: [
            { label: "编辑", type: "edit" },
            { label: "删除", type: "dele" },
            { label: "修改密码", type: "changePass" },
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
      form: {
        dialogFormVisible: false,
        model: 1, //1创建，2编辑，3修改密码
        username: '',
        password: '',
        password2: '',
        role_ids: '',
      },
      adminRoleList: [],
      rules: {
        username: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { min: 4, max: 11, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        role_ids: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: password2, trigger: 'blur' }
        ],
      },
    };
  },
  components: {},
  computed: {},
  created() {
    const _this = this
    this.init()
  },
  methods: {
    async init() {
      let form = {
        pageNo: this.pageMsg.page,
        pageSize: this.pageMsg.size
      }
      let res = await member.memberList(form)
      res.records.forEach(item => {
        let roleName = new Array();
        item.role.forEach(role => {
          roleName.push(role.role_name)
        });
        item.role = roleName.join(",")
        item.create_time = parseTime(item.create_time)
      });
      this.tableData = res.records
    },
    async btnFunc(index, type) {
      const _this = this;
      if (type == "edit") {
        this.openDialog(2)
        let res = await member.memberDetail({ mid: this.tableData[index].mid })
        this.form.username = res.username
        let arr = new Array()
        res.role.forEach(item => {
          arr.push(item.role_id)
        });
        console.log()
        this.form.mid = res.mid
        this.form.role_ids = arr
      } else if (type == "dele") {
        this.deleteMember(this.tableData[index].mid)
      } else if (type == "changePass") {
        this.openDialog(3)
      }
    },
    selecChange(val) {
      const _this = this;
      let data = [];
      val.forEach(item => {
        data.push(item.date);
      });
      console.log(data);
    },
    batchSubmit(val, data) {
      let arr = new Array()
      data.forEach(item => {
        arr.push(item.mid)
      });
      if (val == 1) {
        this.deleteMember(arr.join(","))
      }
    },
    submitForm() {
      const _this = this;
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          let form, msg = "修改成功！";
          switch (this.form.model) {
            case 1:
              // 添加管理员
              form = {
                username: _this.form.username,
                password: _this.form.password,
                role_ids: _this.form.role_ids.join(",")
              }
              let res = await member.memberAdd(form)
              msg = "添加成功！"
              break;
            case 2:
              let { mid, role_ids } = _this.form
              form = {
                mid,
                role_ids: role_ids.join(",")
              }
              await member.memberEdit(form)
              break;
            case 3:
              form = {
                mid: _this.form.mid,
                password: _this.form.password,
              }
              await member.memberEdit(form)
              break;
          }
          this.$message({
            type: 'success',
            message: msg
          });
          this.form.dialogFormVisible = false
          this.init()
        } else {
          console.log('error!!');
          return false;
        }
      });
    },
    async openDialog(type) {
      this.form.model = type
      console.log(type)
      if (type != 3 && this.adminRoleList.length == 0) {
        let res = await roleList({
          pageNo: 1,
          pageSize: 999
        })
        this.adminRoleList = res.records
        console.log(this.adminRoleList)
      }
      this.form.dialogFormVisible = true
    },
    cancel() {
      this.$refs["ruleForm"].resetFields();
      this.form.dialogFormVisible = false
    },
    async deleteMember(mid) {
      this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await member.memberDel({ mid: mid })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.init()
      })
    }
  }
};
</script>
<style scoped lang='less'>
</style>