import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';

import { Checkbox, Input, Button } from 'components/_core';

interface IComboOption {
  name: string
}

const ComboOption = ( { name } : IComboOption ) => {
  const [amountOfItem, setAmountOfItem] = useState < number >( 2 );

  const { t } = useTranslation();
  const formParams : any = useWatch( { name: [ name ] } );
  const { price, comboItems } = formParams[0];

  let comboItemTotalPrice = 0;
  comboItems?.forEach( ( item : number ) => comboItemTotalPrice += item );

  const inputs = [];
  for ( let i = 0; i < amountOfItem; i++ ) {
    inputs.push(
      <Input
        type='number'
        name={ `${ name }.comboItems.${ i }` }
        label={ `${ t( 'item-price--combo' ) } ${ i + 1 }` }
        validation={{ valueAsNumber: true }}
        staticLabel
      />
    );
  }

  return (
    <div className='combo-options'>
      <>
        <div className='combo-options__inputs'>
          { inputs }
        </div>
        <div className='combo-options__controls'>
          <Button type='button' label={ t( 'add-more--combo' ) } onClicked={ () => setAmountOfItem( amountOfItem + 1 ) } />
          <Button type='button' label={ t( 'remove-one--combo' ) } onClicked={ () => setAmountOfItem( amountOfItem - 1 ) } />
        </div>
        { comboItemTotalPrice !== price && <p className='combo-options__error'>{ t( 'unmatch-combo-price' ) }</p> }
      </>
    </div>
  );
};

export default ComboOption;