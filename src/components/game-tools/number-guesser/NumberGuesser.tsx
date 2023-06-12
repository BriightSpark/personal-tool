import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { shuffleArray } from 'library/utils/array-manipulation';
import { generateDictionary } from './utils';

import NumberSuggestion from './components/NumberSuggestion';
import NumberFilter from './components/NumberFilter';
import NumberRemove from './components/NumberRemove';
import RevertLastStep from './components/RevertLastStep';
import Records from './components/Records';
import NumberList from './components/NumberList';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';

interface NumberContextI {
  numberList: number[][],
  number: number[],
  records: RecordI[]
  setNumberList: Function,
  setNumber: Function
  setRecords: Function
}

interface RecordI {
  type: 'remove' | 'filter',
  number: number[],
  numberRemoved: number,
  numberList: number[][],
  combination?: {
    red: number,
    yellow: number,
    green: number,
  }
}

const initialContextValue : NumberContextI = {
  numberList: [],
  number: [],
  records: [],
  setNumberList: () => {},
  setNumber: () => {},
  setRecords: () => {}
};

export const NumberGuesserContext = React.createContext( initialContextValue );

export default function NumberGuesser() {
  const allPositionAnswer = shuffleArray( generateDictionary() );
  const { t } = useTranslation();

  const [numberList, setNumberList] = useState<number[][]>( allPositionAnswer );
  const [number, setNumber] = useState<number[]>( [1, 2, 3] );
  const [records, setRecords] = useState<RecordI[]>( [] );

  const contextValue = {
    numberList,
    number,
    records,
    setNumberList,
    setNumber,
    setRecords
  };

  const resetState = () => {
    setNumberList( allPositionAnswer );
    setNumber( [1, 2, 3] );
    setRecords( [] );
  };

  return (
    <NumberGuesserContext.Provider value={ contextValue }>
      <div className={ 'number-guess-wrapper' }>
        <button className='reset-button' onClick={ () => resetState() } onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit }>{ t( 'restart' ) }</button>
        <NumberSuggestion />
        <NumberFilter />
        <NumberRemove />
        <RevertLastStep />
        <Records />
        <NumberList />
      </div>
    </NumberGuesserContext.Provider>
  );
}
