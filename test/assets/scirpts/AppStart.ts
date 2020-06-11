// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class AppStart extends cc.Component { 
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	this.init()
    }

    start () {

    }
    init(){
        if(!cc.vv){
        	cc.vv = {};
        }
        else{
        	return;
        }

        var Utils = require("Utils");

        cc.vv.utils = new Utils();

         // 解包相关的类
        cc.vv.packer = require("jpacks").jpacks;

         // 初始化网络模块
        // 登录模块
        var login = require("NetLogin");
        cc.vv.netlogin = new login();
        cc.vv.netlogin.init();

        var HttpMgr = require("HttpMgr");
        cc.vv.httpMgr = new HttpMgr();
    }
    // update (dt) {}
}
