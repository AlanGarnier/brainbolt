import React from 'react'

interface DashboardContentProps {
    children: React.ReactNode
}

const DashboardContent: React.FC<DashboardContentProps> = ({children}) => {
  return (
    <section className="px-6 pt-28 w-full h-full">
        {children}
    </section>
  )
}

export default DashboardContent