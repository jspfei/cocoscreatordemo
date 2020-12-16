 

cc.Class({
    extends: cc.Component,

    properties: {
       moveBtn:{
           default:null,
           type:cc.Button
       }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.vv.utils.addClickEvent(this.moveBtn,this.node,"BtnCtrl","onMoveBtn");
    },

    start () {

    },
    onMoveBtn(){
        cc.vv.TweenCtrl.moveFish();
    }
    // update (dt) {},
});
