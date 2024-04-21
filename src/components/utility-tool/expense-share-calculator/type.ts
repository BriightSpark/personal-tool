export type IExpenseContext = {
  state: {
    users: User[],
    userExpenses: {
      userId: string
      expenses: UserExpense[]
    }[],
    expenses: Expense[]
  },
  action: {
    onUserAdd: () => void,
    onUserRemove: ( id: string ) => void,
    onUserNameUpdate: ( { id, name } : { id: string, name: string } ) => void,
    onExpenseAdd: ( type: ExpenseType ) => void,
    onExpenseUpdate: ( { ex, id } : { ex: Expense, id: string } ) => void,
    onExpenseRemove: ( id: string ) => void,
    onTableExpenseUsageUpdate: ( s: ExpenseSplit[] ) => void
  }
  utils: {
    findUserFromId: ( id: string ) => User | undefined,
    findExpenseFromId: ( id: string ) => Expense | undefined,
  }
}

export type User = { id: string, name: string }
export type ExpenseSplit = { userId: string, expenseId: string, amount: number }

export type ExpenseType = 'usage' | 'equal'
export type Expense = {
  id: string
  description: string
  type: ExpenseType
  amount: number
}


export type UserExpense = { expenseId: string, amount: number };
export type TableType = {
  users: User[]
  expenses: {
    userId: string
    expenses: UserExpense[]
  }[]
}