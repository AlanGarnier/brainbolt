"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';

interface SocketContextProps {
  socket: Socket | null;
  setGameId: (gameId: string) => void;
  gameId: string | null;
  board: (string | null)[];
  setBoard: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  isXNext: boolean;
  setIsXNext: React.Dispatch<React.SetStateAction<boolean>>;
  winner: string | null;
  setWinner: React.Dispatch<React.SetStateAction<string | null>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  connectedPlayers: string[];
  setConnectedPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  clientId: number | null;
  setClientId: React.Dispatch<React.SetStateAction<number | null>>;
  playerSymbol: string | null;
  setPlayerSymbol: React.Dispatch<React.SetStateAction<string | null>>;
  showButton: boolean;
  setShowButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const isConnectedRef = useRef(false);
  const { data: session } = useSession();

  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [connectedPlayers, setConnectedPlayers] = useState<string[]>([]);
  const [clientId, setClientId] = useState<number | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<string | null>(null);
  const [showButton, setShowButton] = React.useState<boolean>(true);

  useEffect(() => {
    if (!isConnectedRef.current && session?.user?.id) {

      const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
        transports: ['websocket'],
        query: { id: session.user.id }
      });

      newSocket.on('connection-established', (result: any) => {
        console.log('Connection established:', result);
        setSocket(newSocket);
        isConnectedRef.current = true;
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
        isConnectedRef.current = false;
        setSocket(null);
      });

      newSocket.on('connected-Players', (players: string[]) => {
        // console.log('Connected players:', players);
        setConnectedPlayers(players);
      });

      newSocket.on('clientId', (id: number, room: string) => {
        setClientId(id);
        setPlayerSymbol(id === 0 ? "x" : "circle");
        console.log(`Received playerId: ${id}, assigned symbol: ${id === 0 ? "x" : "circle"}`);
      });

      newSocket.on('start', (data) => {
        setActiveId(data['activePlayer']);
        const txtmsg = (data['activePlayer'] === session?.user?.id)
          ? `Joueur actif : ${data['pseudo']}`
          : `Joueur actif : ${data['pseudo']}`;
        setMessage(txtmsg);
        // console.log(txtmsg);
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setShowButton(false);
      });

      newSocket.on('waiting second player start', () => {
        const txtmsg = 'En attente du second joueur...';
        setShowButton(true);
        setMessage(txtmsg);
        // console.log(txtmsg);
      });

      newSocket.on('turn', (turn) => {
        console.log('Received turn event:', turn);
        const currentMark = turn['recentPlayer'] === clientId ? playerSymbol : (playerSymbol === 'x' ? 'circle' : 'x');
        // console.log(`Dernière position par ${turn['username']}, est ${turn['lastPos']}`);
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[turn['lastPos']] = currentMark;
          return newBoard;
        });

        if (checkWinner(turn.board, currentMark)) {
          endGame(false, currentMark);
          newSocket.emit('game_status', { 'status': 'Win', 'player': turn['username'] });
        } else if (isDraw(turn.board)) {
          endGame(true);
          newSocket.emit('game_status', { 'status': 'Draw', 'player': turn['username'] });
        }
        setActiveId(turn['next']);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [session?.user?.id]);

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

  const endGame = (draw: boolean, currentMark?: string, username?: string) => {
    if (draw) {
      setMessage('Draw!');
    } else {
      setMessage(`${username} Wins!`);
    }
  };

  const isDraw = (board: (string | null)[]) => {
    return board.every(cell => cell !== null);
  };

  return (
    <SocketContext.Provider value={{
      socket,
      setGameId,
      gameId,
      board,
      setBoard,
      activeId,
      setActiveId,
      isXNext,
      setIsXNext,
      winner,
      setWinner,
      message,
      setMessage,
      connectedPlayers,
      setConnectedPlayers,
      clientId,
      setClientId,
      playerSymbol,
      setPlayerSymbol,
      showButton,
      setShowButton
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
