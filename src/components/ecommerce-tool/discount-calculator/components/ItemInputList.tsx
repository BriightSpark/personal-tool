import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';

import ItemInput from './ItemInput';
import { Button } from 'components/_core';

const ItemInputList = ( { fields, append, remove } : any ) => {
  const [amountOfItem, setAmountOfItem] = useState < number >( 1 );
  const { t } = useTranslation();
  const formParams : any = useWatch();
  const {
    'bill-subtotal': subTotal,
    items = []
  } = formParams;

  let itemTotalPrice = 0;
  items.forEach( ( item : any ) => itemTotalPrice += item.price * item.quantity );

  return (
    <div className='item-input-list'>
      <h2 className='item-input-list__title'>{ t( 'item-input-list' ) }</h2>
      { subTotal !== itemTotalPrice &&
      <div>
        <p className='item-input-list__error'>{ `${ t( 'current-item-total' ) }: VND ${ itemTotalPrice.toLocaleString( undefined, { maximumFractionDigits: 2 } ) }` }</p>
        <p className='item-input-list__error'>{ t( 'unmatch-total-price' ) }</p>
      </div>
      }
      { fields.map( ( field : any, index : number ) => {
        return <ItemInput
          key={ field.id }
          index={ index }
          rmCallback={ () => remove( index ) }
        />;
      } ) }
      <div className='combo-options__controls'>
        <Button type='button' label={ t( 'add-more' ) } onClicked={ () => {
          append( { price: 0, quantity: 1, isCombo: false } );
          setAmountOfItem( amountOfItem + 1 );
        } }
        />
      </div>
    </div>
  );
};

export default ItemInputList;