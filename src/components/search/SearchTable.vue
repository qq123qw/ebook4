<template>
    <div class="search-table-wrapper">
      <div class="search-table-inner"
           v-for="(book, index) in data" :key="index"
           @click="onClick">
        <div class="book-img">
          <ImageView :src="book.cover"></ImageView>
        </div>
        <div class="book-info">
          <div class="book-title">{{book.title}}</div>
          <div class="book-author">{{book.author}}</div>
          <div class="category">{{book.categoryText}}</div>
        </div>
    </div>
    </div>
</template>

<script>
  import ImageView from '../base/ImageView'
  export default {
    name: 'SearchTable',
    components: { ImageView },
    props: {
      data: Array
    },
    methods: {
      onClick (book) {
        this.$router.push({
          path: '/pages/detail/main',
          query: {
            fileName: book.fileName
          }
        })
        this.$emit('onClick', book)
      }

    }
  }
</script>

<style lang="scss" scoped>

  .search-table-wrapper{
    margin-top: 7.5px;
    .search-table-inner{
      display: flex;
      padding: 7.5px 16px;
      height: 68.5px;
      width: 343px;
      .book-img{
        height: 68.5px;
        width: 47px;
      }
      .book-info{
        margin-left: 15.5px;
        .book-title{
          width: 205px;
          overflow: hidden;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          font-size: 16px;
          line-height: 22.5px;
          height: 26px;
          color: #333;

        }
        .book-author{
          font-size: 13px;
          line-height: 18px;
          color: rgba(0,0,0,0.65);
        }
        .category{
          font-size: 13px;
          color: rgba(0,0,0,0.45);
          line-height: 18px;


        }
      }
    }




  }
</style>
