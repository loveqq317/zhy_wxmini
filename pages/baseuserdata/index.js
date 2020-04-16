
const app = getApp();

Page({
  data: {
    userId:'',
    elevatorFlag: 0,
    nameValue: '',
    universityValue:'',
    majorValue:'',
    educationValue:'',
    phoneValue: '',
    emailValue:'',
    workYearValue:'',
    workPlaceValue:'',
    isShowWorkplace:false,
    certificatePriceValue:'',
    workHistoryValue:'',
    resumeValue:'',
    region: ["省", "市", "区"],
    regionFlag: 1,
    abilityFlag:1,
    skillFlag:1,
    serviceFlag:1,
    underlineFlag:1,
    addressValue: '',
    floorValue: 0,
    remarksValue: '',
    addressStatus: 0,

    showSkillModal:false,
    showAbilityModal:false,
    items: [
      { name: '01', value: '城镇规划' },
      { name: '02', value: '文旅规划' },
      { name: '03', value: '乡村规划' },
      { name: '04', value: '风景区规划' }
    ],
    skillChecks:[],
    skillChecksText:[],
    abilityChecks:[],
    alilityChecksText:[],
    showServiceAction: false,
    showUnderLineAction:false,
    serviceGroups: [
      { text: '全部时间', value: 0 },
      { text: '工作日夜晚', value: 1 },
      { text: '工作日夜晚及休息日', value: 2},
      { text: '休息日', value: 3},
    ],
    underLineGroups: [
      { text: '是', value: 0 },
      { text: '否', value: 1 }

    ],
    serviceTimeValue:'',
    serviceTimeText:'',
    underLineValue:'',
    underLineText:''
  },
  onLoad: function (){
    let self = this;
    this.setData({ userId: wx.getStorageSync("userId") });
    wx.request({
      url: "http://localhost:8080/jeecg-boot/api/mini/user/user",
      data: {
        id:this.data.userId
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) =>{
        console.log(res.data.result);
        const data=res.data.result;
        this.setData({
          nameValue:data.name
        })
      }
    })
  },
  formSubmit(e){
    console.log(e.detail.value);
    let data= e.detail.value;
    data.serviceTime=this.data.serviceTimeValue;
    data.ifUnderLine=this.data.underLineValue;
    data.ablilityTag=this.data.abilityChecks.join(',');
    data.skillTag=this.data.skillChecks.join(',');
   // data.push('isShow')
    console.log(data)
  data.id=this.data.userId;
    wx.request({
      method: "PUT",
      url: "http://localhost:8080/jeecg-boot/api/mini/user/edituser",
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.showToast({
          title: '保存成功',
          duration: 2000
        })
      }
    })

  },
  btnClickService(e) {
    console.log(e)
    this.setData({
      serviceTimeValue:e.detail.value,
      serviceTimeText:this.data.serviceGroups[e.detail.index].text,
      serviceFlag: 0
    })
    this.close()
  },
  btnClickUnderLine(e) {
    console.log(e)
    this.setData({
      underLineValue:e.detail.value,
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
    console.log('checkbox发生change事件，携带value值为：', e)
    const bb=e.detail.value;
    //TODO :
    const aa= this.data.items.filter(function (e) { return  bb.includes(e.name); })
        .map(function(s){return s.value});
    this.setData({
      skillChecks: e.detail.value,
      skillChecksText:aa,
      skillFlag: 0
    })
  },
  checkboxChangeAbility: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e)
    const bb=e.detail.value;
    //TODO :
   const aa= this.data.items.filter(function (e) { return  bb.includes(e.name); })
       .map(function(s){return s.value});
    this.setData({
      abilityChecks: e.detail.value,
      alilityChecksText:aa,
      abilityFlag: 0
    })

  },
  showSkillDialog(e){
    this.setData({
      showSkillModal:true
    })
  },
  showAbilityDialog(e){
    this.setData({
      showAbilityModal:true
    })
  },
  modalConfirmSkill(e){
    console.log(33333)
    this.setData({
      showSkillModal:false
    })
  },
  modalConfirmAbility(e){
    console.log(33333)
    this.setData({
      showAbilityModal:false
    })
  },
  changeIconStatu: function () {
    var self = this;
    this.setData({ elevatorFlag: !self.data.elevatorFlag});
  },
  getNameValue: function (e) {
    this.setData({ nameValue: e.detail.value });
  },
  getUniversityValue(e){
    this.setData({ universityValue: e.detail.value });
  },
  getMajorValue(e){
    this.setData({ majorValue: e.detail.value });

  },
  getEducationValue(e){
    this.setData({ educationValue: e.detail.value });

  },
  getPhoneValue: function (e) {
    this.setData({ phoneValue: e.detail.value });
  },
  getEmailValue(e){
    this.setData({ emailValue: e.detail.value });
  },
  getWorkYearValue(e){
    this.setData({ workYearValue: e.detail.value });
  },
  getWorkPlaceValue(e){
    this.setData({ workPlaceValue: e.detail.value });
  },
  handleCheckboxChange(e){
    this.setData({isShowWorkplace:!this.data.isShowWorkplace})
    console.log(this.data.isShowWorkplace)
  },
  getCertificatePriceValue(e){
    this.setData({ certificationPriceValue: e.detail.value });
  },
  getWorkHistoryValue(e){
    this.setData({ workHistoryValue: e.detail.value });
  },
  getResumeValue(e){
    this.setData({ resumeValue: e.detail.value });
  },
  bindRegionChange: function (e) {
    this.setData({ region: e.detail.value, regionFlag: 0 });
  },
  getAddressValue: function (e) {
    this.setData({ addressValue: e.detail.value });
  },
  getFloorValue: function (e) {
    this.setData({ floorValue: e.detail.value });
  },

  // defaultChange: function (e){
  //   if (e.detail.value){
  //     this.setData({ addressStatus: 1 });
  //   }else{
  //     this.setData({ addressStatus: 0 });
  //   }
  // },
  saveNewAddress: function () {

  }
});
