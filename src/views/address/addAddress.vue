<template>
  <main>
    <MyHeader :headers="headerParam"/>
    <div class="form-box">
      <mt-field label="收获地址：" placeholder=" 例: xx省xx市xx区xx小区xx楼xx室" v-model="address"></mt-field>
      <mt-field label="联系人：" placeholder=" 请填写收货人的姓名" type="text" v-model="username"></mt-field>
      <mt-field label="联系方式：" placeholder=" 请填写收货人的手机号码" type="tel" v-model="phone"></mt-field>
    </div>
    <div class="btn">
      保存地址
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
        title: '地址管理',
        path: 'address',
        tabname: ''
      },
    }
  }
}
</script>
<style lang="less" scoped>
main{
  height: 100%;
  background: #222222;
  position: relative;
  
  .form-box{
    padding: 20px;
    margin-top: 80px;
    /deep/ .mint-field{
      background: #222222;
      &:last-child{
        .mint-cell-wrapper{
          border-bottom: none;
        }
      }
      .mint-cell-wrapper{
        border-bottom: 2px solid rgba(110,108,108,0.6);
        background-image: none;
      }
      .mint-cell-title{
        width: 160px;
        font-size: 26px;
        color: #FFFFFF;
        letter-spacing: 0;
      }
      .mint-cell-value{
        input{
          opacity: 0.5;
          font-size: 22px;
          color: #FFFFFF;
          letter-spacing: 0;
          background: transparent;
        }
      }
    }
  }
  .btn{
    width: 258px;
    height: 66px;
    line-height: 66px;
    position: absolute;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(112,226,195,1);
    box-shadow: 0 7px 13px 0 rgba(0,0,0,0.28);
    border-radius: 47px;
    font-size: 28px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
  }
}
</style>


