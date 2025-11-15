'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star, Shield, Zap } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen py-5 flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Floating Background Shapes */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-300/30 dark:bg-blue-500/20 rounded-full filter blur-3xl animate-blob"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-300/30 dark:bg-purple-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse' }}
      />

      <div className="relative w-full md:max-w-7xl mx-auto px-2 md:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-600 text-blue-800 dark:text-blue-200 font-semibold mb-8 shadow-md"
          >
            <Star className="w-4 h-4 mr-2 fill-current animate-pulse" />
            Solution de gestion hôtelière n°1
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-7xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-gray-100"
          >
            Gérez votre hôtel{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 block">
              avec élégance
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-center md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-10  max-w-3xl mx-auto"
          >
            Une application moderne pour gérer vos hôtels, suivre vos performances et développer votre business en toute simplicité.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Commencer gratuitement
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-2xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              Voir la démo
            </motion.button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8"
          >
            {[
              { icon: Shield, text: 'Sécurisé & fiable' },
              { icon: Zap, text: 'Interface intuitive' },
              { icon: Star, text: '5/5 sur les stores' },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-md px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all"
              >
                <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-bounce" />
                <span className="font-medium text-gray-700 dark:text-gray-200">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 1 }}
  className="mt-16 mx-auto max-w-6xl"
>
  <div className="relative bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
    {/* Top window controls */}
    <div className="bg-gray-200 dark:bg-gray-900 rounded-t-lg p-3 flex gap-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-600"
        />
      ))}
    </div>

    {/* Dashboard content */}
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1 */}
      <div className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-600">
        <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">Réservations du jours</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">128</p>
      </div>

      {/* Card 2 */}
      <div className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-600">
        <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">Hôtels actifs</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">12</p>
      </div>

      {/* Card 3 */}
      <div className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-600">
        <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">Revenus ce mois-ci</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">€24,560</p>
      </div>
    </div>

    {/* Graph / Chart simulation */}
    <div className="mt-6 bg-gray-100 dark:bg-gray-700 rounded-xl p-4 h-40 flex items-end gap-2">
      {[60, 80, 45, 90, 70, 50].map((val, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-lg bg-blue-500 dark:bg-blue-400 transition-all"
          style={{ height: `${val}%` }}
        />
      ))}
    </div>

    {/* Recent reservations table simulation */}
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr>
            {['Client', 'Hôtel', 'Date', 'Status'].map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-gray-500 dark:text-gray-300 text-sm font-medium"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { client: 'Alice', hotel: 'Hotel Lux', date: '12/11/2025', status: 'Confirmé' },
            { client: 'Bob', hotel: 'Sea View', date: '13/11/2025', status: 'En attente' },
            { client: 'Charlie', hotel: 'City Inn', date: '14/11/2025', status: 'Confirmé' },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-colors">
              <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{row.client}</td>
              <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{row.hotel}</td>
              <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{row.date}</td>
              <td className={`px-4 py-2 font-semibold ${row.status === 'Confirmé' ? 'text-green-600 dark:text-green-400' : 'text-yellow-500 dark:text-yellow-400'}`}>
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</motion.div>

      </div>
    </section>
  )
}
