import Request from '../request'

export default class SuperStatement extends Request {
  getTime() {
    return this.get('/super_statements/time')
  }

  getStatements(params) {
    return this.get('/super_statements/list', params)
  }
}
