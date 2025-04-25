import type { AppState } from './state'

const createActions = (store: AppState) => ({

    // Vertical NavMenu
  updateVerticalNavMenuWidth(width: string) {
    store.verticalNavMenuWidth = width
  },

  // UI
  toggleContentOverlay() {
    store.bodyOverlay = !store.bodyOverlay
  },

  updateTheme(val: 'light' | 'dark' | 'semi-dark') {
    store.theme = val
  },

  updateWindowWidth(width: number) {
    store.windowWidth = width
  },

  updateWindowScrollY(scrollY: number) {
    store.scrollY = scrollY
  },

})

export default createActions