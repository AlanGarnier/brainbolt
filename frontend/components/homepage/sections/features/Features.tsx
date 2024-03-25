"use client";
import React from 'react';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FeatureText,FeatureTitle, SectionTitle, TypingText } from '@/components/CustomTexts';
import Image from 'next/image';
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/lib/motion';

const Features = () => {
  return (
    <Section background="bg-section">
      <motion.div 
        variants={staggerContainer(0, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-col space-y-8 lg:space-y-20 items-center justify-center h-full text-center">
        <TypingText text="| Lorem ipsum" />
        <SectionTitle>Lorem ipsum dolor sit amet consectetur. Euismod nam in ut nulla nulla euismod. Proin fermentum mi vitae diam id. Purus est urna lectus malesuada et gravida porttitor fames. Nullam aliquet aliquam eget malesuada id sed rhoncus.</SectionTitle>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div 
            variants={fadeIn('up', 'tween', 0.4, 1)}
            className="flex flex-col justify-center items-center py-8 px-6 space-y-6 w-full max-w-[338px]">
            <Image 
              width={96}
              height={96}
              src="/assets/img/icone-inscription.png" 
              alt="Icône Inscription" />
            <FeatureTitle>Sign Up</FeatureTitle>

            <FeatureText>Lorem ipsum dolor sit amet consectetur. Augue egestas varius malesuada a euismod mauris vitae ut tincidunt. Egestas elit donec quam volutpat.</FeatureText>
          </motion.div>

          <motion.div 
            variants={fadeIn('up', 'tween', 0.7, 1)}
            className="flex flex-col justify-center items-center py-8 px-6 space-y-6 w-full max-w-[338px]">
            <Image 
              width={96}
              height={96}
              src="/assets/img/icone-joueur.png" 
              alt="Icône Joueur" />
            <FeatureTitle>Play Game</FeatureTitle>

            <FeatureText>Lorem ipsum dolor sit amet consectetur. Augue egestas varius malesuada a euismod mauris vitae ut tincidunt. Egestas elit donec quam volutpat.</FeatureText>
          </motion.div>

          <motion.div 
            variants={fadeIn('up', 'tween', 1, 1)}
            className="flex flex-col justify-center items-center py-8 px-6 space-y-6 w-full max-w-[338px]">
            <Image 
              width={96}
              height={96}
              src="/assets/img/icone-resultats.png" 
              alt="Icône Résultats" />
            <FeatureTitle>See results</FeatureTitle>

            <FeatureText>Lorem ipsum dolor sit amet consectetur. Augue egestas varius malesuada a euismod mauris vitae ut tincidunt. Egestas elit donec quam volutpat.</FeatureText>
          </motion.div>
        </div>

        <Button asChild className="glow">
          <Link href="/auth/signup" className="font-semibold font-jost text-base">
            Je m&apos;inscris
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}

export default Features;
