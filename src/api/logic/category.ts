import Request from '../request'

export default class Category extends Request {
  getSettingList({ type = 'expend', parent_id = 0 }) {
    return this.get('/categories/category_list', {
      type: type,
      parent_id: parent_id
    })
  }

  getCategoryDetail(id) {
    return this.get(`/categories/${id}`)
  }
}
