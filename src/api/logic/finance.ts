import Request from '../request'

export default class Finance extends Request {
  
  async index () {
    const st = await this.get('wallet')
    return st
  }

}
