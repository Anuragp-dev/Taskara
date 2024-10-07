"use client";

import { useTasks } from '@/context/taskContext';
import React from 'react'

const Modal = () => {

    const { task, handleInput } = useTasks();

    return (
        <div className='fixed flex justify-center items-center left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden'>
            <form action="" className='py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute transform-translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md '>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="">Title</label>
                    <input
                        className='bg-[#F9F9F9] p-2 rounded-md border'
                        type="text"
                        id='title'
                        placeholder='Task Title'
                        name='title'
                        value={task?.title}
                        onChange={(e) => handleInput("title")(e)}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="">Description</label>
                    <textarea
                        className='bg-[#F9F9F9] p-2 rounded-md border resize-none'
                        placeholder=' Task Description'
                        name='description'
                        rows={4}
                        value={task?.description}
                        onChange={(e) => handleInput("description")(e)}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="">Description</label>
                    <select
                        className='bg-[#F9F9F9] p-2 rounded-md border cursor-pointer'
                        name='priority'
                        value={task?.priority}
                        onChange={(e) => handleInput("priority")(e)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Modal
