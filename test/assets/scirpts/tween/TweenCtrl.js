
 
cc.Class({
    extends: cc.Component,

    properties: {
        fish:{
            default:null,
            type:cc.Node
        },
        Camera:{
            default:null,
            type:cc.Camera
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () { 
        
        // /*cc.follow(第一个参数为cc.Node,第二个参数可选:cc.Rect)，返回cc.Action*/
        // Camera.node.runAction(cc.follow(cc.Node));
        // //camera执行动作跟随node
        // Camera.node.runAction(cc.follow(cc.Node,new cc.Rect(-10,-10,20,20)));

        cc.vv.TweenCtrl = this;
    },

    start () {

    },
    moveFish(){
        let self = this;
         TweenLite.to(this.fish, 2, { ease: Power3.easeOut, x: 1300, opacity: 255, onComplete: function () {
           console.log("---moveFish----")
          // self.camera.node.setPosition(self.fish.x,self.fish.y);
         }});
     
     
    
    }
    // update (dt) {},
});
