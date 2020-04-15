
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
    userID: 0
  },
  onLoad: function (){
    let self = this;
    this.setData({ userID: app.globalData.userID });
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
  getRemarksValue: function (e) {
    this.setData({ remarksValue: e.detail.value });
  },
  defaultChange: function (e){
    if (e.detail.value){
      this.setData({ addressStatus: 1 });
    }else{
      this.setData({ addressStatus: 0 });
    }
  },
  saveNewAddress: function () {
    let self = this,
        regionFlag = self.data.regionFlag,
        addressStatus = self.data.addressStatus,
        region = self.data.region,
        str = '';
    for (let i = 0, len = region.length; i < len; i++){
      if (region[i].length == 1){region[i] = region[i-1];}
      str += region[i] + ' ';
    }
    let byUrl = api.INTERFACES.findByAddress, byData = { areaName: str};
    if (!common.ISNAME(self.data.nameValue)){
      common.SHOWTIPS('请输入您的昵称', 'none'); return;
    }else if (!common.ISPHONE(self.data.phoneValue)){
      common.SHOWTIPS('请输入正确的11位手机号码', 'none'); return;
    } else if (self.data.regionFlag) {
      common.SHOWTIPS('请选择省市区', 'none'); return;
    } else if (!self.data.textareaValue){
      common.SHOWTIPS('请输入详细地址', 'none'); return;
    } else if (!self.data.floorValue){
      common.SHOWTIPS('请输入楼层号', 'none'); return;
    }
  }
});
