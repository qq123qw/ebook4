import {getOpenId} from './index'

export function getSetting (auth, onSuccess, onFail) {
  mpvue.getSetting({
    success (res) {
      console.log(res)
      if (res.authSetting[`scope.${auth}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail (res) {
      console.log(res) // 直接抛出异常
    }
  })
}

export function getUserInfo (onSuccess, onFail) {
  mpvue.getUserInfo({
    success (res) {
      console.log(res)
      let { userInfo } = res
      if (userInfo) {
        console.log(userInfo, '用户信息')
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail (res) {
      console.log('获取userInfo异常', res) // 直接抛出异常
    }
  })
}

export function setStorage (key, value) {
  mpvue.setStorage({
    key: key,
    data: value
  })
}

export function getStorage (key) {
  return mpvue.getStorageSync(key)
}

export function getUserOpendId (callback) {
  mpvue.login({
    success (res) {
      console.log(res)
      if (res.code) {
        const {code} = res
        getOpenId(code).then(response => {
          console.log(response)
          const { data: { data: { openid } } } = response
          setStorage('openId', openid)
          callback && callback(openid)
        }).catch(err => {
          console.log(err)
        })
      } else {
        console.log(res)
      }
    },
    fail (res) {
      console.log(res)
    }
  })
}

export function showLoading () {
  mpvue.showLoading({
    title: '加载中',
    mask: true
  })
}

export function hideLoading () {
  mpvue.hideLoading()
}

export function showToast (title) {
  mpvue.showToast({
    title,
    duration: 2000
  })
}

export function setNavigationBarTitleText (title) {
  mpvue.setNavigationBarTitle({ title })
}
