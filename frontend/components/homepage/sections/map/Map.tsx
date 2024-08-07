"use client";
import React from 'react'
import Section from '@/components/Section'
import Image from 'next/image'
import { SectionTitle, TypingText } from '@/components/CustomTexts'
import { fadeIn, staggerContainer } from '@/lib/motion';
import { motion } from 'framer-motion'

const Map = () => {
  return (
    <Section id="connect">
      <motion.div 
        variants={staggerContainer(0, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto flex flex-col text-center items-center justify-center space-y-5 lg:space-y-10 lg:max-w-[763px] mb-9 lg:mb-20">
        <TypingText text="| Restez connectés" />
        <SectionTitle>Notre plateforme connecte des joueurs de tous horizons, permettant des sessions de jeu coopératif et compétitif avec des amis et des passionnés du monde entier.</SectionTitle>
      </motion.div>
      <motion.div
        variants={staggerContainer(0, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
            >
            <Image src="/assets/img/map.webp" alt="Map" width={1170} height={535} />
            </motion.div>
      </motion.div>
    </Section>
  );
};

export default Map;
