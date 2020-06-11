 
cc.Class({
    extends: cc.Component,

    properties: {
        autoLoad: true, // 自动加载
        fishNormal: cc.Prefab, // 普通鱼的预设体
    },

     onLoad() {
        this.fishes = new Map();
        if (this.autoLoad && this.fish) {
            this.loadPrefab();
        }
    },

    // 实例化预制件，设置父节点
    loadPrefab() {
        var node = cc.instantiate(this.fish);
        node.parent = this.node; 

    },

        // 创建鱼群
    CreateFishGroup(fishkind, fishid) {
         var fish = null;

          fish = cc.instantiate(this.fishNormal);
            if (fish) {
            var fishCompt = fish.getComponent("Fish");
            var fish_item = {
                fish_node: fish,
                fish_id: fishid,
                fish_kind: fishkind,
                fish_compent: fishCompt,
                lock_count: 0,
            }
            this.fishes.set(fishid, fish_item);

            fishCompt.init(fishkind, fishid);
            fish.parent = cc.fish.FishLayer;

        }
        return fish;
    },


    start () {
        this.CreateFishGroup(1,2)

    },
    // update (dt) {},
});
