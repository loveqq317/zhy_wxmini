import {request} from "../../request/request.js"
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {},
    userDatas:[
      {title:'所属城市',info:'北京市东城区'},
      {title:'擅长专业',info:'城镇规划/风景区规划/住宅/庭院景观'},
      {title:'使用软件',info:'3D建模/Sketchup建模/BIM/PPT表达'},
      {title:'个人简历',info:'本人从事设计行业，多次参与大型建筑设计，代表作有北京东城官员等'},
      {title:'拥有技能',info:'方案创作/设计项目负责/项目汇报/施工图'}
    ],
    userId:{},
    userProfile:{},
    token:null,
    abilityAllTags:[],
    skillAllTags:[],
    abilityTags:[],
    skillTags:[]
  },

  handleLogin(){
    wx.navigateTo({
      url:"../auth/index"
    })
  },
  getCategoryList(pcode) {
   return  request({
      url: "/categoryByCode",
      data: {
        pcode
      },
      header: {
        'content-type': 'application/json'
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  getUserProfile(userId){
    request({
      url: "/user",
      data: {
        id:userId
      },
      header: {
        'content-type': 'application/json'
      },
    }).then(res=>{
      this.setData({
        userProfile:res.result,
        abilityTags:res.result.abilityTag.split(","),
        skillTags:res.result.skillTag.split(",")
      })

    })
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
    //获取缓存中的 用户信息
    let userInfo = wx.getStorageSync("userInfo");
    let token=wx.getStorageSync("token");
    const userId=wx.getStorageSync("userId");
    this.setData({userInfo,token,userId});
    this.getUserProfile(userId);
    this.getCategoryList("B01").then(res => {
      const result = res.result
      this.setData({
        abilityAllTags: result
      })
    });
    this.getCategoryList("B02").then(res => {
      const result = res.result
      this.setData({
        skillAllTags: result
      })
    });

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
