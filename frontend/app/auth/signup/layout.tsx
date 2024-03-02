import Link from 'next/link'
import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <>
        <section className="w-full flex">
          <div className="bg-signup pb-16 hidden lg:block lg:py-48 lg:w-1/3">
            &nbsp;
          </div>
          <div className="pt-28 pb-16 px-8 lg:px-[140px] lg:py-32 w-full lg:w-2/3 flex flex-col justify-center">
            <div className="flex justify-end pb-10 lg:pb-[72px]">
              <Link href="/" className="font-ubuntu font-bold text-[12px] text-[#E9E9E9]">Retour à l&apos;accueil</Link>
            </div>
            {children}
          </div>
        </section>
    </>
  )
}

export default Layout