import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';

import { NumberGuesserContext } from '../NumberGuesser';
import { filterSingleDigit } from '../utils';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';

export default function NumberRmove() {
  const { t } = useTranslation();
  const { number: originalNumber, numberList, records, setNumberList, setNumber, setRecords } = useContext( NumberGuesserContext );
  const disabled = numberList?.length === 0;

  const filterList = ( number : number ) => {
    if ( numberList?.length > 0 ) {
      const updatedNumberList = filterSingleDigit( numberList, number );
      setRecords( [...records, { type: 'remove', number: originalNumber, numberList: numberList, numberRemoved: number } ] );
      setNumberList( updatedNumberList );
      setNumber( updatedNumberList?.[0] );
    }
  };

  return (
    <div className={ 'number-remove' }>
      <p className={ 'number-remove__title' }>{ t( 'remove-number' ) }</p>
      <div className={ 'number-remove__buttons-wrapper' }>
        <div className={ 'number-remove__buttons' }>
          <button className={ 'number-remove__button' } disabled={ disabled } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } onClick={ () => filterList( 1 ) }>1</button>
          <button className={ 'number-remove__button' } disabled={ disabled } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } onClick={ () => filterList( 2 ) }>2</button>
          <button className={ 'number-remove__button' } disabled={ disabled } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } onClick={ () => filterList( 3 ) }>3</button>
          <button className={ 'number-remove__button' } disabled={ disabled } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } onClick={ () => filterList( 4 ) }>4</button>
          <button className={ 'number-remove__button' } disabled={ disabled } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } onClick={ () => filterList( 5 ) }>5</button>
          <button className={ 'number-remove__button' } disabled={ disabled } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } onClick={ () => filterList( 6 ) }>6</button>
          <button className={ 'number-remove__button' } disabled={ disabled } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } onClick={ () => filterList( 7 ) }>7</button>
          <button className={ 'number-remove__button' } disabled={ disabled } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } onClick={ () => filterList( 8 ) }>8</button>
          <button className={ 'number-remove__button' } disabled={ disabled } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } onClick={ () => filterList( 9 ) }>9</button>
        </div>
      </div>
    </div>
  );
}
