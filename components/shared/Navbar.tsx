'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, Briefcase, Tag, Star, ArrowUpRight, Grid3X3, User, Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '../theme/ModeToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const links = [
    { name: 'Accueil', icon: <Home size={16} />, href: '#home' },
    { name: 'Services', icon: <Briefcase size={16} />, href: '#services' },
    { name: 'Tarifs', icon: <Tag size={16} />, href: '#pricing' },
    { name: 'Fonctionnalités', icon: <Star size={16} />, href: '#features' },
  ]

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 80 }}
      className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et navigation principale */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-bold text-2xl text-gray-900 dark:text-white tracking-tight cursor-pointer select-none"
            >
              Hotel<span className="text-blue-600">Pro</span>
            </motion.div>

            {/* Liens centrés */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                >
                  <span className="text-blue-500">{link.icon}</span>
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Côté droit - Recherche, Notifications, Profil */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </motion.button>

            {/* Thème */}
            <ModeToggle />

            {/* Bouton CTA */}
            <Button
              onClick={() => router.push('/auth/login')}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-purple-700"
            >
              Se connecter
              <ArrowUpRight size={16} />
            </Button>
          </div>

          {/* Menu mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
          >
            {isOpen ? <X size={24} /> : <Grid3X3 size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-b-2xl"
            >
              <div className="py-4 space-y-2">

                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-blue-500">{link.icon}</span>
                    {link.name}
                  </a>
                ))}
                
                <div className="flex justify-between items-center px-4 pt-3 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <ModeToggle />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
                    >
                      <Bell size={20} />
                    </motion.button>
                  </div>
                  <Button
                    onClick={() => {
                      router.push('/auth/login')
                      setIsOpen(false)
                    }}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Se connecter
                    <ArrowUpRight size={16} />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}