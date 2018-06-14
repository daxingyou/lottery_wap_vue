<template>
	<!--当新用户或者没选择门店用户进来时  会让选择默认门店-->
	<div>		
		<i-header class="color1" title="在线客服"></i-header>
		<div style="height: 26.5rem;width: 100%;position: fixed;left: 0;bottom: 0;">
       	 	<iframe ref="kefu" :src="kufuUrl" style="height:100%;width: 100%;border: 0;" ></iframe>
		</div>
        <div style="position: fixed; left: 0; right: 0; top:0; bottom:0; background: rgba(0,0,0,0.5);z-index: 2;" v-show='urlqingqiu'>
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
	</div>
</template>
<script>
  import iHeader from '../../components/i-header'
  import { mapActions } from "vuex";
	export default {
		components: {
			iHeader
    },
    methods:{
      ...mapActions(["SITEBASIC_INFO"]),
      site(){
        this.SITEBASIC_INFO().then(res => {
          this.kufuUrl = res.kufuUrl
        })
      }
    },
		data(){
			return {
				kufuUrl: '',
				kefuHeight: '',
				urlqingqiu:true,
				
			}
		},
		created() {

		},
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
.loading{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  text-align: center;
  color: white!important;
  padding-top: 40%;

  @keyframes line-spin-fade-loader {
    50% {
      opacity: 0.3; }

    100% {
      opacity: 1; } }

  .line-spin-fade-loader {
    text-align: center;
    position: relative;
    width:100/20rem;
    height: 100/20rem;
    transform: translateX(50px) translateY(50px);
    margin-left: auto;
    margin-right: auto;
  }
  .line-spin-fade-loader > div:nth-child(1) {
    top: 20/20rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(2) {
    top: 13.63636/20rem;
    left: 13.63636/20rem;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(3) {
    top: 0;
    left: 20/20rem;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(4) {
    top: -13.63636/20rem;
    left: 13.63636/20rem;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(5) {
    top: -20/20rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(6) {
    top: -13.63636/20rem;
    left: -13.63636/20rem;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(7) {
    top: 0;
    left: -20/20rem;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(8) {
    top: 13.63636/20rem;
    left: -13.63636/20rem;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out; }

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

	/*.noticeCenter{
	width:90%;
	margin:0 auto;
	padding-top:30/46.875rem;
	padding-bottom:15/46.875rem;
	border-bottom: 1px solid #e5e5e5;
	>span{
		color: #b6b6b6;
	}
	>i{
		background-color: #ef9836;
		color: #FFFFFF;
		border-radius:0.1rem;
		width: 70/46.875rem;
		height: 35/46.875rem;
		font-size: 12px;
		display: inline-block;
		text-align: center;
		margin-left: 15/46.875rem;
	}
	>H3{
		margin: 0;
		margin-top: 0.2rem;
	}
}*/

.header{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 1.8rem;
	z-index: 2;
}
</style>
