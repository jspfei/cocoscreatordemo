// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onEnable:function(){
        this.node.scale = 0;
        this.node.opacity = 0;
        var scale = cc.scaleTo(0.3,1).easing(cc.easeBackOut());
        var fade = cc.fadeIn(0.3);
        var sp = cc.spawn(scale,fade);
        this.node.runAction((sp));
    }

    // update (dt) {},
});
