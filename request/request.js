//es6
export default (params)=>{
  wx.showLoading({
    title:'加载中'
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
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
