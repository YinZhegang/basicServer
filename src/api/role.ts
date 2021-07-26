/*
 * @Author: yinzhegang
 * @Date: 2021-07-26 10:12:45
 * @LastEditTime: 2021-07-26 10:21:13
 * @LastEditors: yinzhegang
 * @Description: 
 * @FilePath: \basicServes\src\api\role.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { Params, ListResponse } from '../types/page'
import request from './request'
import url from './url'

export interface RoleListParams extends Params {
    roleId?: number
    tenantId?: number
    userId?: number
    roleName?:string
    status?:1|2
}
export const roleList = (params: RoleListParams) =>
  request.post(url.roleList, params)
