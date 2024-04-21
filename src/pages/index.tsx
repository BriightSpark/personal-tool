import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Container from 'components/shared/container';
import LandingLayout from 'page-templates/landing';
import Link from 'next/link';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';

export default function Index( { preview }: { preview: any} ) {
  const { t } = useTranslation();
  return (
    <>
      <LandingLayout preview={ preview } meta={{ pageName: t( 'meta--game-tools' ) }}>
        <Container className='flex flex-col gap-10'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl font-bold mb-4'>{ t( 'game-on', 'Game on!' ) }</h2>
            <Link href={ '/game/password-guesser' } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>Password Guesser</Link>
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl font-bold mb-4'>{ t( 'util-tool', 'Utilities' ) }</h2>
            <Link href={ '/utils/discount-calculator' } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>Discount calculator</Link>
            <Link href={ '/utils/cost-sharing' } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>Cost sharing calulator</Link>
          </div>
        </Container>
      </LandingLayout>
    </>
  );
}

export async function getStaticProps( { preview = false, locale } : { preview: boolean, locale: string } ) {
  return {
    props: {
      preview,
      ...( await serverSideTranslations( locale, ['common'] ) )
    }
  };
}
