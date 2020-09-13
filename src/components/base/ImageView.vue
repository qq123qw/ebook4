<template>
  <div class="image-view" @click="onClick" :style="{height}">
    <img
      :class="round ? 'round image' : 'image'"
      :style="{height}"
      :src="src"
      :mode="mode"
      :lazyLoad="lazyLoad"
      @load="onLoad"
      @error="error"
      v-show="!isLoading && !error"
      />
    <!--开发占位图片 可以换成自己想要的图片-->
    <img
      :class="round ? 'round image' : 'image'"
      :style="{height}"
      src="https://www.youbaobao.xyz/book/img/loading2.ae9e5924.jpeg"
      :mode="mode"
      :lazyLoad="lazyLoad"
      v-show="loading || error"/>
  </div>
</template>

<script>
export default {
  name: 'Image',
  props: {
    src: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'widthFix'
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: 'auto'
    }
  },

  data () {
    return {
      isLoading: true,
      error: false
    }
  },

  watch: {
    src (newValue, oldValue) {
      if (newValue && newValue.length > 0 && newValue !== oldValue) {
        // this.isLoading = true
        // this.err = false
        this.$nextTick(() => {
          this.isLoading = true
          this.error = false
        })
      }
    }
  },

  methods: {
    onClick (e) {
      this.$emit('onClick', e)
    },
    onError (e) {
      this.error = true
      this.isLoading = false
    },

    onLoad (e) {
      this.isLoading = false
      this.error = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-view{
    width:100%;
    .image {
      width: 100%;
      &.round {
        border-radius: 50%;
      }
    }


  }
</style>
