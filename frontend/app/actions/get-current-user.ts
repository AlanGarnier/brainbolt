import getSession from './get-session'

export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const response = await fetch(
      `${process.env.BACKEND_API_URL}`,
      {
        method: 'GET'
      }
    )
    const currentUser = await response.json()

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (error: any) {
    return null
  }
}