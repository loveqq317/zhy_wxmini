Component({
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },
  data: {

  },
  methods: {
    handleTab(e){
      //解构，复制一份引用
      let {index} = e.currentTarget.dataset;
      this.triggerEvent("itemChange",{index});
    },
  }
});
