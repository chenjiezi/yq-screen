<template>
  <div class="container">
    <div class="button-w">
       <Button type="dashed">现有确诊</Button>
       <Button type="dashed">累计确诊</Button>
       <Button type="dashed" @click="revertMap">返回</Button>
    </div>
    <div class='com-chart' ref='map_ref' :style="{width:'100%',height:`${this.mainHeight}px`}"></div>
  </div>
</template>

<script>
import {mapState}  from 'vuex'
import axios from 'axios'
import { getProvinceMapInfo } from '@/utils/map_utils'

export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      mapData: {}, // 所获取的省份的地图矢量数据
      airData: [
        {name:'安徽', value: 30782},
        {name:'陕西', value: 96341},
        {name:'澳门', value: 73372},
        {name:'北京', value: 27025},
        {name:'重庆', value: 96036},
        {name:'福建', value: 45064},
        {name:'甘肃', value: 74033},
        {name:'广东', value: 88561},
        {name:'广西', value: 17762},
        {name:'贵州', value: 1465},
        {name:'海南', value: 23854},
        {name:'河北', value: 4779},
        {name:'黑龙江', value: 19758},
        {name:'河南', value: 29826},
        {name:'湖北', value: 31757},
        {name:'湖南', value: 82317},
        {name:'江苏', value: 76668},
        {name:'江西', value: 15632},
        {name:'吉林', value: 25755},
        {name:'辽宁', value: 82845},
        {name:'内蒙古', value: 26536},
        {name:'宁夏', value: 48668},
        {name:'青海', value: 67131},
        {name:'山东', value: 12835},
        {name:'上海', value: 54042},
        {name:'山西', value: 98034},
        {name:'四川', value: 11406},
        {name:'台湾', value: 286},
        {name:'天津', value: 19592},
        {name:'香港', value: 8560},
        {name:'新疆', value: 41699},
        {name:'西藏', value: 24863},
        {name:'云南', value: 43081},
        {name:'浙江', value: 64862}
      ]
    }
  },
  computed: {
    ...mapState([
      'mainHeight',
    ])
  },
  mounted () {
    axios.get('http://localhost:8888/api/disease_china').then(data => {
      console.log('中国疫情数据：', data.data)
    })
    this.initChart()
    window.addEventListener('resize', this.chartInstance.resize)
  },
  destroyed () {
    window.removeEventListener('resize', this.chartInstance.resize)
  },
  methods: {
    async initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref)
      // 获取中国地图的矢量数据
      // http://localhost:8080/static/map/china.json
      // 由于我们现在获取的地图矢量数据并不是位于KOA2的后台, 所以咱们不能使用this.$http
      const ret = await axios.get('/map/china.json')
      this.$echarts.registerMap('china', ret.data)

      const initOption = {
        title: {
          text: '全国疫情',
          left: 10,
          top: 10
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
          min: 0,
          max: 100000,
          inRange: {
            color: ['white', 'red']
          }
        }
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('click', async arg => {
        // arg.name 得到所点击的省份, 这个省份他是中文
        const provinceInfo = getProvinceMapInfo(arg.name)
        console.log(provinceInfo)
        // 点击省份无数据
        if (!provinceInfo.key) return false
        // 需要获取这个省份的地图矢量数据
        // 判断当前所点击的这个省份的地图矢量数据在mapData中是否存在
        if (!this.mapData[provinceInfo.key]) {
          const ret = await axios.get('http://localhost:8080' + provinceInfo.path)
          this.mapData[provinceInfo.key] = ret.data
          this.$echarts.registerMap(provinceInfo.key, ret.data)
        }
        const changeOption = {
          geo: {
            map: provinceInfo.key
          }
        }
        this.chartInstance.setOption(changeOption)
      })
      this.chartInstance.resize()

    },
    // 回到中国地图
    revertMap () {
      const isChina = this.chartInstance._model.option.geo[0].map === 'china'
      if (isChina) return false // 当前是中国地图，就不初始化图表

      const revertOption = {
        geo: {
          map: 'china'
        }
      }
      this.chartInstance.setOption(revertOption)
    },
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