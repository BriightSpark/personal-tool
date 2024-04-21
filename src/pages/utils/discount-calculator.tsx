import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Container from 'components/shared/container';
import LandingLayout from 'page-templates/landing';
import dynamic from 'next/dynamic';

const DiscountCalculator = dynamic(
  () => import( 'components/ecommerce-tool/discount-calculator' ),
  { ssr: false }
);

export default function Index( { preview }: { preview: any} ) {
  const { t } = useTranslation();
  return (
    <>
      <LandingLayout preview={ preview } meta={{ pageName: t( 'meta--discount-calculator' ) }}>
        <Container>
          <DiscountCalculator />
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
