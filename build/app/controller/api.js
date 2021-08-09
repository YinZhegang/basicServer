/*
 * @Author: yinzhegang
 * @Date: 2021-08-06 14:13:58
 * @LastEditTime: 2021-08-06 14:33:12
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\build\app\controller\api.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const buildJson = require('../../../src/setting.json')

exports.getBuildJson = async(ctx, next) => {
  ctx.data = buildJson
  ctx.status
  next()
}
