const app = getApp();

/*
小程序利用canvas实现一键保存图片功能 */
Page({

  /**
   * 页面的初始数据
   */
  data: {

    canvasHidden: true,     //设置画板的显示与隐藏，画板不隐藏会影响页面正常显示
    wxappName: '页面生成图片',    //小程序名称
    shareImgPath: '',
    screenWidth: '',       //设备屏幕宽度
    shareImgSrc: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取用户设备信息，屏幕宽度
    wx.getSystemInfo({
      success: res => {
        that.setData({
          screenWidth: res.screenWidth
        })
        console.log(that.data.screenWidth)
      }
    })

    that.setData({
      cname: options.id
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {



    var that = this;
    var context = wx.createCanvasContext('share')
    context.setStrokeStyle("#00ff00")
    context.setLineWidth(1)
    context.stroke()
    context.draw(false, this.getTempFilePath)
  },

  //获取临时路径
  getTempFilePath: function () {
    wx.canvasToTempFilePath({
      canvasId: 'share',
      success: (res) => {
        this.setData({
          shareTempFilePath: res.tempFilePath
        })
      }
    })
  },
  /**
   * 绘制多行文本，由于文字比较多，这里我们写了一个函数处理
   */
  drawText: function (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
    var lineWidth = 0;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > canvasWidth) {
        ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
        initHeight += 16; //16为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
        titleHeight += 30;
      }
      if (i == str.length - 1) { //绘制剩余部分
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
      }
    }
    // 标题border-bottom 线距顶部距离
    titleHeight = titleHeight + 10;
    return titleHeight
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    wx.downloadFile({
      url: that.data.shareImgSrc,
      success: function (res) {
        that.data.shareImgSrc = res.tempFilePath
      }, fail: function (res) {
      }
    })
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
