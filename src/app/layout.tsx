import { QueryProvider } from '@/providers/QueryProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { NextAuthSessionProvider } from '@/providers/SessionProvider'
import { Toaster } from '@/components/ui/toaster'

const polarisFuturistic = localFont({
  src: '../assets/fonts/Polaris.woff2',
  display: 'swap',
  variable: '--font-polaris',
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UniAcademy',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} ${polarisFuturistic.variable}`}>
        <QueryProvider>
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
