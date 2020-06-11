var head_url = "http://183.131.205.99:9110/API/csbyApi/"
cc.Class({
     getShopConfig(func){
        var url = head_url;

        var param = cc.js.formatStr("id=config&sid=%s",11);
        var finished = function(data){
            if(data !== -1){
                if(func){
                    func(data);
                }
            }
        }
        cc.vv.utils.httpPost(url,param,finished);
     }
});
