'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Mail, CheckCircle, Camera } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { UpdateAvatarModal } from '@/components/profile/UpdateAvatarModal'
import { useState } from 'react'
import { useCurrentUser } from '@/hooks/auth/useUser'

export default function ProfilePage() {
  const { data: user, isLoading } = useCurrentUser()
  const [avatarModalOpen, setAvatarModalOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse" />
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">Utilisateur non trouvé</div>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Réessayer
        </Button>
      </div>
    )
  }

  const getInitials = (nom: string, prenom: string) => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Mon Profil
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gérez vos informations personnelles
          </p>
        </div>

        <Button
          onClick={() => setAvatarModalOpen(true)}
        >
          <Camera className="w-4 h-4 mr-2" />
          Modifier la photo
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Informations personnelles - Lecture seule */}
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Prénom
                  </label>
                  <p className="text-lg font-semibold mt-1">{user.prenom}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Nom
                  </label>
                  <p className="text-lg font-semibold mt-1">{user.nom}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Adresse email
                </label>
                <div className="flex items-center gap-3 mt-1">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <p className="text-lg font-semibold">{user.email}</p>
                  {user.email_verified_at && (
                    <Badge variant="default" className="bg-green-100 text-green-800 border-0">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Vérifié
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations du compte */}
          <Card>
            <CardHeader>
              <CardTitle>Informations du compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600">Statut du compte</span>
                <Badge variant="default" className="bg-green-100 text-green-800 border-0">
                  Actif
                </Badge>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600">Email vérifié</span>
                {user.email_verified_at ? (
                  <Badge variant="default" className="bg-green-100 text-green-800 border-0">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Oui
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-orange-600 border-orange-200">
                    En attente
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600">Membre depuis</span>
                <span className="font-medium">{formatDateTime(user.created_at)}</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600">Dernière mise à jour</span>
                <span className="font-medium">{formatDateTime(user.updated_at)}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar avec photo de profil */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Photo de profil */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-lg">
                    <AvatarImage src={user.avatar} alt={`${user.prenom} ${user.nom}`} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {getInitials(user.nom, user.prenom)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0"
                    onClick={() => setAvatarModalOpen(true)}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <h3 className="text-xl font-bold mt-4">{user.prenom} {user.nom}</h3>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span>Administrateur</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setAvatarModalOpen(true)}
              >
                <Camera className="w-4 h-4 mr-2" />
                Changer la photo
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled
              >
                <Mail className="w-4 h-4 mr-2" />
                Modifier email
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled
              >
                <User className="w-4 h-4 mr-2" />
                Modifier le profil
              </Button>
              
              <div className="pt-3 border-t text-xs text-gray-500 text-center">
                Seul le changement de photo est disponible pour le moment
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modal de mise à jour de l'avatar */}
      <UpdateAvatarModal
        open={avatarModalOpen}
        onOpenChange={setAvatarModalOpen}
        currentUser={user}
      />
    </div>
  )
}