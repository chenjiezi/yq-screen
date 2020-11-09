<template>
  <div :style="{height: `${bottomHeight}px`}">
    <div ref="addUpData" class="addUpData"></div>
  </div>
</template>

<script>
import {mapState}  from 'vuex'
export default {
  props: ['dataList'],
  data () {
    return {
      chartInstance: null,
    }
  },
  watch: {
    dataList (newValue, oldValue) {
      console.log('addUpData 组件', newValue)
      this.chartInstance.setOption({
        xAxis: {
          data: newValue.date
        },
        series: [
          {
            name: '累计确诊',
            type: 'line',
            data: newValue.addUpConfirm
          },
          {
            name: '累计治愈',
            type: 'line',
            data: newValue.addUpHeal
          },
          {
            name: '累计死亡',
            type: 'line',
            data: newValue.addUpDead
          }
        ]
      })
    }
  },
  computed: {
    ...mapState([
      'bottomHeight',
    ])
  },
  mounted () {
    this.initChart()
    window.addEventListener('resize', this.chartInstance.resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.chartInstance.resize)
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.addUpData)

      const option = {
        title: {
          text: '全国疫情累计趋势',
          top: 10,
          left: 10
        },
        grid: {
          bottom: 10,
          left: 10,
          right: 10,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          show: true,
          top: 10,
          right: 10
        },
        series: [
          {
            name: '累计确诊',
            type: 'line',
            color: '#FF7F50',
            data: []
          },
          {
            name: '累计治愈',
            type: 'line',
            color: '#00FF00',
            data: []
          },
          {
            name: '累计死亡',
            type: 'line',
            color: '#808080',
            data: []
          },
        ]
      }

      this.chartInstance.setOption(option)
      this.chartInstance.resize()
    }
  }
}
</script>

<style lang="stylus">
  .addUpData
    width 100%
    height 100%
</style>