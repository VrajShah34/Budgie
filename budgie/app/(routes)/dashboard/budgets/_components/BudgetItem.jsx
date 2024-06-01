import Link from 'next/link'
import React from 'react'

function BudgetItem({budget}) {
  return (
    <Link href={'/dashboard/expenses/' + budget?.id} className='p-5 border rounded-lg hover:cursor-pointer hover:shadow-md'>
      <div className='flex gap-2 items-center justify-between' >
        
        <div className='flex gap-2 items-center'>
            <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full' >
              {budget.icon}
            </h2>

            <div>
              <h2 className='text-xl font-bold'>{budget.name}</h2>
              <h2 className='font-sm text-gray-600'>{budget.totalItem} Items</h2>
            </div>
        </div>

        <h2 className='font-bold text-primary text-2xl'>${budget.amount}</h2>

        </div>

        <div  className='mt-5'>
          
          <div className='flex items-center justify-between'>
            <h2 className='text-sm pb-1'>${budget.totalSpend?budget.totalSpend:0} Spent</h2>
            <h2 className='text-sm pb-1'>${budget.amount-budget.totalSpend} Remaining</h2>
          </div>

          <div className='w-full bg-slate-300 h-2 rounded-full'>
              <div className='w-[40%] bg-primary h-2 rounded-full '>

              </div>
          </div>
        </div>
    </Link>
  )
}

export default BudgetItem