import { NavLink } from '@/components/CustomTexts'
import { Button } from '@/components/ui/button'
import { AlignRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="px-8 pt-5 pb-8 lg:py-4 lg:px-[110px]">
      <div className="container flex justify-between h-16 mx-auto">
        <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
          <Image src="/assets/img/brainbolt-white-logo.svg" alt="Logo" width={194} height={30} />
        </a>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <NavLink link="/login">Login</NavLink>
          <NavLink link="/login">Login</NavLink>
          <NavLink link="/login">Login</NavLink>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex lg:space-x-5">
          <Button>
            <Link className="font-semibold font-jost text-[16px]" href="/login">
              Lancez la partie
            </Link>
          </Button>
          <Button>
            <Link className="font-semibold font-jost text-[16px]" href="/login">
              Lancez la partie
            </Link>
          </Button>
        </div>
        <button className="p-4 lg:hidden">
          <AlignRight width={40} height={40} />
        </button>
      </div>
    </header>
  )
}

export default Header