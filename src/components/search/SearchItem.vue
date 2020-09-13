<template>
    <div class="search-item-wrapper" @click="onClick">
      <div class="search-item-icon">
        <van-icon :name="icon" custom-class="icon"
                  :style="{width:'20px', height:'20px'}"
                  color="rgba(0,0,0.5)"/>
      </div>
      <div class="search-item-info">
        <div class="search-item-title">{{title}}</div>
        <div class="search-item-sub-title">{{subTitle}}</div>

      </div>
    </div>
</template>

<script>
  export default {
    name: 'SearchItem',
    props: {
      title: String,
      subTitle: String,
      icon: String
    },
    methods: {
      onClick () {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-item-wrapper{
    display: flex;
    padding:7px 15px;
    align-items: center;
    height: 36.5px;
    .search-item-icon{
      width:32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #F7F7F9;
      border-radius: 50%;

    }
    .search-item-info{
      margin-left: 10px;
      .search-item-title{
        font-size: 14px;
        line-height: 20px;
        color: #333333;
      }

      .search-item-sub-title{
        font-size: 12px;
        line-height: 12px;
        color: rgba(0,0,0,0.45);
      }

    }
  }
</style>
