//es6
export const request= (params)=>{
  wx.showLoading({
    title:'加载中'
  })
  //定义公共url
  const baseUrl="http://192.168.3.5:8080/jeecg-boot/api/mini/user";
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
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
