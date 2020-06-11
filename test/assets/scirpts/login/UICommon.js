// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        BtnOk: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
         cc.vv.utils.addClickEvent(this.BtnOk, this.node, "UICommon", "onBtnOk");
       
    },

    start () {

    },
    onBtnOk(){
        console.log("onBtnOk")
        // 切换到大厅场景
        cc.director.loadScene("main");
    }

    // update (dt) {},
});
