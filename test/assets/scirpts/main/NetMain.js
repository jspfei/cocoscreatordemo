 let SOCK_STATE = require("SocketState");
 let netbase = require("NetBase");

cc.Class({
    extends: netbase,

    properties: {
      
    },

    init(){
        // 定义命令
        // 定义协议
        // 初始化协议
        // 加载监听协议
    },
    // onLoad () {},

    start () {

    },
    // 网络连接成功
    onOpen(){

    },

    // 网络连接出错
    onError(){
        if (this.socket_state == SOCK_STATE.SC_CONECTING) {//如果是正在连接状态 则发起切换域名请求
            this.reconectTryLogin();
        } else {
            this.socket_state == SOCK_STATE.SC_NULL;
        }
    },

    reconectTryLogin() {
        var host = cc.vv.hostMgr.getLoginHost(true);
        if (host != null) {
            this.connect(host);
        }
        else {
            cc.director.emit('loading_tips_remove');
            cc.vv.utils.showToast("连接服务器失败，请检查网络是否正常！");
        }
    },

    // 网络断开
    onClose(){

    },

    // 处理接收到socket消息
    onRecv(mid,sid,data){
        this.handler(mid,sid,data);
    },

    //监听接口
    register(){
        // 监听协议
    }
});
