import React from 'react'
import { Moon, Sun } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ToggleThemeDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="p-2 relative rounded-lg group hover:bg-white/20">
          <Sun size={28} color="#BBBBBF" className="group-hover:stroke-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon size={28} color="#BBBBBF" className="group-hover:stroke-white absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ToggleThemeDropdown