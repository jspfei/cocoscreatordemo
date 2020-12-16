cc.Class({
    extends: cc.Component,
    properties: {
        A: 0,
        B: 0,
        C: 0,
    },

    // 初始化贝塞尔信息
    init(points) {
        if (points.length == 3) {
            var ax = points[0].x - 2 * points[1].x + points[2].x;
            var ay = points[0].y - 2 * points[1].y + points[2].y;
            var bx = 2 * points[1].x - 2 * points[0].x;
            var by = 2 * points[1].y - 2 * points[0].y;
            var A = 4 * (ax * ax + ay * ay);
            var B = 4 * (ax * bx + ay * by);
            var C = bx * bx + by * by;
            this.points = points;
            this.A = A, this.B = B, this.C = C;
            this.BezierLength = this.length(1);
            return this.BezierLength;
        }
        else if (points.length == 2) {
            var bx = points[0].x - points[1].x;
            var by = points[0].y - points[1].y;
            var A = 0;
            var B = 0;
            var C = bx * bx + by * by;
            this.points = points;
            this.A = A, this.B = B, this.C = C;
            this.BezierLength = this.length(1);
            return this.BezierLength;
        }
    },

    // 获取曲线上指定百分比的点坐标
    point(percent) {
        var points = this.points;
        var len = percent * this.BezierLength;
        var t = this.invert(percent, len);
        if (points.length == 3) {
            var px = (1 - t) * (1 - t) * points[0].x + 2 * (1 - t) * t * points[1].x + t * t * points[2].x;
            var py = (1 - t) * (1 - t) * points[0].y + 2 * (1 - t) * t * points[1].y + t * t * points[2].y;
            return { x: px, y: py }
        }
        else if (points.length == 2) {
            var px = (1 - t) * points[0].x + t * points[1].x;
            var py = (1 - t) * points[0].y + t * points[1].y;
            return { x: px, y: py }
        }
    },

    // 获取曲线的总长度
    length(t) {
        var points = this.points;
        var A = this.A, B = this.B, C = this.C;
        if (points.length == 3) {
            var temp1 = Math.sqrt(C + t * (B + A * t));
            var temp2 = (2 * A * t * temp1 + B * (temp1 - Math.sqrt(C)));
            var temp3 = Math.log(B + 2 * Math.sqrt(A) * Math.sqrt(C));
            var temp4 = Math.log(B + 2 * A * t + 2 * Math.sqrt(A) * temp1);
            var temp5 = 2 * Math.sqrt(A) * temp2;
            var temp6 = (B * B - 4 * A * C) * (temp3 - temp4);
            return (temp5 + temp6) / (8 * Math.pow(A, 1.5));
        }
        else if (points.length == 2) {
            return Math.sqrt(C) * t;
        }
    },

    // 根据长度和百分比获取时间(t[0-1])
    invert(percent, l) {
        if (this.points.length == 3) {
            var A = this.A, B = this.B, C = this.C;
            var t1 = percent;
            return t1 - (this.length(t1) - l) / Math.sqrt(A * t1 * t1 + B * t1 + C);
        }
        else if (this.points.length == 2) {
            return percent;
        }
    },
});