'use client'

import { useState, useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { registerSchema, type RegisterFormData } from '@/lib/validations/auth'
import { useRegister } from '@/hooks/auth/useRegister'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form'

import { Mail, User, Lock, Upload, X, Shield } from 'lucide-react'

export default function RegisterPage() {
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const { mutate: registerUser, isPending } = useRegister()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      prenom: '',
      nom: '',
      email: '',
      password: '',
      password_confirmation: '',
      avatar: undefined,
    },
  })

  /** Dropzone */
  const onDrop = useCallback(
    (files: File[]) => {
      const file = files[0]
      if (!file) return
      form.setValue('avatar', file)
      const reader = new FileReader()
      reader.onload = () => setAvatarPreview(reader.result as string)
      reader.readAsDataURL(file)
    },
    [form]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  })

  const removeAvatar = () => {
    setAvatarPreview('')
    form.setValue('avatar', undefined)
  }

  const onSubmit = (data: RegisterFormData) => registerUser(data)

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)' }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* AVATAR LEFT */}
        <Card className="flex flex-col items-center justify-center p-6 rounded-3xl shadow-2xl bg-white/70 backdrop-blur-md border border-white/30">
          <CardContent className="w-full">
            <Label className="text-sm font-medium text-gray-700">Photo de profil (optionnel)</Label>

            <div className="mt-4 flex flex-col items-center w-full">
              {avatarPreview ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative"
                >
                  <img src={avatarPreview} alt="avatar" className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg" />
                  <button
                    type="button"
                    onClick={removeAvatar}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow"
                    aria-label="Supprimer avatar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <div {...getRootProps()} className="w-full">
                  <input {...getInputProps()} aria-label="Upload avatar" />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`mt-2 border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors
                      ${isDragActive ? 'border-blue-500 bg-blue-50/40' : 'border-gray-300 bg-white/30 hover:bg-white/40'}
                    `}
                  >
                    <Upload className="w-8 h-8 text-gray-500 mx-auto" />
                    <p className="mt-2 text-sm text-gray-600">
                      Glissez une image ou <span className="text-blue-600 font-medium">cliquez</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG — max 5MB</p>
                  </motion.div>
                </div>
              )}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-gray-400 mt-4"
              >
                L'image sera utilisée comme avatar public.
              </motion.span>
            </div>
          </CardContent>
        </Card>

        {/* FORM RIGHT */}
        <Card className="p-6 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md border border-white/30">
          <CardContent className="w-full">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Créer un compte</h1>
              <p className="text-gray-600 text-sm mt-1">
                Déjà un compte ?{' '}
                <Link href="/auth/login" className="text-blue-600 hover:underline">
                  Connectez-vous
                </Link>
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Prenom / Nom */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
                            <Input {...field} placeholder="Votre prénom" className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
                            <Input {...field} placeholder="Votre nom" className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
                          <Input {...field} type="email" placeholder="email@example.com" className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
                          <Input {...field} type="password" placeholder="Votre mot de passe" className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirmation */}
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmer le mot de passe</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4" />
                          <Input {...field} type="password" placeholder="Retapez votre mot de passe" className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isPending} className="w-full mt-3">
                  {isPending ? 'Inscription...' : 'Créer mon compte'}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                  <Shield className="w-3 h-3 text-green-500" />
                  Données sécurisées & chiffrées
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
