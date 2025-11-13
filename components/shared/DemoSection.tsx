'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Play, CheckCircle } from 'lucide-react'

export default function DemoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    'Dashboard en temps réel',
    'Gestion multi-hôtels',
    'Rapports automatiques',
    'Support 24/7',
    'Synchronisation cloud',
    'Application mobile incluse'
  ]

  return (
    <section id="démo" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Colonne de gauche - Contenu */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 font-medium mb-6">
              Démo Interactive
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Voyez HotelManager
              <span className="text-gradient block">en action</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Découvrez comment notre solution peut transformer la gestion de votre établissement en moins de 5 minutes.
            </p>

            {/* Liste des fonctionnalités */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-200 text-lg">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white dark:bg-blue-500 dark:text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                <Play className="w-5 h-5" />
                Voir la démo vidéo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-500 transition-colors"
              >
                Essai gratuit
              </motion.button>
            </div>
          </motion.div>

          {/* Colonne de droite - Visuel démo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Carte dashboard */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              {/* En-tête de la carte */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-600"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-600"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-600"></div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Dashboard HotelManager</div>
              </div>

              {/* Contenu de démo */}
              <div className="space-y-4">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4">
                  {[32, 28, '95%'].map((stat, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        {index === 0 ? 'Hôtels' : index === 1 ? 'Actifs' : 'Satisfaction'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Graphique de démo */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-end justify-between h-20">
                    {[40, 60, 80, 60, 90, 70, 100].map((height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 1 + index * 0.1 }}
                        className="w-6 bg-gradient-to-t from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-t"
                      />
                    ))}
                  </div>
                  <div className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Performance mensuelle
                  </div>
                </div>

                {/* Liste des hôtels de démo */}
                <div className="space-y-2">
                  {['Hôtel Plaza', 'Resort Paradise', 'City Suites'].map((hotel, index) => (
                    <div key={hotel} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors">
                      <span className="text-gray-700 dark:text-gray-200">{hotel}</span>
                      <div className={`px-2 py-1 rounded text-xs ${
                        index === 0 ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100' : 
                        index === 1 ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100' : 
                        'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100'
                      }`}>
                        {index === 0 ? 'Actif' : index === 1 ? 'En maintenance' : 'Nouveau'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Éléments décoratifs flottants */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -top-4 -right-4 bg-yellow-400 dark:bg-yellow-600 text-white p-3 rounded-xl shadow-lg"
            >
              <div className="text-sm font-bold">Nouveau!</div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute -bottom-4 -left-4 bg-green-500 dark:bg-green-700 text-white p-2 rounded-lg shadow-lg text-xs"
            >
              +15% ce mois
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
