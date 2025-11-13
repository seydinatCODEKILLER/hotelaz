'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Check, Crown, Star } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    description: 'Parfait pour les petits établissements',
    price: { monthly: 29, yearly: 290 },
    features: [
      '1 hôtel maximum',
      'Dashboard basique',
      'Support par email',
      'Rapports mensuels',
      '100 réservations/mois'
    ],
    popular: false,
    color: 'from-gray-500 to-gray-600'
  },
  {
    name: 'Professionnel',
    description: 'Idéal pour les chaînes hôtelières',
    price: { monthly: 79, yearly: 790 },
    features: [
      '5 hôtels maximum',
      'Dashboard avancé',
      'Support prioritaire',
      'Rapports en temps réel',
      'Réservations illimitées',
      'Application mobile',
      'Formation en ligne'
    ],
    popular: true,
    color: 'from-blue-500 to-purple-600'
  },
  {
    name: 'Enterprise',
    description: 'Pour les grands groupes hôteliers',
    price: { monthly: 199, yearly: 1990 },
    features: [
      'Hôtels illimités',
      'Dashboard personnalisé',
      'Support dédié 24/7',
      'Analytics avancées',
      'API complète',
      'Formation sur site',
      'SLA 99.9%',
      'Personnalisation totale'
    ],
    popular: false,
    color: 'from-orange-500 to-red-600'
  }
]

function PricingCard({ plan, isYearly, index }: { plan: typeof plans[0], isYearly: boolean, index: number }) {
  const price = isYearly ? plan.price.yearly : plan.price.monthly
  const period = isYearly ? 'an' : 'mois'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 hover:shadow-xl transition-all duration-300 ${
        plan.popular 
          ? 'border-blue-500 scale-105' 
          : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      {/* Badge populaire */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold">
            <Crown className="w-4 h-4" />
            Le plus populaire
          </div>
        </div>
      )}

      {/* En-tête */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{plan.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{plan.description}</p>
      </div>

      {/* Prix */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">€{price}</span>
          <span className="text-gray-600 dark:text-gray-300">/{period}</span>
        </div>
        {isYearly && (
          <div className="text-green-600 dark:text-green-400 text-sm font-medium mt-2">
            Économisez 2 mois gratuitement !
          </div>
        )}
      </div>

      {/* Bouton CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-xl font-semibold mb-6 transition-colors ${
          plan.popular
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        Commencer maintenant
      </motion.button>

      {/* Liste des fonctionnalités */}
      <ul className="space-y-4">
        {plan.features.map((feature, featureIndex) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-gray-700 dark:text-gray-200"
          >
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="tarifs" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
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
            Tarifs
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Des tarifs adaptés
            <span className="text-gradient block">à votre business</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Choisissez la formule qui correspond à vos besoins. Essai gratuit de 14 jours inclus.
          </p>

          {/* Toggle Mensuel/Annuel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <span className={`font-medium ${!isYearly ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
              Mensuel
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  isYearly ? 'transform translate-x-7' : 'transform translate-x-1'
                }`}
              />
              <div
                className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                  isYearly ? 'bg-green-500 dark:bg-green-400' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            </button>
            <span className={`font-medium ${isYearly ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
              Annuel <span className="text-green-600 dark:text-green-400 text-sm">(-20%)</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Grille des offres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              isYearly={isYearly} 
              index={index} 
            />
          ))}
        </div>

        {/* Garantie */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-2 rounded-full">
            <Star className="w-4 h-4 fill-current" />
            Garantie satisfait ou remboursé 30 jours
          </div>
        </motion.div>
      </div>
    </section>
  )
}
