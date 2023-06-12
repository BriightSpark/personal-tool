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
        <Container>
          <h2>{ t( 'game-on' ) }</h2>
          <Link href={ '/game/password-guesser' } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>Password Guesser</Link>
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
