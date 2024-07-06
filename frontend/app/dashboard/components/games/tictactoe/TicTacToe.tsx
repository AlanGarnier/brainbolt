import { User } from '@/lib/types'
import React from 'react'

interface TicTacToeProps {
    user: User;
    gameId: string;
}

const TicTacToe = ({user, gameId}: TicTacToeProps) => {
  return (
    <div>
        Tictactoe
        {user.pseudo}
    </div>
  )
}

export default TicTacToe