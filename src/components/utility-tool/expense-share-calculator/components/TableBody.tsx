import React from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import { Expense, ExpenseSplit } from '../type';
import { ShareByUsage } from './ShareByUsage';
import { ShareEqually } from './ShareEqually';

export const TableBody = () => {
  const {
    state: {
      users,
      expenses
    },
    action: {
      onExpenseUpdate,
      onExpenseRemove,
      onTableExpenseUsageUpdate
    }
  } = useExpenseContext();

  return (
    <tbody className='expense-calculator__table-body'>
      {
        expenses.map( ( e : Expense, idx: number ) => {
          switch ( e.type ) {
            case 'usage':
              return <ShareByUsage
                key={ e.id }
                users={ users }
                expense={ e }
                description={ e.description }
                onExpenseUpdate={ ( e: Expense ) => onExpenseUpdate( { ex: e, id: e.id } ) }
                onUsageUpdate={ ( s: ExpenseSplit[] ) => onTableExpenseUsageUpdate( s ) }
                onRemove={ () => onExpenseRemove( e.id ) }
              />;

            case 'equal':
              return <ShareEqually
                key={ e.id }
                users={ users }
                expense={ e }
                description={ e.description }
                onExpenseUpdate={ ( e: Expense ) => onExpenseUpdate( { ex: e, id: e.id } ) }
                onUsageUpdate={ ( s: ExpenseSplit[] ) => onTableExpenseUsageUpdate( s ) }
                onRemove={ () => onExpenseRemove( e.id ) }
              />;
          }
        } )
      }
    </tbody>
  );
};

