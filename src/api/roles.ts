/*
 * @Author: yinzhegang
 * @Date: 2021-06-03 09:57:20
 * @LastEditTime: 2021-07-19 12:11:42
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\src\api\roles.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import request from './request'

export const getRoles = (params: any) =>
  request({
    url: '/roles',
    method: 'get',
    params
  })

export const createRole = (data: any) =>
  request({
    url: '/roles',
    method: 'post',
    data
  })

export const updateRole = (id: number, data: any) =>
  request({
    url: `/roles/${id}`,
    method: 'put',
    data
  })

export const deleteRole = (id: number) =>
  request({
    url: `/roles/${id}`,
    method: 'delete'
  })

export const getRoutes = (params: any) =>
  request({
    url: '/routes',
    method: 'get',
    params
  })
