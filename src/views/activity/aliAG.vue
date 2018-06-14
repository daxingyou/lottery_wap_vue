<template>
	<div>
		<header class="page-subheader">
        <div id="wrapper-header" class="wrapper-down">
            <div id="header" class="clearfix">

                <div class="mobile-menu-btn"></div>

                <a href="javascript:void(0);"><h1 id="logo"></h1></a>

            </div>
            <div id="menu-bg"></div>
        </div>

        <div id="wrapper-postheader"></div>

	    </header>
		<div id="aghero">

		 <section id="banner" class="clearfix">
			 <img src="./images/banner.jpg" class="img-responsive" lang="cn" data-lang-token="FLAG">
		 </section>

		 <section id="decro" class="clearfix">
			 <div class="decro d2"></div>
		 </section>

		 <section id="intro" class="clearfix">
			 <div class="container">
				 <div class="txt" lang="cn">
					 <span lang="cn">互动直播答题游戏 《阿理彩票百万英雄》 登陆Asia Gaming平台，考验玩家的智慧和反应，有机会一夜暴富！</span><br/>
					 <span lang="cn">2月28-3月2日期间进入直播厅，即可以免费参加由皇牌美女主播担任主持的答题大赛，活动不定时举行，让您和其他玩家瓜分诱人的百万大奖，“靠才气，发大财”！</span>
				 </div>
				 <h2><img src="./images/support.png" lang="cn"/></h2>
				 <p lang="cn">手机移动端，iPad，电脑设备</p>
				 <br/><br/><br/>
				 <img src="./images/support_2.png" lang="cn" style="width:100%" />

			 </div>
		 </section>

		 <section id="progress" class="clearfix">
			 <div class="container">

				 <h2><img src="./images/progress.png" lang="cn" style="width:100%" /></h2>
				 <img src="./images/progress_2.png" lang="cn" style="width:100%"  />

			 </div>
		 </section>


		 <section id="howplay" class="clearfix">
			 <div class="container">

				 <h2><img src="./images/howtoplay.png" /></h2>

				 <video loop autoplay controls preload="metadata" class="vid" id="video-intro" style="display:block; margin: 0 auto; max-width: 100%;" >
					 <source src="https://www.6686sky.tv/promotions/2018yuanxiao//asia-gaming.com/events/aghero/./images/mp4/aghero.mp4" lang="cn" data-lang-token="FLAG" type="video/mp4" />
				 </video>

				 <br/><br/>

				  <div class="stages">
					 <div class="stage">

						 <div class="bar bar_1" >
							 <h1 lang="cn">1. 参与活动</h1>
							 <p lang="cn">
								 <span lang="cn">活动将在活动期间不定时举行。可以观看游戏大厅的提示标识来获知下一场开始的时间段。每场活动开始前10分钟登入活动主介面，会看到10分钟倒计时提醒。如错过游戏的第一题则无法参与只能围观。</span>
							 </p>

							 <div class="decro g1"></div>
						 </div>

						 <div class="bar bar_2" >
							 <h1 lang="cn">2. 回答问题，要准要快</h1>
							 <p lang="cn">
								 <span lang="cn">点选认为正确的答案，必须在10秒内审题和作答。答案不可修改。</span>
							 </p>

							 <div class="decro g2"></div>
							 <div class="decro g2b"></div>
							 <div class="decro g3"></div>
						 </div>

						 <div class="bar bar_3" >
							 <h1 lang="cn">3. 超时或答错，就会出局</h1>
							 <p lang="cn">
								 <span lang="cn">如果点选了错误答案，或超时未作答，都将遭遇淘汰，并且无法角逐当期的奖金。玩家可以选择退出或继续围观。</span>
							 </p>
							 <div class="decro g4"></div>
							 <div class="decro g5"></div>
						 </div>

						 <div class="bar bar_4" >
							 <h1 lang="cn">4. 全部答对，即冲关成功</h1>
							 <p lang="cn">
								 <span lang="cn">题目数量不定，最多为10题。全部题目答对即冲关成功。如果超过 1 个人冲关成功，玩家将平分奖金；否则将独占当期所有奖金。</span>
							 </p>
							 <div class="decro g6"></div>
							 <div class="decro g7"></div>
						 </div>
						 <div class="bar bar_5" >
							 <h1 lang="cn">5. 位列抢答榜，获得额外奖</h1>
							 <p lang="cn">
								 <span lang="cn">每题揭晓答案后，可以查看抢答榜，会显示当前累计答题最快的前10名。全部答题结束后，答对全部题目，且累计答题时间最短前10名为冲榜成功，即可获得额外奖金。</span>
							 </p>
							 <div class="decro g8"></div>
						 </div>



					   </div>

					 </div>

			 </div>
		 </section>
		 <section id="desc" class="clearfix">
			 <div class="container">

				 <div class="txt">

					 <h2 lang="cn">活动规则：</h2><br/>
					 <span lang="cn">1. 阿理彩票 有权在不事先通知玩家的情况下，更改、延迟或取消活动。</span><br/>
					 <span lang="cn">2. 玩家参加本次 阿理彩票 活动，即视为同意本活动条款。</span><br/>
					 <span lang="cn">3. 任何玩家以任何非法手段参加本次活动，将取消领奖资格。</span><br/>
					 <span lang="cn">4. 阿理彩票 保留意本次活动的最终解释权。</span>

				 </div>
			 </div>
		 </section>
 		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
header{
	height:60px;
	background:#333;
}
.popup {
	display: none;

	width: 100%;
	height: 650px;
	background: #ff809b;

	margin-top:30px;

}

.img-responsive{
	width:100%;
}
.popup .closex {
	left: 95%;
    position: relative;
    top: 0px;
    margin-top: 10px;
    font-size: 48px;
    font-weight: normal;
	cursor: pointer;

	padding-top:30px;
	margin-top:-20px;
}

.popup .closex:hover {
	color: #804dda;
}

.slider{
	/*width: 100%;*/ /*640px*/ /*Same as width of the large image*/
	position: relative;
	/*Instead of height we will use padding*/
	padding: 500px 0 150px; /*320px;*/ /*That helps bring the labels down*/

	margin: 0px auto;
	max-width: 100%;
	min-width: 550px;

	/*Lets add a shadow*/
	/*box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.75);*/
}


/*Last thing remaining is to add transitions*/
.slider>img{
	position: absolute;
	left: 100px; top: 20px;
	transition: all 0.5s;
}

.slider input[name='slide_switch'] {
	display: none;
}

.slider label:first-of-type {
	margin-left: 100px;
}

.slider label {
	/*Lets add some spacing for the thumbnails*/
	margin: 0px 0 0 8px;
	border: 3px solid transparent;

	float: left;
	cursor: pointer;
	transition: all 0.5s;

	/*Default style = low opacity*/
	opacity: 0.6;
	z-index: 100;
    position: relative;
}

.slider label img{
	display: block;
	width: 75px;
}

/*Time to add the click effects*/
.slider input[name='slide_switch']:checked+label {
	border-color: #804dda;
	opacity: 1;
}
/*Clicking any thumbnail now should change its opacity(style)*/
/*Time to work on the main ././images*/
.slider input[name='slide_switch'] ~ img {
	opacity: 0;
	transform: scale(1.1);
}
/*That hides all main ././images at a 110% size
On click the ././images will be displayed at normal size to complete the effect
*/
.slider input[name='slide_switch']:checked+label+img {
	opacity: 1;
	transform: scale(1);
}

.popup .text {
	padding-top: 10px;
	padding-left: 60px;


}

.popup .text h4{
	color: #fff!important;
	text-align:left!important;
	top: 0!important;
	font-size: 48px!important;
	border-bottom: 2px #fff solid;
	padding-bottom: 30px!important;
	text-shadow: none!important;
	font-family: Arial, "Noto Sans SC",  "Noto Sans TC", "Microsoft Jhenghei"!important;
	font-weight: bold;
}

.popup .text h5{
	display: block!important;
	width: auto!important;
	text-align:left!important;
	top: 0!important;
	font-size: 26px!important;
	padding-top: 30px!important;
	font-weight: normal;
	letter-spacing: 1px!important;
	font-family: Arial, "Noto Sans SC",  "Noto Sans TC", "Microsoft Jhenghei"!important;
}

.popup .text .title{
	color: #fff!important;
	text-align:left!important;
	top: 0!important;
	font-size: 17px!important;
	line-height: 90px;
	font-weight: bold;
	margin-right: 40px;
}

#intro{
	padding:20px 0;
	width: 100%;
	height: auto;
	min-height: 507px;
	background: url(././images/bg4.png) bottom center no-repeat #fff;
	background-position: center top;
	background-repeat: repeat;
	text-align: center;
	font-weight: bold;
}

#intro .txt{
	font-size:14px;
	line-height:22px;
	color:#663695;
}

.container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
	text-align: center;
}
#progress {
    width: 100%;
    height: auto;
    background: url(././images/bg3.png) bottom center no-repeat #ffe433;
    padding: 0px 0px 50px;
    text-align: center;
    margin-top: -20px;
    position: relative;
    z-index: 1;
}
#progress h2 {
    max-width: 100%;
    font-family: Arial, "Noto Sans SC", "Noto Sans TC", "Microsoft Jhenghei";
    font-size: 26px;
    color: #005CB7;
    font-weight: bold;
    letter-spacing: 0px;
    padding: 50px 0;
	text-transform: uppercase;
}
.stages{
	font-weight:bold;
	color:#fff;
}
#howplay .bar_1 {
    background: #6E1DFF;
    height: auto;
    padding: 20px;
	margin: 0 auto 50px;
}
#howplay .bar_2 {
    background: #663695;
    height: auto;
    padding: 20px;
	margin: 0 auto 50px;
}
#howplay .bar_3 {
    background: #6E1DFF;
    height: auto;
    padding: 20px;
	margin: 0 auto 50px;
}
#howplay .bar_4 {
    background: #663695;
    height: auto;
    padding: 20px;
	margin: 0 auto 50px;
}
#howplay .bar_5 {
    background: #6E1DFF;
    height: auto;
    padding: 20px;
	margin: 0 auto 50px;
}
#desc {
    width: 100%;
    height: auto;
    background-color: #e5e5e5;
    background-repeat: repeat;
    padding: 20px;
}
#desc .txt {
    font-size: 14px;
    line-height: 22px;
}
#desc .txt h2{
	text-align:center;
}
#desc .txt {
    font-family: Arial, "Noto Sans SC", "Noto Sans TC", "Microsoft Jhenghei";
    text-align: left;
    color: #333;
    font-weight: bold;
    letter-spacing: 0px;
    margin: 0 auto;
    max-width: 660px;
}
#logo {
    width: 240px;
    height: 53px;
    position: absolute;
    top: 5px;
    left: 60px;
	margin:auto;
    background: url(././images/ag_logo.png) center center no-repeat;
}
</style>
