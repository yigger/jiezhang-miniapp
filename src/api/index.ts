import Request from './request'
import Statement from './logic/statement'
import Main from './logic/main'
import User from './logic/user'
import Category from './logic/category'

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
}