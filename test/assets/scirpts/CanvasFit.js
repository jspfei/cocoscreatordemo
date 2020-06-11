// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //子域画布
        subDomainCanvas: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("---------------sss")
      if(cc.director.getWinSize().width / cc.director.getWinSize().height - 16 / 9 > 0.1){ 
        this.node.getChildByName("bg").scaleX = cc.director.getWinSize().width / 1366;
       }
    },

    start () {

    },

    // update (dt) {},
});
