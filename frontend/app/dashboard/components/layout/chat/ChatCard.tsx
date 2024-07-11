"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@/lib/types';
import { Send } from 'lucide-react';
import { useSocket } from '@/context/SocketContext';

const ChatCard: React.FC<{ user: User }> = ({ user }) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<{ data: string, sender: string }[]>([]);
  const [connectedPlayers, setConnectedPlayers] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const { socket, gameId } = useSocket();

  useEffect(() => {
    if (!session?.user?.id || !gameId || !socket) return;

    socket.emit('join_room', { room: gameId });

    socket.on('clientId', (id: string, room: string) => {
      // console.log('Received playerId:', id);
      setClientId(id, room);
    });

    socket.on('connected-Players', (players: string[]) => {
      // console.log('Connected players:', players);
      getConnectedPlayers(players);
    });

    socket.on('player message', (msg: { data: string, sender: string }) => {
      updateChatView(msg);
    });

    socket.on('disconnect-status', (msg: { clientId: string, clientsNbs: number, pseudo: string }) => {
      const servermsg = `Le joueur ${msg.pseudo} a quitté la partie. Joueurs connectés: ${msg.clientsNbs}`;
      addMsg(servermsg, 'msg-container center', 'msg-content refer');
      updateConnectedPlayers(msg.clientsNbs);
    });

    // Listen for turn events
    socket.on('turn', (turn) => {
      const txtmsg = `Dernière position par ${turn['username']}, est ${turn['lastPos']}`;
      addMsg(txtmsg, 'msg-container center', 'msg-content refer');
    });

    return () => {
      socket.off('clientId');
      socket.off('connected-Players');
      socket.off('player message');
      socket.off('disconnect-status');
      socket.off('turn'); 
    };
  }, [session?.user?.id, gameId, socket]);

  const setClientId = (id: string, room: string) => {
    // console.log('Received playerId:', id);
    const modalRoomName = `Game room [${room}]`;
    document.querySelector('.modal-header-title')!.innerText = modalRoomName;
    addMsg(`Received playerId: ${id}`, 'msg-container center', 'msg-content refer');
  };

  const getConnectedPlayers = (players: string[]) => {
    // console.log('Connected players:', players);
    setConnectedPlayers(players);
  };

  const addMsg = (msg: string, containerClass: string, contentClass: string) => {
    setMessages((prevMessages) => [...prevMessages, { data: msg, sender: containerClass }]);
    setTimeout(scrollDownLogsWindow, 100); // Scroll down after the new message is added
  };

  const updateChatView = (msg: { data: string, sender: string }) => {
    addMsg(msg.data, msg.sender === session?.user?.id ? 'msg-container right sender' : 'msg-container receiver', 'msg-content');
  };

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() !== '') {
      socket?.emit('my_broadcast_event', { data: message, sender: session?.user?.id });
      setMessage('');
    }
  };

  const scrollDownLogsWindow = () => {
    const logsWindow = document.querySelector(".msg");
    if (logsWindow) {
      logsWindow.scrollTop = logsWindow.scrollHeight;
    }
  };

  const updateConnectedPlayers = (clientsNbs: number) => {
    setConnectedPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      if (updatedPlayers.length > clientsNbs) {
        updatedPlayers.pop();
      }
      return updatedPlayers;
    });
  };

  return (
    <div className="hidden md:block md:sticky top-28 right-[28px] bg-white dark:bg-primary-black border border-lighter-grey dark:border-dark-grey text-primary-black dark:text-white rounded-lg w-96 h-96">
      {
        !gameId ? (
          <div className="p-4 dark:text-white/80 text-primary-black/80">Jouez à un jeu pour accéder au chat.</div>
        ) : <>
           <div className="bg-[#f0f2f5] dark:bg-dark-grey chat-header">
              <div className="modal-header">
                <span className="font-ubuntu font-bold text-lg dark:text-white/80 text-primary-black modal-header-title">Room : {gameId}</span>
              </div>
              <div className="connected-players" id="connected_players">
                Online: {connectedPlayers.join(', ')}
              </div>
            </div>
            <div className="msg" id="msg-area">
              {messages.map((msg, index) => (
                <div key={index} className={`message`}>
                  <div className={`px-2 ${msg.sender}`}>
                    <div className={`msg-content ${msg.sender}`}>{msg.data}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#f0f2f5] dark:bg-dark-grey logs message" id="log_msg">
              <form className="messaging" id="send_msg" method="POST" action="#" autoComplete="off" onSubmit={handleSendMessage}>
                <input type="text" id="message" placeholder="Écrivez un message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit" id="send">
                  <Send size={24} className="dark:text-white text-primary-black/90" />
                </button>
              </form>
            </div>
            </>
      }
    </div>
  );
};

export default ChatCard;
