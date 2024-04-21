import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import LandingLayout from 'page-templates/landing';
import { ExpenseProvider } from 'components/utility-tool/expense-share-calculator';

const ExpenseCalculator = dynamic(
  () => import( 'components/utility-tool/expense-share-calculator' ),
  { ssr: false }
);

export default function Index( { preview }: { preview: any} ) {
  const { t } = useTranslation();
  return (
    <>
      <LandingLayout preview={ preview } meta={{ pageName: t( 'meta--expense-calculator' ) }}>
        <ExpenseProvider>
          <ExpenseCalculator />
        </ExpenseProvider>
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
