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

  // 更新账单
  update(statementId, data) {
    return this.put(`/statements/${statementId}`, { statement: data })
  }

  // 获取账单详情
  getDetail(statementId: number) {
    return this.get(`/statements/detail`, {id: statementId})
  }

  // 获取账单详情
  getStatement(statementId: number) {
    return this.get(`/statements/${statementId}`)
  }

  // 删除账单
  deleteStatement(statementId: number) {
    return this.delete(`/statements/${statementId}`)
  }
}
