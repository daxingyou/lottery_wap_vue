<template>
  <div>
    <i-header title="修改密码"></i-header>
    <div class="link-lists-container">
      <ul class="link-lists">
        <li class="link-item" @click="gotoAddress">修改登录密码 <img :src="$getPublicImg('/images/jiantou.png')" alt=""/></li>
        <li class="link-item" @click="gotoAddressz">修改支付密码<img :src="$getPublicImg('/images/jiantou.png')" alt=""/></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import iHeader from '../../components/i-header'
  export default {
    components: {
      iHeader
    },
    data() {
      return {
       is_gd_ali: is_gd_ali(),
      }
    },
    methods: {
   gotoAddress(){
   	this.$router.push('/passwordD')

    },
    gotoAddressz(){
    	this.$router.push('/passwordZ')

   	 }
    },
  
  }
</script>

<style lang="less" scoped>
@import '../../assets/less/variable.less';
  .link-lists-container {
    margin-top: 2.5rem;
    border-top: 1px solid #ccc;
  }
  .link-lists {


  }
  .link-item{
    width: 100%;
    height: 2rem;
    text-align: left;
    line-height: 2rem;
    font-size: 0.7rem;
    border-bottom: 1px solid #ccc;
    padding-left: 1.5rem;
    background-color: #ffffff;
    >img {
      margin-right: 0.5rem;
      width: 0.4rem;
      float: right;
      margin-top: 0.5rem;
    }
  }
</style>
