import GameProxy from "../../model/GameProxy";

export default class BootstrapModels extends puremvc.SimpleCommand {
    public constructor() {
        super()
    }

    public execute(notification: puremvc.INotification) : void {
        this.facade.registerProxy(new GameProxy())
    }

}