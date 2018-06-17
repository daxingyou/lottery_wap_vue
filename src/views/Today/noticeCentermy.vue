<template>
  <!--当新用户或者没选择门店用户进来时  会让选择默认门店-->
  <div>
  	<div>
    	<i-header title="我的消息"></i-header>
  	</div>
  	<div style="margin-top: 0.4rem;">
  		<div class="noticeCenter" v-for="(item,index) in annousments" @click="gotoAddress(index)" >
  			<span>{{item.addtime}}</span><i v-if="item.isRead==0">NEW</i>
  			<p>{{item.comment.slice(0,40)}}…</p>
  		</div>
  	</div>
  	<div class='noxiaoxi' v-show="annousments.length==0">
  		<img :src="$getPublicImg('/images/noxiaoxi.png')"/>
  		<p>您暂时没有新的消息!</p>
  	</div>
  </div>
</template>
<script>
  import iHeader from '../../components/i-header'
  export default {
  	 data: function(){
    		return{
					annousments:'',
					annousmenttime:'',
    		}
    },
    components:{
      iHeader
    },
		created(){
		 let params = {}
		 params.oid = sessionStorage.getItem('im_token');
	  	 this.$http.post(`${getUrl()}/user/getMsgInbox`,JSON.stringify(params)).then(res => {
	  	 			if (res.data.msg == "4001") {
					        sessionStorage.clear();
					        this.panelShow = true;
					        this.promptboxtext = "您的账户已失效，请重新登录";
					        setTimeout(() => {
					          this.panelShow = false;
					          this.$router.push({
					            path: '/login'
					          })
					        }, 1000)
					      }else{
					      	console.log(res.data.msgList.length)
	   						this.annousments = res.data.msgList
	   						let announcementmy = res.data.msgList
	   				sessionStorage.setItem('an_announcementmys', JSON.stringify(announcementmy))
					      }
	  	 			
	   						
	  	 				 	
	  	 			
	   		})
		},
		methods:{
			gotoAddress(path){
				let i = `/noticeCentermys:${path}`;
       				 this.$router.push(i)
			},
			
      //过滤分秒
      p(s){
		        if (s <= 0) {
		          return `00`
		        } else if (s > 0 && s < 10) {
		          return `0${s}`
		        } else {
		          return s
		        }
		      },
     getLocalTime(nS) {
     		
		     let time=new Date(parseInt(nS) * 1000)
		     let year=time.getFullYear();
		     let month=time.getMonth()+1;
		     let date=time.getDate();
		      month=this.p(month);
		      date=this.p(date)
		     let time_split=time.toLocaleTimeString().split(":")
		     let time_a=`${time_split[0]}:${time_split[1]}`
		      return `${year}-${month}-${date}`
		}
	
		}
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
.noticeCenter{
	/*height: 175/46.875rem;*/
	width: 93.5%;
	margin:0 auto;
	padding-top:15/46.875rem;
	padding-bottom:25/46.875rem;
	border-bottom: 1px solid #e5e5e5;
	>span{
		color: #999;
		font-size: 0.6rem;
	}
	>i{
		background-color: #ef9836;
		color: #FFFFFF;
		border-radius:0.1rem;
		width: 70/46.875rem;
		height: 30/46.875rem;
		line-height: 30/46.875rem;
		font-size: 0.6rem;
		display: inline-block;
		text-align: center;
		margin-left: 10/46.875rem;
		
	}
	>p{
		width: 100%;
		
		}
}

.noxiaoxi{
	width: 100%;
	height: 100%;
	position: relative;
	>img{
		width: 20%;
		left: 40%;
		top: 4rem;
		position: absolute;
	}
	>p{
		text-align: center;
		color: #C0C0C0;
		position: absolute;
		top: 7rem;
		width: 100%;
		
	}
}
</style>
