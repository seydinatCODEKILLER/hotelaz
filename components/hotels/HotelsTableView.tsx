'use client'

import { motion } from 'framer-motion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Hotel } from '@/types/hotel'
import { Edit, Trash2, RotateCcw, Building } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

interface HotelsTableViewProps {
  hotels: Hotel[]
  onEdit: (hotel: Hotel) => void
  onDelete: (hotel: Hotel) => void
  onRestore: (hotel: Hotel) => void
  isDeleting?: boolean
  isRestoring?: boolean
}

export function HotelsTableView({ 
  hotels, 
  onEdit, 
  onDelete, 
  onRestore, 
  isDeleting = false, 
  isRestoring = false 
}: HotelsTableViewProps) {
  const getStatusVariant = (statut: string, deleted_at?: string) => {
    if (deleted_at) return 'destructive'
    if (statut === 'actif') return 'default'
    return 'secondary'
  }

  const getStatusText = (statut: string, deleted_at?: string) => {
    if (deleted_at) return 'Supprimé'
    if (statut === 'actif') return 'Actif'
    return 'Inactif'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hôtel</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Prix/nuit</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotels.map((hotel, index) => (
              <motion.tr
                key={hotel.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    {hotel.photo ? (
                      <img
                        src={hotel.photo}
                        alt={hotel.nom}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {hotel.nom}
                      </div>
                      <div className="text-sm text-gray-500">
                        {hotel.device}
                      </div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="max-w-[200px]">
                    <div className="text-sm text-gray-900 dark:text-white truncate">
                      {hotel.adresse}
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {hotel.telephone}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-[150px]">
                      {hotel.mail}
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(hotel.prix_par_nuit, hotel.device)}
                  </div>
                </TableCell>
                
                <TableCell>
                  <Badge variant={getStatusVariant(hotel.statut, hotel.deleted_at)}>
                    {getStatusText(hotel.statut, hotel.deleted_at)}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <div className="text-sm text-gray-500">
                    {formatDate(hotel.created_at)}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex justify-end gap-2">
                    {!hotel.deleted_at && hotel.statut === 'actif' ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(hotel)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete(hotel)}
                          disabled={isDeleting}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRestore(hotel)}
                        disabled={isRestoring}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}