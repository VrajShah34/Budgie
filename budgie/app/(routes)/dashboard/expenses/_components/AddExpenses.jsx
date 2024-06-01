
import React, { useState } from 'react'
import { Input } from '../../../../../@//components/ui/input'
import { Button } from '../../../../../components/ui/button'
import { db } from '../../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../../utils/schema';
import { toast } from 'sonner';

function AddExpenses({budgetId , user}) {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    const addNewExpense = async() => {
        const result = await db.insert(Expenses).values({
            name:name,
            amount:amount,
            budgetId:budgetId,
            createdAt:user?.primaryEmailAddress?.emailAddress
        }).returning({insertedId:Budgets.id}); 

        console.log(result);

        if(result){
            toast('New Expense Added Successfully');
        }
    }

  return (
    <div className='border p-5 rounded-lg ' >
        <h2 className='font-bold text-lg' > Add Expense</h2>
        <div className='flex flex-col justify-center'>
            <h2 className='text-black font-semibold mt-5 text-lg'>Budget Name</h2>
            <Input className='mx-auto w-1/2 mt-2 mb-4 border-slate-600 justify-center' 
            placeholder="e.g. Bedroom decor" 
            onChange={(e)=>setName(e.target.value)}
            />
        </div>
        <div className='flex flex-col justify-center'>
            <h2 className='text-black font-semibold mt-5 text-lg'>Budget Amount</h2>
            <Input className='mx-auto w-1/2 mt-2 mb-4 border-slate-600 justify-center' 
            placeholder="e.g. $100" 
            onChange={(e)=>setAmount(e.target.value)}
            />
        </div>

        <Button className='mt-3 w-full'
           onCick = {() => addNewExpense()}
        > Add New Expense</Button>
    </div>
  )
}

export default AddExpenses