"use client";

import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Game } from '@/lib/types';

interface GamesCarouselCardProps {
    game: Game;
}


const GamesCarouselCard: React.FC<GamesCarouselCardProps> = ({game}) => {
    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    const [translateY, setTranslateY] = React.useState<string>("translate-y-[100%]");

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }


  return (
    <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} 
        className="relative overflow-hidden max-w-[300px] cursor-pointer">
        <Image 
            className='object-cover rounded-xl'
            width={300}
            height={380}
            src={game.picture} 
            alt={game.name} 
        />
        <h3 className="ml-1">{game.name}</h3>
        <div className={`absolute ${isHovered ? 'translate-y-0' : 'translate-y-[100%]'} transition-transform duration-300 max-w-[300px] h-[197px] bottom-0 p-4 bg-secondary-black rounded-b-xl`}>
            <div className="flex flex-col justify-between space-y-2">
                <h3 className="font-semibold text-white text-lg font-jost">{game.name}</h3>
                <p className="text-white text-sm font-jost">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget mi nec dolor ultricies.</p>
                <div>
                    {game.name === 'Morpion' ? (
                        <Button
                            asChild
                            variant={'default'}
                            className="glow">
                                <Link
                                    href={`/dashboard/games/tictactoe/${game.id}`}
                                    className="font-semibold font-jost">
                                    Jouer
                                </Link>
                        </Button>
                    ) : <Button
                            asChild
                            variant={'default'}
                            disabled={true}
                        >
                                <Link
                                    href="#"
                                    className="font-semibold font-jost">
                                    À venir
                                </Link>
                        </Button>           
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default GamesCarouselCard