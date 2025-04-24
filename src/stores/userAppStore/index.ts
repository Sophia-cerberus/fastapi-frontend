import { defineStore } from 'pinia'
import { state } from './state'
import getters from './getters'
import actions from './actions'


const useAppStore = defineStore("root", {
    state,
    getters,
    actions
})

export { useAppStore }