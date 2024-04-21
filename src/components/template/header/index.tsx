import React from 'react';
import Link from 'components/shared/link';
import { SideNavigation } from 'components/template/side-nav';
import { ThemeToggle } from 'components/template/theme-toggle';
import { LocaleToggle } from '../locale-toggle';
import cn from 'classnames';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';
import { Text } from '@briightspark/ui-components';

interface HeaderModel {
  absoluteHeader?: boolean
  fixedHeader?: boolean
}

export const Header = ( { absoluteHeader = false, fixedHeader = false } : HeaderModel ) => {

  return (
    <header className={ cn( 'header-wrapper', { 'header--absolute': absoluteHeader }, { 'header--fixed': fixedHeader } ) }>
      <div className={ cn( 'header' ) }>
        <Link className='header__image-wrapper' href='www.giabaotran.dev' scroll={ false }>
          <Text tag='a' type='p1-bold' onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } className='header__logo'>
            <span>GIA BAO</span>
            <span>TRAN</span>
          </Text>
        </Link>
        <div className='header__navigation-bar'>
          <LocaleToggle />
          <ThemeToggle />
          <SideNavigation />
        </div>
      </div>
    </header>
  );
};
