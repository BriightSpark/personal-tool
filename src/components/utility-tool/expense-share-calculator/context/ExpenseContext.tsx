import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Expense, ExpenseSplit, ExpenseType, IExpenseContext, TableType, User } from '../type';


export const ExpenseContext = createContext<IExpenseContext | undefined>( undefined );
export const ExpenseProvider = ( { children } : any ) => {

  const [table, setTable] = useState<TableType>( {
    users: [],
    expenses: []
  } );
  const [expenseList, setExpenseList] = useState<Expense[]>( [] );
  const [updated, setUpdated] = useState<boolean>( false );

  /** Check if localStorage exist */
  useEffect( () => {
    const localStageData = localStorage.getItem( 'expense-sharing-data' );
    if ( localStageData ) {
    // Parse data and replace table data
    }
    else {
      const user1 : User = { name: 'User 1', id: uuidv4() };
      const user2 : User = { name: 'User 2', id: uuidv4() };
      const user3 : User = { name: 'User 3', id: uuidv4() };

      const expense1 : Expense = { id: uuidv4(), description: 'Sample usage expense', type: 'usage', amount: 0 };
      const expense2 : Expense = { id: uuidv4(), description: 'Sample equal expense', type: 'equal', amount: 0 };

      setTable( {
        users: [ user1, user2, user3 ],
        expenses: [
          {
            userId: user1.id,
            expenses: [ { expenseId: expense1.id, amount: 0 }, { expenseId: expense2.id, amount: 0 } ]
          },
          {
            userId: user2.id,
            expenses: [ { expenseId: expense1.id, amount: 0 }, { expenseId: expense2.id, amount: 0 } ]
          },
          {
            userId: user3.id,
            expenses: [ { expenseId: expense1.id, amount: 0 }, { expenseId: expense2.id, amount: 0 } ]
          }
        ]
      } );

      setExpenseList( [expense1, expense2] );
    }
  }, [] );

  const findUserFromId = ( id: string ) : User | undefined => {
    return table.users.find( ( u ) => u.id === id );
  };

  const findExpenseFromId = ( id: string ) : Expense | undefined => {
    return expenseList.find( ( e ) => e.id === id );
  };

  const findUserIndex = ( id: string ) : number | undefined => {
    return table.users.findIndex( ( u ) => u.id === id );
  };

  const findExpenseIndex = ( id: string ) : number | undefined => {
    return expenseList.findIndex( ( e ) => e.id === id );
  };

  const onUserAdd = () => {
    const newUserId = uuidv4();
    setTable( {
      ...table,
      users: [
        ...table.users,
        { name: `User ${ table.users.length + 1 }`, id: newUserId }
      ],
      expenses: [
        ...table.expenses,
        { userId: newUserId, expenses: expenseList.map( ( e ) => ( { expenseId: e.id, amount: 0 } ) ) }
      ]
    } );
  };

  const onUserRemove = ( id: string ) => {
    const userIdx = findUserIndex( id );

    if ( userIdx !== undefined ) {
      setTable( {
        users: [
          ...table.users.slice( 0, userIdx ),
          ...table.users.slice( userIdx + 1 )
        ],
        expenses: table.expenses.filter( ( e ) => e.userId !== id )
      } );
    }
  };

  const onUserNameUpdate = ( { id, name } : { id: string, name: string } ) => {
    const user = findUserFromId( id );
    const userIdx = findUserIndex( id );

    if ( user && userIdx !== undefined ) {
      setTable( {
        ...table,
        users: [
          ...table.users.slice( 0, userIdx ),
          { ...user, name: name },
          ...table.users.slice( userIdx + 1 )
        ]
      } );
    }
  };

  const onExpenseAdd = ( type: ExpenseType ) => {
    const expenseId = uuidv4();
    setExpenseList( [
      ...expenseList,
      { id: expenseId, type: type, description: `New ${ type.toLowerCase() } expense`, amount: 0 }
    ] );
    setTable( {
      ...table,
      expenses: table.expenses.map( ( e ) => ( {
        ...e,
        expenses: [...e.expenses, { expenseId: expenseId, amount: 0 }]
      } ) )
    } );
  };

  const onExpenseUpdate = ( { ex, id } : { ex: Expense, id: string } ) => {
    const idx = findExpenseIndex( id );
    if ( idx !== undefined ) {
      setExpenseList( [
        ...expenseList.slice( 0, idx ),
        ex,
        ...expenseList.slice( idx + 1 )
      ] );
    }
  };

  const onExpenseRemove = ( id: string ) => {
    const idx = findExpenseIndex( id );
    if ( idx !== undefined ) {
      setExpenseList( [
        ...expenseList.slice( 0, idx ),
        ...expenseList.slice( idx + 1 )
      ] );
      setTable( {
        ...table,
        expenses: table.expenses.map( ( uEx ) => ( { ...uEx, expenses: uEx.expenses.filter( ( e ) => e.expenseId !== id ) } ) )
      } );
    }
  };

  const onTableExpenseUsageUpdate = useCallback( ( split : ExpenseSplit[] ) => {
    const updatedTable = table;
    setUpdated( !updated );

    split.forEach( ( s ) => {
      const { userId, expenseId, amount } = s;
      const userIndex = updatedTable.expenses.findIndex( ( u ) => u.userId === userId );
      const userExpenseIndex = updatedTable.expenses[userIndex].expenses.findIndex( ( uEx ) => uEx.expenseId === expenseId );

      updatedTable.expenses[userIndex].expenses[userExpenseIndex].amount = Number( amount.toFixed( 2 ) );
    } );
    setTable( updatedTable );
  }, [JSON.stringify( table ), JSON.stringify( expenseList ), JSON.stringify( updated )] );

  /**
   * Constructing object values for data context
   */
  const contextValue = useMemo( () => ( {
    state: {
      users: table.users,
      userExpenses: table.expenses,
      expenses: expenseList
    },
    action: {
      onUserAdd,
      onUserRemove,
      onUserNameUpdate,
      onExpenseAdd,
      onExpenseUpdate,
      onExpenseRemove,
      onTableExpenseUsageUpdate
    },
    utils: {
      findUserFromId,
      findExpenseFromId
    }
  } ), [JSON.stringify( table ), JSON.stringify( expenseList ), JSON.stringify( updated )] ) as IExpenseContext;

  return (
    <ExpenseContext.Provider value={ contextValue }>
      { children }
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = (): IExpenseContext => {
  const context = useContext( ExpenseContext );

  if ( !context ) {
    throw new Error( 'Could not find Data-context value; please ensure the component is wrapped in the <Provider>' );
  }

  return context;
};
