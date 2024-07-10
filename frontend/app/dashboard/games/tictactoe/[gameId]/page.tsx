import { getCurrentUser } from "@/app/actions/getCurrentUser";
import TicTacToe from "@/app/dashboard/components/games/tictactoe/TicTacToe";
import { DashboardTitle } from "@/components/CustomTexts";
import { User } from "@/lib/types";

export default async function Page({params} : {params: {gameId: string}}) {
    const {gameId} = params
    const user = await getCurrentUser();

    return (
        <>
        <div className="w-11/12 mx-auto">
            <DashboardTitle>Morpion 🎮</DashboardTitle>
        </div>
        <div className="w-11/12 mt-6 mx-auto">
            <TicTacToe user={user as User} gameId={gameId} />
        </div>
        </>
    )
}