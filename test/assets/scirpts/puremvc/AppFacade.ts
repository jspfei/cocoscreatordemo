import StartupCommand from './controller/StartupCommand';
export default class AppFacade extends puremvc.Facade implements puremvc.IFacade {
    public constructor() {
        super()
    }

    public static STARTUP = 'startup'

    private static instance: AppFacade

    public static getInstance(): AppFacade {
        if (AppFacade.instance == null) {
            AppFacade.instance = new AppFacade();
        }
        return <AppFacade>(AppFacade.instance);
    }

    // 启动pureMvc
    public startup() : void {
        this.sendNotification(AppFacade.STARTUP)
        this.removeCommand(AppFacade.STARTUP) // 初始化完成之后注销STARTUP命令
    }

    // 以下是该类的初始化函数，创建改类实例后会自动调用改函数
    public initializeFacade() : void {
        super.initializeFacade()
    }

    // 注册数据模型
    public initializeModel(): void {
        super.initializeModel();
    }

    // 注册控制器
    public initializeController(): void {
        super.initializeController();
        this.registerCommand(AppFacade.STARTUP, StartupCommand);
    }

    // 注册View视图
    public initializeView(): void {
        super.initializeView();
    }
}