<template>
  <div style='height:100%'>

    <dailog-q :gametoken="gametoken" :type_code="typeCode" :game_code="game_code" :money="money_s" :round="round" :lotteryM="objects" v-if="showDailogQ" v-on:listenToChildEvent="showMsgFromChild"></dailog-q>
    <dailog-s :gametoken="gametoken" :type_code="typeCode" :game_code="game_code" :money="money_s" :round="round" :lotteryM="objects" :typecode="activeSubId" v-if="showDailogS" v-on:listenToChildEvent="showMsgFromChild"></dailog-s>
    <bet-dialog :betData="betData" v-if="$store.state.confirmShow" @listenToChildEvent="showMsgFromChild"></bet-dialog>
    <lotteryHeader :title="title" :game_code="game_code" @regulation_click="regulation_control=true"></lotteryHeader>

    <gameChat>
      <div style='overflow-x: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch;width:100%;padding-bottom:2rem;'>
        <lotteryArea class="game_133" :lotteryObj="body" :zMoney="zMoney" :fenpan="fengpan" :endtime="endtime" :fentime="fentime" v-if="isOk" gameType="133"></lotteryArea>
        <div class="lottery_nav_bar" :style='de==true||loadpage==true?"display:none":"display:block"'>
          <ul>
            <button class="trapezoid color1" v-for="(item,i) in gd11x5Classify" :class="{active8: activeNavIndex === i}" @click="changeNav(item,i)">
              <span>{{item.name}}</span>
            </button>
          </ul>
        </div>

        <section :style='de==true||loadpage==true?"display:none":"display:block"' :class='setSectionClass' ref="seller" v-if="activeNavIndex==0||activeNavIndex==1">
          <ul class="clearfix" :class="`bet_list_${typeCode}`">
            <li v-for="(item,j) in currentGame">
              <span class="colortitle">{{item.name}}</span>
              <ul :class="`gd11x5_list_${j}`">
                <li v-for="(ite,i) in item.list" class="gd11x5_bet_list">
                  <button class="color4" :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan||round=='loading'">
                    <span>
                      <div class="bet-item">
                        {{ite.name}}
                      </div>
                    </span>
                    <span v-if='ite.odds?true:false' class="odd">{{(fengpan||round=='loading')?"封盘":ite.odds}}</span>
                    <span v-if="(fengpan||round=='loading')&&(ite.odds?false:true)" class="odd">封盘</span>
                  </button>
                </li>
              </ul>
              <!-- <ul v-else>
              <li v-for="(ite,i) in evenCode">
                <button class="color4" :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan||round=='loading'">
                  <span>{{ite.name}}</span>
                  <span v-if='ite.odds?true:false' class="odd">{{(fengpan||round=='loading')?"封盘":ite.odds}}</span>
                  <span v-if="(fengpan||round=='loading')&&(ite.odds?false:true)" class="odd">封盘</span>
                </button>
              </li>
            </ul> -->
            </li>
          </ul>
        </section>

        <!-- 连码 -->
        <div class="gd11x5-lianma" v-show="activeNavIndex==2&&hasLoad">
          <div>
            <ul class="sub-nav-list">
              <li v-for="(item,index) in currentGame" :class="{'subnav-checked':activeSubNavIndex==index}" @click="changeSubNav(index,item)">
                <div>
                  {{item.title}}
                </div>
                <div>
                  {{fengpan?'封盘':item.list[0].odds}}
                </div>
              </li>
            </ul>
          </div>
          <div class="sub_game_title">连码</div>
          <div>
            <div>
              <ul class="lianma-check-list">
                <li v-for='(item,i) in currentGame[activeSubNavIndex]&&currentGame[activeSubNavIndex].list' @click="toggleCheckLianma(item)" :class="getCheckedStatus(item)">
                  <button>
                    <div>
                      {{item.name}}
                      <div v-show="fengpan">
                        封盘
                      </div>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 直选 -->
        <div class="gd11x5-lianma" v-show="activeNavIndex==3&&hasLoad">
          <div>
            <ul class="sub-nav-list">
              <li v-for="(item,index) in currentGame" :class="{'subnav-checked':activeSubNavIndex==index}" @click="changeSubNav(index,item)">
                <div>
                  {{item.title}}
                </div>
                <div>
                  {{fengpan?'封盘':item.odd}}
                </div>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li v-for="item in currentGame[activeSubNavIndex]&&currentGame[activeSubNavIndex].list">
                <div class="sub_game_title">{{item.name}}</div>
                <div>
                  <ul class="lianma-check-list">
                    <li v-for="selectItem in item.list" @click="toggleCheckZhixuan(selectItem,item.name)" :class="getCheckedStatus(selectItem)">
                      <button>
                        <div>
                          {{selectItem.name}}
                          <div v-show="fengpan">
                            封盘
                          </div>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Loadpage v-if='loadpage'></Loadpage>
        <luzhu gameCode="133" />
      </div>
      <section class="bet_bar" ref="bet_bar">
        <div>
          <span class="qin" @click="clearSelected">重置</span>
        </div>
        <div style='position:relative'>
          <span style="color:#FFFFFF;" v-if="xshuzi>0">{{xshuzi}}</span>
          <span style="background:`url(${getPublicImg('/images/small_m.png')}) no-repeat`;background-size:100% 100%;" v-else="xshuzi=0">{{xshuzi}}</span>
          <div style='position:relative;height:1.4rem'><input style='position:absolute;left:0;padding-left:1.5rem;line-height:1.4rem;' type="number" pattern="\d*" v-model="money_s" placeholder="输入金额" @input="changes_m()" @focus='fours()' @blur='blur()' min="1" />
            <img @click='cleanmoney' v-show="money_s!=null" style="width: 0.8rem;height: 0.8rem;float: right;margin-top: 0.32rem;margin-right: 0.3rem;" :src="$getPublicImg('/images/tzgb.png')" alt="" />
          </div>
        </div>
        <div>
          <button class="gdcolor" :class="{color1:isBlue}" type="button" @click="subMit">确认下注</button>
        </div>
      </section>

      <div :style='de?"display:block":"display:none"' style="position: fixed;top:0;left:0;background:rgba(0,0,0,0.5);opacity:.8;width:100%;height:100%;z-index:6">
        <div style='position: fixed;top:50%;left:50%;width:40px;height:40px;margin:-20px 0 0 -20px;'>
          <mu-circular-progress style="" :size="40" />
        </div>
      </div>
    </gameChat>
    <promptbox @panelShow="panelShow=false" :promptboxshow="promptboxshow" :panelShow="panelShow" :promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters, mutations } from 'vuex'
// import footGuide from '../../components/footer/footGuide'
import lotteryHeader from '../../components/header/lotteryHeader'
import lotteryArea from '../../components/lottery-area'
import dailogQ from '../../components/dailogQ.vue'
import dailogS from '../../components/dailogS.vue'
import Loadpage from '../../components/Loadpage.vue'
import { gd11x5Classify } from '@/config/classify.config'
import { parseOddsList, getGamesCache, setGamesCache } from '@/utils'
import { getEvenCode } from './klsf.config'
import api from '@/api'
import promptbox from '../../components/promptbox'
import luzhu from '../../components/luzhu'
import betDialog from '../../components/betDialog'
import gameChat from '@/components/game-chat/index'
export default {
  data() {
    return {
      currentGame: [],
      typeCode: 4010,
      activeSubId: 2032,
      evenCode: getEvenCode(),
      gd11x5Classify,
      roundCha: null,
      xshuzi: 0,
      zMoney: 0,
      fentime: '',
      promptboxtext: '',
      panelShow: false,
      regulation_control: false,
      lianxu: {
        keys: 2032,
        index: 2
      },
      zhanshi: false,
      loadpage: false,
      datas: [
        {
          isCheck: true,
          _name: '任选二',
          odds: '6.5',
          key_s: 2032,
          inde: 2
        },
        {
          isCheck: false,
          _name: '任选三',
          odds: '19.6',
          key_s: 2035,
          inde: 3
        },
        {
          isCheck1: false,
          _name: '任选四',
          odds: '60',
          key_s: 2038,
          inde: 4
        },
        {
          isCheck: false,
          _name: '任选五',
          odds: '250',
          key_s: 2039,
          inde: 5
        }
      ],
      game_code: 133,
      type_code: 0,
      title: '广东11选5',
      shuju: {},
      isBlue: false,
      demo: 0,
      body: {},
      seen: false,
      de: false,
      loading: false,
      oid_info: 0,
      isOk: false,
      endtime: 0,
      isOpen: true,
      lotteryList: {},
      numberList: [],
      dialog: false,
      codeMessage: '',
      keyValue: null,
      setTime: null,
      fengpan: false,
      object: {},
      objects: [],
      money_s: null,
      round: 0,
      n_1: false,
      panelShow: false,
      dadiao: 'lmp',
      loadpagebol: false,
      erreocode: '',
      promptboxtext: '',
      panelShow: false,
      promptboxshow: true,
      gametoken: '',
      activeNavIndex: 0,
      activeSubNavIndex: 0,
      selectedLianma: [],
      selectedZhixuan: [],
      canBet: false,
      betData: {},
      fetchGameTimer: null,
      hasLoad: false,
      gameInterval:null
    }
  },
  methods: {
    getGameData() {
      let oidInfo = sessionStorage.getItem('im_token')
      this.oid_info = oidInfo
      // 获取token配置
      this.$http
        .post(
          `${getUrl()}/getinfo/game`,
          JSON.stringify({
            oid: sessionStorage.getItem('im_token'),
            game_code: 133
          })
        )
        .then(res => {
          if (res.data.msg == '4003') {
            this.$router.push({
              path: '/weihu'
            })
          }
          //      this.de = false;
          this.isOk = true
          if (res.data.msg == '4001') {
            sessionStorage.clear()
            this.panelShow = true
            this.promptboxtext = '您的账户已失效，请重新登录'
            setTimeout(() => {
              this.panelShow = false
              this.$router.push({
                path: '/login'
              })
            }, 1000)
          } else {
            this.body = res.data
            this.endtime = res.data.next.endtime - res.data.next.timestap
            this.round = res.data.next.round
            this.fengpan = res.data.next.isclose
            this.numberList = res.data.last.number
            this.zMoney = res.data.lcurrency
            this.fentime = res.data.next.endtime - res.data.next.closetime
            if (res.data.next.round - res.data.last.round != 1) {
              this.fetchGameTimer = setTimeout(() => {
                this.getGameData()
              }, 2000)
            }
          }
        })
    },
    toggleCheckLianma(item) {
      console.log(item)
      if (this.fengpan) {
        return
      }
      let hasChecked = false
      this.selectedLianma.forEach((selectedItem, index) => {
        if (item.key == selectedItem.key) {
          hasChecked = true
          this.selectedLianma.splice(index, 1)
        }
      })
      /* 判断是否超出可选 */
      if (this.activeSubNavIndex <= 6) {
        if (this.selectedLianma.length > this.activeSubNavIndex + 1)
          hasChecked = true
      }

      if (this.activeSubNavIndex == 7) {
        if (this.selectedLianma.length > 1) hasChecked = true
      }

      if (this.activeSubNavIndex == 8) {
        if (this.selectedLianma.length > 2) hasChecked = true
      }

      if (!hasChecked) {
        this.selectedLianma.push(item)
      }
      /* 判断是否超出可选 */
      if (this.activeSubNavIndex <= 6) {
        if (this.selectedLianma.length == this.activeSubNavIndex + 2) {
          this.canBet = true
        } else {
          this.canBet = false
        }
      }

      if (this.activeSubNavIndex == 7) {
        if (this.selectedLianma.length == 2) {
          this.canBet = true
        } else {
          this.canBet = false
        }
      }

      if (this.activeSubNavIndex == 8) {
        if (this.selectedLianma.length == 3) {
          this.canBet = true
        } else {
          this.canBet = false
        }
      }
      /* 计算组数 */
      if (this.canBet) {
        let betList =
          (this.selectedLianma.length && this.selectedLianma) ||
          (this.selectedZhixuan.length && this.selectedZhixuan)
        let betType = betList[0].title
        if (
          betList[0].title.search('任选') != -1 ||
          betList[0].title.search('组选') != -1
        ) {
          this.xshuzi = 1
        }

        if (betList[0].title.search('直选') != -1) {
          let groupedBet = _.groupBy(betList, 'type')
          let numberArray = []
          let totalGroup = 1
          Object.keys(groupedBet).forEach(item => {
            totalGroup *= groupedBet[item].length
            numberArray.push(_.map(groupedBet[item], 'name'))
          })
          this.xshuzi = totalGroup
        }
      }else{
        this.xshuzi = 0;
      }
    },
    toggleCheckZhixuan(item, type) {
      if (this.fengpan) {
        return
      }
      let hasChecked = false
      this.selectedZhixuan.forEach((selectedItem, index) => {
        /* toggle切换 */
        if (item.key === selectedItem.key) {
          hasChecked = true
          this.selectedZhixuan.splice(index, 1)
        }
        if (item.name === selectedItem.name) {
          hasChecked = true
        }
      })
      if (!hasChecked) {
        this.selectedZhixuan.push({
          ...item,
          type
        })
      }
      /* 直选 */
      let selectedTypeLen = _.uniqBy(_.map(this.selectedZhixuan, 'type')).length
      if (
        selectedTypeLen &&
        selectedTypeLen == this.activeSubNavIndex * 1 + 2
      ) {
        this.canBet = true
      } else {
        this.canBet = false
      }
      /* 计算组数 */
      if (this.canBet) {
        let betList =
          (this.selectedLianma.length && this.selectedLianma) ||
          (this.selectedZhixuan.length && this.selectedZhixuan)
        let betType = betList[0].title
        if (
          betList[0].title.search('任选') != -1 ||
          betList[0].title.search('组选') != -1
        ) {
          this.xshuzi = 1
        }

        if (betList[0].title.search('直选') != -1) {
          let groupedBet = _.groupBy(betList, 'type')
          let numberArray = []
          let totalGroup = 1
          Object.keys(groupedBet).forEach(item => {
            totalGroup *= groupedBet[item].length
            numberArray.push(_.map(groupedBet[item], 'name'))
          })
          this.xshuzi = totalGroup
        }
      }else{
        this.xshuzi = 0
      }
    },
    getCheckedStatus(item) {
      let isChecked = false
      this.selectedLianma.forEach(selectedItem => {
        if (selectedItem.key == item.key) {
          isChecked = true
        }
      })
      this.selectedZhixuan.forEach(selectedItem => {
        if (selectedItem.key == item.key) {
          isChecked = true
        }
      })
      return isChecked ? 'checked' : ''
    },
    transformShitData(type, data) {
      /* 转换像屎一样的后台数据 */
      let transformedData = []
      if (type === '两面') {
        Object.keys(data).forEach(item => {
          data[item].forEach(subItem => {
            subItem.name = subItem.title
            delete subItem.title
          })
        })
        transformedData = [
          { name: '总和', list: data['balls'] },
          {
            name: '第一球',
            list: data['total'].slice(0, 4)
          },
          {
            name: '第二球',
            list: data['total'].slice(4, 8)
          },
          {
            name: '第三球',
            list: data['total'].slice(8, 12)
          },
          {
            name: '第四球',
            list: data['total'].slice(12, 16)
          },
          {
            name: '第五球',
            list: data['total'].slice(16, 20)
          }
        ]
      }
      if (type === '单号') {
        Object.keys(data).forEach(item => {
          data[item].forEach(subItem => {
            delete subItem.title
          })
        })
        transformedData = [
          { name: '一中一', list: data['onebyone'] },
          { name: '第一球', list: data['first'] },
          { name: '第二球', list: data['second'] },
          { name: '第三球', list: data['third'] },
          { name: '第四球', list: data['fourth'] },
          { name: '第五球', list: data['fifth'] }
        ]
      }
      if (type === '连码') {
        console.log(data)
        Object.keys(data).forEach((key, index) => {
          let title = data[key][0].title
          // data[key][0].title = '连码'
          transformedData[index] = {
            title,
            list: data[key],
            type: key
          }
        })
      }

      if (type === '直选') {
        Object.keys(data).forEach((key, index) => {
          let title = data[key]['one'][0].title
          let list = []
          Object.keys(data[key]).forEach((key1, index) => {
            let handledKey =
              key1 == 'one'
                ? '第一球'
                : key1 == 'two' ? '第二球' : key1 == 'three' ? '第三球' : ''
            list[index] = {
              name: handledKey,
              list: data[key][key1]
            }
          })
          transformedData[index] = {
            title,
            list: list,
            odd: list[0].list[0].odds
          }
        })
      }
      return transformedData
    },
    changeSubNav(index, item) {
      if (this.fengpan) {
        return
      }
      this.xshuzi = 0
      this.typeCode = item.type || this.typeCode
      this.activeSubNavIndex = index
      this.selectedLianma = []
      this.selectedZhixuan = []
    },
    cleanmoney() {
      this.money_s = null
    },
    fours() {
      this.onoff = false
      if (navigator.userAgent.indexOf('UCBrowser') > -1) {
        setTimeout(() => {
          document.body.scrollTop = document.body.scrollHeight
        }, 600)
      }
    },
    blur() {
      this.onoff = true
    },
    blur() {
      this.onoff = true
    },
    showMsgFromChild(data) {
      this.clearSelected()
      if (data === true) {
        this.clearSelected()
        let oidInfo = sessionStorage.getItem('im_token')
        let prams = {
          oid: oidInfo
        }
        this.$http
          .post(`${getUrl()}/getinfo/money`, JSON.stringify(prams))
          .then(res => {
            if (res.data.msg == '4001') {
              sessionStorage.clear()
              this.panelShow = true
              this.promptboxtext = '您的账户已失效，请重新登录'
              setTimeout(() => {
                this.panelShow = false
                this.$router.push({
                  path: '/login'
                })
              }, 1000)
            } else {
              this.zMoney = res.data.money
              sessionStorage.setItem('im_money', res.data.money)
              this.xshuzi = 0
            }
          })
      }
    },
    one(item, j) {
      this.clearSelected()

      if (!this.activeSubId !== item.key) {
        this.activeSubId = item.key
      }
      this.lianxu.index = item.inde
      for (let item in this.object) {
        console.log(item)
        this.object[item].isCheck = false
      }

      this.object = {}
      this.xshuzi = 0
    },
    changes_m() {
      this.money_s = this.money_s.replace(/[^0-9]/g, '')
      if (!this.isEmptyObject(this.object) && this.money_s > 0) {
        this.isBlue = true
      } else {
        this.isBlue = false
      }
    },
    isEmptyObject(e) {
      for (let t in e) return !1
      return !0
    },
    clearSelected() {
      this.isBlue = false
      this.money_s = null
      this.xshuzi = 0
      this.selectedLianma = []
      this.selectedZhixuan = []
      this.$store.commit('toggleConfirm', false)
      for (let item in this.object) {
        this.object[item].isCheck = false
      }

      this.object = {}
      // this.zhanshi = false;
      if (this.dadiao == 'lmp') {
        this.zhanshi = false
      } else if (this.dadiao == 'yds' || this.dadiao == 'wdb') {
        this.zhanshi = false
      } else {
        this.zhanshi = true
      }
      this.object = {}
    },
    subMit() {
      if (this.money_s == null || this.money_s < 1) {
        this.panelShow = true
        this.promptboxtext = '请输入正确金额'
        return
      }
      if (this.activeNavIndex == 2 || this.activeNavIndex == 3) {
        if (!this.canBet) {
          this.panelShow = true
          this.promptboxtext = '不满足下注条件'
          return
        }
        let betList =
          (this.selectedLianma.length && this.selectedLianma) ||
          (this.selectedZhixuan.length && this.selectedZhixuan)
        let betData = {
          game_code: this.game_code,
          type_code:
            this.typeCode == '4028' && this.activeSubNavIndex == 1
              ? '4029'
              : this.typeCode,
          round: this.round,
          token: this.gametoken,
          money: this.money_s,
          betList
        }
        this.betData = betData
        this.$store.commit('toggleConfirm', true)
        this.canBet = false
        return
      }

      this.objects = []
      for (let i in this.object) {
        this.objects.push(this.object[i])
      }
      if (this.objects == 0) {
        this.panelShow = true
        this.promptboxtext = '请选择投注号码'
        setTimeout(this.isSHowff, 1200)
        return
      }

      if (this.typeCode === 9) {
        const idx = this.checkOddsLen()
        if (this.checkOddsLen() < 4) {
          if (this.objects.length < idx || this.objects.length > 8) {
            this.objects.length > 8
              ? (this.promptboxtext = '最多投8个球')
              : (this.promptboxtext = `不能少于${idx}`)
            this.panelShow = true
            this.objects = []
            setTimeout(this.isSHowff, 1200)
            return
          }
          this.$store.dispatch('showDailogS')
          return
        } else if (idx >= 4) {
          if (this.objects.length < idx || this.objects.length > 6) {
            this.objects.length > 6
              ? (this.promptboxtext = '最多投6个球')
              : (this.promptboxtext = `不能少于${idx}`)
            this.panelShow = true
            this.objects = []
            setTimeout(this.isSHowff, 1200)
            return
          }
          this.$store.dispatch('showDailogS')
          return
        }
      }
      this.$store.dispatch('showDailogQ')
    },
    // 连码投注数量限制
    checkOddsLen() {
      switch (this.activeSubId) {
        case 2032:
          return 2
        case 2035:
          return 3
        case 2038:
          return 4
        case 2039:
          return 5
      }
    },
    isSHowff() {
      this.panelShow = false
    },
    kadun(m, s) {
      function factorial(n) {
        return n <= 1 ? 1 : n * factorial(n - 1)
      }
      return factorial(m) / factorial(m - s) / factorial(s)
    },
    isCheck(j, i, item, groupName) {
      let n = `l${j}${i}`
      item.isCheck = !item.isCheck
      item.groupName = groupName
      if (item.isCheck === true) {
        this.object[n] = item
      } else {
        delete this.object[n]
      }
      if (!this.isEmptyObject(this.object) && this.money_s > 0) {
        this.isBlue = true
      } else {
        this.isBlue = false
      }
      let s = 0
      for (let i in this.object) {
        s++
      }
      if (this.typeCode === 9) {
        switch (this.activeSubId) {
          case 2032:
            this.xshuzi = parseInt(this.kadun(s, 2))
            break
          case 2035:
            this.xshuzi = parseInt(this.kadun(s, 3))
            break
          case 2038:
            this.xshuzi = parseInt(this.kadun(s, 4))
            break
          case 2039:
            this.xshuzi = parseInt(this.kadun(s, 5))
            break
        }
      } else {
        this.xshuzi = s
      }
    },
    // 获取赔率
    fetchGames(params) {
      this.de = true
      setTimeout(() => {
        if (!this.loadpagebol) {
          this.de = false
          this.loadpage = true
          return
        }
      }, 10000)
      this.hasLoad = false
      api
        .getOddsList(params)
        .then(data => {
          if (data.data.msg == '4003') {
            this.$router.push({
              path: '/weihu'
            })
          }
          if (data.data.msg == '4001') {
            sessionStorage.clear()
            this.panelShow = true
            this.promptboxtext = '您的账户已失效，请重新登录'
            setTimeout(() => {
              this.panelShow = false
              this.$router.push({
                path: '/login'
              })
            }, 1000)
          } else {
            this.de = false
            this.loadpagebol = true
            this.hasLoad = true
            let type = ''
            if (params.type_code == 4010) {
              type = '两面'
            }
            if (params.type_code == 4018) {
              type = '单号'
            }
            if (params.type_code == 4019) {
              type = '连码'
            }
            if (params.type_code == 4028) {
              type = '直选'
            }
            this.currentGame = parseOddsList(
              this.transformShitData(type, data.data[0].list)
            )
            console.log(this.currentGame)
          }
        })
        .catch(err => {
          this.de = false
        })
    },
    changeNav(item, i) {
      this.activeSubNavIndex = 0
      this.activeNavIndex = i
      this.canBet = false
      this.xshuzi = 0
      if (item.type_code !== this.typeCode) {
        this.typeCode = item.type_code
        this.fetchGames({
          oid: sessionStorage.getItem('im_token'),
          game_code: item.game_code,
          type_code: item.type_code
        })
        this.xshuzi = 0
        this.clearSelected()
        this.object = {}
      }
    }
  },
  computed: {
    ...mapGetters(['showDailogQ', 'showDailogS']),
    setSectionClass() {
      if (this.typeCode === 0) {
        return 'cqnc_lmp bet'
      }
      if (this.typeCode === 9) {
        return 'cqList1'
      }
      return 'cqnc_ys bet'
    }
  },
  //初始化
  created() {
    let param = {}
    param.oid = sessionStorage.getItem('im_token')

    this.$http
      .post(`${getUrl()}/getinfo/getFirstToken`, JSON.stringify(param))
      .then(res => {
        this.gametoken = res.data.token
        sessionStorage.setItem('gametoken', JSON.stringify(res.data.token))
      })

    this.fetchGames({
      oid: sessionStorage.getItem('im_token'),
      game_code: 133,
      type_code: 4010
    })

    this.getGameData()
  },
  mounted() {
    this.$refs.bet_bar.addEventListener(
      'touchmove',
      function name(event) {
        event.preventDefault()
      },
      false
    )
    this.gameInterval = setInterval(() => {
      if (this.endtime <= 0) {
        this.isOpen = false
        this.getGameData()
        return
      } else {
        this.endtime--
        let timeStamp = Date.parse(new Date()) / 1000
      }
      if (this.endtime <= this.fentime) {
        this.fengpan = true
        this.clearSelected()
        this.$store.dispatch("hideDailogQ");
        this.$store.dispatch("hideDailogS");
        this.$store.commit('toggleConfirm',false)
      }
    }, 1000)
  },
  destroyed() {
    clearTimeout(this.fetchGameTimer)
    clearInterval(this.gameInterval)
  },
  components: {
    lotteryArea,
    lotteryHeader,
    dailogQ,
    dailogS,
    Loadpage,
    promptbox,
    luzhu,
    betDialog,
    gameChat
  }
}
</script>


<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
button {
  outline: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
/* .fade-leave-active in <2.1.8 */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
h3 {
  display: block;
  background: red;
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 12/20rem;
  margin: 0;
  text-align: center;
  background: #666;
  color: #fcfcfc;
}
.cqList {
  display: flex;
  flex-flow: row wrap;
  li {
    width: 180/45rem;
    div {
      text-align: center;
      width: 3.5rem;
      height: 89/45rem;
      border: 1px solid #e5e5e5;
      margin: 18/45rem auto;
      background: #fff;
      line-height: 40/45rem;
      border-radius: 3/20rem;
      span {
        color: #5084e2;
        font-size: 0.6rem;
        font-family: Arial !important;
        display: block;
        width: 100%;
        height: 40%;
        line-height: 0.9rem;
        background: linear-gradient(#eef1f5, #fff);
        background: -webkit-linear-gradient(#eef1f5, #fff);
      }

      strong {
        line-height: 1.5;
        height: 60%;
        display: block;
        font-size: 0.7rem;
        font-weight: normal;
      }
    }
    .active {
      border: 1/20rem solid #156bda;
      span:nth-of-type(1) {
        background: red;
        color: #fff;
      }
    }
    .isred {
      border: 1/20rem solid #156bda;
      box-sizing: border-box;
      span:nth-of-type(2) {
        background: #3261d8;
        color: #fff;
      }
    }
  }
}
.cqList1 {
  height: 320/20rem;
  li {
    width: 100%;
    text-align: center;
    > span {
      display: block;
      background: red;
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 12/20rem;
      text-align: center;
      border: 1px solid #fff;
      background: -webkit-radial-gradient(#555, #2a2926);
      color: #fcfcfc;
    }
    ul {
      li {
        display: inline-block;
        width: 3.75rem;
        button {
          position: relative;

          outline: 0;
          text-align: center;
          width: 3.5rem;
          margin: 0 auto;
          height: 89/45rem;
          padding: 0;
          border: 1px solid #e5e5e5;
          margin: 18/45rem auto 0;
          background: #fff;
          line-height: 40/45rem;
          border-radius: 3/20rem;
          > span:nth-child(2) {
            color: #5084e2;
            font-size: 14/40rem;
            font-family: Arial !important;
            display: block;
            width: 100%;
            height: 40%;
            line-height: 0.9rem;
            background: linear-gradient(#eef1f5, #fff);
            background: -webkit-linear-gradient(#eef1f5, #fff);
          }
          > span:nth-child(1) {
            line-height: 1.5;
            height: 60%;
            display: block;
            font-size: 32/40rem;
          }
          > span:first-child {
            line-height: 1.2rem;
            height: 1.2rem;
            margin: 0 auto;
            width: 1.2rem;
            display: block;
            font-size: 0.65rem;
            background: #3261d8 !important;
            border-radius: 50%;
            color: #fff;
          }
        }
        .active {
          border: 2px solid #1366dc;
          box-sizing: border-box;

          background-size: 16/45rem 16/45rem;
        }

        .active {
          border: 1/20rem solid #156bda;
          span:nth-of-type(2) {
            background: #3261d8;
            color: #fff;
          }
        }
        .isred {
          border: 2px solid #ff2312;
          box-sizing: border-box;
        }
      }
    }
  }
}
.cqList {
  > li {
    .active {
      border: 1/20rem solid red;
      position: relative;
      border-radius: 3/20rem;
    }
  }
}
.fp {
  width: 100%;
  height: 40/20rem;
  position: fixed;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  color: white;
  font-size: 30/20rem;
  text-shadow: -2px 1px 1px rgba(0, 0, 0, 0.6);
  align-items: center;
  letter-spacing: 15/20rem;
  box-sizing: border-box;
  z-index: 1000;
}

.mu-appbar {
  position: fixed;
  top: 0;
  left: 0;
  background: #146cdc;
  color: #fff;
  height: 44px;
}

.jtcaizg {
  background: #fff;
  clear: both;
  height: auto;
  overflow: hidden;
  padding: 10px;
  margin-top: 44px;
}
.indexkjdt {
  height: auto;
  clear: both;
}
.indexkjdt h3 {
  font-size: 14px;
  height: 29px;
  line-height: 25px;
  margin: 0;
}
.indexkjdt img {
  width: 100%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
.spaninri a {
  float: right;
  color: #fff;
  padding: 0 10px;
  margin-right: 10px;
  font-size: 12px;
  height: 21px;
  line-height: 21px;
  font-weight: 500;
  background: #f00;
  -webkit-border-radius: 18px;
  -moz-border-radius: 18px;
  border-radius: 18px;
}
.indexkjdt p span {
  color: #f00;
}
.indexkjdc {
  display: flex;
  height: 27/20rem;
}
.font_s {
  width: 42/20rem;
}
.indexkjdc .title {
  height: 29/20rem;
}
.indexkjdc i {
  float: right;
}
.indexkjdc i a {
  padding: 2px 6px;
  color: #fff;
  background: #36aafb;
  font-size: 12px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.pcznavc {
  clear: both;
  background: white;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e67074;
  padding: 5/20rem;
}
.pcznavc a {
  padding: 0 11px;
  font-size: 12px;
  background: #fff;
  color: #333;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  border: 1px solid #36aafb;
}
.pcznavc .a {
  background: #36aafb;
  color: #fff;
}
.pcznavc i {
  border-right: 1px solid #e67074;
}
.form {
  display: block;
  margin-top: 0;
}
.font_b {
  width: 52/20rem;
  display: inline-block;
}
.pptitle {
  clear: both;
  font-size: 16px;
  font-weight: 600;
}
.title_b {
  width: 51/20rem;
  display: inline-block;
  color: rgb(54, 170, 251);
}

.form {
  > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    background: #fff;
    padding-bottom: 110/20rem;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);

    > h3 {
      width: 100%;
      padding: 5/20rem;
      margin-top: 5/20rem;
      margin-bottom: 5/20rem;
      color: #d1506d;
      background: -webkit-linear-gradient(
        right,
        rgba(255, 255, 255, 1) 0%,
        #ffe8e8 100%
      );
      /* Chrome10-25,Safari5.1-6 */
    }
    > li {
      width: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 3/20rem;
      input {
        width: 40%;
      }
      > span:nth-of-type(1) {
        width: 22/20rem;
      }
    }
    span {
      font-size: 16/20rem;
      display: inline-block;
    }
  }
}
.odds_class {
  color: #c35f62;
}
.bet_bar {
  width: 100%;
  z-index: 999;
  // position: fixed;
  bottom: 52px;
  display: flex;
  justify-content: space-around;
  height: 55/20rem;
  padding: 9/20rem;
  background: -webkit-linear-gradient(
    top,
    #e67074 0%,
    #e67074 24%,
    #e67074 44%,
    #e67074 100%
  );
  /* Chrome10-25,Safari5.1-6 */
  font-size: 16/20rem;
  input {
    outline: 0;
    background: rgba(255, 255, 255, 0.9);
    border: 0;
    margin-right: 10/20rem;
    line-height: 1.25rem;
    padding: 0;
  }
  button {
    border: 0;
    /* border-radius: 2px;*/
  }
  button:nth-of-type(1) {
    color: white;
    background: #2f64d4;
    margin-right: 7/20rem;
  }
  button:nth-of-type(2) {
    color: white;
    background: #78c401;
  }
  .disable {
    background: #376cd4;
  }
  > div:nth-of-type(3) {
    position: relative;
    font-size: 15/20rem;
    > span {
      font-size: 12/20rem;
      position: absolute;
      top: -11/20rem;
      left: -7/20rem;
      color: #fff;
      width: 20/20rem;
      height: 20/20rem;
      border-radius: 10/20rem;
      background: red;
      box-shadow: 0 2/20rem 1/20rem rgba(0, 0, 0, 0.5);
    }
  }
}
.header_bar {
  z-index: 990;
  background: #146cdc;
  color: #fff;
  font-size: 16/20rem;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5/20rem;
  height: 38/20rem;
  box-shadow: 0 0.06rem 0.6rem rgba(0, 0, 0, 0.3);
  .header_title {
    display: flex;
    align-items: center;
  }
  .back {
    padding: 4/20rem;
  }
}
.jtc_titl {
  display: flex;
  flex-direction: row;
  align-items: center;
  > div:nth-of-type(1) {
    width: 15%;
  }
  > div:nth-of-type(2) {
    > div:nth-of-type(2) {
      font-size: 12/20rem;
    }
  }
  .font_b {
    width: 30/20rem;
  }
  .font_a {
    display: inline-block;
    width: 55/20rem;
  }
}
.indexkjdc {
  margin-top: 5/20rem;
}
.bet {
  /*   margin-bottom: 39/20rem;*/
  background: #dde5ec;
  margin-top: 0.3rem;
  > ul {
    > li {
      width: 20%;
      float: left; // display: inline-block;
      flex-direction: column;
      align-items: center;
      text-align: center;
      background: #f6f6f6;
      > span {
        display: block;
        background: #666666;
        width: 100%;
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 12/20rem;
        text-align: center;
        color: #cccccc;
      }
      > ul {
        button {
          outline: 0;
          border: 1/20rem solid #eaeaea; // display: flex;
 // justify-content: space-around;
          // flex-direction: column;
          width: 2.85rem;
          height: 41/20rem;
          padding: 0;
          align-items: center;
          margin: 4/20rem 0;
          position: relative;
          background: #fff;
          border-radius: 3/20rem;
          > span:nth-of-type(2) {
            color: #5084e2;
            font-size: 12/20rem;
            font-family: Arial !important;
            display: block;
            width: 100%;
            height: 40%;
            line-height: 0.9rem;
            background: #f2f2f2;
          }
          > span:nth-of-type(1) {
            line-height: 1.5;
            height: 60%;
            display: block;
            font-size: 0.8rem;
          }
        }
        > li:nth-last-of-type(1) {
          margin-bottom: 9/20rem;
        }
        .active {
          border: 1/20rem solid #156bda;
          span:nth-of-type(2) {
            background: #3261d8;
            color: #fff;
          }
        }
      }
    }
  }
}
.bet_bar {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  height: 39/20rem;
  background: white;
  align-items: center;
  padding: 0;
  box-shadow: 0 0.06rem 1rem rgba(0, 0, 0, 0.5);
  > div {
    width: 33.33%;
    text-align: center;
    input {
      width: 86/20rem;
      padding: 0;
      margin: 0;
    }
  }
  > div:nth-of-type(1) {
    width: 130/46.875rem;
    background-color: #eeeeee;
    height: 66/46.875rem;
    line-height: 66/46.875rem;
    border-radius: 10%;
    border: 1px solid #eaeaea;
    box-sizing: border-box;
    text-align: center;
    margin-left: 2%;
  }
  > div:nth-of-type(2) {
    width: 382/46.875rem;
    /* line-height:1rem;*/
    border: 1px solid #dedede;
    border-radius: 5/20rem;
    > span {
      left: 0.2rem;
      top: 0.2rem;
      z-index: 5;
      position: absolute;
      color: #ffffff;
      width: 45/46.875rem;
      height: 45/46.875rem;
      line-height: 1.15rem;
      margin-right: 0.2rem;
      display: inline-block;
      background: url('@{public_img}/images/moneybao.png') no-repeat;
      background-size: 100% 100%;
      font-size: 0.5rem;
    }
    // background-color: red;
    input {
      width: 80%;
      padding: 0rem;
      margin: 0;
    }
  }
  > div:nth-of-type(3) {
    width: 180/46.875rem;
  }
  button {
    display: block;
    width: 100%;
    height: 39/20rem;
    border: 0;
    background: #177bdd;
    padding: 0 !important;
    color: white;
  }
}
.iconfont_reset {
  width: 1rem;
  height: 1rem;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.3rem;
  margin-top: -2px;
  background: url('@{public_img}/images/resx.png') no-repeat;
  background-size: 100% 100%;
}
.lottery_nav_bar {
  width: 320/20rem;
  z-index: 1;
  ul {
    height: 30/20rem;
    color: white;
    box-sizing: border-box;
    font-size: 0;
    button {
      font-size: 14/20rem;
      width: 25%;
      text-align: center;
      padding: 0;
      z-index: 0;
      background: #1366dc;
      border: 0;
      outline: 0;
      color: white;
      padding: 8/20rem 0;
    }
    .active {
      background: #1f97f6;
    }
  }
}
.gyh {
  > ul {
    flex-direction: column;
    > li {
      width: 100%;
      > ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 0 10/20rem;
        justify-content: space-between;
        > li {
          width: 63/20rem;
          height: 50/20rem;
          margin: 5/20rem;
        }
        > li:nth-last-of-type(1),
        > li:nth-last-of-type(3),
        > li:nth-last-of-type(4),
        > li:nth-last-of-type(5),
        > li:nth-last-of-type(2) {
          width: 50/20rem;
          height: 50/20rem;
        }
      }
    }
    > li:nth-of-type(2) {
      > ul {
        > li {
          width: 63/20rem;
          height: 50/20rem;
          margin: 5/20rem;
        }
      }
    }
  }
}
.icon-lajitong {
  font-size: 25/20rem;
}
.lajiton-active {
  color: #36aafb;
}
.cqnc_lmp {
  > ul {
    > li {
      // background: white!important;
      width: 25%;
      > ul {
        > li {
          > button {
            width: 3.5rem;
          }
        }
      }
    }
    > li:nth-of-type(1) {
      width: 100%;
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 0 7/20rem;
        justify-content: space-between;
        > li {
          display: inline-block;
          margin: 0 3/20rem;
          button {
            width: 70/20rem;
            height: 45/20rem;
          }
        }
      }
    }
  }
}
.cqnc_ys {
  > ul {
    > li {
      width: 20%;
      button {
        width: 100%;
      }
    }
  }
}
.cqnc_ys > ul > li:first-child {
  width: 100%;
}
.regulation {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(7, 17, 27, 0.8);
  z-index: 999;
  top: 0;
  color: white;
  font-size: 12/20rem;
  overflow-y: scroll;
  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    > div {
      padding-left: 15/20rem;
      padding-right: 15/20rem;
      margin-top: 5/20rem;
      margin-bottom: 5/20rem;
    }
  }
  h5 {
    font-size: 14/20rem;
  }
  .header_regu {
    display: flex;
    justify-content: space-between;
    margin-top: 20/20rem;
    padding-left: 0;
    h5 {
      margin: 0;
    }
    > div:nth-of-type(1) {
      border-bottom: 1/20rem solid white;
      width: 80/20rem;
      transform: translate(29/20rem, -9/20rem);
    }
    > div:nth-last-of-type(1) {
      border-bottom: 1/20rem solid white;
      width: 80/20rem;
      transform: translate(-29/20rem, -9/20rem);
    }
  }
  .icon {
    position: absolute;
    right: 4/20rem;
    top: 0;
    font-size: 26/20rem;
  }
}
.game_main {
  height: 568/20rem;
  overflow: scroll;
}
.gd11x5-lianma {
  margin-top: 10px;
}
.gd11x5-lianma .sub-nav-list {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
}
.gd11x5-lianma .sub-nav-list li {
  width: 21%;
  text-align: center;
  margin: 2%;
  font-size: 0.6rem;
  border: solid thin #ddd;
  border-radius: 4px;
  overflow: hidden;
}
.gd11x5-lianma .sub-nav-list li.subnav-checked {
  border-color: #1366dc;
}
.gd11x5-lianma .sub-nav-list li.subnav-checked > div:last-child {
  background: #1366dc;
  color: white;
}
.gd11x5-lianma .sub-nav-list li > div:first-child {
  line-height: 1.2rem;
}
.gd11x5-lianma .sub-nav-list li > div:last-child {
  background: -webkit-linear-gradient(#eef1f5, #fff);
  color: #999;
  line-height: 0.7rem;
}
.sub_game_title {
  display: block;
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 0.6rem;
  text-align: center;
  border: 1px solid #fff;
  background: -webkit-radial-gradient(#555, #2a2926);
  color: #fcfcfc;
}
.lianma-check-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
}
.lianma-check-list > li {
  width: 20%;
  padding: 5px;
}
.lianma-check-list > li.checked button {
  border-color: #3261d8;
}
.lianma-check-list > li button {
  position: relative;
  text-align: center;
  height: 2rem;
  border: 1px solid #e5e5e5;
  background: #fff;
  line-height: 0.88888889rem;
  border-radius: 0.15rem;
  padding: 0;
  width: 100%;
  box-sizing: content-box;
}
.lianma-check-list > li button > div {
  padding-top: 3px;
  padding-bottom: 3px;
  font-size: 0.7rem;
  height: 1.05rem;
  display: inline-block;
  font-weight: 400;
  font-family: arial;
  background: url('../../../wap/images/blue_ball.png') no-repeat;
  width: 1.05rem;
  background-size: contain;
  background-position: 50%;
  border-radius: 1.25rem;
}
.lianma-check-list > li button > div > div {
  font-size: 0.5rem;
  color: #999;
}
.gd11x5_bet_list {
  padding: 5px;
}
.gd11x5_list_0 {
  display: flex;
  flex-wrap: wrap;
}
.gd11x5_list_0 > li {
  width: 25%;
}
.gd11x5_list_0 > li button {
  width: 3.6rem !important;
}
.bet_list_4018 .bet-item {
  padding-top: 3px;
  padding-bottom: 3px;
  font-size: 0.7rem;
  line-height: 1.05rem;
  display: inline-block;
  font-weight: 400;
  font-family: arial;
  background: url(/wap/img/blue_ball.863b729.png) no-repeat;
  width: 1.05rem;
  background-size: contain;
  background-position: 50%;
  border-radius: 1.25rem;
}
</style>
