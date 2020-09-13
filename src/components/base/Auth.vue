<template>
    <div class="auth-wrapper">
      <div class="auth">
           <div class="auth-info">
             <div class="auth-img">
               <ImageView
                 src="https://www.youbaobao.xyz/mpvue-res/logo.jpg"
                 height="100%"
                 mode="scaleToFill"
                 round></ImageView>
             </div>
             <div class="sub-title">登陆一起读书吧</div>
             <div class="auth-title">全场免费好书</div>
           </div>
          <button class="auth-login"
                  @getuserinfo="getUserInfo"
            open-type="getUserInfo">
            授权登陆
          </button>

      </div>

    </div>
</template>

<script>
  import ImageView from './ImageView'
  export default {
    name: 'Auth',
    components: { ImageView },
    methods: {
      getUserInfo () {
        this.$emit('getUserInfo')
      }

    }

  }
</script>

<style lang="scss" scoped>
  .auth-wrapper{
    width: 100%;
    height: 100%;
    background-color: #999;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .auth{
        position: relative;
        width:270px;
        height: 248px;
        background-color: #F5F5F5;
        border-radius: 0 0 36px 36px;
        .auth-info{
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 22.5px;
          .auth-img{
            width:74px;
            height: 74px;
          }
          .sub-title{
            font-size: 13px;
            line-height: 18.5px;
            margin-top: 18.5px;
            color: #999999 ;
          }

          .auth-title{
            color: #333;
            font-size: 16px;
            margin-top: 3.5px;
            line-height: 22.5px;
          }

        }
        .auth-login{
          position: absolute;
          bottom: 0;
          left: 0;
          height: 49px;
          width: 100%;
          background-image: linear-gradient(90deg, #1EA3F5 0%, #0F87FC 100%);
          border-radius: 0 0 36px 36px;
          font-size:15px ;
          color: #fff;
          line-height: 49px;
          text-align: center;
        }
      }
  }
</style>
