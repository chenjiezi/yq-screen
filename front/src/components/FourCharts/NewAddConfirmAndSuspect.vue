<template>
  <div :style="{height: `${bottomHeight}px`}">
    <div ref="newAddConfirm" class="newAddConfirm"></div>
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
      // console.log('newAddConfirm 组件', newValue)
      this.chartInstance.setOption({
        xAxis: {
          data: newValue.newAddDate
        },
        series: [
          {
            data: newValue.newAddConfirm
          },
          {
            data: newValue.newAddSuspect
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
      this.chartInstance = this.$echarts.init(this.$refs.newAddConfirm)

      const option = {
        title: {
          text: '全国疫情新增趋势',
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
            name: '新增确诊',
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
          {
            name: '新增疑似',
            type: 'line',
            color: '#00FFFF',
            markPoint: {
              data: [
                {
                  type: 'max', name: '最大值',
                  itemStyle: {
                    color: '#00FFFF'
                  }
                }
              ]
            },
            data: []
          }
        ]
      }

      this.chartInstance.setOption(option)
      this.chartInstance.resize()
    }
  }
}
</script>

<style lang="stylus">
  .newAddConfirm
    width 100%
    height 100%
</style>