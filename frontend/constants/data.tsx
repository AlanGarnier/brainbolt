import { ChevronRight, ChevronLeft, LayoutDashboard, Flame, BadgeInfo } from 'lucide-react';

// Ici, nous simulons les données que nous utiliserons dans l'application.
// C'est une bonne pratique pour éviter de coder en dur les données dans les composants.
// Cela sera utile lorsque nous récupérerons des données à partir d'une API, c'est la même structure que nous utiliserons.

export interface GameDataInterface {
    title: string;
    img: string;
}

export interface DashboardTopLinksInterface {
    title: string;
    render: () => JSX.Element;
}

export interface DashboardBottomLinksInterface {
    title: string;
    icon: string;
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

export const DashboardTopLinks: DashboardTopLinksInterface[] = [
    {
        title: 'Accueil',
        render: () => (
            <LayoutDashboard size={24} color="#B2B2B2" /> 
        ),
    },
    {
        title: 'Nouveautés',
        render: () => (
            <BadgeInfo size={24} color="#B2B2B2" />
        ),
    },
    {
        title: 'Jeux populaires',
        render: () => (
            <Flame size={24} color="#B2B2B2" />
        ),
    }
];

export const DashboardBottomLinks: DashboardBottomLinksInterface[] = [
    {
        title: 'Catégories',
        icon: '🎮'
    },
    {
        title: 'Jeux favoris',
        icon: '💜'
    },
    {
        title: 'Amis',
        icon: '👥'
    }
];