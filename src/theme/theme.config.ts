// MAIN COLORS - VUESAX THEME COLORS
export const colors: Record<string, string> = {
  primary   : '#7367F0',
  success   : '#28C76F',
  danger    : '#EA5455',
  warning   : '#FF9F43',
  dark      : '#1E1E1E',
}

// THEME CONFIG INTERFACE
export interface ThemeConfig {
  disableCustomizer : boolean
  disableThemeTour  : boolean
  footerType        : 'static' | 'sticky' | 'hidden'
  hideScrollToTop   : boolean
  mainLayoutType    : 'vertical' | 'horizontal'
  navbarColor       : string
  navbarType        : 'floating' | 'static' | 'sticky' | 'hidden'
  routerTransition  : 'zoom-fade' | 'slide-fade' | 'fade-bottom' | 'fade' | 'zoom-out' | 'none'
  rtl               : boolean
  sidebarCollapsed  : boolean
  theme             : 'light' | 'dark' | 'semi-dark'

  userInfoLocalStorageKey: string
}

const themeConfig: ThemeConfig = {
  disableCustomizer : false,
  disableThemeTour  : true,
  footerType        : 'static',
  hideScrollToTop   : false,
  mainLayoutType    : 'vertical',
  navbarColor       : '#fff',
  navbarType        : 'floating',
  routerTransition  : 'zoom-fade',
  rtl               : false,
  sidebarCollapsed  : false,
  theme             : 'light',

  userInfoLocalStorageKey: 'userInfo',
}

export default themeConfig