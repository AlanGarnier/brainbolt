import React, { ReactNode } from 'react'

export const metadata = {
  title: 'Dashboard - Votre espace personnel sur Brainbolt',
  description: '.Découvrez votre tableau de bord personnalisé sur Brainbolt. Accédez à vos jeux préférés, ajoutez d\'autres joueurs en ami.',
};

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