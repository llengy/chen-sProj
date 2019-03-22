import Vue from 'vue'

Vue.filter('priceFilter', val => {
  if (!val) return '0.0'
  return Number(val).toFixed(2)
})