import React, { ReactNode } from 'react'
import DashboardLayout from './components/layout/DashboardLayout'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { getCurrentUser } from '../actions/getCurrentUser'

interface LayoutProps {
    children: ReactNode
}

const Layout = async ({children}: LayoutProps) => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <DashboardLayout user={user}>
          {children}
        </DashboardLayout>
      </ThemeProvider>
    </>
  )
}

export default Layout