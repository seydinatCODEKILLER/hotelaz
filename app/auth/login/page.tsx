'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bot, Building, Eye, EyeOff, Shield } from 'lucide-react'
import Link from 'next/link'
import { loginSchema, type LoginFormData } from '@/lib/validations/auth'
import { useLogin } from '@/hooks/auth/useLogin'

// 🔥 Import Shadcn Form components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { IMAGES } from '@/utils/images'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { mutate: login, isPending } = useLogin()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormData) => {
    login(data)
  }

  return (
    <div className="min-h-screen flex">
      {/* Colonne gauche */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header avec Logo HotelPro */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center items-center gap-3 mb-6"
            >
              <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                <Building className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">HotelPro</h1>
                <p className="text-xs text-gray-500">Management Suite</p>
              </div>
            </motion.div>
          </div>

          {/* Formulaire Shadcn */}
          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(onSubmit)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="vous@hotelpro.com"
                        {...field}
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
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
                    <FormLabel className="text-sm font-medium text-gray-700">Mot de passe</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Votre mot de passe"
                          {...field}
                          className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                        />
                      </FormControl>

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-md transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember-me" className="border-gray-300 data-[state=checked]:bg-blue-600" />
                  <label
                    htmlFor="remember-me"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Se souvenir de moi
                  </label>
                </div>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 cursor-pointer text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connexion...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </Button>

              {/* Lien vers inscription */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Pas encore de compte ?{' '}
                  <Link 
                    href="/auth/register" 
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Créer un compte
                  </Link>
                </p>
              </div>

              {/* Security Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border"
              >
                <Shield className="w-4 h-4 text-green-500" />
                <span>Vos données sont sécurisées et chiffrées</span>
              </motion.div>
            </motion.form>
          </Form>
        </motion.div>
      </div>

      {/* Right column — image */}
      <motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="hidden lg:block flex-1 relative"
>
  <div className="absolute inset-0">
    <Image
      src={IMAGES.auth}
      alt="Lounge"
      fill
      className="object-cover object-center"
      priority
    />
  </div>
</motion.div>
    </div>
  )
}
