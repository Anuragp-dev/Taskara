"use client"
import Modal from '@/app/Components/Modal/Modal'
import { useTasks } from '@/context/taskContext'
import React from 'react'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isEditing } = useTasks()
  return (
    <div className='main-layout flex-1 bg-[#EDEDED] bg-1  border-2 border-white rounded-[1.5rem] overflow-auto'>
      {isEditing && <Modal />}
      {children}
    </div>
  )
}

export default MainLayout
