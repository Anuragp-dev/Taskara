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

    // profile section

    const { name, email, Photo } = user;
    return (

        <div className='fixed left-0 top-0  z-50 h-full w-full bg-[#333]/30 overflow-hidden' >

            <div
                ref={ref}
                className='py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md border-2 border-white'>

                <div className='absolute left-0 top-0 w-full h-[80px] bg-[#323232]/10 rounded-tr-md rounded-tl-md'></div>

                <div className='mt-4 relative flex justify-between'>
                    <div className='relative inline-block'>
                        <Image
                            src="/profile.png"
                            alt="avatar"
                            width={80}
                            height={80}
                            className="rounded-full shadow-md"
                        />

                        <div className='absolute  bottom-0 right-1 shadow-sm'>
                            <span className='text-lg text-blue-400'>{badge}</span>
                            <span className='absolute z-20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs text-white'>
                                {check}
                            </span>
                        </div>
                    </div>
                    <div className='self-end flex items-center gap-2'>
                        <button className='flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-1 px-3 text-xs font-medium text-[#323232]'>
                            {github} Github
                        </button>
                        <button className='flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-1 px-3 text-xs font-medium text-[#323232]'>
                            {check} verified
                        </button>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ProfileModal
