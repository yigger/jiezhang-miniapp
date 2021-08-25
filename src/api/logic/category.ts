import Request from '../request'

export default class Category extends Request {
  getSettingList({ type = 'expend' }) {
    return this.get('/categories/category_list', {
      type: type
    })
  }
}
