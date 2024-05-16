export const checkCredentialsAvailability = async (field: string, value: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/check-credentials?field=${field}&value=${value}`);
    const data = await res.json();
    return data.isAvailable;
  };