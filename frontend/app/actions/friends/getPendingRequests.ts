export const getPendingRequests = async (userId: string): Promise<string[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends/pending_requests/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.pending_requests.map((req: any) => req.friend_id);
        } else {
            const data = await response.json();
            throw new Error(data.error || 'Failed to fetch pending friend requests');
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to fetch pending friend requests');
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
