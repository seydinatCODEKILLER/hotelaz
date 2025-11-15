'use client'

import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building, MapPin, Phone, Mail, Euro, Calendar, Edit, ArrowLeft } from 'lucide-react'
import { useHotel } from '@/hooks/hotels/useHotels'
import { formatCurrency, formatDateTime } from '@/lib/utils'

export default function HotelDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const hotelId = params.id as string

  const { data: hotel, isLoading } = useHotel(hotelId)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">Hôtel non trouvé</div>
        <Button onClick={() => router.push('/dashboard/hotels')} className="mt-4">
          Retour à la liste
        </Button>
      </div>
    )
  }

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
    <div className="space-y-6">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {hotel.nom}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={getStatusVariant(hotel.statut, hotel.deleted_at)}>
                {getStatusText(hotel.statut, hotel.deleted_at)}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                Créé le {formatDateTime(hotel.created_at)}
              </div>
            </div>
          </div>
        </div>

        {!hotel.deleted_at && hotel.statut === 'actif' && (
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Photo et informations principales */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Photo</CardTitle>
            </CardHeader>
            <CardContent>
              {hotel.photo ? (
                <img
                  src={hotel.photo}
                  alt={hotel.nom}
                  className="w-full h-80 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Building className="w-20 h-20 text-white opacity-80" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                {hotel.adresse}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Informations détaillées */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Prix par nuit</span>
                <div className="flex items-center gap-1 font-semibold">
                  <Euro className="w-4 h-4" />
                  {formatCurrency(hotel.prix_par_nuit, hotel.device)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Devise</span>
                <span className="font-semibold">{hotel.device}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Statut</span>
                <Badge variant={getStatusVariant(hotel.statut, hotel.deleted_at)}>
                  {getStatusText(hotel.statut, hotel.deleted_at)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Adresse</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {hotel.adresse}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Téléphone</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {hotel.telephone}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {hotel.mail}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Créé le</span>
                <span>{formatDateTime(hotel.created_at)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Modifié le</span>
                <span>{formatDateTime(hotel.updated_at)}</span>
              </div>
              {hotel.deleted_at && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Supprimé le</span>
                  <span>{formatDateTime(hotel.deleted_at)}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}