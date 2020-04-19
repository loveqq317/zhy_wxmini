//es6
export const getDictByCode= (params)=>{
  wx.showLoading({
    title:'加载中'
  })
  //定义公共url
  const baseUrl="http://localhost:8080/jeecg-boot/api/mini/user";
  return new Promise((resolve,reject)=>{
    wx.request({
      data:{
        code:params.code
      },
      url:baseUrl+"/dicByCode",
      success(res){
        resolve(res.data)
      },
      fail(err){
        reject(err)
      },
      complete(){
        wx.hideLoading()
      }
    })
  })
}
