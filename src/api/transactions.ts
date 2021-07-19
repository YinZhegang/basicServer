/*
 * @Author: yinzhegang
 * @Date: 2021-06-03 09:57:20
 * @LastEditTime: 2021-07-19 12:12:08
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\api\transactions.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import request from './request'

export const getTransactions = (params: any) =>
  request({
    url: '/transactions',
    method: 'get',
    params
  })
