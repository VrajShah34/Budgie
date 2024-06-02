import { Trash } from 'lucide-react'
import React from 'react'
import { db } from '../../../../../utils/dbConfig'
import { Expenses } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

function ExpenseListTable({expensesList}) {

    const deleteExpense = async (expense) => {
        const result = await db.delete().from(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

        if(result){
            toast('Expense Deleted Successfully');
        }
    }

  return (
    <div  className='mt-3'>
        <div className='grid grid-cols-4 bg-slate-200 p-2' >
            <h2>Name</h2>
            <h2>Amount</h2>
            <h2>Date</h2>
            <h2>Action</h2>
        </div>

        {expensesList.map((expenses,index) => (
            <div className='grid grid-cols-4 bg-slate-5 0 p-2' >
             <h2>{expenses.name}</h2>
             <h2>{expenses.amount}</h2>
             <h2>{expenses.createdAt}</h2>
             <h2>
                <Trash className='hover:cursor-pointer text-red-600'
                
                onClick={() => deleteExpense(expenses)}
                    />
             </h2>
             
            </div>
        ))}
    </div>
  )
}

export default ExpenseListTable