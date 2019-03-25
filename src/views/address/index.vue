<template>
  <main>
    <mt-header fixed  title="地址管理">
      <div @click="goBack" slot="left">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>
    <section>
      <ul class="flex-list">
        <li class="list-item" v-for="(item, index) in address" :key="index" >
          <div @click="selectAddr(item)">
            <div class="item-top" >
              <span>{{item.recevier}}</span>
              <span>{{item.mobile}}</span>
            </div>
            <p class="item-bottom" >{{item.address}}</p>
          </div>
          <i @click="goEdit(item)" class="cus-icon-edit"></i>
        </li>
      </ul>
      <div class="btn-add">
        <router-link to="/addrModify">
          新增地址
        </router-link>
      </div>
    </section>
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
          path: 'index',
          tabname: '首页'
        },
        address:[]
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.headerParam.path = vm.$router.currentRoute.params.path
    })
    },
    computed:{

    },
    mounted:function () {
      this.getAddress();
    },
    methods: {
      goBack() {
        this.$router.back(-1)
      },
      goEdit(data) {
        // this.$router.push('addrModify')
        this.$router.push({
          name: 'addrModify',
          params: {
            address: data
          }
        })
      },
      selectAddr(data) {
        this.$router.push({
          name: 'order',
          params: {
            selectedAddress: data
          }
        })
      },
      getAddress(){
        this.$http.post(this.$Api.custAddress,{custId:this.$store.state.session.currentUser.cust_id}
        ).then(response =>{
          if(this.$global.successCode == response.data.code){
          console.log(response.data.data.rows[0]);
          this.address =  response.data.data.rows;
        }else{
          this.$toast(response.data.desc);
          return null;
        }
      },response=>{
          this.$toast('找不到服务器');
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  main{
    height: 100%;
    section{
      height: 100%;
      padding: 30px;
      margin-top: 80px;
      background: #222222;
      .flex-list{
        display: flex;
        flex-direction: column;
        .list-item{
          box-sizing: border-box;
          position: relative;
          padding: 23px;
          height: 144px;
          background: rgba(59,59,59,0.7);
          border-radius: 4px;
          margin-bottom: 30px;
          opacity: 0.6;
          font-size: 35px;
          color: #FFFFFF;
          letter-spacing: 0;
          &:first-child{
            opacity: 1;
            background: rgba(59,59,59,1);
          }
          .item-top{
            margin-bottom: 20px;
            span{
              &:first-child{
                margin-right: 53px;
              }
            }
          }
          .item-bottom{
            font-size: 20px;
            color: #FFFFFF;
            letter-spacing: 0;
          }
          .cus-icon-edit{
            display: inline-block;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: 34px;
            height: 34px;
            background: url('../../assets/icons/pen.svg') no-repeat center /cover;
            background-size: 34px;
          }
        }
      }
      .btn-add{
        background: rgba(59,59,59,0.7);
        border-radius: 4px;
        height: 144px;
        line-height: 144px;
        text-align: center;
        font-size: 34px;
        a{
          color: #FFFFFF;
          letter-spacing: 0;
          text-decoration: none;
        }
      }
    }
  }
</style>


