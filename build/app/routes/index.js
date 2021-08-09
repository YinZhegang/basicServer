/*
 * @Author: yinzhegang
 * @Date: 2021-08-03 16:38:19
 * @LastEditTime: 2021-08-06 14:33:40
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\build\app\routes\index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const router = require('koa-router')()

const Index = require('../controller/index')
const Build = require('../controller/build')
const api = require('../controller/api')
const getBuildJson = require('../controller/getBuildJson')

router.get('/', Index).post('/build', Build)

router.post('/getBuildJson', getBuildJson)

router.get('/json', async(ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
