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
        title: 'Morpion',
        img: '/assets/img/morpion.webp',
    },
    {
        title: 'Ping Pong',
        img: '/assets/img/ping-pong.webp',
    },
    {
        title: 'Space Invaders',
        img: '/assets/img/space-invaders.webp',
    },
    {
        title: 'Solitaire',
        img: '/assets/img/solitaire.webp',
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