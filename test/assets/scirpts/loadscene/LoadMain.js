

cc.Class({
    extends: cc.Component,

    properties: {
        imgs:{
                default: [],
                type: [cc.SpriteFrame],       // 子弹所需要的图集
            },
            btnClose: {
                default: null,
                type: cc.Button,
            },
            bulletAtlas: {
                default: null,
                type: cc.SpriteAtlas,       // 子弹所需要的图集
            },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        cc.vv.utils.addClickEvent(this.btnClose,this.node,"LoadMain","onClose");
    },
    onClose(){
        cc.director.loadScene("login");
    },
    start () {

    },

    // update (dt) {},
});
