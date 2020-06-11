 
function init(){
    cc.login = {}
    var ui = cc.find("Canvas/ui");
   //  cc.vv.utils.setFitSreenMode();

     cc.login.loginUI  = ui.getComponent("LoginUI");
     cc.login.LoginUIMgr = ui.getComponent("LoginUIMgr");
     cc.login.DlgLayer = cc.find("Canvas/DlgLayer");
}
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        init();
    },

    start () {

    },

    // update (dt) {},
});
