"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Game } from '@/lib/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSocket } from '@/context/SocketContext';

interface GamesCarouselCardProps {
  game: Game;
}

const GamesCarouselCard: React.FC<GamesCarouselCardProps> = ({ game }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { socket, setGameId, setMessage } = useSocket();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleJoinGame = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (socket) {
      socket.emit('check-game-room');
      console.log('Checking game room...');

      socket.once('room-assigned', (data: { roomId: string }) => {
        console.log('Room assigned:', data.roomId);
        setGameId(data.roomId);
        router.push(`/dashboard/games/tictactoe/${data.roomId}`);
        toast.success('Vous avez rejoint une salle d\'attente pour jouer au Morpion !');
      });

      socket.emit('readyToStart');
      console.log('Ready to start...');
    }
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} 
      className="relative overflow-hidden max-w-[300px] cursor-pointer">
      <Image 
        className={`object-cover rounded-xl ${game.name === "Ping Pong" && "grayscale-[80%]"}`}
        width={300}
        height={380}
        src={game.picture} 
        alt={game.name} 
      />
      <div className={`absolute ${isHovered ? 'translate-y-0' : 'translate-y-[100%]'} transition-transform duration-300 max-w-[300px] h-[197px] bottom-0 p-4 bg-secondary-black rounded-b-xl`}>
        <div className="flex flex-col justify-between space-y-2">
          <h3 className="font-semibold text-white text-lg font-jost">{game.name}</h3>
          <p className="text-white text-sm font-jost">
            {
              game.name === 'Morpion' ? (
                'Découvrez le jeu du Morpion ! Empêchez votre adversaire de gagner en alignant 3 symboles. 🎮'
              ) : (
                'Découvrez le jeu du Ping Pong ! Jouez contre un autre joueur en ligne. Surveillez la balle et renvoyez-la à votre adversaire. 🏓'
              )
            }
          </p>
          <div>
            {game.name === 'Morpion' ? (
              <Button
                asChild
                variant={'default'}
                className="glow"
                onClick={handleJoinGame}>
                <Link
                  href="#">
                  Jouer
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                variant={'default'}
                disabled={true}>
                <Link
                  href="#">
                  À venir
                </Link>
              </Button>           
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamesCarouselCard;
