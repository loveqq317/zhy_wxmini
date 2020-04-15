// pages/userdata/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,name:"个人资料",isActive:true},
      {id:1,name:"账户信息",isActive:false},
      {id:2,name:"实名认证",isActive:false}

    ],
  },
  changeTitleByIndex(index){
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })

  },
  handleItemChange(e){
    const {index}=e.detail;
    this.changeTitleByIndex(index);

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow(options){
    //获取当前小程序的页面栈--数组，  长度最大是10个页面
    //数组中  索引最大的页面就是当前页面
    let pages=getCurrentPages();
    //console.log(pages);
    let currentPage=pages[pages.length-1];
    console.log(currentPage.options);
    const {type}=currentPage.options;
    if (type){
      this.changeTitleByIndex(type-1);
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
