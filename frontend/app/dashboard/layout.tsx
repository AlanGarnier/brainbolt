import React, { ReactNode } from 'react'
import DashboardLayout from './components/layout/DashboardLayout'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { getCurrentUser } from '../actions/getCurrentUser'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { SocketProvider } from '@/context/SocketContext'

export const metadata = {
  title: 'Dashboard - Votre espace personnel sur Brainbolt',
  description: '.Découvrez votre tableau de bord personnalisé sur Brainbolt. Accédez à vos jeux préférés, ajoutez d\'autres joueurs en ami.',
};

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
      <ReactQueryProvider>
        <SocketProvider>
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
        </SocketProvider>
      </ReactQueryProvider>
    </>
  )
}

export default Layout