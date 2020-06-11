var angleAry = [30,40,60,90,120]
cc.Class({
    extends: cc.Component,

    properties: {
         // 子弹预制体
        Bullet: cc.Prefab,
        cannonangle: 0,
        angle: 0,
        bulletId:0,
         // 锁定起始位置
        sendBtn: {
            default: null,
            type: cc.Button,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
          cc.vv.utils.addClickEvent(this.sendBtn, this.node, "Cannon", "onSend");
    },

    start () {

    },
    onSend(){
        console.log("--------------------->")
        var index = Math.ceil(Math.random()*5); 
        this.angle = angleAry[index]
        this.bulletId++;
        this.fireBullet()
    },
    // 发射子弹
    fireBullet() {
          // 创建子弹
        var bullet = cc.instantiate(this.Bullet);
        var bulletctrl = bullet.getComponent("Bullet");
        bulletctrl.ChairID =200;
        bulletctrl.BulletID = 1;
        bulletctrl.Angle =  this.angle;
        bulletctrl.BulletSpeed = (this.bulletId / 2) * 1.2;   // 速度

        var bulletLayer = cc.fish.BulletLayer;
        var pos = this.sendBtn.node.convertToWorldSpaceAR(cc.v2(0, 0));
        bullet.parent = bulletLayer;
        bullet.setPosition(pos.x, pos.y);
    }
    // update (dt) {},
});
