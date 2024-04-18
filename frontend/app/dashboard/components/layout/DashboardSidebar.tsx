"use client";
import React from 'react'
import { ChevronRight, ChevronLeft, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DashboardBottomLinks, DashboardTopLinks } from '@/constants/data';

interface DashboardSidebarProps {
    open: boolean;
    handleButtonClick: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({open, handleButtonClick}) => {

  return (
    <aside className={`${open ? 'w-[250px] flex-shrink-0' : 'w-[80px]'} sticky top-0 left-0 flex flex-col space-y-16 border border-dark-grey min-h-screen pl-6 pr-4 py-6`}>
        {/* sidebar-top-wrapper */}
        <div className="flex items-center justify-between min-h-12">
            {/* sidebar top */}
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
                    <h2 className={` ${!open ? "hidden" : ""} ml-2 text-3xl font-ubuntu font-medium text-white`}>Brainbolt</h2>
                </div>
            </div>
            <button onClick={handleButtonClick} className="absolute grid cursor-pointer z-2 top-16 -right-4 p-[5px] bg-dark-grey rounded-lg">
                {
                    open ? <ChevronLeft size={16} color="#fff" /> : <ChevronRight size={16} color="#fff" />
                }
            </button>
        </div>
        <nav className="flex flex-col space-y-16">
            <ul>
                {
                    DashboardTopLinks.map((link, index) => (
                        <li key={index} className="ml-1 mb-4">
                            <Link href="#" className="flex items-center space-x-3 font-jost">
                                {link.render()}
                                <span className={`ml-2 ${!open ? "hidden" : ""} text-primary-grey`}>{link.title}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <ul>
                {
                    DashboardBottomLinks.map((link, index) => (
                        <li key={index} className="ml-1 mb-1">
                            <Link href="#" className="flex items-center space-x-3 font-jost">
                                <span className="text-[28px]">{link.icon}</span> 
                                <span className={`ml-2 ${!open ? "hidden" : ""} text-primary-grey`}>{link.title}</span>
                            </Link>
                        </li>
                    ))
                }
                
            </ul>
            <ul>
                <li className="ml-1 mb-1">
                    <Link href="#" className="flex items-center space-x-3 font-jost text-primary-red">
                        <LogOut size={24}/>
                        <span className={`ml-2 ${!open ? "hidden" : ""} text-primary-red`}>Déconnexion</span>
                    </Link>
                </li>
            </ul>
        </nav>
    </aside>
  )
}

export default DashboardSidebar