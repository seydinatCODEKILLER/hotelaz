'use client'

import { Hotel, HotelsResponse, HotelFilters } from '@/types/hotel'
import { HotelsCardView } from './HotelsCardView'
import { HotelsTableView } from './HotelsTableView'
import { HotelsSkeleton } from './HotelsSkeleton'
import { Pagination } from '@/components/ui/pagination'

interface HotelsViewProps {
  data?: HotelsResponse
  isLoading: boolean
  viewMode: 'cards' | 'table'
  filters: HotelFilters
  onPageChange: (page: number) => void
  onEdit: (hotel: Hotel) => void
  onDelete: (hotel: Hotel) => void
  onRestore: (hotel: Hotel) => void
  isDeleting?: boolean
  isRestoring?: boolean
}

export function HotelsView({ 
  data, 
  isLoading, 
  viewMode, 
  filters, 
  onPageChange, 
  onEdit, 
  onDelete, 
  onRestore, 
  isDeleting = false, 
  isRestoring = false 
}: HotelsViewProps) {
  if (isLoading) {
    return <HotelsSkeleton viewMode={viewMode} />
  }

  if (!data?.data?.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">Aucun hôtel trouvé</div>
        <div className="text-gray-500 text-sm mt-2">
          {filters.search ? 'Essayez de modifier vos critères de recherche' : 'Commencez par créer votre premier hôtel'}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Vue sélectionnée */}
      {viewMode === 'cards' ? (
        <HotelsCardView 
          hotels={data.data} 
          onEdit={onEdit}
          onDelete={onDelete}
          onRestore={onRestore}
          isDeleting={isDeleting}
          isRestoring={isRestoring}
        />
      ) : (
        <HotelsTableView 
          hotels={data.data} 
          onEdit={onEdit}
          onDelete={onDelete}
          onRestore={onRestore}
          isDeleting={isDeleting}
          isRestoring={isRestoring}
        />
      )}

      {/* Pagination */}
      {data.pagination && data.pagination.last_page > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={data.pagination.current_page}
            totalPages={data.pagination.last_page}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  )
}