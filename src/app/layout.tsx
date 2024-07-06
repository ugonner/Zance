import { Toaster } from '@/components/ui/toaster'
import ReduxProvider from '@/providers/ReduxProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zance',
  description: 'Your ultimate Event Platform',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange>
          <ReduxProvider>{children}</ReduxProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
