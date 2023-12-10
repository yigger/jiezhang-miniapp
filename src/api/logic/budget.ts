import Request from '../request'

export default class Budget extends Request {
  getHeaderData() {
    return this.get('budgets')
  }

  getParentList() {
    return this.get('budgets/parent')
  }

  updateRootAmount({amount}) {
    return this.put('budgets/0', { type: 'user', amount: amount})
  }

  updateCategoryAmount({amount, category_id}) {
    return this.put('budgets/0', { type: 'category', category_id: category_id, amount: amount})
  }
}
