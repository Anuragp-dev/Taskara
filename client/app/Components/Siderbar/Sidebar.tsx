import React from 'react';
import Profile from '../Profile/Profile';
import RadioChart from '../RadioChart/RadioChart';

const Sidebar = () => {
  return (
    <div className='fixed right-0 top-0 w-full sm:w-[20rem] mt-[5rem] h-[calc(100vh-5rem)] flex flex-col bg-[#f9f9f9] overflow-y-auto'>
      <Profile />
      <div className='mt-4 mx-6'>
        <RadioChart />
      </div>
      <button className='mt-auto mb-6 py-4 px-8 mx-6 bg-[#EB4E31] text-white rounded-[20px] hover:bg-[#3aafae] transition duration-300 ease-in-out'>
        Sign out
      </button>
    </div>
  );
}

export default Sidebar;
