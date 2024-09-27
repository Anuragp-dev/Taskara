import React from 'react'

interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout = ( { children }: MainLayoutProps) => {
  return (
    <div className='main-layout flex-1 bg-[#EDEDED] bg-1  border-2 border-white rounded-[1.5rem] overflow-auto'>
      {children}
    </div>
  )
}

export default MainLayout
