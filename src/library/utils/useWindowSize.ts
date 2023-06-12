import { useState, useEffect, useLayoutEffect } from 'react';
import throttle from 'lodash.throttle';

export const isBrowser = typeof window !== 'undefined';

export const useIsomorphicEffect = () => {
  return typeof window !== 'undefined' ? useLayoutEffect : useEffect;
};

export const useWindowSize = ( initialWidth = Infinity, initialHeight = Infinity ) => {
  const isomorphicEffect = useIsomorphicEffect();
  const [state, setState] = useState( {
    width: isBrowser ? window.innerWidth : initialWidth,
    height: isBrowser ? window.innerHeight : initialHeight
  } );


  isomorphicEffect( () => {
    if ( !isBrowser ) return;

    const handler = throttle( () => {
      setState( {
        width: window.innerWidth,
        height: window.innerHeight
      } );
    }, 200 );

    window.addEventListener( 'resize', handler );

    return () => {
      window.removeEventListener( 'resize', handler );
    };
  }, [] );

  return state;
};