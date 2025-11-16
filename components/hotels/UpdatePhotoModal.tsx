'use client'

import { useState, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import { useUpdateHotelPhoto } from '@/hooks/hotels/useHotels'

interface UpdatePhotoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hotelId: string
  currentPhoto?: string
}

export function UpdatePhotoModal({ 
  open, 
  onOpenChange, 
  hotelId, 
  currentPhoto 
}: UpdatePhotoModalProps) {
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>('')
  
  const updatePhoto = useUpdateHotelPhoto()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setPhoto(file)
      
      const reader = new FileReader()
      reader.onload = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const removePhoto = () => {
    setPhoto(null)
    setPhotoPreview('')
  }

  const handleSubmit = () => {
    if (!photo) return

    updatePhoto.mutate(
      { id: hotelId, photo },
      {
        onSuccess: () => {
          onOpenChange(false)
          setPhoto(null)
          setPhotoPreview('')
        }
      }
    )
  }

  const handleClose = () => {
    onOpenChange(false)
    setPhoto(null)
    setPhotoPreview('')
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier la photo</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Aperçu actuel */}
          {currentPhoto && (
            <div>
              <p className="text-sm font-medium mb-2">Photo actuelle</p>
              <img
                src={currentPhoto}
                alt="Photo actuelle"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Upload de nouvelle photo */}
          <div>
            <p className="text-sm font-medium mb-2">Nouvelle photo</p>
            {photoPreview ? (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Nouvelle photo"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removePhoto}
                >
                  <X className="w-4 h-4" />
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
                    PNG, JPG, GIF 10MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={updatePhoto.isPending}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!photo || updatePhoto.isPending}
            >
              {updatePhoto.isPending ? 'Mise à jour...' : 'Mettre à jour'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}