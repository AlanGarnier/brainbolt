"use client";
import React from "react";
import Section from "@/components/Section";
import Image from "next/image";
import {
  FeatureText,
  FeatureTitle,
  SectionTitle,
  TypingText
} from "@/components/CustomTexts";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";

const Explore = () => {
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
            <TypingText text="| En ligne" />
            <SectionTitle>Plongez dans l'Aventure Multijoueur.</SectionTitle>
          </motion.div>

          <motion.div 
            variants={fadeIn('right', 'tween', 0.2, 1)}
            className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:space-x-10">
            <div className="flex flex-col space-y-4">
              <Image
                src="/assets/img/icone-friends.webp"
                alt="Friends Icone"
                width={56}
                height={56}
                className="-ml-1"
              />
              <FeatureTitle>Ajoutez vos amis</FeatureTitle>
              <FeatureText>Établissez une liste d'amis en incluant tous vos contacts.</FeatureText>
            </div>

            <div className="flex flex-col space-y-4">
              <Image
                src="/assets/img/icone-chat.webp"
                alt="Chat Icone"
                width={56}
                height={56}
                className="-ml-1"
              />
              <FeatureTitle>Messagerie</FeatureTitle>
              <FeatureText>Restez connectés avec vos coéquipiers grâce à notre système de chat intégré.</FeatureText>
            </div>
          </motion.div>
        </div>

        <div className="flex-none lg:flex-grow lg:w-1/2">
          <Image
            src="/assets/img/image-a-definir.png"
            alt="Image a definir"
            width={800}
            height={1600}
          />
        </div>
      </motion.div>
    </Section>
  );
};

export default Explore;
