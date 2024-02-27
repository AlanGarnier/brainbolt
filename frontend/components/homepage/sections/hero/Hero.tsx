import React from 'react'
import Section from '@/components/Section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

const Hero = () => {
  return (
    <Section>
      <div className="text-center pb-6">
        <Badge>Made by gamers for gamers&nbsp;<Sparkles className="w-4 fill-white" /></Badge>
      </div>
      <div className="flex flex-col mx-auto lg:max-w-[796px] space-y-[40px] items-center justify-center h-full text-center">
        <h1 className="hero-title uppercase">Lorem ipsum dolor sit amet consectetur</h1>
        <p className="hero-subtitle">Lorem ipsum dolor sit amet consectetur. Euismod nam in ut nulla nulla euismod. Proin fermentum mi vitae diam id. Purus est urna lectus malesuada et gravida porttitor fames. Nullam aliquet aliquam eget malesuada id sed rhoncus. Est metus elementum odio felis facilisi non natoque cras vitae.  </p>
        <Button>
          <Link className="font-semibold font-jost text-[16px]" href="/login">
            Lancez la partie
          </Link>
        </Button>
      </div>
    </Section>
  )
}

export default Hero