const BASEURL = '/api/'
const url ={
  login:BASEURL+'login',
  sendSms:BASEURL+'',
  register:BASEURL+'register',
  categoryList:BASEURL+'admin/cat/getCategoryList',
  goodsList:BASEURL+'admin/goods/getGoodsList',
  payPage:BASEURL+'jsp/alipay.trade.page.pay.jsp',
  orderDetail:BASEURL+'admin/order/getOrderDetail',
  orderTotal:BASEURL+'admin/order/getOrderTotal',
  custAddress:BASEURL+'address/getCustAddress',
  updateAddress:BASEURL+'address/update',
  addAddress:BASEURL+'address/add',
  getShopName:BASEURL+'admin/shop/getCustLaundryShopList'


}
export default url
