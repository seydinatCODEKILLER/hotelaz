import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Providers } from './providers'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HotelManager - Solution de Gestion Hôtelière',
  description: 'Application moderne de gestion hôtelière pour les professionnels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="light" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}