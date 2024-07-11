import React from 'react'
import Section from '@/components/Section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'
import { HeroSubtitle, HeroTitle } from '@/components/CustomTexts'

const Hero = () => {
  return (
    <Section>
      <div className="text-center pb-6">
        <Badge>Made by gamers for gamers&nbsp;<Sparkles className="w-4 fill-white" /></Badge>
      </div>
      <div className="flex flex-col mx-auto lg:max-w-[796px] space-y-[40px] items-center justify-center h-full text-center">
        <HeroTitle>Vivez une expérience de jeu fluide et rapide</HeroTitle>
        <HeroSubtitle>Découvrez notre plateforme de jeux vidéo en ligne, conçu pour offrir des performances inégalées et une expérience de jeu coopératif fluide avec vos amis.
        </HeroSubtitle>
        <Button 
          asChild 
          className="glow">
          <Link 
            href="/auth/login"
            className="font-semibold font-jost text-base">
            Lancez la partie
          </Link>
        </Button>
      </div>
    </Section>
  )
}

export default Hero