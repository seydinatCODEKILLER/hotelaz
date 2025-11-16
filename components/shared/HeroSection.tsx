'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Users, MessageCircle, BarChart3, Shield } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      
      {/* Background decorative elements */}
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

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm mb-4"
            >
              <Shield className="w-4 h-4 mr-2" />
              Plateforme de gestion hôtelière sécurisée
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white"
            >
              Gérez votre hôtel{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                avec intelligence
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
            >
              Une solution complète pour gérer vos hôtels, optimiser vos revenus et offrir une expérience exceptionnelle à vos clients.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
              >
                Voir la démo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 pt-6"
            >
              {[
                { number: '500+', label: 'Hôtels partenaires' },
                { number: '98%', label: 'Satisfaction clients' },
                { number: '24/7', label: 'Support disponible' },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="relative"
          >
            {/* Main Dashboard Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              
              {/* Header with window controls */}
              <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  {['red', 'yellow', 'green'].map((color) => (
                    <div
                      key={color}
                      className={`w-3 h-3 rounded-full bg-${color}-400 dark:bg-${color}-600`}
                    />
                  ))}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Dashboard HotelPro
                </div>
                <div className="w-12"></div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6">
                {/* Online Members */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-2 border-white dark:border-gray-800"
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">4</span> membres en ligne
                    </div>
                  </div>
                </div>

                {/* Chat Preview */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white">Tiana Korsgaard</span>
                        <span className="text-xs text-gray-500">5:20 PM</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
                        It&apos;s going well. We&apos;ve made some good progress on the design and we&apos;re starting to work on the development phase.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Channels Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Canaux détaillés
                  </div>
                  
                  <div className="space-y-2">
                    {/* Channel Item */}
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="font-medium text-blue-700 dark:text-blue-300"># Superbi-Project</span>
                      </div>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>

                    {/* About Section */}
                    <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">À PROPOS</div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Canal dédié au projet Superbi. Discussions sur le design et développement.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {[
                    { icon: <BarChart3 className="w-4 h-4" />, value: '128', label: 'Réservations' },
                    { icon: <MessageCircle className="w-4 h-4" />, value: '24', label: 'Messages' },
                    { icon: <Users className="w-4 h-4" />, value: '89%', label: 'Occupancy' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center text-blue-600 dark:text-blue-400 mb-1">
                        {stat.icon}
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="text-sm font-semibold">Nouveau</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}