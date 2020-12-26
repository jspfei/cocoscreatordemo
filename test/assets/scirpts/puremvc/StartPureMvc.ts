import AppFacade from "./AppFacade";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Start extends cc.Component {

    start () {
        AppFacade.getInstance().startup();
    }

}