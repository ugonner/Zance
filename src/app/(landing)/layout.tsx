import Navbar from '@/components/features/landing/Navbar'

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className='bg-white-200 h-screen'>
        <div className='h-20'>
          <Navbar />
        </div>
        <div className='bg-white-100'>{children}</div>
      </div>
    </>
  )
}
