import React from 'react'
import {
    LogOut,
    Settings,
    User,
    Users,
  } from "lucide-react"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Changez la ligne du dessous avec next/image - rajouter le domaine dans next.config.js */}
        <img
            src="https://github.com/shadcn.png"
            alt="CN"
            className="w-8 h-8 cursor-pointer object-contain rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white dark:bg-primary-black border-lighter-grey dark:border-dark-grey">
        <DropdownMenuLabel className="text-primary-black dark:text-white">shadn@gmail.com</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-[0.5px] border-lighter-grey dark:border-dark-grey" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="focus:bg-lighter-grey dark:focus:bg-dark-grey cursor-pointer">
            <User className="text-primary-black dark:text-white mr-2 h-4 w-4" />
            <span className="text-primary-black dark:text-white">Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-lighter-grey dark:focus:bg-dark-grey cursor-pointer">
            <Users className="text-primary-black dark:text-white mr-2 h-4 w-4" />
            <span className="text-primary-black dark:text-white">Amis</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-lighter-grey dark:focus:bg-dark-grey cursor-pointer">
            <Settings className="text-primary-black dark:text-white mr-2 h-4 w-4" />
            <span className="text-primary-black dark:text-white">Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-[0.5px] border-lighter-grey dark:border-dark-grey" />
        <DropdownMenuItem className="focus:bg-lighter-grey dark:focus:bg-dark-grey cursor-pointer">
          <LogOut className="text-primary-red mr-2 h-4 w-4" />
          <span className="text-primary-red">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu