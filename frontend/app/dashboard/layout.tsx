import React, { ReactNode } from 'react'
import DashboardLayout from './components/layout/DashboardLayout'
import { ThemeProvider } from '@/providers/ThemeProvider'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </ThemeProvider>
    </>
  )
}

export default Layout