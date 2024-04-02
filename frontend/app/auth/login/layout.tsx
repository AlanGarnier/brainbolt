import Link from 'next/link'
import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <>
        <section className="w-full h-screen flex">
          <div className="bg-login pb-16 hidden lg:block lg:py-48 lg:w-1/3">
            &nbsp;
          </div>
          <div className="px-8 py-8 lg:px-[140px] lg:pt-12 lg:pb-28 w-full lg:w-2/3 flex flex-col">
            <div className="flex justify-end pb-10 lg:pb-[72px]">
              <Link 
                href="/" 
                className="font-ubuntu font-bold text-[12px] text-[#E9E9E9]"
                >Retour à l&apos;accueil
              </Link>
            </div>
            {children}
          </div>
        </section>
    </>
  )
}

export default Layout