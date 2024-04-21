import React from 'react';
import { useTranslation } from 'next-i18next';

import { Button } from '@briightspark/ui-components';
import { useExpenseContext } from './context/ExpenseContext';
import { TableHeader } from './components/TableHeader';
import { TableBody } from './components/TableBody';
import { TableSummary } from './components/TableSummary';


/**
 * [
 *    Users[]
 *    Expenses[]
 * ]
 * @returns {JSX.Element} Expense Share component
 */
const ExpenseShareCalculator = () => {
  const { t } = useTranslation();
  const {
    action: {
      onUserAdd,
      onExpenseAdd
    }
  } = useExpenseContext();


  return (
    <div className={ 'expense-calculator' }>
      <div className='expense-calculator__header'>
        <h1 className='expense-calculator__heading'>{ t( 'expense-calculator', 'Expense calculator' ) }</h1>
        <Button size='sm' onClick={ () => onUserAdd() }>Add user</Button>
      </div>
      <div className='expense-calculator__table'>
        <table className='min-w-full'>
          <TableHeader />
          <TableBody />
        </table>
      </div>
      <div className='expense-calculator__new-expenses' >
        <Button variant='primary' onClick={ () => onExpenseAdd( 'usage' ) }>Add Usage Expense</Button>
        <Button variant='dark' onClick={ () => onExpenseAdd( 'equal' ) }>Add Equal Expense</Button>
      </div>
      <div>
        <TableSummary />
      </div>
    </div>
  );
};

export default ExpenseShareCalculator;