import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <>
        <h2>Dashboard</h2>
        {children}
    </>
  )
}

export default Layout