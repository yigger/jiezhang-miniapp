import Request from '../request'

export default class User extends Request {
  getUserInfo() {
    return this.get('/settings')
  }
}
