import { useTasks } from '@/context/taskContext';
import React from 'react'





const Filters = () => {

    const [activeIndex, setActiveIndex] = React.useState(0);
    const { priority, setPriority } = useTasks();

    const priorities = ["All", "Medium", "Low", "High",];
    return (
        <div className='relative py-2 grid grid-cols-4 items-center gap-3 bg-[#F9F9F9] border-2 border-white rounded-md' >
            <span className='absolute left-[5px] bg-[#EDEDED] rounded-md transition-all duration-300 '
                style={{
                    width: "calc(100%/4 - 10px)",
                    height: "calc(100% - 10px)",
                    top: "50%",
                    transform: `translate(calc(${activeIndex * 100}% + ${
                        activeIndex * 10
                        }px), -50%)`,
                    transition: "transform 300ms cubic-bezier(95, .03, 1, 1)"
                }}></span>
            {priorities.map((priority, index) => (
                <button
                    key={index}
                    className={`relative px-1 z-10 front-medium text-sm ${activeIndex === index ? 'text-[#3aafae]' : 'text-gray-500'} `}
                    onClick={() => {
                        setActiveIndex(index);
                        setPriority(priority.toLocaleLowerCase());
                    }}
                >
                    {priority}
                </button>
            ))
            }
        </div>
    )
}

export default Filters
