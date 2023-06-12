import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Container from 'components/shared/container';
import LandingLayout from 'page-templates/landing';
import dynamic from 'next/dynamic';

const NumberGuesser = dynamic(
  () => import( 'components/game-tools/number-guesser' ),
  { ssr: false }
);

export default function Index( { preview }: { preview: any} ) {
  const { t } = useTranslation();
  return (
    <>
      <LandingLayout preview={ preview } meta={{ pageName: t( 'meta--password-guesser' ) }}>
        <Container>
          <NumberGuesser />
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
