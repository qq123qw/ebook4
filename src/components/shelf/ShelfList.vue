<template>
  <div class="shelf-list-wrapper">
    <div class="shelf-list-inner">
      <div class="shelf-book"
        v-for="book in shelfList">
        <div class="shelf-book-cover">
          <ImageView
            :src="book.cover">

          </ImageView>
        </div>
        <div class="shelf-book-title" v-if="book && book.title">{{book.title}}</div>
        <div class="shelf-book-add" v-if="!book.title" @click="gotoHome">
          <div class="shelf-book-add-wrapper">
            <div class="shelf-book-add-x"></div>
            <div class="shelf-book-add-y"></div>
          </div>
        </div>
      </div>
      </div>

    </div>

</template>

<script>
  export default {
    name: 'ShelfTable',
    props: {
      shelfList: Array
    }
  }
</script>

<style lang="scss" scoped>
  .shelf-list-wrapper{
    margin-top: 32px;
    display: flex;
    justify-content: space-around;
    .shelf-list-inner{
      .shelf-book{
        .shelf-book-cover{
          height: 128px;
          width: 90px;
        }
        .shelf-book-title{
        width: 90px;
          height: 38px;
          font-size: 14px;
          color: #333333;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .shelf-book-add {
          width: 100%;
          height: 130px;
          border: 1px solid #CBCBCB;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;

          .shelf-book-add-wrapper {
            position: relative;
            width: 30px;
            height: 30px;

            .shelf-book-add-x {
              position: absolute;
              top: 50%;
              width: 30px;
              height: 2px;
              margin-top: -1px;
              background: #CACACA;
            }

            .shelf-book-add-y {
              position: absolute;
              left: 50%;
              width: 2px;
              height: 30px;
              background: #CACACA;
            }
          }
        }
      }
    }
  }
</style>
