import Request from '../request'
type AssetStatementParams = {
  asset_id: number;
  year: number;
  month: number;
}

export default class Finance extends Request {
  async index () {
    return await this.get('wallet')
  }

  async getAssetDetail(assetId: number) {
    return await this.get('wallet/information', { asset_id: assetId })
  }

  async getAssetTimeline(assetId: number) {
    return await this.get('wallet/time_line', { asset_id: assetId })
  }

  async getAssetStatements(params: AssetStatementParams) {
    return await this.get('wallet/statement_list', params)
  }

}
