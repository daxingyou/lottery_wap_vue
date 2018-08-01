<template>
	<div>
		<div class="promptbox" v-show="panelShow">
			<!--<div class="middle" :style="{'height':successshow ? 240/46.875+'rem': 460/46.875+'rem'}">-->
			<div class="middle">
				<img :src='(successshow || successicon) ? $getPublicImg("/images/successicon.png"):$getPublicImg("/images/icon.png")'/>
				<div class="prompttitle" v-show="promptboxtext!=''">{{ promptboxtext }}</div>
        <p v-if="promptsubtitle.length" v-for="item in promptsubtitle" class="subtitle">{{ item }}</p>
				<div v-show="erreocode!=''">{{promptsystem}}(错误码：{{erreocode}})</div>
				<button v-show="!successshow" class="color1" @click="hidePanel">我知道了</button>
        <p v-if="promptbottomtips" class="bottomTips" @click="bottomClicked">{{ promptbottomtips }}</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		date(){
			return{
				data(){
				}
			}
		},
		props:{
			promptboxtext:{
				type:String//没有错误码的时候，应该提示的内容
			},
      promptsubtitle: {
			  type: Array
      },
			erreocode:{
				type:String//错误码
			},
			panelShow:{
				type:Boolean//block或者none
			},
			promptboxshow:{
				type:Boolean//是否自动消失
			},
			promptsystem:{
				type:String//有错误码的时候，应该提示的内容
			},
			successshow:{
				type:Boolean//成功提示
			},
      promptbottomtips: {
        type:String //成功提示
      },
      successicon: {
			  type: Boolean,
        default: false
      },
      autohide: {
			  type: Boolean,
        default: true
      }
		},
		created(){
			if (this.panelShow){
				this.timeHide()
			}
		},
		methods:{
		   	hidePanel(){
			   this.$emit('panelShow',false);
			},
			timeHide () {
				setTimeout(()=>{
						this.hidePanel();
				}, 1500)
			},
      bottomClicked() {
        this.$emit('bottom-clicked')
        this.$emit('panelShow',false);
      }
		},
		watch:{
			panelShow(val){
				if(!this.promptboxshow){
					return
				}
				if (val && this.autohide) {
					this.timeHide()
				}
			},
		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
@zoom:46.875rem;
	.promptbox{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0,0,0,0.5);
		z-index: 100;
		.middle{
			width: 540/@zoom;
			// height: 460/@zoom;
			height: initial;
      text-align: center;
			background-color: #FFFFFF;
			border-radius: 5%;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -540/@zoom/2;
			margin-top: -460/2/@zoom;
      padding: 0 0.4rem 0.4rem;
			img{
				width: 190/@zoom;
				height: 190/@zoom;
				position: absolute;
				left: 50%;
				margin-left: -190/2/@zoom;
				top: -1.45rem;
			}
			div{
				font-size: 0.75rem;
				margin:  3rem 0.5rem 0.46rem 0.5rem;
				text-align: center;
			}
			button{
				margin-top: 0.5rem;
				width: 265/@zoom;
				height: 80/@zoom;
				background: #146cdc;
				border: none;
				color: #FFFFFF;
				text-align: center;
				line-height: 80/@zoom;
				border-radius:0.2rem ;
				letter-spacing:0.1rem;
				outline: none;
			}
		}
    .subtitle{
      text-align: center;
      margin-bottom: 0.3rem;
    }
    .bottomTips{
      margin-top: 0.3rem;
      text-align: right;
      color: #146cdc;
    }
	}
</style>
