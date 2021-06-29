/*
 * @Author: yinzhegang
 * @Date: 2021-06-04 14:54:19
 * @LastEditTime: 2021-06-08 10:25:12
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\modules\ailink\router\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { RouteConfig } from 'vue-router'

const aiRoute: RouteConfig = 
  {
    path: '/ailink',
    name: 'ailink',
    meta: {
      meta: '爱联络',
      icon: 'user',
      noCache: true
    },
    children: [
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "profile" */ './views/ai/List.vue'),
        name: 'ailist',
        meta: { title: '爱联络' }
      }
    ]
  }
export default aiRoute
