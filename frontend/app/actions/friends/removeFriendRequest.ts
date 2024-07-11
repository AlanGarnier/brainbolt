export const removeFriendRequest = async (userId: string, friendId: string, onSuccess?:()=>void): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends/remove_friend_request`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, friend_id: friendId }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to remove friend request');
    }

    if (onSuccess) {
        onSuccess();
    }
};
