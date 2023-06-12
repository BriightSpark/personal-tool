import React, { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';

interface NoScrollLinkModel extends LinkProps {
  children: ReactNode
  className?: string
}

const NoScrollLink = ( { children, href, passHref, className }: NoScrollLinkModel ): JSX.Element => (
  <Link href={ href } passHref={ passHref } scroll={ false } className={ className } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>
    { children }
  </Link>
);

export default NoScrollLink;
