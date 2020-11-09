<template>
  <div :style="{height: `${bottomHeight}px`}">
    <div ref="nowConfirm" class="nowConfirm"></div>
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
      // console.log('nowConfirm 组件', newValue)
      this.chartInstance.setOption({
        xAxis: {
          data: newValue.date
        },
        series: [
          {
            data: newValue.nowConfirm
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
      this.chartInstance = this.$echarts.init(this.$refs.nowConfirm)

      const option = {
        title: {
          text: '全国现有确诊趋势',
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
            name: '现有确诊',
            type: 'line',
            color: '#FF7F50',
            markPoint: {
              data: [
                {
                  type: 'max', name: '最大值',
                  itemStyle: {
                    color: '#FF7F50'
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
  .nowConfirm
    width 100%
    height 100%
</style>