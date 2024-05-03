import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Search } from 'lucide-react';
import UserMenu from './user/UserMenu';
import ToggleThemeDropdown from './theme/ToggleThemeDropdown';
import NotificationsList from './notifications/NotificationsList';

const DashboardNav = () => {
  return (
    <nav className="fixed z-20 top-0 w-full border-b bg-white dark:bg-primary-black border-lighter-grey dark:border-dark-grey">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/" className="flex lg:hidden ml-2 md:mr-24">
              <Image 
                src="/assets/img/brainbolt-white-logo.svg" 
                width={155}
                height={24}
                className="h-8 mr-3" 
                alt="Brainbolt Logo" />
            </Link>
            <form action="#" method="GET" className="hidden lg:block lg:ml-[260px]">
              <label className="sr-only">Search</label>
              <div className="relative mt-1 lg:w-96">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={20} className="text-primary-black dark:text-[#BBBBBF]" />
                  {/* <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg> */}
                </div>
                <input type="text" name="search" id="topbar-search" className="bg-white dark:bg-primary-black border font-jost text-white/80 md:text-sm rounded-lg  focus:ring-white block w-full pl-10 p-2.5 border-primary-black/60 dark:border-light-grey placeholder-primary-black/60 dark:placeholder-light-grey focus:outline-none focus:border-primary-black focus:border-[1.5px] dark:focus:border-white" placeholder="Rechercher un jeu/ami..." />
              </div>
            </form>
          </div>
          <div className="flex items-center space-x-2">
            <button id="toggleSidebarMobileSearch" type="button" className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Search</span>
              
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </button>

            {/* Theme Toggle */}
            <ToggleThemeDropdown />
            
            {/* Notifications */}
            <NotificationsList />
            
            {/* User Profile Menu */}
            <UserMenu />
            
            <div className="flex items-center ml-3">
              <div>
                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button-2" aria-expanded="false" data-dropdown-toggle="dropdown-2">
                  <span className="sr-only">Open user menu</span>
                </button>
              </div>
            </div>
            </div>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNav