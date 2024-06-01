"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import { db } from '../../../../../utils/dbConfig'
import { Budgets, Expenses } from '../../../../../utils/schema'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { get } from 'http'
import { useUser } from '@clerk/nextjs'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpenses from '../../expenses/_components/AddExpenses'

function ExpensesScreen({params}) {

    const {user} = useUser();

    const [budgetInfo, setbudgetInfo] = useState();

    useEffect(() => {
        console.log('HII'),
        user && getBudgetInfo()
    }, [user])

    const getBudgetInfo = async() => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql `count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
        .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id, params.id))
        .groupBy(Budgets.id)

        setbudgetInfo(result[0]);
        console.log("From Expenses Screen");
        console.log(result);
    }

  return (
    <div className='p-10' >
        <h2 className='text-2xl font-bold' >My Expenses</h2>

        <div className='grid grid-cols-1 md:grid-cols-2' >
            
            {budgetInfo?<BudgetItem budget={budgetInfo}/>
            :<div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse' >

            </div> }
            <AddExpenses budgetId = {params.id}
            user = {user}/>
        </div>

    </div>
  )
}

export default ExpensesScreen