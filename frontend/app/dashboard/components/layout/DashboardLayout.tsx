"use client";
import React from 'react'
import DashboardNav from './DashboardNav'
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = () => {
  const [open, setOpen] = React.useState(false);
  const handleButtonClick = () => {
    setOpen(!open);
  }
  return (
    <>
        <DashboardSidebar open={open} handleButtonClick={handleButtonClick} />
        <DashboardNav />
    </>
  )
}

export default DashboardLayout