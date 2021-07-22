/*
 * @Author: yinzhegang
 * @Date: 2021-07-21 17:24:23
 * @LastEditTime: 2021-07-22 10:13:44
 * @LastEditors: yinzhegang
 * @Description: 
 * @FilePath: \basicServes\src\api\dept.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { Params, ListResponse } from '../types/page'
import request from './request'
import url from './url'

export interface DeptAddParams extends Params {
    deptName: string
    parentId: number
    deptOrder?:number
}
export const deptAdd = (params: DeptAddParams) =>request.post(url.deptAdd, params)

export interface DeptTopParams extends Params {
    tenantId?: number
    detail: boolean
}
export const deptTop = (params: DeptTopParams) =>request.post(url.deptTop, params)

export interface DeptGetParams extends Params {
    tenantId?: number
    detail: boolean
}
export const deptGet = (params: DeptGetParams) =>request.post(url.deptGet, params)

export interface DeptListParams extends Params {
    deptId?: number
    detail: boolean
    fetchChild: boolean
}
export const deptList = (params: DeptListParams) =>request.post(url.deptList, params)

export interface DeptGet_batchParams extends Params {
    deptIds: number[]
    detail?: boolean
}
export const deptGet_batch = (params: DeptGet_batchParams) =>request.post(url.deptGet_batch, params)


export interface DeptOrderParams extends Params {
    items: {deptId:number,deptOrder:number}[]
}
export const deptOrder = (params: DeptOrderParams) =>request.post(url.deptOrder, params)

export interface DeptUpdateParams extends Params {
    deptId:number,
    deptName: string,
    parent:number
}
export const deptUpdate = (params: DeptUpdateParams) =>request.post(url.deptUpdate, params)

export interface DeptDeleteParams extends Params {
    deptId:number
}
export const deptDelete = (params: DeptDeleteParams) =>request.post(url.deptDelete, params)
