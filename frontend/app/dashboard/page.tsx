import React from 'react'
import GamesCarousel from './components/homepage/GamesCarousel'
import { getGames } from '../actions/games/getGames'
import { Game } from '@/lib/types';

const DashboardPage = async () => {

  const games: Game[] = await getGames();

  const gamesData: Game[] = await getGames();

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
      <div className="pl-0 h-screen lg:pr-10">
        <GamesCarousel games={gamesData} />
      </div>
    </>
  )
}

export default DashboardPage