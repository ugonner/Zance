import { Toaster } from '@/components/ui/toaster'
import ReduxProvider from '@/providers/ReduxProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster />
      </ThemeProvider>
    </>
  )
}
