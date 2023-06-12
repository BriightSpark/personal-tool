import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { NumberGuesserContext } from '../NumberGuesser';

export default function Records() {
  const { t } = useTranslation();
  const { records } = useContext( NumberGuesserContext );

  const recordElement = records?.map( ( r, i ) => {
    const { type, number, numberRemoved, combination } = r;
    const { red, yellow, green } = combination || {};

    return (
      <p className='record' key={ i }>
        <span className='record__number'>{ type === 'filter' ? number?.map( ( n ) => n ) : numberRemoved }</span>
        { type === 'remove' && <span className='record__type'>{ t( 'removed' ) } ✂️</span> }
        { type === 'filter' && <span className='record__type'>
          { red !== 0 && <span className='text-game-red'>×</span> }
          { red === 0 && <span className='text-game-yellow'>{ yellow } △</span> }
          { red === 0 && <span className='text-game-green'>{ green } ○</span> }
        </span> }
      </p>
    );
  }
  );

  return (
    <div className={ 'records' }>
      <div className={ 'records__wrapper' }>
        <p className={ 'records__title' }>{ t( 'records' ) }</p>
        <div className={ 'records__record' }>{ recordElement }</div>
      </div>
    </div>
  );
}
