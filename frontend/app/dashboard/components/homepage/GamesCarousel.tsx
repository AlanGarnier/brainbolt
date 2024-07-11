import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import React from 'react'
import GamesCarouselCard from "./GamesCarouselCard"
import { Game } from "@/lib/types";

interface GamesCarouselProps {
    games: Game[];
}

const GamesCarousel = ({games}: GamesCarouselProps) => {
  return (
    <Carousel className="relative mb-10">
        <CarouselContent className="mb-10">
            {
                games.map((game, index) => (
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