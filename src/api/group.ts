/*
 * @Author: yinzhegang
 * @Date: 2021-07-22 10:23:09
 * @LastEditTime: 2021-07-22 10:42:03
 * @LastEditors: yinzhegang
 * @Description: 
 * @FilePath: \basicServes\src\api\group.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { Params, ListResponse } from '../types/page'
import request from './request'
import url from './url'

export interface GroupListParams extends Params {
    groupName?: string
    creatorName?: string
    type?:number
    startTime?:string
    endTime?:string
}
export const groupList = (params: GroupListParams) =>request.post(url.groupList, params)


export interface GroupAddParams {
    tenantId: number
    creator: number
    groupName:string
    type:number
}
export const groupAdd = (params: GroupAddParams) =>request.post(url.groupAdd, params)


export interface GroupAddMemberParams {
    tenantId: number
    creator: number
    type:number
    groupName:string
    groupId:number
    memberList: number[]
}
export const groupAddMember = (params: GroupAddMemberParams) =>request.post(url.groupAddMember, params)


export interface GroupDeleteMemberParams {
    tenantId: number
    creator: number
    type:number
    groupId:number
    memberList: number[]
}
export const groupDeleteMember = (params: GroupAddMemberParams) =>request.post(url.groupDeleteMember, params)
