"use client";
import { useTasks } from '@/context/taskContext';
import { useUserContext } from '@/context/userContext';
import { github, moon, profile } from '@/Utils/Icons';
import Link from 'next/link';
import React from 'react'


const Header = () => {

  const { user } = useUserContext()
  const { activeTasks, openModalForAdd } = useTasks()
  const { name } = user
  const userId = user?._id
  return (
    <header className='px-6 flex p-3 w-full items-center justify-between bg-[#f9f9f9]'>
      <div className="">
        <h1 className='text-lg font-medium'>
          <span role='img' aria-label='wave'>
            👋
          </span>
          {userId ? `Welcome, ${name}` : "Welcome to Taskara"}
        </h1>
        <p className='text-sm'>
          {userId ? (

            <>
              You have <span className="font-bold text-[#3aafae]">{activeTasks?.length} </span>{""}active tasks
            </>
          ) : (
            "please login"
          )}
        </p>
      </div>
      <div className='h-[50px] flex items-center gap-[10.4rem]'>
        <button
          className='px-8 py-3 bg-[#3aafae] text-white rounded-[50px] hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out'
          onClick={openModalForAdd}
        >
          Create a new Task
        </button>
        <div className="flex gap-4 items-center">
          <Link className='h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]'
            href="/profile"
            passHref
            target="_blank"
            rel="noopener noreferrer">
            {github}
          </Link>

          <Link className='h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]'
            href="/profile"
            passHref
            target="_blank"
            rel="noopener noreferrer">
            {moon}
          </Link>

          <Link className='h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]'
            href="/profile"
            passHref
            target="_blank"
            rel="noopener noreferrer">
            {profile}
          </Link>

        </div>
      </div>
    </header>
  )
}

export default Header
