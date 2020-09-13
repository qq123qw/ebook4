<template>
  <div>
    <div  v-if="isAuth" >
        <SearchBar
          disabled
          :maxlength="limit"
          :hotSearch="hotSearch"
          @onChange="onChange"
          @onClick="onSearchBarClick"
        ></SearchBar>
        <HomeCard
          :data="homeCard"
          @onBookClick="onBookClick"></HomeCard>

        <HomeBanner
          title="多端一起读书上线了"
          subTitle="立即体验"
          img="http://www.youbaobao.xyz/book/res/bg.jpg"
        />
        <div class="home-book">

          <HomeBook title="为你推荐"
                    btnText="换一批"
                    :data="recommend"
                    :row="1"
                    :col="3"
                    mode="col"
                    @onBookClick="onBookClick"
                    @onMoreClick="recommendChange('recommend')"
          ></HomeBook>

          <HomeBook title="免费阅读"
                    btnText="换一批"
                    :data="freeRead"
                    :row="2"
                    :col="2"
                    mode="row"
                    @onBookClick="onBookClick"
                    @onMoreClick="recommendChange('freeRead')"
          ></HomeBook>

          <HomeBook title="当前最热"
                    btnText="换一批"
                    :data="hotBook"
                    :row="1"
                    :col="4"
                    mode="col"
                    @onBookClick="onBookClick"
                    @onMoreClick="recommendChange('hotBook')"
          ></HomeBook>
          <HomeBook title="分类"
                    btnText="查看全部"
                    :data="category"
                    :row="2"
                    :col="2"
                    mode="category"
                    @onBookClick="onCategoryClick"
                    @onMoreClick="onMoreClick"
          ></HomeBook>
        </div>
      </div>
    <Auth v-if="!isAuth"
          @getUserInfo="init">
    </Auth>
  </div>
</template>

<script>
// import {get, post} from '@/utils/request'
import SearchBar from '../../components/home/SearchBar'
import HomeCard from '../../components/home/HomeCard'
import HomeBanner from '../../components/home/HomeBanner'
import HomeBook from '../../components/home/HomeBook'
import { getHomeData, recommend, freeRead, hotBook, register } from '../../api/index'
import {getSetting,
  getUserInfo,
  setStorage,
  getStorage,
  getUserOpendId,
  showLoading,
  hideLoading } from '../../api/wx'
import Auth from '../../components/base/Auth'
export default {
  data () {
    return {
      hotSearch: '',
      homeCard: {},
      banner: {},
      recommend: [],
      freeRead: [],
      hotBook: [],
      category: [],
      isAuth: true
    }
  },

  mounted () {
    // this.getHomeData()
    // this.getSetting()
    this.init()
  },

  components: {
    SearchBar,
    HomeCard,
    HomeBanner,
    HomeBook,
    Auth
  },

  methods: {
    onChange (keyWord) {
      console.log('搜索字', keyWord)
      if (keyWord && keyWord.trim().length > 0) {
        this.hotSearch = keyWord
      }
    },
    onCategoryClick (category) {
      console.log('点击分类')
      // 跳转到具体某一分类列表
      this.$router.push({
        path: '/pages/list/main',
        query: {
          key: 'categoryId',
          text: category.category,
          title: category.categoryText
        }
      })
    },
    onSearchBarClick () {
      // 页面跳转
      console.log('页面跳转')
      console.log(this.hotSearch)
      this.$router.push({
        path: '/pages/search/main',
        query: {
          hotSearch: this.hotSearch
        }
      })
    },
    onBookClick (book) {
      console.log('点击图书')
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          fileName: book.fileName
        }
      })
      console.log('页面跳转成功')
    },

    // 跳转到全部分类
    onMoreClick () {
      this.$router.push({
        path: '/pages/categoryList/main'

      })
    },

    recommendChange (key) {
      console.log(key)
      switch (key) {
        case 'recommend':
          console.log(1)
          recommend().then(response => {
            console.log(response.data.data)
            this.recommend = response.data.data
          })
          break
        case 'freeRead':
          freeRead().then(response => {
            console.log(response.data.data)
            this.freeRead = response.data.data
          })
          break
        case 'hotBook':
          hotBook().then(response => {
            console.log(response.data.data)
            this.hotBook = response.data.data
          })
          break

        case 'category':

          break
      }
    },

    getHomeData (openId, userInfo) {
      console.log('getHomeData')
      console.log(openId, userInfo)
      getHomeData({openId})
        .then(response => {
          const {
            shelf,
            hotSearch: { keyword },
            banner,
            recommend,
            freeRead,
            hotBook,
            category,
            shelfCount
          } = response.data.data
          console.log(response)
          this.hotSearch = keyword
          this.banner = banner
          this.recommend = recommend
          this.freeRead = freeRead
          this.hotBook = hotBook
          this.category = category
          this.homeCard = {
            bookList: shelf,
            num: shelfCount,
            userInfo
          }
          hideLoading()
        })
        .catch(e => {
          console.log(e)
        })
    },

    getSetting () {
      getSetting(
        'userInfo',
        () => {
          this.isAuth = true
          console.log('成功')
          showLoading()
          this.getUserInfo()
        },
        () => {
          this.isAuth = false
          console.log('失败')
        }
      )
    },

    getUserInfo (e) {
      console.log('获取用户信息')
      const onOpenIdComplete = (openId, userInfo) => {
        this.getHomeData(openId, userInfo)
        register(openId, userInfo).then(response => {
          console.log('用户注册信息', response)
        })
      }

      getUserInfo(userInfo => {
        console.log(userInfo)
        setStorage('userInfo', userInfo)
        const openId = getStorage('openId')
        if (!openId || openId.length === 0) {
          console.log('请求OpenId')
          // 调用方法获取OPENid
          getUserOpendId(openId => onOpenIdComplete(openId, userInfo))
        } else {
          console.log('已获得openid')
          onOpenIdComplete(openId, userInfo)
        }
      }, () => {
        console.log('fail to get userInfo')
      })
    },

    init () {
      console.log('调用 emit 中等的')
      this.getSetting()
    }

  }
}
</script>

<style lang="scss" scoped>
.home-book {
  margin-top: 23px;
}
</style>
