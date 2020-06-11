function initGame() {
    cc.fish = {};
    cc.vv.utils.setFitSreenMode();
    cc.fish.BulletLayer = cc.find("Canvas/BulletLayer");
    cc.fish.FishLayer = cc.find("Canvas/FishLayer");
    cc.fish.DlgLayer = cc.find("Canvas/DlgLayer");

     var Canvas = cc.find("AssertMgr");
    cc.fish.AssertMgr = Canvas.getComponent("AssertMgr");
}


cc.Class({
    extends: cc.Component,
    properties: {

    },

    onLoad() {
        initGame()
         cc.director.getCollisionManager().enabled = true;
    }

});
