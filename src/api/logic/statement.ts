import Request from '../request'

export default class Statement extends Request {
  list () {
    // this.get('')
  }

  // 获取创建账单时的分类列表
  categoriesWithForm(type = 'expend') {
    return this.get('/statements/categories', {
      type: type
    })
  }

  // 获取创建账单时的资产列表
  assetsWithForm() {
    return this.get('/statements/assets')
  }

  // 获取最近常用的三个分类
  categoryFrequent(type = 'expend') {
    return this.get('/statements/category_frequent', {
      type: type
    })
  }

  assetFrequent() {
    return this.get('/statements/asset_frequent')
  }
}
