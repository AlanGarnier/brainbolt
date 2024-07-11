"use client";

import { User } from '@/lib/types';
import React, { useEffect } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface TicTacToeProps {
  user: User;
  gameId: string;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ user, gameId }) => {
  const { socket, board, setBoard, activeId, setActiveId, isXNext, setIsXNext, winner, setWinner, message, setMessage, connectedPlayers, clientId, playerSymbol, showButton, setShowButton } = useSocket();
  
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    // console.log('User ID:', user.id);
    socket.emit('join_room', { room: gameId, id: user.id });

    socket.on('turn', (turn) => {
      const currentMark = turn['recentPlayer'] === clientId ? playerSymbol : (playerSymbol === 'x' ? 'circle' : 'x');
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[turn['lastPos']] = currentMark;
        return newBoard;
      });
      setIsXNext(turn['isXNext']);
      setActiveId(turn['next']);
      router.refresh();
    });

    return () => {
      socket.off('turn');
    };
  }, [socket, gameId, user.id, clientId, playerSymbol]);

  // console.log('activeId:', activeId);

  const handleClick = (index: number) => {
    if (!board[index] && !winner && activeId === clientId) {
      const newBoard = [...board];
      const currentMark = playerSymbol;
      newBoard[index] = currentMark;
      // console.log(`Position ${index} marquée par ${user.pseudo}`);
      // console.log('Board before update:', newBoard);
      setBoard(newBoard);
      setIsXNext(!isXNext);
      socket?.emit('turn', { pos: index, player: clientId, board: newBoard, isXNext: !isXNext, room: gameId });
      // console.log('Turn event emitted');

      // Check for win or draw after the move
      if (checkWinner(newBoard, currentMark)) {
        endGame(false, currentMark);
        socket?.emit('game_status', { 'status': 'Win', 'player': user.pseudo });
        socket?.emit('winner', {'winner_id': user.id})
      } else if (isDraw(newBoard)) {
        endGame(true);
        socket?.emit('game_status', { 'status': 'Draw', 'player': user.pseudo });
      }
      
      router.refresh(); 
    }
    // console.log('board index:', board[index]);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    socket?.emit('restart_game', { room: gameId });
    socket?.emit('startGame');
    router.refresh(); 
  };

  const checkWinner = (board: (string | null)[], currentClass: string) => {
    const WINNING_COMBINATIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return board[a];
      }
    }
    return null;
  };

  const endGame = (draw: boolean, currentMark?: string) => {
    if (draw) {
      setMessage('Draw!');
      setShowButton(true);
    } else {
      // setMessage(`${currentMark === 'circle' ? "O's" : "X's"} Wins!`);

    }
  };

  const isDraw = (board: (string | null)[]) => {
    return board.every(cell => cell !== null);
  };

  return (
    <div className="relative">
      {winner && (
      <div className="absolute mx-auto container text-center flex flex-col justify-center items-center space-y-8 rounded-lg z-[2] top-0 left-0 w-full h-full bg-gray-400 opacity-80">
        <h2 className="text-[64px] dark:text-white text-primary-black font-bold">
          {winner === 'Draw' ? 'Draw!' : `${winner} Wins!`}
        </h2>
        <Button
          variant="white"
          id="restartButton" 
          onClick={handleRestart}>
              Restart
        </Button>
      </div>
      )}
      <div className="game-board-area">
        <div className="board" id="board">
          {board.map((cell, index) => (
            <div
              key={index}
              className={`cell ${cell ? cell : ''}`}
              data-cell
              onClick={() => handleClick(index)}
            >
            </div>
          ))}
        </div>
        {/* {winner && (
          <div className="winning-message" id="winningMessage">
            <div data-winning-message-text>
              {winner === 'Draw' ? 'Draw!' : `${winner} Wins!`}
            </div>
            <button id="restartButton" onClick={handleRestart}>
              Restart
            </button>
          </div>
        )} */}
        {showButton && (
          <div className="game-board-area-button">
            <button id="gameStart" onClick={handleRestart}>Start Game</button>
          </div>
          )}
        {message && <div className={`game-message ${showButton ? 'mt-0' : 'mt-8'} dark:text-white text-primary-black`}>{message}</div>}
      </div>
      {/* <div id="connected_players">Online: {connectedPlayers.join(', ')}</div> */}
    </div>
  );
};

export default TicTacToe;
