<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-30 16:42:18
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\ucenter\dict\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div>
    <el-dialog :before-close="(d)=>{$refs.userAddForm.clearValidate();d()}" :visible.sync="userData.detail.visible" :title="(userData.detail.isEdit?'编辑':'添加')+(userData.detail.form.form==1?'用户字段':'部门字段')">
      <el-form style="width:50%;margin:0 auto" ref="userAddForm" size="small" :rules="userData.detail.rules" :model="userData.detail.form" label-width="100px">
          <el-form-item prop="attrName" label="字段名称">
              <el-input
                type="text"
                placeholder="请输入字段名称"
                v-model="userData.detail.form.attrName"
                maxlength="10"
                style="width:200px"
                show-word-limit
                />
          </el-form-item>
           <el-form-item prop="attrType" label="字段类型">
              <el-select :disabled="userData.detail.isEdit" v-model="userData.detail.form.attrType" placeholder="请选择字段类型">
                  <el-option :key="'userData.detail.form.attrType'+ i" v-for="(i,index) in AttrTypeArr" :label="i" :value="index"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item  v-if="userData.detail.form.attrType==9||userData.detail.form.attrType==10" prop="tagList" label="选项">
              <el-tag
                :key="tag + index"
                v-for="(tag,index) in userData.detail.form.tagList"
                closable
                style="margin:1px"
                :disable-transitions="false"
                @close="(tag)=>{

                  userData.detail.form.tagList.splice(userData.detail.form.tagList.indexOf(tag), 1);
                  if(userData.detail.isEdit){
                      if(tag.id) {
                        if(userData.detail.form.deleteDictList){
                          userData.detail.form.deleteDictList.push(tag.id)
                        }else{
                            userData.detail.form.deleteDictList =[tag.id]
                        } 
                      } 
                  }
                  }">
                {{tag.attrValue}}
              </el-tag>
              <el-input
                  class="input-new-tag"
                  v-if="tagList.inputVisible"
                  v-model="tagList.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
               <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button> 
          </el-form-item>
          <el-form-item prop="isNull" label="必填">
              <el-switch :inactive-value="0" :active-value="1" v-model="userData.detail.form.isNull"></el-switch>
          </el-form-item>
          <el-form-item prop="isListShow" label="展示在列表">
              <el-switch :inactive-value="1" :active-value="0" v-model="userData.detail.form.isListShow"></el-switch>
          </el-form-item>
          <el-form-item>
              <el-button @click="attrAddMethod(userData.detail.form.form,'userAddForm')" type="primary">确定</el-button>
              <el-button @click="()=>{$refs.userAddForm.clearValidate();userData.detail.visible = false}">取消</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
    <div style="position:absolute;right:15px;z-index:1999">
    <el-button-func  @click="()=>{userData.detail.isEdit = false;userData.detail.form = {tenantId:1,form:2,tagList:[]};userData.detail.visible = true}" size="small" style="float: right" icon="el-icon-plus"
        >新增部门字段</el-button-func>
    <el-button-func @click="()=>{userData.detail.isEdit = false;userData.detail.form = userData.detail.form = {tenantId:1,form:1,tagList:[]};userData.detail.visible = true}" size="small" style="float: right;margin:0  5px" icon="el-icon-plus"
        >新增用户字段</el-button-func>
    </div>

        
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="用户字段" name="user">
        <el-table
          v-loading="userData.loading"
          border
           stripe
           size="small"
          :header-cell-style="{
            background: '#f7f8f9',
            color: '#333',
            borderBottom: '1px solid #d7dbe6'
          }"
          :data="userData.list"
        >
          <el-table-column align="center" width="55" prop="attrOrder" label="序号" />
          <el-table-column align="center" prop="attrName" label="字段名称" />
          <el-table-column align="center" prop="attrType" label="类型" >
            <template slot-scope="scope">
                {{AttrTypeArr[scope.row.attrType]}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="isNull" label="必填" >
          <template slot-scope="scope">
                {{scope.row.isNull?'必填':'非必填'}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="attrField" label="属性类型" >
            <template slot-scope="scope">
                {{scope.row.isDefault?'自定义属性':'默认属性'}}
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            align="center"
            label="排序"
          >
            <template slot-scope="scope">
              <el-button-group size="mini">
                <el-button  @click="sort(1,scope,1)" size="mini" icon="el-icon-arrow-up"></el-button>
                <el-button @click="sort(1,scope,0)" size="mini" icon="el-icon-arrow-down"></el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <i @click="editDetail(1, scope.row)"  class="el-icon-edit func-opr"></i>
              <el-divider direction="vertical"></el-divider>
              <el-button size="mini" :disabled="!scope.row.isDefault" type="text" style="color:#000;font-size:16px" @click="deleteData({...scope.row,form:1})"><i class="el-icon-delete" ></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="部门字段" name="dept">
          <el-table
          v-loading="deptData.loading"
          border
            stripe
           size="small"
          :header-cell-style="{
            background: '#f7f8f9',
            color: '#333',
            borderBottom: '1px solid #d7dbe6'
          }"
          :data="deptData.list"
        >
          <el-table-column align="center" width="55" prop="attrOrder" label="序号" />
          <el-table-column align="center" prop="attrName" label="字段名称" />
          <el-table-column align="center" prop="attrType" label="类型" >
            <template slot-scope="scope">
                {{AttrTypeArr[scope.row.attrType]}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="isNull" label="必填" >
            <template slot-scope="scope">
                {{scope.row.isNull?'必填':'非必填'}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="attrField" label="属性类型" >
            <template slot-scope="scope">
                {{scope.row.isDefault?'自定义属性':'默认属性'}}
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            align="center"
            label="排序"
          >
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" @click="sort(2,scope,1)" icon="el-icon-arrow-up"></el-button>
                <el-button size="mini"  @click="sort(2,scope,0)" icon="el-icon-arrow-down"></el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <i @click="editDetail(2, scope.row)" class="el-icon-edit func-opr"></i>
              <el-divider direction="vertical"></el-divider>
              <el-button size="mini" :disabled="!scope.row.isDefault" type="text" style="color:#000;font-size:16px" @click="deleteData({...scope.row,form:2})"><i class="el-icon-delete" ></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { attrList, AttrListParams, attrAdd, AttrAddParams,attrVerify,attrUpdate,AttrUpdateParams,attrDelete,attrSort } from '@/api/dict'
import { ListData } from '../../../types/page'

@Component({
  name: 'dict'
})
export default class extends Vue {
  activeName: 'user' | 'dept' = 'user';
  disabledIcon={
     color:'#f4f4f5'
  }
  userData: ListData<AttrListParams, any> = {
    type:'user',
    getList: attrList,
    addData:attrAdd,
    deleteData:attrDelete,
    params: {
      current: 1,
      size: 100,
      form: 1,
      tenantId: 1
    },
    detail:{
      form:{tenantId:183,form:1,creator:973,tagList:[]},
      isEdit:false,
      rules:{
        attrName:[
          { required: true, message: '请输入字段名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        attrType:  { required: true, message: '请输入字段名称', trigger: 'blur' },
        tagList: { required: true, message: '请填写选项', trigger: 'blur' },
        isNull: { required: true, message: '请填写是否必填', trigger: 'blur' },
        isListShow: { required: true, message: '请填写是否展示在列表', trigger: 'blur' },
      },
      visible:false
    },
    list: [],
    total: 0,
    loading: false
  };

  deptData: ListData<AttrListParams, any> = {
    type:'dept',
    getList: attrList,
    addData:attrAdd,
    params: {
      current: 1,
      size: 100,
      form: 2,
      tenantId: 1
    },
    detail:{
      form:{tenantId:1,form:1,tagList:[]},
      isEdit:false,
      rules:{
        
      },
      visible:false
    },
    list: [],
    total: 0,
    loading: false
  };
  AttrTypeArr:Array<string> = [
    '默认属性','单行文本', '多行文本','手机号','邮箱','超链接','数字','日期','时间','下拉选择','多项选择','开关'
  ]
  tagList = {
    inputVisible: false,
    inputValue:'',
   
  }
  editDetail(form:number,row:any){
    const data = JSON.parse(JSON.stringify(row))
     this.userData.detail.isEdit = true
     this.userData.detail.form = data
     this.userData.detail.form.form = form
     this.userData.detail.form.tagList = data.attrDictListVOList
     this.userData.detail.visible = true
  }
  async attrAddMethod(form:1|2,ref:string){
     var tip=()=>{
          this.$message({
            message: `${this.userData.detail.isEdit?'修改':'添加'}成功`,
            type: 'success'
          });
         }
    (<any>this.$refs[ref]).validate((valid:boolean) =>{
       if(!valid) return
       attrVerify({form,tenantId:1}).then(res=>{
         this.userData.detail.form.attrField = res.attrField
         this.userData.detail.form.creator =524
           console.log( this.userData.detail.form)
         if(this.userData.detail.isEdit){
           this.userData.detail.form.tenantId =1
              attrUpdate(this.userData.detail.form).then(()=>{
                this.refreshData(form)
                 tip()
              })
         }else{
            this.userData.detail.form.expandValueList = this.userData.detail.form.tagList.map((i:any)=>i.attrValue)
            this.userData.addData((<any>this.userData.detail).form).then(()=>{
               this.refreshData(form)
               tip()
            })
         }
        
         
         this.userData.detail.visible = false
       })
      
       console.log((<any>this.userData.detail).form)
      
    })
  }
  // type: 1为向上调   0为向下
  sort(form:number,scope:any,type:number =0){
    const dA = form==1?'userData':'deptData'
    var idx = scope.$index
    if(type&&idx==0) return
    if(type==0&&idx==this[dA].list.length) return
    attrSort({
       form,
       tenantId:183,
       currentAttrId: this[dA].list[idx].attrId,
       currentAttrOrder:this[dA].list[idx].attrOrder,
       laterAttrId:this[dA].list[type?idx-1:idx+1].attrId,
       laterAttrOrder:this[dA].list[type?idx-1:idx+1].attrOrder
    }).then(()=>{
      this.refreshData(form)
    })
  }
  showInput(){
    this.tagList.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
  }
  deleteData(row:any){
    attrDelete({...row,tenantId:1}).then(()=>{
      this.$message({
        type:'success',
        message:'删除成功'
      })
      this.refreshData(row.form)
    })
   
  }
   handleInputConfirm(){
        let inputValue = this.tagList.inputValue;
        if((this.userData.detail as any).form.tagList.find((i:any)=>i.attrValue == inputValue)) {
            this.tagList.inputVisible = false;
            this.tagList.inputValue = '';
            return
        }
        if (inputValue) {
         (this.userData.detail as any).form.tagList.push({attrValue:inputValue});
         if(this.userData.detail.form.addDictList){
            this.userData.detail.form.addDictList.push(inputValue)
         }
         else{
           this.userData.detail.form.addDictList=[inputValue]
         }
         
        }
        this.tagList.inputVisible = false;
        this.tagList.inputValue = '';
    }
  created() {
    this.refreshData(1);this.refreshData(2)
  }
  refreshData(form:number):void{
     attrList(<AttrListParams>this[form==1?'userData':'deptData'].params).then((res:any)=>{
      this[form==1?'userData':'deptData'].list = res.records
    })
  }
}
</script>

<style scoped>
el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 2px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  >>>.el-tabs__header{
     margin-bottom:8px
  }
</style>
