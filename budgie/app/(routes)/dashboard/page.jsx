"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo.jsx'
import { eq, getTableColumns, sql } from 'drizzle-orm';
import { db } from '../../../utils/dbConfig.jsx';
import { Budgets, Expenses } from '../../../utils/schema';
import BarChartDashboard from './_components/BarChartDashboard.jsx';

function Dashboard() {

  const {user} = useUser();

  const [budgetList, setBudgetList] = useState([]);

    

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
    
      <div className='p-8' >
        <h2 className='font-bold text-3xl' >Hi, {user?.fullName}</h2>
        <p className='text-gray-600' > Here's whats happening wit your money, Lets manage your expenses</p>

        <CardInfo budgetList = {budgetList} />

        <div className='grid grid-col-1 md:grid-cols-3 mt-6' >
          <div className='md: col-span-2' >
            <BarChartDashboard
              budgetList = {budgetList}
            />
          </div>
          <div>
            Other Content
          </div>

        </div>

      </div>
    
  )
}

export default Dashboard