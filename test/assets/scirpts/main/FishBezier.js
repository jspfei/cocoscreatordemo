var FishState = cc.Enum({
    Null: 0,
    Move: 1,
    Pause: 2,
    Finish: 3,
});

cc.Class({
    extends: cc.Component,
    properties: {
        // 贝塞尔曲线运动相关属性，贝塞尔曲线的控制点信息（2个或者3个 否则视为无效设置）
        BezierPoints: {
            default: [],
            type: [cc.Vec2],
        },
        // 运动的状态
        State: {
            default: FishState.Move,
            type: FishState,
        },
        // 沿贝塞尔曲线的运动速度
        BezierSpeed: 1,
        IsCanRote: true,
        angle: 0,
    },

    onLoad() {
        this.trace_index = 0;
        this.IsMoveCircle = false;
        this.setFishStop(0, 0);
        this.initBezierConfig();
    },

    start() {

    },

    // 初始化贝塞尔曲线配置
    initBezierConfig() {
        this.BezierTime = 0;
        if (this.BezierPoints.length > 3 || this.BezierPoints.length < 2) {
            
            this.State = FishState.Null;
            console.log(this.State+"======>")
            return;
        }

        this.State = FishState.Move;
        var BezierHelper = require("BezierHelper");
        this.BezierHelper = new BezierHelper();
        var BezierLength = this.BezierHelper.init(this.BezierPoints);
        this.AllTime = BezierLength / this.BezierSpeed / 30;
        this.lastPos = new cc.Vec2(this.BezierPoints[0].x, this.BezierPoints[0].y);
        this.node.setPosition(this.lastPos);
        console.log(this.State+"======>")
    },

    fishUpdate() {
        // 计算移动的百分比
        var percent = this.BezierTime / this.AllTime;
        var pos = this.BezierHelper.point(percent);
        var radio2 = cc.vv.radio2;
        pos.x *= radio2.x;
        pos.y *= radio2.y;
        this.node.setPosition(pos.x, pos.y);
        var angle = 360 - (90 - 180 / Math.PI * Math.atan2(pos.x - this.lastPos.x, pos.y - this.lastPos.y));
        if (this.IsCanRote) {
            this.node.angle = -angle;
        }
        this.angle = angle;
        this.lastPos.x = pos.x;
        this.lastPos.y = pos.y;
    },

    setFishActive() {
        this.State = FishState.Move;
    },

    setFishUnActive() {
        this.State = FishState.Pause;
    },

    checkStop() {
        if ((this.stop_count_ > 0) && (this.trace_index === this.stop_index_) && (this.current_stop_count_ < this.stop_count_)) {
            this.current_stop_count_ += 1;
            if (this.current_stop_count_ >= this.stop_count_) {
                this.setFishStop(0, 0);
            }
            return true;
        }
        else {
            this.trace_index++;
            return false;
        }
    },

    updateCircle() {
        if (this.circle) {
            var pos = this.circle.center;
            var x = pos.x + this.circle.radius * Math.cos(this.circle.angle * Math.PI / 180);
            var y = pos.y + this.circle.radius * Math.sin(this.circle.angle * Math.PI / 180);
            this.circle.angle += this.circle.speed;
            this.circle.angle_all += this.circle.speed;
            this.node.setPosition(x, y);
            var angle = cc.vv.utils.getAngle2Pos(pos, cc.v2(x, y));
            // 计算切线方向的角度
            this.node.angle = -(angle + 90);
            if (this.circle.dis < this.circle.angle_all) {
                this.IsMoveCircle = false;
                var pos_begin = cc.v2(x, y);
                var pos_end = cc.vv.utils.GetCirclePoint(pos_begin, cc.winSize.width, angle + 90 + 180);
                // 开始执行贝塞尔曲线
                this.BezierPoints.push(pos_begin);
                this.BezierPoints.push(pos_end);
                this.initBezierConfig();
            }
        }
    },

    update(dt) {
        if (this.State !== FishState.Move) return;
        console.log("======>")
        if (this.IsMoveCircle) {
            this.updateCircle()
            return;
        }

        if (this.checkStop()) {
            return;
        }

        this.BezierTime = this.BezierTime + dt;

        if (this.BezierTime >= this.AllTime) {
            this.State = FishState.Finish;
            var fish = this.node.getComponent("Fish");
            if (fish) {
                if (cc.fish && cc.fish.FishMgr) {
                    cc.fish.FishMgr.DeleteFish(fish.FishId);
                }
                fish.isAlive = false;
            }

            // 移动到终点执行相关的回调
            this.node.enabled = false;
            this.node.destroy();
            return;
        }
        console.log("======>")
        this.fishUpdate();
    },

    setFishStop(stop_index, stop_count) {
        this.stop_index_ = stop_index
        this.stop_count_ = stop_count
        this.current_stop_count_ = 0
    },

    // 设置圆周运动的信息
    setCircleInfo(info) {
        this.circle = info;
        this.circle.angle_all = 0;
        this.IsMoveCircle = true;
    },
});
