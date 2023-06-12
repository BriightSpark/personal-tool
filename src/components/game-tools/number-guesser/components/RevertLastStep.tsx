import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { NumberGuesserContext } from '../NumberGuesser';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';

export default function RevertLastStep() {
  const { t } = useTranslation();
  const { records, setNumber, setNumberList, setRecords } = useContext( NumberGuesserContext );

  const revertState = () => {
    if ( records?.length > 0 ) {
      const { number, numberList } = records?.[records.length - 1];
      setNumber( number );
      setNumberList( numberList );
      setRecords( records.slice( 0, records.length - 1 ) );
    }
  };

  return (
    <button className='reset-button' onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } onClick={ () => revertState() } disabled={ records?.length === 0 }>{ t( 'revert-last-step' ) }</button>
  );
}
