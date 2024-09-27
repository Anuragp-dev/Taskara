"use client";
import { useUserContext } from '@/context/userContext'
import React from 'react'



interface MainContentLayoutProps {
    children: React.ReactNode
}

const MainContentLayout = ({ children }: MainContentLayoutProps) => {
    const userId = useUserContext()?.user?._id
    return (
        <main className={`${userId ? "pr-[20rem]" : ""} pb-[1.5rem] flex h-full`}>
            {children}
        </main>
    )
}

export default MainContentLayout
