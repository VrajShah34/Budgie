"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import { db } from '../../../../../utils/dbConfig'
import { Budgets, Expenses } from '../../../../../utils/schema'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { get } from 'http'
import { useUser } from '@clerk/nextjs'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpenses from '../../expenses/_components/AddExpenses'
import ExpenseListTable from '../../expenses/_components/ExpenseListTable'
import { Button } from '../../../../../components/ui/button'
import { Trash } from 'lucide-react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../../../../../@/components/ui/alert-dialog"

  

function ExpensesScreen({params}) {

    const {user} = useUser();

    const [budgetInfo, setbudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);

    useEffect(() => {
        console.log('HII'),
        user && getBudgetInfo();
        
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

        getExpensesList();
    }

    const getExpensesList = async () => {
        const result = await db.select().from(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .orderBy(desc(Expenses.id));

        setExpensesList(result);

        console.log(result);
    }


    const deleteBudget = async () => {
        const result = await db.delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();

        console.log(result);
    }

  return (
    <div className='p-10' >
        <h2 className='text-2xl font-bold flex justify-between ' >My Expenses 
        
           
                

            <AlertDialog>
                <AlertDialogTrigger asChild >
                <Button className='flex gap-2 mb-5' variant="destructive" >
                    <Trash/> Delete Budget
                 </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction  onClick = {() => deleteBudget()}   >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            
        
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2' >
            
            {budgetInfo?<BudgetItem budget={budgetInfo}/>
            :<div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse' >

            </div> }
            <AddExpenses budgetId = {params.id}
            user = {user}/>
        </div>

        <div className='mt-4' >
            <h2>Latest Expenses</h2>
            <ExpenseListTable expensesList = {expensesList} />
        </div>

    </div>
  )
}

export default ExpensesScreen