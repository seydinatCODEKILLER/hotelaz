// app/not-found.tsx
'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          {/* Error Code */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <h1 className="text-9xl font-bold text-gray-900 dark:text-white">
              4
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="inline-block text-blue-600"
              >
                0
              </motion.span>
              4
            </h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Page introuvable
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Désolé, nous avons pas pu trouver la page que vous recherchez. 
              Elle a peut-être été déplacée ou supprimée.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Retour à accueil
              </Link>
            </Button>
            
            <Button
              variant="outline"
              asChild
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-8 py-3 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              <Link href="/dashboard/analytics" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Retour au dashboard
              </Link>
            </Button>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/60 dark:border-gray-700/60 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Besoin aide ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/search"
                className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">Rechercher</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Trouvez ce que vous cherchez
                  </div>
                </div>
              </Link>
              
              <Link
                href="/contact"
                className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">Nous contacter</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Obtenez de aide
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}