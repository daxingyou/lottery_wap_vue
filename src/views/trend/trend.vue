<template>
<div>
  <div class="bj" @click='hideTitle'>
  <div class="hed color1" style="position: relative;">
    <i class="icon iconfont icon-zuo" @click="gobackLast"></i>
  	<div  style="display: inline-block;" @click.stop="showTitle"><span>{{menu_title}}</span><i class="xiaoxia " style="float: right;margin-left: 0.2rem;"></i></div>
  	<div @click='datashow' v-show = "urlId!=69||urlId!=270" style="position: absolute;right:0.5rem;top:0rem;width: 1rem;height: 1rem;"><img :src="$getPublicImg('/images/data.png')" alt="" style="width: 100%;height: 100%;"/></div>
  </div>
   <div class="header-is-active" v-if="show_title">
    <div class="header-modal-content">
      <ul>
        <li v-for="(value,key,index) in urlUrl"  @click="changUrl(value,key)" v-show="key != menu_title">{{key}}
            <span class="line"></span>
        </li>
      </ul>

      <i class="up"></i>
    </div>
  </div>
  <div class="biao" v-show="isReady">
  	<div class="titleheader">
  		<span>开奖期数</span>
  		<span :style="{marginLeft:mleft}">开奖号码</span>
  		<span v-if = "urlId==160" style="margin-left:2rem;">和值</span>
  		<span v-if = "urlId==69||urlId==270" style="margin-left: 5.8rem;">特码</span>
  		<span v-if="datatrueq" style="float: right;margin-right: 0.2rem;display: inline-block;height: 1rem;">{{nowday}}</span>
  	</div>
  	<div class="kjh" v-for='(item,index) in lotteryList' :class="`game_${urlId}`">
  			<div class="lottery-rs-wp">
  				<div class="issue-wp">
							<div>{{item.round}}期</div>
							<div>{{timetrans(item.endtime)}}</div>
						</div>
					<div class="balls-wp">	
  				<span class='feiche' v-for='i in isNuber(item.number)' v-if = "urlId==51||urlId==171||urlId==210||urlId==240||urlId==260"  :class="`cl_${i} `">{{i}}</span>
  				<span  v-for='i in isNuber(item.number)' v-if = "urlId==2||urlId==46||urlId==250" class="color88 cqsscdd cqsscy">{{i}}</span>
  				<span  v-for='i in isNuber(item.number)' v-if = "urlId==3" :class="`clg1_${i}`" class="cqsscdd">{{i}}</span>
  				<span  v-for='i in isNuber(item.number)' v-if = "urlId==47" :class="`clg_${i}`" class="cqsscdd" style="line-height: 1.5rem!important;">{{i}}</span>
  				<span  v-for='i in isNuber(item.number)' v-if = "urlId==69||urlId==270" :class="`bgxg_${i}`"  class="cqsscdd">{{i}}</span>
  				<span  v-for='i in isNuber(item.number)' v-if = "urlId==160"   class="cqsscdd">{{i}}</span>
  				<span :class="`color_${isSum(item)} color88 cqsscdd`" v-if = "urlId==160">{{isSum(item)}} </span>
  				<span  v-for='i in isNuber(item.number)' v-if = "urlId==172||urlId==280" :class="`color_${i}`"  class="cqsscdd">{{1}}</span>
					<span  v-for='i in isNuber(item.number)' v-if = "urlId==180" :class="i <= 40 ? 'icon-gray-f-ball' : 'icon-blue-f-ball'"  class="ball-item" >{{i}}</span>
					</div>
  			</div>
  			 <div class="sxh bjpksxh" v-if = "urlId==51||urlId==171||urlId==210||urlId==240||urlId==260" >
		         <ul>
		          <li style="background-color: #eaeaea;">冠亚和</li>
		        	<li>{{bjSum(item)}}</li>
		        	<li>{{bjSum(item)>11?'大':'小'}}</li>
		          <li>{{bjSum(item)%2=='0'?'双':'单'}}</li>
		          <li style="background-color: #eaeaea;">1-5球</li>
		          <li>{{parseInt(isNuber(item.number)[0])>parseInt(isNuber(item.number)[9])?'龙':'虎'}}</li>
			        <li>{{parseInt(isNuber(item.number)[1])>parseInt(isNuber(item.number)[8])?'龙':'虎'}}</li>
			        <li>{{parseInt(isNuber(item.number)[2])>parseInt(isNuber(item.number)[7])?'龙':'虎'}}</li>
			        <li>{{parseInt(isNuber(item.number)[3])>parseInt(isNuber(item.number)[6])?'龙':'虎'}}</li>
			        <li>{{parseInt(isNuber(item.number)[4])>parseInt(isNuber(item.number)[5])?'龙':'虎'}}</li>
		        </ul>
		      </div>
		     <!--重庆时时彩-->
		      <div class="sxh cqsscsxh" v-if = "urlId==2||urlId==46||urlId==250">
		        <ul>
		          <li style="background-color: #eaeaea;">总和</li>
		          <li>{{isSum(item)}}</li>
		          <li>{{isSum(item)%2=='0'?'双':'单'}}</li>
		          <li>{{isSum(item)>=23?'大':'小'}}</li>
		          <li style="background-color: #eaeaea;">龙虎</li>
		          <li>{{ssche(isNuber(item.number)[0],isNuber(item.number)[4])}}</li>
		        </ul>
		      </div>
		       <!--广东快乐十分-->
		      <div class="sxh gdklsfsxh cqxynsxh " v-if = "urlId==3||urlId==47">
		        <ul>
		          <li style="background-color: #eaeaea;">总和</li>
		          <li>{{isSum(item)}}</li>
		          <li>{{isSum(item)>=85?'大':'小'}}</li>
		        	<li>{{isSum(item)%2=='0'?'双':'单'}}</li>
		          <li style="background-color: #eaeaea;width: 15%;">尾大小</li>
		          <li>{{isSum(item).toString().substr(isSum(item).toString().length-1) >= 5?'尾大':'尾小'}}</li>
		          <li style="background-color: #eaeaea;">1-4球</li>
		          <li>{{isNuber(item.number)[0]>isNuber(item.number)[7]?'龙':'虎'}}</li>
			        <li>{{isNuber(item.number)[1]>isNuber(item.number)[6]?'龙':'虎'}}</li>
			        <li>{{isNuber(item.number)[2]>isNuber(item.number)[5]?'龙':'虎'}}</li>
			        <li>{{isNuber(item.number)[3]>isNuber(item.number)[4]?'龙':'虎'}}</li>
		        </ul>
		      </div>
		       <!--香港彩-->
			      <div class="sxh xgcsxh" v-if = "urlId==69||urlId==270">
			        <ul>
			          <li style="background-color: #eaeaea;">总分</li>
			          <li>{{isSum(item)}}</li>
			          <li style="background-color: #eaeaea;">生肖</li>
			          <li>{{xgcsx(isNuber(item.number)[0],item.round)}}</li>
			          <li>{{xgcsx(isNuber(item.number)[1],item.round)}}</li>
			          <li>{{xgcsx(isNuber(item.number)[2],item.round)}}</li>
			          <li>{{xgcsx(isNuber(item.number)[3],item.round)}}</li>
			          <li>{{xgcsx(isNuber(item.number)[4],item.round)}}</li>
			          <li>{{xgcsx(isNuber(item.number)[5],item.round)}}</li>
			          <li style='background: #2753b2;color: white;'>{{xgcsx(isNuber(item.number)[6],item.round)}}</li>
			        </ul>
			      </div>

			      <!--PC蛋蛋-->
			      <div class="sxh pcddsxh" v-if = "urlId==160">
			        <ul>
			          <li style="background-color: #eaeaea;">总和</li>
			          <li>{{isSum(item)}}</li>
			          <li>{{isSum(item)>=14?'大':'小'}}</li>
			          <li>{{isSum(item)%2=='0'?'双':'单'}}</li>

			        </ul>
			      </div>
			       <!--江苏骰宝（快3）-->
		      <div class="sxh jskssxh" v-if = "urlId==172 || urlId==280"  >
		        <ul>
		          <li style="background-color: #eaeaea;">总和</li>
		          <li>{{isSum(item)}}</li>
		          <li>{{jskssx(isNuber(item.number)[0],isNuber(item.number)[1],isNuber(item.number)[2])}}</li>
		          <li>{{isSum(item)%2=='0'?'双':'单'}}</li>
		          <li style="background-color: #eaeaea;width: 15%;">鱼虾蟹</li>
		          <li>{{kssx(isNuber(item.number)[0])}}</li>
			        <li>{{kssx(isNuber(item.number)[1])}}</li>
			        <li>{{kssx(isNuber(item.number)[2])}}</li>
		        </ul>
		      </div>
		       <p style="height: 1px;background:#CCCCCC;width: 96%;margin: 0 auto;margin-top: 0.3rem;"></p>
		  </div>
  </div>
</div>
<div v-show='isday' class='mask1' @click="datahide"></div>
<div v-show='isday' class='dayshow'>
	<div class="dayheader color1">{{daydata}}</div>
	<div class="dayfoot">
		<div>
			<span @click="lastdata"></span>
			<span>{{yearyue}}</span>
			<span @click='nextdata'></span>
		</div>
		<div>
			<ul>
				<li style="margin-left: 1.2rem;">日</li>
				<li>一</li>
				<li>二</li>
				<li>三</li>
				<li>四</li>
				<li>五</li>
				<li>六</li>
			</ul>
			<ul>
				<li v-for='(item,index) in daycount' ref='tenli' class='lis' @click='postjl(index)'>{{item}}</li>
			</ul>
		</div>
		<div>
			<a @click="datahide">取消</a>
			<a @click='senddate'>确定</a>
		</div>
	</div>
</div>
 <!--底部选择页-->
 <div v-show='pageshow' class='mask1' @click="pageshow=false" style="z-index: 10;top: 0;"></div>
    <div id="page">
    	<div  v-show='pageshow'>
    		<ul>
    			<li ref='pagecolor'  v-for='(item,index) in pagenmblength' @click="pagenumb(index+1)">第{{index+1}}页
    				<img  v-show="index+1==pagenum"  :src="$getPublicImg('/images/goulszd.png')"/></li>
    		</ul>
    	</div>
    	<div v-show='pagenmb' :style="{'box-shadow':boxshadow}">
    		<a @click='lastpage' ref='lastcolor'>上一页</a>
    		<a @click='pasgedayshow'>第{{pagenum}}页<i></i></a>
    		<a @click='nextpage'>下一页</a>
    	</div>
    </div>
		</div>
		</template>

<script>
//import {
//  getUrl
//} from '../../api'
import lotteryHeader from '../../components/header/lotteryHeader'
export default {
  data() {
    return {
	  is_gd_ali: is_gd_ali(),
	  pageshow:false,
	  pagenmb:true,
	  pageNumber:'30',
	  pagenum:'1',
	  pagenmblength:'1',
	  boxshadow: '0 0.06rem 0.8rem rgba(0, 0, 0, 0.2)',
	  jsksdx:'',
	  nowday:'',
	  titleleft:'2.5rem',
	  isday:false,
	  daydata:'',
	  yearyue:'',
	  daycount:'',
	  daytian:'',
	  isHao:false,
	  title1:'',
	  tenlis:'',
	  dayyue:'',
	  daynian:'',
	  dayyue1:'',
	  show_title: false,		// 显示下拉菜单
	  menu_title: '', // 标题
	  dateyes:'',
	  yesyue:'',
	  dayday:'',
	  datatrueq:false,
	  l:null,
      isShowColor:false,
      isShowColorG:false,
      isReady: true,
      es:"123",
      urlUrl: {
        '极速六合彩':270,
        '88赛马':260,
        '极速赛车':240,
        '极速时时彩':250,
        '威尼斯赛艇':210,
        '罗马时时彩':46,
        '北京赛车': 51,
        '重庆时时彩':2,
        '香港六合彩':69,
        '幸运飞艇':171,
        'PC蛋蛋':160,
        '广东快乐十分':3,
        '重庆幸运农场':47,
				'江苏骰宝(快3)':172,
				'吉林快3':280,
				'北京快乐8':180
      },
      mleft:'',
      lotteryList: [],
      number: 10,
      page: 1,
      urlId: null,
      selectedId:"",
    }
  },
  components:{
  	lotteryHeader
  },
  props: {
  	game_code:{
      type: Number
    },
    title: {
			type:String,
			default: ''
  	},
  },
  methods:{
  	pasgedayshow(){
    		this.pageshow=!this.pageshow
    		if(this.pageshow){
    			this.boxshadow=''
    		}else{
    			this.boxshadow='0 0.06rem 0.8rem rgba(0, 0, 0, 0.2)'
    		}
    	},
    	//取某一页的注单
   	pagenumb(index){
			if(this.dateyes==''){
    		 this.dateyes = this.nowday;
    	}
			let dayyue1=this.dayyue;
			let dayday1=this.dayday;
    	if(this.dayyue.length==1){
					dayyue1 = '0'+this.dayyue
			}
    	if(this.dayday.length==1){
					dayday1 = '0'+this.dayday
			}
			this.dateyes =  String(this.daynian)+"-"+String(dayyue1)+"-"+String(dayday1);
     		for(var i=0;i<this.pagenmblength;i++){
      		this.$refs.pagecolor[i].style='color:black;'
      	}
     		this.pagenum =index
     		this.$refs.pagecolor[index-1].style='color:#196fde;'
      		let params = {};
		     params.game_code = this.urlId;
		     params.page = this.pagenum;
		     params.number=this.pageNumber;
		     params.date = this.dateyes;
		     this.$refs.pagecolor[this.pagenum-1].style='color:#196fde;'
		     this.$http.post(`${getUrl()}/user/getResult`, JSON.stringify(params)).then(res => {
		       this.lotteryList = res.data.result;
		       this.isReady = true;
		     })
      },
    	//上一页
      lastpage(){
      	if(this.dateyes==''){
    		 this.dateyes = this.nowday;
	    	}
				let dayyue1=this.dayyue;
				let dayday1=this.dayday;
	    	if(this.dayyue.length==1){
						dayyue1 = '0'+this.dayyue
				}
	    	if(this.dayday.length==1){
						dayday1 = '0'+this.dayday
				}
				this.dateyes =  String(this.daynian)+"-"+String(dayyue1)+"-"+String(dayday1);
      	for(var i=0;i<this.pagenmblength;i++){
      		this.$refs.pagecolor[i].style='color:black;'
      	}
      	this.pagenum--;
  			if(this.pagenum<1){
		  		this.pagenum=1
      	}
  			let params = {};
		     params.game_code = this.urlId;
		     params.page = this.pagenum;
		     params.number=this.pageNumber;
		     params.date = this.dateyes;
		     this.$refs.pagecolor[this.pagenum-1].style='color:#196fde;'
		     this.$http.post(`${getUrl()}/user/getResult`, JSON.stringify(params)).then(res => {
		       this.lotteryList = res.data.result;
		       this.isReady = true;
		     })
      },
			 nextpage(){
			 	if(this.dateyes==''){
    		 this.dateyes = this.nowday;
	    	}
				let dayyue1=this.dayyue;
				let dayday1=this.dayday;
	    	if(this.dayyue.length==1){
						dayyue1 = '0'+this.dayyue
				}
	    	if(this.dayday.length==1){
						dayday1 = '0'+this.dayday
				}
				this.dateyes =  String(this.daynian)+"-"+String(dayyue1)+"-"+String(dayday1);
			 	for(var i=0;i<this.pagenmblength;i++){
      		this.$refs.pagecolor[i].style='color:black;'
      	}
      	this.pagenum++;
	      if(this.pagenum>this.pagenmblength){
	      		this.pagenum=this.pagenmblength
	      	}
      	 let params = {};
		     params.game_code = this.urlId;
		     params.page = this.pagenum;
		     params.number=this.pageNumber;
		     params.date = this.dateyes;
		     this.$refs.pagecolor[this.pagenum-1].style='color:#196fde;'
		     this.$http.post(`${getUrl()}/user/getResult`, JSON.stringify(params)).then(res => {
		       this.lotteryList = res.data.result;
		       this.isReady = true;
		     })
      },
  	kssx(item){
  		if(item=='1'){
  				return '鱼'
  		}else if(item=='2'){
  				return '虾'
  		}else if(item=='3'){
  				return '葫芦'
  		}else if(item=='4'){
  				return '金钱'
  		}else if(item=='5'){
  				return '蟹'
  		}else if(item=='6'){
  				return '鸡'
  		}
  	},
  	xgcsx(sx, round=''){

      if ((this.urlId == 69 && round < 2018017) || (this.urlId == 270 && round < 20180221000)) {
        if(sx=='10'||sx=='22'||sx=='34'||sx=='46'){
    			return '鼠'
    		}else if(sx=='8'||sx=='20'||sx=='32'||sx=='44'){
    			return '虎'
    		}else if(sx=='6'||sx=='18'||sx=='30'||sx=='42'){
    			return '龙'
    		}else if(sx=='4'||sx=='16'||sx=='28'||sx=='40'){
    			return '馬'
    		}else if(sx=='2'||sx=='14'||sx=='26'||sx=='38'){
    			return '猴'
    		}else if(sx=='12'||sx=='24'||sx=='36'||sx=='48'){
    			return '狗'
    		}else if(sx=='9'||sx=='21'||sx=='33'||sx=='45'){
    			return '牛'
    		}else if(sx=='7'||sx=='19'||sx=='31'||sx=='43'){
    			return '兔'
    		}else if(sx=='5'||sx=='17'||sx=='29'||sx=='41'){
    			return '蛇'
    		}else if(sx=='3'||sx=='15'||sx=='27'||sx=='39'){
    			return '羊'
    		}else if(sx=='11'||sx=='23'||sx=='35'||sx=='47'){
    			return '猪'
    		}else if(sx=='1'||sx=='13'||sx=='27'||sx=='36'||sx=='49'){
    			return '鸡'
    		}
      }else {
        let list_sx = this.sx_list;
        for (var i = 0; i < list_sx.length; i++) {
          for (var x = 0; x < list_sx[i].numbers.length; x++) {
            if (sx == list_sx[i].numbers[x]){
              return list_sx[i].animal;
            }
          }
        }
      }
  	},
     isSum(item){
        let len=item.number.split(',');
        let value=0;
        for(let i=0;i<len.length;i++){
          value+=Number(len[i])
        }
        return value
    },
    ssche(one,two){
    	if(one>two){
    		return '龙'
    	}else if(one<two){
    		return '虎'
    	}else if(one==two){
    		return '和'
    	}
    },
    bjSum(item){
        let len=item.number.split(',');
        let value=0;
        for(let i=0;i<2;i++){
          value+=Number(len[i])
        }
        return value
    },
    isxg(item){
      let arr_t=item.number.split(',')
      let arr_xg=arr_t
      let last_te= arr_t.pop()
      return arr_xg;
      return last_te;
    },
    te(item){
      let arr_t=item.number.split(',')
      let last_te= arr_t.pop()
      return last_te;
    },
    postjl(index){
    	for(var i =0;i<this.l;i++){
    		if(this.daytian-index>7||this.daytian-index<=0){
    		}else{
					if(this.daytian-this.l+i==index){
						let weekday = null;
						this.dayday=this.daytian-this.l+i+1;
						if(this.dayday%7=='0'){
							weekday = '周日'
						}else if(this.dayday%7=='1'){
							weekday = '周一'
						}else if(this.dayday%7=='2'){
							weekday = '周二'
						}else if(this.dayday%7=='3'){
							weekday = '周三'
						}else if(this.dayday%7=='4'){
							weekday = '周四'
						}else if(this.dayday%7=='5'){
							weekday = '周五'
						}else if(this.dayday%7=='6'){
							weekday = '周六'
						}
						this.daydata = this.dayyue+'月'+this.dayday+'日'+weekday;
				   	this.$refs.tenli[index].style.backgroundColor='#2e65d4';
				   	this.$refs.tenli[index].style.color='#fff';
					}else{
  					this.$refs.tenli[this.daytian-this.l+i].style.backgroundColor='';
			   		this.$refs.tenli[this.daytian-this.l+i].style.color='#373737';
				}
			}
			}
    },
    senddate(){
    	if(this.dateyes==''){
    		 this.dateyes = this.nowday;
    	}
    	if(this.dayyue<10){
					this.dayyue = '0'+this.dayyue
			}
    	if(this.dayday<10){
					this.dayday = '0'+this.dayday
			}
			this.dateyes =  String(this.daynian)+"-"+String(this.dayyue)+"-"+String(this.dayday);
    	let params = {};
		     params.game_code = this.urlId;
		     params.page = this.page;
				 params.date = this.dateyes;
				 params.number=this.pageNumber;
				 this.nowday= this.dateyes;
		     this.$http.post(`${getUrl()}/user/getResult`, JSON.stringify(params)).then(res => {
		     	this.isday = false;
		       this.lotteryList = res.data.result;
		       if(Number(res.data.allnumb)>Number(this.pageNumber)){
		      	this.pagenmb = true
		      	this.pagenmblength = Math.ceil(res.data.allnumb/this.pageNumber)
		      }
		       this.isday = false;
		       this.isReady = true;
		       this.datatrueq = true;
		     })
    },
   	datashow(){
   		this.isday =! this.isday
   		this.daymargin(this.getWeek(this.daynian,this.dayyue))
				for(var i =0;i<this.l;i++){
					this.$refs.tenli[this.daytian-this.l+i].style ="color:black"
					if(i==this.l-1){
						this.$refs.tenli[this.daytian-this.l+i].style.backgroundColor='#2e65d4';
				   	this.$refs.tenli[this.daytian-this.l+i].style.color='#fff';
					}
				}
				this.dayyue = String((new Date().getMonth()+1))
  		 this.yearyue = this.daynian+'年'+this.dayyue+'月';
   },
   datahide(){
   	this.isday =false
   	this.dayyue = String((new Date().getMonth()+1))
   },
   nextdata(){
	   this.dayyue++
	   this.yearyue = this.daynian+'年'+this.dayyue+'月';
   		if(this.dayyue==this.dayyue1){
	   				this.yearyue = this.daynian+'年'+this.dayyue+'月';
	   		for(var i =0;i<this.l;i++){
					this.$refs.tenli[this.daytian-this.l+i].style ="color:black"
					if(i==this.l-1){
						this.$refs.tenli[this.daytian-this.l+i].style.backgroundColor='#2e65d4';
				   	this.$refs.tenli[this.daytian-this.l+i].style.color='#fff';
					}
				}
	   		let today = new Date();//获得当前日期
		   let year = today.getFullYear();
		   let month = this.dayyue;
		   this.daycount = new Date(year,month,0).getDate()
		   this.daymargin(this.getWeek(year,this.dayyue))
		   for(var i=0;i<this.yesyue;i++){
	   			this.$refs.tenli[parseInt(this.daycount-1-i)].style ="color:#373737"
	   		}
	   }else{
	   	this.$refs.tenli.map(value=>{
	   				value.style="color:#cccccc"
	   		})
	   		if(this.dayyue>12){
	   		this.dayyue =1
	   	}
	   	if(this.dayyue<=9){
	   		this.yearyue = this.daynian+'年'+String(parseInt(this.dayyue))+'月';
	   	}else{
	   		 this.yearyue = this.daynian+'年'+String(parseInt(this.dayyue))+'月';
	   	}
	   	 if(this.dayyue==this.dayyue1){
	   				this.yearyue = this.daynian+'年'+this.dayyue+'月';
	   		for(var i =0;i<this.l;i++){
					this.$refs.tenli[this.daytian-this.l+i].style ="color:black"
					if(i==this.l-1){
						this.$refs.tenli[this.daytian-this.l+i].style.backgroundColor='#2e65d4';
				   	this.$refs.tenli[this.daytian-this.l+i].style.color='#fff';
					}
				}
	   }
	   	 let today = new Date();//获得当前日期
		   let year = today.getFullYear();
		   let month = this.dayyue;
		   this.daycount = new Date(year,month,0).getDate()
		   this.daymargin(this.getWeek(year,this.dayyue))
	   }
   },
   daymargin(today){
   	if(today=='1'){
   		this.$refs.tenli[0].style.marginLeft ='2.05rem'
   	}else if(today=='2'){
   		this.$refs.tenli[0].style.marginLeft ='3.55rem'
   	}else if(today=='3'){
   		this.$refs.tenli[0].style.marginLeft ='5.05rem'
   	}else if(today=='4'){
   		this.$refs.tenli[0].style.marginLeft ='6.55rem'
   	}else if(today=='5'){
   		this.$refs.tenli[0].style.marginLeft ='8.05rem'
   	}else if(today=='6'){
   		this.$refs.tenli[0].style.marginLeft ='9.5rem'
   	}else if(today=='7'){
   	}
   },
    getWeek(year,month){
   		let d = new Date();
		    d.setYear(year);
		    d.setMonth(month-1);
		    d.setDate(1);
		    //获得周几
		    var weeks = ['7','1','2','3','4','5','6'];
		    return weeks[d.getDay()];
   },
   lastdata(){
// 	console.log(this.dayyue,parseInt(this.dayyue1))
   			this.dayyue--

   			this.yearyue = this.daynian+'年'+this.dayyue+'月';
   		if(this.dayyue==this.dayyue1){
	   				this.yearyue = this.daynian+'年'+this.dayyue+'月';
	   		for(var i =0;i<this.l;i++){
					this.$refs.tenli[this.daytian-this.l+i].style ="color:black"
					if(i==this.l-1){
						this.$refs.tenli[this.daytian-this.l+i].style.backgroundColor='#2e65d4';
				   	this.$refs.tenli[this.daytian-this.l+i].style.color='#fff';
					}
				}
	   		 let today = new Date();//获得当前日期
		   let year = today.getFullYear();
		   let month = this.dayyue;
		   this.daycount = new Date(year,month,0).getDate()
		   this.daymargin(this.getWeek(year,this.dayyue))
	   }else{
	   	this.$refs.tenli.map(value=>{
	   				value.style="color:#cccccc"
	   		})
	   			if(this.dayyue<1){
			   		this.dayyue =12
			   	}
			   	if(this.dayyue<=9){
			   		this.yearyue = this.daynian+'年'+String(parseInt(this.dayyue))+'月';
			   	}else {
			   		this.yearyue = this.daynian+'年'+String(parseInt(this.dayyue))+'月';
	   		}
	   	 let today = new Date();//获得当前日期
		   let year = today.getFullYear();
		   let month = this.dayyue;
		   this.daycount = new Date(year,month,0).getDate()
		   this.daymargin(this.getWeek(year,this.dayyue))
		   for(var i=0;i<this.yesyue;i++){
	   			this.$refs.tenli[parseInt(this.daycount-1-i)].style ="color:#373737"
	   		}
	   }
   },
    timetrans(date){
		    var date = new Date(date*1000);//如果date为13位不需要乘1000
		    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		    let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
		    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		    let m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		    let s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
		    return M+D+h+m+s;
	},

   jskssx(num1,num2,num3){
  		if(num1==num2&&num2==num3){
  			return '通吃'
  		}else {
  			if(parseInt(num1)+parseInt(num2)+parseInt(num3)>10){
   				return '大'
   		}else{
   				return '小'
   		}
  	}
   },
  	// 显示下拉标题
  	showTitle(){
  			this.show_title = !this.show_title;
  	},
  	// 点击任意地方隐藏下拉框
  	hideTitle(){
  		this.show_title = false;
  	},
    gobackLast(){
      window.history.go(-1)
    },
    isNuber(numberList){
      return numberList.split(',')
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },
    // 切换不同的
    changUrl(game_code,key) {
      this.isReady = false;
    	this.menu_title = key;
    	this.show_title = false;
    	this.datatrueq = false;
     switch (game_code) {
       case 51:
       this.urlId = 51
       this.isShowColor = true;
       this.isShowColorG = false;
       this.mleft = '1.9rem'
       this.titleleft ='2.5rem'
         break;
       case 2:
       this.isShowColorG = false;
       this.isShowColor = false;
       this.urlId = 2
       this.mleft = '4.3rem'
       this.titleleft ='2.5rem'
         break;
       case 171:
       this.isShowColor = true;
       this.isShowColorG = false;
       this.urlId = 171
       this.mleft = '1.9rem'
       this.titleleft ='2.5rem'
         break;
       case 3:
       this.isShowColorG = true;
       this.isShowColor = false;
       this.urlId = 3
       this.mleft = '2.4rem'
       this.titleleft ='2.5rem'
         break;
       case 47:
       this.isShowColorG = true;
       this.isShowColor = false;
       this.urlId = 47
       this.mleft = '2.5rem'
       this.titleleft ='2.5rem'
         break;
       case 69:
       this.isShowColorG = false;
       this.isShowColor = false;
       this.urlId = 69
       this.mleft = '2rem'
       this.titleleft ='0.2rem'
         break;
       case 160:
       this.isShowColorG = false;
       this.isShowColor = false;
       this.urlId = 160
       this.mleft = '2.3rem'
       this.titleleft ='2.5rem'
         break;
       case 172:
       this.isShowColorG = false;
       this.isShowColor = false;
       this.urlId = 172
       this.mleft = '3rem'
       this.titleleft ='2.5rem'
			 break;
       case 210:
       this.isShowColor = true;
       this.isShowColorG = false;
       this.urlId = 210
       this.mleft = '1.9rem'
       this.titleleft ='2.5rem'
       break;
       case 46:
       this.isShowColorG = false;
       this.isShowColor = false;
       this.urlId = 46;
       this.mleft = '4.3rem'
       this.titleleft ='2.5rem'
       break;
       case 240:
       this.isShowColorG = false;
       this.isShowColor = false;
       this.urlId = 240;
       this.mleft = '4.3rem'
       this.titleleft ='2.5rem'
       break;
       case 250:
       this.isShowColorG = false;
       this.isShowColor = false;
       this.urlId = 250;
       this.mleft = '4.3rem'
       this.titleleft ='2.5rem'
       break;
       case 260:
       this.isShowColorG = false;
       this.isShowColor = false;
       this.urlId = 260;
       this.mleft = '4.3rem'
       this.titleleft ='2.5rem'
       break;
       case 270:
       this.isShowColorG = false;
       this.isShowColor = false;
       this.urlId = 270;
       this.mleft = '4.3rem'
       this.titleleft ='2.5rem'
			 break;
			 case 280:
       this.isShowColorG = false;
       this.isShowColor = false;
       this.urlId = 280
       this.mleft = '3rem'
       this.titleleft ='2.5rem'
       break;
			 case 180:
			 	this.urlId = 180;
			 break;
         default:
     }
     let params = {};
//   params.date=this.nowday;
     params.game_code = this.urlId;
     params.page = this.page;
     params.number=this.pageNumber;
     this.$http.post(`${getUrl()}/user/getResult`, JSON.stringify(params)).then(res => {
			this.pagenum ='1';
			this.lotteryList = res.data.result;
			this.isReady = true;
					if(Number(res.data.allnumb)>Number(this.pageNumber)){
						this.pagenmb = true
						this.pagenmblength = Math.ceil(res.data.allnumb/this.pageNumber)
					}
     })
    }
  },
  created(){

  	let myDate = new Date();
		myDate.getYear();        //获取当前年份(2位)
		myDate.getFullYear();    //获取完整的年份(4位,1970-????)
		myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
		myDate.getDate();        //获取当前日(1-31)
		myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
		myDate.getMilliseconds();    //获取当前毫秒数(0-999)
		myDate.toLocaleDateString();     //获取当前日期
			this.daytian = myDate.getDate();
			this.dayday=myDate.getDate();
			if(this.daytian<7){
					this.l = this.daytian
					this.yesyue= 7- this.l
				}else{
					this.l = 7
				}
		   let year = myDate.getFullYear()
		   let month = myDate.getMonth()+1;
		   let monthday=myDate.getDate();
		   this.daycount = new Date(year,month,0).getDate()
		   if(month<10){
		   		month ='0'+month
		   }
		   if(monthday<10){
		   	monthday="0"+monthday
		   }
			this.nowday = myDate.getFullYear() + '-'+month+'-' +monthday;
			let  dayday =null;
			if(myDate.getDay()=='0'){
				dayday = '周日'
			}else if(myDate.getDay()=='1'){
				dayday = '周一'
			}else if(myDate.getDay()=='2'){
				dayday = '周二'
			}else if(myDate.getDay()=='3'){
				dayday = '周三'
			}else if(myDate.getDay()=='4'){
				dayday = '周四'
			}else if(myDate.getDay()=='5'){
				dayday = '周五'
			}else if(myDate.getDay()=='6'){
				dayday = '周六'
			}
		this.dayyue = String((myDate.getMonth()+1))
		this.dayyue1 = String((myDate.getMonth()+1))
		this.daynian = String(myDate.getFullYear())
		this.daydata = String((myDate.getMonth()+1))+'月'+String(myDate.getDate())+'日'+dayday;
		console.log(this.daydata)
		this.yearyue = this.daynian+'年'+this.dayyue+'月';
    this.urlId = this.$route.params.id.split(':')[1];
    let params = {};
//  params.date=this.nowday;
    params.game_code = this.urlId;
    params.page = this.page;
    params.number=this.pageNumber;
    switch (Number(this.urlId)) {
      case 51:
        this.selectedId = "北京赛车";
        this.isShowColor = true;
        this.isShowColorG = false;
        this.mleft = '2rem'
        break;
      case 2:
        this.isShowColorG = false;
        this.isShowColor = false;
        this.selectedId = "重庆时时彩";
        this.mleft = '4.2rem'
        break;
      case 171:
        this.selectedId = "幸运飞艇"
        this.isShowColor = true;
        this.isShowColorG = false;
        this.mleft = '2.1rem'
        break;
      case 3:
        this.selectedId = "广东快乐十分"
        this.isShowColorG = true;
        this.isShowColor = false;
        this.mleft = '2.4rem'
        break;
      case 47:
        this.selectedId = "重庆幸运农场";
        this.isShowColorG = true;
        this.isShowColor = false;
         this.mleft = '2.5rem'
        break;
      case 69:
        this.isShowColorG = false;
        this.isShowColor = false;
        this.selectedId = "香港六合彩"
        this.mleft = '2.2rem'
        this.titleleft ='0.2rem'
        break;
      case 160:
        this.isShowColorG = false;
        this.isShowColor = false;
        this.selectedId = "PC蛋蛋"
        this.mleft = '2.3rem'
        break;
      case 172:
        this.isShowColorG = false;
        this.isShowColor = false;
        this.selectedId = "江苏骰宝（快3）"
        this.mleft = '3.3rem'
        break;
      case 210:
        this.selectedId = "威尼斯赛艇"
        this.isShowColor = true;
        this.isShowColorG = false;
        this.mleft = '2.1rem'
        break;
      case 46:
        this.isShowColorG = false;
        this.isShowColor = false;
        this.selectedId = "罗马时时彩";
        this.mleft = '4.2rem'
        break;
      case 240:
        this.isShowColorG = true;
        this.isShowColor = false;
        this.selectedId = "极速赛车";
        this.mleft = '4.2rem'
        break;
      case 250:
        this.isShowColorG = false;
        this.isShowColor = false;
        this.selectedId = "极速时时彩";
        this.mleft = '4.2rem'
        break;
      case 260:
        this.isShowColorG = false;
        this.isShowColor = false;
        this.selectedId = "88赛马";
        this.mleft = '4.2rem'
        break;
      case 270:
        this.isShowColorG = false;
        this.isShowColor = false;
        this.selectedId = "极速六合彩";
        this.mleft = '4.2rem'
				break;
			case 172:
        this.isShowColorG = false;
        this.isShowColor = false;
        this.selectedId = "江苏骰宝（快3）"
        this.mleft = '3.3rem'
				break;
			case 280:
        this.isShowColorG = false;
        this.isShowColor = false;
        this.selectedId = "吉林快3"
				this.mleft = '3.3rem'
				 break;
			case 180:
        this.isShowColorG = false;
        this.isShowColor = false;
        this.selectedId = "北京快乐8";
        this.mleft = '4.2rem'
        break;
    }
    this.menu_title = this.selectedId;
    this.$http.post(`${getUrl()}/user/getResult`, JSON.stringify(params)).then(res => {
    	if(res.data.msg=='4003'){
	        		this.$router.push({
	            	path: '/weihu'
	          })
	        }
      this.lotteryList = res.data.result;
      if(Number(res.data.allnumb)>Number(this.pageNumber)){
	      	this.pagenmb = true
	      	this.pagenmblength = Math.ceil(res.data.allnumb/this.pageNumber)
	     }
    });
    let sx_list = sessionStorage.getItem('sx_list');
    if (sx_list) {
      this.sx_list = JSON.parse(sx_list);
    }else{
      params = {};
      let getoid = '';
      params.oid = sessionStorage.getItem('im_token');
      this.$http.post(`${getUrl()}/user/getMarkSixNumbers`, JSON.stringify(params)).then(res => {
         if (res.data.msg == '4001'){
           return;
         }
         this.sx_list = res.data;
         sessionStorage.setItem('sx_list', JSON.stringify(res.data));
      });
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
.game_160{
  .color_1,.color_4,.color_7,.color_10,.color_16,.color_19,.color_22,.color_25{
    background:green!important;
  }
  .color_3,.color_6,.color_9,.color_12,.color_15,.color_18,.color_21,.color_24{
    background:red!important;
  }
  .color_2,.color_5,.color_8,.color_11,.color_17,.color_20,.color_23,.color_26{
    background:blue!important;
  }
  .color_0,.color_13,.color_14,.color_27{
    background:#ccc!important;
  }
}
.game_25{
   >span{
    font-size: 0!important;
  }
    .clg_01{
        background: url('@{public_img}/images/xync_1.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
     .color_02{
        background: url('@{public_img}/images/xync_2.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
     .color_03{
        background: url('@{public_img}/images/xync_3.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
     .color_04{
        background: url('@{public_img}/images/xync_4.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
     .color_05{
        background: url('@{public_img}/images/xync_5.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
     .color_06{
        background: url('@{public_img}/images/xync_6.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
     .color_07{
        background: url('@{public_img}/images/xync_7.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
     .color_08{
        background: url('@{public_img}/images/xync_8.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
     .color_09{
        background: url('@{public_img}/images/xync_9.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
     .color_10{
        background: url('@{public_img}/images/xync_10.png') no-repeat!important;
        background-size: 100% 100%!important;
    }

    .color_11{
        background: url('@{public_img}/images/xync_11.png') no-repeat!important;
        backgrund-size: 100% 100%;
    }
      .color_12{
        background: url('@{public_img}/images/xync_12.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
      .color_13{
        background: url('@{public_img}/images/xync_13.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
      .color_14{
        background: url('@{public_img}/images/xync_14.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
      .color_15{
        background: url('@{public_img}/images/xync_15.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
      .color_16{
        background: url('@{public_img}/images/xync_16.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
      .color_17{
        background: url('@{public_img}/images/xync_17.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
      .color_18{
        background: url('@{public_img}/images/xync_18.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
      .color_19{
        background: url('@{public_img}/images/xync_19.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
      .color_20{
        background: url('@{public_img}/images/xync_20.png') no-repeat!important;
        background-size: 100% 100%!important;
    }
}
.xiaoxia{
  width: 1rem;
  height: 1rem;
  margin-top: 0.5rem;
}
	.hed{
		height: 1.9rem;
		line-height:1.9rem;
		background:blue;
		color: #fff;
		padding-left:0.5rem;
		font-size:0.85rem;
		position: fixed;
		width: 100%;
		z-index: 2;
		text-align: center;
		// font-weight:bold;
		i{
			float: left;
			margin-right:0.5rem;
      font-size: 18/20rem;
		}
		>div{
			// float: left;
		/*	width: 3rem;*/
			margin:0 auto;
		}
	}
  .hezh{
    width: 2rem;
  }
  .hezhi{
    width: 1rem;
    display: block;
    line-height: 1rem;
    text-align: center;
    border-radius: 50%;
    color: #fff;
  }
	.haha{
		height: 1.8rem;
		margin-bottom:0.5rem;
		select{
			height: 100%;
			width: 100%;
			border-bottom:none;
			outline:none;
			font-size:0.6rem;
			border:none;
			text-align:center;
			padding-left:0.6rem;
			option{
				width: 100%;
				height: 100%;
				text-align:center;
			}
		}
	}
	.haom{
		span{
			text-align:center;
			display:inline-block;
			width: 1rem;
			height:1rem;
			line-height: 1rem;
			color: #fff;
			border-radius:50%;
			margin-right:0.1rem;
		}
    >.feiche {
      width: 0.9rem !important;
      height: 0.9rem!important;;
      line-height: 0.9rem!important;
      text-indent: -9999px;
    }
	}
  .biao{
    top: 1.9rem;
    position: absolute;
    width: 100%;
    left: 0rem;
		overflow: auto;
		padding-bottom: 2.5rem;
    >.titleheader{
    	height:70/46.875rem;
    	width: 96%;
    	border-bottom: 1px solid #CCCCCC;
    	margin: 0 auto;
    	color:#a3a3a3;
    	font-size: 0.6rem;
    	line-height: 70/46.875rem;
    	>span:nth-child(1){
    		margin-left: 0.5rem;
    	}
    }
    .kjh{
    	background: #FFFFFF;
    	border-left:1px solid #CCCCCC;
    	border-right:1px solid #CCCCCC;
    	margin: 0 0.3rem;
    	position: relative;
    	/*>div:nth-child(1){ */
			.lottery-rs-wp {	
    		// line-height: 1.7rem;
    		text-align: center;
    		overflow: hidden;
				position: relative;
				.ball-item-mixin() {
					  text-align: center;
						display: inline-block;
						width: 1rem;
						height: 1rem;
						line-height: 1rem;
						color: #fff;
						border-radius: 50%;
						margin: 0.1rem 0;
						margin-right: 0.1rem;
				}
    		.cqsscdd {
    			.ball-item-mixin;
				}
				.ball-item {
					.ball-item-mixin;
				}
				.icon-gray-f-ball {
					color: #000;
				}
				.icon-blue-f-ball {
					color: #fff;
				}
    	}
    	>div:nth-child(2){
    		/*padding-top: 0.3rem;*/
    	}
    	>div{
    	/*	height: 1.7rem;*/

    		width: 100%;

    		>i{
    			font-size: 0.5rem;
    			color: #000000;
    			float: left;
    		/*	height: 1.5rem;*/
    			margin-top: -0.2rem;
    			margin-left: 0.2rem;
    		}
    		>a{
    			position: absolute;
    			left: 0rem;
    			top: 1.1rem;
    			line-height: 0.5rem;
    			font-size: 0.5rem;
    			color: #000000;
    			margin-left: 0.2rem;
    		}
    	}
    }
    .pcddsxh {
       ul {
        li {
            width: 25%!important;
            text-align:center;
            display: block;
            font-size: 24/46.875rem;
            height: 36/46.875rem;
            line-height: 36/46.875rem;
          }
        }
      }
  }
  .cl_1,
  .cl_2,
  .cl_3,
  .cl_4,
  .cl_5,
  .cl_6,
  .cl_7,
  .cl_8,
  .cl_9,
  .cl_10{
    border-radius: 2/20rem!important;
    text-shadow: 1px 1px 1px rgba(0,0,0,1);
  }
  .header-modal-content {
    background: #fff;
    text-align: center;
    position: relative;
    width:100%;
    margin: 0 auto;
    z-index: 101;
    position: fixed;
    top: 1.6rem;
    > ul{
      width: 100%;
      text-align: center;
      display: inline-block;
      li{
        float:left;
        width: 33.3%;
      	height: 80/46.875rem;
        line-height:80/46.875rem;
        font-size: 14/20rem;
        border-bottom: 1px solid #999;
      }
    }
  }
  .line{
    border-right:1px solid #aaa;
    height:25px;
    float:right;
    margin-top:7px;
    margin-right: -1px;
  }
			.sxh {
        > ul {
          overflow: hidden;
          margin-left: 0.2rem;
          >li{
            display: inline-block;
            float: left;
            border-right: 1px solid #CCCCCC;
            border-bottom: 1px solid #CCCCCC;
            border-top: 1px solid #CCCCCC;
          }
          > li:nth-child(1) {
            border-left: 1px solid #CCCCCC;
            width: 15%;
          }
        }
      }
      .gdklsfsxh, .cqxynsxh {
        > ul {
          > li {
            display: block;
            width: 7.5%;
            font-size: 24/46.875rem;
            height: 36/46.875rem;
            line-height: 36/46.875rem;
            text-align: center;
          }
          >li:nth-child(1),li:nth-child(7){
             width:11.5%;
          }
        }
      }
       .jskssxh{
        > ul {
          > li {
            display: block;
            width: 12%;
            font-size: 24/46.875rem;
            height: 36/46.875rem;
            line-height: 36/46.875rem;
            text-align: center;
          }
          >li:nth-child(1),li:nth-child(7){
             width:11.5%;
          }
        }
      }
      .bjpksxh>ul>li{
      	    width: 9.2%;
				    text-align: center;
				    font-size: .512rem;
				    height: .768rem;
				    line-height: .768rem;
      }
		  .cqsscsxh ul li {
		            width: 16.66%;
		           text-align: center;
		            display: block;
		            font-size: 24/46.875rem;
		            height: 36/46.875rem;
		            line-height: 36/46.875rem;
          }
      .xgcsxh {

        > ul {

          > li {
            width: 9%;
            display: block;
            font-size: 24/46.875rem;
            text-align: center;
            height: 36/46.875rem;
            line-height: 36/46.875rem;
          }
        }
      }
 .cqsscy{
 		background-color: #146cdc!important;
		border: 1px solid #333;
 }
.game_51{
	/* >div:nth-child(1){ */
  .lottery-rs-wp .balls-wp {
		span{
			    width: .9rem!important;
			    height: .9rem!important;
			    line-height: .9rem!important;
			    text-indent: -9999px;
			    display: inline-block;
			    margin-left: 0.1rem;
		}
		/*
		span:nth-of-type(1){
			margin-left: 2.2rem!important;
		}
		*/
	}
}
.game_171,.game_210,.game_240,.game_260{ 

	/* >div:nth-child(1){ */
.balls-wp {	
		>span{
			    width: .9rem!important;
			    height: .9rem!important;
			    line-height: .9rem!important;
			    text-indent: -9999px;
			    display: inline-block;
			    margin-left: 0.1rem;
		}
		>span:nth-of-type(1){
			margin-left: 0.9rem!important;
		}
	}
}

.game_69,.game_270{
	div:nth-child(1){
		span:last-child{
			    margin-left: 2rem;
		}
	}
	.bgxg_1,
	.bgxg_2,
	.bgxg_7,
	.bgxg_8,
	.bgxg_12,
	.bgxg_13,
	.bgxg_18,
	.bgxg_19,
	.bgxg_23,
	.bgxg_24,
	.bgxg_29,
	.bgxg_30,
	.bgxg_34,
	.bgxg_35,
	.bgxg_40,
	.bgxg_45,
	.bgxg_46{
		// background-color: #ff3545 !important;
    //    border: 1px solid #666666;
			text-shadow:none!important;
			background:url(/wap/images/red_ball.png);
			background-size:100% 100% !important;
			color:#333 !important;
	}
	.bgxg_3,
     .bgxg_4,
     .bgxg_9,
     .bgxg_10,
     .bgxg_14,
     .bgxg_15,
     .bgxg_20,
     .bgxg_25,
     .bgxg_26,
     .bgxg_31,
     .bgxg_36,
     .bgxg_37,
     .bgxg_41,
     .bgxg_42,
     .bgxg_47,
     .bgxg_48{
          // background-color: #4f57fa !important;
          // border: 1px solid #666666;
				 text-shadow:none!important;
				  background:url(/wap/images/blue_ball.png);
         background-size:100% 100% !important;
          color:#333 !important;
     }
     .bgxg_5,
     .bgxg_6,
     .bgxg_11,
     .bgxg_16,
     .bgxg_17,
     .bgxg_21,
     .bgxg_22,
     .bgxg_27,
     .bgxg_28,
     .bgxg_32,
     .bgxg_33,
     .bgxg_38,
     .bgxg_39,
     .bgxg_43,
     .bgxg_44,
     .bgxg_49{
        //  background-color: #22620c !important;
        //  border: 1px solid #666666;
				 text-shadow:none!important;
				  background:url(/wap/images/green_ball.png);
         background-size:100% 100% !important;
          color:#333 !important;
     }
}
.game_160 span:last-child{
			 float: right;
			 margin-right: 4.5rem!important;
			//  margin-top: 0.3rem;
		}
.mask1{
	width: 100%;
	height:100vh;
	background: rgba(0,0,0,.4);
	position: fixed;
	left: 0;
	top: 1.9rem;
	z-index: 11;
}
.dayshow{
	width: 580/46.875rem;
	height: 660/46.875rem;
	position: absolute;
	left: 50%;
	margin-left: -580/2/46.875rem;
	z-index: 12;
	top: 5rem;
	>.dayheader{
		height: 110/46.875rem;
		width: 100%;
		background: #2e65d4;
		font-size: 40/46.875rem;
		color: #fff;
		line-height: 110/46.875rem;
		text-align: center;
	}
	>.dayfoot{
		width: 100%;
		height: 550/46.875rem;
		background: #F4F4F4;
		position: relative;
		div:nth-child(1){
			height: 1.5rem;
			/*border-bottom: 1px solid red;*/
			line-height: 1.5rem;
			text-align: center;
			span:nth-child(1),span:nth-child(3){
				width: 0.5rem;
				height: 0.5rem;
				margin-top: 0.5rem;
				border-bottom: 1px solid #373737;
				border-left:1px solid #373737;
				display: inline-block;

			}
			span:nth-child(1){
				margin-right: 2.5rem;
					transform: rotate(45deg);
			}
			span:nth-child(2){
				font-size: 28/46.875rem;
				color: #373737;
			}
			span:nth-child(3){
				transform: rotate(-135deg);
				margin-left: 2.5rem;
			}
		}
		div:nth-child(2){
			width: 100%;
			text-align: center;
			ul:nth-child(1){
				overflow: hidden;
				width: 100%;
				li{
					float: left;
					font-size: 28/46.875rem;
					color: #cccccc;
					margin-left: 0.5rem;
					width: 1rem;
					height: 1rem;
				}
			}
			ul:nth-child(2){
				overflow: hidden;
				width: 95%;
				margin-left: 0.55rem;

				li{
					float: left;
					font-size: 28/46.875rem;
					color: #cccccc;
					margin-left: 0.5rem;
					width: 1rem;
					height: 1rem;
					margin-top: 0.25rem;
					line-height: 1rem;
					border-radius: 50%;

				}
			}
		}
		div:nth-child(3){
				position: absolute;
				left: 0;
				bottom: 0.5rem;
			a{
				color: 28/48.675rem;
				color: #373737;
				float: left;
				margin-left: 3.5rem;
			}
		}
	}
}
.game_172 .cqsscdd:nth-of-type(1),.game_280 .cqsscdd:nth-of-type(1){
	margin-left: -4rem;
}
.game_160 .color88:nth-of-type(1){
	margin-left: -1.5rem;
}
.game_160 .color88:nth-of-type(4){
	margin-left: 1.6rem;
}

.game_160{

   		span{
   			    background: #146cdc!important;
    				border: 1px solid #666666;
   			}
      .color_1,.color_4,.color_7,.color_10,.color_16,.color_19,.color_22,.color_25{
        background:green!important;
        border: 1px solid #666666;
      }
      .color_3,.color_6,.color_9,.color_12,.color_15,.color_18,.color_21,.color_24{
        background:red!important;
        border: 1px solid #666666;
      }
      .color_2,.color_5,.color_8,.color_11,.color_17,.color_20,.color_23,.color_26{
        background:blue!important;
        border: 1px solid #666666;
      }
      .color_0,.color_13,.color_14,.color_27{
        background:#ccc!important;
        border: 1px solid #666666;
      }


  }
    #page{
				width: 100%;
				position: fixed;
				left: 0;
				bottom: 0;
				background: white;
				opacity: 0.95;
				z-index: 10;
		  div:nth-child(1){
		  		width: 100%;
		  		max-height: 320/46.875rem;
		  		overflow: auto;
		  		ul{
		  			width: 100%;
		  			li{
		  				width: 100%;
		  				height: 80/46.875rem;
		  				border-bottom: 1px solid #eee;
		  				text-align: center;
		  				line-height: 80/46.875rem;
		  				position: relative;
		  				img{
		  					position: absolute;
		  					 width: 37/46.875rem;
		  					 height: 30/46.875rem;
		  						top: 0.45rem;
		  					margin-left: 0.3rem;
		  				}
		  			}
		  			li:nth-child(1){
		  				color: #2f64d4;
		  			}
		  		}
		  }
		  div:nth-child(2){
		  	width: 100%;
		  	height: 100/46.875rem;
		  	line-height: 100/46.875rem;
		  	text-align: center;

		  	a{
		  		display: inline-block;
		  		width: 33%;
		  		height: 100%;
		  		text-align: center;
		  		float: left;
		  		position: relative;
		  		color: #000000;
		  	}
		  	i{
		  		width:0;
		  		height:0;
		  		border-color: #fff #fff #2f64d4 #fff;
			    border-style: solid solid solid solid;
			    border-width: 0.3rem;
					position: absolute;
					right: 0.75rem;
					top: 0.6rem;
		  	}
		  }
   }
   .game_172,.game_280{

         	span{
         		border: none!important;
         		border-radius:0!important;
         		text-indent:-9999px!important;
         	}
            .color_1{
            	background: url(../../../wap/images/sia1.png) no-repeat!important;
              background-size:100% 100%!important;
            }
            .color_2{
              background: url(../../../wap/images/sia2.png) no-repeat!important;
              background-size:100% 100%!important;
            }
            .color_3{
             	background: url(../../../wap/images/sia3.png) no-repeat!important;
              background-size:100% 100%!important;
             }
            .color_4{
              background: url(../../../wap/images/sia4.png) no-repeat!important;
              background-size:100% 100%!important;
            }
            .color_5{
             	background: url(../../../wap/images/sia5.png) no-repeat!important;
              background-size:100% 100%!important;
             }
            .color_6{
              background: url(../../../wap/images/sia6.png) no-repeat!important;
              background-size:100% 100%!important;
            }

}
.flex() {
	display: flex;
}
.lottery-rs-wp {
	.flex;
	align-items: center;
	padding: .3rem .3rem 0 .3rem;
}
.issue-wp {
		min-width: 70/20rem;
	  font-size: 0.5rem;
		color: #000000;	
		text-align: left;
}
.balls-wp {
	flex-grow: 1;
	justify-content: center;
	align-items: center;
}
.icon-gray-f-ball {
	background: url("@{public_img}/images/gray_f_ball.png") no-repeat;
	background-size: 100%;
	color: #000;
}
.icon-blue-f-ball {
	background: url("@{public_img}/images/blue_f_ball.png") no-repeat;
	background-size: 100%;
	color: #fff;
}
</style>
