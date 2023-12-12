import {observable, action} from 'mobx';
import jz from '@/jz'
import { createContext } from "react";

class HomeStore {
  @observable indexHeader = {}
  @observable statements = []

  @action async initHomeData() {
    const {data} = await jz.api.main.statements()
    this.statements = data
    const [headerSt, statementSt] = await Promise.all([jz.api.main.header(), jz.api.main.statements()])
    if (headerSt.isSuccess) {
      this.indexHeader = headerSt.data.data
    }
    if (statementSt.isSuccess) {
      this.statements = statementSt.data
    }
  }
}

export const HomeStoreContext = createContext(new HomeStore());