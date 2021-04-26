import Request from '../request'

export default class Main extends Request {
  async header () {
    const st = await this.get('header')
    return st
  }
  
  async statements() {
    const st = await this.get('index')
    return st
  }
}
