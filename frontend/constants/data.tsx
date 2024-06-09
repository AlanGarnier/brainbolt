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
    link:string;
}

export interface DashboardBottomLinksInterface {
    title: string;
    icon: string;
    link: string;
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
        link: '/dashboard',
        render: () => (
            <LayoutDashboard className="text-primary-black dark:text-primary-grey group-hover:text-primary-black dark:group-hover:text-white" size={26} /> 
        ),
    },
    {
        title: 'Nouveautés',
        link: '/dashboard/news',
        render: () => (
            <BadgeInfo className="text-primary-black dark:text-primary-grey group-hover:text-primary-black dark:group-hover:text-white" size={26} />
        ),
    },
    // {
    //     title: 'Jeux populaires',
    //     render: () => (
    //         <Flame size={24} color="#B2B2B2" />
    //     ),
    // }
];

export const DashboardBottomLinks: DashboardBottomLinksInterface[] = [
    {
        title: 'Catégories',
        link: '/dashboard/categories',
        icon: '🎮'
    },
    {
        title: 'Jeux favoris',
        link: '/dashboard/favorites',
        icon: '💜'
    },
    {
        title: 'Demandes en amis',
        link: '/dashboard/friends/requests',
        icon: '📩'
    },
    {
        title: 'Amis',
        link: '/dashboard/friends',
        icon: '👥'
    }
];