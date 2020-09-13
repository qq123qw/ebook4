<template>
  <div class="search">
    <SearchBar
        :hotSearch="hotSearchKeyword"
        :focus="searchFocus"
        @onChange="onChange"
        @onConfirm="onConfirm"
        @onClear="onClear"
        ref="SearchBar"></SearchBar>

    <TagGroup
      header-text="热门搜索"
      btn-text="换一批"
      :value="hotSearchArray"
      @onBtnClick="changeHotSearch"
      @onTagClick="showBookDetail"
      v-if="hotSearchArray.length> 0 && !showList"
    />
    <TagGroup
      header-text="历史搜索"
      btn-text="清空"
      :value="historySearch"
      @onBtnClick="clearHistorySearch"
      @onTagClick="searchKeyWord"
      v-if="historySearch.length > 0 && !showList"
    />
    <SearchList
      :data="searchList"
      v-if="showList"></SearchList>
  </div>
</template>

<script>
  import TagGroup from '../../components/base/TagGroup'
  import SearchList from '../../components/search/SearchList'
  import {search, hotSearch} from '../../api'
  import {getStorage, setStorage, showToast} from '../../api/wx'
  import SearchBar from '../../components/home/SearchBar'
  const KEY_HISTORY_SEARCH = 'historySearch'
export default {
    name: 'search',
    components: {
      SearchBar,
      SearchList,
      TagGroup
    },
    data () {
      return {
        historySearch: [],
        hotSearch: [],
        searchList: {},
        searchFocus: true,
        openId: '',
        hotSearchKeyword: '',
        page: 1
      }
    },
    computed: {
      showList () {
        const keys = Object.keys(this.searchList)
        return keys.length > 0
      },
      hotSearchArray () {
        let _hotSearchArry = []
        this.hotSearch.forEach(o => {
          _hotSearchArry.push(o.title)
        })
        return _hotSearchArry
      }

    },
    mounted () {
      this.openId = getStorage('openId')
      hotSearch().then(response => {
        this.hotSearch = response.data.data
      })
      this.page = 1
      console.log('获取路由参数', this)
      this.hotSearchKeyword = this.$root.$mp.query.hotSearch
      console.log(this.historySearch, '历史搜索')
      console.log(this.$root.$mp.query)
      this.historySearch = getStorage(KEY_HISTORY_SEARCH) || []
    },

    methods: {

      onConfirm (keyword) {
        console.log('进入confirm')
        // 在手机上点击
        console.log(keyword)
        if (!keyword || keyword.trim() < 1) {
          // 用热门搜索关键字
          this.keyword = this.hotSearchKeyword
          this.$refs.SearchBar.setValue(keyword)
        } else {
          this.keyword = keyword
        }
        this.onSearch(this.keyword)
        console.log('获取历史搜索关键字')
        if (!this.historySearch.includes(keyword)) {
          this.historySearch.push(keyword)
          console.log(this.historySearch)
          setStorage(KEY_HISTORY_SEARCH, this.historySearch)
        }
        // 搜索框失去焦点
        this.searchFocus = false
      },
      onChange (keyWord) {
        console.log('搜索字', keyWord)
        if (keyWord && keyWord.trim().length > 0) {
          this.searchList = {}
          this.onSearch(keyWord.trim())
        }
      },
      onClear () {
        console.log('调用清空事件')
        this.searchList = {}
      },

      onSearch (keyword) {
        const openId = getStorage('openId')
        this.openId = openId
        search({openId, keyword}).then(response => {
          this.searchList = response.data.data
          console.log(this.searchList)
        })
      },
      showBookDetail (text, index) {
        console.log('show book detail', index)
      },
      changeHotSearch () {
        hotSearch().then(response => {
          this.hotSearch = response.data.data
        })
      },
      clearHistorySearch () {
        this.historySearch = []
        setStorage(KEY_HISTORY_SEARCH, [])
      },
      searchKeyWord (keyword) {
        this.$refs.SearchBar.setValue(keyword)
        this.onSearch(keyword)
      }

    },
    onPageScroll () {
      console.log('页面滑动')
      if (this.searchFocus) {
        this.searchFocus = false
      }
    },
    onReachBottom () {
      console.log('进入页面底部')
      if (this.showList) {
        this.page++
        const searchWord = this.$refs.SearchBar.getValue()
        search({
          keyword: searchWord,
          openId: this.openId,
          page: this.page
        }).then(response => {
          console.log('查询数据')
          const { book } = response.data.data
          console.log(book)
          if (book && book.length > 0) {
            this.searchList.book.push(...book)
          } else {
            showToast('没有更多数据了')
          }
        })
      }
    }
}
</script>

<style scoped>

</style>
