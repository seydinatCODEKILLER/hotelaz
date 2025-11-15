'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Hotel, CreateHotelData, UpdateHotelData } from '@/types/hotel'
import { useCreateHotel, useUpdateHotel } from '@/hooks/hotels/useHotels'
import { hotelSchema } from '@/lib/validations/hotel'
import { Upload, X } from 'lucide-react'

interface HotelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hotel?: Hotel
}

export function HotelModal({ open, onOpenChange, hotel }: HotelModalProps) {
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>(hotel?.photo || '')
  
  const createHotel = useCreateHotel()
  const updateHotel = useUpdateHotel()

  const isEditing = !!hotel
  const isLoading = createHotel.isPending || updateHotel.isPending

  const form = useForm<CreateHotelData | UpdateHotelData>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      nom: hotel?.nom || '',
      adresse: hotel?.adresse || '',
      mail: hotel?.mail || '',
      telephone: hotel?.telephone || '',
      prix_par_nuit: hotel?.prix_par_nuit || 0,
      device: hotel?.device || 'EURO',
      statut: hotel?.statut || 'actif',
    }
  })

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
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const removePhoto = () => {
    setPhoto(null)
    setPhotoPreview('')
  }

  const onSubmit = (data: CreateHotelData | UpdateHotelData) => {
    const submitData = {
      ...data,
      photo: photo || undefined
    }

    if (isEditing && hotel) {
      updateHotel.mutate(
        { id: hotel.id, data: submitData },
        {
          onSuccess: () => {
            onOpenChange(false)
            form.reset()
            setPhoto(null)
            setPhotoPreview('')
          }
        }
      )
    } else {
      createHotel.mutate(submitData as CreateHotelData, {
        onSuccess: () => {
          onOpenChange(false)
          form.reset()
          setPhoto(null)
          setPhotoPreview('')
        }
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Modifier l\'hôtel' : 'Créer un nouvel hôtel'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Upload de photo */}
            <div>
              <FormLabel>Photo de l'hôtel</FormLabel>
              {photoPreview ? (
                <div className="relative mt-2">
                  <img
                    src={photoPreview}
                    alt="Aperçu de l'hôtel"
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
                    border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors mt-2
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
                        <span>Déposez l'image ici...</span>
                      ) : (
                        <span>
                          Glissez-déposez une image, ou{' '}
                          <span className="text-blue-600 font-medium">cliquez pour parcourir</span>
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF jusqu'à 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'hôtel *</FormLabel>
                    <FormControl>
                      <Input placeholder="Hôtel Paradise" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="device"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Devise *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une devise" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FCFA">FCFA</SelectItem>
                        <SelectItem value="EURO">Euro (€)</SelectItem>
                        <SelectItem value="DOLLARS">Dollar ($)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Adresse */}
            <FormField
              control={form.control}
              name="adresse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse complète *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="123 Avenue des Champs-Élysées, 75008 Paris, France"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="mail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@hotel.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone *</FormLabel>
                    <FormControl>
                      <Input placeholder="+33123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Prix et statut */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="prix_par_nuit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix par nuit *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="150.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="statut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="actif">Actif</SelectItem>
                        <SelectItem value="inactif">Inactif</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>Chargement...</>
                ) : isEditing ? (
                  <>Modifier hôtel</>
                ) : (
                  <>Créer hôtel</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}