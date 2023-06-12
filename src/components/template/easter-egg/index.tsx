import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';

export const EasterEgg = () => {
  const { t } = useTranslation();
  return (
    <Link href={ '/' }>
      <a className='easter-egg-link' onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>⚔️</a>
    </Link>
  );
};