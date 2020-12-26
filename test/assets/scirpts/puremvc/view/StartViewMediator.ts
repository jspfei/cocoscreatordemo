import { GameCommand } from './../controller/commands/GameCommand';
import { ImageVo } from '../model/vos/ImageVo';
import { ImageRequestVo } from '../model/vos/ImageRequestVo';
import { ImageDownLoadConstants } from '../Constans';

export default class StartViewMediator extends puremvc.Mediator{
    public static NAME = 'StartViewMediator'
    public constructor(viewComponent: any) {
        super(StartViewMediator.NAME, viewComponent)
    }

    public listNotificationInterests() : string[] {
        return [
            ImageDownLoadConstants.DOWN_IMAGE_SUCCESS,
            ImageDownLoadConstants.DOWN_IMAGE_FAIL
        ]
    }

    public handleNotification( notification: puremvc.INotification) : void {

        console.log(notification)
        switch(notification.getName()) {
            case ImageDownLoadConstants.DOWN_IMAGE_SUCCESS: {
                const data: ImageVo = notification.getBody()
                this.viewComponent.setSprite(data.texture)
                break
            }
        }

    }

    public onRegister() : void {
        this.viewComponent.testButton.node.on('click', () => {
            console.log('click.')
            this.facade.sendNotification(GameCommand.DOWN_IMAGE, new ImageRequestVo('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2738245099,987323490&fm=26&gp=0.jpg', 'jpg'))
        })
    }

    public onRemove() : void {

    }
}