import React from 'react';
import { NavLink } from '@/components/CustomTexts';
import Image from 'next/image';
import { Button } from '@/components/ui/button'

import Link from 'next/link';

const Footer = () => {


  return (
    <>

      <footer className="relative px-8 pt-5 pb-8 lg:py-4 lg:px-[110px]">

        <div className="flex justify-between h-16 mx-auto">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center">
              <Image src="/assets/img/brainbolt-white-logo.svg" alt="Brainbolt" width={194} height={30} />
            </Link>
          </div>
          {/* Texte */}
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <NavLink link="/">Plan su site</NavLink>
            <NavLink link="/">Plan su site</NavLink>
            <NavLink link="/">Plan su site</NavLink>
          </ul>

          {/* Bouton */}
          <div className="items-center flex-shrink-0 hidden lg:flex lg:space-x-5">
            <Button asChild variant={'default'} className="glow">
              <Link href="/login" className="font-semibold font-jost">
                Se connecter
              </Link>
            </Button>
          </div>
          {/* Bas de page */}

        </div>
        <div className="mt-16 text-sm text-gray-400 flex justify-center lg:justify-center">
          © BrainBolt - Tous les droits préservés
        </div>
      </footer>
    </>
  )
}

export default Footer;
