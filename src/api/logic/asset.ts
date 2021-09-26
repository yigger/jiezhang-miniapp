import Request from '../request'

export default class Asset extends Request {
  getSettingList() {
    return this.get('/assets')
  }

  getAssetDetail(id) {
    return this.get(`/categories/${id}`)
  }

  // deleteCategory(id) {
  //   return this.delete(`/categories/${id}`)
  // }

  getAssetIcon() {
    return this.get('/icons/assets')
  }

  // updateCategory(id, data) {
  //   return this.put(`/categories/${id}`, data)
  // }

  // create(data) {
  //   return this.post('/categories', data)
  // }
}
