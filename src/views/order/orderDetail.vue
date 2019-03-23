<template>
  <main>
    <MyHeader :headers="headerParam"></MyHeader>
    <section>
      <div class="flex">
        <div class="flex-item order-box">
          <div class="box-title">
            <i class="box-icon icon-note"></i>
            订单详情
          </div>
          <div class="box-content">
            <p>订单编号: 10001</p>
            <p>取件时间: 2019.04.01  08:00 - 09:00</p>
            <p>备注信息: 暂无备注</p>
            <p>干洗门店: 绿园区一店</p>
          </div>
        </div>
        <div class="flex-item order-detail">
          <p class="box-title">洗涤明细</p>
          <ul class="box-content">
            <!-- <li class="box-item" v-for="(item, index) in goods" :key="index">
              <p>
                <span>{{item.name}}</span>
                <span>x{{item.count}}</span>
              </p>
              <span>￥{{item.price | priceFilter}}</span>
            </li> -->
            <li class="box-item">
              <p>
                <span>单衬衫</span>
                <span>x1</span>
              </p>
              <span>￥19</span>
            </li>
            <li class="box-item">
              <p>
                <span>单衬衫</span>
                <span>x1</span>
              </p>
              <span>￥19</span>
            </li>
          </ul>
        </div>
        <div class="flex-item delivery-box">
          <div class="box-title">
            <i class="box-icon icon-car"></i>
            状态信息
          </div>
          <div class="box-content">
            <ul class="flex timeline">
              <li class="timeline-item">
                <i class="timeline-step"></i>
                <span class="timeline-btn">待付款</span>
                <p class="timeline-time">状态改变时间: 2019.04.01 08:40</p>
              </li>
              <li class="timeline-item">
                <i class="timeline-step"></i>
                <span class="timeline-btn">待取衣</span>
                <p class="timeline-time">状态改变时间: 2019.04.01 09:40</p>
              </li>
              <li class="timeline-item">
                <i class="timeline-step uncheck"></i>
                <span class="timeline-btn uncheck">已取衣</span>
                <p class="timeline-time">状态改变时间: </p>
              </li>
              <template v-if="isVisibale">
                <li class="timeline-item">
                  <i class="timeline-step uncheck"></i>
                  <span class="timeline-btn uncheck">已送洗</span>
                  <p class="timeline-time">状态改变时间: </p>
                </li>
                <li class="timeline-item">
                  <i class="timeline-step uncheck"></i>
                  <span class="timeline-btn uncheck">清洗中</span>
                  <p class="timeline-time">状态改变时间: </p>
                </li>
                <li class="timeline-item">
                  <i class="timeline-step uncheck"></i>
                  <span class="timeline-btn uncheck">已上挂</span>
                  <p class="timeline-time">状态改变时间: </p>
                </li>
                <li class="timeline-item">
                  <i class="timeline-step uncheck"></i>
                  <span class="timeline-btn uncheck">已领取</span>
                  <p class="timeline-time">状态改变时间:</p>
                </li>
                <li class="timeline-item">
                  <i class="timeline-step uncheck"></i>
                  <span class="timeline-btn uncheck">取回中</span>
                  <p class="timeline-time">状态改变时间:</p>
                </li>
                <li class="timeline-item">
                  <i class="timeline-step uncheck"></i>
                  <span class="timeline-btn uncheck">待确认</span>
                  <p class="timeline-time">状态改变时间: </p>
                </li>
                <li class="timeline-item">
                  <i class="timeline-step uncheck"></i>
                  <span class="timeline-btn uncheck">待评价</span>
                  <p class="timeline-time">状态改变时间: </p>
                </li>
              </template>
            </ul>
          </div>
          <i class="show-more" @click="showMore" v-if="!isVisibale">点击查看更多状态信息</i>
          <i class="show-more" @click="showMore" v-if="isVisibale">收起</i>
        </div>
        <div class="flex-item addr-box">
          <div class="box-title">
            <i class="box-icon icon-location"></i>
            地址信息
          </div>
          <div class="box-content">
            <div class="top flex">
              <p>收件人: 小陈</p>
              <p>18858590000</p>
            </div>
            <div class="bottom">
              <p>收货地址:</p>
              <p>吉林省长春市绿园区西环城路与四联大街交汇处全季酒店</p>
            </div>
          </div>
        </div>
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
          title: '订单详情',
          path: 'index',
          tabname: '订单'
        },
        isVisibale: false
      }
    },
    methods: {
      showMore() {
        this.isVisibale = !this.isVisibale
      }
    }
  }
</script>
<style lang="less" scoped>
  section{
    padding: 30px 37px;
    margin-top: 80px;
    background: #222;
    .flex{
      flex-direction: column;
      .flex-item{
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 20px;
        background: #3B3B3B;
        border-radius: 4px;
        padding: 20px;
        &:last-child{
          margin-bottom: 0px;
        }
      }
      .box-title{
        padding-left: 52px;
        padding-bottom: 14.5px;
        opacity: 0.8;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #FFFFFF;
        letter-spacing: 0;
        position: relative;
        border-bottom: 2px solid rgba(110,108,108,.4);
        .box-icon{
          position: absolute;
          left: 0;
          display: inline-block;
          width: 25px;
          height: 30px;
        }
        .icon-note{
          background: url('../../assets/icons/note.svg') no-repeat center;
          background-size: 25px 30px;
        }
        .icon-car{
          background: url('../../assets/icons/car.svg') no-repeat center;
          background-size: 25px 30px;
        }
        .icon-location{
          background: url('../../assets/icons/location.svg') no-repeat center;
          background-size: 25px 30px;
        }
      }
      .box-content{
        padding: 20px 0;
      }
      .order-detail{
        .box-content{
          display: flex;
          flex-direction: column;
          .box-item{
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            font-size: 24px;
            color: #FFFFFF;
            letter-spacing: 0;
            &:last-child{
              margin-bottom: 0;
            }
            p{
              span{
                &:first-child{
                  display: inline-block;
                  width: 130px;
                  margin-right: 45px;
                }
              }
            }

          }
        }
      }
      .order-box{
        .box-content{
          p{
            font-size: 24px;
            color: #FFFFFF;
            letter-spacing: 0;
            margin-bottom: 15px;
          }
        }
      }
      .delivery-box{
        position: relative;
        .box-content{
          padding-left: 32px;
          padding-bottom: 0;
          margin-bottom: 20px;
          .timeline{
            .timeline-item{
              padding: 0;
              .timeline-step{
                display: inline-block;
                width: 19px;
                height: 19px;
                background: #4AC1A2;
                border-radius: 50%;
                margin-right: 20px;
              }
              .timeline-btn{
                display: inline-block;
                width: 130px;
                height: 42px;
                line-height: 42px;
                text-align: center;
                background: #4AC1A2;
                box-shadow: 0 7px 13px 0 rgba(0,0,0,0.28);
                border-radius: 47px;
                font-size: 24px;
                color: #FFFFFF;
                letter-spacing: 0;
              }
              .uncheck{
                background: #9F9F9F;
              }
              .timeline-time{
                margin-top: 10px;
                padding-left: 40px;
                margin-left: 10px;
                margin-bottom: 10px;
                font-size: 20px;
                height: 35px;
                color: rgba(255,255,255,.8);
                letter-spacing: 0;
                border-left: 1px dotted #979797;
              }
            }
          }
        }
        .show-more{
          position: absolute;
          display: inline-block;
          left: 50%;
          bottom: 10px;
          transform: translateX(-50%);
          font-size: 16px;
          color: rgba(255,255,255,.28);
          letter-spacing: 0;
          font-style: normal;
        }
      }
      .addr-box{
        min-height: 236px;
        .box-content{
          .top{
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 20px;
            p{
              font-size: 24px;
              color: #FFFFFF;
              letter-spacing: 0;
            }
          }
          .bottom{
            p{
              font-size: 22px;
              color: #FFFFFF;
              letter-spacing: 0;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }
</style>


