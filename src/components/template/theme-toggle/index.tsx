import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { isBrowser } from 'library/utils/useWindowSize';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';

const isDark = (): boolean =>
  ( localStorage && localStorage.theme === 'dark' ) ||
  ( !( 'theme' in localStorage ) && window.matchMedia( '(prefers-color-scheme: dark)' ).matches );

const getThemeString = ( isDark: boolean ): string => ( isDark ? 'dark' : 'light' );

export const ThemeToggle = (): JSX.Element => {
  const [isDarkMode, setDarkMode] = useState( false );

  const toggleMode = (): void => {
    localStorage.theme = getThemeString( !isDarkMode );
    if ( localStorage.theme === 'dark' ) {
      document.documentElement.classList.add( 'dark' );
    }
    else {
      document.documentElement.classList.remove( 'dark' );
    }
    window.dispatchEvent( new Event( 'theme-update' ) );
    setDarkMode( !isDarkMode );
  };

  useEffect( () => {
    setDarkMode( isDark() );
  }, [] );

  const darkModeActive: boolean = ( isBrowser ) && document?.documentElement.classList.contains( 'dark' );

  return (
    <AnimatePresence mode='wait' initial={ false }>
      <motion.button
        className='text-2xl sm:text-3xl text-yellow-400 dark:text-yellow-300 focus:outline-none'
        onClick={ () => toggleMode() }
        key={ darkModeActive ? 'dark-icon' : 'light-icon' }
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }
      >
        { darkModeActive ?
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 17 17' width='17' height='17' className='icons-style mini-icons'>
            <title>Theme</title>
            <path d='M14.994,7.99a7,7,0,0,1-12.813,3.9,1,1,0,0,1,1.063-1.532,6.139,6.139,0,0,0,1.961.089,6.012,6.012,0,0,0,5.212-4.985,6.067,6.067,0,0,0-.065-2.274A1,1,0,0,1,11.9,2.182,6.985,6.985,0,0,1,14.994,7.99Z' transform-origin='0px 0px' style={{ transform: 'none', 'transform-origin': '0px 0px' } as React.CSSProperties}></path>
            <g transform-origin='0px 0px' style={{ transform: 'translateY(17px)', 'transform-origin': '0px 0px' } as React.CSSProperties}>
              <circle cx='8.5' cy='8.5' r='3'></circle>
              <line x1='8.5' y1='1' x2='8.5' y2='2'></line>
              <line x1='13.803' y1='3.197' x2='13.096' y2='3.904'></line>
              <line x1='16' y1='8.5' x2='15' y2='8.5'></line>
              <line x1='13.803' y1='13.803' x2='13.096' y2='13.096'></line>
              <line x1='8.5' y1='16' x2='8.5' y2='15'></line>
              <line x1='3.197' y1='13.803' x2='3.904' y2='13.096'></line>
              <line x1='1' y1='8.5' x2='2' y2='8.5'></line>
              <line x1='3.197' y1='3.197' x2='3.904' y2='3.904'></line>
            </g>
          </svg>
        :
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 17 17' width='17' height='17' className='icons-style mini-icons'>
            <title>Theme</title>
            <path d='M14.994,7.99a7,7,0,0,1-12.813,3.9,1,1,0,0,1,1.063-1.532,6.139,6.139,0,0,0,1.961.089,6.012,6.012,0,0,0,5.212-4.985,6.067,6.067,0,0,0-.065-2.274A1,1,0,0,1,11.9,2.182,6.985,6.985,0,0,1,14.994,7.99Z' transform-origin='0px 0px' style={{ transform: 'translateY(17px)', 'transform-origin': '0px 0px' } as React.CSSProperties}></path>
            <g transform-origin='0px 0px' style={{ transform: 'none', 'transform-origin': '0px 0px' } as React.CSSProperties}>
              <circle cx='8.5' cy='8.5' r='3'></circle>
              <line x1='8.5' y1='1' x2='8.5' y2='2'></line>
              <line x1='13.803' y1='3.197' x2='13.096' y2='3.904'></line>
              <line x1='16' y1='8.5' x2='15' y2='8.5'></line>
              <line x1='13.803' y1='13.803' x2='13.096' y2='13.096'></line>
              <line x1='8.5' y1='16' x2='8.5' y2='15'></line>
              <line x1='3.197' y1='13.803' x2='3.904' y2='13.096'></line>
              <line x1='1' y1='8.5' x2='2' y2='8.5'></line>
              <line x1='3.197' y1='3.197' x2='3.904' y2='3.904'></line>
            </g>
          </svg>
        }
      </motion.button>
    </AnimatePresence>
  );
};
