"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Search, AlignLeft, LogOut, X } from 'lucide-react';
import ToggleThemeDropdown from './theme/ToggleThemeDropdown';
import NotificationsList from './notifications/NotificationsList';
import { DashboardBottomLinks, DashboardTopLinks } from '@/constants/data';
import { User } from '@/lib/types';
import UserMenu from './user/UserMenu';
import SearchBar from './search/SearchBar';

interface DashboardNavProps {
  user: User;
}

const DashboardNav: React.FC<DashboardNavProps> = ({user}) => {
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    // Function to toggle body overflow
    const toggleBodyOverflow: () => void = () => {
      if (openMobileMenu) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };
    // Call toggleBodyOverflow when isMenuOpen changes
    toggleBodyOverflow();

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openMobileMenu]);

  return (
    <nav className="fixed z-20 top-0 w-full border-b bg-white dark:bg-primary-black border-lighter-grey dark:border-dark-grey">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              className="lg:hidden ml-2 md:mr-24">
              <AlignLeft onClick={() => setOpenMobileMenu(!openMobileMenu)} className='h-8 w-8 text-primary-black dark:text-[#BBBBBF]' />
            </button>
            {/* <Link href="/" className="flex lg:hidden ml-2 md:mr-24">
              <Image 
                src="/assets/img/brainbolt-white-logo.svg" 
                width={155}
                height={24}
                className="h-8 mr-3" 
                alt="Brainbolt Logo" />
            </Link> */}
            <div className="relative inline">
              <SearchBar />
            </div>
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
            <UserMenu user={user} />
            
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

      {/* Mobile Menu */}
      <div className={`${openMobileMenu ? 'left-0' : '-left-full'} transition-all duration-200 fixed z-20 top-0 h-screen overflow-hidden shadow-lg`}>
        <div className='w-[360px] flex flex-col space-y-16 border md:hidden z-40 bg-white dark:bg-primary-black sticky top-0 left-0 min-h-screen pl-6 pr-4 py-6'>
          {/* sidebar-top-wrapper */}
          <div className="flex items-center justify-between min-h-12">
              <div className="flex items-center"> 
                  <div>
                      <Image 
                          src="/favicon.ico" 
                          alt="Logo"
                          width={32}
                          height={32} 
                          className="block w-8 h-8" />
                  </div>
                  <div>
                      <h2 className={` ml-2 text-3xl font-ubuntu font-medium text-primary-black dark:text-white`}>Brainbolt</h2>
                  </div>
              </div>
              
              <div className="cursor-pointer">
                  <X onClick={() => setOpenMobileMenu(!openMobileMenu)} size={32} className="text-primary-black dark:text-white" />
              </div>
          </div>
          <div className="flex flex-col space-y-16">
              <ul>
                  {
                      DashboardTopLinks.map((link, index) => (
                          <li key={index} className="-ml-[3px] mb-1">
                              <Link href={link.link} className="px-2 py-[7px] flex items-center space-x-3 font-jost hover:bg-primary-black/20 dark:hover:bg-white/20 rounded group transition-colors duration-300">
                                  {link.render()}
                                  <span className={`ml-2 text-primary-black dark:text-primary-grey dark:group-hover:text-white`}>{link.title}</span>
                              </Link>
                          </li>
                      ))
                  }
              </ul>
              <ul>
                  {
                      DashboardBottomLinks.map((link, index) => (
                          <li key={index} className="-ml-1 mb-1">
                              <Link href={link.link} className="px-2 py-[3px] flex items-center space-x-3 font-jost hover:bg-primary-black/20 dark:hover:bg-white/20 rounded group transition-colors duration-300">
                                  <span className="text-[24px]">{link.icon}</span> 
                                  <span className={`ml-2 text-primary-black dark:text-primary-grey dark:group-hover:text-white`}>{link.title}</span>
                              </Link>
                          </li>
                      ))
                  }
                  
              </ul>
              <ul>
                  <li className="ml-1 mb-1">
                      <Link href="#" className="flex items-center space-x-3 font-jost text-primary-red">
                          <LogOut size={24}/>
                          <span className={`ml-2 text-primary-red`}>Déconnexion</span>
                      </Link>
                  </li>
              </ul>
          </div>
        </div>
      </div>
    
      {/* Background Overlay active when mobile menu is open */}
       <div className={`${openMobileMenu ? 'block' : 'hidden'} fixed inset-0 z-10 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`}></div>
    </nav>
  )
}

export default DashboardNav