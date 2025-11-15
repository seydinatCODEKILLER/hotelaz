'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Hotel } from '@/types/hotel'
import { Edit, Trash2, RotateCcw, Building, MapPin, Phone, Mail, Euro } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface HotelsCardViewProps {
  hotels: Hotel[]
  onEdit: (hotel: Hotel) => void
  onDelete: (hotel: Hotel) => void
  onRestore: (hotel: Hotel) => void
  isDeleting?: boolean
  isRestoring?: boolean
}

export function HotelsCardView({ 
  hotels, 
  onEdit, 
  onDelete, 
  onRestore, 
  isDeleting = false, 
  isRestoring = false 
}: HotelsCardViewProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {hotels.map((hotel, index) => (
        <motion.div
          key={hotel.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow duration-300">
            {/* Photo et statut */}
            <CardHeader className="p-0 relative">
              {hotel.photo ? (
                <img
                  src={hotel.photo}
                  alt={hotel.nom}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-t-lg flex items-center justify-center">
                  <Building className="w-16 h-16 text-white opacity-80" />
                </div>
              )}
              
              <Badge 
                variant={getStatusVariant(hotel.statut, hotel.deleted_at)}
                className="absolute top-3 right-3"
              >
                {getStatusText(hotel.statut, hotel.deleted_at)}
              </Badge>
            </CardHeader>

            <CardContent className="p-6">
              {/* Nom et prix */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {hotel.nom}
                </h3>
                <div className="flex items-center gap-2 text-lg font-bold text-blue-600">
                  <Euro className="w-4 h-4" />
                  {formatCurrency(hotel.prix_par_nuit, hotel.device)}
                  <span className="text-sm text-gray-500 font-normal">/nuit</span>
                </div>
              </div>

              {/* Informations de contact */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{hotel.adresse}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{hotel.telephone}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{hotel.mail}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {!hotel.deleted_at && hotel.statut === 'actif' ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => onEdit(hotel)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
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
                    className="flex-1"
                    onClick={() => onRestore(hotel)}
                    disabled={isRestoring}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restaurer
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}