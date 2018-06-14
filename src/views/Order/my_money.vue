<template>
	<div>
		<div>
			<i-header :title="tit"></i-header>
		</div>
		<div v-if='isOld'>
			<div class="title">请验证已绑定银行卡账号</div>
			<div class="seach">
				<span>请选择银行：</span>
				<div  style='position:relative;'>
					<select >
						<option v-for="option in options" v-bind:value="option">
							{{option}}
						</option>
					</select>
				</div>
			</div>
			<div class="bank">
				<span>银&nbsp;行&nbsp;卡&nbsp;号：</span>
				<input type="" name="" placeholder="请输入已绑定银行卡的完整卡号" v-model="bank_code7" minlength="20" @blur='blur()'  maxlength="23" 
					style='width: 9rem;'  onkeyup="this.value=this.value.replace(/\s/g,'').replace(/\D/g,'').replace(/(\d{4})(?=\d)/g,'$1 ');" />
				<div class="erredts" v-if='fase' >
					卡号填写错误
				</div>
			</div>
		</div>
		<div>
			<div class="title">请输入新的银行卡资料</div>
			<div>
				<div class="seach">
					<span>请选择银行：</span>
					<div style='position:relative'>
						<select v-model="bankName">
							<option v-for="option in options" v-bind:value="option">
								{{option}}
							</option>
						</select>
					</div>
				</div>
				<div class="bank" >
					<span>银&nbsp;行&nbsp;卡&nbsp;号：</span>
					<input type="" name="" placeholder="请输入银行卡号" v-model="bankCode" minlength="20" maxlength="23" @blur='blur2()'  onkeyup="this.value=this.value.replace(/\s/g,'').replace(/\D/g,'').replace(/(\d{4})(?=\d)/g,'$1 ');"style='width: 9rem;'  />
					<div class="erredts" v-if='fasenew' >
					卡号格式错误
				</div>
				</div>
				<div class="bank">
					<span>重&nbsp;复&nbsp;卡&nbsp;号：</span>
					<input type="" name="" placeholder="请再次输入银行卡号" v-model="bank_code1" minlength="20" maxlength="23" @blur='blur1()'  onkeyup="this.value=this.value.replace(/\s/g,'').replace(/\D/g,'').replace(/(\d{4})(?=\d)/g,'$1 ');" style='    width: 9rem;' />
					<div  class="erredts" v-if='fase1'>
						卡号输入不一致
					</div>
				</div>
				<div class="adrres">
					<span>开&nbsp;户&nbsp;地&nbsp;址：</span>
					<input type="text" name="" placeholder="请输入开户行地址" v-model="bankAdress" >
				</div>
			</div>
			<div class="submit">
				<button class="color1" @click="submitBank">提交</button>
			</div>

		</div>
		<promptbox  @panelShow="panelShow=false" :promptsystem="promptsystem" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" 
   			:promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
	</div>
</template>
<script>
import iHeader from '../../components/i-header';
import promptbox from '../../components/promptbox';
import { mapActions } from "vuex";
export default {
	components: {
		iHeader,
		promptbox
	},
	data() {
		return {
			tit:'添加银行卡',
			is_gd_ali: is_gd_ali(),
			panelShow: false,
			fase:false,
			fase1:false,
			fasenew:false,
			bank_code:'',
			bank_code8:'',
			bank_code7:'',
			bank_code1:"",
			isOld:false,
			title: "",
			bankName: "工商银行",
			bankCode: "",
			bankAdress: "",
			options: ["工商银行", "建设银行", "农业银行", "招商银行", "交通银行", "兴业银行", "中国银行", "广发银行", "深发银行", "中信银行", "光大银行", "浦发银行", "中国邮政", "民生银行", "平安银行(原深圳发展银行)", "华夏银行"],
			activeTab: 'all',
			erreocode:'',
      		promptboxtext:'',
      		panelShow:false,
      		promptboxshow:true,
      		successshow:false,
      		promptsystem:''
		}
	},
	methods: {
		...mapActions(["BIND_BANK"]),
		blur(){
			this.bank_code7 = this.bank_code7.replace(/\s/g,'').replace(/\D/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");	
			let code7= this.bank_code7.replace(/\s/g,"")
			 if(this.bank_code8!=code7){
			 	this.fase=true;
			 }else{
			 	this.fase=false;
			 }
		},
		blur1(){
			this.bankCode = this.bankCode.replace(/\s/g,'').replace(/\D/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");
			this.bank_code1 = this.bank_code1.replace(/\s/g,'').replace(/\D/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");	
			let code = this.bankCode.replace(/\s/g,"");
			let code1 = this.bank_code1.replace(/\s/g,"");
			if(code!=code1){
				this.fase1=true;
			}else{
				this.fase1=false;
			}
		},
		blur2(){
			this.bankCode = this.bankCode.replace(/\s/g,'').replace(/\D/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");	
			let code = this.bankCode.replace(/\s/g,"");
			if(code.length<16){
			    this.fasenew = true
			}else{
				this.fasenew = false
			}
		},
		submitBank(){
				this.successshow=false
			if (this.bankCode == "" || this.bankAdress == ""|| this.bank_code1=="") {
				this.promptboxtext = "填写信息不能为空"
				this.panelShow = true
				setTimeout(() => {
					this.panelShow = false
					return
				}, 1500)
			}
			else if (this.bankCode.length < 16) {
				this.promptboxtext = "请输入正确的银行卡号"
				this.panelShow = true
				setTimeout(() => {
					this.panelShow = false
					return
				}, 1500)
			}else if(this.fase==true || this.fase1==true){
					this.promptboxtext = "请输入正确信息"
					this.panelShow = true
					setTimeout(() => {
						this.panelShow = false
						return
					}, 1500)
			}else {
				let params = {};
				let code = this.bankCode.replace(/\s/g,"");
				params.bankCardNumbers = code;
				params.bankName = this.bankName;
				params.bankAddress = this.bankAdress;
				this.BIND_BANK(params).then(res => {
						setTimeout(() => {
							this.$router.push({
								path: '/order:0'
							})
						})
				})
			}
		}
	},
	created(){
		 this.bank_code8 = Number(JSON.parse(sessionStorage.getItem('im_bankcode')))
		 if(this.bank_code8){
		 	this.isOld=true
		 	this.tit='修改银行卡'
		 }else{
		 	this.isOld=false;
		 	this.tit='添加银行卡'
		 }

	}
}
</script>
<style  lang='less' ref="stylesheet/less" scoped>
@zoom: 46.875rem;
@import '../../assets/less/variable.less';
.title {
	line-height: 70/40rem;
	font-size: 23/40rem;
	text-align: center;
	color: #7d7d83;
	border-bottom: 1px solid #c3c3c3;
}

.name {
	height: 85/40rem;
	line-height: 85/40rem;
	padding-left: 26/40rem;
	background: #fff;
	border-bottom: 1px solid #c3c3c3;
	margin-bottom: 10/40rem;
	span {
		font-size: 28/40rem;
		color: #000000;
		margin-right: 20/40rem;
	}
	input {
		border: none;
		margin: 0;
		padding: 0;
		outline: none;
		width: 60%;
	}
	div{
		position: absolute;
		
	}
}

.bank {
	height: 85/@zoom;
	padding-left: 26/40rem;
	background: #fff;
	border-bottom: 1px solid #c3c3c3;
	position: relative;
	span {
		font-size: 28/40rem;
		color: #000000;
	}
	input {
		border: none;
		margin: 0;
		padding: 0;
		outline: none;
		height: 80/@zoom;
	}
}
.seach {
	height: 85/40rem;
	line-height: 85/40rem;
	padding-left: 26/40rem;
	background: #fff;
	border-bottom: 1px solid #c3c3c3;
	display: flex;
	position: relative;
	span {
		font-size: 28/40rem;
		color: #000000;
		
	}
	div {

		width: 60%;
		text-indent: 20/40rem;
		overflow: hidden;
		select {
			width: 100%;
			border: none;
			margin: 1px;
			padding: 0;
			outline: none;
			float: left;
			position: relative;
			top: .5rem;
			background-color: #fff;
		}
	}
	div:after {
		content: '';
	}
}

.adrres {
	height: 85/40rem;
	padding-left: 26/40rem;
	background: #fff;
	border-bottom: 1px solid #c3c3c3;
	margin-bottom: 10/40rem;
	position: relative;
	span {
		line-height: 85/40rem;
		font-size: 28/40rem;
		color: #000000;
	}
	input {
		border: none;
		margin: 0;
		padding: 0;
		outline: none;
		width: 60%;
	}
}

.submit {
	height: 180/40rem;
	display: flex;
	align-items: center;
	button {
		margin: 0 auto;
		width: 396/40rem;
		height: 69/40rem;
		border-radius: 10/40rem;
		border: none;
		outline: none;
		background: #206edb;
		color: #fff;
	}
}

.modal_box_feedback_login {
	z-index: 99999;
	position: fixed;
	top: 0;
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	>div {
		background: rgba(0, 0, 0, 0.5);
		color: white;
		padding: 10px 40px;
		border-radius: 4px;
	}
}
.erredts{
	position: absolute;
	right:1.8rem;
	top: -1rem;
	padding:0.3rem;
	padding-bottom: 0.45rem;
	text-align: center;
	color: #FFFFFF;
	font-size: 22/@zoom;
	background:url('@{public_img}/images/bankcode.png') no-repeat;
	background-size: 100% 100%;
}
</style>
