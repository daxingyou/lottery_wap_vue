<template>
<div class="box">
  <header class="tohop_head container color1">
      <div class="text-center">
      	<span @click="$router.push('/index')">
      		<img :src="$getPublicImg('/images/backing_out.png')" alt=""/>
      	</span>
        <span>{{titleH}}</span>       
      </div>
    </header>
		<div class="zf_logo">
			<img :src="$getPublicImg('/images/pay_'+urlid+'.png')" alt="" />
		</div>
		<div class="show_ewm">
			<p>订单提交成功，请扫描以下二维码付款！</p>
			<p>订单号：{{zfurl.order}}</p>
			<p>应付金额：<i>{{zfurl.money}}</i>元</p>
			<div class="ewmImg">
				<img v-if="zfurl.jump_url" :src="zfurl.jump_url" alt="" />
				<img v-if="zfurl.code_url" :src="src" alt="" />
				<canvas v-if="!zfurl.jump_url"  id="qrccode-canvas"></canvas>
				<input type="hidden" v-model="zfurl.code_url"/>	
			</div>
			<span>
				<!--<a :href="src" download>-->
					<img :src="$getPublicImg('/images/ic_file.png')" alt="" />
					长按二维码保存至相册
				<!--</a>-->
			</span>
		</div>
		<div class="ts">保存到本地相册，然后打开{{titleH}}，扫描此二维码</div>
</div>
</template>
<script>
	var QRcode = require('qrcode')
	var canvas=''
import iHeader from '../../components/i-header'
export default {
  components: {
    iHeader
    
  },
  data() {
    return {
	 			zfurl:JSON.parse(sessionStorage.getItem('zfurl')),
	 			urlid:'',
	 			titleH:'',
	 			src: ''
    }

  },
   mounted () {

    this.$nextTick(function () {
      // DOM操作
      this.canvas = document.getElementById('qrccode-canvas')
    })
  },
	methods:{
		createQrc: function () {
      if (!this.zfurl.code_url){
        return false
      }
      let opts = {
			  errorCorrectionLevel: 'H',
			  type: 'image/jpeg',
			  rendererOpts: {
			    quality: 0.3
			  }
			}
      QRcode.toDataURL(this.zfurl.code_url, opts,  (error, url) => {
        if (error) {
          console.log(error)
        } else {
        	this.src = url
          console.log('success')
        }
      })
    }
	},
  created() {
	this.urlid=this.$route.path.split(':')[1]
	switch (this.urlid) {
      case '55':
      
        this.titleH = "在线支付"
        break;
      case '66':
        
        this.titleH = "微信支付"
        break;
      case '77':
       
        this.titleH = "支付宝支付"
        break;
      case '88':
       
        this.titleH= "财付通支付"
        break;
      case '99':
       
        this.titleH = "快捷支付"
        break;
      default:
    }
 
		 setTimeout(() => { 
    	 this.createQrc()
 		 }, 10)	
  }
}
</script>


<style  lang='less' ref="stylesheet/less" scoped>
@zoom:46.875rem;
header {
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      font-size: .9rem;
      > div {
        height: 100%;
        color: #FFFFFF;
       span:nth-child(1){
        	float: left;
        	width: 0.6rem;
        	height: 1rem;
        	display: inline-block;
        	img{
        		width: 100%;
        		height: 100%;
        	}
        }
      }
    }
.zf_logo{
	width: 100%;
	height: 212/@zoom;
	border-bottom: 1px solid #C0C0C0;
	img{
		 width: 374/@zoom;
      height: 100/@zoom;
      margin: 55/@zoom 188/@zoom;
	}
}
.show_ewm{
	width: 100%;
	p{
		text-align: center;
		margin-top: 0.2rem;
		i{
			color: #196fde;
			margin-right: 0.2rem;
		}
	}
	p:nth-of-type(1){
		font-size: 32/@zoom;
		margin-top: 50/@zoom;
		font-weight: 600;
	}
	.ewmImg{
		width: 400/@zoom;
		height: 400/@zoom;
		margin: 0.5rem auto;
		>#qrccode-canvas{
			width: 100%!important;
			height: 100%!important;
			
		}
		img{
			width: 100%;
			height: 100%;
		}
	}
	span{
		width:400/@zoom;
		height:90/@zoom;
		/*border: 1px solid #C0C0C0;*/
		/*background-color: #FFFFFF;*/
		/*border-radius: 0.2rem;*/
		display: inline-block;
		margin-left: 3.7rem;
		text-align: center;
		line-height: 90/@zoom;
		img{
			width: 45/@zoom;
			height: 45/@zoom;
			margin-top: -0.2rem;
			/*margin-left: 2.2rem;*/
		}
	}
}
.ts{
	width: 100%;
	text-align: center;
	position: fixed;
	left: 0;
	bottom: 0.35rem;
}
</style>
