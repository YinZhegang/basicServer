/*
 * @Author: yinzhegang
 * @Date: 2021-08-03 16:37:27
 * @LastEditTime: 2021-08-03 17:41:14
 * @LastEditors: yinzhegang
 * @Description:
 * @FilePath: \basicServes\build\app\controller\index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
// const exec = require('child_process').exec

module.exports = async(ctx, next) => {
//   console.log(__dirname)
//   exec('cd D:/work/basicServes', function(error, stdout, stderr) {
//     exec('npm run build:prod', function(error, stdout, stderr) {

  //     })
  //   })
  await ctx.render('view/index', {
    title: 'pp'
  })
}
