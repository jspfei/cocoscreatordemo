// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
     // 给按钮添加响应事件
    addClickEvent: function (node, target, component, handler, customEventData, clickAudio) {
        if (!node) {
            cc.log("addClickEvent Error", component);
            return;
        }
        //console.log(component + ":" + handler);
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;
        eventHandler.customEventData = customEventData;

        var clickEvents = node.getComponent(cc.Button).clickEvents;
        var self = this;
        var node_lister = node;
        if (node.node) {
            node_lister = node.node;
        }
        node_lister.on(cc.Node.EventType.TOUCH_START, function () {
            if (clickAudio) {
                clickAudio(); //cc.vv.audioMgr.playSfxEffect(clickAudio);
            } else {
                // 播放按钮
               
            }
        });
        clickEvents.push(eventHandler);
    },
    // 设置屏幕适配模式
    setFitSreenMode: function () {
        var node = cc.find('Canvas'); 
        var size = cc.view.getFrameSize();
        var w = size.width;
        var h = size.height;

        //var designSize = cc.view.getDesignResolutionSize();
        var cvs = node.getComponent(cc.Canvas);
        var dw = cvs.designResolution.width;
        var dh = cvs.designResolution.height;
        // 如果更宽 则让高显示满
        if ((w / h) <= dw / dh) {
            cvs.node.width = dw;
            cvs.node.height = dw * h / w;
            cvs.designResolution = cc.size(cvs.node.width, cvs.node.height);

            cvs.fitHeight = false;
            cvs.fitWidth = true;
            cc.log("正常的显示");
        }
        else {
            cvs.node.width = dh * w / h;
            cvs.node.height = dh;
            cvs.designResolution = cc.size(cvs.node.width, cvs.node.height);

            // 如果更高，则按刘海屏处理
            cvs.fitHeight = true;
            cvs.fitWidth = true;
            cc.log("刘海屏显示");
        }
        // 屏幕的比例
        cc.vv.radio2 = cc.v2(cc.winSize.width / 1366, cc.winSize.height / 768);
        //cc.log(cc.winSize.width,cc.winSize.height);

        // var rootBg = cc.find('Canvas/bg');
        // if (cc.vv.radio2.x > cc.vv.radio2.y) {
        //     rootBg.width = rootBg.width * cc.vv.radio2.x;
        //     rootBg.height = rootBg.height * cc.vv.radio2.x;
        // }
        // else {
        //     rootBg.width = rootBg.width * cc.vv.radio2.y;
        //     rootBg.height = rootBg.height * cc.vv.radio2.y;
        // }
    },

    httpGets:function(url,callback){
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && (xhr.state >= 200 && xhr.status < 300)){
                var respone = xhr.responseText;
                callback(respone);
            }
        };
        xhr.open("GET",url,true);
        if (cc.sys.isNative){
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
        }

        xhr.timeout = 5000;

        xhr.send();
    },
    httpPost:function(url,params,callback,onerror,ontimeout){
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && (xhr.state >= 200 && xhr.status < 300)){
                var respone = xhr.responseText;
                callback(respone);
            } else {
                callback(-1);
            }
        };

        xhr.open("POST",url,true);
        if(cc.sys.isNative){
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
        }

        xhr.onerror = function(e){
            if(onerror){
                onerror();
            }
        };

        xhr.ontimeout = function(e){
            if(ontimeout){
                ontimeout();
            }
        };

        xhr.timeout = 5000;

        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        xhr.send(params);
    },
    // update (dt) {},
});
