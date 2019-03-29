const BASEURL = '/api/'
const url ={
  login:BASEURL+'login', //登录
  sendSms:BASEURL+'sendSMS', //发送验证码
  register:BASEURL+'register', //注册
  updateCustomer:BASEURL+'customer/updateCustomer', //修改密码
  categoryList:BASEURL+'admin/cat/getCategoryList', //获取所有分类
  goodsList:BASEURL+'admin/goods/getGoodsList', //获取分类下的所有商品
  payPage:BASEURL+'jsp/alipay.trade.page.pay.jsp', //跳转支付页面
  orderDetail:BASEURL+'admin/order/getOrderDetail', //订单详情
  orderTotal:BASEURL+'admin/order/getOrderTotal', //订单概览
  custAddress:BASEURL+'address/getCustAddress', //获取顾客的所有地址
  updateAddress:BASEURL+'address/update', //修改地址
  addAddress:BASEURL+'address/add', //添加地址
  review:BASEURL+'admin/review/add',   //评价
  createOrder:BASEURL+'admin/order/add',//创建订单
  getShopInfo:BASEURL+'admin/shop/getCustLaundryShopList',
  cancelOrder:BASEURL+'admin/order/cancel', //取消订单
  getOrderLastByCust:BASEURL+"admin/order/getOrderLastByCust", //获取顾客最新的订单信息
  confirmOrder:BASEURL+'admin/order/handle'//确认收衣
}
export default url
