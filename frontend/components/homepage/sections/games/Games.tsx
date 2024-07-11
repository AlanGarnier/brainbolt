"use client";
import Section from '@/components/Section'
import { gameData } from '@/constants/data'
import Image from 'next/image'
import React from 'react'
import {motion} from 'framer-motion'
import { fadeIn, staggerContainer } from '@/lib/motion';
import { SectionTitle, TypingText } from '@/components/CustomTexts';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Games = () => {
  return (
    <Section>
      <motion.div 
        variants={staggerContainer(0,0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-col lg:flex-row lg:space-x-6 lg:items-center">
        <div className="flex flex-col justify-center lg:w-1/2 mb-9 lg:mb-0">
          <motion.div 
            variants={fadeIn('right', 'tween', 0.2, 1)}
            className="flex flex-col space-y-5 lg:space-y-10 mb-10 lg:mb-14">
            <TypingText text="| Explorez" />
            <SectionTitle>Plongez dans l'Aventure Multijoueur.</SectionTitle>
          </motion.div>
        </div>
      </motion.div>
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 justify-center items-center">
      {
        gameData.map((game, index) => (
          <div className="max-w-full" key={index}>
            <Image
              className='object-cover rounded-xl'
              width={300}
              height={380}
              src={game.img} 
              alt={game.title} 
            />
          </div>
        ))
      }
      </div>
      <div className="flex mt-12 lg:mt-16 items-center justify-center h-full text-center">
        <Button asChild className="glow">
          <Link href="/auth/signup" className="font-semibold font-jost text-base">
            Tester gratuitement
          </Link>
        </Button>
      </div>
    </Section>
  )
}

export default Games