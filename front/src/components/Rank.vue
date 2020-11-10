<template>
  <div class="rank-container">
    <Table stripe :height="mainHeight" size="small" border :columns="columns2" :data="data4"></Table>
  </div>
</template>

<script>
import {mapState}  from 'vuex'

export default {
  data() {
    return {
      columns2: [
        {
          title: '地区',
          key: 'name',
          align: 'center'
        },
        {
          title: '现有确诊',
          key: 'nowConfirm',
          align: 'center'
        },
        {
          title: '累计确诊',
          key: 'confirm',
          align: 'center'
        },
        {
          title: '治愈',
          key: 'heal',
          align: 'center'
        },
        {
          title: '死亡',
          key: 'dead',
          align: 'center'
        }
      ],
      data4: [],
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getData().then((data) => {
        const res = []
        data.children.forEach(item => {
          const { name, total: { nowConfirm, confirm, heal, dead } } = item

          res.push({ name, nowConfirm, confirm, heal, dead })
        })
        this.data4 = res
      })
    })
  },
  computed: {
    ...mapState([
      'mainHeight',
    ])
  },
  methods: {
    // 获取疫情数据
    getData () {
      return  this.$axios.get('http://localhost:8888/api/disease_china').then(data => {
        return data.data.areaTree[0]
      })
    },
  }
}
</script>

<style lang="stylus">
.rank-container
  /deep/ .ivu-table-cell
    padding 0 !important
    font-size 16px
  .ivu-table th:first-child
    background-color #f5f5f5
    // color #000
  .ivu-table th:nth-child(2)
    background-color #fcf2e8
    color #ff5d00
  .ivu-table th:nth-child(3)
    background-color #fdeeee
    color #f55253
  .ivu-table th:nth-child(4)
    background-color #e9f7ec
    color #178b50
  .ivu-table th:nth-child(5)
    background-color #f3f6f8
    color #4e5a65
</style>
