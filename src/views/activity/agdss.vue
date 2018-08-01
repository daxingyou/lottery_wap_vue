<template>
  <div class="container" id="contain">
  </div>
</template>

<script>
export default {
    data(){
        return {
            is_gd_ali:is_gd_ali(),
        //  isAndroidWebview: location.href.indexOf('?') > -1 ? true : false
        }
    },
    created(){
        if(this.is_gd_ali == 'ali'){
            window.location.href = window.location.origin+"/activity/ali/index.html"
        }
        if(this.is_gd_ali == 'gd'){
             window.location.href = window.location.origin+"/activity/gd/index.html"
        }
    }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>

