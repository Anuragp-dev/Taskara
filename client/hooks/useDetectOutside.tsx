import React, { use, useEffect } from 'react'

interface DetectOutsideProps {
    ref: React.RefObject<HTMLElement>
    callback: () => void
}

const useDetectOutside = ({ ref, callback }: DetectOutsideProps) => {

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        // Add event listener for mousedown when the component mounts
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);


    return ref
}

export default useDetectOutside
