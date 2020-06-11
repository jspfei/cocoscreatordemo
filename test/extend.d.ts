declare module cc {
  export var inputManager: {
    handleTouchesBegin: (touches?: any) => void
    handleTouchesMove: (touches?: any) => void
    handleTouchesEnd: (touches?: any) => void
    handleTouchesCancel: (touches?: any) => void
  }
}


declare interface GameParam { 
  param: GameParam
  appID: string
}
declare interface Window {
  param: GameParam
  resref: { [k: string]: string }
}

//  
declare const CC_H5GAME