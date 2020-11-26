<template>
  <div class="container">
    <div class="button-w">
      <Button :type="BtnType.now" @click="switchMap('now')">现有确诊</Button>
      <Button :type="BtnType.all" @click="switchMap('all')">累计确诊</Button>
      <Button type="dashed" v-if="!isChina" @click="revertMap">返回</Button>
    </div>
    <div class='com-chart' ref='map_ref' :style="{width:'100%',height:`${mainHeight}px`}"></div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import {mapState}  from 'vuex'
import { getProvinceMapInfo } from '@/utils/map_utils'

export default {
  data () {
    return {
      // 按钮类型
      BtnType: {
        now: 'primary',
        all: 'dashed'
      },
      spinShow: false,
      isChina: true,
      chartInstance: null,
      allData: null,
      mapData: {}, // 所获取的省份的地图矢量数据
      dataList: {}, // 疫情总数据
      airData: [], // 当前地图疫情数据
      currentMapArea: '中国'
    }
  },
  computed: {
    ...mapState([
      'mainHeight',
    ])
  },
  mounted () {
    /* 
      1.请求疫情数据 =》 地图：显示现有确诊
      2.切换全国或者省份的现有/累计确诊数据的地图展示
    */
    this.spinShow = true // 开启地图加载动画
    this.initChart()
    this.getData().then((res) => {
      this.dataList = res
      this.revertMap()
    }).finally(() => {
      this.spinShow = false // 关闭地图加载动画
    })
    window.addEventListener('resize', this.chartInstance.resize)
  },
  destroyed () {
    window.removeEventListener('resize', this.chartInstance.resize)
  },
  methods: {
    async initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref)
      // 获取中国地图的矢量数据
      const ret = await this.$axios.get('/map/china.json')
      this.$echarts.registerMap('china', ret.data)

      const initOption = {
        title: {
          text: '全国疫情',
          left: 10,
          top: 10
        },
        tooltip: {
          show:true,
          formatter: '{b}</br>确诊人数：{c}'
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          roam: false, // true允许地图缩放
          itemStyle: {
            areaColor: '#fff',
            borderColor: '#555'
          },
          label: {
            show: true
          }
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical'
        },
        series: [
          {
            data: this.airData,
            geoIndex: 0,
            type: 'map'
          }
        ],
        visualMap: {
          pieces: [
            {min: 10000},
            {min: 1000, max: 9999},
            {min: 500, max: 999},
            {min: 100, max: 499},
            {min: 10, max: 99},
            {min: 1, max: 9},
            {max: 0},
          ],
          inRange: {
            color: ['white', 'red']
          }
        }
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('click', async arg => {
        // arg.name 得到所点击的省份, 这个省份他是中文
        const provinceInfo = getProvinceMapInfo(arg.name)
        console.log(provinceInfo.name)
        // 点击省份无数据
        if (!provinceInfo.key) return false
        // 需要获取这个省份的地图矢量数据
        // 判断当前所点击的这个省份的地图矢量数据在mapData中是否存在
        if (!this.mapData[provinceInfo.key]) {
          const ret = await this.$axios.get('http://localhost:8080' + provinceInfo.path)
          this.mapData[provinceInfo.key] = ret.data
          this.$echarts.registerMap(provinceInfo.key, ret.data)
        }
        // 当前地图区域
        this.currentMapArea = arg.name
        
        const res = this.setData()
        
        const changeOption = {
          geo: { map: provinceInfo.key },
          series: [{ data: res }]
        }
        this.chartInstance.setOption(changeOption)
        this.isChina = false
      })
      this.chartInstance.resize()
    },
    // 回到中国地图
    revertMap () {
      this.isChina = true
      this.currentMapArea = '中国'
      
      const revertOption = {
        geo: { map: 'china' },
        series: [{ data: this.setData() }]
      }
      this.chartInstance.setOption(revertOption)
    },
    // 切换地图数据：现有/累计确诊
    switchMap (type) {
      if (type === 'now') { // 现有确诊
        this.BtnType = { now: 'primary', all: 'dashed'}
      } else if (type === 'all') { // 累计确诊
        this.BtnType = { now: 'dashed', all: 'primary'}
      }
      
      const revertOption = {
        series: [{ data: this.setData() }]
      }
      this.chartInstance.setOption(revertOption)
    },
    // 获取疫情数据
    getData () {
      return  this.$axios.get('http://localhost:8888/api/disease_china').then(res => {
        if (res.data) {
          let str = res.data.split('(')[1]
          str = JSON.parse(str.slice(0, str.length - 1))
          const data = JSON.parse(str.data)
          return data.areaTree[0]
        }
      })
    },
    // 设置地图疫情数据
    setData () {
      const res = []
      const isNow = this.BtnType.now === 'primary' ? true : false
      if (this.currentMapArea === '中国') {
        this.dataList.children.forEach(item => {
          const { name, total: { nowConfirm, confirm } } = item
          res.push({ name: name, value: (isNow ? nowConfirm : confirm) })
        })
        return res
      } else { // 省份
        this.dataList.children.forEach(item => {
          if (item.name === this.currentMapArea) {
            item.children.forEach(itemx => {
              const { name, total: { nowConfirm, confirm } } = itemx
              res.push({ name: name, value: (isNow ? nowConfirm : confirm) })
            })
            // FIXME:echarts的地图组件有提供地区板块，而腾讯疫情数据没提供这个地图的数据，就导致确诊数量显示NAN
            if (item.name === '广东') {
              res.push({ name: '云浮', value: 0 })
            }
          }
        })
        return res
      }
    }
  }
}
</script>

<style lang="stylus">
  .container 
    position relative
    .button-w
      position absolute
      top 10px
      left 100px
      z-index 1
      &>*
        margin-right 12px
</style>