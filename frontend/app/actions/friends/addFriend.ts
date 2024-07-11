export const addFriend = async (userId: string, friendId: string, onSuccess?: () => void): Promise<void> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends/add_friend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, friend_id: friendId }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to send friend request');
        }

        if (onSuccess) {
            onSuccess();
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to send friend request');
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
