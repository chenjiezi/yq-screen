<template>
  <Row type="flex" justify="space-around" >
    <i-Col span="6" class-name="i-col">
      <Card :padding="0">
        <!-- 现有确诊 -->
        <NowConfirm :dataList="{ date, nowConfirm }"></NowConfirm>
      </Card>
    </i-Col>
    <i-Col span="6" class-name="i-col">
      <Card :padding="0">
        <!-- 累计确诊/治愈/死亡 -->
        <AddUpData :dataList="{ date, addUpConfirm, addUpHeal, addUpDead }"></AddUpData>
      </Card>
    </i-Col>
    <i-Col span="6" class-name="i-col">
      <Card :padding="0">
        <!-- 新增确诊/疑似 -->
        <NewAddConfirmAndSuspect :dataList="{ newAddDate, newAddConfirm, newAddSuspect }"></NewAddConfirmAndSuspect>
      </Card>
    </i-Col>
    <i-Col span="5" class-name="i-col">
      <Card :padding="0">
        <!-- 治愈/死亡率 -->
        <HealAndDeadRate :dataList="{ date, healRate, deadRate }"></HealAndDeadRate>
      </Card>
    </i-Col>
  </Row>
</template>

<script>
import NowConfirm from './FourCharts/NowConfirm'
import AddUpData from './FourCharts/AddUpData'
import NewAddConfirmAndSuspect from './FourCharts/NewAddConfirmAndSuspect'
import HealAndDeadRate from './FourCharts/HealAndDeadRate'
export default {
  components: {
    NowConfirm,
    AddUpData,
    NewAddConfirmAndSuspect,
    HealAndDeadRate
  },
  data () {
    return {
      date: [],          // 日期 date
      addUpConfirm: [],  // 累计确诊 confirm
      addUpHeal: [],     // 累计治愈 heal
      addUpDead: [],     // 累计死亡 dead
      healRate: [],      // 治愈率 healRate
      deadRate: [],      // 病死率 deadRate
      nowConfirm: [],    // 现有确诊 confirm - heal - dead
      newAddDate: [],    // 日期（新增确诊/疑似）
      newAddConfirm: [], // 新增确诊 chinaDayAddList-confirm
      newAddSuspect: []  // 新增疑似 chinaDayAddList-suspect
    }
  },
  mounted () {
    // FIXME: 向后台服务器请求数据，并整理数据
      this.getData().then(data => {
        const {chinaDayAddList, chinaDayList} = data
        
        chinaDayList.forEach(item => {
          this.date.push(item.date)
          this.addUpConfirm.push(item.confirm)
          this.addUpHeal.push(item.heal)
          this.addUpDead.push(item.dead)
          this.healRate.push(item.healRate)
          this.deadRate.push(item.deadRate)
          this.nowConfirm.push(item.confirm - item.dead - item.heal) // 当日现有确诊 = 当日确诊人数 - 当日治愈人数 - 当日死亡人数
        })
        chinaDayAddList.forEach(item => {
          this.newAddDate.push(item.date)
          this.newAddConfirm.push(item.confirm)
          this.newAddSuspect.push(item.suspect)
        })
      })

      setInterval(() => {
        this.getData().then(data => {
          const {chinaDayAddList, chinaDayList} = data
          
          this.resetData(chinaDayList, chinaDayAddList)
        })
      }, 60 * 1000) // FIXME:定时请求 60s
  },
  methods: {
    // 获取 charts 数据
    getData () {
      return  this.$axios.get('http://localhost:8888/api/charts').then(data => {
        return data.data.data
      })
    },
    resetData (chinaDayList, chinaDayAddList) {
      this.date = []
      this.addUpConfirm = []
      this.addUpHeal = []
      this.addUpDead = []
      this.healRate = []
      this.deadRate = []
      this.nowConfirm = []
      this.newAddDate = []
      this.newAddConfirm = []
      this.newAddSuspect = []
      
      chinaDayList.forEach(item => {
        this.date.push(item.date)
        this.addUpConfirm.push(item.confirm)
        this.addUpHeal.push(item.heal)
        this.addUpDead.push(item.dead)
        this.healRate.push(item.healRate)
        this.deadRate.push(item.deadRate)
        this.nowConfirm.push(item.confirm - item.dead - item.heal) // 当日现有确诊 = 当日确诊人数 - 当日治愈人数 - 当日死亡人数
      })
      chinaDayAddList.forEach(item => {
        this.newAddDate.push(item.date)
        this.newAddConfirm.push(item.confirm)
        this.newAddSuspect.push(item.suspect)
      })
    }
  }
}
</script>

<style lang="stylus">
</style>