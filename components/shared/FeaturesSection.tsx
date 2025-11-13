'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { BarChart3, Users, Shield, Zap, Smartphone, Cloud } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Dashboard Complet',
    description: 'Suivez vos performances avec des graphiques et statistiques en temps réel.',
    color: 'from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500'
  },
  {
    icon: Users,
    title: 'Gestion Multi-utilisateurs',
    description: 'Collaborez avec votre équipe grâce aux différents niveaux d\'accès.',
    color: 'from-green-500 to-green-600 dark:from-green-400 dark:to-green-500'
  },
  {
    icon: Shield,
    title: 'Sécurité Maximale',
    description: 'Vos données sont chiffrées et sauvegardées automatiquement.',
    color: 'from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500'
  },
  {
    icon: Zap,
    title: 'Interface Rapide',
    description: 'Une expérience utilisateur fluide et réactive sur tous les appareils.',
    color: 'from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500'
  },
  {
    icon: Smartphone,
    title: 'Application Mobile',
    description: 'Gérez vos hôtels depuis votre smartphone où que vous soyez.',
    color: 'from-pink-500 to-pink-600 dark:from-pink-400 dark:to-pink-500'
  },
  {
    icon: Cloud,
    title: 'Sauvegarde Cloud',
    description: 'Accédez à vos données depuis n\'importe quel appareil, en toute sécurité.',
    color: 'from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500'
  }
]

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
    >
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <feature.icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{feature.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="fonctionnalités" ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 font-medium mb-6"
          >
            Fonctionnalités
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Tout ce dont vous avez
            <span className="text-gradient block">besoin pour réussir</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez les fonctionnalités puissantes qui simplifient la gestion de votre hôtel au quotidien.
          </p>
        </motion.div>

        {/* Grille des fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bannière supplémentaire */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Prêt à transformer votre gestion hôtelière ?</h3>
          <p className="text-blue-100 dark:text-blue-200 mb-6 text-lg">
            Rejoignez des centaines hôteliers qui font confiance à HotelManager
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 dark:text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Essai gratuit 14 jours
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
