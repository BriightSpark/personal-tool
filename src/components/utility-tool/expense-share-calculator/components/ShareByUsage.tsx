import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import cn from 'classnames';

import { Expense, ExpenseSplit, User } from '../type';
import { Button } from '@briightspark/ui-components';

type ShareByUsageType = {
  users: User[]
  expense: Expense
  description: string
  onExpenseUpdate: ( e : Expense ) => void
  onUsageUpdate: ( s: ExpenseSplit[] ) => void
  onRemove: ( ) => void
}

export const ShareByUsage = ( {
  users,
  expense,
  description: initDescription = '',
  onExpenseUpdate = () => undefined,
  onUsageUpdate = () => undefined,
  onRemove = () => undefined
} : ShareByUsageType ) => {

  const [description, setDescription] = useState<string>( initDescription );
  const [cost, setCost] = useState<number>( expense.amount );
  const [usage, setUsage] = useState<number[]>( new Array( users.length ).fill( 0 ) );
  const [selectedDates, setSelectedDates] = useState<Date[][]>( [] );

  useEffect( () => {
    const totalUsage = usage.reduce( ( s, c ) => s + c, 0 );

    const usageUpdate = users.map( ( u : User, idx : number ) => {
      const userCost = cost / totalUsage * usage[idx];
      return ( {
        userId: u.id,
        expenseId: expense.id,
        amount: userCost
      } );
    } );
    onUsageUpdate( usageUpdate );
  }, [JSON.stringify( usage ), cost] );

  useEffect( () => {
    users.forEach( ( u, idx ) => {
      !usage[idx] && setUsage( [
        ...usage.slice( 0, idx ),
        0,
        ...usage.slice( idx + 1 )
      ] );
    } );
  }, [users] );

  const handleDescriptionChange = ( d : string ) => {
    setDescription( d );
    onExpenseUpdate( { ...expense, description: d } );
  };

  const handleCostChange = ( c : number ) => {
    setCost( c );
    onExpenseUpdate( { ...expense, amount: c } );
  };

  const handleDateChange = ( { d, idx } : { d : Date[] | null, idx: number } ) => {
    setSelectedDates( [
      ...selectedDates.slice( 0, idx ),
      d || [],
      ...selectedDates.slice( idx + 1 )
    ] );

    setUsage( [
      ...usage.slice( 0, idx ),
      d ? d.length : 0,
      ...usage.slice( idx + 1 )
    ] );
  };

  return (
    <tr className='expense-calculator__table-body-content'>
      <td className='expense-calculator__table-body-content-description'>
        <input type='text' onChange={ ( e ) => handleDescriptionChange( e.target.value ) } value={ description } />
        <div>
          A$ <input type='number' min='0' placeholder='Total cost of expense' defaultValue={ expense.amount }
            onChange={ ( e ) => handleCostChange( Number( e.target.value ) ) }
          />
        </div>
        <button
          className='expense-calculator__remove-expense_btn'
          onClick={ () => onRemove() }
        >X</button>
      </td>
      {
        users.map( ( u, idx ) => (
          <td key={ u.id } className='expense-calculator__table-body-content-value overflow-visible'>
            <DatePicker
              selectsMultiple
              selectedDates={ selectedDates[idx] }
              customInput={ <Button>{ usage[idx] } day(s)</Button> }
              onChange={ ( d ) => handleDateChange( { d, idx } ) }
              shouldCloseOnSelect={ false }
              disabledKeyboardNavigation
            />
          </td>
        ) )
      }
    </tr>
  );
};