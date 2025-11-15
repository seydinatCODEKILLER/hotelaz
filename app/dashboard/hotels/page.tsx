'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Plus, Grid, Table } from 'lucide-react'
import { Hotel, HotelFilters } from '@/types/hotel'
import { HotelsView } from '@/components/hotels/HotelsView'
import { CreateHotelModal } from '@/components/hotels/CreateHotelModal'
import { UpdateHotelModal } from '@/components/hotels/UpdateHotelModal'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'
import { useHotels, useDeleteHotel, useRestoreHotel } from '@/hooks/hotels/useHotels'

// Options de filtre statiques (puisque useFilterOptions n'existe plus)
const STATIC_FILTER_OPTIONS = {
  statuts: [
    { value: 'actif', label: 'Actif' },
    { value: 'inactif', label: 'Inactif' }
  ],
  devices: [
    { value: 'FCFA', label: 'FCFA', symbol: 'FCFA' },
    { value: 'EURO', label: 'Euro', symbol: '€' },
    { value: 'DOLLARS', label: 'Dollar', symbol: '$' }
  ]
}

export default function HotelsPage() {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [actionType, setActionType] = useState<'delete' | 'restore'>('delete')
  
  const [filters, setFilters] = useState<HotelFilters>({
    page: 1,
    per_page: 12,
    sort_field: 'created_at',
    sort_direction: 'desc',
  })

  const { data: hotelsData, isLoading } = useHotels(filters)
  const deleteHotel = useDeleteHotel()
  const restoreHotel = useRestoreHotel()

  const handleFilterChange = (key: keyof HotelFilters, value: string | number | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1,
    }))
  }

  const handleSearch = (searchTerm: string) => {
    handleFilterChange('search', searchTerm || undefined)
  }

  const handlePageChange = (page: number) => {
    handleFilterChange('page', page)
  }

  const handleEdit = (hotel: Hotel) => {
    setSelectedHotel(hotel)
    setUpdateModalOpen(true)
  }

  const handleDelete = (hotel: Hotel) => {
    setSelectedHotel(hotel)
    setActionType('delete')
    setConfirmationModalOpen(true)
  }

  const handleRestore = (hotel: Hotel) => {
    setSelectedHotel(hotel)
    setActionType('restore')
    setConfirmationModalOpen(true)
  }

  const handleViewModeChange = (value: string) => {
    if (value === 'cards' || value === 'table') {
      setViewMode(value)
    }
  }

  const handleConfirmAction = () => {
    if (!selectedHotel) return
    
    if (actionType === 'delete') {
      deleteHotel.mutate(selectedHotel.id)
    } else {
      restoreHotel.mutate(selectedHotel.id)
    }
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mes Hôtels</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gérez tous vos établissements hôteliers
          </p>
        </div>
        
        <Button onClick={() => setCreateModalOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvel Hôtel
        </Button>
      </motion.div>

      {/* Filtres et contrôles */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
            {/* Recherche */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rechercher
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Nom, adresse, téléphone..."
                  className="pl-10"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Statut */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Statut
              </label>
              <Select
                value={filters.statut || ''}
                onValueChange={(value) => handleFilterChange('statut', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  {STATIC_FILTER_OPTIONS.statuts.map((statut) => (
                    <SelectItem key={statut.value} value={statut.value}>
                      {statut.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Devise */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Devise
              </label>
              <Select
                value={filters.device || ''}
                onValueChange={(value) => handleFilterChange('device', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les devises" />
                </SelectTrigger>
                <SelectContent>
                  {STATIC_FILTER_OPTIONS.devices.map((device) => (
                    <SelectItem key={device.value} value={device.value}>
                      {device.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mode de vue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Affichage
              </label>
              <Tabs value={viewMode} onValueChange={handleViewModeChange}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cards" className="flex items-center gap-2">
                    <Grid className="w-4 h-4" />
                    Cards
                  </TabsTrigger>
                  <TabsTrigger value="table" className="flex items-center gap-2">
                    <Table className="w-4 h-4" />
                    Tableau
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Filtres avancés */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Prix min */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prix min
              </label>
              <Input
                type="number"
                placeholder="Prix minimum"
                value={filters.prix_min || ''}
                onChange={(e) => handleFilterChange('prix_min', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>

            {/* Prix max */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prix max
              </label>
              <Input
                type="number"
                placeholder="Prix maximum"
                value={filters.prix_max || ''}
                onChange={(e) => handleFilterChange('prix_max', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>

            {/* Tri */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trier par
              </label>
              <Select
                value={`${filters.sort_field}-${filters.sort_direction}`}
                onValueChange={(value) => {
                  const [field, direction] = value.split('-')
                  handleFilterChange('sort_field', field)
                  handleFilterChange('sort_direction', direction)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at-desc">Plus récents</SelectItem>
                  <SelectItem value="created_at-asc">Plus anciens</SelectItem>
                  <SelectItem value="nom-asc">Nom (A-Z)</SelectItem>
                  <SelectItem value="nom-desc">Nom (Z-A)</SelectItem>
                  <SelectItem value="prix_par_nuit-asc">Prix croissant</SelectItem>
                  <SelectItem value="prix_par_nuit-desc">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des hôtels */}
      <HotelsView
        data={hotelsData}
        isLoading={isLoading}
        viewMode={viewMode}
        filters={filters}
        onPageChange={handlePageChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRestore={handleRestore}
        isDeleting={deleteHotel.isPending}
        isRestoring={restoreHotel.isPending}
      />

      {/* Modals */}
      <CreateHotelModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />

      {selectedHotel && (
        <UpdateHotelModal
          open={updateModalOpen}
          onOpenChange={setUpdateModalOpen}
          hotel={selectedHotel}
        />
      )}

      <ConfirmationModal
        open={confirmationModalOpen}
        onOpenChange={setConfirmationModalOpen}
        onConfirm={handleConfirmAction}
        title={
          actionType === 'delete' 
            ? 'Supprimer l\'hôtel' 
            : 'Restaurer l\'hôtel'
        }
        description={
          actionType === 'delete'
            ? `Êtes-vous sûr de vouloir supprimer "${selectedHotel?.nom}" ? Cette action est réversible.`
            : `Êtes-vous sûr de vouloir restaurer "${selectedHotel?.nom}" ?`
        }
        type={actionType}
        isLoading={actionType === 'delete' ? deleteHotel.isPending : restoreHotel.isPending}
      />
    </div>
  )
}