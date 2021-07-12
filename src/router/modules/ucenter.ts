/*
 * @Author: yinzhegang
 * @Date: 2021-07-06 23:40:33
 * @LastEditTime: 2021-07-12 15:03:06
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\router\modules\ucenter.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const ucenterRoutes: RouteConfig = {
  path: '/ucenter',
  component: Layout,
  redirect: '/ucenter/person',
  name: 'Ucenter',
  meta: {
    title: '用户中心',
    icon: 'user'
  },
  children: [
    {
      path: 'person',
      component: () => import(/* webpackChunkName: "dynamic-table" */ '@/views/ucenter/person/index.vue'),
      name: 'UcenterPerson',
      meta: { title: '人员管理',icon: 'user' }
    },
    {
      path: 'user',
      component: () => import(/* webpackChunkName: "draggable-table" */ '@/views/ucenter/user/index.vue'),
      name: 'UcenterUser',
      meta: { title: '用户管理',icon: 'user' }
    },
    {
      path: 'dept',
      component: () => import(/* webpackChunkName: "inline-edit-table" */ '@/views/ucenter/dept/index.vue'),
      name: 'UcenterDept',
      meta: { title: '部门管理',icon:'tree' }
    },
    {
      path: 'group',
      component: () => import(/* webpackChunkName: "complex-table" */ '@/views/ucenter/group/index.vue'),
      name: 'UcenterGroup',
      meta: { title: '用户组管理',icon:'peoples' }
    },
    {
      path: 'dict',
      component: () => import(/* webpackChunkName: "complex-table" */ '@/views/ucenter/dict/index.vue'),
      name: 'UcenterDict',
      meta: { title: '业务字典',icon:'form' }
    },
    {
      path: 'tag',
      component: () => import(/* webpackChunkName: "complex-table" */ '@/views/ucenter/tag/index.vue'),
      name: 'UcenterTag',
      meta: { title: '标签管理',icon:'tab' }
    }
  ]
}

export default ucenterRoutes
