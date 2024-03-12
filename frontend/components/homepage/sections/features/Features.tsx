import React from 'react';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FeatureText,FeatureTitle, SectionTitle, TypingText } from '@/components/CustomTexts';
import Image from 'next/image';

const Features = () => {
  return (
    <Section background="bg-section">
      <div className="flex flex-col space-y-8 lg:space-y-20 items-center justify-center h-full text-center">
        <TypingText>Lorem ipsum.</TypingText>
        <SectionTitle>Lorem ipsum dolor sit amet consectetur. Euismod nam in ut nulla nulla euismod. Proin fermentum mi vitae diam id. Purus est urna lectus malesuada et gravida porttitor fames. Nullam aliquet aliquam eget malesuada id sed rhoncus.</SectionTitle>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-center items-center py-8 px-6 space-y-6 w-full max-w-[338px]">
            <Image 
              width={96}
              height={96}
              src="/assets/img/icone-inscription.png" 
              alt="Icône Inscription" />
            <FeatureTitle>Sign Up</FeatureTitle>

            <FeatureText>Lorem ipsum dolor sit amet consectetur. Augue egestas varius malesuada a euismod mauris vitae ut tincidunt. Egestas elit donec quam volutpat.</FeatureText>
          </div>

          <div className="flex flex-col justify-center items-center py-8 px-6 space-y-6 w-full max-w-[338px]">
            <Image 
              width={96}
              height={96}
              src="/assets/img/icone-inscription.png" 
              alt="Icône Joueur" />
            <FeatureTitle>Play Game</FeatureTitle>

            <FeatureText>Lorem ipsum dolor sit amet consectetur. Augue egestas varius malesuada a euismod mauris vitae ut tincidunt. Egestas elit donec quam volutpat.</FeatureText>
          </div>

          <div className="flex flex-col justify-center items-center py-8 px-6 space-y-6 w-full max-w-[338px]">
            <Image 
              width={96}
              height={96}
              src="/assets/img/icone-inscription.png" 
              alt="Icône Résultats" />
            <FeatureTitle>See results</FeatureTitle>

            <FeatureText>Lorem ipsum dolor sit amet consectetur. Augue egestas varius malesuada a euismod mauris vitae ut tincidunt. Egestas elit donec quam volutpat.</FeatureText>
          </div>
        </div>

        <Button asChild className="glow">
          <Link href="/auth/login" className="font-semibold font-jost text-base">
            Je m&apos;inscris
          </Link>
        </Button>
      </div>
    </Section>
  );
}

export default Features;
