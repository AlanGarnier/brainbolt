import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Eye } from 'lucide-react'

const NotificationsList = () => {
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" data-dropdown-toggle="notification-dropdown" className="p-2 relative rounded-lg group hover:bg-white/20">
          <span className="sr-only">View notifications</span>
          <Bell size={24} className="group-hover:stroke-white" color="#BBBBBF" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-sm bg-primary-black border-dark-grey">
        <DropdownMenuLabel className="text-white text-center">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border-[0.5px] border-dark-grey" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="focus:bg-secondary-black cursor-pointer">
            <div className="flex px-4 py-3">
              <div className="flex-shrink-0">
                {/* Changez la ligne du dessous avec next/image - rajouter le domaine dans next.config.js */}
                <img 
                  className="rounded-full w-11 h-11" 
                  src="https://flowbite-admin-dashboard.vercel.app/images/users/bonnie-green.png" 
                  alt="Jese image" />
              </div>
              <div className="w-full pl-3">
                  <div className="text-white font-normal text-sm mb-1.5">New message from <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-br from-primary-purple to-primary-skyblue">Bonnie Green</span> :</div>
                  <div className="text-[12px] italic font-medium text-white/80">a few moments ago</div>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-[0.5px] border-dark-grey" />
        <DropdownMenuItem className="focus:bg-secondary-black hover:bg-secondary-black flex justify-center cursor-pointer font-semibold">
          <Eye className="text-white mr-2 h-5 w-5" />
          <span className="text-white">View all</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

export default NotificationsList