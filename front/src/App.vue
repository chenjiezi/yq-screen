<template>
  <div id="app">
    <div class="header" :style="{height: `${this.headerHeight}px`}">
      <h1 class="title">-</h1>
    </div>
    <div class="main" :style="{height: `${this.mainHeight}px`}">
      <Row> 
        <i-Col span="7">
          <NewsList></NewsList>
        </i-Col>
        <i-Col span="10">
          <Map></Map>
        </i-Col>
        <i-Col span="7">
          <Rank></Rank>
        </i-Col>
      </Row>
    </div>
    <div class="bottom" :style="{height: `${this.bottomHeight}px`}">
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
      // TODO: 防抖
      let mainHeight = +((window.innerHeight - 55) * 0.7).toFixed(0)
      let bottomHeight = +(window.innerHeight - 55 -  mainHeight).toFixed(0)
      this.$store.commit('mainHeight', mainHeight)
      this.$store.commit('bottomHeight', bottomHeight)
    }
  },
  mounted () {
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
  &>*
    border 1px solid #000
.header
  text-align center
  line-height 55px
</style>
