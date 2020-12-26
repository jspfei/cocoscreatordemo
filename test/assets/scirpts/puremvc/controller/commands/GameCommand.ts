import { ImageRequestVo } from '../../model/vos/ImageRequestVo';
import GameProxy from "../../model/GameProxy";

export class GameCommand extends puremvc.SimpleCommand {
    public constructor() {
        super()
    }

    public static NAME = 'GameCommand'
    public static DOWN_IMAGE = 'down_image'
    // 注册的方法
    public register() : void {
        this.facade.registerCommand(GameCommand.DOWN_IMAGE, GameCommand)
    }

    // 执行的方法
    public execute( notification: puremvc.INotification) : void {
        console.log("-------------GameCommand.execute")
        const gameProxy: GameProxy = <GameProxy>(this.facade.retrieveProxy(GameProxy.NAME))
        const data = notification.getBody()
        switch(notification.getName()) {
            case GameCommand.DOWN_IMAGE: {
                gameProxy.fetchTest(data as ImageRequestVo)
                break
            }
        }
    }
}