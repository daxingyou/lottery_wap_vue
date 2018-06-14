<template>
    <div id="contain">
        <div class="title color1"  v-if='!isAndroidWebview'>
            <i @click="goBack()"></i>
            <span>捕鱼王</span>
        </div>
        <div id="wrap" class="clearfix" :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
            <div id="wrapper-header" >
                 <img src="/wap/images/ali/logo.png" width="150" style="position:relative;left:-5rem"/>
            </div>
            <div id="menu-bg"></div>
            <div id="wrapper-banner">
                <div class="homeSlideShow">    
                    <div class="swiper-container" style="top:50px;">
                        <img src="/wap/images/ali/bg.jpg"  lang="cn" data-lang-token="FLAG" width="100%"/>               	
                        <div class="swiper-pagination"></div>
                    </div>            
                </div>
                <div class="sep-0"></div>
            </div>
            <div id="wrapper-section2">
                <div class="sections section2">
                    <h2 lang="cn">活动时间</h2>
                    <div class="s2a inner">
                        <p lang="cn"> 
                            <span lang="cn">2018年3月20-22号（周二至周四），20：00-23：00（北京时间）</span>
                        </p>
                    </div>
                    <h2 lang="cn">参与玩家及客户端</h2>
                    <div class="s2b inner">
                        <p lang="cn">
                            <span lang="cn">参与玩家：阿理捕鱼王真钱玩家。</span><br/>
                            <span lang="cn">客户端：手机网页，PC网页。</span>
                        </p>
                    </div>
                    <h2 lang="cn">活动规则及流程</h2>
                    <div class="s2c inner">
                        <p lang="cn" style="text-align:left">
                            <span lang="cn">1.活动期间，凡是登录捕鱼王大厅的真钱玩家，均有机会领取一笔神秘礼金，每个用户每天限领1次。</span><br/>
                            <span lang="cn">2.此次活动的奖金使用和转出无任何限制。数量有限，先到先得。阿理捕鱼王开发团队保留本次活动所有解释权。</span>
                        </p>
                    </div>
                </div>
            </div> 
            <div id="wrapper-section4">
                <div class="sections section4">
                    <div class="inner">
                        <p lang="cn">
                            <img src="/wap/images/ali/s4b.png"  lang="cn" data-lang-token="FLAG"/><br/><br/>
                            <span lang="cn">本次活动最终解释权归阿理彩票所有。</span>
                        </p>
                    </div> 
                </div>
            </div>
            <div id="wrapper-footer">
                <div id="footer">
                    Copyright © 2012-2018 ALI. All Rights Reserved.
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            is_gd_ali: is_gd_ali(),
      		isAndroidWebview: location.href.indexOf('?') > -1 ? true : false,
            transform:'',
            panelShow:false,
            title:'',
            times:'0',
            
            isWan:'',
            titleshow:true,
            erreocode:'',
      		promptboxtext:'',
          panelShow:false,
          promptboxshow:true,
          successshow:false
        }
    },
    methods: {
      goBack(){
        history.go(-1);
      }
    }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
    .title{
        width: 100%;
        height: 90/46.875rem;
        background:#146cdc !important;
        line-height: 90/46.875rem;
        text-align: center;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        i {
            display: block;
            width: 35/46.875rem;
            height: 50/46.875rem;
            background: url('@{public_img}/images/backing_out.png') no-repeat;
            background-size:100% 100%;
            position: absolute;
            left: 0.5rem;
            top: 0.4rem;
        }
        span{
            color: #FFFFFF;
            font-size: 0.8rem;
        }
	}
    #wrap{
        background:#d6cfbe;
        text-align: center;
    }
    .section2 .s2a.inner{ 
        background: url("/wap/images/ali/border_s.png") top center no-repeat; 
        min-height:215px; 
        padding: 50px 50px 0;
    }
    .section2 .s2b.inner{ 
        background: url("/wap/images/ali/border_s.png") top center no-repeat; 
        min-height:215px; 
        padding: 50px 50px 0;
    }
    .section2 .s2c.inner{ 
        background: url("/wap/images/ali/border.png") top center no-repeat;  
        padding: 50px 50px 0;
        min-height: 330px;
    }
    .section2 .inner p{
        color:#9f8f82;
    }
    #wrapper-footer{
        position: relative;
        margin: 0 auto;
        max-width: 1920px;
        background: #fff
    }
    #footer{
        position: absolute;
        padding:35px 0;
        font-size:16px;
        font-weight:bold;
        color:#797979;
        width:100%;
        box-shadow:insit 0 2px 2px #ccc;
    }
    #wrapper-header{
        width:100%; 
        height:50px; 
        margin:0 auto; 
        max-width:1920px; 
        position:fixed; 
        z-index:1004;
        background: #fff; 
        }
    #header{ 
        position:relative; 
        margin:0 auto; 
        max-width:1920px; 
        height:80px; 
        -webkit-box-shadow: inset 0px -4px 10px #9F9F9F; 
        -moz-box-shadow: inset 0px -4px 10px #9F9F9F; 
        box-shadow: inset 0px -4px 10px #9F9F9F;
        top:-19px;
    }
    .mobile-menu-btn {
        position: absolute;
        top: 11px;
        right: 30px;
        width: 20px;
        height: 30px;
        display: none;
        background: url(/wap/images/ali/mobile-menu-btn.png) center center no-repeat;
        cursor: pointer;
    }
    .wrapper-slide-menu {
        position: fixed;
        top: 50px;
        width: 100%;
        overflow: auto;
    }
    .slide-menu {
        width: 100%;
        height: auto;
        position: relative;
        display: none;
    }
    ol,ul{
        list-style: none;
        margin:0;
        padding:0;
    }
    @media (max-width: 1600px) {
        #wrapper-news .news-select .inner{ 
            margin-left: 160px; 
            margin-right: 160px;
        }
        #wrapper-news .news-select .inner .one_third img{ 
            margin: 0;
        }
        #wrapper-news .news-detail .inner{ 
            margin-left: 160px; 
            margin-right: 160px;
        }
        .jul17 .tt{ 
            margin-left:-150px;
        }
        .section2 .qex1:before, .qex2:before{ 
            top:180px; 
            left:-40px;
        }
        .section1 .inner, .section3 .inner{ 
            padding: 80px 50px 70px;
        }
        .section3{
            width: 90%; 
        }
        .section4, .sectionX{ 
            min-height: 300px; 
        } 
        .section5{ 
            min-height: 100%;
        }
    }
@media (max-width: 1400px) {
	.section4 .half img{ 
        margin-top: -50px;
    }
}

@media (max-width: 1200px) {
	.tablinks img{ 
        width: 140px;
    }
	#logo{ 
        left: 10px;
    }
	.news-title{ 
        text-indent: 66px!important;
    }
	#wrapper-news .news-select .inner{ 
        margin-left: 66px; 
        margin-right: 66px;
    }
	#wrapper-news .news-detail .inner{ 
        margin-left: 66px; 
        margin-right: 66px;
        }
	#wrapper-news .news-select .inner .intro h3{ 
        color:#ffae00; 
        font-size:32px; 
        line-height: 36px; 
        font-weight:bold; 
        text-shadow: 3px 2px 8px rgba(0,0,0, 0.2);
    }
	#wrapper-news .news-select .inner .intro p{ 
        color:#fff; 
        font-size:17.96px; 
        line-height: 22px; 
        font-weight:regular;
        text-shadow: 3px 2px 8px rgba(0,0,0, 0.3); 
        max-width: 330px; 
        min-height: 100px; 
        margin-top:10px;
    }
	#wrapper-product .product-select a span,#wrapper-product .product-select span span{ 
        font-size:24px; 
        margin-left: 0!important;
    }
	#wrapper-product .product-select .multiimg{ 
        left:60px;
    }	
	.section2 .qexg .qex{
        width: 100%; 
        max-width:none;
    }
	.section2 .qex .content{
        padding-bottom: 70px;
    }
	.section2 .qex1:before, .qex2:before{ 
        transform: rotate(90deg); 
        width:100%; 
        top:480px; 
        left:-23px;
    }
	.section2 .qex1, .section2 .qex2, .section2 .qex3 {
        float:inherit; 
        clear:both;
        padding-bottom: 10%;
    }
	.section4, .sectionX{ 
        min-height: 350px; 
    } 
	.section4 .half img, .sectionX .half img{ 
        margin-top: -10px; 
    }
}
@media (max-width: 1060px) {
	#wrap{ 
        padding: 0; 
    }
	#subheader, #submenu{ 
        display: none;
    }
	.section2 .qex1:before, .qex2:before { 
        transform: rotate(90deg); 
        width:100%; 
        top:450px;
    }
}
@media (max-width: 980px) {	
	#header{ 
        height:50px; 
    }	
	#logo{ 
        width: 40%;  
        top:0px; 
        left:10px; 
    }
	#logo span{ 
        font-size:14px; 
    }
	.footicon{ 
        top:60px; 
        left:10px; 
    }
	.news-title{ 
        text-indent:30px!important; 
    }
	.one_third{ 
        width: 50%;
    }
	.two_third{ 
        width: 50%;
    }
	.half{ 
        width: 100%;
    }
	#wrapper-news .news-select .inner{ 
        margin-left: 30px; 
        margin-right: 30px;
    }
	#wrapper-news .news-select .inner .imargin{ 
        padding: 0 5px;
    }
	#wrapper-news .news-detail .inner{ 
        margin-left: 30px; 
        margin-right: 30px;
    }
	.product .inner .text table{ 
        width:100%; 
    }
	.service .inner .wrap .one_fourth{ 
        width:50%; 
        min-height: 580px;
    }
	.main-slide{ 
        margin-top: -50px; 
        top: 50px!important; 
        padding-top: 25px;
    }
	.main-slide2{ 
        margin-top: -50px; 
        top: 50px!important;
        padding-top: 25px;
    }
	.homeSlideShow .desktop{ 
        display:none!important; 
    }
	.homeSlideShow .mobile{ 
        display:block!important; 
    }
	.main-slide img{ 
        padding-top: 20px!important;
    }
	.multi-play{ 
        background: none;
    }
	#loader{
        display:none!important; 
    }
	
    .emenu>ul>li>a{ 
        font-size: 18px; 
        padding: 0 20px;
    }
	.sections{ padding: 50px;}
	.sections .half{ text-align:center;}
	.sections img{ max-width:100%; }
	.sections .qex{ min-height: 500px;}
	.sections .one_third{ width: 100%;}
	.section1{ margin-top: 50px;}
	.section1 .inner, .section3 .inner{ padding: 50px 0 0 0;}
	.sectionX .inner, .section4 .inner{ padding: 40px 0 80px 0;}
	.section2 .qex1:before, .qex2:before{ top: 400px;}
	.section2 .qexg{ margin-top: 150%;}
	.section2 .qexg .qex{ top: 300px;}	
	.section2 .qexg .qex .title{ margin-top: 60px; }
	.section3{ width: auto; }
	.section4 .half img, .sectionX .half img { position:relative}
	.section8 img{ max-width: 150px;} 
	// #wrapper-banner{ margin-top: 3.5rem;}
	#language-desktop{ display:none; }
	#menu{ display:none; }
	.mobile-menu-btn{ display:block; }	
}

@media (max-width: 840px) {
	.product .inner{ padding: 50px 20px; }
	.product .inner	.half{ width:100%; }
	.product .inner .image .playnow{ margin: 20px 0;}
	.modalDialog .prev{ top: 150px!important; margin: 15px!important;}
	.modalDialog .next{ top: 150px!important; margin: 15px!important;}
	.tablinks img{ width: 120px; margin: 0;}
	#wrapper-footer{ height: 150px;}
	
	.section2 .inner{ min-height: auto; background-size: cover;}
	.section2 .s2c.inner{ padding: 50px 0px 0;}
	.section2 .qex1:before, .qex2:before{ top: 300px;}
	.sectionX .half img, .section4 .half img {margin-top: -130%;}
}

@media (max-width: 640px) {
	#wrapper-product .product-title{ padding: 30px 0 0 0;}
	#wrapper-product .product-select { padding: 30px 0 30px 0; }
	.one_third	{ width:100%; }
	.two_third  { width:100%;}
	.one_fourth	{ width:50%; }
	#wrapper-news .news-select .inner .one_third { width:100%;}
	#wrapper-news .news-detail .inner img{ width:100%;}
	.about-us .inner h2 { padding-bottom: 30px;}
	.service .inner .wrap .one_fourth{ width:100%;}
	.service .inner .intro p { margin: 35px auto; }
	.service .inner h2 { padding-bottom: 30px;}
	.contact-form .inner h3{ padding-bottom: 30px;}
	.section2 .inner{ padding: 20px 30px 0;}
	.section2 .inner p{ font-size: 18px;}
	.section2 .qex1:before, .qex2:before{ top: 200px;}
	.section2 .qexg { margin-top: 180%;}	
}
@media (max-width: 560px) {
	.product .inner .text h2{ font-size:30px; }
	.modalDialog .prev{ top: 100px!important; margin: 15px!important;}
	.modalDialog .next{ top: 100px!important; margin: 15px!important;}
	#wrapper-product .product-select img{ margin: 20px 0; /*padding-left: 60px*/}
	#wrapper-product.product2-list .product-select img {padding-left: 0px;}
	#wrapper-product .product-select a span,
	#wrapper-product .product-select span span{ font-size:26px;}
	.section4 .half img, .sectionX .half img{margin-top: -160%;}
}

@media (max-width: 480px) {
	#wrapper-product .product-title{ font-size:36px; line-height: 42px;}
	#wrapper-product .product-title	img{ width: 20%;}
	#wrapper-news .news-detail .inner .intro h3 { font-size:36px; line-height: 40px;}
	#wrapper-news .news-detail .inner .intro h4 { font-size:28px; line-height: 40px;}
	#wrapper-news .news-detail .inner .intro h5 { font-size:20px; line-height: 24px;}
	#wrapper-product .product-select{ margin: 0;}
	#wrapper-product.product2-list .product-select{ margin: 0;}
	#footer{left: 0;line-height: 32px;}
	.footicon{left: 50px; /*padding: 0;*/ margin: 0 10px 0 0; width: 200px;}
	.footicon span{width: 100px; display: inline-block;}
	.footicon>ul>li{margin: 0 5px 0 0; }
	.emenu>ul>li{margin: 0 20px; padding: 35px 0 0 0;}
	.sections .inner { padding: 30px 0 30px;}
	.sections .inner h2{ font-size: 28px;} 
	.sections .inner p { font-size: 12px; line-height: 32px;} 
	.sections .inner li { font-size: 18px;}
	.section2 h2{ font-size: 22px;}
	.section2 .s2b.inner{ padding: 50px 0 0;}
	.section2 .qex .title{ font-size: 28px; line-height: 32px;}
	.section2 .qex .content	{ font-size: 18px;}
	.section2 .qex1:before, .qex2:before{ top: 100px;}
	.section2 .qexg{ margin-top: 200%;}
}
@media (max-width: 340px) {
	.product .inner .image .playnow{ background-size: 70%; margin: 20px -20px; text-indent: -100px;}
	.product .inner .text .multilogo{ margin: 10px;}
	.modalDialog { padding-top: 10%}
	#wrapper-product .product-select a span,
	#wrapper-product .product-select span span{ font-size:16px; }
	#wrapper-product .product-select .multiimg { left:60px;}
	.sections{ padding: 0 20px!important;}
	.section2 .qex .content{ margin: 0;}
	.section2 .half img { top: 450px;}
	.section2 .qexg { margin-top: 400%!important;}
	.sections .one_third{ background: #203f81;}
}
@media (max-width: 400px) {
	.jul17 .tt{ margin-left:-100px;}
	.section2 .qexg{ margin-top: -450px;}
}
</style>
