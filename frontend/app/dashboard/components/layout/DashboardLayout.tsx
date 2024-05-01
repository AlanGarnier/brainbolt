"use client";
import React from 'react'
import DashboardNav from './navbar/DashboardNav'
import DashboardSidebar from './sidebar/DashboardSidebar';
import ChatCard from './chat/ChatCard';
import DashboardContent from './content/DashboardContent';

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
  const [open, setOpen] = React.useState(false);
  const handleButtonClick = () => {
    setOpen(!open);
  }
  return (
    <>
        <DashboardNav />
        <div className="flex overflow-hidden">
          <DashboardSidebar open={open} handleButtonClick={handleButtonClick} />
            <DashboardContent>
              {children}
            </DashboardContent>
          <ChatCard />
        </div>
    </>
  )
}

export default DashboardLayout