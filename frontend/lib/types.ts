export interface User {
  id: string;
  email: string;
  pseudo: string;
  picture: string;
  token?: string;
}

export type Friends = {
  id: string;
  user_id: string;
  friend_id: string;
  friend_pseudo: string;
  friend_picture: string;
  status: "pending" | "accepted";
  created_at: string;
}

export interface Game {
  id: string;
  name: string;
  theme: string;
  picture: string;
}

export interface GameSession {
  id: string;
  game_id: string;
  player1_id: string;
  player2_id: string;
  score: number;
  created_at: string;
  updated_at: string;
}