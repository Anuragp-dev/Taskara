import { useTasks } from '@/context/taskContext';
import React from 'react'





const Filters = () => {

    const { priority, setPriority } = useTasks();

    const priorities = ["All", "Medium", "Low", "High",];
    return (
        <div className='relative py-2 grid grid-cols-4 items-center gap-3 bg-[#F9F9F9] border-2 border-white rounded-md' >
            filter
        </div>
    )
}

export default Filters
