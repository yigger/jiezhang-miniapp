import Request from '../request'

export default class AccountBook extends Request {
  getAccountBooks() {
    return this.get('/account_books')
  }
}
