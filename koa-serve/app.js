// 服务器的入口文件
// 1.创建KOA的实例对象
const Koa = require('koa')
const app = new Koa()
// 2.绑定中间件
// 第一层中间件：计算服务器响应耗时
const respDurationMiddleware = require('./middleware/koa_response_duration')
app.use(respDurationMiddleware)
// 第二层中间件：设置响应头部header
const respHeaderMiddleware = require('./middleware/koa_response_header')
app.use(respHeaderMiddleware)
// 第三层中间件：处理业务逻辑
const respDataMiddleware = require('./middleware/koa_response_data')
app.use(respDataMiddleware)
// 3.绑定端口号 8888
app.listen(8888, () => {
  console.log('服务启动成功~')
})

