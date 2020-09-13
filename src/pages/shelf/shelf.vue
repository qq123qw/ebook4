<template>
  <div>
    <ShelfUserInfo
      :userInfo="userInfo"
      :readDay="readDay"
      :num="shelfList.length"></ShelfUserInfo>
    <ShelfList :shelfList="shelfList"></ShelfList>
  </div>
</template>

<script>
  import ShelfUserInfo from '../../components/shelf/ShelfUserInfo'
  import {getStorage} from '../../api/wx'
  import {userDay, bookShelf} from '../../api'

  export default {
    name: 'shelf',
    data () {
      return {
        userInfo: {},
        readDay: 0,
        shelfList: []
      }
    },
    components: { ShelfUserInfo },
    methods: {
      onShow () {
        this.userInfo = getStorage('userInfo')
        const openId = getStorage('openId')
        console.log('解析页面相关信息')
        console.log(this.userInfo, openId)
        userDay({openId}).then(response => {
          this.readDay = response.data.data.day
          console.log(this.readDay)
        })
        bookShelf({openId}).then(response => {
          this.shelfList = response.data.data
          this.shelfList.push({})
          console.log(this.shelfList, '书架内容')
        })
      }
    }

    // mounted () {
    //   this.onShow()
    // }

  }
</script>

<style scoped>

</style>
