import React from 'react'
import GamesCarousel from './components/homepage/GamesCarousel'

const DashboardPage = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
      <div className="pl-0 h-screen lg:pr-10">
        <GamesCarousel />
      </div>
    </>
  )
}

export default DashboardPage