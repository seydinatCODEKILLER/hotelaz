// components/profile/UpdateAvatarModal.tsx
'use client'

import { useState, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import { User } from '@/types/auth'
import { useUpdateAvatar } from '@/hooks/auth/useUser'

interface UpdateAvatarModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentUser: User
}

export function UpdateAvatarModal({ 
  open, 
  onOpenChange, 
  currentUser 
}: UpdateAvatarModalProps) {
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  
  const updateAvatar = useUpdateAvatar()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setAvatar(file)
      
      const reader = new FileReader()
      reader.onload = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  })

  const removeAvatar = () => {
    setAvatar(null)
    setAvatarPreview('')
  }

  const handleSubmit = () => {
    if (!avatar) return

    updateAvatar.mutate(avatar, {
      onSuccess: () => {
        onOpenChange(false)
        setAvatar(null)
        setAvatarPreview('')
      }
    })
  }

  const handleClose = () => {
    onOpenChange(false)
    setAvatar(null)
    setAvatarPreview('')
  }

  const getInitials = (nom: string, prenom: string) => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier la photo de profil</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Photo actuelle */}
          <div className="text-center">
            <p className="text-sm font-medium mb-4">Photo actuelle</p>
            <Avatar className="w-20 h-20 mx-auto border-2 border-gray-200">
              <AvatarImage src={currentUser.avatar} alt={`${currentUser.prenom} ${currentUser.nom}`} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {getInitials(currentUser.nom, currentUser.prenom)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Nouvelle photo */}
          <div>
            <p className="text-sm font-medium mb-4">Nouvelle photo</p>
            {avatarPreview ? (
              <div className="text-center">
                <div className="relative inline-block">
                  <Avatar className="w-32 h-32 mx-auto border-2 border-gray-200">
                    <AvatarImage src={avatarPreview} alt="Aperçu de la nouvelle photo" />
                    <AvatarFallback className="bg-gray-100">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={removeAvatar}
                >
                  <X className="w-4 h-4 mr-2" />
                  Changer
                </Button>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                  ${isDragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }
                `}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    {isDragActive ? (
                      <span>Déposez image ici...</span>
                    ) : (
                      <span>
                        Glissez-déposez une image, ou{' '}
                        <span className="text-blue-600 font-medium">cliquez pour parcourir</span>
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF 5MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Informations de validation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Format accepté</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Formats: JPEG, PNG, JPG, GIF</li>
              <li>• Taille maximale: 5MB</li>
              <li>• Image carrée recommandée</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={updateAvatar.isPending}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!avatar || updateAvatar.isPending}
            >
              {updateAvatar.isPending ? 'Mise à jour...' : 'Mettre à jour'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}