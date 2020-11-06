<template>
  <div>
    <Table :height="this.mainHeight" size="small" border :columns="columns2" :data="data4"></Table>
  </div>
</template>

<script>
import {mapState}  from 'vuex'

export default {
  data() {
    return {
      columns2: [
        {
          title: 'Address',
          key: 'address',
        },
        {
          title: 'Action',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small',
                  },
                },
                'View'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small',
                  },
                },
                'Edit'
              ),
            ])
          },
        },
      ],
      data4: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'Washington, D.C. No. 1 Lake Park',
          province: 'America',
          city: 'Washington, D.C.',
          zip: 100000,
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          province: 'Australian',
          city: 'Sydney',
          zip: 100000,
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          province: 'Canada',
          city: 'Ottawa',
          zip: 100000,
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000,
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'Washington, D.C. No. 1 Lake Park',
          province: 'America',
          city: 'Washington, D.C.',
          zip: 100000,
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          province: 'Australian',
          city: 'Sydney',
          zip: 100000,
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          province: 'Canada',
          city: 'Ottawa',
          zip: 100000,
        },
      ],
    }
  },
  computed: {
    ...mapState([
      'mainHeight',
    ])
  },
}
</script>

<style lang="stylus"></style>
