import Request from '../request'

export default class Main extends Request {
  async header () {
    const st = await this.get('header')
    return st
  }
}
