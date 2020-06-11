 
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    init(){
        this.initProtocol();
    },

    initProtocol(){
        var jpacks = cc.vv.packer;

        jpacks.def('login',{
            username: jpacks.cstring(32),
            password: jpacks.cstring(33),
            userid:   jpacks.int8,
        });

           // 服务器返回登录成功数据包
        jpacks.def('loginSus', {
            faceid: jpacks.uint16,                  // 头像id
            gender: jpacks.uint8,                   // 性别
            member: jpacks.uint8,                   // VIP
            userid: jpacks.uint32,                  // 用户id
            gameid: jpacks.uint32,                  // 游戏id
            experience: jpacks.uint32,              // 经验
            customfacever: jpacks.uint32,           // 头像
            moormachine: jpacks.uint8,
            reserve: jpacks.array(jpacks.int8, 3),  // 为了字节对齐
            loveliness: jpacks.uint32,              // 魅力值
            reserve2: jpacks.array(jpacks.int8, 4), // 为了字节对齐
            gold: jpacks.int64,                     // 金币
            ingot: jpacks.int64,
        });
    }
     
});
