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

  export interface Score {
    game: string;
    value: number;
}