'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Zap, ArrowRight, Bot, Workflow, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Workflow,
    title: 'Intégrations Puissantes',
    description: 'Connectez-vous avec vos outils préférés pour maintenir votre flux de travail efficace et connecté sur toutes les plateformes.',
    cta: 'Explorer les intégrations →',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    icon: TrendingUp,
    title: 'Analyses Avancées',
    description: 'Prenez des décisions éclairées avec des analyses en temps réel et des rapports qui vous aident à optimiser les performances.',
    cta: 'Voir les insights →',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  },
  {
    icon: Shield,
    title: 'Sécurité Maximale',
    description: 'Vos données sont chiffrées de bout en bout avec des sauvegardes automatiques et une conformité aux normes de sécurité.',
    cta: 'En savoir plus →',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  }
]

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      {/* Background gradient effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Icon container */}
      <div className={`inline-flex p-4 rounded-2xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl`}>
          <feature.icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
        {feature.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
        {feature.description}
      </p>

      {/* CTA Button */}
      <motion.button
        whileHover={{ x: 5 }}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-lg group/btn"
      >
        {feature.cta}
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
      </motion.button>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="fonctionnalités" ref={ref} className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium mb-8 shadow-sm"
          >
            <Zap className="w-4 h-4 mr-2 text-blue-500" />
            Fonctionnalités Premium
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            Des outils puissants
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              pour votre succès
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment notre suite complète de fonctionnalités peut transformer 
            la gestion de votre hôtel et booster votre productivité.
          </p>
        </motion.div>

        {/* Grille des fonctionnalités */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bannière CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl" />
          <div className="absolute inset-0 bg-black/10" />
          
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <motion.h3 
              className="text-4xl font-bold mb-6 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 }}
            >
              Prêt à révolutionner votre gestion hôtelière ?
            </motion.h3>
            
            <motion.p 
              className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto relative z-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1 }}
            >
              Rejoignez des centaines hôteliers qui optimisent leurs opérations 
              et augmentent leurs revenus avec HotelPro
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl flex items-center gap-3"
              >
                Essai gratuit 14 jours
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Voir la démo
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}