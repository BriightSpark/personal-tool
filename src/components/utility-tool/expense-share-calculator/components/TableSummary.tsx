import React from 'react';
import { useRouter } from 'next/router';
import { useExpenseContext } from '../context/ExpenseContext';

export const TableSummary = () => {
  const {
    state: {
      userExpenses
    },
    utils: {
      findUserFromId,
      findExpenseFromId
    }
  } = useExpenseContext();

  const router = useRouter();

  return (
    <div className='table-summary'>
      <h2 className='table-summary__heading'>Cost breakdown</h2>

      <div className='table-summary__users'>
        {
        userExpenses.map( ( uEx ) => {
          const user = findUserFromId( uEx.userId );
          const totalCost = uEx.expenses.reduce( ( e, a ) => e + a.amount, 0 );

          return (
            <div className='table-summary__user' key={ uEx.userId }>
              <h3 className='table-summary__user-name'>{ user?.name }</h3>
              <div className='table-summary__user-expenses'>
                { uEx.expenses.map( ( e ) => {
                  const expense = findExpenseFromId( e.expenseId );

                  return (
                    <div className='table-summary__user-expense' key={ expense?.id }>
                      <span className='table-summary__user-expense-desc'>{ expense?.description }</span>
                      <span className='table-summary__user-expense-amount'>{ new Intl.NumberFormat( router.locale, { style: 'currency', currency: 'AUD' } ).format( e.amount || 0 ) }</span>
                    </div>
                  );
                } ) }
                <div className='table-summary__user-expense table-summary__user-expenses-total'>
                  <span>Total</span>
                  <span>{ new Intl.NumberFormat( router.locale, { style: 'currency', currency: 'AUD' } ).format( totalCost || 0 ) }</span>
                </div>
              </div>

            </div>
          );
        } )
      }
      </div>
    </div>
  );
};