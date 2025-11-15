'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, Briefcase, Tag, Star, ArrowUpRight, Grid, Grid2X2Check, MenuSquare, Grid2X2PlusIcon } from 'lucide-react'
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
      className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-bold text-2xl text-gray-900 dark:text-white tracking-tight cursor-pointer select-none"
          >
            Hotelaz
          </motion.div>

          {/* Liens centrés */}
          <div className="hidden lg:flex items-center gap-2">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 font-medium rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <span className="text-indigo-500">{link.icon}</span>
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* CTA + ToggleTheme */}
          <div className="hidden lg:flex items-center gap-3">
            <ModeToggle /> {/* 👈 bouton de changement de thème */}
            <Button
              onClick={() => router.push('/auth/login')}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-5 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Se connecter
              <ArrowUpRight size={18} />
            </Button>
          </div>

          {/* Menu mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? <X size={24} /> : <Grid2X2PlusIcon size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-b-2xl"
            >
              <div className="py-4 space-y-2">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-md transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-indigo-500">{link.icon}</span>
                    {link.name}
                  </a>
                ))}
                <div className="flex justify-between items-center px-4 mt-3">
                  <ModeToggle />
                  <Button
                    onClick={() => {
                      router.push('/auth/login')
                      setIsOpen(false)
                    }}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-5 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Se connecter
                    <ArrowUpRight size={18} />
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
