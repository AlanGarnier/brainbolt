// Ici, nous simulons les données que nous utiliserons dans l'application.
// C'est une bonne pratique pour éviter de coder en dur les données dans les composants.
// Cela sera utile lorsque nous récupérerons des données à partir d'une API, c'est la même structure que nous utiliserons.

export interface GameDataInterface {
    title: string;
    img: string;
}

export const gameData: GameDataInterface[] = [
    {
        title: 'Missile Command',
        img: '/assets/img/missile-command.webp',
    },
    {
        title: 'Chess',
        img: '/assets/img/chess.webp',
    },
    {
        title: 'Tic Tac Toe',
        img: '/assets/img/tic-tac-toe.webp',
    },
    {
        title: 'Sudoku',
        img: '/assets/img/sudoku.webp',
    },
    {
        title: '5 Roll',
        img: '/assets/img/5-roll.webp',
    }
]