import React from 'react';
import { useTranslation } from 'next-i18next';

import { Checkbox, Input } from 'components/_core';
import ComboOption from './ComboOptions';
import { useWatch } from 'react-hook-form';
import { Button } from '@briightspark/ui-components';

interface IItemInput {
  index: number
  rmCallback?: Function
}

const ItemInput = ( { index, rmCallback = () => {} } : IItemInput ) => {
  const { t } = useTranslation();
  const isCombo = useWatch( { name: `items.${ index }.isCombo` } );

  return (
    <div className='item-input-wrapper'>
      <div className='item-input'>
        <div className='item-input__text'>
          <p className='item-input__label'>{ `${ t( 'product' ) } ${ index + 1 }` }</p>
          <div className='item-input__checkbox-wrapper'>
            <Checkbox
              name={ `items.${ index }.isCombo` }
              label={ t( 'combo-item-question' ) }
            />
          </div>
        </div>
        <div className='item-input__input-wrapper'>
          <Input
            className='item-input__input'
            type='number'
            name={ `items.${ index }.price` }
            label={ t( 'item-price' ) }
            staticLabel
          />
          <Input
            className='item-input__input'
            type='number'
            name={ `items.${ index }.quantity` }
            label={ t( 'quantity' ) }
            staticLabel
          />
        </div>
        <Button className='item-input__remove' type='button' fill={ 'outlined' } onClick={ () => rmCallback() }>X</Button>
      </div>
      { !!isCombo &&
        <>
          <ComboOption name={ `items.${ index }` } />
        </>
      }
    </div>
  );
};

export default ItemInput;