import Request from '../request'

export default class Budget extends Request {
  getHeaderData() {
    return this.get('budgets')
  }

  getParentList() {
    return this.get('budgets/parent')
  }
}
