export const checkUsernameAvailability = async (pseudo: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/check-username?pseudo=${pseudo}`);
    const data = await res.json();
    return data.isAvailable;
  };