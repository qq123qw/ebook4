<template>
  <div>
    <HomeBook
      :row="category.length / 2"
      :col="2"
      :data="category"
      mode="category"
      :show-btn="false"
      :show-title="false"
      @onBookClick="onCategoryClick"
    />
  </div>
</template>

<script>
  import { categoryList } from '../../api'
  import HomeBook from '../../components/home/HomeBook'

export default {
    name: 'categoryList',
    components: { HomeBook },
    data () {
      return {
        category: []
      }
    },

    methods: {
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
      }
    },
    mounted () {
      categoryList().then(response => {
        this.category = response.data.data
        console.log('图书分类信息', this.category)
      })
    }

  }
</script>

<style scoped>

</style>
