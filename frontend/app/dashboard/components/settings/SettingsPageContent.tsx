import React from 'react'
import Image from 'next/image';
import { Camera, Pen } from 'lucide-react';
interface SettingsPageContentProps {
    user: {
        email: string;
        pseudo: string;
        picture: string;
    };
}

const SettingsPageContent: React.FC<SettingsPageContentProps> = ({user}) => {
  return (
    <div className='mt-10 md:mt-6 h-screen flex flex-col items-center space-y-6'>
        <div className="flex flex-col items-center justify-center">
            <Image
                width={148} 
                height={148}
                src={user.picture || "/assets/img/user-placeholder.png"}
                alt={user.pseudo || "User"}
                className="rounded-full object-cover"
            />
            <button className="flex items-center space-x-2 border bg-white dark:border-primary-grey dark:bg-primary-black shadow-lg rounded-full cursor-pointer -mt-4 py-3 px-6">
                <Camera className="text-primary-black/70 dark:text-lighter-grey" size={20} />
                <span className="text-primary-black/70 dark:text-lighter-grey">Modifier ma photo</span>
            </button>
        </div>

        <button className="flex justify-between items-center space-x-4 px-4 border dark:border-primary-grey text-primary-black/70 dark:bg-primary-black shadow-lg cursor-pointer h-[54px] dark:text-lighter-grey/80 w-full md:w-10/12 text-[14px] rounded-2xl font-medium">
            {user.pseudo}
              <Pen className="text-primary-black/70 dark:text-lighter-grey" size={20} />
        </button>

        <button className="flex justify-between items-center space-x-4 px-4 border dark:border-primary-grey text-primary-black/70 dark:bg-primary-black shadow-lg cursor-pointer h-[54px] dark:text-lighter-grey/80 w-full md:w-10/12 text-[14px] rounded-2xl font-medium">
            {user.email}
              <Pen className="text-primary-black/70 dark:text-lighter-grey" size={20} />
        </button>

        <button className="flex justify-between items-center space-x-4 px-4 border dark:border-primary-grey text-primary-black/70 dark:bg-primary-black shadow-lg cursor-pointer h-[54px] dark:text-lighter-grey/80 w-full md:w-10/12 text-[14px] rounded-2xl font-medium">
            **********
              <Pen className="text-primary-black/70 dark:text-lighter-grey" size={20} />
        </button>
    </div>
  )
}

export default SettingsPageContent