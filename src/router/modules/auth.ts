/*
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:40:33
 * @LastEditTime: 2021-07-12 15:04:58
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\router\modules\auth.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const authRoutes: RouteConfig = {
  path: '/auth',
  component: Layout,
  redirect: '/auth/role',
  name: 'Ucenter',
  meta: {
    title: '权限管理',
    icon: 'tree-table'
  },
  children: [
    {
      path: 'role',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/auth/role/index.vue'),
      name: 'AuthRole',
      meta: { title: '角色管理',icon: 'user' }
    },
    {
      path: 'func',
      component: () => import(/* webpackChunkName: "draggable-table" */ '@/views/auth/func/index.vue'),
      name: 'AuthFunc',
      meta: { title: '功能权限',icon: 'component' }
    },
    {
      path: 'data',
      component: () => import(/* webpackChunkName: "inline-edit-table" */ '@/views/auth/data/index.vue'),
      name: 'AuthData',
      meta: { title: '数据权限',icon: 'documentation' }
    }
  ]
}

export default authRoutes
