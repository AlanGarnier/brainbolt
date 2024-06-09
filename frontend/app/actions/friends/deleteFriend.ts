export const deleteFriend = async (userId: string, friendId: string, onSuccess?: ()=>void): Promise<void> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/friends/delete_friend`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, friend_id: friendId }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete friend");
        }

        if (onSuccess) {
            onSuccess();
        }
    
        return await response.json();
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message || 'Failed to fetch accepted friend requests');
        } else {
          throw new Error('An unknown error occurred');
        }
      }
}