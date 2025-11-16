'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Hotel } from '@/types/hotel'
import { Edit, Trash2, RotateCcw, Building, MapPin, Phone, Mail, Euro,Wifi, Car, Utensils } from 'lucide-react'
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

  const router = useRouter()

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

  const renderAmenities = () => {
    const amenities = [
      { icon: Wifi, label: 'WiFi' },
      { icon: Car, label: 'Parking' },
      { icon: Utensils, label: 'Restaurant' }
    ]

    return (
      <div className="flex gap-2 mt-3">
        {amenities.map((amenity, index) => (
          <Badge key={index} variant="outline" className="px-2 py-1 text-xs">
            <amenity.icon className="w-3 h-3 mr-1" />
            {amenity.label}
          </Badge>
        ))}
      </div>
    )
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
          <Card
            className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => router.push(`/dashboard/hotels/${hotel.id}`)}
          >
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

            <CardContent className="p-3 relative z-20 bg-transparent">
              {/* En-tête avec prix */}
              <div className="mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                  <Badge>
                    {hotel.nom}
                  </Badge>
                  
                  <Badge variant="secondary">
                    <Euro className="w-4 h-4" />
                    {formatCurrency(hotel.prix_par_nuit, hotel.device)}
                  </Badge>
                </div>
                {renderAmenities()}
              </div>

              {/* Informations de contact */}
              <div className="space-y-3 mb-6">
                <motion.div 
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 group/item"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="truncate font-medium">{hotel.adresse}</span>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 group/item"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="font-medium">{hotel.telephone}</span>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 group/item"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="truncate font-medium">{hotel.mail}</span>
                </motion.div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {!hotel.deleted_at && hotel.statut === 'actif' ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit(hotel)
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(hotel)
                      }}
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
                    onClick={(e) => {
                      e.stopPropagation()
                      onRestore(hotel)
                    }}
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
