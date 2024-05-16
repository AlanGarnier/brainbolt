import React from 'react'
import LoginForm from './components/LoginForm'
import getSession from '@/app/actions/get-session'
import { redirect } from 'next/navigation'

export default async function LoginPage () {
  const session = await getSession();
  
  // If the user is already logged in, redirect to the dashboard
  if (session) {
    redirect('/dashboard');
  }

  return (
    <LoginForm />
  )
}