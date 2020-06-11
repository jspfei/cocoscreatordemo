 
cc.Class({
    extends: cc.Component,

    properties: {
       FishId:0,      // 鱼的索引
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    
    ctor () {
        this.isAlive = true;
    },
    start () {

    },

    init(fishkind,fishid){
         // 初始化碰撞信息
            var FishCollider = this.node.getComponent("FishCollider");
            FishCollider.FishKind = fishkind;
            FishCollider.FishID = fishid;

               var pos = new cc.Vec2(200, 490);
            this.node.setPosition(pos.x, pos.y);
    },
    setFishDead(){
        this.isAlive = false;

        this.removeCollier();

        var finished = cc.callFunc(function(target){
            this.node.destory();
        },this,0);

        var ac = cc.sequence(cc.fadeOut(2.0),finished);
        this.node.runAction(ac);
    },
      // 移除相关的碰撞体
    removeCollier () {
         var FishCollider = this.node.getComponent("FishCollider");
         FishCollider.remove();
    },
      // 是否有效
    IsVaild () {
        var rect = new cc.Rect(0, 0, cc.winSize.width, cc.winSize.height);
        // 在矩形内 且没有死去
        if ((rect.contains(this.node.position)) && this.isAlive) {
            return true;
        }
        return false;
    },

});
