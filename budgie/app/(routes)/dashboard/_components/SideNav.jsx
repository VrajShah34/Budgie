"use client"
import React, { use } from 'react';
import Image from 'next/image';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import path from 'path';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

function SideNav() {

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Budgets',
      icon: PiggyBank,
      path: '/dashboard/budgets',
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses',
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade',
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  
  } , [path])

  return (
    <div className="h-screen p-5 border shadow-md">
      <Image src="./logo.svg" alt="logo" width={160} height={100} className="pb-10" />

      <div className='mt-5'>
        {menuList.map((menu) => (
          <Link href={menu.path}>
            <h2 key={menu.id} className={`gap-2 flex items-center p-5 text-gray-700 font-bold text-xl
            cursor-pointer mb-2 rounded-md hover:text-primary hover:bg-blue-100  
            ${path  == menu.path && 'text-primary bg-blue-100'}
            `}>
              <menu.icon/> 
              {menu.name}
            </h2>
          </Link>
        ))}

        <div className='fixed bottom-10 p-5 ml-8 flex gap-4 items-center text-xl hover:bg-blue-600 cursor-pointer rounded-md hover:text-white'>
          <UserButton/>
          Profile
        </div>

      </div>
    </div>
  );
}

export default SideNav;
