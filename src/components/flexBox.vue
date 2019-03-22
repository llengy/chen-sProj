<template>
  <ul class="row">
    <li @click="addToCart(item, idx)" class="item" v-for="(item, idx) in data" :key="idx">
      <i class="add-num" v-if="item.total">{{item.total}}</i>
      <img :src="item.img_path" alt="">
      <span class="item-title">{{item.goods_name}}</span>
      <span class="item-num">¥ {{item.price | priceFilter}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  props:["data"],
  data() {
    return {}
  },
  mounted() {

  },
  methods: {
    addToCart(item, index) {
      this.$emit('add-to-cart', item, index)
    }
  }
}
</script>
<style lang="less" scoped>
.row{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  padding: 0;
  margin: 0;
  .item{
    // flex: 33.3%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 18px 30px 0 30px;
    text-align: center;
    height: 300px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 0px 19px 19px 0px;
    list-style: none;
    position: relative;
    border-radius: 19px;

    // &:nth-child(even) {
    //   border-radius: 19px;
    // }
    // &:nth-child(3) {
    //   border-radius: 19px 0px 0px 19px;
    // }
    img{
      width: 184px;
      height: 184px;
    }
    .item-title{
      font-size: 22px;
      color: #FFFFFF;
      letter-spacing: 0;
      opacity: 0.8;
      margin-bottom: 2px;
    }
    .item-num{
      font-size: 24px;
      color: #56CBAC;
      letter-spacing: 0;
    }
    .add-num{
      position: absolute;
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      right: 27px;
      top: 30px;
      opacity: 0.8;
      background-image: radial-gradient(0 100%, #70E2C3, #128F70);
      box-shadow: 0 6px 6px 0 rgba(0,0,0,0.16);
      border-radius: 50%;
      text-align: center;
      font-size: 18px;
      color: #FFFFFF;
      letter-spacing: 0;
      font-style: normal;
    }
  }
}
</style>


