<template>
  <main>
    <MyHeader :headers="headerParam"/>
    <div class="section">
      <mt-navbar v-model="selected">
        <mt-tab-item id="clothes">洗衣</mt-tab-item>
        <mt-tab-item id="shoes">洗鞋</mt-tab-item>
        <mt-tab-item id="home-textile">洗家纺</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="clothes">
          <div class="sub-nav">
            <span @click="activeTab(0)" class="sub-nav-item" :class="{active: subAcitve === 0}">上衣</span>
            <span @click="activeTab(1)" class="sub-nav-item" :class="{active: subAcitve === 1}">大衣外套</span>
            <span @click="activeTab(2)" class="sub-nav-item" :class="{active: subAcitve === 2}">裤装裙装</span>
            <span @click="activeTab(3)" class="sub-nav-item" :class="{active: subAcitve === 3}">配件</span>
          </div>
          <div class="nav-content">
            <ul class="row">
              <li class="item">1</li>
              <li class="item">2</li>
              <li class="item">3</li>
            </ul>
            <ul class="row">
              <li class="item">1</li>
              <li class="item">2</li>
              <li class="item">3</li>
            </ul>
            <ul class="row">
              <li class="item">1</li>
              <li class="item">2</li>
              <li class="item">3</li>
            </ul>
            <ul class="row">
              <li class="item">1</li>
              <li class="item">2</li>
              <li class="item">3</li>
            </ul>
            <ul class="row">
              <li class="item">1</li>
              <li class="item">2</li>
              <li class="item">3</li>
            </ul>
          </div>
        </mt-tab-container-item>

        <mt-tab-container-item id="shoes">
          
        </mt-tab-container-item>
        
        <mt-tab-container-item id="home-textile">
         
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="footer">
      现在预约
    </div>
  </main>
</template>
<script>
import MyHeader from '@/components/header'
export default {
  components: {
    MyHeader
  },
  data () {
    return {
      headerParam: {
        title: '专业清洗',
        path: 'index',
        tabname: '首页'
      },
      selected: 'clothes',
      subAcitve: 0
    }
  },
  methods: {
    activeTab(index) {
      this.subAcitve = index
    }
  }
}
</script>
<style lang="less" scoped>
main{
  height: 100%;
  position: relative;
  .section{
    height: 100%;
    margin-top: 40px;
    .mint-navbar{
      padding: 0 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }
    .mint-navbar .mint-tab-item.is-selected{
      margin-bottom: -2px;
    }
    .sub-nav{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 0 20px 20px 20px;
      border-bottom: 1px solid #ddd;
      .sub-nav-item{
        display: inline-block;
        height: 25px;
        width: 70px;
        line-height: 25px;
        border-radius: 25px;
        border: 1px solid #ddd;
        text-align: center;
        font-size: 13px;
      }
      .active{
        border-color: tomato;
        background: tomato;
        color: #fff;
      }

    }
    .nav-content{
      li{
        list-style: none;
      }
      .row{
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        padding: 0;
        margin: 0;
        .item{
          flex: 1;
          text-align: center;
          height: 120px;
          border-right: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
  .footer{
    display: block;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    position: fixed;
    bottom: -1px;
    border: 1px solid #ddd;
    opacity: 0.7;
    background: turquoise;
    color: #fff;
    font-size: 20px;
  }
}

</style>

