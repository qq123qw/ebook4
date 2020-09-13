<template>
  <div>
    <SearchTable :data="data" @onClick="onBookClick"/>

  </div>
</template>

<script>
  import SearchTable from '../../components/search/SearchTable'
  import {searchList} from '../../api'
  import {setNavigationBarTitleText, showToast} from '../../api/wx'

  export default {
    name: 'list',
    components: { SearchTable },
    data () {
      return {
        data: [],
        page: 1
      }
    },
    methods: {
      onBookClick (book) {
        console.log(book)
      },
      getSearchList () {
        console.log('查询')
        const {key, text} = this.$root.$mp.query
        console.log(this.$root.$mp.query)
        const params = {}
        params.page = this.page
        console.log(key, text)
        if (text && key) {
          params[key] = text
          searchList(params).then(response => {
            const { data } = response.data
            if (data.length > 0) {
              this.data.push(...data)
            } else {
              showToast('没有更多数据了')
            }
            console.log(this.data)
          })
        }
      }

    },
    mounted () {
      this.page = 1
      console.log('获取查询的具体信息')
      this.getSearchList()
      const title = this.$root.$mp.query.title
      setNavigationBarTitleText(title)
    },

    onReachBottom () {
      console.log('到达底部')
      this.page++
      this.getSearchList()
    }
  }
</script>

<style scoped>

</style>
