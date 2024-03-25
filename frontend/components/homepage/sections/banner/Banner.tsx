"use client";
import React from 'react';
import Section from '@/components/Section'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BannerText, BannerTitle } from '@/components/CustomTexts';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/motion';

const Banner = () => {
  return (
    <Section background="bg-section">
      <motion.div 
        variants={staggerContainer(0, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-col mx-auto lg:max-w-[796px] space-y-[40px] items-center justify-center h-full text-center">
        <BannerTitle>Lorem ipsum dolor sit amet consectetur.</BannerTitle>
        <BannerText>Lorem ipsum dolor sit amet consectetur. Euismod nam in ut nulla nulla euismod.</BannerText>
        <motion.div 
          variants={fadeIn('up', 'tween', 0.6, 1)}
          className="inline">
          <Button
            asChild
            variant={'default'}>
            <Link
              href="/login"
              className="font-semibold font-jost text-[16px]">
              Lancez la partie
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  )
}

export default Banner;
