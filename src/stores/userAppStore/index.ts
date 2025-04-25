import { defineStore } from 'pinia'
import state from './state'
import getters from './getters'
import createActions from './actions'


const useAppStore = defineStore("root", () => {

  const store = state()
  const actionFns = createActions(store)

  return {
    ...store,
    ...getters,
    ...actionFns
  }
})

export { useAppStore }