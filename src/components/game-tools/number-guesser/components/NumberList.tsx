import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { NumberGuesserContext } from '../NumberGuesser';

export default function NumberList( ) {
  const { t } = useTranslation();
  const { numberList } = useContext( NumberGuesserContext );

  return (
    <div className={ 'number-list' }>
      <p>{ t( 'remaining-combination' ) }: [{ numberList?.length }]</p>
      <p>{ numberList?.map( ( n ) => `${ n.join( '' ) }` ).join( ', ' ) }</p>
    </div>
  );
}
