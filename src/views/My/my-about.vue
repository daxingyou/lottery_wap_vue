<template>
  <div>
    <i-header class="color1" title="关于我们" v-if="!isAndroidWebview"></i-header>
    <div class="trone"  :style="{'margin-top':isAndroidWebview ? 'rem':'1rem'}">
      <div class="trone-image-holder my_about_tron_logo">
      </div>
      <div class="my_about_tron_text">
        <p>TEL : {{tel}} </p>
        <p>EMAIL : {{email}}</p>
      </div>
    </div>
    <div class="message-container">
      <p>
        {{contents}}
      </p>
    </div>
    <div class="foot_bbh">
      {{copy}} <br/>
      <a v-show="isAli != '618cp'" href="https://want-gaming.com" target="_blank" >万游科技提供技术支持</a>
    </div>
      <promptbox  @panelShow="panelShow=false" :successshow="successshow" :promptsystem="promptsystem" :promptboxshow="promptboxshow" :panelShow="panelShow" 
   	:promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>

</template>
<script>
  import iHeader from '../../components/i-header'
  import promptbox from '../../components/promptbox'
  export default {
    data() {
      return {
      	isAndroidWebview: location.href.indexOf('?') > -1 ? true : false,
         erreocode:'',
        promptboxtext:'',
        panelShow:false,
        promptboxshow:true,
        promptsystem:'',
        successshow:false,
        isAli: is_gd_ali(),
        num:'',
        tel:'',
        email:''
      }
    },
    components: {
      iHeader,
      promptbox
    },
    created(){
      this.site();
    },
    methods:{
      site(){
        this.$http.post(`${getUrl()}/Systems/getSiteBasicInfo`).then(res => {
          console.log(res)
          this.tel = res.data.tel;
          this.email = res.data.email
          this.contents = res.data.description
          if (res.data.copyright.length > 6) {
            this.copy = res.data.copyright
          } else {
            let year = new Date().getFullYear();
            this.copy = 'Copyright © ' + res.data.copyright + '-' + year + '  All Right Reserved';
          }
        })
      }
    }

  }
</script>
<style lang="less" scoped>
@import '../../assets/less/variable.less';
  .trone {

  }
  .foot_bbh{
    font-size:12px;
    margin:auto;
    color:#666666;
    text-align: center;
    width:100%;
    margin-top:1.8rem;
    > a{
      color:#4975ca;
    }
  }

  .trone-image-holder {
    width: 400/46.875rem;
    height: 106/46.875rem;
    /* position: absolute; */
    background-position: center;

    margin: 2rem auto 0.5rem auto;
    background-size: contain;
  }

  .my_about_tron_text {
    width: 100%;
    > p {
      text-align: center;
      color: #969696;
      font-size: .5rem;
    }
  }

  .message-container {
    margin-top: 1rem;
    border: 1px solid #ccc;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 10px 10px 10px 10px;
    p{
      font-size: 0.6rem
    }
  }

  .link-lists {
    list-style: none;
    background-color: #ffffff;
  }

  .link-item {
    width: 100%;
    height: 2rem;
    text-align: left;
    line-height: 2rem;
    font-size: 0.7rem;
    border-bottom: 1px solid #cccccc;
    padding-left: 1.5rem;
    position: relative;
    > img {
      margin-right: 0.5rem;
      width: 0.4rem;
      float: right;
      margin-top: 0.5rem;
    }
  }

  .link-text-right {
    position: absolute;
    right: 1.5rem;
    color: #cccccc;
  }
  .rights-container {
    margin-top: 1rem;
    >p {
      text-align: center;
      font-size: 0.5rem;
      color: #5f5f5f;
      padding: 0 10px
    }
  }
</style>
