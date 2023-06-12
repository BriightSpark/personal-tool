export const isDark = (): boolean =>
  ( localStorage && localStorage.theme === 'dark' ) ||
  ( !( 'theme' in localStorage ) && window.matchMedia( '(prefers-color-scheme: dark)' ).matches );

export const getThemeString = ( isDark: boolean ): string => ( isDark ? 'dark' : 'light' );