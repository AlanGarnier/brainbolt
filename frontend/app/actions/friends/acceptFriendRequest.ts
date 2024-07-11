import { Friends } from "@/lib/types";

export const acceptFriendRequest = async (userId: string, friendId: string): Promise<Friends> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends/accept_friend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, friend_id: friendId }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to accept friend request');
    }

    const data = await response.json();
    return data as Friends;
};
