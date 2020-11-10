<template>
  <div class="newslist" :style="{height: `${mainHeight}px`}">
    <div class="newslist-title">最新进展</div>
    <Scroll :height="mainHeight - 45">
      <Timeline style="padding:10px;">
        <TimelineItem v-for="item in newsList" :key="item.cmsId">
          <p class="time">{{item.publish_time}}</p>
          <div class="content">
            <p class="title">{{item.title}}</p>
            <div @click="toPage(item.url)" class="overview">{{item.desc}}</div>
          </div>
        </TimelineItem>
      </Timeline>
    </Scroll>
  </div>
</template>

<script>
import {mapState}  from 'vuex'

export default {
  data () {
    return {
      newsList: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getData().then(data => {
        this.newsList = data
      })
    })
  },
  computed: {
    ...mapState([
      'mainHeight',
    ])
  },
  methods: {
    // 获取最新进展
    getData () {
      return  this.$axios.get('http://localhost:8888/api/news').then(data => {
        return data.data.data.FAutoNewsArticleList
      })
    },
    toPage (url) {
      window.open(url, '_blank')
      // location.href = url
    }
  }
}
</script>

<style lang="stylus">
.newslist
  .newslist-title
    font-size: 18px;
    color: #000;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    padding-left: 12px;
.time
  color #737373
  font-size 14px
.content
  border-radius 4px
  padding 10px
  margin-top 12px
  background #f8f8f8
  color #000
  .title
    font-size 16px
    color #222222
  .overview
    margin-top 12px
    font-size 14px
    color #737373
    cursor pointer
    &:hover
      color #333
      font-weight bold
</style>