import React from 'react'
import GamesCarousel from './components/homepage/GamesCarousel'
import { getGames } from '../actions/games/getGames'
import { Game } from '@/lib/types';
import { DashboardTitle, FeatureText, FeatureTitle } from '@/components/CustomTexts';
import { getCurrentUser } from '../actions/getCurrentUser';
import Image from 'next/image';

const DashboardPage = async () => {

  const games: Game[] = await getGames();

  const gamesData: Game[] = await getGames();

  const user = await getCurrentUser();

  return (
    <>
      <div className="mb-1">
        <DashboardTitle>Bienvenue {user?.pseudo}</DashboardTitle>
      </div>
      <div className="mb-6">
        <h2 className="text-lg lg:text-xl text-primary-black dark:text-white font-ubuntu font-bold mt-6">Jeux disponibles 🎮</h2>
      </div>
      
      <div className="pl-0 lg:pr-10">
        <GamesCarousel games={gamesData} />
      </div>

      <div className="mb-6">
        <h3 className="text-lg lg:text-xl text-primary-black dark:text-white font-ubuntu font-bold mt-6">Fonctionnalités 🚀</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div 
            className="flex flex-col justify-center items-center py-8 px-4 space-y-6 w-full max-w-[338px]">
            <Image 
              width={48}
              height={48}
              src="/assets/img/icone-chat.svg" 
              alt="Icône Inscription" />
            <FeatureTitle>Chattez</FeatureTitle>

            <FeatureText className="text-justify">Discutez avec vos amis pendant que vous jouez. Partagez des astuces et des stratégies pour améliorer vos performances.</FeatureText>
          </div>

          <div 
            className="flex flex-col justify-center items-center py-8 px-4 space-y-6 w-full max-w-[338px]">
            <Image 
              width={48}
              height={48}
              src="/assets/img/icone-joueur.svg" 
              alt="Icône Joueur" />
            <FeatureTitle>Jouez</FeatureTitle>

            <FeatureText className="text-justify">Jouez instantanément, en solo ou en coop, avec des performances optimales. Profitez d'une latence minimale pour une expérience fluide.</FeatureText>
          </div>

          <div
            className="flex flex-col justify-center items-center py-8 px-4 space-y-6 w-full max-w-[338px]">
            <Image 
              width={48}
              height={48}
              src="/assets/img/icone-resultats.svg" 
              alt="Icône Résultats" />
            <FeatureTitle>Suivez vos résultats</FeatureTitle>

            <FeatureText className="text-justify">Suivez vos stats et améliorez vos compétences en coop. Partagez vos succès avec vos amis et voyez la différence.</FeatureText>
          </div>
        </div>
    </>
  )
}

export default DashboardPage