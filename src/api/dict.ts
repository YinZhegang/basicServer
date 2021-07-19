/*
 * @Author: yinzhegang
 * @Date: 2021-07-19 10:46:33
 * @LastEditTime: 2021-07-19 12:11:55
 * @LastEditors: yinzhegang
 * @Description: 
 * @FilePath: \basicServes\src\api\dict.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { pageParam}  from "@/src/types/page"
import request from './request'

export const getArticles = (params: any) =>
  request({
    url: '/articles',
    method: 'get',
    params
  })
