import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { I18nProvider } from '@/lib/i18n-context'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'angelpro | AI-Powered Drug Discovery',
    template: '%s | angelpro',
  },
  description:
    'Integrating computational biology and machine learning to develop breakthrough therapies faster. angelpro accelerates drug discovery across small molecules, peptides, and traditional Chinese medicine with artificial intelligence.',
  keywords: [
    'AI drug discovery',
    'computational biology',
    'machine learning',
    'pharmaceutical',
    'biotech',
  ],
}

export const viewport: Viewport = {
  themeColor: '#0A2647',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <I18nProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
