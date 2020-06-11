 

cc.Class({
    extends: cc.Component,

    properties: {
        FishID:0,
        FishKind:0,
    },

    ctor() {
         this.colliders = []
    },

     onEnable: function () {
       this.initCollider();
       console.log("-------->onEnable")
    },

    onDisable: function () {
        this.remove();
    },

    remove() {
        var len = this.colliders.length;
        for (var i = 0; i < len; i++) {
            cc.director.getCollisionManager().removeCollider(this.colliders[i]);
        }
        this.colliders = [];
    },
    
    initCollider() {
    
                        var cirle = new cc.CircleCollider(); 
                        cirle.offset = new cc.Vec2(0,0);
                        cirle.radius =100;
                        cirle.node = this.node;
                        cc.director.getCollisionManager().addCollider(cirle);     
    },

    // update (dt) {},
});
