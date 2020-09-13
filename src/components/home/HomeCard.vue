<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="user-info">
        <div class="avater-warpper">
          <ImageView
            :src="avater"
            round
            height="100%"
            mode="scaleToFill"
          ></ImageView>
        </div>
        <div class="nickname">{{nickName}}</div>
        <div class="shelf-text">书架共有{{data.num}}本好书</div>
        <div class="round-item"></div>
        <div class="shelf-text"> 特别精选</div>
      </div>


      <div class="book-info">
          <div class="book-warpper"
               v-for="(item, index) in bookList"
               :key="index"
                @click="onBookClick(item)">
            <div class="avater-warpper">
              <ImageView
                :src="item.cover">
              ></ImageView>
            </div>
          </div>
          <div class="shelf-warpper" @click="goToShelf">
            <div class="shelf">书架</div>
            <van-icon name="arrow"
                      class="arrow"
                      size="11px"
                      color="#828489"/>
          </div>
      </div>

      <div class="feedback-warper" >
        <div class="feedback-text"
             @click="onFeedBackClick">反馈</div>
      </div>
      <van-dialog id="van-dialog" />
    </div>
  </div>
</template>

<script>
  import ImageView from '../base/ImageView'
  import Dialog from 'vant-weapp/dist/dialog/dialog'
  export default {
    name: 'HomeCard',
    props: {
      data: {
        type: Number,
        default: null
      },
      hasSign: {
        type: Boolean,
        default: false
      },
      signDay: {
        type: Number,
        default: 0
      }
    },
    components: {
      ImageView,
      Dialog
    },

    computed: {
      avater () {
        return this.data && this.data.userInfo && this.data.userInfo.avatarUrl
      },
      nickName () {
        return this.data && this.data.userInfo && this.data.userInfo.nickName
      },
      bookList () {
        return (this.data && this.data.bookList) || []
      }
    },
    methods: {
      onFeedBackClick () {
        Dialog.confirm({
          title: '反馈',
          message: '您是否确认提交反馈信息？',
          confirmButtonText: '是',
          cancelButtonText: '否'
        }).then(() => {
          console.log('点击是之后的事件')
        }).catch(() => {
          console.log('点击否之后的事件')
        })
      },

      onBookClick (book) {
        console.log(book)
        this.$emit('onBookClick', book)
      },

      goToShelf () {
        this.$router.push({
          path: '/pages/shelf/main'
        })
      }

    }

  }
</script>

<style lang="scss" scoped>
  .home-card{
    margin:22px  20px 0px;
    width:335px;
    height: 179px;
    background-image: linear-gradient(-90deg, #54575F 0%, #595B60 100%);
    border-radius: 15px;
    .home-card-inner{
      position:relative;
      padding: 21.5px 17px 20px 20px;
      box-sizing: border-box;
      .user-info{
        display: flex;
        align-items: center;
        .avater-warpper{
          height: 20px;
          width: 20px;
        }
        .nickname,.shelf-text{
          font-size:12px;
          color:#FFFFFF;
        }
        .nickname{
          margin:0 8.5px;

        }
        .shelf-text{
          opacity: 0.7;
        }

        .round-item{
          width:4px;
          height: 4px;
          background-color: #A2A2A2;
          border-radius: 50%;
          align-items: center;
          margin: auto 5px ;
        }

      }

      .book-info {
        display: flex;
        margin-top: 13.5px;

        .book-warpper {
          flex: 1;
          display: flex;
          justify-content: space-around;
          .avater-warpper{
            height: 101px;
            width: 72px;
          }
        }
        .shelf-warpper {
          display: flex;
          align-items: center;
          .shelf {
            width: 11px;
            font-size: 11px;
            word-break: break-word;
            color: #fff;
            opacity: .8;
          }
        }
      }

      .feedback-warper{
        position: absolute;
        right: 0;
        top: 19.5px;
        width:44.5px;
        height: 23.5px;
        line-height: 23.5px;
        text-align: center;
        border-radius:100px 0 0 100px;
        background-color:#D8D8D8 ;
        .feedback-text{
          color: #FFFFFF;
        }
      }


    }




  }
</style>
