<!--
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:54:52
 * @LastEditTime: 2021-07-28 09:37:42
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\views\auth\data\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
    <el-card>
      <choose-member title="选择部门" :type="['depts']" :visible.sync="outerVisible"></choose-member>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'data',
  components: {
    ChooseMember: () => import('@/components/ChooseItems/index.vue')
  }
})
export default class extends Vue {
  outerVisible = true
}
</script>

<style>

</style>
