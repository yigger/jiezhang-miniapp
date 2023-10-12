import Request from '../request'
import { StatementForm } from '../types'
export default class Statement extends Request {
  list () {
    // this.get('')
  }

  // 获取创建账单时的分类列表
  categoriesWithForm(type: 'income' | 'expend') {
    return this.get('/statements/categories', {
      type: type
    })
  }

  // 获取创建账单时的资产列表
  assetsWithForm(params={}) {
    return this.get('/statements/assets', params)
  }

  // 获取最近常用的三个分类
  categoryFrequent(type: 'income' | 'expend') {
    return this.get('/statements/category_frequent', {
      type: type
    })
  }

  // 获取最近常用的三个资产
  assetFrequent() {
    return this.get('/statements/asset_frequent')
  }

  // 创建账单
  create(data) {
    return this.post('/statements', { statement: data })
  }
}
