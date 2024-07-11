import { User } from "@/lib/types";

export async function getUser(userId: string): Promise<User | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to fetch accepted friend requests');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}