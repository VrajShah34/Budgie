"use client"

import React, { use, useEffect, useState } from 'react'
import CreateBugdet from './CreateBudget'
import { db } from '../../../../../utils/dbConfig'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '../../../../../utils/schema'
// import { group } from 'console'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'

function BudgetList() {

    const [budgetList, setBudgetList] = useState([]);

    const {user} = useUser();

    useEffect(() => {
        user && getBudgetList(); // Only fetch budgetList if user is logged in
    }, [user])


    //Used to get all the budgets and their total spend and total items 
    const getBudgetList = async() => {

        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql `count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
        .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)

        setBudgetList(result); // Saves the result in the budgetList array state
        console.log("Here are the budgets");
        console.log(result);
    }

  return (
    <div className='mt-7'>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <CreateBugdet
            refereshData={() => getBudgetList()}
            />
            {budgetList.map((budget,index) => ( // Iterates the budgetList array created and renders each BudgetItem component
                <BudgetItem budget = {budget}/>
            ))}

        </div>
        
    </div>
  ) 
}

export default BudgetList