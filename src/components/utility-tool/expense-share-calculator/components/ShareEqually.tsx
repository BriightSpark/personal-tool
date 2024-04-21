import React, { useEffect, useState } from 'react';

import { Expense, ExpenseSplit, User } from '../type';

type ShareEquallyType = {
  users: User[]
  expense: Expense
  description: string
  onExpenseUpdate: ( e: Expense ) => void
  onUsageUpdate: ( s: ExpenseSplit[] ) => void
  onRemove: ( ) => void
}

export const ShareEqually = ( {
  users,
  expense,
  description: initDescription = '',
  onExpenseUpdate = () => undefined,
  onUsageUpdate = () => undefined,
  onRemove = () => undefined
} : ShareEquallyType ) => {

  const [description, setDescription] = useState<string>( initDescription );
  const [cost, setCost] = useState<number>( 0 );
  const [usage, setUsage] = useState<boolean[]>( new Array( users.length ).fill( false ) );

  useEffect( () => {
    const totalUsage = usage.filter( ( u ) => u === true ).length;

    const usageUpdate = users.map( ( u : User, idx : number ) => {
      return ( {
        userId: u.id,
        expenseId: expense.id,
        amount: usage[idx] ? cost / totalUsage : 0
      } );
    } );
    onUsageUpdate( usageUpdate );
  }, [JSON.stringify( usage ), cost] );


  useEffect( () => {
    users.forEach( ( u, idx ) => {
      !usage[idx] && setUsage( [
        ...usage.slice( 0, idx ),
        false,
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

  return (
    <tr className='expense-calculator__table-body-content'>
      <td className='expense-calculator__table-body-content-description'>
        <input type='text' onChange={ ( e ) => handleDescriptionChange( e.target.value ) } value={ description } />
        <div>
          A$ <input type='number' min='0' placeholder='Total cost of expense' onChange={ ( e ) => handleCostChange( Number( e.target.value ) ) } />
        </div>        <button
          className='expense-calculator__remove-expense_btn'
          onClick={ () => onRemove() }
        >X</button>
      </td>
      {
        users.map( ( u, idx ) => (
          <td key={ u.id }>
            <input
              type='checkbox'
              checked={ usage[idx] }
              onChange={ ( e ) => setUsage( [
                ...usage.slice( 0, idx ),
                e.target.checked,
                ...usage.slice( idx + 1 )
                ] ) }
            />
          </td>
        ) )
      }
    </tr>
  );
};
