<template>
  <main>
    <Header :headers="header"></Header>
    忘记密码
  </main>
</template>
<script>
import Header from '@/components/header'
export default {
  components: {
    Header
  },
  data() {
    return {
      header: {
        title: '找回密码',
        path: 'login',
        sel: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>


