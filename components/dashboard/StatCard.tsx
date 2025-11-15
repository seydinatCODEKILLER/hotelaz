'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number
  description?: string
  icon: LucideIcon
  color: string
}

const StatCard = ({ title, value, description, icon: Icon, color }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
          <motion.div
            className={`p-3 rounded-full ${color}`}
            whileHover={{ rotate: 12, scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        </div>
        {/* Fond circulaire derrière l'icône */}
        <motion.div
          className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 ${color}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </CardContent>
    </Card>
  </motion.div>
)

export default StatCard
