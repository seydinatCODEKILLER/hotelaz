'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { SidebarHeader } from './SidebarHeader'
import { SidebarFooters } from './SidebarFooter'
import { LayoutDashboard, Hotel, User, Building } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigationItems = [
  { 
    title: 'Dashboard', 
    href: '/dashboard/analytics', 
    icon: LayoutDashboard,
  },
  { 
    title: 'Hôtels', 
    href: '/dashboard/hotels', 
    icon: Hotel,
  },
  { 
    title: 'Profile', 
    href: '/dashboard/profile', 
    icon: User,
  },
]

function NavItem({ item }: { item: typeof navigationItems[0] }) {
  
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={cn(
          'w-full transition-all duration-200',
          isActive 
            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-r-2 border-blue-500' 
            : 'hover:bg-muted/50'
        )}
      >
        <Link href={item.href} className="flex items-center gap-3 w-full p-2 rounded-lg">
          <div className={cn(
            'flex items-center justify-center w-8 h-8 rounded-lg transition-colors',
            isActive 
              ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' 
              : 'bg-muted text-muted-foreground group-hover:bg-blue-500/10 group-hover:text-blue-600'
          )}>
            <item.icon className="w-4 h-4" />
          </div>
          
          <span className={cn(
            'font-medium text-sm transition-colors',
            isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
          )}>
            {item.title}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function DashboardSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon" className='border-r'>
      <SidebarHeader />
      
      <SidebarContent className="flex flex-col flex-1">
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooters />
    </Sidebar>
  )
}