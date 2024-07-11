export const getReceivedRequests = async (userId: string): Promise<any[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends/received_requests/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.received_requests;
    } else {
      const data = await response.json();
      throw new Error(data.error || 'Failed to fetch received friend requests');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to fetch received friend requests');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
