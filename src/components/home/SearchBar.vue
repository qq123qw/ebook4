<template>
    <div class="search-bar">
      <div class="search-bar-wraper"  @click="onSearchBarClick">
        <van-icon  class="search" name="search"  size="16px" color="#858C96"></van-icon>
        <input class="search-input"
               :placeholder="hotSearch.length === 0 ? '搜索' : hotSearch"
               placeholder-style="#ADB4BE"
               :disabled="disabled"
               :maxlength="limit"
               v-model="searchWord"
               comfirmType="search"
               @confirm="onConfirm"
               @input="onChange"/>
        <van-icon class="clear" name="clear" size="16px" color="#858C96"
                 @click="onClear"
                 v-if="searchWord.length>0"></van-icon>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'SearchBar',
    props: {
      focus: {
        type: Boolean,
        value: true
      },
      disable: {
        type: Boolean,
        value: false
      },
      limit: {
        type: String,
        default: 50
      },
      hotSearch: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        searchWord: ''
      }
    },

    methods: {

      onClear () {
        this.searchWord = ''
        this.$emit('onClear')
      },

      onChange (v) {
        const {value} = v.mp.detail
        this.$emit('onChange', value)
      },

      onConfirm (e) {
        const {value} = e.mp.detail
        this.$emit('onConfirm', value)
        console.log('onConfirm', e)
      },
      setValue (v) { this.searchWord = v },
      getValue () {
        return this.searchWord
      },
      onSearchBarClick () {
        this.$emit('onClick')
      }

    }
  }
</script>

<style lang="scss" scoped>
  .search-bar{
    padding:15px 15.5px;
    .search-bar-wraper {

      box-sizing: border-box;
      height:40px;
      display: flex;
      background-color: #F5F7F9;
      border-radius: 20px;
      padding:12px 17px;
      align-items: center;
      .seacrh{
        display:flex;
        alig-item:center;
      }

      .search-input{
        flex: 1;
        margin: 0 12px;
        color: #333;
        font-size: 15px;
      }

      .clear{
        display:flex;
        alig-item:center;
      }

    }
  }
</style>
