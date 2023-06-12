import { AnimatePresence, motion } from 'framer-motion';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';
import { useRouter } from 'next/router';
import React from 'react';

export function LocaleToggle() {
  const { locale, asPath, push } = useRouter();

  function changeLocale( ) {
    push( asPath, asPath, { locale: locale === 'en-US' ? 'vi-VN' : 'en-US' } );
  }

  return (
    <AnimatePresence mode='wait' initial={ false }>
      <motion.button
        className='focus:outline-none mr-2'
        onClick={ () => changeLocale() }
        key={ locale }
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }
      >
        { locale === 'en-US' ? 'EN' : 'VN' }
      </motion.button>
    </AnimatePresence>
  );
}
