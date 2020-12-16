// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	this.init()
    } ,

    start () {

    },
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

        var SceneLoader = require("SceneLoader")
        cc.vv.SceneLoader = new SceneLoader();
    }
});
