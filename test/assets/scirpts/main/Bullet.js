 
var angle_rate = Math.PI / 180
cc.Class({
    extends: cc.Component,

    properties: {
       BulletID: 0,
       ChairID: 65535,
       LockFishId: 0,
       Angle: 1,            // 初始角度
        BulletSpeed: 1,      // 子弹的速度
        BulletLevel: 1,      // 子弹等级
        BulletPosid: 1,      // 子弹所属的位置
        IsBulletLiZi: false, // 是否是粒子炮    
    },

    onLoad(){
        this.SpriteAtlas = cc.fish.AssertMgr["bulletAtlas"];
        this.initBullet();
    },

  
    start() {
        if (this.LockFishId !== 0) {
            this.node.removeComponent(cc.CircleCollider);
        }
    },
  // 添加动画
    initBullet() {
          if (this.SpriteAtlas) {
            //播放子弹动画
            var atlas = this.SpriteAtlas
            var name1 = "bullet01_01";
            var name2 = "bullet01_02";

            var s1 = atlas.getSpriteFrame(name1);
            var s2 = atlas.getSpriteFrame(name2);
            var animation = this.addComponent(cc.Animation);
            var aniClip = cc.AnimationClip.createWithSpriteFrames([s1, s2], 2);
            aniClip.wrapMode = cc.WrapMode.Loop;
            aniClip.name = 'anim';
            animation.addClip(aniClip);
            this.animation = animation;
            var animState = this.animation.play('anim');
            animState.speed = 1;

            this.AddBulletCollider();

              // 设置初始角度
            this.node.angle = -this.Angle
            var dir = new cc.Vec2(0, 1);
            this.movedir = dir.rotateSelf((this.node.angle) * angle_rate);
        }
    },

       // 重新设置碰撞区域的大小
    AddBulletCollider() {
        this.node.removeComponent(cc.CircleCollider);
        var box = this.node.addComponent(cc.CircleCollider);
        box.offset = cc.v2(0, 0);
        box.radius = 18;
    },
      // 子弹与鱼发生碰撞
    onCollisionEnter(other, self) {
        var FishCollider = other.getComponent("FishCollider");
        var fish_id = FishCollider.FishID;
        var bullet_id = this.BulletID;
        console.log("-----------------fish_id----------",fish_id)
        this.doCatchFish(bullet_id, fish_id);
           
    },
      // 捕获鱼
    doCatchFish(bulletid, fishid) {
         this.node.destroy();
    },
     // 正常的子弹更新（非锁定鱼情况）
    normalUpdate() {
        var dir = new cc.Vec2(this.movedir.x * this.BulletSpeed, this.movedir.y * this.BulletSpeed)
        var pos = new cc.Vec2(this.node.x + dir.x, this.node.y + dir.y);
        var rect = new cc.Rect(0, 0, cc.winSize.width, cc.winSize.height);
        this.node.setPosition(pos.x, pos.y);
        // 位置不在矩形内
        if (!rect.contains(pos)) {
            var display = cc.winSize;
            if (pos.x < 0 || pos.x > display.width) {
                // 如果是在交叉点上则直接原路返回
                var angle = -this.node.angle;

                if (pos.y < 0) {
                    pos.y = 0;
                    angle += 180;
                }
                else if (pos.y > display.height) {
                    pos.y = display.height;
                    angle += 180;
                }
                else {
                    angle = -angle;
                }

                this.node.angle = -angle;
                if (pos.x < 0) {
                    pos.x = 0;
                }
                else {
                    pos.x = display.width;
                }
            }
            // 竖直两条线上
            else if (pos.y < 0 || pos.y > display.height) {
                var angle = -this.node.angle;
                if (pos.x < 0) {
                    pos.x = 0;
                    angle += 180;
                }
                else if (pos.y > display.width) {
                    pos.x = display.width;
                    angle += 180;
                }
                else {
                    angle = -angle + 180;
                }
                this.node.angle = -angle;
                if (pos.y < 0) {
                    pos.y = 0;
                }
                else {
                    pos.y = display.height;
                }
            }
            this.node.setPosition(pos.x, pos.y);
            var dirX = new cc.Vec2(0, 1);
            this.movedir = dirX.rotateSelf((this.node.angle) * angle_rate);
            var dir = new cc.Vec2(this.movedir.x * this.BulletSpeed, this.movedir.y * this.BulletSpeed);
            var pos = new cc.Vec2(this.node.x + dir.x, this.node.y + dir.y);
            this.node.setPosition(pos.x, pos.y);
        }
    },
    update (dt) {
        this.normalUpdate();
    },
});
