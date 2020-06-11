 

cc.Class({
    extends: cc.Component,

    properties: {
        fish:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    PlayEffect(pos){
        var fish = cc.instantiate(this.fish);
        
        fish.parent =  cc.fish.EffectLayer;
        fish.setPosition(pos.x, pos.y);
    }
});
