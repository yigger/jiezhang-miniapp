export default {
  pages: [
    // 首页
    'pages/home/index',
    // 创建账单的表单
    'pages/statement/form',
    'pages/statement_detail/index',
    // 分类管理
    'pages/setting/category/index',
    'pages/setting/category/form',
    // 资产管理
    'pages/setting/asset/index',
    'pages/setting/asset/form',
    // 预算管理
    'pages/setting/budget/index',
    'pages/setting/budget_form/index',
    'pages/setting/child_budget/index',

    'pages/setting/search/search',
    'pages/setting/statements_flow/index',
    'pages/setting/chart/index',
    'pages/assets_flow/index',
    "pages/setting/feedback/index"
  ],
  window: {
    navigationBarTitleText: 'WeChat',
    backgroundTextStyle         : 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle      : 'white',
    navigationStyle             : 'custom',
  }
}
