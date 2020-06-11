
cc.Class({
    extends: cc.Component,

    properties: {
    
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.BtnCansel = cc.find("public/title_bg/btn_close",this.node);
        if(this.BtnCansel){
            
            cc.vv.utils.addClickEvent(this.BtnCansel,this.node,"DLGContrlCansel","onBtnCansel");
        }
    },

    onBtnCansel(){
        this.node.destroy();
    }
    
});
