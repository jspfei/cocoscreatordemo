// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       loginWx: {
            default: null,
            type: cc.Button,
        },
        btnTween:{
            default:null,
            type:cc.Button
        },
        loadScene:{
            default:null,
            type:cc.Button
        },
        _starttime:0,
        _midtime:0,
        _endtime:0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.vv.utils.addClickEvent(this.loginWx,this.node,"LoginUI","onLoginWx");
        cc.vv.utils.addClickEvent(this.btnTween,this.node,"LoginUI","onBtnTween");

        cc.vv.utils.addClickEvent(this.loadScene,this.node,"LoginUI","onBtnLoadScene");

       
    },

    start () {

    },
    onBtnLoadScene(){
        this._starttime = new Date().getTime();
        console.log("--start time----------",this._starttime)
        cc.vv.SceneLoader.preloadScene("loadscene",
        (step)=>{
            console.log("----step----------",step)
        },
        ()=>{
            console.log("------finesed--------")
            this._midtime = new Date().getTime();
            console.log("--mid time----------",this._midtime)
            // 请求角色信息
            cc.director.loadScene("loadscene", () => { 
                this._endtime = new Date().getTime();
                console.log("--end time----------",this._endtime)

                console.log("--total time----------",this._endtime-this._starttime)
            })
        })
    },
    onLoginWx(){
         cc.login.LoginUIMgr.showDlgLogin();
    },
    onBtnTween(){
        cc.director.loadScene("tween");
    }
   
});
