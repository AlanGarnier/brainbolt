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
        <TypingText text="| Les étapes" />
        <SectionTitle> Inscrivez-vous rapidement, plongez dans vos jeux préférés et suivez vos résultats en temps réel. Voici comment démarrer :</SectionTitle>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div 
            variants={fadeIn('up', 'tween', 0.4, 1)}
            className="flex flex-col justify-center items-center py-8 px-6 space-y-6 w-full max-w-[338px]">
            <Image 
              width={96}
              height={96}
              src="/assets/img/icone-inscription.webp" 
              alt="Icône Inscription" />
            <FeatureTitle>Sign Up</FeatureTitle>

            <FeatureText>Rejoignez notre communauté et accédez à des serveurs rapides. Jouez en coop avec vos amis dès aujourd'hui.</FeatureText>
          </motion.div>

          <motion.div 
            variants={fadeIn('up', 'tween', 0.7, 1)}
            className="flex flex-col justify-center items-center py-8 px-6 space-y-6 w-full max-w-[338px]">
            <Image 
              width={96}
              height={96}
              src="/assets/img/icone-joueur.webp" 
              alt="Icône Joueur" />
            <FeatureTitle>Play Game</FeatureTitle>

            <FeatureText>Jouez instantanément, en solo ou en coop, avec des performances optimales. Profitez d'une latence minimale pour une expérience fluide.</FeatureText>
          </motion.div>

          <motion.div 
            variants={fadeIn('up', 'tween', 1, 1)}
            className="flex flex-col justify-center items-center py-8 px-6 space-y-6 w-full max-w-[338px]">
            <Image 
              width={96}
              height={96}
              src="/assets/img/icone-resultats.webp" 
              alt="Icône Résultats" />
            <FeatureTitle>See results</FeatureTitle>

            <FeatureText>Suivez vos stats et améliorez vos compétences en coop. Partagez vos succès avec vos amis et voyez la différence.</FeatureText>
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
