import React from 'react';
import { useExpenseContext } from '../context/ExpenseContext';

export const TableHeader = () => {
  const {
    state: {
      users
    },
    action: {
      onUserRemove,
      onUserNameUpdate
    }
  } = useExpenseContext();

  return (
    <thead className='expense-calculator__table-head'>
      <tr>
        <th className='expense-calculator__table-head-empty-col'></th>
        {
        users.map( ( u ) => (
          <th key={ u.id } scope='col' className='expense-calculator__table-head-user'>
            <div className='expense-calculator__table-head-user-col'>
              <input
                value={ u.name }
                onChange={ ( e ) => onUserNameUpdate( { id: u.id, name: e.target.value } ) }
              />
              <button
                onClick={ () => onUserRemove( u.id ) }
              >X</button>
            </div>
          </th>
        ) )
      }
      </tr>
    </thead>
  );
};