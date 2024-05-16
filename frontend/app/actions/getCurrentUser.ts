import getSession from './get-session';

export const getCurrentUser = async () => {

  const session = await getSession();

  if (!session) {
    return null;
  }

  return session.user;
};
