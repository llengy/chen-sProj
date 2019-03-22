<template>
  <main>
    <MyHeader :headers="headerParam"/>
    <mt-navbar v-model="selected">
      <mt-tab-item id="clothes">上衣</mt-tab-item>
      <mt-tab-item id="pants">下装</mt-tab-item>
      <mt-tab-item id="shoes">鞋履</mt-tab-item>
      <mt-tab-item id="bags">箱包</mt-tab-item>
    </mt-navbar>
    <div class="section">
      <mt-loadmore :top-method="loadTop" ref="loadmore">
        <mt-tab-container v-model="selected">
          <!-- 上衣 -->
          <mt-tab-container-item id="clothes">
            <div class="nav-content">
              <FlexBox @add-to-cart="handleAdd" :data="types['clothes']" />
            </div>
          </mt-tab-container-item>
          <!-- 下装 -->
          <mt-tab-container-item id="pants">
            <div class="nav-content">
              <FlexBox @add-to-cart="handleAdd" :data="types['pants']" />
            </div>
          </mt-tab-container-item>
          <!-- 鞋履 -->
          <mt-tab-container-item id="shoes">
          <div class="nav-content">
              <FlexBox @add-to-cart="handleAdd" :data="types['shoes']" />
            </div>
          </mt-tab-container-item>
          <!-- 箱包 -->
          <mt-tab-container-item id="bags">
          <div class="nav-content">
              <FlexBox @add-to-cart="handleAdd" :data="types['bags']" />
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </mt-loadmore>
      <!-- tab-container -->
    </div>
    <div class="footer">
      <div @click="popupVisible=true" class="footer-left"></div>
      <div class="footer-center">
        <p>￥{{totalPrice | priceFilter}}</p>
        <span>另需服务费¥10.0</span>
        <span class="tip">支持自送</span>
      </div>
      <div class="footer-right" @click="handleSettle">
        去结算
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      popup-transition="popup-fade">
      123
    </mt-popup>
  </main>
</template>
<script>
import MyHeader from '@/components/header'
import FlexBox from '@/components/flexBox'
export default {
  components: {
    MyHeader,
    FlexBox
  },
  data () {
    return {
      popupVisible: false,
      categoryList:'',
      totalPrice: 0,
      headerParam: {
        title: '专业清洗',
        path: 'index',
        tabname: '首页'
      },
      selected: 'clothes',
      subAcitve: 0,
      types: {
        'clothes': [
          {type: 'clothes', goods_name: '背心', img_path: require('../../assets/types/背心.png'), price: '19'},
          {type: 'clothes', goods_name: 'T恤', img_path: require('../../assets/types/T恤.png'), price: '19'},
          {type: 'clothes', goods_name: '皮衣', img_path: require('../../assets/types/皮衣.png'), price: '19'},
          {type: 'clothes', goods_name: '单衬衫', img_path: require('../../assets/types/单衬衫.png'), price: '19'},
          {type: 'clothes', goods_name: '马甲', img_path: require('../../assets/types/马甲.png'), price: '19'},
          {type: 'clothes', goods_name: '毛衣', img_path: require('../../assets/types/毛衣.png'), price: '19'},
          {type: 'clothes', goods_name: '棉服', img_path: require('../../assets/types/棉服.png'), price: '19'},
          {type: 'clothes', goods_name: '卫衣', img_path: require('../../assets/types/卫衣.png'), price: '19'},
          {type: 'clothes', goods_name: '西装外套', img_path: require('../../assets/types/西装外套.png'), price: '19'},
          {type: 'clothes', goods_name: '羽绒服', img_path: require('../../assets/types/羽绒服.png'), price: '19'},
          {type: 'clothes', goods_name: '针织衫', img_path: require('../../assets/types/针织衫.png'), price: '19'},
          {type: 'clothes', goods_name: '真丝衬衫', img_path: require('../../assets/types/真丝衬衫.png'), price: '19'},
        ],
        'pants': [
          {type: 'pants', goods_name: '半身裙', img_path: require('../../assets/types/半身裙.png'), price: '19'},
          {type: 'pants', goods_name: '短裤', img_path: require('../../assets/types/短裤.png'), price: '19'},
          {type: 'pants', goods_name: '西裤', img_path: require('../../assets/types/西裤.png'), price: '19'},
          {type: 'pants', goods_name: '连体裤', img_path: require('../../assets/types/连体裤.png'), price: '19'},
          {type: 'pants', goods_name: '连衣裙', img_path: require('../../assets/types/连衣裙.png'), price: '19'},
          {type: 'pants', goods_name: '牛仔裤', img_path: require('../../assets/types/牛仔裤.png'), price: '19'},
          {type: 'pants', goods_name: '休闲裤', img_path: require('../../assets/types/休闲裤.png'), price: '19'},
          {type: 'pants', goods_name: '真丝裙', img_path: require('../../assets/types/真丝裙.png'), price: '19'},
        ],
        'bags': [
          {type: 'bags', goods_name: '旅行包', img_path: require('../../assets/types/旅行包.png'), price: '19'},
          {type: 'bags', goods_name: '钱包', img_path: require('../../assets/types/钱包.png'), price: '19'},
          {type: 'bags', goods_name: '手拎包', img_path: require('../../assets/types/手拎包.png'), price: '19'},
          {type: 'bags', goods_name: '手拿包', img_path: require('../../assets/types/手拿包.png'), price: '19'},
          {type: 'bags', goods_name: '书包', img_path: require('../../assets/types/书包.png'), price: '19'},
          {type: 'bags', goods_name: '双肩包', img_path: require('../../assets/types/双肩包.png'), price: '19'},
          {type: 'bags', goods_name: '托特包', img_path: require('../../assets/types/托特包.png'), price: '19'},
        ],
        'shoes': [
          {type: 'shoes', goods_name: '板鞋', img_path: require('../../assets/types/板鞋.png'), price: '19'},
          {type: 'shoes', goods_name: '单鞋', img_path: require('../../assets/types/单鞋.png'), price: '19'},
          {type: 'shoes', goods_name: '低帮帆布鞋', img_path: require('../../assets/types/低帮帆布鞋.png'), price: '19'},
          {type: 'shoes', goods_name: '高帮帆布鞋', img_path: require('../../assets/types/高帮帆布鞋.png'), price: '19'},
          {type: 'shoes', goods_name: '马丁靴', img_path: require('../../assets/types/马丁靴.png'), price: '19'},
          {type: 'shoes', goods_name: '运动鞋', img_path: require('../../assets/types/运动鞋.png'), price: '19'},
          {type: 'shoes', goods_name: '长筒靴', img_path: require('../../assets/types/长筒靴.png'), price: '19'},
        ]
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if(vm.$router.currentRoute.params.sel) {
        vm.selected = vm.$router.currentRoute.params.sel
      }
    })
  },
  mounted:function () {
    this.getCategoryList();
  },
  methods: {
    getCategoryList:function () {
      this.$ajax.post('/api/admin/cat/getCategoryList',{

      }).then(response =>{
        this.categoryList = response.data.rows;
    },response => {
        alert('找不到服务器!');
      })
    },
    activeTab(index) {
      this.subAcitve = index
    },
    loadTop() {
      this.$refs.loadmore.onTopLoaded()
    },
    handleAdd(item, index) {
      let total = 0
      this.totalPrice += Number(this.types[item.type][index].price)
      if(!this.types[item.type][index].total) {
        this.$set(this.types[item.type][index], "total", 1)
      } else {
        let total = this.types[item.type][index].total + 1
        this.$set(this.types[item.type][index], "total", total)
      }
      console.log(this.types[item.type][index],121)
    },
    handleSettle() {
      this.$router.push('/order')
    }
  }
}
</script>
<style lang="less" scoped>
main{
  height: 100%;
  position: relative;
  background: #222222;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  .mint-navbar{
    justify-content: space-around;
    padding: 0 20px;
    margin-top: 80px;
    border-bottom: 1px solid #ddd;
    background-color: #1E1D1D;
    box-shadow: 0 7px 24px 0 rgba(0,0,0,0.32);
    border-bottom: none;

    .mint-tab-item{
      font-size: 26px;
      color: #FFFFFF;
      letter-spacing: 0;
      flex: none;
    }
  }
  .mint-navbar .mint-tab-item.is-selected{
    color: #56CBAC;
    margin-bottom: -2px;
    border-bottom-color: #56CBAC;
  }
  .section{
    height: 100%;
    padding-top: 30px;
    // background: #222222;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .mint-tab-container{
      // background: #222222;
      .nav-content{
        li{
          list-style: none;
        }
        // .row{
        //   display: flex;
        //   flex-wrap: wrap;
        //   align-content: space-between;
        //   padding: 0;
        //   margin: 0;
        //   .item{
        //     flex: 1;
        //     text-align: center;
        //     height: 300px;
        //     border: 1px solid rgba(255,255,255,0.1);
        //     border-radius: 0px 19px 19px 0px;
        //     &:nth-child(2) {
        //       border-radius: 19px;
        //     }
        //     &:nth-child(3) {
        //       border-radius: 19px 0px 0px 19px;
        //     }
        //   }
        // }
      }
    }

  }
  .footer{
    display: flex;
    flex-direction: row;
    width: 670px;
    height: 148px;
    text-align: center;
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 7px 13px 0 rgba(0,0,0,0.28);
    z-index: 1;
    position: relative;
    background: url('../../assets/bg03.png') no-repeat center /cover;

    .footer-left{
      width: 131.6px;
      height: 148px;
    }
    .footer-center{
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      width: 362px;
      left: 130px;
      height: 94px;
      padding-top: 7px;
      text-align: left;
      p{
        font-size: 36px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: left;
      }
      span{
        display: inline-block;
        opacity: 0.2;
        font-family: PingFangSC-Regular;
        font-size: 21px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: left;
      }
      .tip{
        margin-left: 15px;
        padding-left: 15px;
        border-left: 2px solid rgba(255,255,255,0.8);
      }
    }
    .footer-right{
      position: absolute;
      right: 0;
      bottom: 0;
      width: 200px;
      height: 100px;
      line-height: 100px;
      font-size: 30px;
      color: #FFFFFF;
      letter-spacing: 0;
    }
  }
  .mint-popup-bottom{
    width: 100%;
    height: 45%;
  }
}

</style>

