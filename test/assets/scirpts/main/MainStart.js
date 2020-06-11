function initGame() {
    cc.fish = {};
    cc.vv.utils.setFitSreenMode();
    cc.fish.BulletLayer = cc.find("Canvas/BulletLayer");
    cc.fish.FishLayer = cc.find("Canvas/FishLayer");
    cc.fish.DlgLayer = cc.find("Canvas/DlgLayer");
    cc.fish.EffectLayer = cc.find("Canvas/EffectLayer");
     var Canvas = cc.find("AssertMgr");
    cc.fish.AssertMgr = Canvas.getComponent("AssertMgr");

    cc.fish.EffectMgr = cc.fish.EffectLayer.getComponent("EffectMgr");
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
