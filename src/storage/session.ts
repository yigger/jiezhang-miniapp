class Session {

  #localStorage
  constructor () {
    this.#localStorage = {}
  }

  get(key) {
    return this.#localStorage[key]
  }

  set(key, value) {
    this.#localStorage[key] = value
  }

  keyExist(key): Boolean {
    return !!this.#localStorage[key]
  }

  get localStorage() {
    return this.#localStorage
  }
}

const session = new Session()

export default session