import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { NumberGuesserContext } from '../NumberGuesser';

export default function NumberSuggestion() {
  const { t } = useTranslation();

  const { number, numberList, setNumber } = useContext( NumberGuesserContext );
  const [suggestNumber, setSuggestNumber] = useState<number[]>( [] );
  const [input, setInput] = useState<string>( '' );

  const styles = {
    '--gt--suggest-label': `"${ t( 'suggested' ) }: "`
  } as React.CSSProperties;

  const onChange = ( event : any ) => {
    const num = event.target.value;
    setInput( num );
    if ( num >= 123 && num <= 987 ) {
      const numArray = [];
      for ( let i = 0, len = num.length; i < len; i += 1 ) {
        numArray.push( +num.charAt( i ) );
      }
      setNumber( numArray );
    }
    if ( num === '' ) {
      setNumber( suggestNumber );
    }
  };

  useEffect( () => {
    setInput( '' );
    setSuggestNumber( number );
  }, [numberList] );

  return (
    <div className={ 'number-suggestion' }>
      <p className={ 'number-suggestion__title' }>{ t( 'input-this-number' ) }</p>
      <div className='number-suggestion__input-wrapper' style={ styles }>
        <input
          className={ 'number-suggestion__number' }
          type='number'
          id='number-suggestion'
          min='123'
          max='987'
          placeholder={ 'Enter your number' }
          onChange={ onChange }
          value={ input }
        />
        <label className={ 'number-suggestion__label' } htmlFor={ 'suggestion' }>{ suggestNumber?.length > 1 ? suggestNumber?.join( '' ) : t( 'something-went-wrong' ) }</label>
      </div>
    </div>
  );
}
