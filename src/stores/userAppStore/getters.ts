import type { AppState } from './state'

const getters = {

  windowBreakPoint: (state: AppState): string => {

    if (state.windowWidth == null) return 'xs'
    else if (state.windowWidth >= 1200) return 'xl'
    else if (state.windowWidth >= 992) return 'lg'
    else if (state.windowWidth >= 768) return 'md'
    else if (state.windowWidth >= 576) return 'sm'
    else return 'ws'
  },

  scrollbarTag: (state: AppState): string => {
    return state.is_touch_device ? 'div' : 'VuePerfectScrollbar'
  }
}

export default getters