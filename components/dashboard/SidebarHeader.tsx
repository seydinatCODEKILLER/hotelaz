import { SidebarHeader as UISidebarHeader } from '@/components/ui/sidebar'
import { useSidebar } from '@/hooks/useSidebar'
import { Building } from 'lucide-react'

export function SidebarHeader() {
  const { state } = useSidebar()

  return (
    <UISidebarHeader className="p-4 border-b">
      <div
        className={`flex items-center ${state === "expanded" ? "gap-2" : ""}`}
      >
        <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Building className="h-5 w-5 text-white" />
        </div>
        {state === "expanded" && (
          <div>
            <h2 className="font-semibold text-sidebar-foreground">HotelManager</h2>
            <p className="text-xs text-muted-foreground">
              Gestion Hôtelière
            </p>
          </div>
        )}
      </div>
    </UISidebarHeader>
  )
}