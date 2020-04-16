// pages/project/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,name:"全部",isActive:true},
      {id:1,name:"待承包",isActive:false},
      {id:2,name:"进行中",isActive:false},
      {id:3,name:"已完成",isActive:false}
    ],
    allProjects:[
      {id:0,title:'雄安某景区投标项目',thumb:'/images/park.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:1,title:'南方某火车站方案设计项目',thumb:'/images/park1.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:2,title:'投标项目',thumb:'/images/park2.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:3,title:'北京小院',thumb:'/images/park3.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:4,title:'南京广场',thumb:'/images/park4.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:5,title:'红星美凯龙',thumb:'/images/park5.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:6,title:'雄安某景区投标项目',thumb:'/images/park.jpeg',info:'30亩/庭院景观/公园景观设计'}
    ],
    toBeResivedProjects:[
      {id:0,title:'雄安某景区投标项目',thumb:'/images/park.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:1,title:'南方某火车站方案设计项目',thumb:'/images/park1.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:2,title:'投标项目',thumb:'/images/park2.jpeg',info:'30亩/庭院景观/公园景观设计'}
    ],
    doingProjects:[
      {id:3,title:'北京小院',thumb:'/images/park3.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:4,title:'南京广场',thumb:'/images/park4.jpeg',info:'30亩/庭院景观/公园景观设计'}
    ],
    overProjects:[
      {id:5,title:'红星美凯龙',thumb:'/images/park5.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:6,title:'雄安某景区投标项目',thumb:'/images/park.jpeg',info:'30亩/庭院景观/公园景观设计'}
    ]
  },
  handleItemChange(e){
    const {index}=e.detail;
    console.log(index);
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync("token");
    if(!token || token.length == 0){
      wx.redirectTo({
        url:'../auth/index'
      })
    }
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
