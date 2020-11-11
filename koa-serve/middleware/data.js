// 处理业务逻辑的中间件
const Axios = require('axios')
const path = require('path')
const fileUtils = require('../utils/file_utils')
// 是否请求本地数据
const isMock = true

// 腾讯疫情数据接口
const txUrl = `https://view.inews.qq.com`
const txUrl2 = `https://api.inews.qq.com/newsqa/v1`
// 中国各省份/直辖市疫情数据接口
const disease_china = `${txUrl}/g2/getOnsInfo?name=disease_h5&callback=jQuery35103183469027416095_1605083705601&_=${+new Date()}` // FIXME: 加Date防止请求到缓存数据
// 当天各类数据统计接口(现有确诊、累计确诊/治愈/死亡、新增确诊/疑似、治愈/死亡率)
const charts = `${txUrl2}/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,cityStatis,nowConfirmStatis,provinceCompare`
// 最新进展新闻接口
const news = `${txUrl2}/automation/modules/list?modules=FAutoNewsArticleList`

module.exports = async (ctx, next) => {
  if (isMock) { // FIXME:返回本地数据
    // 根据url
    const url = ctx.request.url
    let filePath = url.replace('/api', '')
    filePath = '../data' + filePath + '.json'
    filePath = path.join(__dirname, filePath)
    try {
      const ret = await fileUtils.getFileJsonData(filePath)
      ctx.response.body = ret
    } catch (error) {
      const errorMsg = {
        message: '读取文件内容失败，文件资源不存在',
        status: 404
      }
      ctx.response.body = JSON.stringify(errorMsg)
    }

    console.log(filePath)
  } else { // FIXME:请求腾讯疫情数据接口
    // 获取客户端访问的接口地址
    const url = ctx.request.url
    console.log('1.请求接口：', url)
    try {
      // 解析 url
      if (url === '/api/disease_china') {
        const ret = await Axios.get(disease_china)
        console.log(`2.成功请求： ${url}`)
        ctx.response.body = JSON.stringify(ret.data)
      } else if (url === '/api/charts') {
        const ret = await Axios.get(charts)
        console.log(`2.成功请求： ${url}`)
        ctx.response.body = JSON.stringify(ret.data)
      } else if (url === '/api/news') {
        const ret = await Axios.get(news)
        console.log(`2.成功请求： ${url}`)
        ctx.response.body = JSON.stringify(ret.data)
      }
    } catch (error) {
      const errorMsg = {
        message: '请求失败~',
        code: 404
      }
      // 返回错误信息给客户端
      ctx.response.body = JSON.stringify(errorMsg)
    }
  }

  await next()
}