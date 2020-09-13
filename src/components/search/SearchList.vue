<template>
   <div class="search-list-wrapper">
     <!--<van-icon name="contact" />-->
    <div class="search-item"    >
      <SearchItem
        v-if="category"
        icon="apps-o"
        :title="category"
        :sub-title="Category"
        @onClick="showList(category, 'category')"/>
      <SearchItem
        v-if="author"
        icon="user-o"
        :title="author"
        :sub-title="Author"
        @onClick="showList(author, 'author')"/>
      <SearchItem
        v-if="publisher"
        icon="newspaper-o"
        :title="publisher"
        sub-title="Publisher"
        @onClick="showList(publisher, 'publish')"/>
    </div>
     <div class="search-table">
       <SearchTable :data="list"></SearchTable>
     </div>
   </div>
</template>

<script>
import SearchItem from './SearchItem'
import SearchTable from './SearchTable'
export default {
  name: 'SearchList',
  components: { SearchTable, SearchItem },
  props: {
    data: Object
  },
  computed: {
    category () {
      if (this.data && this.data.category && this.data.category.length > 0) {
        return this.data.category[0].categoryText
      } else {
        return null
      }
    },
    author () {
      if (this.data && this.data.author && this.data.author.length > 0) {
        return this.data.author[0].author
      } else {
        return null
      }
    },

    list () {
      if (this.data && this.data.book && this.data.book.length > 0) {
        return this.data.book
      } else {
        return null
      }
    },
    publisher () {
      if (this.data && this.data.publisher && this.data.publisher.length > 0) {
        return this.data.publisher[0].publisher
      } else {
        return null
      }
    }
  },

  methods: {
    showList (text, key) {
      console.log('进行页面挑')
      console.log(this.data)
      this.$router.push({
        path: '/pages/list/main',
        query: {
          text, key, title: text
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-list-wrapper{
    .search-item{
      margin-top:7px;
    }
  }
</style>
