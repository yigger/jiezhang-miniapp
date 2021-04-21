import Request from './request'
import Statement from './logic/statement'

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
}