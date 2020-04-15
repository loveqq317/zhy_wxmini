
const app = getApp();

Page({
  data: {
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
    addressValue: '',
    floorValue: 0,
    remarksValue: '',
    addressStatus: 0,
    userID: 0,
    showSkillModal:false,
    showAbilityModal:false,
    items: [
      { name: '01', value: '城镇规划' },
      { name: '02', value: '文旅规划' },
      { name: '03', value: '乡村规划' },
      { name: '04', value: '风景区规划' }
    ],
    skillChecks:[],
    abilityChecks:[],
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
  },
  onLoad: function (){
    let self = this;
    this.setData({ userID: app.globalData.userID });
  },
  btnClickService(e) {
    console.log(e)
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
    this.setData({
      skillChecks: e.detail.value
    })
  },
  checkboxChangeAbility: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e)
    this.setData({
      abilityChecks: e.detail.value
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
