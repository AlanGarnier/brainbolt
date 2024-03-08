import React from 'react';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Features = () => {
  return (
    <Section background="bg-section">
      <div className="flex flex-col mx-auto lg:max-w-[796px] space-y-8 lg:space-y-20 items-center justify-center h-full text-center">
        <p className="typing-text">Lorem ipsum.</p>
        <h2 className="section-title">Lorem ipsum dolor sit amet consectetur. Euismod nam in ut nulla nulla euismod. Proin fermentum mi vitae diam id. Purus est urna lectus malesuada et gravida porttitor fames. Nullam aliquet aliquam eget malesuada id sed rhoncus.</h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-center items-center py-8 px-6 space-y-6 w-full max-w-[338px]">
            <img src="/assets/img/icone-inscription.png" alt="Icône Inscription" className="w-24 h-24" />
            <h3 className="feature-title">Sign Up</h3>

            <p className="feature-text">Lorem ipsum dolor sit amet consectetur. Augue egestas varius malesuada a euismod mauris vitae ut tincidunt. Egestas elit donec quam volutpat.</p>
          </div>

          <div className="flex flex-col justify-center items-center py-8 px-6 space-y-6 w-full max-w-[338px]">
            <img src="/assets/img/icone-joueur.png" alt="Icône Joueur" className="w-24 h-24" />
            <h3 className="feature-title">Play Game</h3>

            <p className="feature-text">Lorem ipsum dolor sit amet consectetur. Augue egestas varius malesuada a euismod mauris vitae ut tincidunt. Egestas elit donec quam volutpat.</p>
          </div>

          <div className="flex flex-col justify-center items-center py-8 px-6 space-y-6 w-full max-w-[338px]">
            <img src="/assets/img/icone-resultats.png" alt="Icône Résultats" className="w-24 h-24" />
            <h3 className="feature-title">See results</h3>

            <p className="feature-text">Lorem ipsum dolor sit amet consectetur. Augue egestas varius malesuada a euismod mauris vitae ut tincidunt. Egestas elit donec quam volutpat.</p>
          </div>
        </div>

        <Button asChild className="glow">
          <Link href="/login" className="font-semibold font-jost text-base">
            Je m'inscris
          </Link>
        </Button>
      </div>
    </Section>
  );
}

export default Features;
