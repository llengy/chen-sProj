<template>
  <main class="main">
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="首页">
        <indexPage ref="indexPage"></indexPage>
      </mt-tab-container-item>
      <mt-tab-container-item id="订单">
        <ordersPage ref="order"></ordersPage>
      </mt-tab-container-item>
      <mt-tab-container-item id="我的">
        <userCenter ref="userCenter"></userCenter>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="首页">
        <img slot="icon" v-show="selected !=='首页'" src="../assets/icons/home.png">
        <img slot="icon" v-show="selected ==='首页'" src="../assets/icons/home-active.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon" v-show="selected !=='订单'" src="../assets/icons/order.png">
        <img slot="icon" v-show="selected ==='订单'" src="../assets/icons/order-active.png">
        订单
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" v-show="selected !=='我的'" src="../assets/icons/user.png">
        <img slot="icon" v-show="selected ==='我的'" src="../assets/icons/user-active.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
    
  </main>
</template>
<script>
import indexPage from '@/views/tabs/indexPage'
import ordersPage from '@/views/categories/index'
import userCenter from '@/views/tabs/userCenter'
export default {
  components: {
    indexPage,
    ordersPage,
    userCenter
  },
  data() {
    return {
      selected: '首页'
    }
  },
  beforeRouteEnter  (to, from, next) {
    next(vm => {
      console.log(vm.$router.currentRoute, 54)
      if(vm.$router.currentRoute.params.sel) {
        vm.selected = vm.$router.currentRoute.params.sel
        
      }
    })
  }
}
</script>

<style lang="less" scoped>
.main{
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #222222;
  .mint-tabbar{
    height: 102px;
    background-color: #1E1D1D;
    background-image: none;
    position: relative;
    color: #fff;
    opacity: 0.8;
  }
  .mint-tabbar>.mint-tab-item.is-selected{
    color: #56CBAC;
    background: #1E1D1D;
  }
  .page-tabbar-container{
    flex: 1;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    
    /deep/ .mint-tab-container-wrap{
      height: 100%;
    }
  }
}
</style>


