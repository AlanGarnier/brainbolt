import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button'

import Link from 'next/link';
import RadialBorderGradient from '@/components/RadialBorderGradient';

const Footer = () => {


  return (
    <>

      <footer className="relative px-8 pt-5 pb-8 lg:pt-10 lg:pb-8 lg:px-[110px]">
        <div className="mx-auto pb-2 lg:pb-20 flex flex-col lg:flex-row justify-between items-center">
            {/* Logo */}
            <div className="flex pb-10 lg:pb-0 justify-center items-center">
              <Link href="/">
                <Image src="/assets/img/brainbolt-white-logo.svg" alt="Brainbolt" width={194} height={30} />
              </Link>
            </div>
            {/* Texte */}
            <ul className="flex flex-col lg:flex-row justify-center items-center lg:space-x-7">
              <li>Plan du site</li>
              <li>Plan du site</li>
              <li>Plan du site</li>
            </ul>
            {/* Bouton */}
            <div className="items-center flex-shrink-0 hidden lg:flex lg:space-x-5">
              <Button asChild variant={'default'} className="glow">
                <Link href="/login" className="font-semibold font-jost">
                  Se connecter
                </Link>
              </Button>
            </div>
          </div>
          {/* Radial gradient at the top of the footer */}
          <RadialBorderGradient direction="top" />
          <div className="py-8 lg:py-4 text-sm text-gray-400 flex justify-center lg:justify-center">
            © BrainBolt - Tous les droits préservés
          </div>

      </footer>
    </>
  )
}

export default Footer;
