import React from 'react';
import Link from 'components/shared/link';
import { SideNavigation } from 'components/template/side-nav';
import { ThemeToggle } from 'components/template/theme-toggle';
import { LocaleToggle } from '../locale-toggle';
import cn from 'classnames';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';

interface HeaderModel {
  absoluteHeader?: boolean
}

export const Header = ( { absoluteHeader = false } : HeaderModel ) => {

  return (
    <header className={ cn( 'header', { 'header-absolute': absoluteHeader } ) }>
      <Link className='header__image-wrapper' href='/' scroll={ false }>
        <a onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>Gia Bao Tran</a>
      </Link>
      <div className='header__navigation-bar'>
        <LocaleToggle />
        <ThemeToggle />
        <SideNavigation />
      </div>
    </header>
  );
};
