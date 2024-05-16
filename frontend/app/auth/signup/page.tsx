import React from 'react'
import SignUpForm from './components/SignUpForm'
import getSession from '@/app/actions/get-session';
import { redirect } from 'next/navigation';

export default async function SignupPage() {
  const session = await getSession();
  
  // If the user is already logged in, redirect to the dashboard
  if (session) {
    redirect('/dashboard');
  }

  return (
    <SignUpForm />
  )
}