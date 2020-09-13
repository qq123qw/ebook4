<template>
  <div>
    <DetailBook :book="book"/>
    <DetailStat
      :readers="book.readers"
      :readerNum="book.readerNum"
      :rankNum="book.rankNum"
      :rankAvg="book.rankAvg"
    />
    <DetailRate
      :rate-value="book.rateValue"
      @onRateChange="onRateChange"
    />
    <DetailContents
      :contents="contents"
      @readBook="readBook"
    />
    <DetailButtom
      :isInShelf="isInShelf"
       @moreHandle="moreHandle"
       @readBook="readBook"></DetailButtom>
  </div>
</template>

<script>
import DetailBook from '../../components/detail/DetailBook'
import DetailStat from '../../components/detail/DetailStat'
import DetailRate from '../../components/detail/DetailRate'
import DetailContents from '../../components/detail/DetailContents'
import DetailButtom from '../../components/detail/DetailButtom'
import { getStorage } from '../../api/wx'
import {bookShelfRemove, bookShelfSave,
  bookDetail,
  saveBookRank,
  bookContents,
  bookShelf
} from '../../api/index'

// bookShelfSave, bookShelfRemove
export default {
  name: 'detail',
  components: {
    DetailButtom,
    DetailContents,
    DetailRate,
    DetailBook,
    DetailStat
  },
  data () {
    return {
      book: {},
      fileName: '',
      openId: '',
      contents: [],
      isInShelf: false
    }
  },
  methods: {
    getBookDetail () {
      const openId = getStorage('openId')
      this.openId = openId
      console.log(this.$root.$mp.query)
      const { fileName } = this.$root.$mp.query
      this.fileName = this.$root.$mp.query.fileName
      console.log(fileName, openId)
      if (openId && fileName) {
        bookDetail({ openId, fileName }).then(response => {
          this.book = response.data.data
          console.log(this.book)
        })
      }
    },

    onRateChange (value) {
      saveBookRank({
        openId: this.openId,
        fileName: this.fileName,
        rank: value
      }).then(() => {
        this.getBookDetail()
      })
    },

    getBookContents () {
      console.log('获取章节')
      const { fileName } = this.$root.$mp.query
      if (fileName) {
        bookContents({ fileName }).then(response => {
          console.log(response, '全部信息')
          this.contents = response.data.data
          console.log(this.contents, '目录')
        })
      }
    },

    readBook (href) {
      const query = {
        fileName: this.book.fileName,
        opf: this.book.opf
      }
      if (href) {
        const index = href.indexOf('/')
        if (index >= 0) {
          query.navigation = href.slice(index + 1)
        } else {
          query.navigation = href
        }
      }
      if (this.book && this.book.fileName) {
        this.$router.push({
          path: '/pages/read/main',
          query
        })
      }
    },

    getBookShelf () {
      const openId = getStorage('openId')
      console.log(this.$root.$mp.query)
      const { fileName } = this.$root.$mp.query
      if (fileName && openId) {
        bookShelf({ fileName, openId: openId }).then(response => {
          const shelf = response.data
          if (shelf.length > 0 && shelf) {
            this.isInShelf = true
          }
        })
      }
    },

    moreHandle () {
      // 判断是加入书架还是移除书架
      console.log('进入书架判断')
      const openId = getStorage('openId')
      const { fileName } = this.$root.$mp.query
      if (!this.isInShelf) {
        bookShelfSave({ openId, fileName }).then(this.getBookIsInShelf)
      } else {
        const vue = this
        mpvue.showModal({
          title: '提示',
          content: `是否确认将《${this.book.title}》移出书架？`,
          success (res) {
            if (res.confirm) {
              bookShelfRemove({ openId, fileName }).then(vue.getBookIsInShelf)
            }
          }
        })
      }
    }
  },
  mounted () {
    console.log('初始化页面')
    this.getBookDetail()
    this.getBookContents()
    this.getBookShelf()
  }
}
</script>
<style scoped>
</style>
