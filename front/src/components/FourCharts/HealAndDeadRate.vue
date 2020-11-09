<template>
  <div :style="{height: `${bottomHeight}px`}">
    <div ref="healAndDeadRate" class="healAndDeadRate"></div>
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
      // console.log('healAndDeadRate 组件', newValue)
      this.chartInstance.setOption({
        xAxis: {
          data: newValue.date
        },
        series: [
          {
            data: newValue.healRate
          },
          {
            data: newValue.deadRate
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
      this.chartInstance = this.$echarts.init(this.$refs.healAndDeadRate)

      const option = {
        title: {
          text: '治愈率/死亡率',
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
            name: '治愈率',
            type: 'line',
            color: '#00FF00',
            markPoint: {
              data: [
                {
                  type: 'max', name: '最大值',
                  itemStyle: {
                    color: '#00FF00'
                  }
                }
              ]
            },
            data: []
          },
          {
            name: '死亡率',
            type: 'line',
            color: '#808080',
            markPoint: {
              data: [
                {
                  type: 'max', name: '最大值',
                  itemStyle: {
                    color: '#808080'
                  }
                }
              ]
            },
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
  .healAndDeadRate
    width 100%
    height 100%
</style>