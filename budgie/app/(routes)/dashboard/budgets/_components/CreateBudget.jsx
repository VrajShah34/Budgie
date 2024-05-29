"use client"

import React from 'react'
import {Button} from '../../../../../components/ui/button.jsx'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,   
    DialogTitle,
    DialogTrigger,
  } from "../../../../../@/components/ui/dialog.jsx"
import EmojiPicker from 'emoji-picker-react'
import { Input } from '../../../../../@/components/ui/input.jsx'
import { db } from '../../../../../utils/dbConfig.jsx'
import { Budgets } from '../../../../../utils/schema.jsx'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
  

function CreateBudget() {

    //Use state to manage the emoji icon picking for bugdet
    const [emojiIcon , setImojiIcon] = useState('🤑');
    const [openEmojiPicker , setOpenEmojiPicker] = useState(false);

    //Use state to manage the budget name and amount
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(''); 

    //Get the current user
    const {user} = useUser();
    
    //Function to create a new budget and save it in database
    const onCreateBudget = async () => {
        const result = await db.insert(Budgets)
        .values({
            name:name,
            amount:amount,
            icon:emojiIcon,
            createdBy: user?.primaryEmailAddress?.emailAddress
            
        }).returning({insertedId:Budgets.id});

        if(result){
            toast('New Budget Created Successfully'); // uses the sonner library to show a toast message
        }
    }

  return (
    <div>

         {/* Dialog component to create a new budget using the schadcn dialog library*/}
        <Dialog > 
            <DialogTrigger asChild>
            <div className='bg-slate-100 p-10  rounded-md items-center flex flex-col border-2 border-dashed
        cursor-pointer hover:shadow-md'>
            <h2 className='text-3xl' >+</h2>
            <h2> Create New Budget</h2>
        </div>
            </DialogTrigger>
            
           
            <DialogContent className='w-1/2 '>

                 <DialogHeader>         {/*  All the content in the create budget window popup */}

                  <DialogTitle className='mt-4'>Create New Budget</DialogTitle>
                  <DialogDescription>
                <div className='mt-5'>

                   <Button variant="outline" className='text-2xl'
                    onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}>                
                    {emojiIcon}
                   </Button>

                   <div className='absolute '>
                        <EmojiPicker
                        open = {openEmojiPicker}
                        onEmojiClick={(e) => {setImojiIcon(e.emoji), setOpenEmojiPicker(false)}}
                        />
                   </div>

                   <div className='flex flex-col justify-center'>
                        <h2 className='text-black font-semibold mt-5 text-lg'>Budget Name</h2>
                        <Input className='mx-auto w-1/2 mt-2 mb-4 border-slate-600 justify-center' 
                        placeholder="e.g. home decor" 
                        onChange={(e)=>setName(e.target.value)}
                        />
                   </div>
                   <div className='flex flex-col justify-center'>
                        <h2 className='text-black font-semibold mt-3\2 text-lg'>Budget Amount</h2>
                        <Input 
                        type='number'
                        className='mx-auto w-1/2 mt-2 mb-4 border-slate-600 justify-center'
                         placeholder="e.g. $5000"
                         onChange={(e)=>setAmount(e.target.value)} 
                         />
                   </div>

                   <Button 
                   className='mt-3 mb-7 '
                //    {/* Disable the button if the name or amount is empty */}
                   disabled = {name.length == 0 || amount.length == 0} 
                   onClick={() => onCreateBudget()}
                   > Create Budget</Button>

                </div>
                  </DialogDescription>
                </DialogHeader>
            </DialogContent>
            

        </Dialog>

    </div>
  )
}

export default CreateBudget