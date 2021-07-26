/*
 * @Author: yinzhegang
 * @Date: 2021-07-26 10:12:45
 * @LastEditTime: 2021-07-26 15:46:18
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


export interface RoleAddParams {
    creator?: number
    tenantId?: number
    menus?: number[]
    users?:number[]
    depts?:number[]
    roleName:string
    roleDesc?: string
    status:0|1
    accounts?: number[]
    groups?:number[]
}

export const roleAdd = (params: RoleAddParams) =>request.post(url.roleAdd, params)

export interface RoleUpdateParams {
    roleId: number
    creator?: number
    tenantId?: number
    menus?: number[]
    users?:number[]
    depts?:number[]
    roleName:string
    roleDesc?: string
    status:0|1
    accounts?: number[]
    groups?:number[]
}

export const roleUpdate = (params: RoleUpdateParams) =>request.post(url.roleUpdate, params)
