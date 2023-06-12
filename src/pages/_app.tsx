import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Router } from 'next/router';
import Cursor from 'react-cursor-follow';

import { appWithTranslation } from 'next-i18next';
import { sendPageView } from 'library/analytics/page-view';

import '../styles/index.scss';
import { NextComponentType, NextPageContext } from 'next';

type AppProps = {
  pageProps: any
  Component: NextComponentType<NextPageContext, any, {}> & { layoutProps: any }
  router: any
}

function MyApp( { Component, pageProps, router }: AppProps ) {

  const url = `https://tool.giabaotran.dev${ router.route }`;

  useEffect( () => {
    sendPageView();
    if ( localStorage.theme === 'dark' ) {
      document.documentElement.classList.add( 'dark' );
    }
    else {
      document.documentElement.classList.remove( 'dark' );
    }
  }, [] );

  useEffect( () => {
    router.events.on( 'routeChangeComplete', sendPageView );
    return () => {
      router.events.off( 'routeChangeComplete', sendPageView );
    };

  }, [Router.events] );

  return (
    <div className={ pageProps?.pageClass || '' }>
      <AnimatePresence
        mode='wait'
        initial={ false }
        onExitComplete={ () => window.scrollTo( 0, 0 ) }
      >
        { /* <Cursor hollow duration={ 0.7 } /> */ }
        <Component { ...pageProps } canonical={ url } key={ url } />;
      </AnimatePresence>
    </div>
  );
}

export default appWithTranslation( MyApp );
