import themeConfig, { colors } from "@/theme/config"

const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo') || '{}')

const getUserInfo = () => {
  const userInfo: Record<string, any> = {}
  Object.keys(userInfoLocalStorage).forEach((key) => {
    if (userInfo[key] === undefined && userInfoLocalStorage[key] !== null) {
      userInfo[key] = userInfoLocalStorage[key]
    }
  })
  return userInfo
}

const isTouchDevice = (): boolean => {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
  const mq = (query: string) => window.matchMedia(query).matches

  if ('ontouchstart' in window || (window as any).DocumentTouch) {
    return true
  }

  const query = ['(', prefixes.join('touch-enabled), ('), 'heartz', ')'].join('')
  return mq(query)
}

const state = () => ({
  AppActiveUser: getUserInfo(),
  bodyOverlay: false,
  isVerticalNavMenyActive: true,
  is_touch_device: isTouchDevice(),
  mainLayoutType: themeConfig.mainLayoutType || 'vertical',
  reduceButton: themeConfig.sidebarCollapsed,
  verticalNavMenuWidth: 'default',
  verticalNavMenuItemsMin: false,
  scrollY: 0,
  theme: themeConfig.theme || 'light',
  themePrimaryColor: colors.primary,
  windowWidth: null as number | null
})

export type AppState = ReturnType<typeof state>

export default state