function userLogin() {


}
function login(){

  wx.login({
    success:(res)=>{
      //1、获取code
      const code=res.code;
      //2、将code发送给我们的服务器
      wx.request({
        url:"http://localhost:8080/jeecg-boot/api/mini/user/login",
        data:{
          code,
          tbWxUser:this.globalData.userInfo
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
            this.globalData.userId=res.data.userId;
            console.log(this.globalData.token);
            wx.setStorageSync(TOKEN,token);
            wx.setStorageSync("userId",res.data.userId);
          }


        }
      })
    }
  })

}
module.exports={
  userLogin
}
