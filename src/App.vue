<!--
 * @Author: yinzhegang
 * @Date: 2021-06-03 09:57:20
 * @LastEditTime: 2021-07-20 12:59:56
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\App.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div id="app">
    <router-view />
    <service-worker-update-popup />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue'

@Component({
  name: 'App',
  components: {
    ServiceWorkerUpdatePopup
  }
})
export default class extends Vue {}
</script>
<style lang="scss">
 .el-dialog__header{
  border-bottom: 1px solid #EBEEF5;
  padding: 15px;
}

</style>
