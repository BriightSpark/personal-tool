import React, { useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ROUTES } from 'library/constants';

import Link from 'components/shared/link';
import Button from 'components/shared/button';
import { EasterEgg } from '../easter-egg';
import { Text } from '@briightspark/ui-components';

export const SideNavigation = () => {

  const { t } = useTranslation();
  const [openSideNavigation, setOpenSideNavigation] = useState( false );

  function toggleNavigation() {
    setOpenSideNavigation( !openSideNavigation );
  }

  const navItems = ROUTES?.map( ( route ) => {
    return (
      <div className='sidenav__navlink-wrapper' key={ route?.label }>
        <span className='sidenav__navlink-background'></span>
        <Link
          className='sidenav__navlink'
          href={ `${ process.env.NEXT_PUBLIC_MAIN_SITE }${ route?.path }` }
          onClick={ toggleNavigation }
          scroll={ false }
        >
          <Text tag='a' type='h1' className='sidenav__navlink-link'>
            { t( route?.label )?.toUpperCase() }
          </Text>
        </Link>
      </div>
    );
  } );

  return (
    <>
      <nav className={ cn( 'sidenav', { 'sidenav--open': openSideNavigation } ) }>
        <Button className='sidenav__button' onClick={ toggleNavigation }>
          <span></span>
          <span></span>
          <span></span>
          <div className='sidenav__button-background'></div>
        </Button>
        <div className='sidenav__navigation-wrapper'>
          <EasterEgg />
          <nav className='sidenav__navigation'>
            { navItems }
          </nav>
        </div>
      </nav>
    </>
  );
};
