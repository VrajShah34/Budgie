import React from 'react';
import Image from 'next/image';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
    },
    {
      id: 2,
      name: 'Budgets',
      icon: PiggyBank,
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="h-screen p-5 border shadow-md">
      <Image src="./logo.svg" alt="logo" width={160} height={100} className="pb-10" />

      <div className='pt-5'>
        {menuList.map((menu) => (
          <h2 key={menu.id} className="gap-2 flex items-center p-5 text-gray-700 font-bold text-xl cursor-pointer rounded-md">
            <menu.icon className="mr-2" /> 
            {menu.name}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
