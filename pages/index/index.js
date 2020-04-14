import {request} from "../../request/request.js"
//获取应用实例
const app = getApp()

Page({
  data: {
    //轮播图数据
    swiperList:[
      {id:0,title:'雄安某景区投标项目',thumb:'/images/park.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:1,title:'南方某火车站方案设计项目',thumb:'/images/park1.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:2,title:'投标项目',thumb:'/images/park2.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:3,title:'北京小院',thumb:'/images/park3.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:4,title:'南京广场',thumb:'/images/park4.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:5,title:'红星美凯龙',thumb:'/images/park5.jpeg',info:'30亩/庭院景观/公园景观设计'},
      {id:6,title:'雄安某景区投标项目',thumb:'/images/park.jpeg',info:'30亩/庭院景观/公园景观设计'}
    ],
    //操作数据
    cateList:[
      {id:0,name:'发送名片',image_src:'/images/card.png'},
      {id:0,name:'发布项目',image_src:'/images/publish.png'},
      {id:0,name:'承接项目',image_src:'/images/accept.png'},
      {id:0,name:'加入我们',image_src:'/images/designer.png'}
    ]

  },

  onLoad: function () {
    //发送异步请求获取轮播图
    // wx.request({
    //     url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    //     success:res=>{
    //       console.log(res);
    //     }
    // })
  }
})
