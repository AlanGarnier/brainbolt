import React, { ReactNode } from 'react'
import DashboardLayout from './components/layout/DashboardLayout'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <>
        <DashboardLayout />
        {children}
    </>
  )
}

export default Layout