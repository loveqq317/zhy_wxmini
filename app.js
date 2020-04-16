//app.js

App({

  onLaunch: function () {


    // wx.getSetting({
    //   success: (res)=> {
    //     console.log(res.authSetting)
    //    if(res.authSetting["scope.userInfo"]){
    //      wx.getUserInfo({
    //        success: function(res) {
    //          const userInfo = res.userInfo
    //          this.globalData.userInfo=userInfo;
    //        }
    //      })
    //    }else{
    //      wx.navigateTo({
    //        url:"/pages/login/index"
    //      })
    //    }
    //
    //   }
  // })

    // const token=wx.getStorageSync(TOKEN);
    // if(token && token.length != 0){//存在token,验证token是否过期
    //   //验证token
    //   this.check_token(token)
    // }else{//不存在，就进行登陆
    //   this.login();
    // }

  },

  globalData: {
    userInfo: null,
    token:'',
    userId:null
  }
})
