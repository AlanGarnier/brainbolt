"use client";
import React from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'

const DashboardLayout = () => {
  const [open, setOpen] = React.useState(false);
  const handleButtonClick = () => {
    setOpen(!open);
  }
  return (
    <>
        <Sidebar open={open} handleButtonClick={handleButtonClick} />
        <Nav />
    </>
  )
}

export default DashboardLayout