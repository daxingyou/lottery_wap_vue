<template>
  <div class="luzhu-box">
    <div>
      <mu-tabs :value="currentTab" @change="handleTabChange" style="overflow-x:auto;border-bottom:solid thin #cccccc">
        <mu-tab :value="index" :title="item.title" v-for="(item,index) in tabArray" />
      </mu-tabs>
    </div>
    <div class="luzhu-detail">
      <ul class="luzhu-list" :style="{width:luzhuData.length*27+'px'}" v-show="!isLoading">
        <li v-for="luzhuLi in luzhuData">
          <div v-for="luzhuItem in luzhuLi" :class="setLuzhuItemClass(luzhuItem)" class="luzhu-item">{{luzhuItem}}</div>
        </li>
      </ul>
      <div v-show="isLoading" class="loading-box">
        <mu-circular-progress :size="40" color="red" />
      </div>
    </div>
  </div>
</template>
<script>
import LuzhuConfig from "../config/luzhu.config";
import { getLuzhuData } from "../api/index";
export default {
  props:['gameCode'],
  data() {
    return {
      tabArray: [],
      currentTab: 0,
      luzhuData: [],
      isLoading: true
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    generateParams(gameCode) {
      let ctype = 0;
      let typecode = 0;
      LuzhuConfig.forEach(game => {
        if (game.game_code === this.gameCode) {
          typecode = game.typecode;
          this.tabArray = game.tabs;
          game.tabs.forEach((tab, index) => {
            if (this.currentTab === index) {
              ctype = tab.ctype;
            }
          });
        }
      });
      return {
        game_code: this.gameCode,
        ctype,
        typecode
      };
    },
    loadData() {
      getLuzhuData(this.generateParams(this.gameCode)).then(data => {
        this.isLoading = false;
        // 需要处理返回过来的data数据,把繁体字的单双变成简体字的单双;
        if(data&&data.data.length){
          for (var i=0;i<data.data.length;i++){
            for(var k = 0;k<data.data[i].length;k++){
              if(data.data[i][k]=='單'){
                data.data[i][k] = '单'
              }
              if(data.data[i][k]=='雙'){
                data.data[i][k] = '双'
              }
              if (data.data[i][k] == "龍") {
                data.data[i][k] = "龙";
              }
            }
          }
        }
        this.luzhuData = (data && data.data) || [];
      });
    },
    handleTabChange(val) {
      this.currentTab = val;
      this.isLoading = true;
      this.loadData();
    },
    setLuzhuItemClass(item) {
      if (!isNaN(item * 1)) {
        // 当item为数字，或者数字字符串的时候
        return "";
      }
      if (item == "大" || item == "双") {
        return "luzhu-big";
      }
      if (item == "小" || item == "单") {
        return "luzhu-small";
      }
      if (item == "龙") {
        return "luzhu-long";
      }
      if (item == "虎") {
        return "luzhu-hu";
      }
      if (item == "和") {
        return "luzhu-he";
      }
      if (item == '前') {
        return 'luzhu-front';
      }
      if (item == '后') {
        return 'luzhu-back';
      }
      if (item == '金') {
        return 'luzhu-gold';
      }
      if (item == '木') {
        return 'luzhu-wood';
      }
      if (item == '水') {
        return 'luzhu-water';
      }
      if (item == '火') {
        return 'luzhu-fire';
      }
      if (item == '土') {
        return 'luzhu-soil';
      }
    }
  }
};
</script>

<style lang="less" scoped>
.luzhu-list {
  display: flex;
  text-align: center;
}
.luzhu-list > li {
  min-width: 25px;
  text-align: center;
  min-height: 150px;
  padding: 0 3/20rem;
}
.luzhu-list > li:nth-child(odd) {
  background-color: #f2f2f2;
}
.luzhu-list > li:nth-child(even) {
  background-color: white;
}
.luzhu-detail {
  overflow-x: auto;
  font-size: 0.55rem;
}
.luzhu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.55rem;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  font-weight: normal;
}

/* 露珠大小，单双，龙虎样式 */
/*
.luzhu-big,
.luzhu-long {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: #fb170f;
  color: white;
}
.luzhu-small,
.luzhu-hu {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: #2d4bfe;
  color: white;
}

.luzhu-he {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: #379b02;
  color: white;
}
*/
.loading-box{
  text-align: center;
}

.luzhu-big,
.luzhu-long,
.luzhu-back,
.luzhu-fire {
  background-color: #fb170f;
  color: white;
}
.luzhu-small,
.luzhu-hu,
.luzhu-front {
  background-color: #2d4bfe;
  color: white;
}
.luzhu-he,
.luzhu-wood {
  background-color: #379b02;
  color: white;
}

.luzhu-gold {
  background-color: #ebc512;
  color: white;
}
.luzhu-water {
  background-color: #44b6eb;
  color: white;
}
.luzhu-soil {
  background-color: #a7784b;
  color: white;
}
</style>
