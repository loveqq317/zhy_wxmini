// pages/auth/index.js
//var common =require('../../common/common.js');
const app= getApp();
const TOKEN='token';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleLoginAndUserInfo(e){
    //1、获取用户信息后，放到缓存中
    const {userInfo}=e.detail;
    wx.setStorageSync("userInfo",userInfo);


    //2、判断token，判断是否要进行登录，token 为系统里自定义的登录态
    const token=wx.getStorageSync('token');
    if(token && token.length != 0){//存在token,验证token是否过期
      //验证token
      this.check_token(token)
    }else{//不存在，就进行登陆
      this.login();
    }
    //更新数据库 user的一些基本信息

    wx.navigateBack({
      delta:1
    });
  },
  check_token(token){
    wx.request({
      url:"http://localhost:8080/jeecg-boot/api/mini/user/auth",
      data:{
        token
      },
      success:(res)=>{
        if(res.data.success){
          app.globalData.token=token;
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
              app.globalData.token=token;
              app.globalData.userId=res.data.userId;
              console.log(app.globalData.token);
              wx.setStorageSync(TOKEN,token);
              wx.setStorageSync("userId",res.data.userId);
              //更新用户信息
              this.updateWxUser();
            }


          }
        })
      }
    })

  },
updateWxUser(){
  let user=wx.getStorageSync("userInfo");
  user.id=wx.getStorageSync("userId");
  wx.request({
    method: "PUT",
    url:"http://localhost:8080/jeecg-boot/api/mini/user/editwxuser",
    header: {
      'content-type': 'application/json'
    },
    data:user,
    success:(res)=>{
      console.log(res);
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
