"use client";
import { NavLink } from '@/components/CustomTexts'
import { Button } from '@/components/ui/button'
import { AlignRight, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const showMobileMenu = () => {
    const mobileMenu = document.querySelector('.mobile-menu')
    mobileMenu?.classList.toggle('hidden')
  }

  return (
    <>

      {/* Desktop Header */}
      <header className="px-8 pt-5 pb-8 lg:py-4 lg:px-[110px]">
        <div className="flex justify-between h-16 mx-auto">
          <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center">
            <Image src="/assets/img/brainbolt-white-logo.svg" alt="Logo" width={194} height={30} />
          </a>
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <NavLink link="/login">Lorem Ipsum</NavLink>
            <NavLink link="/login">Lorem Ipsum</NavLink>
            <NavLink link="/login">Lorem Ipsum</NavLink>
          </ul>
          <div className="items-center flex-shrink-0 hidden lg:flex lg:space-x-5">
            <Button asChild variant={'outline'}>
              <Link className="glow font-semibold font-jost text-primary-purple text-[16px] hover:text-white" href="/login">
                Rejoindre la communauté
              </Link>
            </Button>
            <Button variant={'default'} asChild className="glow">
              <Link className="font-semibold font-jost" href="/login">
                Lancez la partie
              </Link>
            </Button>
          </div>
          <button className="lg:hidden" onClick={showMobileMenu}>
            <AlignRight width={40} height={40} />
          </button>
        </div>
      </header>

      {/* Mobile Header */}
      <div className="lg:hidden !z-[999]">
        <div className={`mobile-menu absolute top-0 left-0 w-full h-screen hidden transition duration-500 bg-primary-black overflow-hidden`}>
          <div className="px-8 py-8">
            <nav>
              <div className='flex justify-between items-center pb-14'>
                <div>
                  <Image src="/assets/img/brainbolt-white-logo.svg" alt="Logo" width={194} height={30} />
                </div>
                <div onClick={showMobileMenu}>
                  <X width={40} height={40} />
                </div>
              </div>
              <ul className="flex flex-col space-y-8 pb-10">
                <NavLink link="/login">Lorem Ipsum</NavLink>
                <NavLink link="/login">Lorem Ipsum</NavLink>
                <NavLink link="/login">Lorem Ipsum</NavLink>
                <NavLink link="/login">Lorem Ipsum</NavLink>
              </ul>
              <div className="inline">
                <Button variant={'default'} asChild>
                  <Link className="font-semibold font-jost text-[16px]" href="/login">
                    Lancez la partie
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header