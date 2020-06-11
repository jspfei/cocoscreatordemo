// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       loginWx: {
            default: null,
            type: cc.Button,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.vv.utils.addClickEvent(this.loginWx,this.node,"LoginUI","onLoginWx");
    },

    start () {

    },
    onLoginWx(){
         cc.login.LoginUIMgr.showDlgLogin();
    }

    // update (dt) {},
});
