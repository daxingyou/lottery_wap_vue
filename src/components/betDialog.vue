<template>
  <div class="mask-layer">
    <div v-show="!panelShow">
      <div class="confirm-header">
        投注明细
      </div>
      <div>
        <ul>
          <li class="bet-type">
            {{betType}}
          </li>
          <li class="bet-number">
            {{betNumber}}
          </li>
          <li class="summary">
            <div>
              <span>组数</span>
              <span>{{totalGroup}}</span>
            </div>
            <div>
              <span>总计</span>
              <span>{{totalMoney}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="confirm-footer">
        <div @click="confirm">确认</div>
        <div @click="cancel">取消</div>
      </div>
    </div>
    <promptbox v-show="panelShow" @panelShow="panelShow=false" :successshow="successshow" :panelShow="panelShow" :promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>

<script>
import _ from 'lodash'
import promptbox from '../components/promptbox'
export default {
  data() {
    return {
      betType: '',
      betNumber: '',
      totalGroup: 0,
      totalMoney: 0,
      betList: [],
      promptboxtext: '',
      panelShow: false,
      successshow: false,
      erreocode:''
    }
  },
  props: ['betData'],
  components: {
    promptbox
  },
  created() {
    this.betList = this.betData.betList
    this.betType = this.betList[0].title
    if (
      this.betList[0].title.search('任选') != -1 ||
      this.betList[0].title.search('组选') != -1
    ) {
      this.betNumber = _.map(this.betList, 'name').join(',')
      this.totalGroup = 1
      this.totalMoney = this.betData.money
    }

    if (
      this.betList[0].title.search('直选') != -1
    ) {
      let groupedBet = _.groupBy(this.betList,'type');
      let numberArray = []
      let totalGroup = 1;
      Object.keys(groupedBet).forEach(item=>{
        totalGroup*=groupedBet[item].length;
        numberArray.push(_.map(groupedBet[item],'name'))
      })
      this.totalGroup = totalGroup
      this.totalMoney = this.totalGroup*this.betData.money
      this.betNumber = numberArray.join('|')
    }
    // console.log(this.betList)
  },
  methods: {
    bet() {
      /* 下注请求 */
      let { game_code, type_code, round } = this.betData
      let params = { game_code, type_code, round }
      _.map(this.betList, 'key').forEach(item => {
        params[item] = this.betData.money
      })

      this.$http.post(`${getUrl()}/inup`, JSON.stringify(params)).then(res => {
        if (res.data.length) {
          this.promptboxtext = '恭喜下注成功'
          this.panelShow = true
          this.successshow = true
          setTimeout(()=>{
            this.panelShow = false
            this.$store.commit('toggleConfirm', false)
            this.$emit('listenToChildEvent', true)
          },1200)
          /* this.$emit('listenToChildEvent', true)
          setTimeout(() => {
            this.$store.commit('toggleConfirm', false)
          }, 1200) */
          // this.$store.commit('toggleConfirm', false)
        }else{
          this.$emit('listenToChildEvent', false)
        }
      })
    },
    confirm() {
      /* 确认下注 */
      this.bet()
    },
    cancel() {
      /* 取消下注 */
      this.$emit('listenToChildEvent',false)
      this.$store.commit('toggleConfirm', false)
    },
    calcTotalGroup() {
      /* 计算总的注数 */
    },
    calcTotalMoney() {
      /* 计算总的金额 */
    }
  }
}
</script>


<style scoped>
.confirm-title {
  line-height: 1.6rem;
  font-size: 0.75555556rem;
  font-weight: bold;
  border-bottom: 0.05rem solid #f1f1f1;
}

.bet-type {
  border-bottom: 0.05rem solid #f1f1f1;
  height: 1.55rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.bet-number {
  padding: 0.2rem;
  color: black;
  font-size: 0.8rem;
  word-wrap: break-word;
}

.summary {
  border-top: 2px solid #f1f1f1;
  height: 1.68888889rem;
  line-height: 1.68888889rem;
  display: flex;
  justify-content: space-around;
}

.summmary > div {
  width: 50%;
  word-spacing: 0.15555556rem;
}

.confirm-footer {
  height: 1.55555556rem;
  background: #146cdc;
  display: flex;
  border-radius: 0 0 0.22222222rem 0.44444444rem;
}

.confirm-footer > div {
  line-height: 1.55555556rem;
  color: #fff;
  width: 5.88888889rem;
  box-sizing: border-box;
  font-size: 0.8rem;
}

.confirm-footer > div:first-child {
  border-right: 2px solid #fff;
}
.mask-layer {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mask-layer > div {
  font-family: '\9ED1\4F53';
  width: 11.77777778rem;
  border-radius: 0.44444444rem;
  background: #fff;
  text-align: center;
  font-size: 0.71111111rem;
}
</style>

