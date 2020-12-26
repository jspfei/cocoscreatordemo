import AppFacade from "../../AppFacade";
import StartViewMediator from "../StartViewMediator";


const {ccclass, property} = cc._decorator;

@ccclass
export default class StartView extends cc.Component {

    @property(cc.Button) testButton: cc.Button = null;

    @property(cc.Sprite) downImage: cc.Sprite = null

    start () {
        // 注册
        AppFacade.getInstance().registerMediator(new StartViewMediator(this))
    }

    public onDestroy() {
        // 移除
        AppFacade.getInstance().removeMediator(StartViewMediator.NAME);
    }

    /**
     * 设置图片
     * @param tex 
     */
    public setSprite(tex: cc.Texture2D) {
        this.downImage.spriteFrame = new cc.SpriteFrame(tex)
    }
}