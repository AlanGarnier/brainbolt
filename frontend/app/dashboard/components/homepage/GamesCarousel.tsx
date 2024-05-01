import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import React from 'react'
import GamesCarouselCard from "./GamesCarouselCard"
import { gameData } from '@/constants/data'

const GamesCarousel = () => {
  return (
    <Carousel className="relative mb-10">
        <CarouselContent className="mb-10">
            {
                gameData.map((game, index) => (
                    <CarouselItem key={index} className="max-w-[380px] lg:basis-1/2">
                        <GamesCarouselCard game={game} />
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <div className="absolute bottom-0 left-12 lg:left-10">
            <CarouselPrevious />
            <CarouselNext />
        </div>
    </Carousel>
  )
}

export default GamesCarousel