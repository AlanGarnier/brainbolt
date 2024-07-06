import { Game } from "@/lib/types";

export const getGames = async (): Promise<Game[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/game`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });
    
        if (response.ok) {
        const data = await response.json();
        return data;
        } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch games');
        }
    
    } catch (error) {
        if (error instanceof Error) {
        throw new Error(error.message || 'Failed to fetch games');
        } else {
        throw new Error('An unknown error occurred');
        }
    }
    };