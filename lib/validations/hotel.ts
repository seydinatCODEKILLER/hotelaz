import { z } from 'zod'

export const hotelSchema = z.object({
  nom: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(255, 'Le nom ne peut pas dépasser 255 caractères'),
  
  adresse: z.string()
    .min(5, 'L\'adresse doit contenir au moins 5 caractères')
    .max(500, 'L\'adresse ne peut pas dépasser 500 caractères'),
  
  mail: z.string()
    .email('Adresse email invalide')
    .max(255, 'L\'email ne peut pas dépasser 255 caractères'),
  
  telephone: z.string()
    .min(5, 'Le téléphone doit contenir au moins 5 caractères')
    .max(20, 'Le téléphone ne peut pas dépasser 20 caractères')
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Numéro de téléphone invalide'),
  
  prix_par_nuit: z.number()
    .min(0, 'Le prix ne peut pas être négatif')
    .max(1000000, 'Le prix est trop élevé'),
  
  device: z.enum(['FCFA', 'EURO', 'DOLLARS']).catch('EURO'),

  statut: z.enum(['actif', 'inactif']).optional(),
})

export type HotelFormData = z.infer<typeof hotelSchema>