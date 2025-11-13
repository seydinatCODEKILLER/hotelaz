'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import HeroSection from '@/components/shared/HeroSection'
import FeaturesSection from '@/components/shared/FeaturesSection'
import DemoSection from '@/components/shared/DemoSection'
import TestimonialsSection from '@/components/shared/TestimonialsSection'
import PricingSection from '@/components/shared/PricingSection'
import FAQSection from '@/components/shared/FAQSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
      </motion.div>
      <Footer />
    </main>
  )
}