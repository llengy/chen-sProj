<template>
  <main>
    <MyHeader :headers="headerParam"/>
    <section>
      <ul class="flex-list">
        <li class="list-item">
          <div class="item-top">
            <span>小陈</span>
            <span>18858590000</span>
          </div>
          <p class="item-bottom">吉林省长春市绿园区西环城路与四联大街交汇处全季酒店</p>
          <router-link to="/addrModify">
            <i class="cus-icon-edit"></i>
          </router-link>
        </li>
        <li class="list-item">
          <div class="item-top">
            <span>小陈</span>
            <span>18858590000</span>
          </div>
          <p class="item-bottom">吉林省长春市绿园区西环城路与四联大街交汇处全季酒店</p>
          <router-link to="/addrModify">
            <i class="cus-icon-edit"></i>
          </router-link>
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
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.headerParam.path = vm.$router.currentRoute.params.path
    })
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


