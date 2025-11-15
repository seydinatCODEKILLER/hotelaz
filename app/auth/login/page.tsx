'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bot, Eye, EyeOff, Shield } from 'lucide-react'
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
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <Bot className="h-10 w-10 text-blue-600" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-3xl font-bold text-gray-900"
            >
              Connexion
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-sm text-gray-600"
            >
              Ou{' '}
              <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                créez un nouveau compte
              </Link>
            </motion.p>
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="vous@email.com"
                        {...field}
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
                    <FormLabel>Mot de passe</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Votre mot de passe"
                          {...field}
                          className="pr-10"
                        />
                      </FormControl>

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
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
                  <Checkbox id="remember-me" />
                  <label
                    htmlFor="remember-me"
                    className="text-sm text-gray-700"
                  >
                    Se souvenir de moi
                  </label>
                </div>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full py-3 text-sm font-medium"
              >
                {isPending ? 'Connexion...' : 'Se connecter'}
              </Button>

              {/* Security Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center gap-2 text-xs text-gray-500"
              >
                <Shield className="w-3 h-3 text-green-500" />
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
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2017/11/08/11/22/lounge-2930070_640.jpg')",
          }}
        />
      </motion.div>
    </div>
  )
}
