'use client'

import { motion } from 'framer-motion'
import { Hotel, Twitter, Facebook, Instagram, Linkedin, Mail } from 'lucide-react'

const footerLinks = {
  produit: [
    { name: 'Fonctionnalités', href: '#fonctionnalités' },
    { name: 'Tarifs', href: '#tarifs' },
    { name: 'Démo', href: '#démo' },
    { name: 'Nouveautés', href: '#' }
  ],
  entreprise: [
    { name: 'À propos', href: '#' },
    { name: 'Carrières', href: '#' },
    { name: 'Presse', href: '#' },
    { name: 'Contact', href: '#' }
  ],
  ressources: [
    { name: 'Blog', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Support', href: '#' },
    { name: 'Centre d\'aide', href: '#' }
  ],
  légal: [
    { name: 'Confidentialité', href: '#' },
    { name: 'Conditions', href: '#' },
    { name: 'Cookies', href: '#' },
    { name: 'Mentions légales', href: '#' }
  ]
}

const socialLinks = [
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Facebook, href: '#', name: 'Facebook' },
  { icon: Instagram, href: '#', name: 'Instagram' },
  { icon: Linkedin, href: '#', name: 'LinkedIn' },
  { icon: Mail, href: '#', name: 'Email' }
]

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: 5, color: '#2563eb' }}
      transition={{ duration: 0.2 }}
      className="text-gray-600 hover:text-blue-600 transition-colors"
    >
      {children}
    </motion.a>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Hotel className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">HotelManager</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-400 mb-6 leading-relaxed"
            >
              La solution moderne de gestion hôtelière qui transforme votre établissement. 
              Rejoignez des centaines de professionnels qui nous font confiance.
            </motion.p>
            
            {/* Réseaux sociaux */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Liens de navigation */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <div key={category}>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="font-semibold text-white mb-4 capitalize"
              >
                {category}
              </motion.h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + categoryIndex * 0.1 + linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <FooterLink href={link.href}>
                      {link.name}
                    </FooterLink>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Ligne de séparation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              © {currentYear} HotelManager. Tous droits réservés.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 text-sm text-gray-400"
            >
              <span>Made with ❤️ for hoteliers</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}