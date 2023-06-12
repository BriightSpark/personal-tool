import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { NumberGuesserContext } from '../NumberGuesser';
import { applyFilter } from '../utils';
import { random } from 'lodash';
import { cursorEnter, cursorExit } from 'library/utils/mouse-hover';
import { Button } from '@briightspark/ui-components';

export default function NumberFilter() {
  const { t } = useTranslation();
  const { number, numberList, records, setNumberList, setNumber, setRecords } = useContext( NumberGuesserContext );
  const disabled = numberList?.length === 0;

  const filterList = ( { yellow, green } : any ) => {
    if ( numberList?.length > 0 ) {
      const updatedNumberList = applyFilter( { yellowCount: yellow, greenCount: green, array: numberList, number } );
      setRecords( [...records, {
        type: 'filter',
        number: number,
        numberList: numberList,
        combination: {
          red: ( yellow + green === 0 ? 1 : 0 ),
          yellow: yellow,
          green: green
        }
      } ] );
      setNumberList( updatedNumberList );
      switch ( records?.length ) {
        case 0:
          setNumber( yellow + green !== 3
            ? [4, 5, 6] : updatedNumberList?.[random( 0, updatedNumberList.length - 1 )] );
          break;
        default:
          setNumber( updatedNumberList?.[random( 0, updatedNumberList.length - 1 )] );
          break;
      }

    }
  };

  return (
    <div className={ 'number-filter' }>
      <p className={ 'number-filter__title' }>{ t( 'apply-filter' ) }</p>
      <div className={ 'number-filter__buttons-wrapper' }>
        <div className={ 'number-filter__buttons' }>
          <Button onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } className={ 'number-filter__button' } disabled={ disabled } onClick={ () => filterList( { yellow: 0, green: 0 } ) }>
            <span className='text-game-red'>×</span>
          </Button>
          <Button onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } className={ 'number-filter__button' } disabled={ disabled } onClick={ () => filterList( { yellow: 1, green: 1 } ) }>
            1 <span className='text-game-green'>○</span> 1 <span className='text-game-yellow'>△</span>
          </Button>
          <Button onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } className={ 'number-filter__button' } disabled={ disabled } onClick={ () => filterList( { yellow: 2, green: 1 } ) }>
            1 <span className='text-game-green'>○</span> 2 <span className='text-game-yellow'>△</span>
          </Button>
        </div>
        <div className={ 'number-filter__buttons' }>
          <Button onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } className={ 'number-filter__button' } disabled={ disabled } onClick={ () => filterList( { yellow: 1, green: 0 } ) }>
            0 <span className='text-game-green'>○</span> 1 <span className='text-game-yellow'>△</span>
          </Button>
          <Button onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } className={ 'number-filter__button' } disabled={ disabled } onClick={ () => filterList( { yellow: 2, green: 0 } ) }>
            0 <span className='text-game-green'>○</span> 2 <span className='text-game-yellow'>△</span>
          </Button>
          <Button onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } className={ 'number-filter__button' } disabled={ disabled } onClick={ () => filterList( { yellow: 3, green: 0 } ) }>
            0 <span className='text-game-green'>○</span> 3 <span className='text-game-yellow'>△</span>
          </Button>
        </div>
        <div className={ 'number-filter__buttons' }>
          <Button onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } className={ 'number-filter__button' } disabled={ disabled } onClick={ () => filterList( { yellow: 0, green: 1 } ) }>
            1 <span className='text-game-green'>○</span> 0 <span className='text-game-yellow'>△</span>
          </Button>
          <Button onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } className={ 'number-filter__button' } disabled={ disabled } onClick={ () => filterList( { yellow: 0, green: 2 } ) }>
            2 <span className='text-game-green'>○</span> 0 <span className='text-game-yellow'>△</span>
          </Button>
          <Button onMouseEnter={ cursorEnter } onMouseLeave={ cursorExit } className={ 'number-filter__button' } disabled={ disabled } onClick={ () => filterList( { yellow: 0, green: 3 } ) }>
            3 <span className='text-game-green'>○</span> 0 <span className='text-game-yellow'>△</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
