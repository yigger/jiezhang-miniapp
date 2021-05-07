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

  assetsWithForm() {
    return this.get('/statements/assets')
  }

}
