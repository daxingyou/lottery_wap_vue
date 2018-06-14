<template>
	<div>
		<i-header title="MG游戏"></i-header>
		<div class="mg-games">
			<div class="mg-games-top">
				<div class="mg-games-banner-top" v-show="loginState==2">
					<div>
						<span style="color:#26d45f">
							当前余额:
						</span>
						<span>
							{{balance}}
						</span>
					</div>
					<div class="mg-games-transaction-record" @click="gotoBetHistory">
						下注记录
					</div>
				</div>
			</div>
			<div class="mg-games-search-area">
				<div>
					<div class="mg-search-input-box">
						<div>
							<img src="../../../static/images/icon/search.png" alt="">
						</div>
						<div class="mg-search-input-wrap">
							<input type="search" placeholder="请输入搜索内容" ref="searchMgGames" @keyup="(e)=>{handleInputFilter(e.target.value)}" @focus="handleInputFocus" @blur="handleInputBlur" />
						</div>
						<div class="mg-search-input-clear" v-show="searchFocus" @click="clearInputText">
							<img src="../../../static/images/icon/close.png" alt="">
						</div>
					</div>
					<transition name="fade">
						<div class="mg-search-cancel" v-show="searchFocus" @click="clearInputText">
							取消
						</div>
					</transition>
				</div>

				<div class="mg-search-history" v-show="searchFocus">
					<ul>
						<li v-for="(item,index) in searchHistoryArr">
							<div class="mg-search-history-text" @click="selectTextToSearch(item)">
								{{item}}
							</div>
							<div class="mg-search-history-clear" @click="clearHistory(index)">
								<img src="../../../static/images/icon/agsw.png" alt="">
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<div>
					<mu-tabs :value="currentTab" @change="handleTabChange" style="overflow-x:auto;border-bottom:solid thin #cccccc">
						<mu-tab :value="index" :title="item.title" v-for="(item,index) in tabArray" />
					</mu-tabs>
				</div>
				<div>
					<ul class="mg-game-list">
						<li v-for="game in filteredGamesArray">
							<div class="mg-game-title">
								{{game.title}}
							</div>
							<div class="mg-game-bg" :style="{'background-image':`url(../../../wap/images/mg-games/${game.picPrefix}.png)`}">
							</div>
							<div>
								<div class="mg-play" @click="getGameLink(game.id,'真钱')">
									真钱模式
								</div>
								<div class="mg-try" @click="getGameLink(game.id,'试玩')">
									试玩
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<mu-dialog :open="dialogShow" @close="closeDialog">
			{{dialogText}}
			<mu-flat-button slot="actions" primary @click="closeDialog" label="确定" />
		</mu-dialog>
	</div>
</template>

<script>
import iHeader from "../../components/i-header";
import mgGamesArray from "../../config/mgGames.config";
import _ from "lodash";
import {
  storeSearchHistory,
  getSearchHistory,
  clearSearchHistory
} from "../../utils/storeSearchHistory";
//import { getMgGameLink } from "../../api/index";
export default {
  data() {
    return {
      tabArray: [
        {
          index: 0,
          title: "全部游戏"
        },
        {
          index: 1,
          title: "精选游戏"
        },
        {
          index: 2,
          title: "视频老虎机"
        },
        {
          index: 3,
          title: "经典老虎机"
        }
      ],
      currentTab: 0,
      mgGamesArray,
      filteredGamesArray: [],
      searchFocus: false,
      searchHistoryArr: [],
      dialog: false,
      dialogTitle: "错误提示",
      dialogShow: false,
      dialogText: "",
      balance: "0.00",
      loginState: 0
    };
  },
  created() {
    this.filteredGamesArray = this.mgGamesArray;
    this.setBalance();
    if (sessionStorage.getItem("im_realname") == "游客") {
      this.loginState = 1;
    } else if (sessionStorage.getItem("im_realname")) {
      this.loginState = 2;
    }
  },
  components: {
    iHeader
  },
  methods: {
    setBalance() {
      this.balance = this.$store.state.userData.balance;
    },
    gotoBetHistory() {
      this.$router.push({
        path: "/dzHistory"
      });
    },
    handleInputFilter(val) {
      let searchVal = val.trim();
      if (searchVal === "") {
        this.filteredGamesArray = this.mgGamesArray;
        this.currentTab = 0;
        return;
      }
      this.filteredGamesArray = _.filter(
        this.mgGamesArray,
        game => game.title.indexOf(searchVal) != "-1"
      );
      this.currentTab = undefined;
    },
    handleTabChange(val) {
      this.currentTab = val;
      this.filterMgGamesArray(val);
    },
    filterMgGamesArray(index) {
      if (index == 0) {
        this.filteredGamesArray = this.mgGamesArray;
        return;
      }
      let currentTitle = this.tabArray[index].title;
      this.filteredGamesArray = _.filter(
        this.mgGamesArray,
        game => game.sort.indexOf(currentTitle) != "-1"
      );
    },
    handleInputFocus() {
      this.searchHistoryArr = getSearchHistory();
      this.searchFocus = true;
    },
    handleInputBlur(e) {
      let searchVal = e.target.value.trim();
      if (searchVal) {
        storeSearchHistory(e.target.value);
      }
      this.searchFocus = false;
    },
    selectTextToSearch(text) {
      this.$refs.searchMgGames.value = text;
      storeSearchHistory(text);
      this.handleInputFilter(text);
    },
    clearHistory(index) {
      clearSearchHistory(index);
      this.searchHistoryArr = getSearchHistory();
    },
    getGameLink(gamecode, type) {
      let params = {};
      let oid = this.$store.state.userData.sessionId;
      // 试玩账号下点击真钱模式
      if (this.loginState == 1 && type == "真钱") {
        this.dialogShow = true;
        this.dialogText = "请注册或登录正式会员账户后体验";
        return;
      }
      let winHandler;
      // uc浏览器打开新标签页无效果
      if (navigator.userAgent.search("UCBrowser") == -1) {
        winHandler = window.open("", "_blank");
      }
      params.oid = oid;
      params.gamecode = gamecode;
      params.free = type == "试玩" ? 1 : 0;
      params.gameName = "mgswallet";
      getMgGameLink(params).then(res => {
        if (!res.data) {
          winHandler.close();
          return;
        }
        if (res.data.code !== 0) {
          winHandler.close();
          this.dialogShow = true;
          this.dialogText = res.data.info || res.data.comment;
        } else {
          if (navigator.userAgent.search("UCBrowser") == -1) {
            winHandler.location.href = res.data.info;
          } else {
            window.location.href = res.data.info;
          }
        }
      });
    },
    closeDialog() {
      this.dialogShow = false;
    },
    clearInputText() {
      this.$refs.searchMgGames.value = "";
      this.filteredGamesArray = this.mgGamesArray;
      this.currentTab = 0;
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.mg-game-list {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  padding: 10px;
}
.mg-game-list > li {
  width: 32%;
  border: solid thin #cccccc;
  border-radius: 6px;
  margin-bottom: 10px;
  overflow: hidden;
  background-color: white;
}
.mg-game-list > li:nth-child(3n-1) {
  margin-left: 2%;
  margin-right: 2%;
}
.mg-game-list > li img {
  width: 100%;
}
.mg-game-title {
  line-height: 1.2rem;
  background-color: #e5f1fe;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.mg-play {
  width: 3.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  background-color: #0157bf;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  color: white;
}
.mg-try {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.mg-game-bg {
  width: 4rem;
  height: 4rem;
  margin-left: auto;
  margin-right: auto;
  background-size: 170%;
  background-repeat: no-repeat;
  background-position: center center;
}
.mg-games-top {
  background-image: url("../../../wap/images/mg-games/banner.png");
  height: 7rem;
  background-size: 100%;
}
.mg-games-banner-top {
  height: 1.7rem;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  line-height: 1.7rem;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
}
.mg-games-transaction-record {
  width: 3.2rem;
  height: 1.5rem;
  background-color: #0157bf;
  text-align: center;
  line-height: 1.5rem;
  border-radius: 5px;
}

.mg-games-search-area {
  position: relative;
}

.mg-games-search-area > div:first-child {
  padding: 5px 8px;
  display: flex;
  align-items: center;
}

.mg-games-search-area input {
  width: 100%;
  border: none;
  outline: none;
}
.mg-search-input-box {
  flex: 1;
  display: flex;
  background-color: white;
  border-radius: 5px;
  line-height: 1.2rem;
}
.mg-search-input-box > div:first-child {
  width: 30px;
  text-align: center;
}

.mg-search-input-box img {
  width: 20px;
}

.mg-search-input-wrap {
  flex: 1;
}

.mg-search-input-clear {
  width: 30px;
  text-align: center;
}

.mg-search-cancel {
  width: 40px;
  color: #0157bf;
  text-align: center;
}

.mg-search-history {
  position: absolute;
  width: 100%;
  left: 0;
  top: 1.5rem;
  background-color: #f7f7f7;
  z-index: 5;
}

.mg-search-history > ul {
  width: 100%;
}

.mg-search-history > ul > li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  line-height: 1.8rem;
}
.mg-search-history > ul > li:last-child {
  border-bottom: none;
}
.mg-search-history-clear {
  width: 50px;
  text-align: center;
  padding-right: 10px;
}

.mg-search-history-clear img {
  width: 20px;
  filter: brightness(50%);
}
.mg-search-history-text {
  flex: 1;
  padding-left: 10px;
}
</style>
