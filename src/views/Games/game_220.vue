<template>
    <div style='height:100%'>
        <dailog-q :gametoken="gametoken" :type_code="activeClassifyId" :game_code="game_code" :money="money_s" :round="round" :lotteryM="objects" v-if="showDailogQ" v-on:listenToChildEvent="showMsgFromChild"></dailog-q>
        <dailog-z :gametoken="gametoken" :type_code="activeClassifyId" :game_code="game_code" :money="money_s" :round="round" :indeT="indexT" :lotteryM="objects" v-if="showDailogZ" v-on:listenToChildEvent="showMsgFromChild"></dailog-z>
        <lotteryHeader :title="title" :game_code="game_code" @regulation_click="regulation_control=true"></lotteryHeader>

        <gameChat>
          <div style='overflow-x: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch;width:100%;padding-bottom:2rem;'>
            <lotteryArea class="game_220" :zMoney="zMoney" :lotteryObj="body" :endtime="endtime" :fenpan="fengpan" :fentime="fentime" v-if="isOk" gameType="220"></lotteryArea>
            <div :style='de==true||loadpage==true?"display:none":"display:block"' class="nav_o">
              <ul :class="`${indexF} ${isShowNavf?'isShowNav':''}`" ref="firstNav">
                <li class="" v-for="(itmek,indexNav) in datas" v-if="indexNav<4" :class="{active8:itmek.isCheck}" @click="changgeNav(itmek,indexNav)">{{itmek.name}}
                  <span v-if="nav_i<4" @click.stop='updown()'></span>
                </li>
              </ul>
              <ul :class="`${indexS} ${isShowNavs?'isShowNav':''}`" ref="secondNav">
                <li class="" v-for="(itmek,indexNav) in datas" v-if="indexNav>=4&&indexNav<8" :class="{active8 :itmek.isCheck}" @click="changgeNav(itmek,indexNav)">{{itmek.name}}
                  <span v-if="nav_i>=4&&nav_i<8" @click.stop='updown()'></span>
                </li>
              </ul>
              <ul :class="`${indexTh} ${isShowNavt?'isShowNav':''}`" ref="threeNav">
                <li class="" v-for="(itmek,indexNav) in datas" v-if="indexNav>=8" :class="{active8:itmek.isCheck}" @click="changgeNav(itmek,indexNav)">{{itmek.name}}
                  <span v-if="nav_i>=8" @click.stop='updown()'></span>
                </li>
              </ul>
            </div>
            <section v-for="(itemZ,indexZ) in datas" class="cqList" :class="`cqList${indexZ}`" v-if="de==false&&nav_i==indexZ&&loadpage==false">
              <div style="width: 100%;" v-if="indexZ==3||indexZ==7">
                <ul>
                  <li class="li_4" v-for='(item,index) in itemZ.datasT'>
                    <button :class="{isred: inde === item.inde}" @click="one(item,index,itemZ.datasT)">{{item._name}}</button>
                  </li>
                </ul>
              </div>
              <div style="width: 100%;" v-if="indexZ==5">
                <ul>
                  <li class="li_4" v-for='(item,index) in itemZ.datasT'>
                    <button :class="{isred: activeClassifyId === item.type_code}" @click="ones(item,index,itemZ.datasT)">{{item._name}}</button>
                  </li>
                </ul>
              </div>
              <ul>
                <li v-for="(item,j) in itemZ.datats" :key="j">
                  <span v-show="item.name != ''&&item.names != 'ezzh'&&item.names != 'zxs'&&item.names != 'zxl'&&item.names != 'kd'&&item.names != 'szzh'" class='o_title'>{{item.name}}</span>
                  <ul>
                    <li v-if="item.names == 'yzzh'" v-for="(ite,i) in ico">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'bai'" v-for="(ite,i) in hes_0" class="bai">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'shi'" v-for="(ite,i) in hes_1" class="bai">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'ge'" v-for="(ite,i) in hes_2" class="bai">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'baishi'" v-for="(ite,i) in hes_3" class="bai_1">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'baige'" v-for="(ite,i) in hes_4" class="bai_1">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'shige'" v-for="(ite,i) in hes_5" class="bai_1">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'bshws'" v-for="(ite,i) in hes_6" class="bai_2">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'bghws'" v-for="(ite,i) in hes_7" class="bai_2">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'sghws'" v-for="(ite,i) in hes_8" class="bai_2">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'bsghs'" v-for="(ite,i) in hes_9" class="bai_2">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'bsghws'" v-for="(ite,i) in hes_10" class="bai_2">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'ezzh'||item.names == 'szhs'"  v-for="(ite,i) in ico">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'szzh'"  v-for="(ite,i) in ico_display">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'yzdwB'||item.names == 'ezdwB'||item.names == 'szdwB'"  v-for="(ite,i) in ico.hundreds">
                      <button  class="baiwei" :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{i}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'yzdwS'||item.names == 'ezdwS'||item.names == 'szdwS'"  v-for="(ite,i) in ico.decade">
                      <button class="shiwei" :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{i}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'yzdwG'||item.names == 'ezdwG'||item.names == 'szdwG'"  v-for="(ite,i) in ico.unit">
                      <button class="gewei" :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{i}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'ebshs'"  v-for="(ite,i) in ezhs_bs">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'ebghs'"  v-for="(ite,i) in ezhs_bg">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'esghs'"  v-for="(ite,i) in ezhs_sg">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{ite.title}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'ebshws'"  v-for="(ite,i) in ezhs_bsw">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{i}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'szhws'"  v-for="(ite,i) in icos.tail_3">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{i}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'ebghws'"  v-for="(ite,i) in ezhs_bgw">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{i}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'esghws'"  v-for="(ite,i) in ezhs_sgw">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{i}}</span>
                        <span v-if="ite.odds!=''" class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'zxs'||item.names == 'zxl'" v-for="(ite,i) in coss">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{i}}</span>
                        <span ref='kuang' class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                    <li v-if="item.names == 'kd'" v-for="(ite,i) in ico">
                      <button :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan">
                        <span v-bind:class="setRoundNumberClass(ite.title)">{{i}}</span>
                        <span class="odd color_money">{{fengpan?"封盘":ite.odds}}</span>
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
            <Loadpage v-if='loadpage'></Loadpage>
          </div>
          <section class="bet_bar" ref="bet_bar">

            <div>
              <span class="qin" @click="qingkong">重置</span>
            </div>
            <div style='position:relative'>
              <span style="color:#FFFFFF;" class="kuan1" v-if="xshuzi>0">{{xshuzi}}</span>
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
          <div style="position: absolute; left: 0; right: 0; top:0; bottom:0; background: rgba(0,0,0,0.5);z-index: 1000!important;" ref="div" v-if="showCurtion">
            <div class="loading">
              <div class="loader-inner line-spin-fade-loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </gameChat>

        <promptbox @panelShow="panelShow=false" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" :promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
    </div>
</template>
<script>
import { mapGetters, mutations } from "vuex";
// import footGuide from '../../components/footer/footGuide'
import lotteryHeader from "../../components/header/lotteryHeader";
import lotteryArea from "../../components/lottery-area";
import dailogQ from "../../components/dailogQ.vue";
import dailogZ from "../../components/dailogZ.vue";
import Loadpage from "../../components/Loadpage.vue";
import { getEvenCode } from "./marksixe.config";
import promptbox from "../../components/promptbox";
import gameChat from '@/components/game-chat/index';
import api from "@/api";
import {
  parseOddsList,
  getGamesCache,
  setGamesCache,
  getRoundNumberClass
} from "@/utils";
export default {
  data() {
    return {
      currentGame: [], // 当前游戏
      activeClassifyId: 6210, // typecode
      groupName:'',
      inde:0,
      evencodeId: 6210,
      evenCodeList: getEvenCode(),
      isShowNavf: false,
      isShowNavs: true,
      isShowNavt: true,
      firstNavisCheck: true,
      secondNavisCheck: false,
      threeNavisCheck: false,
      indexF: "nav_o_1",
      indexS: "nav_o_2",
      indexTh: "nav_o_3",
      classIndex: ["nav_o_1", "nav_o_2", "nav_o_3"],
      typecode: 6210,
      xshuzi: 0,
      zMoney: 0,
      updownB: true,
      nav_i: 0,
      fentime:2700,
      promptboxtext: "",
      panelShow: false,
      zhanshi: false,
      regulation_control: false,
      panelShow: false,
      showCurtion: true,
      loadpage: false,
      gametoken: "",
      ite:'',
      indexCodes:'',
      datas: [
        {
          name: "主势盘",
          isCheck: true,
          datasT: [
            {
              isCheck: true,
              _index: "zsp",
              type_code: 6194
            }
          ],
          datats:[
            {
              name: "一字组合",
              names:'yzzh',
              type_code: 6194
            },
            {name:"佰", names:'bai',},
            {name:"拾", names:'shi',},
            {name:"个", names:'ge',},
            {name:"佰拾", names:'baishi',},
            {name:"佰个", names:'baige',},
            {name:"拾个", names:'shige',},
            {name:"佰拾和尾数", names:'bshws',},
            {name:"佰个和尾数", names:'bghws',},
            {name:"拾个和尾数",names:'sghws',},
            {name:"佰拾个和数", names:'bsghs',},
            {name:"佰拾个和尾数", names:'bsghws',}
          ]
        },
        {
          name: "一字组合",
          isCheck: false,
          datasT: [
            {
              isCheck: true,
              _index: "yzzh",
              type_code: 6194
            }
          ],
          datats:[
            {name: "一字组合",type_code: 6194, names:'yzzh',},
            {name: "佰", names:'bai',},
            {name:"拾", names:'shi',},
            {name:"个", names:'ge',}
          ]
        },
        {
          isCheck: false,
          name: "二字组合",
          datasT: [
            {
              isCheck: true,
              _index: "ezzh",
              type_code: 6195
            },
          ],
          datats:[
            {name: "二字组合", names:'ezzh',},
          ]
        },
        {
          name: "三字组合",
          isCheck: false,
          type_code: 6197,
          datasT: [
            {
              isCheck: true,
              _index: "0~58",
              _name: "000-058",
              inde: 3,
              type_code: 6197
            },
            {
              isCheck: false,
              _index: "59~157",
              inde: 4,
              _name: "059-157"
            },
            {
              isCheck: false,
              _index: "158~278",
              inde: 5,
              _name: "158-278"
            },
            {
              isCheck: false,
              _index: "279~466",
              inde: 6,
              _name: "279-466"
            },
            {
              isCheck: false,
              _index: "467~999",
              inde: 7,
              _name: "467-999"
            }
          ],
          datats:[
            {name:'三字组合',names:'szzh'}
          ]
        },
        {
          name: "一字定位",
          isCheck: false,
          type_code: 6201,
          datasT: [
              {
              isCheck: true,
              _index: "yzdw",
              type_code: 6201
            }
          ],
          datats:[
            {name: "佰", names:'yzdwB',},
            {name: "拾", names:'yzdwS',},
            {name: "个", names:'yzdwG',},
          ]
        },
        {
          name: "二字定位",
          isCheck: false,
          datasT: [
            {
              isCheck: true,
              _index: "bsdw",
              _name:'佰拾定位',
              type_code: 6202,
            },
             {
              isCheck: true,
              _index: "bgdw",
              _name:'佰个定位',
              type_code: 6203
            },
             {
              isCheck: true,
              _index: "sgdw",
              _name:'拾个定位',
              type_code: 6204
            }
          ],
          datats:[]
        },
        {
          name: "三字定位",
          isCheck: false,
          type_code: 6205,
          datasT: [
            {
              isCheck: true,
              _index: "szdw",
              type_code: 6205
            }
          ],
          datats:[
            {name: "佰位", names:'szdwB',},
            {name: "拾位", names:'szdwS',},
            {name: "个位", names:'szdwG',},
          ]
        },
        {
          name: "二字和数",
          isCheck: false,
          type_code: 6206,
           datasT: [
            {
              isCheck: true,
              _index: "baishi",
              _name:'佰拾',
              inde: 3,
              type_code: 6206,
            },
             {
              isCheck: true,
              _index: "baige",
              _name:'佰个',
              inde: 4,
              type_code: 6206
            },
             {
              isCheck: true,
              _index: "shige",
              _name:'拾个',
              inde: 5,
              type_code: 6206
            }
          ],
        },
        {
          name: "三字和数",
          isCheck: false,
          type_code: 6207,
          datasT: [
            {
              isCheck: true,
              _index: "szhs",
              type_code: 6207
            },
          ],
          datats:[
            {name: "三字和数", names:'szhs',},
            {name: "三字和数尾数", names:'szhws',}
          ]
        },
        {
          name: "组选三",
          isCheck: false,
          type_code: 6211,
          datasT: [
            {
              isCheck: false,
              _index: "zxs",
              type_code: 6211
            },
          ],
          datats:[
            {name: "组选三", names:'zxs',}
          ]
        },
         {
          name: "组选六",
          isCheck: false,
          type_code: 6212,
          datasT: [
            {
              isCheck: false,
              _index: "zxl",
              type_code: 6212
            },
          ],
          datats:[
            {name: "组选六", names:'zxl',}
          ]
        },
        {
          name: "跨度",
          isCheck: false,
          type_code: 6208,
          datasT: [
            {
              isCheck: false,
              _index: "kd",
              type_code: 6208,
            }
          ],
          datats:[
            {name: "跨度", names:'kd',}
          ]
        }
      ],
      game_code: 220,
      type_code: 6210,
      title: "福彩3D",
      shuju: {},
      isBlue: false,
      demo: 0,
      body: {},
      seen: false,
      de: false,
      loading: false,
      // hotmsgs: {},
      oid_info: 0,
      isOk: false,
      endtime: 0,
      isOpen: true,
      lotteryList: {},
      numberList: [],
      dialog: false,
      codeMessage: "",
      keyValue: null,
      setTime: null,
      fengpan: false,
      object: {},
      objects: [],
      money_s: null,
      round: 0,
      n_1: false,
      dadiao: "zsp",
      indexT: 6194,
      loadpagebol: false,
      erreocode: "",
      promptboxtext: "",
      panelShow: false,
      promptboxshow: true,
      successshow: false,
      selectedTabName: "",
      ico:'',
      ico_display:[],
      ico_er:[],
      currentGames:'',
      icos:'',
      he:'',
      zh:'',
      hes_0:'',
      hes_1:'',
      hes_2:'',
      hes_3:'',
      hes_4:'',
      hes_5:'',
      hes_6:'',
      hes_7:'',
      hes_8:'',
      hes_9:'',
      hes_10:'',
      cos:'',
      coss:'',
      ezhs_bs:'',
      ezhs_bg:'',
      ezhs_sg:'',
      ezhs_bsw:'',
      ezhs_bgw:'',
      ezhs_sgw:'',
      icost:'',
      ezdwflag:false,
      szdwflag:false,
      groupNames:'',
      index_l:""
    };
  },

  methods: {
    cleanmoney() {
      this.money_s = null;
    },
    setRoundNumberClass(number) {
      if (!isNaN(number)) {
        return getRoundNumberClass(number);
      }
      return "";
    },
    fours() {
      this.onoff = false;
      if (navigator.userAgent.indexOf("UCBrowser") > -1) {
        setTimeout(() => {
          document.body.scrollTop = document.body.scrollHeight;
        }, 600);
      }
    },
    blur() {
      this.onoff = true;
    },
    showMsgFromChild(data) {
      if (data === true) {
        let oidInfo = sessionStorage.getItem("im_token");
        let prams = {
          oid: oidInfo
        };
        this.qingkong();
        this.$http
          .post(`${getUrl()}/getinfo/money`, JSON.stringify(prams))
          .then(res => {
            if (res.data.msg == "4001") {
              sessionStorage.clear();
              this.panelShow = true;
              this.promptboxtext = "您的账户已失效，请重新登录";
              setTimeout(() => {
                this.panelShow = false;
                this.$router.push({
                  path: "/login"
                });
              }, 1000);
            } else {
              this.zMoney = res.data.money;
              sessionStorage.setItem("im_money", res.data.money);
            }
          });
      }
    },
    updown() {
      if (this.$refs.firstNav.className == "nav_o_1 ") {
        this.isShowNavs = !this.isShowNavs;
        this.isShowNavt = !this.isShowNavt;
      } else if (this.$refs.secondNav.className == "nav_o_1 ") {
        this.isShowNavf = !this.isShowNavf;
        this.isShowNavt = !this.isShowNavt;
      } else {
        this.isShowNavf = !this.isShowNavf;
        this.isShowNavs = !this.isShowNavs;
      }
    },
    changgeNav(itmek, index) {
      this.index_l = index;
      this.qingkong();
      if(this.nav_i == index){
        return false;
      }
      if(itmek.name == '二字和数' ||itmek.name == '三字和数'){
        this.fetchGame({ type_code: 6209 });
      }
      this.selectedTabName = itmek.name;
      this.fetchGames({ type_code: itmek.datasT[0].type_code });
      this.activeClassifyId = itmek.datasT[0].type_code;
      for (let i = 0; i < this.datas.length; i++) {
        this.datas[i].isCheck = false;
      }
      itmek.isCheck = true;
      if (index < 4) {
        this.indexF = this.classIndex[0];
        this.isShowNavf = false;
        this.isShowNavs = true;
        this.isShowNavt = true;
        this.indexS = this.classIndex[1];
        this.indexTh = this.classIndex[2];
      } else if (index >= 8) {
        this.indexTh = this.classIndex[0];
        this.isShowNavf = true;
        this.isShowNavs = true;
        this.isShowNavt = false;
        this.indexS = this.classIndex[1];
        this.indexF = this.classIndex[2];
      } else {
        this.indexS = this.classIndex[0];
        this.isShowNavf = true;
        this.isShowNavs = false;
        this.isShowNavt = true;
        this.indexTh = this.classIndex[1];
        this.indexF = this.classIndex[2];
      }
      this.xshuzi = 0;
      this.isBlue = false;
      this.nav_i = index;
      this.object = {};
      if (!this.updownB) {
        this.updownB = !this.updownB;
      }
    },
    changes_m() {
      this.money_s = this.money_s.replace(/[^0-9]/g, "");
      if (!this.isEmptyObject(this.object) && this.money_s > 0) {
        this.isBlue = true;
      } else {
        this.isBlue = false;
      }
    },
    isEmptyObject(e) {
      for (let t in e) return !1;
      return !0;
    },
    qingkong() {
      this.isBlue = false;
      this.money_s = null;
      this.xshuzi = 0;
      for (let j = 0; j < this.coss.length; j++){
        this.coss[j].odds = '';
      }
      for (let item in this.object) {
        this.object[item].isCheck = false;
      }
      this.object = {};
    },
    subMit() {
      if (sessionStorage.getItem("im_realname") == "11") {
        sessionStorage.clear();
        this.promptboxtext = "请登录正式账号!";
        this.panelShow = true;
        this.promptboxshow = false;
        this.qingkong();
        return;
      }
      this.objects = [];
      for (let i in this.object) {
        this.objects.push(this.object[i]);
      }
      if (this.objects == 0) {
        this.promptboxtext = "请选择投注号码!";
        this.panelShow = true;
        return;
      } else if (this.money_s == null || this.money_s < 1) {
        this.promptboxtext = "请输入正确金额!";
        this.panelShow = true;
        setTimeout(this.isSHowff, 1200);
        return;
      }
      if(this.nav_i == 9){
        if (this.objects.length < 5) {
          this.objects.length < this.indexT
            ? (this.promptboxtext = `至少选择5个号码,最多选择10个号码`)
            : (this.promptboxtext = `最多选择10个号码`);
          this.panelShow = true;
          this.objects = [];
          return;
        }else{
          this.$store.dispatch("showDailogZ");
          for (let j = 0; j < this.coss.length; j++) {
            // this.coss[j].odds = '';
          }
          return;
        }
      }
      if(this.nav_i == 10){
         if (this.objects.length < 4) {
          this.objects.length < this.indexT
            ? (this.promptboxtext = `至少选择4个号码,最多选择8个号码`)
            : (this.promptboxtext = `最多选择8个号码`);
          this.panelShow = true;
          this.objects = [];
          return;
        }else{
          this.$store.dispatch("showDailogZ");
          return;
        }
      }
      if(this.nav_i == 5){
        this.ezdwflag = false;
        let aa = [];
        let bb = [];
        let flag_a = false;
        let flag_b = false;
        // if (this.dadiao == 'zsp' || this.dadiao == 'bsdw') {
        if (this.index_l == 5) {
          aa = document.getElementsByClassName('baiwei active3');
          bb = document.getElementsByClassName('shiwei active3');
        }
        if(this.indexCodes == 6203) {
          aa = document.getElementsByClassName('baiwei active3');
          bb = document.getElementsByClassName('gewei active3');
        }
        if(this.indexCodes == 6204) {
          aa = document.getElementsByClassName('shiwei active3');
          bb = document.getElementsByClassName('gewei active3');
        }

        if (aa.length > 0 && bb.length > 0) {
          this.ezdwflag = true;
        }
        if (this.ezdwflag == false)
        {
          this.promptboxtext = "两项中请各选一位!";
          this.panelShow = true;
          this.promptboxshow = false;
          return;
        }
      }
      if(this.nav_i == 6){

        this.szdwflag = false;
        let aa = [];
        let bb = [];
        let cc = [];
        let flag_a = false;
        let flag_b = false;
        let flag_c = false;
        // if (this.dadiao == 'zsp' || this.dadiao == 'bsdw') {
          if (this.index_l == 6) {
          aa = document.getElementsByClassName('baiwei active3');
          bb = document.getElementsByClassName('shiwei active3');
          cc = document.getElementsByClassName('gewei active3');
        }
        if (aa.length > 0 && bb.length > 0 && cc.length > 0) {
          this.szdwflag = true;
        }
        if (this.szdwflag == false)
        {
          this.promptboxtext = "三项中请各选一位";
          this.panelShow = true;
          this.promptboxshow = false;
          return;
        }
      }
      this.$store.dispatch("showDailogQ");
    },
    kadun(m, s) {
      function factorial(n) {
        return n <= 1 ? 1 : n * factorial(n - 1);
      }
      return factorial(m) / factorial(m - s) / factorial(s);
    },
    isCheck(j, i, item, groupName) {
      let n = `l${j}${i}`;
      item.isCheck = !item.isCheck;
      item.groupName = groupName;
      this.ite = item.isCheck;
      if (item.isCheck === true) {
        this.object[n] = item;
      } else {
        delete this.object[n];
      }
      if (!this.isEmptyObject(this.object) && this.money_s > 0) {
        this.isBlue = true;
      } else {
        this.isBlue = false;
      }
      let s = 0;
      for (let i in this.object) { s++ }
      this.xshuzi = s;
      if(groupName == '组选三'){

        let flag = 0;
        for (let i = 0; i < this.coss.length; i++) {
          if(typeof(this.coss[i].isCheck != 'undefined') && this.coss[i].isCheck == true){
            flag++;
          }
        }
        for (let j = 0; j < this.coss.length; j++) {
            this.coss[j].odds = '';
          }
        if(flag >= 5){
          for (let j = 0; j < this.coss.length; j++) {
            this.coss[j].odds = this.ico.oddlist[flag-5].odds
          }
        }
      }
      if(groupName == '组选六'){
        let flag = 0;
        for (let i = 0; i < this.coss.length; i++) {
          if(typeof(this.coss[i].isCheck != 'undefined') && this.coss[i].isCheck == true){
            flag++;
          }
        }
        if (flag <= 8) {
          this.zxSelect = true;
          this.xshuzi = flag;
        }
        if(this.zxSelect == false && item.isCheck === true){
          this.promptboxtext = "最多选择8个号码";
          this.panelShow = true;
          item.isCheck = false;
          flag = 8;
          this.xshuzi = 8;
          return;
        }
        this.zxSelect = (flag == 8) ? false : true;
        for (let j = 0; j < this.coss.length; j++) {
          this.coss[j].odds = '';
        }
        if(flag >= 4 && flag <= 8){
          for (let j = 0; j < this.coss.length; j++) {
            this.coss[j].odds = this.ico.oddlist[flag-4].odds
          }
        }
      }
    },
    fetchGame(params) {
      let options = {
        oid: sessionStorage.getItem("im_token"),
        game_code: 220,
      };
      this.de = true;
      setTimeout(() => {
        if (!this.loadpagebol) {
          this.de = false;
          this.loadpage = true;
          return;
        }
      }, 10000);
      api.getOddsList(Object.assign({}, options, params)).then(data => {
        if (data.data.msg == "4003") {
          this.$router.push({
            path: "/weihu"
          });
        }
        if (data.data.msg == "4001") {
          sessionStorage.clear();
          this.panelShow = true;
          this.promptboxtext = "您的账户已失效，请重新登录";
          setTimeout(() => {
            this.panelShow = false;
            this.$router.push({
              path: "/login"
            });
          }, 1000);
        } else {
          this.de = false;
          this.loadpagebol = true;
          this.currentGames = data.data;
          for (let i = 0; i < this.currentGames.length; i++) {
            this.icos = this.currentGames[i].list;
            this.ezhs_bsw =this.icos.tail_2.hd,
            this.ezhs_bgw =this.icos.tail_2.hu,
            this.ezhs_sgw =this.icos.tail_2.du
          }
        }
      })
      .catch(err => {
        this.de = false;
      });
    },
    fetchGamees(params) {
      let options = {
        oid: sessionStorage.getItem("im_token"),
        game_code: 220,
      };
      this.de = true;
      setTimeout(() => {
        if (!this.loadpagebol) {
          this.de = false;
          this.loadpage = true;
          return;
        }
      }, 10000);
      api.getOddsList(Object.assign({}, options, params)).then(data => {
        if (data.data.msg == "4003") {
          this.$router.push({
            path: "/weihu"
          });
        }
        if (data.data.msg == "4001") {
          sessionStorage.clear();
          this.panelShow = true;
          this.promptboxtext = "您的账户已失效，请重新登录";
          setTimeout(() => {
            this.panelShow = false;
            this.$router.push({
              path: "/login"
            });
          }, 1000);
        } else {
          this.de = false;
          this.loadpagebol = true;
          this.currentGames = data.data;
          for (let i = 0; i < this.currentGames.length; i++) {
            this.icost = this.currentGames[i].list;
          }
        }
      })
      .catch(err => {
        this.de = false;
      });
    },
    fetchGames(params) {
      let options = {
        oid: sessionStorage.getItem("im_token"),
        game_code: 220
      };
      this.de = true;
      setTimeout(() => {
        if (!this.loadpagebol) {
          this.de = false;
          this.loadpage = true;
          return;
        }
      }, 10000);
          if(params.type_code == 6197){
            this.one(0,0,3)
          }
          if(params.type_code == 6202){
            this.datas[5].datats=[
              {name: "佰", names:'ezdwB',},
              {name: "拾", names:'ezdwS',}
            ]
          }
          if(params.type_code == 6203){
            this.datas[5].datats=[
              {name: "佰", names:'ezdwB',},
              {name: "个", names:'ezdwG',}
            ]
          }
          if(params.type_code == 6204){
            this.datas[5].datats=[
              {name: "拾", names:'ezdwS',},
              {name: "个", names:'ezdwG',}
            ]
          }
          if(params.type_code == 6206){
            this.one(0, 0, 3)
          }
      api.getOddsList(Object.assign({}, options, params)).then(data => {
        if (data.data.msg == "4003") {
          this.$router.push({
            path: "/weihu"
          });
        }
        if (data.data.msg == "4001") {
          sessionStorage.clear();
          this.panelShow = true;
          this.promptboxtext = "您的账户已失效，请重新登录";
          setTimeout(() => {
            this.panelShow = false;
            this.$router.push({
              path: "/login"
            });
          }, 1000);
        } else {
          this.de = false;
          this.loadpagebol = true;
          this.currentGame = data.data;
          for (let i = 0; i < this.currentGame.length; i++) {
            this.ico = this.currentGame[i].list;
            this.ezhs_sg = this.ico.du;
            this.ezhs_bg = this.ico.hu;
            this.ezhs_bs = this.ico.hd;
            this.cos = this.ico.key;
            this.coss =  [
              {key:   this.cos[0]},
              {key:   this.cos[1]},
              {key:   this.cos[2]},
              {key:   this.cos[3]},
              {key:   this.cos[4]},
              {key:   this.cos[5]},
              {key:   this.cos[6]},
              {key:   this.cos[7]},
              {key:   this.cos[8]},
              {key:   this.cos[9]}
            ]
          }
          if (!getGamesCache(`${options.game_code}_${params.type_code}`)) {
            setGamesCache(`${options.game_code}_${params.type_code}`, data);
          }
        }
      })
      .catch(err => {
        this.de = false;
      });
    },
    fetchGamess(params) {
      let options = {
        oid: sessionStorage.getItem("im_token"),
        game_code: 220
      };
      this.de = true;
      setTimeout(() => {
        if (!this.loadpagebol) {
          this.de = false;
          this.loadpage = true;
          return;
        }
      }, 10000);
      api.getOddsList(Object.assign({}, options, params)).then(data => {
        if (data.data.msg == "4003") {
          this.$router.push({
            path: "/weihu"
          });
        }
        if (data.data.msg == "4001") {
          sessionStorage.clear();
          this.panelShow = true;
          this.promptboxtext = "您的账户已失效，请重新登录";
          setTimeout(() => {
            this.panelShow = false;
            this.$router.push({
              path: "/login"
            });
          }, 1000);
        } else {
          this.de = false;
          this.loadpagebol = true;
          let currary = data.data
          for (let i = 0; i < currary.length; i++) {
            this.he = currary[i].list;
            this.hes_0 = this.he[0];
            this.hes_1 = this.he[1];
            this.hes_2 = this.he[2];
            this.hes_3 = this.he[3];
            this.hes_4 = this.he[4];
            this.hes_5 = this.he[5];
            this.hes_6 = this.he[6];
            this.hes_7 = this.he[7];
            this.hes_8 = this.he[8];
            this.hes_9 = this.he[9];
            this.hes_10 = this.he[10];
          }
          if (!getGamesCache(`${options.game_code}_${params.type_code}`)) {
            setGamesCache(`${options.game_code}_${params.type_code}`, data);
          }
        }
      })
      .catch(err => {
        this.de = false;
      });
    },
    one(item, j, k) {
      this.qingkong();
      this.fetchGamees({ type_code: item.type_code });
      this.inde = item.inde;
      this.ico_display = [];
      if (j == 0){
        this.inde = 3;
        for (let i = 0; i < 44; i++) {
          this.ico_display.push(this.icost[i]);
        }
        this.datas[7].datats=[
          {name: "佰拾和数", names:'ebshs',},
          {name: "佰拾和尾数", names:'ebshws',type_code:'6209'}
        ]
      }
      if (j == 1){
        for (let i = 44; i < 88; i++) {
          this.ico_display.push(this.icost[i]);
        }
        this.datas[7].datats=[
          {name: "佰个和数", names:'ebghs',},
          {name: "佰个和尾数", names:'ebghws',type_code:'6209'}
        ]
      }
      if (j == 2){
        for (let i = 88; i < 132; i++) {
          this.ico_display.push(this.icost[i]);
        }
        this.datas[7].datats=[
          {name: "拾个和数", names:'esghs',},
          {name: "拾个和尾数", names:'esghws',type_code:'6209'}
        ]
      }
      if (j == 3){
        for (let i = 132; i < 176; i++) {
          this.ico_display.push(this.icost[i]);
        }
      }
      if (j == 4){
        for (let i = 176; i < 220; i++) {
          this.ico_display.push(this.icost[i]);
        }
      }
    },
    ones(item, j, k) {
        this.indexCodes = item.type_code;
        this.qingkong();
        this.fetchGames({ type_code: item.type_code });
        this.activeClassifyId = item.type_code;
        this.object = {};
        this.xshuzi = 0;

      item.isCheck = false;

      k.forEach(function(key) {
        key.isCheck = false;
      });

      k[j].isCheck = true;
      this.indexT = k[j].inde;
      this.dadiao = item._index;
    },
  },
  filters: {
    formatTitle(val, typecode) {
      if (typecode === 13) {
      }
    }
  },
  computed: {
    ...mapGetters(["showDailogQ", "showDailogZ"]),
  },
  //初始化
  created() {
    let param = {};
    param.oid = sessionStorage.getItem("im_token");
    this.$http
      .post(`${getUrl()}/getinfo/getFirstToken`, JSON.stringify(param))
      .then(res => {
        this.gametoken = res.data.token;
        sessionStorage.setItem("gametoken", JSON.stringify(res.data.token));
      });
    this.showCurtion = false;
    let newTime = Date.parse(new Date()) / 1000;
    let oldTime = localStorage.getItem("fc3d_time");
     this.fetchGames({
      type_code: 6194
    });
    this.fetchGamess({
      type_code: 6210
    });
    this.fetchGame({
      type_code: 6209
    });
    this.fetchGamees({
      type_code: 6197
    });
    if (oldTime && newTime <= oldTime) {
      let bodyS = localStorage.getItem("fc3d_body");
      JSON.parse(bodyS).next.isclose
        ? (this.fengpan = true)
        : (this.fengpan = false);
      let oldTime = localStorage.getItem("fc3d_time");
      let moneyX = sessionStorage.getItem("im_money");
      this.zMoney = parseFloat(moneyX);
      this.isOk = true;
      this.endtime = oldTime - newTime;
      this.body = JSON.parse(bodyS);
      this.round = this.body.next.round;
      //    this.de = false;
    } else {
      let oidInfo = sessionStorage.getItem("im_token");
      this.oid_info = oidInfo;
      let params = {
        params: {
          game_code: 220, //  登录账号
          oid: oidInfo
        }
      }; // 获取token配置
      this.$http
        .post(`${getUrl()}/getinfo/game`, JSON.stringify(params.params), {
          timeout: 15000
        })
        .then(res => {
          if (res.data.msg == "4003") {
            this.$router.push({
              path: "/weihu"
            });
          }
          this.isOk = true;
          if (res.data.msg == "4001") {
            sessionStorage.clear();
            this.panelShow = true;
            this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() => {
              this.panelShow = false;
              this.$router.push({
                path: "/login"
              });
            }, 1000);
          } else {
            let timeStamp = res.data.next.timestap;
            this.fengpan = res.data.next.isclose;
            let l = res.data;
            // l.last.number.splice(6, 0, "+");
            this.body = l;
            this.endtime = res.data.next.endtime - timeStamp;
            this.round = res.data.next.round;
            let loaclTime = this.endtime + newTime;
            if (sessionStorage.getItem("im_realname") == "11") {
              this.zMoney = sessionStorage.getItem("im_money");
            } else {
              this.zMoney = res.data.lcurrency;
              sessionStorage.setItem("im_money", res.data.lcurrency);
            }
            localStorage.setItem("fc3d_time", loaclTime);
            localStorage.setItem("fc3d_body", JSON.stringify(res.data));
            this.numberList = res.data.last.number;
            this.round = res.data.next.round;
          }
        })
        .catch(function() {
          this.$router.push({
            path: "/login"
          }); // 跳转到登陆
        });
    }
  },
  reddy() {},
  mounted() {
    this.$refs.bet_bar.addEventListener(
      "touchmove",
      function name(event) {
        event.preventDefault();
      },
      false
    );
    setInterval(() => {
      if (this.endtime <= 0) {
        this.isOpen = false;
        return;
      } else {
        this.endtime--;
        let timeStamp = Date.parse(new Date()) / 1000;
      }
    }, 1000);
  },
  watch: {
    endtime: function() {
      if (
        this.endtime == 0 ||
        this.endtime == 295 ||
        this.endtime == 297 ||
        this.endtime == 292
      ) {
        let newTime = Date.parse(new Date()) / 1000;
        this.fengpan = false;
        let oidInfo = sessionStorage.getItem("im_token");
        this.oid_info = oidInfo;
        let params = {
          params: {
            game_code: 220,
            oid: oidInfo
          }
        };
        this.$http
          .post(`${getUrl()}/getinfo/game`, JSON.stringify(params.params))
          .then(res => {
            this.isOk = true;
            let timeStamp = res.data.next.timestap;
            if (res.data.msg == 4001) {
              //  1未登陆
              sessionStorage.clear();
              this.panelShow = true;
              this.promptboxtext = "您的账户已失效，请重新登录";
              setTimeout(() => {
                this.panelShow = false;
                this.$router.push({
                  path: "/login"
                });
              }, 1000);
            } else {
              let moneyX = sessionStorage.getItem("im_money");
              this.zMoney = parseFloat(moneyX);
              let timeStamp = res.data.next.timestap;
              let l = res.data;
            //   l.last.number.splice(-1, 0, "+");
              this.body = l;
              this.endtime = res.data.next.endtime - timeStamp;
              this.fengpan = res.data.next.isclose;
              let loaclTime = this.endtime + newTime;
              if (sessionStorage.getItem("im_realname") == "11") {
                this.zMoney = sessionStorage.getItem("im_money");
              } else {
                this.zMoney = res.data.lcurrency;
                sessionStorage.setItem("im_money", res.data.lcurrency);
              }
              localStorage.setItem("fc3d_time", loaclTime);
              localStorage.setItem("fc3d_body", JSON.stringify(res.data));
              this.numberList = res.data.last.number;
              this.round = res.data.next.round;
            }
          });
      } else if (this.endtime <= 2700 && this.endtime > 0) {
        this.qingkong();
        this.fengpan = true;
        // this.$store.dispatch("hideDailogS");
        this.$store.dispatch("hideDailogQ");
        this.$store.dispatch("hideDailogZ");
        // this.$store.dispatch("hideDailogW");
      }
    },
    $route() {}
  },
  components: {
    lotteryArea,
    lotteryHeader,
    dailogQ,
    dailogZ,
    Loadpage,
    promptbox,
    gameChat
  }
};
</script>



<style lang="less" rel="stylesheet/less" scoped>
@import "../../assets/less/variable.less";
.cqList{
  background: #dde5ec;
  > div {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    background: #dde5ec;

    h3 {
      margin: 0;
      width: 100%;
      height: 68/45rem;
      line-height: 68/45rem;
      font-weight: normal;
      box-shadow: inset 1px 2px 1px #fff;
      text-align: center;
      background: #7a7a7a;
      color: #fff;
    }
    ul {
      text-align: center;
      width: 100%;

      li {
        display: inline-block;
        margin: 0 4/20rem;
        width:30%;
        button {
          position: relative;
          text-align: center;
          height: 93/60rem;
          width:100%;
          border: 1px solid #e5e5e5;
          margin: 0.3rem auto;
          background: #fff;
          line-height: 93/60rem;
          font-size: 38/60rem;
          border-radius: 3/20rem;
          border:1px solid #cccccc;
        }
        .isred:before {
          content: "";
          background: url("@{public_img}/images/red1.png") no-repeat;
          background-size: 0.55rem 0.55rem;
          position: absolute;
          left: -1px;
          top: -1px;
          width: 0.55rem;
          height: 0.55rem;
        }
        .isred {
          border: 1px solid #ed0132;
        }
      }
    }
  }
}
button {
  outline: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.bai{
  width:2.65rem!important;
}
.bai_1{
  width:50%!important;
}
.bai_2{
  width:25%!important;
}
.bai button{
  width:106/45rem !important;
}
.bai_1 button{
  width:344/45rem !important;
}
.bai_2 button{
  width:166/45rem !important;
}
.cqList4 {
  ul {
    > li {
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
      > ul {
        background: #dde5ec;
        text-align: center;
        li {
          display: inline-block;
          width: 20%;
          button {
            position: relative;
            outline: 0;
            text-align: center;
            width: 2.8rem;
            height: 2rem;
            border: 1px solid #e5e5e5;
            margin: 8/45rem auto;
            background: #fff;
            line-height: 0.88888889rem;
            border-radius: 0.15rem;
            padding: 0;
            > span:nth-child(2) {
              color: #5084e2;
              font-size: 12/20rem;
              font-family: Arial !important;
              display: block;
              width: 100%;
              height: 40%;
              line-height: 0.9rem;
              margin-bottom: -0.2rem;
              color:#999999;
              background: linear-gradient(#eef1f5, #fff);
              background: -webkit-linear-gradient(#eef1f5, #fff);
            }
            > span:nth-child(1) {
                text-align: center;
                font-size: 0.7rem;
                width: .9rem;
                height: .9rem;
                border: 1px solid #105ff5;
                display: inline-block;
                border-radius: 50%;
                line-height: .9rem;
                background: #105ff5;
                color: #fff;
                position: relative;
                margin-bottom:.2rem;
            }
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
    li:nth-child(2) {
      > ul {
        li:nth-child(4) {
          > button {
            margin-bottom: 8/45rem;
          }
        }
      }
    }
  }
}
.cqList0 {
  ul {
    > li {
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
      > ul {
        background: #dde5ec;
        justify-content: space-around;
        text-align: center;
        li {
          display: inline-block;
          width: 20%;
          button {
            position: relative;
            outline: 0;
            text-align: center;
            width: 126/45rem;
            height: 2rem;
            border: 1px solid #e5e5e5;
            margin: 8/45rem auto;
            background: #fff;
            line-height: 40/45rem;
            border-radius: 3/20rem;
            padding: 0;
            > span:nth-child(2) {
              color: #5084e2;

              font-family: Arial !important;
              display: block;
              width: 100%;
              height: 40%;
              margin-bottom: -0.1rem;
              line-height: 0.9rem;
              background: linear-gradient(#eef1f5, #fff);
              background: -webkit-linear-gradient(#eef1f5, #fff);
              font-size: 12/20rem;
            }
            > span:nth-child(1) {
              padding-top: 3px;
              padding-bottom: 3px;
              font-size: 14/20rem;
              height: 21/20rem;
              display: inline-block;
              width: 48/20rem;
              font-weight: normal;
              font-family: "arial";
            }
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
}

.cqList1 {
  ul {
    > li {
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
      > ul {
        background: #dde5ec;
        text-align: center;
        li {
          display: inline-block;
          width: 20%;
          button {
            position: relative;
            outline: 0;
            text-align: center;
            width: 2.8rem;
            height: 2rem;
            border: 1px solid #e5e5e5;
            margin: 8/45rem auto;
            background: #fff;
            line-height: 40/45rem;
            border-radius: 3/20rem;
            padding: 0;
            > span:nth-child(2) {
              color: #5084e2;
              font-family: Arial !important;
              display: block;
              width: 100%;
              height: 40%;
              line-height: 0.9rem;
              margin-bottom: -0.1rem;
              background: linear-gradient(#eef1f5, #fff);
              background: -webkit-linear-gradient(#eef1f5, #fff);
              font-size: 12/20rem;
            }
            > span:nth-child(1) {
              padding-top: 3px;
              padding-bottom: 3px;
              font-size: 14/20rem;
              height: 21/20rem;
              display: inline-block;
              width: 48/20rem;
              font-weight: normal;
              font-family: "arial";
            }
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
}

.cqList9,.cqList10,.cqList11 {
  ul {
    > li {
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
      > ul {
        background: #dde5ec;
        text-align: center;
        li {
          display: inline-block;
          width: 20%;
          button {
            position: relative;
            outline: 0;
            text-align: center;
            width: 2.8rem;
            height: 2rem;
            border: 1px solid #e5e5e5;
            margin: 8/45rem auto;
            background: #fff;
            line-height: 40/45rem;
            border-radius: 3/20rem;
            padding: 0;
            > span:nth-child(2) {
              color: #5084e2;
              font-family: Arial !important;
              display: block;
              width: 100%;
              height: 40%;
              line-height: 0.9rem;
              margin-bottom: -0.1rem;
              background: linear-gradient(#eef1f5, #fff);
              background: -webkit-linear-gradient(#eef1f5, #fff);
              font-size: 12/20rem;
            }
            > span:nth-child(1) {
              padding-top: 3px;
              padding-bottom: 3px;
              font-size: 14/20rem;
              height: 21/20rem;
              display: inline-block;
              width: 48/20rem;
              font-weight: normal;
              font-family: "arial";
            }
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
}
.cqList8 {
  ul {
    > li:nth-child(1) {
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
      > ul {
        background: #dde5ec;
        text-align: center;
        li:nth-child(1),
        li:nth-child(2),
        li:nth-child(3),
        li:nth-child(4),
        li:nth-child(5),
        li:nth-child(6){
          width: 16.6%;
          button{
            width:2.4rem;
          }
        }
        li {
          display: inline-block;
          margin: 0 /20rem;
          width: 20%;
          button {
            position: relative;
            outline: 0;
            text-align: center;
            width: 126/45rem;
            height: 2rem;
            border: 1px solid #e5e5e5;
            margin: 8/45rem auto;
            background: #fff;
            line-height: 40/45rem;
            border-radius: 3/20rem;
            padding: 0;
            > span:nth-child(2) {
              color: #5084e2;

              font-family: Arial !important;
              display: block;
              width: 100%;
              height: 40%;
              margin-bottom: -0.1rem;
              line-height: 0.9rem;
              background: linear-gradient(#eef1f5, #fff);
              background: -webkit-linear-gradient(#eef1f5, #fff);
              font-size: 12/20rem;
            }
            > span:nth-child(1) {
              padding-top: 3px;
              padding-bottom: 3px;
              font-size: 14/20rem;
              height: 21/20rem;
              display: inline-block;
              width: 48/20rem;
              font-weight: normal;
              font-family: "arial";
            }
          }

          .active {
            border: 1/20rem solid #156bda;
            span:nth-of-type(2) {
              background: #3261d8;
              color: #fff;
            }
          }
        }
        li:nth-child(12) {
          > button {
            margin-bottom: 8/45rem;
          }
        }
      }
    }
    > li:nth-child(2) {
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
      > ul {
        background: #dde5ec;
        text-align: center;
        li {
          display: inline-block;
          margin: 0 /20rem;
          width: 20%;
          button {
            position: relative;
            outline: 0;
            text-align: center;
            width: 126/45rem;
            height: 2rem;
            border: 1px solid #e5e5e5;
            margin: 8/45rem auto;
            background: #fff;
            line-height: 40/45rem;
            border-radius: 3/20rem;
            padding: 0;
            > span:nth-child(2) {
              color: #5084e2;

              font-family: Arial !important;
              display: block;
              width: 100%;
              height: 40%;
              margin-bottom: -0.1rem;
              line-height: 0.9rem;
              background: linear-gradient(#eef1f5, #fff);
              background: -webkit-linear-gradient(#eef1f5, #fff);
              font-size: 12/20rem;
            }
            > span:nth-child(1) {
              padding-top: 3px;
              padding-bottom: 3px;
              font-size: 14/20rem;
              height: 21/20rem;
              display: inline-block;
              width: 48/20rem;
              font-weight: normal;
              font-family: "arial";
            }
          }

          .active {
            border: 1/20rem solid #156bda;
            span:nth-of-type(2) {
              background: #3261d8;
              color: #fff;
            }
          }
        }
        li:nth-child(12) {
          > button {
            margin-bottom: 8/45rem;
          }
        }
      }
    }
  }
}
.cqList2 {
  ul {
    > li {
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
      > ul {
        background: #dde5ec;
        text-align: center;
        li {
          display: inline-block;
          width: 20%;
          button {
            position: relative;
            outline: 0;
            text-align: center;
            width: 2.8rem;
            height: 2rem;
            border: 1px solid #e5e5e5;
            margin: 8/45rem auto;
            background: #fff;
            line-height: 40/45rem;
            border-radius: 3/20rem;
            padding: 0;
            > span:nth-child(2) {
              color: #5084e2;
              font-size: 12/20rem;
              font-family: Arial !important;
              display: block;
              width: 100%;
              height: 40%;
              line-height: 0.9rem;
              margin-bottom: -0.1rem;
              color:#999999;
              background: linear-gradient(#eef1f5, #fff);
              background: -webkit-linear-gradient(#eef1f5, #fff);
              font-family: "arial";
            }
            > span:nth-child(1) {
              padding-top: 3px;
              padding-bottom: 3px;
              font-size: 14/20rem;
              height: 21/20rem;
              display: inline-block;
              width: 48/20rem;
              font-weight: normal;
              font-family: "arial";
            }
          }
          .active {
            border: 1/20rem solid #156bda;
            span:nth-of-type(2) {
              background: #3261d8;
              color: #fff;
            }
          }
        }
        li:nth-child(71),
        li:nth-child(72),
        li:nth-child(73),
        li:nth-child(74) {
          button{
            width:92%;
          }
          width:25%;
        }
      }
    }
  }
}
.cqList3 {
  background: #dde5ec;
  > div {
    ul {
      text-align: center;
      width: 100%;
      li {
        display: inline-block;
        margin: 0 4/20rem;
        width:30%;
        button {
          position: relative;
          width: 100%;
          text-align: center;
          height: 93/60rem;
          border: 1px solid #e5e5e5;
          margin: 0.3rem auto;
          background: #fff;
          line-height: 93/60rem;
          font-size: 38/60rem;
          border-radius: 3/20rem;
          border:1px solid #cccccc;
          height:98/55rem;
        }
      }
      li:nth-child(4),li:nth-child(5){
        width:46%;
      }
    }
  }
  ul {
    > li {
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
      > ul {
        text-align: center;
        background: #dde5ec;
        li {
          display: inline-block;
          width: 20%;
          button {
            position: relative;
            outline: 0;
            text-align: center;
            width: 90%;
            margin: 0 auto;
            height: 89/45rem;
            border: 1px solid #e5e5e5;
            margin: 8/45rem auto 0;
            background: #fff;
            padding: 0;
            border-radius:0.15rem;
            line-height: 40/45rem;
            > span:nth-child(2) {
              height: 38/45rem;
              width: 100%;
              display: block;
              color: #125dc9;
              font-size: 12/20rem;
              font-family: "arial";
              margin-bottom:-0.1rem;
              color:#999999;
              background: linear-gradient(#eef1f5, #fff);
              background: -webkit-linear-gradient(#eef1f5, #fff);
            }
            > span:nth-child(1) {
              padding-top: 3px;
              font-size: 28/45rem;
              height: 43/45rem;
              display: block;
              width: 100%;
              font-weight: normal;
              font-family: "arial";
            }
          }
          .active {
            border: 1/20rem solid #156bda;
            span:nth-of-type(2) {
              background: #3261d8;
              color: #fff;
            }
          }
        }
        li:nth-child(41),
        li:nth-child(42),
        li:nth-child(43),
        li:nth-child(44){
          width:25%;
        }
      }
    }
  }
}

.cqList7 {
  background: #dde5ec;
  height: 18rem;
  ul {
    > li:nth-child(1) {
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
      > ul {
        text-align: center;
        background: #dde5ec;
        li:nth-child(1),
        li:nth-child(2),
        li:nth-child(3),
        li:nth-child(4),
        li:nth-child(5){
          width: 20%;
          button{
            width: 2.8rem;
          }
        }
        li {
          display: inline-block;
          width: 16.6%;
          button {
            position: relative;
            outline: 0;
            text-align: center;
            width: 2.4rem;
            margin: 8/45rem auto;
            height: 2.277778rem;
            border: 1px solid #e5e5e5;
            border-radius: 3/20rem;
            background: #fff;
            padding: 0;
            > span:nth-child(2) {
              height: .8rem;
              line-height: 1rem;
              width: 100%;
              display: block;
              color: #125dc9;
              font-size: 12/20rem;
              font-family: "arial";
              margin-bottom:-.1rem;
              color:#999999;
              background: linear-gradient(#eef1f5, #fff);
              background: -webkit-linear-gradient(#eef1f5, #fff);
            }
            > span:nth-child(1) {
              font-size: 32/40rem;
              height: 60%;
              display: block;
              width: 100%;
              line-height: 90/60rem;
              font-weight: normal;
              font-family: "arial";
            }
          }

          .active {
            border: 1/20rem solid #156bda;
            span:nth-of-type(2) {
              background: #3261d8;
              color: #fff;
            }
          }
        }
        li:nth-child(12) {
          > button {
            margin-bottom: 8/45rem;
          }
        }
      }
    }
    > li:nth-child(2) {
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
      > ul {
        text-align: center;
        background: #dde5ec;
        li {
          display: inline-block;
          width: 20%;
          button {
            position: relative;
            outline: 0;
            text-align: center;
            width: 2.8rem;
            margin: 8/45rem auto;
            height: 2.277778rem;
            border: 1px solid #e5e5e5;
            border-radius: 3/20rem;
            background: #fff;
            padding: 0;
            > span:nth-child(2) {
              height: .8rem;
              line-height: 1rem;
              width: 100%;
              display: block;
              color: #125dc9;
              font-size: 12/20rem;
              font-family: "arial";
              margin-bottom:-.1rem;
              color:#999999;
              background: linear-gradient(#eef1f5, #fff);
              background: -webkit-linear-gradient(#eef1f5, #fff);
            }
            > span:nth-child(1) {
              font-size: 32/40rem;
              height: 60%;
              display: block;
              width: 100%;
              line-height: 90/60rem;
              font-weight: normal;
              font-family: "arial";
            }
          }

          .active {
            border: 1/20rem solid #156bda;
            span:nth-of-type(2) {
              background: #3261d8;
              color: #fff;
            }
          }
        }
        li:nth-child(12) {
          > button {
            margin-bottom: 8/45rem;
          }
        }
      }
    }
  }
}
.cqList5 {
  ul {
    > li {
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
      > ul {
        text-align: center;
        background: #dde5ec;
        li {
          display: inline-block;
          width: 20%;
          button {
            position: relative;
            outline: 0;
            text-align: center;
            width: 2.8rem;
            margin: 8/45rem auto;
            height: 89/45rem;
            border: 1px solid #e5e5e5;
            background: #fff;
            line-height: 40/45rem;
            border-radius: 3/20rem;
            padding: 0;
            > span:nth-child(2) {
              color: #5084e2;
              font-size: 12/20rem;
              font-family: Arial !important;
              display: block;
              width: 100%;
              height: 40%;
              line-height: 0.9rem;
              color:#999999;
              background: linear-gradient(#eef1f5, #fff);
              background: -webkit-linear-gradient(#eef1f5, #fff);
            }
            > span:nth-child(1) {
              text-align: center;
              font-size: 0.7rem;
              width: .9rem;
              height: .9rem;
              border: 1px solid #105ff5;
              display: inline-block;
              border-radius: 50%;
              line-height: .9rem;
              background: #105ff5;
              color: #fff;
              position: relative;
              margin-bottom:.2rem;
            }
          }

          .active {
            border: 1/20rem solid #156bda;
            span:nth-of-type(2) {
              background: #3261d8;
              color: #fff;
            }
          }
        }
        li:nth-child(17),
        li:nth-child(18),
        li:nth-child(19),
        li:nth-child(20) {
          > button {
            margin-bottom: 8/45rem;
          }
        }
      }
    }
  }
}
.cqList6 {
  background: #dde5ec;
  height: 18rem;
  ul {
    > li {
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
      > ul {
        text-align: center;
        background: #dde5ec;
        li {
          display: inline-block;
          margin: 0 /20rem;
          width: 20%;
          button {
            position: relative;
            outline: 0;
            text-align: center;
            width: 2.8rem;
            height: 2.277778rem;
            border: 1px solid #e5e5e5;
            margin: 8/45rem auto;
            background: #fff;
            line-height: 40/45rem;
            border-radius: 3/20rem;
            padding: 0;
            > span:nth-child(2) {
              color: #5084e2;
              font-size: 12/20rem;
              font-family: Arial !important;
              display: block;
              width: 100%;
              height: 40%;
              line-height: 0.9rem;
              margin-bottom:-.2rem;
              color:#999999;
              background: linear-gradient(#eef1f5, #fff);
              background: -webkit-linear-gradient(#eef1f5, #fff);
            }
            > span:nth-child(1) {
              text-align: center;
              font-size: 0.7rem;
              width: .9rem;
              height: .9rem;
              border: 1px solid #105ff5;
              display: inline-block;
              border-radius: 50%;
              line-height: .9rem;
              background: #105ff5;
              color: #fff;
              position: relative;
              margin-bottom:.2rem;
            }
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
}
h3 {
  margin: 0;
  width: 100%;

  height: 68/45rem;
  line-height: 68/45rem;
  font-weight: normal;
  box-shadow: inset 1px 2px 1px #fff;
  text-align: center;
  background: #7a7a7a;
  color: #fff;
  /*margin-left: -4px;*/
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
  display: -webkit-flex;
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
  position: fixed;
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
    background-color: #177bdd;
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
  width: 100%; // position: fixed;
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
  margin-bottom: 39/20rem;
  margin-top: 160/20rem;
  height: 368/20rem;
  overflow-y: auto;
  background: #dde5ec;
  > ul {
    display: flex;
    flex-wrap: wrap;
    > li {
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #dde5ec;
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
      > ul {
        button {
          outline: 0;
          border: 1/20rem solid #eaeaea;
          width: 2.85rem;
          height: 41/20rem;
          padding: 0;
          align-items: center;
          margin-top: 4/20rem;
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
            background: linear-gradient(#eef1f5, #fff);
            background: -webkit-linear-gradient(#eef1f5, #fff);
          }
          > span:nth-of-type(1) {
            line-height: 1.5;
            height: 60%;
            display: block;
            font-size: 32/40rem;
            // margin-top:10/20rem;
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
.kuan1{
  background: url("@{public_img}/images/moneybao.png") no-repeat !important;
   background-size: 100% 100%!important;
}
.bet_bar {
  width: 100%;
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
      width: 50/46.875rem;
      height: 45/46.875rem;
      line-height: 1.15rem;
      margin-right: 0.2rem;
      display: inline-block;
      // background: url("@{public_img}/images/moneybao.png") no-repeat;
      background: url("@{public_img}/images/many_bao.png") no-repeat;
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
.lottery_nav_bar {
  position: fixed;
  width: 320/20rem;
  top: 128/20rem;
  z-index: 1;
  ul {
    display: flex;
    height: 30/20rem;
    color: white;
    button {
      width: 84/20rem;
      position: relative;
      text-align: center;
      padding: 0;
      z-index: 0;
      background: #1366dc;
      border: 0;
      outline: 0;
      color: white;
      // border-radius: 5/20rem;
    }
    .active {
      background: #1f97f6;
    }
  }
}
.nav_o {
  height: 30/20rem;
  width: 320/20rem;
  position: relative;
  z-index: 1;
  .nav_o_1 {
    position: absolute;
    top: 0;
    > li {
      // border-radius: 10/45rem;
    }
  }
  .nav_o_2 {
    position: absolute;
    top: 33/20rem;
    margin-top: -4/20rem;
    > li {
      border-radius: 0;
      background: #4c4c4c;
      opacity: 0.9;
    }
  }
  .nav_o_3 {
    position: absolute;
    top: 66/20rem;
    margin-top: -7/20rem;
    > li {
      background: #4c4c4c;
      opacity: 0.9;
      border-radius: 0;
    }
  }
}
.isShowNav {
  display: none !important;
}
.nav_o ul {
  // background: rgba(0,0,0,0.5);
  display: flex;
  flex-flow: row wrap;
  li {
    width: 180/45rem;
    color: #fff;
    text-align: center;
    line-height: 66/45rem;
    height: 66/45rem;
    display: block;
    // border-left: 1px solid rgba(255,255,255,0.5);
    // border-bottom: 1px solid rgba(255,255,255,0.5);
  }
  .active {
    background: #1f97f6;
  }
  li:nth-child(4) {
    position: relative;
    text-align: left;
    text-indent: 28/45rem;
  }
  li:nth-child(4) span {
    width: 0;
    height: 0;
    border-left: 15/45rem solid transparent;
    border-right: 15/45rem solid transparent;
    border-bottom: 30/45rem solid transparent;
    border-top: 15/45rem solid #fff;
    position: absolute;
    right: 3/45rem;
    top: 25/45rem;
  }
  li:nth-child(10),
  li:nth-child(11),
  li:nth-child(12),
  li:nth-child(13),
  li:nth-child(5),
  li:nth-child(6),
  li:nth-child(7),
  li:nth-child(8),
  li:nth-child(9) {
    background: #4c4c4c;
    opacity: 0.9;
  }
}
.lottery_nav_bar {
  position: fixed;
  width: 320/20rem;
  top: 128/20rem;
  z-index: 1;
  ul {
    display: flex;
    height: 30/20rem;
    background: blue;
    color: white;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 84/20rem;
      position: relative;
      z-index: 0;
      background: #1366dc;
      > span {
        transform: skew(30deg);
      }
    }
    .active {
      background: #1f97f6;
    }
    .active:before {
      background: #1f97f6 !important;
    }
    > li:nth-of-type(1):before {
      content: "";
      background: url("@{public_img}/images/blue11.png") no-repeat;
      background-size: 0.55rem 0.55rem;
      position: absolute;
      left: -1px;
      top: -1px;
      width: 0.55rem;
      height: 0.55rem;
    }
    > li:nth-last-of-type(1):before {
      content: "";
      background: url("@{public_img}/images/blue11.png") no-repeat;
      background-size: 0.55rem 0.55rem;
      position: absolute;
      left: -1px;
      top: -1px;
      width: 0.55rem;
      height: 0.55rem;
    }
    .trapezoid {
      transform: skew(-30deg);
      background: #1366dc;
      box-shadow: 9px 0 6px #0f52a6;
      position: relative;
      margin-right: 3px;
    }
  }
}
.iconfont_reset {
  width: 1rem;
  height: 1rem;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.3rem;
  margin-top: -2px;
  background: url("@{public_img}/images/resx.png") no-repeat;
  background-size: 100% 100%;
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
      background: white !important;
      width: 25%;
      > ul {
        > li {
          > button {
            width: 65/20rem;
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
      width: 25%;
      button {
        width: 65/20rem !important;
      }
    }
  }
}
.lhc_nav_bar {
  width: 320/20rem;
  position: fixed;
  overflow-x: scroll;
  z-index: 5;
  background: #fff;
  top: 6.4rem;
  > ul {
    display: flex;
    > li {
      margin-left: 3/20rem;
      > button {
        background: #1366dc;
        border-radius: 3/20rem;
        border: 0;
        color: white;
        width: 80/20rem;
        height: 30/20rem;
      }
      .active {
        background: #009eff;
      }
    }
  }
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
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  text-align: center;
  color: white !important;
  padding-top: 40%;
  @keyframes line-spin-fade-loader {
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }
  .line-spin-fade-loader {
    text-align: center;
    position: relative;
    width: 100/20rem;
    height: 100/20rem;
    transform: translateX(50px) translateY(50px);
    margin-left: auto;
    margin-right: auto;
  }
  .line-spin-fade-loader > div:nth-child(1) {
    top: 20/20rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(2) {
    top: 13.63636/20rem;
    left: 13.63636/20rem;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(3) {
    top: 0;
    left: 20/20rem;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(4) {
    top: -13.63636/20rem;
    left: 13.63636/20rem;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(5) {
    top: -20/20rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(6) {
    top: -13.63636/20rem;
    left: -13.63636/20rem;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(7) {
    top: 0;
    left: -20/20rem;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(8) {
    top: 13.63636/20rem;
    left: -13.63636/20rem;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
  }
  .line-spin-fade-loader > div {
    background-color: #fff;
    border-radius: 2px;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    width: 5/20rem;
    height: 15/20rem;
  }
}
</style>
