import React from 'react'

interface GameCardProps {
    gamesData: {
        title: string;
        img: string;
    }[]
}

const GameCard = ({gamesData}: GameCardProps) => {
  return (
    <div>GameCard</div>
  )
}

export default GameCard