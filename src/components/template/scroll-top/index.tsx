import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';

export function ScrollToTop() {
  const [ showGoTop, setShowGoTop ] = useState( false );

  const handleVisibleButton = () => {
    setShowGoTop( window.pageYOffset > 50 );
  };

  const handleScrollUp = () => {
    window.scrollTo( { left: 0, top: 0, behavior: 'smooth' } );
  };

  useEffect( () => {
    window.addEventListener( 'scroll', handleVisibleButton );
  }, [] );

  return (
    <button
      className={ cn( 'top-button', { 'top-hidden': !showGoTop } ) }
      type={ 'button' }
      onClick={ handleScrollUp }
      onMouseEnter={ cursorEnter }
      onMouseLeave={ cursorExit }
    >
      <span className='top-icon'>☝️</span>
    </button>
  );
}
