import Request from '../request'

export default class Asset extends Request {
  getSettingList({ parentId }) {
    return this.get('/assets', { parent_id: parentId })
  }

  getAssetDetail(id) {
    return this.get(`/assets/${id}`)
  }

  deleteAsset(id) {
    return this.delete(`/assets/${id}`, {})
  }

  getAssetIcon() {
    return this.get('/icons/assets')
  }

  updateAsset(id, data) {
    return this.put(`/assets/${id}`, { wallet: data })
  }

  create(data) {
    return this.post('/assets', { wallet: data })
  }
}
