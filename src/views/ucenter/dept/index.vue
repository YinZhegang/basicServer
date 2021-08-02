<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-08-02 14:27:15
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
        detail.visible = true;
}"
      >新增部门</el-button-func
    >
    <el-button-func
      size="small"
      style="float: right; cursor: pointer;margin:0  10px"
      icon="el-icon-sort"
      @click="() => {
       deptSort.visible = true
}"
      >部门排序</el-button-func
    >
    <el-dialog :before-close="(d) => {
      if(isMoved) {
      tableData = [];
      getDeptTop()
      isMoved = false

      }
      d()

      }"  :visible.sync="deptSort.visible" title="部门排序">
      <el-tree
      style="height:500px;overflow:auto"
      v-if="refreshTree"
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
        label-width="120px"
        style="width:50%;margin:0 auto"
        class="demo-ruleForm"
      >
        <el-form-item :key="'deptEDit'+ index" v-for="(item, index) in deptEditAttrList" :label="item.attrName" :prop="item.attrField">
            <component :is="item.conf.ele" :type="item.conf.type" v-bind="item.conf.props?item.conf.props:{}"  :placeholder="item.conf.placeholder" v-model="detail.form[item.attrField]">
              <template v-if="item.conf.options&&item.conf.eleChild==='el-option'">
                <el-option :key="'itemOption'+ idx" :value="opt.value" v-for="(opt,idx) in item.conf.options" :label="opt.label" :is="item.conf.eleChild"></el-option>
              </template>
              <template v-if="item.conf.options&&item.conf.eleChild==='el-checkbox'">
               <el-checkbox @change="$forceUpdate()" :key="'itemCheckbox'+ idx"  v-for="(opt,idx) in item.conf.options" :label="opt.label">{{opt.value}}</el-checkbox>
              </template>
            </component>

        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
            <el-button icon="el-icon-edit" type="primary" plain @click="detpVisible = true">{{detail.form.parent?detail.form.parent.deptName:'请选择部门'}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDataMethod('detailForm')"
          >保存</el-button
        >
        <el-button @click="detail.visible = false">取 消</el-button>
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
      style="width: 100%; margin-bottom: 20px;margin-top:-2px"
      row-key="deptId"
      lazy
      :load="loadMoreList"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column show-overflow-tooltip	v-if="headerVisible(item.attrField)&&!item.isListShow" :label-class-name="index?'':'first-ctx'" align="left" :key="item +index" v-for="(item, index) in tableHeader" :prop="item.attrField" :label="item.attrName" >
        <template slot-scope="scope">
          <div v-if="item.attrType===10">
            <el-tag style="margin:0 1px" :key="'attrType===10' + idx" size='mini' v-for="(tag, idx) in scope.row[item.attrField].split(',').filter(Boolean)">{{tag}}</el-tag>
          </div>
          <span v-else> {{ getDeptFieldName(item.attrField,scope.row[item.attrField]) }}</span>
        </template>
      </el-table-column>
      <el-table-column  width="100" align="center" label="操作">
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

type InputTypeDetail = {
   ele:'el-input'|'el-input-number'|'el-select'|'el-date-picker'|'el-time-select'|'el-checkbox-group'|'el-switch'
   props?:object
   eleChild?:'el-checkbox'|'el-radio'|'el-option'
   type?:'textarea'|'text'|'date'|'datetime'
   rule?: object[]|object
   placeholder?:string
   options?:{label:string|number, value:string|number}[]
}

@Component({
  name: 'dept',
  components: {
    ChooseMember: () => import('@/components/ChooseItems/index.vue')
  }
})
export default class extends Vue {
  refreshTree = true
  isMoved = false
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
        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
      ],
      parentId: { required: true, message: '请选择上级部门', trigger: 'blur' }
    }

  }

  tableHeader = []
  get deptEditAttrList() {
    return this.tableHeader?.filter((i:any) => {
      return i.attrField !== 'deptOrder'
    })
  }

  getTableHeader() {
    attrList({ current: 1, size: 100, form: 2, tenantId: 1 }).then((res:any) => {
      const hd = this.formatHeader(res.records)
      const rules = {}
      hd.forEach((e:any) => {
        rules[e.attrField] = e.conf.rule
      })
      this.detail.rules = rules
      this.tableHeader = hd || []
      this.$forceUpdate()
    })
  }

  AttrTypeArr:Array<string> = [
    '默认属性', '单行文本', '多行文本', '手机号', '邮箱', '超链接', '数字', '日期', '时间', '下拉选择', '多项选择', '开关'
  ]

  headerVisible(attrField:string) {
    switch (attrField) {
      case 'tenantId':
        return false
      default:
        return true
    }
  }

  getDeptFieldName(attrField:string, attrValue:any):string {
    switch (attrField) {
      case 'status':
        return attrValue ? (attrValue == 1 ? '停用' : '删除') : '正常'
      default:
        return attrValue
    }
  }

  getAttrConf(item:any): InputTypeDetail {
    if (item.attrField === 'status') {
      return {
        ele: 'el-select',
        eleChild: 'el-option',
        options: [{ label: '正常', value: 0 }, { label: '停用', value: 1 }, { label: '删除', value: 2 }],
        placeholder: '请填写' + item.attrName,
        rule: [{ required: !!item.isNull, message: `请输入${item.attrName}`, trigger: 'blur' }]
      }
    }
    switch (item.attrType) {
      case 1:
        return {
          ele: 'el-input',
          type: 'text',
          placeholder: '请填写' + item.attrName,
          props: { 'show-word-limit': true, maxlength: 50 },
          rule: [{ required: !!item.isNull, message: `请输入${item.attrName}`, trigger: 'blur' }, { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }]
        }
      case 2:
        return {
          ele: 'el-input',
          type: 'textarea',
          placeholder: '请填写' + item.attrName,
          props: { 'show-word-limit': true, maxlength: 200 },
          rule: [{ required: !!item.isNull, message: `请输入${item.attrName}`, trigger: 'blur' }, { min: 1, max: 200, message: '长度在 1 到 50 个字符', trigger: 'blur' }]
        }
      case 3:
        return {
          ele: 'el-input',
          type: 'text',
          placeholder: '请填写' + item.attrName,
          rule: [{
            validator: (rule:any, value:any, callback:any) => {
              console.log(9900, value, item.isNull)
              if (!value) {
                if (item.isNull) {
                  return callback(new Error(`请输入${item.attrName}`))
                } else {
                  return callback()
                }
              }
              if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
                return callback(new Error('请输入正确手机号'))
              }
              return callback()
            },
            trigger: 'blur',
            required: !!item.isNull
          }]
        }
      case 4:
        return {
          ele: 'el-input',
          type: 'text',
          placeholder: '请填写' + item.attrName,
          rule: [{
            validator: (rule:any, value:any, callback:any) => {
              console.log(9900, value, item.isNull)
              if (!value) {
                if (item.isNull) {
                  return callback(new Error(`请输入${item.attrName}`))
                } else {
                  return callback()
                }
              }
              if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
                return callback(new Error('请输入正确的邮箱地址'))
              }
              return callback()
            },
            trigger: 'blur',
            required: !!item.isNull
          }]
        }
      case 5:
        return {
          ele: 'el-input',
          type: 'text',
          placeholder: '请填写' + item.attrName,
          rule: [{
            validator: (rule:any, value:any, callback:any) => {
              console.log(9900, value, item.isNull)
              if (!value) {
                if (item.isNull) {
                  return callback(new Error(`请输入${item.attrName}`))
                } else {
                  return callback()
                }
              }
              if (!/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(value)) {
                return callback(new Error('请输入正确的链接'))
              }
              return callback()
            },
            trigger: 'blur',
            required: !!item.isNull
          }]
        }
      case 6:
        return {
          ele: 'el-input',
          type: 'text',
          placeholder: '请填写' + item.attrName,
          rule: [{
            validator: (rule:any, value:any, callback:any) => {
              console.log(9900, value, item.isNull)
              if (!value) {
                if (item.isNull) {
                  return callback(new Error(`请输入${item.attrName}`))
                } else {
                  return callback()
                }
              }
              if (!/^\d+$/.test(value)) {
                return callback(new Error('请输入正确的链接'))
              }
              return callback()
            },
            trigger: 'blur',
            required: !!item.isNull
          }]
        }
      case 7:
        return {
          ele: 'el-date-picker',
          type: 'date',
          props: { 'value-format': 'yyyy-MM-dd' },
          placeholder: '请填写' + item.attrName,
          rule: [{ required: !!item.isNull, message: `请输入${item.attrName}`, trigger: 'blur' }]
        }
      case 8:
        return {
          ele: 'el-time-select',
          props: { 'value-format': 'HH:mm:ss' },
          placeholder: '请填写' + item.attrName,
          rule: [{ required: !!item.isNull, message: `请输入${item.attrName}`, trigger: 'blur' }]
        }
      case 9:
        return {
          ele: 'el-select',
          eleChild: 'el-option',
          options: item?.attrDictListVOList.map((i:any) => ({ label: i.attrValue, value: i.attrValue })),
          placeholder: '请填写' + item.attrName,
          rule: [{ required: !!item.isNull, message: `请输入${item.attrName}`, trigger: 'blur' }]
        }
      case 10:
        this.detail.form[item.attrField] = []
        return {
          ele: 'el-checkbox-group',
          eleChild: 'el-checkbox',
          options: item?.attrDictListVOList.map((i:any) => ({ label: i.attrValue, value: i.attrValue })),
          placeholder: '请填写' + item.attrName,
          rule: [{ required: !!item.isNull, message: `请输入${item.attrName}`, trigger: 'blur' }]
        }
      case 11:
        return {
          ele: 'el-switch',
          placeholder: '请填写' + item.attrName,
          props: { activeValue: 0, inactiveValue: 1 },
          rule: [{ required: !!item.isNull, message: `请输入${item.attrName}`, trigger: 'blur' }]
        }
      default:
        return {
          ele: 'el-input'
        }
    }
  }

  formatHeader(header:any) {
    return header.map((item:any) => ({ ...item, conf: this.getAttrConf(item) }))
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
      console.log(node)
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
    this.isMoved = true
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

  toFreshTree() {
    this.refreshTree = false
    this.$nextTick(() => {
      this.refreshTree = true
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
      this.toFreshTree()
    })
  }

  async editDetail(row:any) {
    console.log(row)
    const deptDt:any = await deptGet({ deptId: row.parentId, detail: true })
    const data = JSON.parse(JSON.stringify(row))
    Object.keys(row).forEach((k:string) => {
      const item:any = this.tableHeader.find((item:any) => item.attrField === k)
      if (item && item.attrType === 10) {
        data[item.attrField] = data[item.attrField]?.split(',')
      }
    })
    console.log(data)
    this.detail.form = data
    this.detail.form.parent = deptDt
    this.detail.visible = true
    this.detail.isEdit = true
  }

  addDataMethod(ref:string) {
    (this.$refs[ref] as any).validate((valid:boolean) => {
      if (!valid) return
      const addData: {
        [propName:string]: any
      } = {}
      console.log(this.detail.form)
      Object.keys(this.detail.form).forEach((k:string) => {
        const d = (this.detail.form as any)[k]
        addData[k] = Array.isArray(d) ? d.filter(Boolean).toString() : d.toString()
      })
      console.log(addData)
      this[this.detail.isEdit ? 'updateData' : 'addData'](addData).then(() => {
        this.$message({
          type: 'success',
          message: this.detail.isEdit ? '修改成功' : '添加成功'
        })
        this.detail.visible = false
        this.tableData = []
        this.getDeptTop()
        this.toFreshTree()
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
