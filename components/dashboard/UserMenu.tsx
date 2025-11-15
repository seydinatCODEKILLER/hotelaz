'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/useAuth'

interface UserMenuProps {
  user?: {
    prenom?: string
    nom?: string
    avatar?: string
    email?: string
  }
}

export function UserMenu({ user }: UserMenuProps) {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }

  const getInitials = (firstName?: string, lastName?: string) =>
    `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.prenom} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              {getInitials(user?.prenom, user?.nom)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="flex flex-col items-start gap-1">
          <span className="font-medium">{user?.prenom} {user?.nom}</span>
          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
          <User className="mr-2 h-4 w-4" />
          Profil
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}