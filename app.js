//app.js
const TOKEN='token';
App({

  onLaunch: function () {
    const token=wx.getStorageSync(TOKEN);
    if(token && token.length != 0){//存在token,验证token是否过期
      //验证token
      this.check_token(token)
    }else{//不存在，就进行登陆
      this.login();
    }


  },
  check_token(token){
    wx.request({
      url:"http://localhost:8080/jeecg-boot/api/mini/user/auth",
      data:{
        token
      },
      success:(res)=>{
        if(res.data.success){
          this.globalData.token=token;
        }else{
          this.login();
        }
      },
      fail:(res)=>{
        console.log(res);
      }
    })
  },
  login(){
    wx.login({
      success:(res)=>{
        //1、获取code
        const code=res.code;
        //2、将code发送给我们的服务器
        wx.request({
          url:"http://localhost:8080/jeecg-boot/api/mini/user/login",
          data:{
            code
          },
          success:(res)=>{
            console.log(res.data);
            // code: 1
            // message: "登陆成功"
            // token: "eyJraWQiOiIx
            const errorcode=res.data.code;
            if(errorcode == 1){

              const token=res.data.token;
              this.globalData.token=token;
              console.log(this.globalData.token);
              wx.setStorageSync(TOKEN,token);
            }


          }
        })
      }
    })

  },
  globalData: {
    userInfo: null,
    token:''
  }
})
