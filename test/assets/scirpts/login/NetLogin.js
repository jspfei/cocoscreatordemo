
let SOCK_STATE = require("SocketState");
var netbase = require("NetBase");
cc.Class({
    extends: netbase,

    properties: {
      
    },

    init(){
        cc.vv.logincmd = require("LoginCmd");
        var LoginProtocol = require("LoginProtocol");
        cc.vv.loginProtocol = new LoginProtocol();
        cc.vv.loginProtocol.init();
        this.register();
    },

    onOpen() {
        var user = cc.vv.user
        this.loginByAccouts(user.account, user.password);
    },

    onError() {
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

    onClose() {
       
    },

    onRecv(mid, sid, data){
        this.handler(mid,sid,data);
    },
      // 账号登录
    loginByAccouts(name, pwd) {
        var cmd = cc.vv.logincmd.cmd_login;
        var cs = cc.vv.packer;
        var loginInfo = {

        };
        var buffer = cs.pack('login',loginInfo);
        this.sendData(cmd.mid.login, cmd.sid.loginAccout, buffer);
    },
    register(){
        var mid = cc.vv.logincmd.cmd_login.mid;
        var sid = cc.vv.logincmd.cmd_login.sid;

        this.addEvent(mid.login, sid.loginSuss,function(data){
            cc.log("loginSuss");

            var cs = cc.vv.packer;

            var offset = [0];
            var length = data.byteLength;
            // 服务器返回登录成功数据包
            var userinfo = cs.unpack('loginSus',data,null,offset);
        });
    },
    // update (dt) {},
});
