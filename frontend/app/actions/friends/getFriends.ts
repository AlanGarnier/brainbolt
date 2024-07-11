export const getFriends = async (userId: string, onSuccess?:()=>void): Promise<any[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends/accepted_requests/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
        if (onSuccess) {
            onSuccess();
        }
      return data.accepted_requests;
    } else {
      const data = await response.json();
      throw new Error(data.error || 'Failed to fetch accepted friend requests');
    }

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to fetch accepted friend requests');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
