"use client";
import { NavLink } from '@/components/CustomTexts'
import GradientBorderButton from '@/components/GradientBorderButton';
import RadialBorderGradient from '@/components/RadialBorderGradient';
import { Button } from '@/components/ui/button'
import { AlignRight, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Header = () => {
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [show, setShow] = useState<string>("translate-y-0");
  const [blurHeader, setBlurHeader] = useState<boolean>(false);

  const showMobileMenu = () => {
    const mobileMenu = document.querySelector('.mobile-menu')
    mobileMenu?.classList.toggle('hidden')
  }

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !isMenuOpen) {
        setShow("-translate-y-[120px]")
        setBlurHeader(false)
      } else {
        setShow("shadow-sm")
        setBlurHeader(true)
      }

    } else {
      setShow("translate-y-0")
      setBlurHeader(true)
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScrollY])

  return (
    <>
      {/* Desktop Header */}
      <header className={`${show} ${blurHeader ? 'backdrop-blur-lg' : ''} sticky top-0 transition-transform duration-300 px-8 pt-5 pb-8 lg:pt-4 lg:pb-6 lg:px-[110px]`}>
        <div className="relative flex justify-between h-16 mx-auto">
          <Link
            href="/"
            className="flex items-center">
            <Image
              src="/assets/img/brainbolt-white-logo.svg"
              alt="Brainbolt"
              width={194}
              height={30} />
          </Link>
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <NavLink link="#">Lorem Ipsum</NavLink>
            <NavLink link="#">Lorem Ipsum</NavLink>
            <NavLink link="#">Lorem Ipsum</NavLink>
          </ul>
          <div className="items-center flex-shrink-0 hidden lg:flex lg:space-x-5">
            <GradientBorderButton>
              <Link
                href="/auth/signup"
                className="font-semibold font-jost bg-gradient-to-r from-primary-purple to-primary-skyblue text-transparent bg-clip-text text-[16px] group-hover:text-white"
              >
                Rejoindre la communauté
              </Link>
            </GradientBorderButton>
            <Button
              asChild
              variant={'default'}
              className="glow">
              <Link
                href="/auth/login"
                className="font-semibold font-jost">
                Se connecter
              </Link>
            </Button>
          </div>
          <button
            className="lg:hidden"
            onClick={showMobileMenu}>
            <AlignRight
              width={40}
              height={40} />
          </button>
        </div>
        {/* Radial gradient at the bottom of the header */}
        <RadialBorderGradient direction="bottom" />
      </header>

      {/* Mobile Header */}
      <div className="lg:hidden !z-[999]">
        <div className={`mobile-menu absolute top-0 left-0 w-full h-screen hidden transition duration-500 bg-primary-black overflow-hidden`}>
          <div className="px-8 py-8">
            <nav>
              <div className='flex justify-between items-center pb-14'>
                <div>
                  <Image
                    src="/assets/img/brainbolt-white-logo.svg"
                    alt="Logo"
                    width={194}
                    height={30} />
                </div>
                <div onClick={showMobileMenu}>
                  <X
                    width={40}
                    height={40} />
                </div>
              </div>
              <ul className="flex flex-col space-y-8 pb-10">
                <NavLink link="#">Lorem Ipsum</NavLink>
                <NavLink link="#">Lorem Ipsum</NavLink>
                <NavLink link="#">Lorem Ipsum</NavLink>
                <NavLink link="#">Lorem Ipsum</NavLink>
              </ul>
              <div className="inline">
                <Button
                  asChild
                  variant={'default'}>
                  <Link
                    href="/auth/login"
                    className="font-semibold font-jost text-[16px]">
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