<template>
  <!--当新用户或者没选择门店用户进来时  会让选择默认门店-->
  <div>
  	<div>
    	<i-header title="新闻中心"></i-header>
  	</div>
  	<div style="margin-top: 0.4rem;">
  		<div class="noticeCenter" v-for="(item,index) in announceMents" @click="gotoAddress(item.id)">
  			<span>{{getLocalTime(item.updatetime)}}</span><i v-if="index==0">NEW</i>
  			<p>{{item.content.slice(0,40)}}…</p>
  		</div>
  		</div>
  </div>
</template>
<script>
	import iHeader from '../../components/i-header';
	import {mapActions} from 'vuex';
  export default {
  	 data: function(){
    		return{
					announceMents:'',
					annousmenttime:'',
    		}
    },
    components:{
      iHeader
    },
		created(){
			this.GET_ANNOUNCEMENT_DATA().then(res=>{
				this.announceMents = res.response
			})
		},
		methods:{
			...mapActions(["GET_ANNOUNCEMENT_DATA"]),
			gotoAddress(id){
        this.$router.push({
					path:`noticedetails/${id}`
				})
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
</style>
