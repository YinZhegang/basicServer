<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-26 16:40:14
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\ucenter\dept\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div>
    <choose-member @get-one-dept="getOneDept" width="500px" title="选择部门" :visible.sync="detpVisible"></choose-member>
    <el-button-func
      size="small"
      style="float: right; cursor: pointer"
      icon="el-icon-plus"
      @click="() => {
        detail.isEdit = false;
        detail.visible = true;detail.form={}
}"
      >新增部门</el-button-func
    >
    <el-button-func
      size="small"
      style="float: right; cursor: pointer;margin:0  10px"
      icon="el-icon-plus"
      @click="() => {
       deptSort.visible = true
}"
      >部门排序</el-button-func
    >
    <el-dialog :visible.sync="deptSort.visible" title="部门排序">
      <el-tree
      :props="{
        label: 'deptName'
      }"
      :load="loadTreeMore"
       draggable
       @node-drop="handleDrop"
       lazy>
      </el-tree>
    </el-dialog>
    <el-dialog :title="detail.isEdit?'编辑部门':'新增部门'" :visible.sync="detail.visible" width="50%">
      <el-form
      size="small"
        :model="detail.form"
        ref="detailForm"
        :rules="detail.rules"
        label-width="80px"
        style="width:50%;margin:0 auto"
        class="demo-ruleForm"
      >
        <el-form-item label="部门名称" prop="deptName">
          <el-input
            v-model="detail.form.deptName"
             maxlength="10"
                style="width:200px"
                show-word-limit
            placeholder="请输入部门名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
            <el-button icon="el-icon-edit" type="primary" plain @click="detpVisible = true">{{detail.form.parent?detail.form.parent.deptName:'请选择部门'}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDataMethod('detailForm')"
          >保存</el-button
        >
        <el-button @click="dialogVisible = false">取 消</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
    <br />
    <br />
     <br />
    <el-table
      border
      stripe
      size="small"
      :header-cell-style="{
        background: '#f7f8f9',
        color: '#333',
        borderBottom: '1px solid #d7dbe6'
      }"
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="deptId"
      lazy
      :load="loadMoreList"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column :key="item +index" v-for="(item, index) in tableHeader" :prop="item.attrField" :label="item.attrName" >
      </el-table-column>
      <!-- <el-table-column
            width="150"
            align="center"
            label="排序"
          >
            <template slot-scope="scope">
              <el-button-group>
                <el-button @click="sort(1,scope,1)" size="mini" icon="el-icon-arrow-up"></el-button>
                <el-button @click="sort(1,scope,0)" size="mini" icon="el-icon-arrow-down"></el-button>
              </el-button-group>
            </template>
      </el-table-column> -->
      <el-table-column width="100" align="center" label="操作">
        <template slot-scope="scope">
          <i @click="editDetail(scope.row)" class="el-icon-edit func-opr" style="cursor: pointer"></i>
          <el-divider direction="vertical"></el-divider>
          <i @click="deptDelete(scope.row.deptId)"  class="el-icon-delete func-opr" style="cursor: pointer"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { deptTop, deptList, deptOrder, deptMove, deptDelete, deptGet, deptAdd, deptUpdate } from '@/api/dept'
import { attrList } from '@/api/dict'
@Component({
  name: 'dept',
  components: {
    ChooseMember: () => import('@/components/ChooseItems/index.vue')
  }
})
export default class extends Vue {
  created() {
    this.getTableHeader()
    this.getDeptTop()
  }

  deptSort = {
    visible: false
  }

  topDept = ''
  detpVisible = false
  addData:any = deptAdd
  updateData:any = deptUpdate
  detail = {
    visible: false,
    isEdit: false,
    form: {},
    rules: {
      deptName: [
        { required: true, message: '请输入部门名称', trigger: 'blur' },
        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
      ],
      parentId: { required: true, message: '请选择上级部门', trigger: 'blur' }
    }
  }

  tableHeader = []
  getTableHeader() {
    attrList({ current: 1, size: 100, form: 2, tenantId: 1 }).then((res:any) => {
      this.tableHeader = this.formatHeader(res.records) || []
    })
  }

  formatHeader(header:any) {
    return header
  }

  getDeptTop() {
    deptTop({ tenantId: 183, detail: true }).then((res:any) => {
      this.topDept = res
      console.log(this.formatDeptList([res]))
      this.tableData = this.formatDeptList([res])
      // console.log(res)
    })
  }

  formatDeptList(list:any):any {
    return list.map((listItem:any) => { const i = { ...listItem, ...listItem.items, hasChildren: true }; delete i.items; return i })
  }

  tableData = [];
  loadTreeMore(node:any, resolve:any) {
    if (node.level === 0) {
      return resolve([this.topDept])
    }
    deptList({
      deptId: node.data.deptId,
      detail: true
    }).then((res:any) => {
      resolve(res)
    })
  }

  handleDrop(draggingNode:any, dropNode:any, dropType:any) {
    console.log({ items: dropNode.parent.childNodes })
    if (dropType == 'inner') {
      const dataNodeInner:any = []
      for (let i = 0; i < dropNode.childNodes.length; i++) {
        dataNodeInner.push({ deptId: dropNode.childNodes[i].data.deptId, deptOrder: i })
      }
      // this.$POST('dept/sort', {items: dropNode.parent.data.}).then(res => {
      // })
      deptMove({ parentId: dropNode.data.deptId, deptId: draggingNode.data.deptId }).then(res => {
        deptOrder({ items: dataNodeInner }).then(res => {
          this.$message({
            type: 'success',
            message: '移动成功!'
          })
        })
      })
      console.log('tree drop: ', dropNode.label, dropType)
    } else {
      const dataNode:any = []
      for (let i = 0; i < dropNode.parent.childNodes.length; i++) {
        dataNode.push({ deptId: dropNode.parent.childNodes[i].data.deptId, deptOrder: i })
      }
      deptMove({ parentId: dropNode.parent.data.deptId, deptId: draggingNode.data.deptId }).then(res => {
        deptOrder({ items: dataNode }).then(res => {
          this.$message({
            type: 'success',
            message: '排序成功!'
          })
        })
      })
      console.log('tree drop: ', dropNode.label, dropType)
    }
  }

  loadMoreList(tree:any, treeNode:any, resolve:any) {
    console.log(tree, treeNode)
    deptList({
      deptId: tree.deptId,
      detail: true
    }).then((res:any) => {
      resolve(this.formatDeptList(res))
    })
  }

  getOneDept(dept:any) {
    this.detpVisible = false
    this.detail.form.parent = dept
    this.detail.form.parentId = dept.deptId
  }

  deptDelete(deptId:number) {
    deptDelete({ deptId }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      this.tableData = []
      this.getDeptTop()
    })
  }

  async editDetail(row:any) {
    const data = JSON.parse(JSON.stringify(row))
    this.detail.visible = true
    const deptDt:any = await deptGet({ deptId: data.deptId, detail: true })
    this.detail.form = data
    this.detail.form.parent = deptDt
    this.detail.isEdit = true
  }

  addDataMethod(ref:string) {
    (this.$refs[ref] as any).validate((valid:boolean) => {
      if (!valid) return
      this[this.detail.isEdit ? 'updateData' : 'addData'](this.detail.form).then(() => {
        this.$message({
          type: 'success',
          message: this.detail.isEdit ? '修改成功' : '添加成功'
        })
        this.detail.visible = false
        this.tableData = []
        this.getDeptTop()
      })
    })
  }
}
</script>

<style scoped>
.el-dialog__body {
  padding-top: 0;
}
</style>
