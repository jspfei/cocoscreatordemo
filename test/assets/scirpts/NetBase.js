let SOCK_STATE = require('SocketState');


cc.Class({
    extends: cc.Component,

    properties: {
        ws: null,
        isLittleEndian:true,
        isconnected:false,
        headLength:4,
        socket_state:SOCK_STATE.SC_NULL,
    },

    ctor() {
        this.handlers = {}
    },

    close() {
        if (this.ws){
            this.ws.close();
            this.ws = null;
        }
    },
    // 创建websocket 并连接服务器
    connect(ip) {
        this.socket_state = SOCK_STATE.SC_CONECTING;
        var wsip = "ws://" + ip;
        var self = this;
        var ws = new WebSocket(wsip);
        this.ws = ws;
        this.ip = wsip;
        ws.binaryType = 'arraybuffer';

        ws.onopen = function(event) {
            self.isconnected = true;
            self.socket_state = SOCK_STATE.SC_CONECTED;
            if (typeof (self.onOpen) == "function"){
                self.onOpen();
            }
        };

        ws.onmessage = function(event) {
            //目前只接受二进制流
            if (event.data instanceof ArrayBuffer) {
                //解析数据
                var dataView = new DataView(event.data);
                var mid = dataView.getUint16(0,self.isLittleEndian);
                var sid = dataView.getUint16(2,self.isLittleEndian);
                if (mid === 0){
                    self.send(0,1);
                    return;
                }
                var data = event.data.slice(4);
                if(typeof (self.onRecv) == "function"){
                    self.onRecv(mid,sid,data);
                }
            }
           
        };

        ws.onerror = function(event){
            self.isconnected = false;
            if(typeof (self.onError)=="function"){
                self.onError();
            }
        };

        ws.onclose = function(event){
            self.isconnected = false;
            if(typeof (self.onClose) == "function"){
                self.onClose();
            }

        };
    },
     
     // 发送数据
     sendData(mid, sid, data){
        if (this.ws && this.isconnected){
            var buffer = new Uint8Array(this.headLength + data.length);
            var head = new ArrayBuffer(this.headLength);
            var dataView = new DataView(head);
            dataView.setUint16(0,mid,this.isLittleEndian);
            dataView.setUint16(2,sid,this.isLittleEndian);

            var header = new Uint8Array(head);
            buffer.set(header, 0);
            buffer.set(data,this.headLength);
            this.ws.send(buffer.buffer);
        }

     },

     // 发送空数据
     send(mid, sid){
        if(this.ws && this.isconnected){
            var buffer = new ArrayBuffer(4);
            var dataView = new DataView(buffer);
            dataView.setUint16(0,mid,true);
            dataView.setUint16(2,sid,true);
            this.ws.send(buffer);
        }

     },
     isConnected() {
        return this.isconnected;
     },

     // 添加回调
     addEvent:function(mid, sid, fn){
        var event = mid + "$" + sid;

        if(this.handlers[event]){
            console.log("event:"+event+"'handler has bean registered'");
            return;
        }
        var handler = function(data){
            fn(data);
        };
        this.handlers[event] = handler;
     },

     removeAllEvents() {
        this.handlers = {};
     },

     // 分发回调
     handler(mid, sid, data){
        var event = mid + "$" +sid;
        if(this.handlers[event]){
            this.handlers[event](data);
        }
     } 
     
});
