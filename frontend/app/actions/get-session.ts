import authOptions from '@/lib/auth'
import {getServerSession} from 'next-auth/next'

export default async function getSession() {
  return await getServerSession(authOptions)
}