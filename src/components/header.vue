<template>
  <mt-header fixed  :title="headers.title">
    <router-link :to="{ name: headers.path, params: { sel: headers.tabname }}" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
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
  }
}
</script>

