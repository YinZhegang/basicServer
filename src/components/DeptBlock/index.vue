<!--
 * @Author: your name
 * @Date: 2021-07-11 14:58:20
 * @LastEditTime: 2021-07-11 15:20:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \basic-serves\src\components\DeptBlock\index.vue
-->
<template>
  <div :style="{marginLeft: '10px', marginRight: '10px', flex: 1}">
    <p>{{ title }}</p>
    <div
      :style="{
        height: '350px',
        backgroundColor: '#eee',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '15px'
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  name: 'DeptBlock'
})
export default class extends Vue {
  @Prop({ required: true }) private title!: string;
}
</script>

<style>
</style>
