"use client"
import { useTasks } from '@/context/taskContext'
import { useUserContext } from '@/context/userContext'
import useDetectOutside from '@/hooks/useDetectOutside'
import { badge, check, github } from '@/Utils/Icons'
import Image from 'next/image'
import React from 'react'

const ProfileModal = () => {

    const { closeModal } = useTasks()
    const { user, updateUser, handlerUserInput, userState, changePassword } = useUserContext()

    const ref = React.useRef(null)

    useDetectOutside({
        ref,
        callback: () => {
            closeModal()
        }
    })

    // profile

    const { name, email, Photo } = user;
    return (

        <div className='fixed flex justify-center items-center left-0 top-0 bottom-0 right-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden' >

            <div
                ref={ref}
                className='py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute rounded-lg shadow-md '>

                <div className='absolute left-0 top-0 w-full h-[80px] bg-[#323232]/10 rounded-tr-md rounded-tl-md'>

                    <div className='mt-4 relative flex justify-between'>
                        <div className='relative inline-block'>
                            <Image
                                src={Photo}
                                alt="avatar"
                                width={70}
                                height={70}
                                className="rounded-full"
                            />

                            <div className='absolute right-1 bottom-0 shadow-sm'>
                                <span className='text-lg text-blue-400'>{badge}</span>
                                <span className='absolute z-20 left[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs text-white'>
                                    {check}
                                </span>
                            </div>
                        </div>
                        <div className='self-end flex items-center gap-2'>
                            <button className='flex items-center gap-2 border-[#323232]/10 rounded-md py-1 px-3 text-xs font-medium text-[#323232]'>{github} verified</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal
