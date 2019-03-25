<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <main class="main">
    <!--<div class="float-btn">-->
      <!--快速下单-->
    <!--</div>-->
    <div class="content">
      <div class="content-title">
        <img src="../../assets/index-logo.png" alt="">
      </div>
      <div class="flex-box category" >
        <div class="box-item" @click="goDetail('category', cats.cat_no)" v-for="(cats,index) in categoies" :key="index"  v-if="index%2==0">
          <img v-bind:src="cats.img_path">
        </div>
      </div>
      <div class="flex-box category" >
        <div class="box-item" @click="goDetail('category', cats.cat_no)" v-for="(cats,index) in categoies" :key="index"  v-if="index%2!=0">
          <img v-bind:src="cats.img_path">
        </div>
      </div>
      <div class="flex-box tips">
        <div class="box-item">
          <div class="icons">
            <img src="../../assets/icons/icon01.png" alt="">
          </div>
          <span>高端</span>
        </div>
        <div class="box-item">
          <div class="icons">
            <img src="../../assets/icons/icon02.png" alt="">
          </div>
          <span>省时</span>
        </div>
        <div class="box-item">
          <div class="icons">
            <img src="../../assets/icons/icon03.png" alt="">
          </div>
          <span>便捷</span>
        </div>
        <div class="box-item">
          <div class="icons">
            <img src="../../assets/icons/icon04.png" alt="">
          </div>
          <span>安心</span>
        </div>
      </div>
      <div class="swipe-box">
        <mt-swipe :auto="4000">
          <mt-swipe-item>
            <div class="bar">
              <span>渝中区用户 </span>
              <span>188****4527</span>
            </div>
            <div class="txt">
              很实惠的平台，解决了都市生活中对各种衣服的洗护，节省了很多时间。
服务质量也很好！会继续支持的！
            </div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="bar">
              <span>江北区用户 </span>
              <span>188****4527</span>
            </div>
            <div class="txt">
              很实惠的平台，解决了都市生活中对各种衣服的洗护，节省了很多时间。
服务质量也很好！会继续支持的！
            </div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="bar">
              <span>九龙坡区用户 </span>
              <span>188****4527</span>
            </div>
            <div class="txt">
              很实惠的平台，解决了都市生活中对各种衣服的洗护，节省了很多时间。
服务质量也很好！会继续支持的！
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      categoies:'',
    }
  },
  mounted:function () {
    this.getCategories();
    this.selected = this.$router.currentRoute.params.sel;
  },
  methods: {
    /**
     * 获取到所有分类
     */
    getCategories:function () {
      this.$http.post(this.$Api.categoryList,{
      }).then(response =>{
        this.categoies = response.data.data.rows;
        // alert( response.data.data.rows)

    },response => {
        this.$toast('找不到服务器!');
      })
    },
    goDetail(path, item) {
      this.$router.push({
        name: path,
        params: {
          sel: item
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main{
  height: 100%;
  background: #222222;
  position: relative;
  .float-btn{
    position: fixed;
    width: 104px;
    height: 104px;
    line-height: 104px;
    right: 30px;
    top: 257px;
    border-radius: 50%;
    background-image: linear-gradient(to bottom, #70E2C3, #128F70);
    // background-image: radial-gradient(8% 127%, #70E2C3 0%, #128F70 100%);
    box-shadow: 0 7px 13px 0 rgba(0,0,0,0.28);
    font-size: 18px;
    color: #FFFFFF;
    text-align: center;
    letter-spacing: 0;
  }
  .content{
    height: 100%;
    background: url('../../assets/index-bg01.png') no-repeat top /cover;
    background-size: 100% 691.6px;
    .content-title{
      img{
        position: relative;
        top: 89px;
        left: 50%;
        transform: translateX(-50%);
        height: 60.2px;
      }
    }
    .flex-box{
      padding: 0 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .category{
      &:nth-child(2){
        margin-top: 368px;
      }
      .box-item{
        width: 330px;
        img{
          width: 330px;
        }
      }
    }
    .tips{
      margin-top: 60px;
      justify-content: space-around;
      .box-item{
        text-align: center;
        .icons{
          width: 121px;
          height: 121px;
          background: #2C2C2C;
          border-radius: 20px;
          margin-bottom: 15px;
          img{
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            width:57px;
          }
        }
        span{
          opacity: 0.8;
          font-size: 24px;
          color: #FFFFFF;
          letter-spacing: 0;
        }
      }
    }
    .swipe-box{
      margin-top: 60px;
      padding: 0 30px;
      height: 309px;
      margin-bottom: 60px;
      .mint-swipe{
        .mint-swipe-item{
          background: url('../../assets/index-bg02.png') no-repeat center /cover;
          text-align: center;
          .bar{
            width: 363px;
            height: 39px;
            line-height: 39px;
            opacity: 0.57;
            background-image: radial-gradient(8% 127%, #70E2C3 0%, #128F70 100%);
            box-shadow: 0 7px 13px 0 rgba(0,0,0,0.28);
            border-radius: 19.5px;
            text-align: center;
            margin: 0 auto;
            margin-top: 30px;
            span{
              line-height: 39px;
              font-size: 21px;
              color: #FFFFFF;
              letter-spacing: 0;
              text-align: center;
            }
          }
          .txt{
            padding: 0 44px;
            margin-top: 65px;
            font-size: 24px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
            line-height: 33px;
          }
        }
        /deep/ .mint-swipe-indicator.is-active{
          opacity: 1;
        }
      }
    }
  }
}
</style>


