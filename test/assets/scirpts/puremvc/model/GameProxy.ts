import { ImageVo } from './vos/ImageVo';
import { ImageRequestVo } from './vos/ImageRequestVo';
import { ImageDownLoadConstants } from '../Constans';
export default class GameProxy extends puremvc.Proxy  {
    public static NAME = 'GameProxy'
    public constructor() {
        super(GameProxy.NAME)
    }
    // 重置数据
    public reset() : void {

    }

    public fetchTest(request: ImageRequestVo) {
        console.log('fetchTest')
        cc.loader.load({url: request.url, type: request.ext}, (err, tex) => {
            if(err) {
                this.facade.sendNotification(ImageDownLoadConstants.DOWN_IMAGE_FAIL)
                return
            }
            this.facade.sendNotification(ImageDownLoadConstants.DOWN_IMAGE_SUCCESS, new ImageVo('down_image', tex))
        })
    }

}