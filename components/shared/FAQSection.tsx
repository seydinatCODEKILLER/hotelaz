'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: "Comment fonctionne l'essai gratuit ?",
    answer: "L'essai gratuit dure 14 jours et vous donne accès à toutes les fonctionnalités de la formule Professionnel. Aucune carte bancaire n'est requise pour commencer."
  },
  {
    question: "Puis-je changer de formule à tout moment ?",
    answer: "Oui, vous pouvez passer à une formule supérieure à tout moment. Le changement vers une formule inférieure prend effet à la fin de votre cycle de facturation actuel."
  },
  {
    question: "HotelManager est-il adapté aux grands groupes hôteliers ?",
    answer: "Absolument ! Notre formule Enterprise offre des fonctionnalités avancées comme la gestion multi-établissements, des tableaux de bord personnalisés et une API complète pour l'intégration avec vos systèmes existants."
  },
  {
    question: "Quelle est la politique de sauvegarde des données ?",
    answer: "Nous sauvegardons automatiquement vos données toutes les heures et conservons plusieurs versions sur 30 jours. Toutes les données sont chiffrées et répliquées sur plusieurs serveurs sécurisés."
  },
  {
    question: "Proposez-vous une formation ?",
    answer: "Oui, nous proposons des sessions de formation en ligne gratuites pour tous nos clients. Pour les formules Enterprise, une formation sur site est également disponible."
  },
  {
    question: "Comment fonctionne le support client ?",
    answer: "Notre support est disponible 24h/24 et 7j/7 par chat et email pour toutes les formules. Les formules Professionnel et Enterprise bénéficient d'un support prioritaire et téléphonique."
  }
]

function FAQItem({ faq, index }: { faq: typeof faqs[0], index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-2xl"
      >
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="faq" ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Questions
            <span className="text-gradient block">fréquentes</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur HotelManager. Vous ne trouvez pas la réponse ? Contactez notre équipe.
          </p>
        </motion.div>

        {/* Liste des FAQ */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} faq={faq} index={index} />
          ))}
        </div>

        {/* CTA supplémentaire */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Vous avez autres questions ?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Notre équipe est là pour vous aider à trouver la solution parfaite.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
            >
              Contactez-nous
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
