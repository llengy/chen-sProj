<template>
  <mt-header fixed  :title="headers.title">
    <div @click="goBack" slot="left">
      <mt-button icon="back"></mt-button>
    </div>
  </mt-header>
</template>
<script>
export default {
  props: {
    headers: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.push({name: this.headers.path, params: {sel: this.headers.tabname}})
    }
  }
}
</script>
<style lang="less" scoped>
.mint-header{
  background: #141414;
  box-shadow: 0 7px 24px 0 rgba(0,0,0,0.32);
  // position: relative;
  height: 80px;
  /deep/ .mint-header-title{
    font-size: 30px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
}
</style>


