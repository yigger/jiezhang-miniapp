import Request from './request'
import Statement from './logic/statement'
import Main from './logic/main'
import User from './logic/user'
import Category from './logic/category'
import Asset from './logic/asset'
import AccountBook from './logic/account_book'
import Finance from './logic/finance'
import SuperStatement from './logic/superStatement'
import SuperChart from './logic/superChart'
import Budget from './logic/budget'
import Chaos from './logic/chaos'

export class Api extends Request {
  private _statements: Statement = null
  get statements(): Statement {
    if (!!this._statements) {
      return this._statements
    } else {
      this._statements = new Statement(this.endpoint, this.appid)
      return this._statements
    }
  }

  private _main: Main = null
  get main(): Main {
    if (!!this._main) {
      return this._main
    } else {
      this._main = new Main(this.endpoint, this.appid)
      return this._main
    }
  }

  private _users: User = null
  get users(): User {
    if (!!this._users) {
      return this._users
    } else {
      this._users = new User(this.endpoint, this.appid)
      return this._users
    }
  }

  private _categories: Category = null
  get categories(): Category {
    if (!!this._categories) {
      return this._categories
    } else {
      this._categories = new Category(this.endpoint, this.appid)
      return this._categories
    }
  }

  private _assets: Asset = null
  get assets(): Asset {
    if (!!this._assets) {
      return this._assets
    } else {
      this._assets = new Asset(this.endpoint, this.appid)
      return this._assets
    }
  }

  private _account_books: AccountBook = null
  get account_books(): AccountBook {
    if (!!this.account_books) {
      return this._account_books
    } else {
      this._account_books = new AccountBook(this.endpoint, this.appid)
      return this._account_books
    }
  }

  private _finances: Finance = null
  get finances(): Finance {
    if (!!this._finances) {
      return this._finances
    } else {
      this._finances = new Finance(this.endpoint, this.appid)
      return this._finances
    }
  }

  private _super_statements: SuperStatement = null
  get superStatements(): SuperStatement {
    if (!!this._super_statements) {
      return this._super_statements
    } else {
      this._super_statements = new SuperStatement(this.endpoint, this.appid)
      return this._super_statements
    }
  }

  private _super_charts: SuperChart = null
  get superCharts(): SuperChart {
    if (!!this._super_charts) {
      return this._super_charts
    } else {
      this._super_charts = new SuperChart(this.endpoint, this.appid)
      return this._super_charts
    }
  }

  private _budget: Budget = null
  get budgets(): Budget {
    if (!!this._budget) {
      return this._budget
    } else {
      this._budget = new Budget(this.endpoint, this.appid)
      return this._budget
    }
  }
  
  private _chaos: Chaos = null
  get chaos(): Chaos {
    if (!!this._chaos) {
      return this._chaos
    } else {
      this._chaos = new Chaos(this.endpoint, this.appid)
      return this._chaos
    }
  }
}