import React from 'react';
import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';

const CalculationResult = () => {
  const { t } = useTranslation();
  const formParams : any = useWatch();
  const {
    'bill-subtotal': billSubtotal,
    'bill-total': billTotal,
    items = []
  } = formParams;

  const discountRate = ( billSubtotal - billTotal ) / billSubtotal;
  const renderLineItem = ( { price, quantity, isCombo, comboItems } : any, index : number ) => {
    let comboItemTotalPrice = 0;
    comboItems?.forEach( ( item : number ) => comboItemTotalPrice += item );

    return (
      <>
        <tr>
          <th className='calculation-result__item'>{ isCombo ? `📦 ${ t( 'combo' ) }` : `🥩 ${ t( 'product' ) } ${ index + 1 }` }</th>
          <th className='calculation-result__price'>{ price.toLocaleString() }</th>
          <th className='calculation-result__quantity'>{ isCombo ? '-' : quantity }</th>
          <th className='calculation-result__percentage'>{ `${ ( discountRate * 100 ).toFixed( 2 ) }%` }</th>
          { /* <th className='calculation-result__amount'>{ ( price * discountRate ).toLocaleString(undefined, {maximumFractionDigits: 2}) }</th> */ }
          <th className='calculation-result__total'>{ ( price * ( 1 - discountRate ) ).toLocaleString( undefined, { maximumFractionDigits: 2 } ) }</th>
        </tr>
        { isCombo && comboItems?.map( ( itemPrice : number, index : number ) => {
          const comboItemPercentage = itemPrice / comboItemTotalPrice;
          return (
            <tr key={ index }>
              <th className='calculation-result__item'>{ `👉 🥩  ${ t( 'combo-item' ) } ${ index + 1 }` }</th>
              <th className='calculation-result__price'>{ itemPrice.toLocaleString() }</th>
              <th className='calculation-result__quantity'>{ quantity }</th>
              <th className='calculation-result__percentage'>{ `${ ( discountRate * 100 ).toFixed( 2 ) }%` }</th>
              { /* <th className='calculation-result__amount'>{ ( ( price * comboItemPercentage * discountRate ) ).toLocaleString(undefined, {maximumFractionDigits: 2}) }</th> */ }
              <th className='calculation-result__total'>{ ( ( price * comboItemPercentage * ( 1 - discountRate ) ) ).toLocaleString( undefined, { maximumFractionDigits: 2 } ) }</th>
            </tr>
          );
        } ) }
      </>
    );
  };

  return (
    <div className='calculation-result'>
      <h2 className='calculation-result__heading'>{ t( 'calculation-result' ) }</h2>
      <table id={ 'discount-calculation' }>
        <>
          <tr className='calculation-result__first-row'>
            <th className='calculation-result__item'>{ t( 'item' ) }</th>
            <th className='calculation-result__price'>{ t( 'initial-price' ) }</th>
            <th className='calculation-result__quantity'>{ t( 'quantity' ) }</th>
            <th className='calculation-result__percentage'>{ t( 'discount-percentage' ) }</th>
            { /* <th className='calculation-result__amount'>{ t( 'discount-amount' ) }</th> */ }
            <th className='calculation-result__total'>{ t( 'total' ) }</th>
          </tr>
        </>
        { items?.map( ( item : any, index : number ) => renderLineItem( { ...item }, index ) ) }
      </table>
    </div>
  );
};

export default CalculationResult;