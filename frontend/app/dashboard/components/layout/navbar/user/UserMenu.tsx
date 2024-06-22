import React from 'react'
import {
    LogOut,
    Settings,
    Users,
    User,
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
import Image from 'next/image'
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface UserMenuProps {
  user: {
    id: string;
    email: string;
    pseudo: string;
    picture: string;
  };
}


const UserMenu: React.FC<UserMenuProps> = ({user}) => {

  const handleSignOut = async () => {
    await signOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
            src={user?.picture || "/assets/img/user-placeholder.png"}
            alt={user?.pseudo || "User"}
            width={32}
            height={32}
            className="cursor-pointer object-contain rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white dark:bg-primary-black border-lighter-grey dark:border-dark-grey">
        <DropdownMenuLabel className="text-primary-black dark:text-white">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border-[0.5px] border-lighter-grey dark:border-dark-grey" />
        <Link href={`/dashboard/profile/${user.id}`}>
            <DropdownMenuItem className="focus:bg-lighter-grey dark:focus:bg-dark-grey cursor-pointer">
              <User className="text-primary-black dark:text-white mr-2 h-4 w-4" />
              <span className="text-primary-black dark:text-white">Profil</span>
            </DropdownMenuItem>
          </Link>
        <DropdownMenuGroup>
          <Link href="/dashboard/friends">
            <DropdownMenuItem className="focus:bg-lighter-grey dark:focus:bg-dark-grey cursor-pointer">
              <Users className="text-primary-black dark:text-white mr-2 h-4 w-4" />
              <span className="text-primary-black dark:text-white">Amis</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings">
            <DropdownMenuItem className="focus:bg-lighter-grey dark:focus:bg-dark-grey cursor-pointer">
                <Settings className="text-primary-black dark:text-white mr-2 h-4 w-4" />
                <span className="text-primary-black dark:text-white">Paramètres</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-[0.5px] border-lighter-grey dark:border-dark-grey" />
        <DropdownMenuItem onClick={handleSignOut} className="focus:bg-lighter-grey dark:focus:bg-dark-grey cursor-pointer">
          <LogOut className="text-primary-red mr-2 h-4 w-4" />
          <span className="text-primary-red">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu