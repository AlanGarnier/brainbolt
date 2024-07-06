import { getCurrentUser } from "@/app/actions/getCurrentUser";
import TicTacToe from "@/app/dashboard/components/games/tictactoe/Tictactoe";
import { User } from "@/lib/types";

export default async function Page({params} : {params: {gameId: string}}) {
    const {gameId} = params
    const user = await getCurrentUser();

    return (
        <>
        <div className="w-11/12 mx-auto">
            <h2>Morpion 🎮</h2>
            <p>Le jeu du Morpion est un jeu de réflexion qui se joue à deux joueurs. Le but du jeu est de créer une ligne de trois symboles identiques, horizontalement, verticalement ou en diagonale.</p>
        </div>
        <div className="w-11/12 mx-auto">
            <p>{gameId}</p>
            <TicTacToe user={user as User} gameId={gameId} />
        </div>
        </>
    )
}