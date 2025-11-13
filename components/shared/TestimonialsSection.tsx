'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Marie Dubois',
    position: 'Gérante, Hôtel Le Parisien',
    content: 'HotelManager a transformé notre façon de travailler. La gestion de nos 3 hôtels est maintenant un jeu d\'enfant !',
    rating: 5,
    avatar: 'MD'
  },
  {
    name: 'Jean Moreau',
    position: 'Directeur, Resort Méditerranée',
    content: 'L\'application mobile est exceptionnelle. Je peux tout gérer même en déplacement. Un gain de temps incroyable.',
    rating: 5,
    avatar: 'JM'
  },
  {
    name: 'Sophie Lambert',
    position: 'Propriétaire, Château Belle Vue',
    content: 'Le support client est réactif et les mises à jour régulières montrent que l\'équipe est à l\'écoute.',
    rating: 5,
    avatar: 'SL'
  }
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
    >
      {/* Note en étoiles */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Citation */}
      <Quote className="w-8 h-8 text-blue-100 dark:text-blue-300 mb-4" />
      <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-6">{testimonial.content}</p>

      {/* Auteur */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.position}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="témoignages" ref={ref} className="py-20 bg-white dark:bg-gray-900">
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
            Témoignages
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Ils nous font
            <span className="text-gradient block">confiance</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez ce que les professionnels de hôtellerie pensent de HotelManager.
          </p>
        </motion.div>

        {/* Grille des témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Statistiques de confiance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: '500+', label: 'Hôtels gérés' },
            { number: '98%', label: 'Satisfaction client' },
            { number: '24/7', label: 'Support disponible' },
            { number: '4.9/5', label: 'Note moyenne' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
