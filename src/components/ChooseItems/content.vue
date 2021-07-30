<!--
 * @Author: yinzhegang
 * @Date: 2021-07-12 11:41:59
 * @LastEditTime: 2021-07-29 17:56:14
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\components\ChooseItems\content.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
     <div class="main-content">
          <div class="main-dept" :style="{border: (type.includes('dept')&&type.length ===1)?'none':''}">
            <!-- <el-input  placeholder="请输入内容"
              prefix-icon="el-icon-search" size="mini" v-model="serachKey"></el-input> -->
            <el-breadcrumb  separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>
                  <span class="breadcrumb-item-span" @click="loadTopDept">首页</span>
                </el-breadcrumb-item>
                <el-breadcrumb-item :key="'breadcrumb-item' +index" v-for="(item,index) in deptBread">
                  <span class="breadcrumb-item-span" @click="() => {
                    deptBread =  deptBread.slice(0,deptBread.indexOf(item))
                    loadMoreDeptList(item)
                    }">{{item.deptName}}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div v-loading="loading" class="main-dept-list">
              <comment :is="getChooseComType" v-model="deptSelection">
                <comment :is="getChooseItemType"  :key="'deptList' +idx" v-for="(dept,idx) in deptList" :label="dept">
                  <div @click="(type.includes('dept')&&type.length ===1)&&getOneDept(dept)" class="main-dept-list-item">
                    <div><svg-icon :style="{color: theme}" name="tree" /><p>{{dept.deptName}}</p></div>
                    <p @click.stop.prevent="loadMoreDeptList(dept)" :style="{color: theme}"><svg-icon name="tree-table" />&nbsp;下级</p>
                   </div>
                </comment>
              </comment>

              <!-- <comment :is="getChooseComType" v-model="groupSelection">
                <comment :is="getChooseItemType"  :key="'deptList' +idx" v-for="(dept,idx) in deptList" :label="dept">
                  <div @click="(type.includes('dept')&&type.length ===1)&&getOneDept(dept)" class="main-dept-list-item">
                    <div><svg-icon :style="{color: theme}" name="tree" /><p>{{dept.deptName}}</p></div>
                    <p @click.stop.prevent="loadMoreDeptList(dept)" :style="{color: theme}"><svg-icon name="tree-table" />&nbsp;下级</p>
                   </div>
                </comment>
              </comment> -->
            </div>
          </div>
          <div v-if="!(type.includes('dept')&&type.length ===1)" class="main-choose">
             <p style="line-height:0">已选</p>
             <div class="main-choose-added">
              <div :key="'deptSelectionSelected'+ index" v-for="(dept, index) in deptSelectionSelected" class="main-dept-list-item">
                   <div><svg-icon :style="{color: theme}" name="tree" /><p>{{dept.deptName}}</p></div>
                   <i @click="canceled('dept',dept)" class="el-icon-close" style="cursor: pointer;" />
               </div>
               <!-- <div v-for="i in 5" class="main-dept-list-item">
                   <div><svg-icon :style="{color: theme}" name="user" /><p>王小帅</p></div>
                   <i class="el-icon-close" />
               </div> -->
             </div>
             <div style="text-align:center;margin-top:10px">
                    <el-button size="mini">取消</el-button>
                    <el-button @click="sure" size="mini" type="primary">确定</el-button>
             </div>
          </div>
      </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { SettingsModule } from '@/store/modules/settings'
import { deptTop, deptList } from '@/api/dept'
import { groupList } from '@/api/group'
@Component({
  name: 'ChooseContent'
})
export default class extends Vue {
  @Prop({ default: () => ['dept'] }) type?: string[] // dept depts user users group groups
  @Prop({ default: '' }) searchType = ''

   serachKey = '' // 搜索关键词
   // 获取主题颜色
   get theme() {
     return SettingsModule.theme
   }

   get getChooseComType():string {
     if (this.type?.includes('depts')) return 'el-checkbox-group'
     return 'div'
   }

   get getChooseItemType():string {
     if (this.type?.includes('depts')) return 'el-checkbox'
     return 'div'
   }

   loading = false
   deptBread:any[] = []
   deptList = []
   deptSelection=[]
   deptSelectionSelected = []
   loadMoreDeptList(dept:any) {
     this.loading = true
     deptList({
       deptId: dept.deptId,
       detail: true
     }).then((res:any) => {
       this.deptList = res
       this.deptBread.push(dept)
       this.fillBox('dept', this.deptList)
       this.$nextTick(() => {
         this.loading = false
       })
     })
   }

   canceled(type = 'dept', item:any) {
     this[type + 'SelectionSelected'].splice(item, 1)
     this[type + 'Selection'].splice(item, 1)
   }

   @Watch('deptSelection')
   deptSelectionChange(n:any, o:any) {
     if (n.length > o.length) {
       this.selected('dept', n)
     } else {
       this.unSelected('dept', n, o)
     }
   }

   unSelected(type = 'dept', n:any, o:any) {
     console.log(n, o)
     const spliceItems = o.filter(i => n.findIndex(f => f[type + 'Id'] == i[type + 'Id']) < 0)
     //  this.canceled('dept', spliceItems)
     console.log(99, this.loading)
     if (this.loading) return
     spliceItems.forEach(i => {
       this[type + 'SelectionSelected'].splice(this[type + 'SelectionSelected'].findIndex(f => f[type + 'Id'] == i[type + 'Id']), 1)
     })
     //  this[type+'SelectionSelected'].splice(,)
   }

   selected(type = 'dept', arr:any) {
     this[type + 'SelectionSelected'] = this.uniqueObjArr([...this[type + 'SelectionSelected'], ...arr], type + 'Id')
   }

   uniqueObjArr(arr:any[], key:string) {
     console.log(arr, key)
     const arrOk:any = []
     arr.forEach((item) => {
       if (!(
         arrOk.find((i:any) => i[key] === item[key])
       )) arrOk.push(item)
     })
     console.log(arrOk)
     return arrOk
   }

   userList =[]
   created() {
     this.loadTopDept()
   }

   loadTopDept() {
     this.loading = true
     deptTop({ tenantId: 183, detail: true }).then((res:any) => {
       this.deptBread = []
       this.deptList = [res]
       // console.log(res)
       this.fillBox('dept', this.deptList)
       this.$nextTick(() => {
         this.loading = false
       })
     })
   }

   fillBox(type:string, list:any) {
     this[type + 'Selection'] = list.filter((it:any) => this[type + 'SelectionSelected'].find((f:any) => f[type + 'Id'] === it[type + 'Id']))
   }

   getOneDept(dept:any) {
     this.$emit('get-one-dept', dept)
   }

   sure() {
   }
}
</script>

<style scoped>
::-webkit-scrollbar{
  width: 0;
}
.el-checkbox{
  display: inline-block;
  width: 100%;
}
/deep/ .el-checkbox-group .el-checkbox .el-checkbox__label{
  display: inline-block;
  width: calc(100% - 10px);
}
.breadcrumb-item-span{
  font-weight: 600;
  cursor: pointer;
}
.breadcrumb-item-span:hover{
  color: rgb(24, 144, 255);
}
.main-content{
    display: flex;
}
.main-dept{
    flex: 1;
    margin-right: 10px;
    border-right: 1px solid #EBEEF5;
    padding: 10px;
}
.main-choose{
    flex: 1;
}
.main-choose-added{
   height: 400px;
   border: 1px solid #EBEEF5;
   background-color: #F2F6FC;
   border-radius: 4px;
   padding: 10px;
   overflow: auto;
}
.main-dept-list{
  height: 400px;
  overflow-y: auto;
}
.main-dept-list-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 5px;
    cursor:pointer
}
.hover:hover{
    background-color: #EBEEF5;
}
.hover{
  cursor: pointer;
}
.main-dept-list-item > div{
  display: flex;
  align-items: center;
}
.main-dept-list-item > div>p{
  margin-left: 10px;
}
>>>.el-dialog__body{
   padding-top: 10px;
}
</style>
