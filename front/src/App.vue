<template>
  <div id="app">
    <div class="header" :style="{height: `${headerHeight}px`}">
      <h1 class="title">-</h1>
    </div>
    <div class="main" :style="{height: `${mainHeight + mainPadding}px`}">
      <Row type="flex" justify="space-around" class-name="i-row"> 
        <i-Col span="6" class-name="i-col">
          <Card :padding="0">
            <NewsList></NewsList>
          </Card>
        </i-Col>
        <i-Col span="11" class-name="i-col">
          <Card :padding="0">
            <Map></Map>
          </Card>
        </i-Col>
        <i-Col span="6" class-name="i-col">
          <Card :padding="0">
            <Rank></Rank>
          </Card>
        </i-Col>
      </Row>
    </div>
    <div class="bottom" :style="{height: `${bottomHeight + bottomPadding}px`}">
      <FourCharts></FourCharts>
    </div>
  </div>
</template>

<script>
import NewsList from '@/components/NewsList.vue'
import Map from '@/components/Map.vue'
import Rank from '@/components/Rank.vue'
import FourCharts from '@/components/FourCharts.vue'
import {mapState}  from 'vuex'
export default {
  name: 'App',
  components: {
    NewsList,
    Map,
    Rank,
    FourCharts
  },
  data () {
    return {
      mainPadding: 12 * 2,
      bottomPadding: 10 * 2,
    }
  },
  computed: {
    ...mapState([
      'headerHeight',
      'mainHeight',
      'bottomHeight'
    ])
  },
  methods: {
    // 计算 main bottom 容器高度
    calcHeight () {
      console.log('this：', this)
      this.mainPadding = 12 * 2
      this.bottomPadding = 10 * 2
      let innerHeight = window.innerHeight - this.mainPadding - this.bottomPadding
      let mainHeight = +((innerHeight - 55) * 0.7).toFixed(0)
      let bottomHeight = +(innerHeight - 55 -  mainHeight).toFixed(0)
      this.$store.commit('mainHeight', mainHeight)
      this.$store.commit('bottomHeight', bottomHeight)
    },
    // 防抖：防止resize事件频繁触发函数
    debounce (fn, timeout = 800) {
      var t = null
      return function () {
        if (t) {
          clearTimeout(t)
        }
        t = setTimeout(function () {
          fn()
        }, timeout)
      }
    }
  },
  created () {
    this.calcHeight()
    window.addEventListener('resize', this.calcHeight)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcHeight)
  }
}
</script>

<style lang="stylus">
* 
  box-sizing border-box
  margin 0
  padding 0
html, body
  width 100%
  height 100%
#app
  font-family "Microsoft YaHei", Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  width 100%
  height 100%
  .header
    text-align center
    line-height 55px
  .main,
  .bottom
    background-color rgba(0,0,0,.03)
  .main
    padding 12px 0
  .bottom
    padding 10px 0
  // Card 组件的 border 设为 none
  .ivu-card-bordered
    border none !important
</style>
