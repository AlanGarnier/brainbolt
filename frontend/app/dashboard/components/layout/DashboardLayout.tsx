"use client";
import React from 'react'
import DashboardNav from './navbar/DashboardNav'
import DashboardSidebar from './sidebar/DashboardSidebar';
import ChatCard from './chat/ChatCard';
import DashboardContent from './content/DashboardContent';
import { User } from '@/lib/types';

interface DashboardLayoutProps {
    children: React.ReactNode
    user: User
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children, user}) => {
  const [open, setOpen] = React.useState(false);
  const handleButtonClick = () => {
    setOpen(!open);
  }
  return (
    <>
        <DashboardNav user={user} />
        <div className="bg-white dark:bg-primary-black flex">
          <div className="overflow-visible">
            <DashboardSidebar open={open} handleButtonClick={handleButtonClick} />
          </div>
          <DashboardContent>
            {children}
          </DashboardContent>
          <ChatCard />
        </div>
    </>
  )
}

export default DashboardLayout