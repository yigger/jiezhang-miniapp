import Request from '../request'

export default class Category extends Request {
  getSettingList({ type = 'expend', parent_id = 0 }) {
    return this.get('categories/category_list', {
      type: type,
      parent_id: parent_id
    })
  }

  getCategoryDetail(id) {
    return this.get(`categories/${id}`)
  }

  deleteCategory(id) {
    return this.delete(`categories/${id}`, {})
  }

  getCategoryIcon() {
    return this.get('icons/categories_with_url')
  }

  updateCategory(id, data) {
    return this.put(`categories/${id}`, data)
  }

  create(data) {
    return this.post('categories', data)
  }
}
