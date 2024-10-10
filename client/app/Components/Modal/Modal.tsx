"use client";
import { useTasks } from '@/context/taskContext';
import useDetectOutside from '@/hooks/useDetectOutside';
import React, { useEffect } from 'react'

const Modal = () => {

    const { task, handleInput, createTask, isEditing, closeModal, modalMode, activeTask, updateTask } = useTasks();
    const ref = React.useRef(null);


    useDetectOutside({
        ref,
        callback: () => {
            if (isEditing) {
                closeModal();
            }
        }
    })

    useEffect(() => {
        if (modalMode === "edit" && activeTask) {
            console.log("Active task for editing:", activeTask); // Log the active task
            handleInput("setTask")(activeTask);  // Set the active task when editing
        }
    }, [modalMode, activeTask]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (modalMode === "edit") {
            updateTask(task);
        } else if (modalMode === "add") {
            createTask(task);
        }

        closeModal();
    }

    return (
        <div className='fixed flex justify-center items-center left-0 top-0 bottom-0 right-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden' >
            <form
                action=""
                className='py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute rounded-lg shadow-md '
                onSubmit={handleSubmit}
                ref={ref}
            >
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
                <div className='flex flex-col gap-1'>
                    <label htmlFor="">Title</label>
                    <input
                        className='bg-[#F9F9F9] p-2 rounded-md border'
                        type="date"
                        name='dueDate'
                        value={task?.dueDate}
                        onChange={(e) => handleInput("dueDate")(e)}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="completed">Task Completed</label>
                    <div className='flex items-center justify-between bg-[#F9F9F9] p-2 rounded-md border'>
                        <label htmlFor="completed"> Completed</label>
                        <div>

                            <select
                                className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer"
                                name='completed'
                                value={task?.completed ? "true" : "false"}
                                onChange={(e) => handleInput("completed")(e)}
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='mt-8'>
                    <button type='submit'
                        className={`text-white py-2 rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out ${modalMode === "edit" ? "bg-blue-400" : "bg-green-600"}`}
                    >
                        {modalMode === "edit" ? "Edit Task" : "create Task"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Modal
