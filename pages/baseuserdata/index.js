import {getDictByCode} from "../../common/common.js"
import {request} from "../../request/request.js"
const app = getApp();

Page({
  data: {
    //表单里的user
    userTop:{
      region: ["省", "市", "区"],//所在城市、国家、省份
      //数据库获取的user
      avatarUrl:null,
      name: '',//姓名
      university:'',//学校
      major:'',//专业
      education:'',//学历
      phone: '',//电话
      email:'',//邮箱
      workYear:'',//工作年限
      workplace:'',//所在公司
      isShowWorkplace:false,//是否显示所在公司
      certificatePrice:'',//证书与奖项
      workHistory:'',//工作履历
      resume:'',//个人简历
      address: '',//详细地址
      abilityTag:'',//能力标签
      skillTag:'',//技能标签
      serviceTime:'',//服务时间
      ifUnderLine:'',//是否接受线下服务

    },
    region: ["省", "市", "区"],//所在城市、国家、省份
    userId:'',//用户ID
    //数据库获取的user
   /* avatarUrl:null,
    userId:'',//用户ID
    name: '',//姓名
    university:'',//学校
    major:'',//专业
    education:'',//学历
    phone: '',//电话
    email:'',//邮箱
    workYear:'',//工作年限
    workplace:'',//所在公司
    isShowWorkplace:false,//是否显示所在公司
    certificatePrice:'',//证书与奖项
    workHistory:'',//工作履历
    resume:'',//个人简历
    address: '',//详细地址
    abilityTag:'',//能力标签
    skillTag:'',//技能标签*/
    //serviceTime:'',//服务时间
   // ifUnderLine:'',//是否接受线下服务
    //---右箭头是否显示标识 开始
    regionFlag: 1,
    abilityFlag:1,
    skillFlag:1,
    serviceFlag:1,
    underlineFlag:1,
    //---右箭头是否显示标识  结束
    //----modal显示标识
    showSkillModal:false,
    showAbilityModal:false,
    //-----数据库获取能力和技能标签列表
    abilityTagList: [],//全部能力标签
    skillTagList:[],//全部技能标签
    skillChecks:[],//选中的技能标签集合
    skillChecksText:[],
    abilityChecks:[],//选中的能力标签集合
    alilityChecksText:[],
    showServiceAction: false,
    showUnderLineAction:false,
    serviceGroups: [

    ],
    underLineGroups: [
      { text: '是', value: 0 },
      { text: '否', value: 1 }

    ],

    serviceTimeText:'',

    underLineText:''
  },
  //换头像
  changeImg(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=>{
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setData({
          'userTop.avatarUrl':tempFilePaths[0]
        })
        //更新数据库
         request({
           method: "PUT",
           url: "/editavatar",
           data: {
             id:this.data.userId,
             'userTop.avatarUrl':tempFilePaths[0]
           },
           header: {
             'content-type': 'application/json'
           }
         }).then(result=>{

             wx.showToast({
               title: '头像切换成功',
               duration: 2000
             })

         })
      }
    })
  },
  handleBindInput: function(e){
    //debugger;
    let item=e.currentTarget.dataset.item; //在每个input绑定不同的item作为标识
    const userTop=this.data.userTop
    userTop[item]=e.detail.value //对象的属性名称是动态判定时，通过方括号标记访问
    this.setData({
      userTop
    })
  },
  onLoad: function (){
    //获取用户ID
    this.setData({ userId: wx.getStorageSync("userId") });
    //获取全部能力标签
    this.getAbilityTagList("B01");
    //获取全部技能标签
    this.getSkillTagList("B02");
    //获取服务时间列表
    this.getDicItemList("service_time").then(res=>{
      this.setData({
        serviceGroups: res.result
      })
    }).then(res=>{
      //获取用户资料
      this.getUserProfile()
    })

  },
  async getDicItemList(code) {
   return await getDictByCode({
      code
    })
  },
  //获取用户资料
  getUserProfile(){
   request({
      url: "/user",
      data: {
        id:this.data.userId
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res=>{
        const {result}=res;
        this.setData({
          userTop:result

        })
        if(result.region){
          this.setData({
            region:[result.region,result.region1,result.region2]
          })
        }
        if(result.abilityTag && result.abilityTag.length > 0 ){
          this.setData({
            abilityChecks:result.abilityTag.split(",")
          })
        }
        if(result.skillTag && result.skillTag.length > 0 ){
          this.setData({
            skillChecks:result.skillTag.split(",")
          })
        }
        if(result.serviceTime){
          this.setData({
            serviceTimeText:this.data.serviceGroups[result.serviceTime].text,
          })
        }
        if(result.ifUnderLine){
          this.setData({
            underLineText:this.data.underLineGroups[result.ifUnderLine].text,
          })

        }



    })
  },
   getAbilityTagList(pcode) {
    request({
      url: "/categoryByCode",
      data: {
        pcode
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res=>{
      const result=res.result
      this.setData({
        abilityTagList:result
      })
    })
  },
   getSkillTagList(pcode) {
     request({
      url: "/categoryByCode",
      data: {
        pcode
      },
      header: {
        'content-type': 'application/json'
      }

    }).then(res=>{
       this.setData({
         skillTagList:res.result
       })
     })
  },
  formSubmit(e){
    let data= e.detail.value;
    data.region=this.data.region[0];
    data.region1=this.data.region[1];
    data.region2=this.data.region[2];
    data.id=this.data.userId;
    data.serviceTime=this.data.userTop.serviceTime;
    data.ifUnderLine=this.data.userTop.ifUnderLine;
    if(this.data.abilityChecks && this.data.abilityChecks.length>0){
      data.abilityTag=this.data.abilityChecks.join(',');
    }
    if(this.data.skillChecks && this.data.skillChecks.length>0){
      data.skillTag=this.data.skillChecks.join(',');
    }

    console.log(data);
    request({
      method: "PUT",
      url: "/edituser",
      data: data,
      header: {
        'content-type': 'application/json'
      }
    }).then(res=>{
      wx.showToast({
        title: '保存成功',
        duration: 2000
      })
      wx.navigateBack({
        delta:1
      });
    })
  },
  btnClickService(e) {
    this.setData({
      'userTop.serviceTime':e.detail.value,
      serviceTimeText:this.data.serviceGroups[e.detail.index].text,
      serviceFlag: 0
    })
    this.close()
  },
  btnClickUnderLine(e) {
    this.setData({
      'userTop.ifUnderLine':e.detail.value,
      underLineText:this.data.underLineGroups[e.detail.index].text,
      underlineFlag: 0
    })
    this.close()
  },
  close: function () {
    this.setData({
      showServiceAction: false,
      showUnderLineAction:false
    })
  },
  showUnderLineTime(e){
    this.setData({
      showUnderLineAction:true
    })
  },
  showServiceTime(e){
    this.setData({
      showServiceAction:true
    })
  },
  checkboxChangeSkill: function (e) {
    console.log(e.detail.value)
    // const bb=e.detail.value;
    this.setData({
      skillChecks: e.detail.value,
      // skillChecksText:aa,
      skillFlag: 0
    })
  },
  checkboxChangeAbility: function (e) {
    console.log(e)
    // <checkbox value="{{child.code}},{{child.name}}"  checked="{{child.checked}}"/>{{child.name}}
    // let item = e.detail.value //选中的数组
    // let code = []; //选中的ID
    // let name = []; //选中的NAME
    //
    // //循环选中的数组，取出对应的数据进行数组拼接
    // for (let i = 0; i < item.length; i++) {
    //   let row = item[i].split(",") //将数组进行分割
    //   code = code.concat(row[0]) //数组下表的第一个为id
    //   name = name.concat(row[1]) //数组下表的第二个为name
    // }
    // console.log(code)
    // console.log(name)
    //let array=this.ablilityTag;
    //TODO :
    this.setData({
      abilityChecks: e.detail.value,
      abilityFlag: 0
    })

  },
  showSkillDialog(e){
    if(this.data.skillChecks && this.data.skillChecks.length>0){
      let skillArray=this.data.skillChecks;

      const list= this.data.skillTagList;

        for(let c in list){
          if(skillArray.includes(list[c].code) ){
            var temp_str='skillTagList['+c+'].checked';
            console.log(temp_str);
            this.setData({
              [temp_str]:true
            });
          }
        }

    }
    this.setData({
      showSkillModal:true
    })
  },
  showAbilityDialog(e){
    //勾选能力标签
    if(this.data.abilityChecks && this.data.abilityChecks.length>0){
      let abilityArray=this.data.abilityChecks;

      const list= this.data.abilityTagList;
      for(let a in list){
        for(let c in list[a].child){
          if(abilityArray.includes(list[a].child[c].code) ){
            var temp_str='abilityTagList['+a+'].child['+c+'].checked';
            console.log(temp_str);
            this.setData({
              [temp_str]:true
            });
          }
        }
      }
    }
    this.setData({
      showAbilityModal:true
    })
  },
  modalConfirmSkill(e){
    this.setData({
      showSkillModal:false
    })
  },
  modalConfirmAbility(e){
    this.setData({
      showAbilityModal:false
    })
  },
  bindRegionChange: function (e) {
    this.setData({ region: e.detail.value, regionFlag: 0 });
  },


});
