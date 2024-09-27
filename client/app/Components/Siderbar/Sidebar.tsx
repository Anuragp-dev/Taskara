import React from 'react'
import Profile from '../Profile/Profile'

const Sidebar = () => {
  return (
    <div className='fixed right-0 top-0 w-[20rem] mt-[5rem] h-[calc(100%-5rem)] flex flex-col bg-[#f9f9f9]'>
      <Profile/>
    </div>
  )
}

export default Sidebar
