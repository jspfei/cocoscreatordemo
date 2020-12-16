 

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    preloadScene(sceneName, onProgress, onLoaded, target) {
        let info = cc.director._getSceneUuid(sceneName)
        if (info) {
            cc.director.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, sceneName)
            cc.loader.load(
                { uuid: info.uuid, type: 'uuid' },
                (completedCount, totalCount, item) => {
                    let step = completedCount / totalCount
                    if (onProgress) {
                        if (target) {
                            onProgress.call(target, step)
                        } else {
                            onProgress(step)
                        }
                    }
                },
                (error, asset) => {
                    if (error) {
                        console.error(1210, sceneName, error.message)
                    } else {
                        // 由逻辑控制加载
                        // cc.director.loadScene(sceneName)
                    }
                    if (onLoaded) {
                        if (target) {
                            onLoaded.call(target, error, asset)
                        }
                        else {
                            onLoaded(error, asset)
                        }
                    }
                }
            )
        } else {
            console.error('Error PreloadScene: ' + sceneName)
        }
    }
    // update (dt) {},
});
