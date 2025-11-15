'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserMenu } from './UserMenu'
import { useAuth } from '@/hooks/useAuth'
import { ModeToggle } from '@/components/theme/ModeToggle'

export function DashboardHeader() {
  const { user } = useAuth()

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 w-full">
      {/* Branding et Trigger */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-foreground">HotelManager</h1>
          <p className="text-sm text-muted-foreground">
            Solution de gestion hôtelière moderne
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <UserMenu user={user ?? undefined} />
      </div>
    </header>
  )
}