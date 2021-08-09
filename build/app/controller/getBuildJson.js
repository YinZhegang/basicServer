/*
 * @Author: yinzhegang
 * @Date: 2021-08-06 14:27:07
 * @LastEditTime: 2021-08-06 14:40:04
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\build\app\controller\getBuildJson.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const buildJson = require('../../../src/setting.json')

module.exports = async(ctx, next) => {
  ctx.response.body = buildJson
  ctx.response.status = 200
  //   ctx.status = 200
  next()
}
