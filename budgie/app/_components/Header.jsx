"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '../../components/ui/button.jsx'
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

function Header() {
  return (
    <div className='p-5 border flex justify-between items-center shadow-lg'  >
        <Image src={'./logo.svg'}
        alt='logo'
        width={160}
        height={100} />

<SignedOut>
          <SignInButton className = 'bg-primary px-5 py-3 mr-4 text-white rounded-md' />
      </SignedOut>
        <SignedIn>
          <UserButton  />
        </SignedIn> 
    </div>
  )
}

export default Header