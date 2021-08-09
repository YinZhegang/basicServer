/*
 * @Author: yinzhegang
 * @Date: 2021-08-03 16:30:18
 * @LastEditTime: 2021-08-06 10:53:47
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\build\app.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./app/routes/index')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// eslint-disable-next-line node/no-path-concat
app.use(require('koa-static')(__dirname + '/public'))

// eslint-disable-next-line node/no-path-concat
app.use(views(__dirname + '/app', {
  extension: 'ejs'
}))

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
