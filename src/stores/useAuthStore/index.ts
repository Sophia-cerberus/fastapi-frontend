import { defineStore } from 'pinia'
import state from './state'
import getters from './getters'
import actions from './actions'


const useAuthStore = defineStore("auth", {
  state,
  getters,
  actions
})

export { useAuthStore }